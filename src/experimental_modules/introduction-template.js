import { DebugCall } from "./debugCall";
import { MultiLanguageSurveyShortCut } from "./MultiLanguageSurveyShortCut";
import { If } from "./If";
import ParticpantCodeGenerator from "./ParticpantCodeGenerator";
import { DevicePropsCheck } from "./DevicePropsCheck";
import CallFunctionPlugin from "@jspsych/plugin-call-function";

export function Introduction(runtimeStateManager, staticContextManager, jsPsych) {
  runtimeStateManager.set("FirstParticipation", true)
  let timeline = [
    new DebugCall(staticContextManager),
    DevicePropsCheck(runtimeStateManager),

    ...MultiLanguageSurveyShortCut(
      ["Lang"],
      staticContextManager.replacementDict,
      runtimeStateManager
    ),

    ...MultiLanguageSurveyShortCut(
      ["DeclarationOfConsent", "Instruction"], /*"BlueLightFilters",, "DarkMode", "ColorVision", "ComputerSound"], */
      staticContextManager.replacementDict,
      runtimeStateManager
    ),
    ...new If(staticContextManager.get("IS_A_PROLIFIC_STUDY")).Then([]).Else([
      ...new If(runtimeStateManager.isTrue("FirstParticipation"))
        .Then([ParticpantCodeGenerator(runtimeStateManager)])
        .Else([
          ...MultiLanguageSurveyShortCut(
            ["ParticipantCodeReq"],
            staticContextManager.replacementDict,
            runtimeStateManager
          ),
          {
            type: CallFunctionPlugin,
            func: () => {
              const participantCode = Object.values(
                jsPsych.data.getLastTimelineData().trials[0].response
              )[0];
              const newProps = {
                participantCode,
              };
              runtimeStateManager.set("participantCode", participantCode);

              jsPsych.data.addProperties(newProps);
            },
          },
        ]),
    ]),
    ...new If(runtimeStateManager.isTrue("FirstParticipation"))
      .Then(
        MultiLanguageSurveyShortCut(
          ["Age", "Gender"],
          staticContextManager.replacementDict,
          runtimeStateManager
        )
      )
      .Else([]),
  ];

  return { timeline: timeline };
}

 /**
 * @title HeDi-TOJ Exp 1 
 * @description HeDi-TOJ Exp1 - Lab-version 25-04-14
 * @version 1.3.2
 *
 * @assets assets/
 * @imageDir images/exp1,images/common
 * @audioDir audio/feedback
 */

// You can import stylesheets (.scss or .css).
import "../styles/main.scss";

import FullscreenPlugin from "@jspsych/plugin-fullscreen";
import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import SurveyMultiChoicePlugin from "@jspsych/plugin-survey-multi-choice";
import SurveyLikertPlugin from "@jspsych/plugin-survey-likert";
import SurveyTextPlugin from "@jspsych/plugin-survey-text";
import PreloadPlugin from "@jspsych/plugin-preload";
import { initJsPsych } from "jspsych";
import { FeatureView8 } from "./plugins/FeatureView_8examples";

import ClassificationComponent from "./plugins/ClassificationComponent";
import ClassificationComponent_withoutLikert from "./plugins/ClassificationComponent_withoutLikert";
import ClassificationComponent_reduced from "./plugins/ClassificationComponent_reduced";
import ClassificationComponent_reducedSecond from "./plugins/ClassificationComponent_reducedSecond";
import { data, error } from "jquery";
import CallFunctionPlugin from "@jspsych/plugin-call-function";


import ImageTojPluginTryOut from "./plugins/ImageTojPluginTryOut";

import { CtxManager } from "./util/CtxManager";
import { Introduction } from "./experimental_modules/introduction-template";
import { RuntimeStateManager } from "./util/RuntimeStateManager";
import { ConditionGenerator } from "./util/ConditionGenerator";

/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({ assetPaths, input = {}, environment, title, version }) {

  const conditionGenerator = [];
  const staticContextManager = [];
  const runtimeStateManager = [];
  const jsPsych = initJsPsych();

  const timeline = [];
  const timelineTutorial = [];
  const timelineWarning = [];

  // Preload assets
  timeline.push({
    type: PreloadPlugin,
    images: assetPaths.images,
    audio: assetPaths.audio,
    video: assetPaths.video,
  });

  // Switch to fullscreen 
  timeline.push({
    type: FullscreenPlugin,
    fullscreen_mode: true,
  });

  // create arrays for the types of forms for the examples
  const imagesExp_A_red = assetPaths.images.filter(str => str.startsWith("media/images/exp1/tutorial/TypA_red")); 
  const imagesExp_A_blue = assetPaths.images.filter(str => str.startsWith("media/images/exp1/tutorial/TypA_blue")); 

  const imagesExp_B_red = assetPaths.images.filter(str => str.startsWith("media/images/exp1/tutorial/TypB_red")); 
  const imagesExp_B_blue = assetPaths.images.filter(str => str.startsWith("media/images/exp1/tutorial/TypB_blue"));

  const imagesTutorial_TypeA = assetPaths.images.filter(str => str.startsWith("media/images/exp1/tutorial/TypA_50_50")).map(str => [str,"Typ A"]); 
  const imagesTutorial_TypeB = assetPaths.images.filter(str => str.startsWith("media/images/exp1/tutorial/TypB_50_50")).map(str => [str,"Typ B"]);
  
  const imagesTutorial_all = imagesTutorial_TypeA.concat(imagesTutorial_TypeB)
  const imagesTutorial_shuffled = jsPsych.randomization.shuffle(imagesTutorial_all);

  const imagesComparisonBlueRed_easyBlue_typeA = assetPaths.images.filter(
    str => str.startsWith("media/images/exp1/blue/easy/typeA")).map(str => [str,"TypeA"]);
  const imagesComparisonBlueRed_easyBlue_typeB = assetPaths.images.filter(
    str => str.startsWith("media/images/exp1/blue/easy/typeB")).map(str => [str,"TypeB"]);
  const imagesComparisonBlueRed_easyBlue = imagesComparisonBlueRed_easyBlue_typeA.concat(imagesComparisonBlueRed_easyBlue_typeB);
  const imagesComparisonBlueRed_hardBlue_typeA = assetPaths.images.filter(
    str => str.startsWith("media/images/exp1/blue/hard/typeA")).map(str => [str,"TypeA"]);
  const imagesComparisonBlueRed_hardBlue_typeB = assetPaths.images.filter(
    str => str.startsWith("media/images/exp1/blue/hard/typeB")).map(str => [str,"TypeB"]);
  const imagesComparisonBlueRed_hardBlue = imagesComparisonBlueRed_hardBlue_typeA.concat(imagesComparisonBlueRed_hardBlue_typeB);
  
  const imagesComparisonBlueRed_easyRed_typeA = assetPaths.images.filter(
    str => str.startsWith("media/images/exp1/red/easy/typeA")).map(str => [str,"TypeA"]);
  const imagesComparisonBlueRed_easyRed_typeB = assetPaths.images.filter(
    str => str.startsWith("media/images/exp1/red/easy/typeB")).map(str => [str,"TypeB"]);
  const imagesComparisonBlueRed_easyRed = imagesComparisonBlueRed_easyRed_typeA.concat(imagesComparisonBlueRed_easyRed_typeB);
  const imagesComparisonBlueRed_hardRed_typeA = assetPaths.images.filter(
    str => str.startsWith("media/images/exp1/red/hard/typeA")).map(str => [str,"TypeA"]);
  const imagesComparisonBlueRed_hardRed_typeB = assetPaths.images.filter(
    str => str.startsWith("media/images/exp1/red/hard/typeB")).map(str => [str,"TypeB"]);
  const imagesComparisonBlueRed_hardRed = imagesComparisonBlueRed_hardRed_typeA.concat(imagesComparisonBlueRed_hardRed_typeB);

  const imagesComparisonBlueRed_blue = imagesComparisonBlueRed_easyBlue.concat(imagesComparisonBlueRed_hardBlue);
  const imagesComparisonBlueRed_red = imagesComparisonBlueRed_easyRed.concat(imagesComparisonBlueRed_hardRed);
  const imagesComparisonBlueRed_blueShuffled = jsPsych.randomization.shuffle(imagesComparisonBlueRed_blue);
  const imagesComparisonBlueRed_redShuffled = jsPsych.randomization.shuffle(imagesComparisonBlueRed_red);

  const imagesComparisonRedRed_easyTypeA = assetPaths.images.filter(
    str => str.startsWith("media/images/exp1/redEasy/typeA")).map(str => [str,"TypeA"]);
  const imagesComparisonRedRed_easyTypeB = assetPaths.images.filter(
    str => str.startsWith("media/images/exp1/redEasy/typeB")).map(str => [str,"TypeB"]); 
  const imagesComparisonRedRed_easy = imagesComparisonRedRed_easyTypeA.concat(imagesComparisonRedRed_easyTypeB);
  const imagesComparisonRedRed_hardTypeA = assetPaths.images.filter(
    str => str.startsWith("media/images/exp1/redHard/typeA")).map(str => [str,"TypeA"]);
  const imagesComparisonRedRed_hardTypeB = assetPaths.images.filter(
    str => str.startsWith("media/images/exp1/redHard/typeB")).map(str => [str,"TypeB"]); 
  const imagesComparisonRedRed_hard = imagesComparisonRedRed_hardTypeA.concat(imagesComparisonRedRed_hardTypeB);
  const imagesComparisonRedRed_easyShuffled = jsPsych.randomization.shuffle(imagesComparisonRedRed_easy);
  const imagesComparisonRedRed_hardShuffled = jsPsych.randomization.shuffle(imagesComparisonRedRed_hard);

  const imagesComparisonBlueBlue_blue1TypeA = assetPaths.images.filter(str => str.startsWith("media/images/exp1/blue1/typeA")).map(str => [str,"TypeA"]);
  const imagesComparisonBlueBlue_blue1TypeB = assetPaths.images.filter(str => str.startsWith("media/images/exp1/blue1/typeB")).map(str => [str,"TypeB"]);
  const imagesComparisonBlueBlue_blue1 = imagesComparisonBlueBlue_blue1TypeA.concat(imagesComparisonBlueBlue_blue1TypeB);
  const imagesComparisonBlueBlue_blue2TypeA = assetPaths.images.filter(str => str.startsWith("media/images/exp1/blue2/typeA")).map(str => [str,"TypeA"]);
  const imagesComparisonBlueBlue_blue2TypeB = assetPaths.images.filter(str => str.startsWith("media/images/exp1/blue2/typeB")).map(str => [str,"TypeB"]);
  const imagesComparisonBlueBlue_blue2 = imagesComparisonBlueBlue_blue2TypeA.concat(imagesComparisonBlueBlue_blue2TypeB);
  const imagesComparisonBlueBlue_blue1Shuffled = jsPsych.randomization.shuffle(imagesComparisonBlueBlue_blue1);
  const imagesComparisonBlueBlue_blue2Shuffled = jsPsych.randomization.shuffle(imagesComparisonBlueBlue_blue2);

  const nTrainingBlocks = 6;
  const nTrainingTrials = 4;
  const nTutorialTrials = 10;
  
  let skip2Tutorial = false;
  var nCorrect = 0;
  let block = 0;

  const soaChoices = [-6, -3, -1, 0, 1, 3, 6].map((x) => (x * 16.6667).toFixed(3));
  const tutorialsoaChoices = [-8,-6,-3,3,6,8].map((x) => (x * 16.6667).toFixed(3));

  const repetitions = 10;
  const repetitionsTutorial = 2;

  const ComparisonFactor = {
    comparison: ["BlueRed", "RedRed","BlueBlue"]
  };
  const factorsBlueRed = {
    probeLeft: [true, false],
    soa: soaChoices,
  };
  const factorsRedRed = {
    probeLeft: [true, false],
    soa: soaChoices,
  };
  const factorsBlueBlue = {
    probeLeft: [true, false],
    soa: soaChoices,
  };
  const factorsTutorial = {
    probeLeft: [true, false],
    soa: tutorialsoaChoices,
  }

  const stimOffset = 300

  const trialSetBlueRed = jsPsych.randomization.factorial(factorsBlueRed, repetitions);
  const trialSetRedRed = jsPsych.randomization.factorial(factorsRedRed, repetitions);
  const trialSetBlueBlue = jsPsych.randomization.factorial(factorsBlueBlue, repetitions);
  const trialSetFullLength = jsPsych.randomization.factorial(ComparisonFactor, trialSetBlueRed.length)
  const trialSetTutorial = jsPsych.randomization.factorial(factorsTutorial, repetitionsTutorial)

  const procedure = `
  <p>Ihre Aufgabe in diesem Experiment ist es, zu lernen, die hier verwendeten Formen einem von zwei Typen richtig zuzuordnen.</p>
  <p>Sie werden zunächst in der <b>Übungsphase</b> die Möglichkeit haben, die korrekte Zuordnung zu lernen und zu üben. 
     Danach beginnt <b>eine erste Probephase</b>, bei der Sie ohne Hilfe Formen zuordnen sollen.
     Dieses Vorgehen wiederholt sich stets einmal, sodass Sie die Übungs- und Probephase jeweils zweimal vollständig bearbeiten. 
     Danach beginnt eine zweite Phase des Experiments. Die genauen Instruktionen werden vor jeder Phase angezeigt.</p>
  <p><b>Bitte beachten:</b> Die korrekte Zuordnung der Formen ändert sich im gesamten Experiment <b>nicht</b>. 
     In der Probe- und Testphase werden Ihnen keine Beispiele mehr als Hilfe angezeigt, sodass Sie versuchen sollten, die Zuordnung auswendig zu lernen.</p>
  `;
  const introduction = `
  <p>Im Folgenden haben Sie zunächst die Möglichkeit die Zuteilung der Formen in die <b>beiden Typen zu lernen</b>.
     Dafür werden Ihnen verschiedene Formen gezeigt. Es gibt zwei Typen von Formen: Typ A und Typ B. Ihre Aufgabe ist es, einzelne Formen dem richtigen Typ zuzuordnen.</p>
  <p>Sie erhalten keine direkten Informationen über die Regeln der korrekten Zuordnung. Sie erhalten lediglich Beispiele von korrekt zugeordneten Formen beider Typen und folgende Information:</p>
  <p>Entscheidend für die Zuordnung der Formen sind: die <b>Farbe</b>, das <b>Verhältnis von Breite und Höhe</b> und die <b>gekrümmte Linie</b> der Formen. 
     Auf der linken Seite des Bildschirms werden Formen des Typs A angezeigt. Auf der rechten Seite des Bildschirms werden Formen des Typs B angezeigt.
     In der unteren Bildschirmmitte wird Ihnen die Form angezeigt, die Sie entweder dem Typ A oder dem Typ B zuordnen sollen.</p>
  <p>Jede Form lässt sich anhand ihrer Eigenschaften eindeutig Typ A oder B zuordnen. 
     Nach jedem vierten Durchgang werden Ihnen neue Beispiele von korrekt zugeordneten Formen präsentiert. Insgesamt gibt es 24 Durchgänge zur Übung.</p>            
  `;

  const selectedInstruction = `
  <p>Hier sehen Sie Beispiele von korrekt zugeordneten Formen.</p>
  <p>Auf der linken Seite sehen Sie Formen des Typs A.</p>
  <p>Auf der rechten Seite sehen Sie Formen des Typs B.</p>
  <p>Entscheidend für die Zuordnung der Formen sind: die <b>Farbe</b>, das <b>Verhältnis von Breite und Höhe</b> und die <b>gekrümmte Linie</b> der Formen. </p>
  `;

  const procedureTestphase = `
  <p>Nun beginnt die <b>Probephase</b>.</p>
  <p>Hier wird Ihnen eine einzelne Form ohne Beispiele angezeigt. 
     Sie müssen erneut entscheiden, zu welchem Typ die Form gehört.</p>
  `;
  const procedureSecondPractice = `
  <p> Im Anschluss beginnt die <b>zweite Übungsphase</b>. Diese läuft genauso ab, wie die erste Übungsphase. 
      Es werden erneut Beispiele von korrekt zugeordneten Formen beider Typen gezeigt. In der 
      unteren Bildschirmmitte wird Ihnen die Form angezeigt, die Sie entweder dem Typ A oder B zuordnen sollen.
  </p>
  `;

  const tojInstruction =`
  <p> Nun beginnt der zweite Teil des Experiments. <br>
  Sie sehen gleich zwei Formen und mittig wird ein Punkt zu sehen sein. 
  Fokussieren Sie Ihren Blick möglichst während des gesamten Experiments auf den Punkt in der Mitte. <br>
  Beide gezeigten Formen werden kurz blinken. Ihre Aufgabe ist es, zu entscheiden, welche der beiden Formen zuerst geblinkt hat.<br>
  War es die linke Form, drücken Sie <b>Q</b>. War es die rechte Form, drücken Sie <b>P</b>.</p>

  <p> In zufälligen Abständen, müssen Sie zusätzlich per Tastendruck einschätzen, ob es sich bei den angezeigten Formen um Formen des Typ A oder des Typ B handelt.<br>
  Die Form die Sie beurteilen sollen, ist durch ein schwarzen Rahmen markiert. <br>
  Für die Formen des Typs A drücken sie die mit <b>A</b> markierte Taste. Für die Formen des Typs B, drücken sie die mit <b>B</b> markierte Taste.<br>
  Sie müssen diese Abfrage zügig beantworten. Sollten Sie zu lange für Ihre Antwort brauchen, erhalten Sie eine Warnung, dass Sie schneller antworten müssen. </p>

  <p>Versuchen Sie, genau zu sein und keine Fehler zu machen. Wenn Sie nicht wissen, welche Form zuerst geblinkt hat, raten Sie.
  Zunächst folgt ein Tutorial, bei dem Ihnen die Korrektheit jeder Antwort durch ein Geräusch rückgemeldet wird.</p>  
  `

  const cursor_off = {
    type: CallFunctionPlugin,
    func: function () {
      document.body.style.cursor = "none";
    },
  };

  const cursor_on = {
    type: CallFunctionPlugin,
    func: function () {
      document.body.style.cursor = "auto";
    },
  };

  // ID + previous XP prompt
  timeline.push({
    timeline: [
      {
        type: SurveyTextPlugin,
        questions: [{ prompt: "Bitte geben Sie Ihre Versuchspersonen-ID an:", required: true }],
        button_label: "Weiter"
      },
      {
        type: SurveyMultiChoicePlugin,
        questions: [
          {
            prompt: "Haben Sie bereits an einer Studie teilgenommen, bei der ebenfalls das Formen Material verwendet wurde?",
            options: ["Ja", "Nein"],
            required: true,
          },
        ],
        button_label: "Weiter",
      },
    ],
  });
  // Age + Gender prompt
  timeline.push({
    timeline: [
      {
        type: SurveyTextPlugin,
        questions: [{ prompt: "Bitte geben Sie Ihr Alter an (in Jahren):", required: true }],
        button_label: "Weiter"
      },
      {
        type: SurveyMultiChoicePlugin,
        questions: [
          {
            prompt: "Bitte geben Sie Ihr Geschlecht an:",
            options: ["männlich", "weiblich", "divers", "keine Angabe"],
            required: true,
            horizontal: true,
          },
        ],
        button_label: "Weiter",
      },
    ],
  });

  timeline.push({
    type: HtmlButtonResponsePlugin,
    stimulus: procedure,
    choices: ["Weiter"]
  })
  timeline.push({
    type: HtmlButtonResponsePlugin,
    stimulus: introduction,
    choices: ["Weiter"]
  })

  // loop for training trials with examples
  for (let block = 0; block < nTrainingBlocks; block++) {
    // ensure 2 subtype examples of each type; shuffle test images
    const imagesA_selection = imagesExp_A_red.slice(block*2, (block*2)+2).concat(
      imagesExp_A_blue.slice(block*2, (block*2)+2));
    const imagesA_selectionShuffled = jsPsych.randomization.shuffle(imagesA_selection);
    const imagesB_selection = imagesExp_B_red.slice(block*2, (block*2)+2).concat(
      imagesExp_B_blue.slice(block*2, (block*2)+2));
    const imagesB_selectionShuffled = jsPsych.randomization.shuffle(imagesB_selection);
    // create trials
    for (let trial = 0; trial < nTrainingTrials; trial++) {
      timeline.push((new FeatureView8(
        selectedInstruction,
        imagesA_selectionShuffled,
        imagesB_selectionShuffled,
        imagesTutorial_shuffled[(block*4)+trial][0],
        true,
        imagesTutorial_shuffled[(block*4)+trial][1]
      )))
    }
  }

  // loop rating task
  timeline.push({
    type: HtmlButtonResponsePlugin,
    stimulus: procedureTestphase,
    choices: ["Weiter"]
  })
  for (let trial = nTrainingBlocks*nTrainingTrials; trial < ((nTrainingBlocks*nTrainingTrials) + nTutorialTrials); trial++) {
    timeline.push({
      type: ClassificationComponent_withoutLikert,
      image: imagesTutorial_shuffled[trial][0], // not repeating training images
      play_feedback:true,
      category_prompt: "Zu welchem Typ gehört diese Form?", 
      category_Names:[
        {categoryName:"Typ A", categoryRight: imagesTutorial_shuffled[trial][1]=="Typ A"?true:false},
        {categoryName:"Typ B", categoryRight: imagesTutorial_shuffled[trial][1]=="Typ B"?true:false}
      ],
      data : {
        image: imagesTutorial_shuffled[trial][0],
      },
    })
  }

  /* 
  SECOND TRY
  */
  timeline.push({
    type: HtmlButtonResponsePlugin,
    stimulus: procedureSecondPractice,
    choices: ["Weiter"]
  })
  // loop for training trials with examples
  for (let block = nTrainingBlocks; block < nTrainingBlocks*2; block++) {
    // ensure 2 subtype examples of each type; shuffle test images
    const imagesA_selection = imagesExp_A_red.slice(block*2, (block*2)+2).concat(
      imagesExp_A_blue.slice(block*2, (block*2)+2));
    const imagesA_selectionShuffled = jsPsych.randomization.shuffle(imagesA_selection);
    const imagesB_selection = imagesExp_B_red.slice(block*2, (block*2)+2).concat(
      imagesExp_B_blue.slice(block*2, (block*2)+2));
    const imagesB_selectionShuffled = jsPsych.randomization.shuffle(imagesB_selection);
    // create trials
    for (let trial = 0; trial < nTrainingTrials; trial++) {
      timeline.push((new FeatureView8(
        selectedInstruction,
        imagesA_selectionShuffled,
        imagesB_selectionShuffled,
        imagesTutorial_shuffled[(block*4)+nTutorialTrials+trial][0],
        true,
        imagesTutorial_shuffled[(block*4)+nTutorialTrials+trial][1]
      )))
    }
  }

  timeline.push({
    type: HtmlButtonResponsePlugin,
    stimulus: procedureTestphase,
    choices: ["Weiter"]
  })
  // loop rating task - tutorial
  for (
    let trial = (((nTrainingBlocks*nTrainingTrials)*2) + nTutorialTrials);
    trial < ((((nTrainingBlocks*nTrainingTrials)*2) + nTutorialTrials) + (nTutorialTrials*2));
    trial++
  ) {
    timeline.push({
      type: ClassificationComponent_withoutLikert,
      image: imagesTutorial_shuffled[trial][0],
      play_feedback:true,
      category_prompt: "Zu welchem Typ gehört diese Form?",
      category_Names:[
        {categoryName:"Typ A", categoryRight: imagesTutorial_shuffled[trial][1]=="Typ A"?true:false},
        {categoryName:"Typ B", categoryRight: imagesTutorial_shuffled[trial][1]=="Typ B"?true:false}
      ],
      data : {
        image: imagesTutorial_shuffled[trial][0],
        correctAnswer: imagesTutorial_shuffled[trial][1]=="Typ A"?"Typ A":"Typ B",
      },
      on_finish: function (data) {
        if ( (data["category"] === data["correctAnswer"]) ) {
          nCorrect++;     
        }
        if ((nCorrect/(nTutorialTrials*2) >= 0.8) && (skip2Tutorial === false)) {
          skip2Tutorial=true;
        }  
      },
    })
  }
  timeline.push({
    type: HtmlKeyboardResponsePlugin,
    stimulus: () => {
      let prcntValue = (nCorrect/(nTutorialTrials*2)) *100 ;
      return`Sie hatten `+prcntValue.toFixed(2)+`% korrekt. Bitte geben Sie der Versuchsleitung Bescheid.`},
    choices: ["W"],
    on_finish: () => {
      nCorrect = 0;
    }
  })

  // option to repeat
  const tutorialSubTimeline = {
    timeline: timelineTutorial,
    timeline_variables: [1],
  };
  timelineTutorial.push({
    type: HtmlButtonResponsePlugin,
    stimulus: `<p>Sie haben erneut die Möglichkeit zu üben.</p>`,
    choices: ["Weiter"]
  })

  for (let block = nTrainingBlocks*2; block < ((nTrainingBlocks*2)+nTrainingBlocks); block++) {
    // ensure 2 subtype examples of each type; shuffle test images
    const imagesA_selection = imagesExp_A_red.slice(block*2, (block*2)+2).concat(
      imagesExp_A_blue.slice(block*2, (block*2)+2));
    const imagesA_selectionShuffled = jsPsych.randomization.shuffle(imagesA_selection);
    const imagesB_selection = imagesExp_B_red.slice(block*2, (block*2)+2).concat(
      imagesExp_B_blue.slice(block*2, (block*2)+2));
    const imagesB_selectionShuffled = jsPsych.randomization.shuffle(imagesB_selection);
    
    // create trials
    for (let trial = 0; trial < nTrainingTrials; trial++) {
      timelineTutorial.push((new FeatureView8(
        selectedInstruction,
        imagesA_selectionShuffled,
        imagesB_selectionShuffled,
        imagesTutorial_shuffled[(block*nTrainingTrials) + (nTutorialTrials*3) + trial][0], 
        true,
        imagesTutorial_shuffled[(block*nTrainingTrials) + (nTutorialTrials*3) + trial][1]
      )))
    }
  }

  timelineTutorial.push({
    type: HtmlButtonResponsePlugin,
    stimulus: procedureTestphase,
    choices: ["Weiter"]
  })

  // loop rating task - tutorial 3rd time
  for (
    let trial = (((nTrainingBlocks*nTrainingTrials)*3) + (nTutorialTrials*3));
     trial < (((nTrainingBlocks*nTrainingTrials)*3) + (nTutorialTrials*5));
     trial++) {
    timelineTutorial.push({
      type: ClassificationComponent_withoutLikert,
      image: imagesTutorial_shuffled[trial][0], 
      play_feedback:true,
      category_prompt: "Zu welchem Typ gehört diese Form?",
      category_Names:[
        {categoryName:"Typ A", categoryRight: imagesTutorial_shuffled[trial][1]=="Typ A"?true:false}, 
        {categoryName:"Typ B", categoryRight: imagesTutorial_shuffled[trial][1]=="Typ B"?true:false}
      ],
      data : {
        image: imagesTutorial_shuffled[trial][0],
        correctAnswer: imagesTutorial_shuffled[trial][1]=="Typ A"?"Typ A":"Typ B",
      },
      on_finish: function (data) {
        if ( (data["category"] === data["correctAnswer"]) ) {
          nCorrect++;     
        } 
      },
    })
  }

  timelineTutorial.push({
    type: HtmlKeyboardResponsePlugin,
    stimulus: () => {
      let prcntValue = (nCorrect/(nTutorialTrials*2)) *100 ;
      return`Sie hatten `+prcntValue.toFixed(2)+`% korrekt. Bitte geben Sie der Versuchsleitung Bescheid.`},
    choices: ["W"],
    on_finish: () => {
      nCorrect = 0;
    }
  })

  var if_node = {
    timeline: [tutorialSubTimeline],
    conditional_function: function(){
       if (skip2Tutorial) {
            return false;
        } else {
            return true;
        }
    }
  }
  timeline.push(if_node);

  // tryout if_nodeWarning
  const warningSubTimeline = {
    timeline: timelineWarning,
    timeline_variables: [1],
  };

  timelineWarning.push({
    type: HtmlKeyboardResponsePlugin,
    stimulus: "Sie waren zu langsam. Versuchen Sie Ihre Entscheidung schneller zu treffen!",
    choices: ["NO_KEYS"],
    trial_duration: 3000,
    on_start: () => {
      //console.log(jsPsych.data.getLastTrialData()["trials"][0]["category"])
    }
  })

  var if_nodeWarning = {
    timeline: [warningSubTimeline],
    conditional_function: function(){
       if (jsPsych.data.getLastTrialData()["trials"][0]["category"]==="tooSlow") {
            return true;
        } else {
            return false;
        }
    }
  }
  ////////////
  timeline.push({
    type: HtmlButtonResponsePlugin,
    stimulus: tojInstruction,
    choices: ["Weiter"]
  })

  timeline.push(cursor_off)
  for (let i = 0; i < trialSetTutorial.length; i++) {
    let trial = trialSetTutorial[i];
    let image1 = "";
    let image2 = "";
    image1 = imagesTutorial_shuffled.slice(i)[0]
    image2 = imagesTutorial_shuffled.slice(trialSetTutorial.length+i)[0]
    timeline.push(
      {
      type: ImageTojPluginTryOut,
      probe_image: image1[0],
      reference_image: image2[0],
      soa: trial.soa,
      fixation_time: 700,
      fixation_mark_html: `<img class='toj-fixation-mark absolute-position' src='media/images/common/fixmark.png' id="fixMark"></img>`,
      probe_key: () => (trial.probeLeft ? "q" : "p"),
      reference_key: () => (trial.probeLeft ? "p" : "q"),
      probe_properties:(trial.probeLeft?{
        "css":`margin-left: -${stimOffset}px; width:440px`
      }:{
        "css":`margin-left: ${stimOffset}px; width:440px`
      }),
      reference_properties:(trial.probeLeft?{
        "css":`margin-left: ${stimOffset}px; width:440px`
      }:{
        "css":`margin-left: -${stimOffset}px; width:440px`
      }),
      hide_stimuli: false,
      modification_function: (element) => ImageTojPluginTryOut.flashElement(element, "toj-flash", 30),
      play_feedback: true,
      on_start: (tmp) => {
        const probeLeft = trial.probeLeft;        // Log probeLeft
        const clssfctnCorrect = trial.clssfctnCorrectness;
        const clssfctnType = trial.clssfctnType;
        tmp.data = {
          probeLeft: probeLeft,
          clssfctnCorrect: clssfctnCorrect,
          clssfctnType: clssfctnType,
        };
      }, 
    },
    )
    if(jsPsych.randomization.sampleBernoulli(.5)===1) { 
      timeline.push(
        {
          type: ClassificationComponent_reduced,
          image1: image1[0],
          image2: image2[0],
          play_feedback: true,
          probeLeft: trial.probeLeft,
          clssfctn: ``,
          category_prompt: `</br>Zu welchem Typ gehört diese Form? </br> </br>`,
          category_Names:[
            {categoryName:"Typ A", categoryRight: image1[1]=="Typ A"?true:false, categoryKey: "a"},
            {categoryName:"Typ B", categoryRight: image1[1]=="Typ B"?true:false, categoryKey: "l"}
          ], 
          on_finish: (tmp) => {
            tmp.data = {
              image: image1[0],
            };
          },         
        })
        timeline.push(if_nodeWarning)
        timeline.push(
        {
          type: ClassificationComponent_reducedSecond,
          image1: image1[0],
          image2: image2[0],
          play_feedback: true,
          probeLeft: trial.probeLeft,
          clssfctn: ``,
          category_prompt: `</br>Zu welchem Typ gehört diese Form?</br> </br>`,
          category_Names:[
            {categoryName:"Typ A", categoryRight: image2[1]=="Typ A"?true:false, categoryKey: "a"},
            {categoryName:"Typ B", categoryRight: image2[1]=="Typ B"?true:false, categoryKey: "l"}
          ], 
          on_finish: (tmp) => {
            tmp.data = {
              image: image2[0],
            }
          },         
        }
      )
      timeline.push(if_nodeWarning)
    }
  }

  timeline.push(cursor_on)
  timeline.push({
    type: HtmlButtonResponsePlugin,
    stimulus: `<p>Sie haben das Tutorial absolviert. Ihre Aufgabe bleibt die gleiche: Bitte geben Sie an, welche Form zuerst geblinkt hat 
    und gelegentlich wird abgefragt um welchen Typ von Form es sich handelt.</p>
     <p> In regelmäßigen Abständen haben Sie die Möglichkeit, Pause zu machen.</p>
     <p> <b>Bitte beachten: </b> Ab sofort erhalten Sie keine Rückmeldung mehr per Ton, ob Sie bei Ihren Reihenfolge-Urteilen korrekt antworten.</p>
     `,
    choices: ["Weiter"],
  })

  // beginning of toj phase 
  let idxBlueRed = 0;
  let idxRedRed = 0;
  let idxBlueBlue = 0;
  timeline.push(cursor_off)
  for (let i = 0; i < trialSetFullLength.length; i++) {
    //console.log(trialSetFullLength[1]["comparison"])
    let image1 = "";
    let image2 = "";
    let trial = [];
    if (trialSetFullLength[i]["comparison"] === "BlueRed") {
      trial = trialSetBlueRed[idxBlueRed];
      image1 = imagesComparisonBlueRed_redShuffled.slice(idxBlueRed)[0];
      image2 = imagesComparisonBlueRed_blueShuffled.slice(idxBlueRed)[0];
      idxBlueRed++;
    } else if (trialSetFullLength[i]["comparison"] === "RedRed") {
      trial = trialSetRedRed[idxRedRed];
      image1 = imagesComparisonRedRed_hardShuffled.slice(idxRedRed)[0];
      image2 = imagesComparisonRedRed_easyShuffled.slice(idxRedRed)[0];
      idxRedRed++;
    } else if (trialSetFullLength[i]["comparison"] === "BlueBlue") {
      trial = trialSetBlueBlue[idxBlueBlue];
      image1 = imagesComparisonBlueBlue_blue1Shuffled.slice(idxBlueBlue)[0];
      image2 = imagesComparisonBlueBlue_blue2Shuffled.slice(idxBlueBlue)[0];
      idxBlueBlue++;
    }
    console.log(image1);
    timeline.push(
      {
      type: ImageTojPluginTryOut,
      probe_image: image1[0],
      reference_image: image2[0],
      soa: trial.soa,
      clssfctnType: trial.clssfctnType,
      fixation_time: 700,
      fixation_mark_html: `<img class='toj-fixation-mark absolute-position' src='media/images/common/fixmark.png' id="fixMark"></img>`,
      probe_key: () => (trial.probeLeft ? "q" : "p"),
      reference_key: () => (trial.probeLeft ? "p" : "q"),
      probe_properties:(trial.probeLeft?{
        "css":`margin-left: -${stimOffset}px; width:440px`
      }:{
        "css":`margin-left: ${stimOffset}px; width:440px`
      }),
      reference_properties:(trial.probeLeft?{
        "css":`margin-left: ${stimOffset}px; width:440px`
      }:{
        "css":`margin-left: -${stimOffset}px; width:440px`
      }),
      hide_stimuli: false,
      modification_function: (element) => ImageTojPluginTryOut.flashElement(element, "toj-flash", 30),
      play_feedback: false,
      on_start: (tmp) => {
        const probeLeft = trial.probeLeft;        // Log probeLeft
        const clssfctnCorrect = trial.clssfctnCorrectness;
        const clssfctnType = trial.clssfctnType;
        const comparisonType = trialSetFullLength[i]["comparison"];
        tmp.data = {
          probeLeft: probeLeft,
          clssfctnCorrect: clssfctnCorrect,
          clssfctnType: clssfctnType,
          comparisonType: comparisonType,
        };
      }  
    },
    )
    if(jsPsych.randomization.sampleBernoulli(.25)===1) { 
      timeline.push(
        {
          type: ClassificationComponent_reduced,
          image1: image1[0],
          image2: image2[0],
          play_feedback: true,
          probeLeft: trial.probeLeft,
          clssfctn: ``,
          category_prompt: `</br>Zu welchem Typ gehört diese Form? </br> </br>`,
          category_Names:[
            {categoryName:"Typ A", categoryRight: image1[1]=="TypeA"?true:false, categoryKey: "a"},
            {categoryName:"Typ B", categoryRight: image1[1]=="TypeB"?true:false, categoryKey: "l"}
          ], 
          on_finish: (tmp) => {
            tmp.data = {
              image: image1[0],
            }
          },         
        })
        timeline.push(if_nodeWarning)
        timeline.push(
        {
          type: ClassificationComponent_reducedSecond,
          image1: image1[0],
          image2: image2[0],
          play_feedback: true,
          probeLeft: trial.probeLeft,
          clssfctn: ``,
          category_prompt: `</br>Zu welchem Typ gehört diese Form?</br> </br>`,
          category_Names:[
            {categoryName:"Typ A", categoryRight: image2[1]=="TypeA"?true:false, categoryKey: "a"},
            {categoryName:"Typ B", categoryRight: image2[1]=="TypeB"?true:false, categoryKey: "l"}
          ], 
          on_finish: (tmp) => {
            tmp.data = {
              image: image2[0],
            }
          },         
        }
      )
      timeline.push(if_nodeWarning)
    }
    if(i>1 & i % 40 === 0) {
      block++;
      timeline.push(
        {
        type: HtmlKeyboardResponsePlugin,
        stimulus: `Sie haben `+block+` von insgesamt 11 Blöcken absolviert. </br> </br> Wenn Sie möchten, können Sie eine kurze Pause machen. Drücken Sie 'Enter' um fortzufahren . </br> </br>`,
        choices: ["Enter"],
      },
    )
    }
  }
  timeline.push(cursor_on)
  // open questions
  timeline.push({
    type: SurveyTextPlugin,
    questions: [
      {
      prompt:"Wie sind Sie bei der Zuordnung für Formen des Typs A vorgegangen bzw. woran habe Sie Formen des Typs A erkannt?", 
      rows: 10,
      columns: 140,
      required: true,
      },
      {
        prompt:"Wie sind Sie bei der Zuordnung für Formen des Typs B vorgegangen bzw. woran habe Sie Formen des Typs B erkannt?", 
        rows: 10,
        columns: 140,
        required: true,
        },
      ],
      button_label: "Weiter",
  })
  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}

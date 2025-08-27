import { JsPsych } from 'jspsych';
import * as jquery from "jquery";
import { ParameterType } from 'jspsych';

import { playAudio } from "../util/audio";

const info = {
    name: "classification-component",
    parameters: {
        play_feedback:{
            type: ParameterType.BOOL,
            pretty_name: "Play Feedback",
            default: false,
        },
        category_prompt:{
            type: ParameterType.HTML_STRING,
            pretty_name: "Category Prompt",
            default: undefined,
        },
        image:{
            type: ParameterType.STRING,
            pretty_name: "image",
            default: undefined,
        },
        category_Names: {
            type: ParameterType.COMPLEX,
            array: true,
            pretty_name: "Category Names",
            nested: {
                /** Question prompt. */
                categoryName: {
                    type: ParameterType.STRING,
                    pretty_name: "Category Name",
                    default: undefined,
                },
                categoryRight: {
                    type: ParameterType.BOOL,
                    pretty_name: "Category Is Right",
                    default: false,
                },
            }
        }
    }
};
/**
 * **Classification Component**
 *
 * jsPsych plugin for presenting multiple choice survey questions
 *
 * @author Kai Biermeier
 */
class ClassificationComponent {
    private _jsPsych: JsPsych
    public static info:any
    constructor(jsPsych: JsPsych) {
        this._jsPsych = jsPsych;
    }
    trial(display_element, trial) {
        display_element.innerHTML = `
        <img id="ToBeClassified" src="`+trial.image+`"/></br>
        <div>`+trial.category_prompt+`</div>
        <button style="width:100px; height: 50px;" id="CategoryA">`+trial.category_Names[0].categoryName+`</button>
        <button style="width:100px; height: 50px;" id="CategoryB"/>`+trial.category_Names[1].categoryName+`</button></br>
        `;
        (new Promise((res) => {
            let CategorySelected = false
            let category = ""

            display_element.querySelector("#CategoryA").onclick = (evt: PointerEvent) => {
                (evt.target as any).style["background-color"] = "gray";
                display_element.querySelector("#CategoryB").style["background-color"] = "inherit";
                category = trial.category_Names[0].categoryName
                CategorySelected = true;
                return res({
                    category
                })
            }
            display_element.querySelector("#CategoryB").onclick = (evt: PointerEvent) => {
                (evt.target as any).style["background-color"] = "gray";
                display_element.querySelector("#CategoryA").style["background-color"] = "inherit";
                category = trial.category_Names[1].categoryName
                CategorySelected = true;
                return res({
                    category
                })
            }
        })).then( (value: any) => {

            const rightCategory = (trial.category_Names[0].categoryRight)?trial.category_Names[0].categoryName:trial.category_Names[1].categoryName

            const correct = value?.category == rightCategory
            if (trial.play_feedback) {
                playAudio(`media/audio/feedback/${correct ? "right" : "wrong"}.wav`);
            };

            jquery(display_element).children().remove()
            this._jsPsych.finishTrial(value)
        })
    }
}
ClassificationComponent.info = info;

export { ClassificationComponent as default };
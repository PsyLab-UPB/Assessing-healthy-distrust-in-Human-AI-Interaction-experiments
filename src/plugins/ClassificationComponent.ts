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
        likert_prompt:{
            type: ParameterType.HTML_STRING,
            pretty_name: "Likert Prompt",
            default: undefined,
        },
        image:{
            type: ParameterType.STRING,
            pretty_name: "image",
            default: undefined,
        },
        likert_items: {
            type: ParameterType.COMPLEX,
            array: true,
            pretty_name: "Likert Items",
            nested: {
                /** Question prompt. */
                itemName: {
                    type: ParameterType.STRING,
                    pretty_name: "Item Name",
                    default: undefined,
                },
            }
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
        <div>`+trial.likert_prompt+`</div>
        <button style="width:100px; height: 50px;" id="Likert1"/>`+trial.likert_items[0].itemName+`</button>
        <button style="width:100px; height: 50px;" id="Likert2"/>`+trial.likert_items[1].itemName+`</button>
        <button style="width:100px; height: 50px;" id="Likert3"/>`+trial.likert_items[2].itemName+`</button>
        <button style="width:100px; height: 50px;" id="Likert4"/>`+trial.likert_items[3].itemName+`</button>
        <button style="width:100px; height: 50px;" id="Likert5"/>`+trial.likert_items[4].itemName+`</button>
        <button style="width:100px; height: 50px;" id="Likert6"/>`+trial.likert_items[5].itemName+`</button>
        <button style="width:100px; height: 50px;" id="Likert7"/>`+trial.likert_items[6].itemName+`</button>
        `;
        (new Promise((res) => {
            let CategorySelected = false
            let CertaintySelected = false

            let certainty = ""
            let category = ""

            display_element.querySelector("#CategoryA").onclick = (evt: PointerEvent) => {
                (evt.target as any).style["background-color"] = "gray";
                display_element.querySelector("#CategoryB").style["background-color"] = "inherit";
                category = trial.category_Names[0].categoryName
                CategorySelected = true;
                if(CertaintySelected){
                    return res({
                        certainty,
                        category
                    })
                }

            }
            display_element.querySelector("#CategoryB").onclick = (evt: PointerEvent) => {
                (evt.target as any).style["background-color"] = "gray";
                display_element.querySelector("#CategoryA").style["background-color"] = "inherit";
                category = trial.category_Names[1].categoryName
                CategorySelected = true;
                if(CertaintySelected){
                    return res({
                        certainty,
                        category
                    })
                }
            }
            display_element.querySelector("#Likert1").onclick = (evt: PointerEvent) => {
                (evt.target as any).style["background-color"] = "gray";
                display_element.querySelector("#Likert2").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert3").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert4").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert5").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert6").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert7").style["background-color"] = "lightgray";

                certainty = "1"
                CertaintySelected = true;
                if(CategorySelected){
                    return res({
                        certainty,
                        category
                    })
                }
            }
            display_element.querySelector("#Likert2").onclick = (evt: PointerEvent) => {
                (evt.target as any).style["background-color"] = "gray";
                display_element.querySelector("#Likert1").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert3").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert4").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert5").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert6").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert7").style["background-color"] = "lightgray";
                certainty = "2"
                CertaintySelected = true;
                if(CategorySelected){
                    return res({
                        certainty,
                        category
                    })
                }
            }
            display_element.querySelector("#Likert3").onclick = (evt: PointerEvent) => {
                (evt.target as any).style["background-color"] = "gray";
                display_element.querySelector("#Likert1").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert2").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert4").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert5").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert6").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert7").style["background-color"] = "lightgray";
                certainty = "3"
                CertaintySelected = true;
                if(CategorySelected){
                    return res({
                        certainty,
                        category
                    })
                }
            }
            display_element.querySelector("#Likert4").onclick = (evt: PointerEvent) => {
                (evt.target as any).style["background-color"] = "gray";
                display_element.querySelector("#Likert1").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert2").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert3").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert5").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert6").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert7").style["background-color"] = "lightgray";
                certainty = "4"
                CertaintySelected = true;
                if(CategorySelected){
                    return res({
                        certainty,
                        category
                    })
                }
            }
            display_element.querySelector("#Likert5").onclick = (evt: PointerEvent) => {
                (evt.target as any).style["background-color"] = "gray";
                display_element.querySelector("#Likert1").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert2").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert3").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert4").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert6").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert7").style["background-color"] = "lightgray";
                certainty = "5"
                CertaintySelected = true;
                if(CategorySelected){
                    return res({
                        certainty,
                        category
                    })
                }
            }
            display_element.querySelector("#Likert6").onclick = (evt: PointerEvent) => {
                (evt.target as any).style["background-color"] = "gray";
                display_element.querySelector("#Likert1").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert2").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert3").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert4").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert5").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert7").style["background-color"] = "lightgray";
                certainty = "6"
                CertaintySelected = true;
                if(CategorySelected){
                    return res({
                        certainty,
                        category
                    })
                }
            }
            display_element.querySelector("#Likert7").onclick = (evt: PointerEvent) => {
                (evt.target as any).style["background-color"] = "gray";
                display_element.querySelector("#Likert1").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert2").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert3").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert4").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert5").style["background-color"] = "lightgray";
                display_element.querySelector("#Likert6").style["background-color"] = "lightgray";
                certainty = "7"
                CertaintySelected = true;
                if(CategorySelected){
                    return res({
                        certainty,
                        category
                    })
                }
            }
        })).then( (value: any) => {

            const rightCategory = (trial.category_Names[0].categoryRight)?trial.category_Names[0].categoryName:trial.category_Names[1].categoryName

            const correct = value?.category == rightCategory
            if (trial.play_feedback) {
                playAudio(`assets/audio/feedback/${correct ? "right" : "wrong"}.wav`);
            };

            jquery(display_element).children().remove()
            this._jsPsych.finishTrial(value)
        })
    }
}
ClassificationComponent.info = info;

export { ClassificationComponent as default };
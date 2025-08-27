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
       /* likert_prompt:{
            type: ParameterType.HTML_STRING,
            pretty_name: "Likert Prompt",
            default: undefined,
        },*/
        
        image2:{
            type: ParameterType.STRING,
            pretty_name: "image2",
            default: undefined,
        },
        /* probeLeft:{
            type: ParameterType.BOOL,
            pretty_name: "probeLeft",
            default: undefined,
        }, */
        /*likert_items: {
            type: ParameterType.COMPLEX,
            array: true,
            pretty_name: "Likert Items",
            nested: {
                /** Question prompt. *//*
                itemName: {
                    type: ParameterType.STRING,
                    pretty_name: "Item Name",
                    default: undefined,
                },
            }
        }, 
        */
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
        console.log(`log from class:`+trial.probeLeft+``);
        //let imageLeft;
        let imageRight = trial.image2;
        //let alphaLeft;
        let alphaRight = 1;
        //let borderLeft;
        let borderRight = "border: 5px solid #000000";
        /* if(trial.probeLeft) {
            imageRight = trial.image2;
            alphaLeft = 0.1;
            alphaRight = 1;
            borderLeft = ""
            borderRight = "border: 5px solid #000000";
        } else {
            imageRight = trial.image1;
            alphaLeft = 1;
            alphaRight = 0.1;
            borderLeft = "border: 5px solid #000000";
            borderRight = "";
        } */
        
        display_element.innerHTML = `
        <div>`+trial.clssfctn+`</div>
        <img id="ToBeClassified2" src="`+imageRight+`" style="opacity:`+alphaRight+`; `+borderRight+`; width:440px" > </br> </br>
        <div>`+trial.category_prompt+`</div>
        <button style="width:100px; height: 50px;" id="CategoryA">`+trial.category_Names[0].categoryName+`</button>
        <button style="width:100px; height: 50px;" id="CategoryB"/>`+trial.category_Names[1].categoryName+`</button></br>    
        `;
        (new Promise((res) => {
            let CategorySelected = false
            let category = ""

            // for Screentest
            //setTimeout(() => {res(category)}, 250);

            /* // set Timeout
            var time_left = 1; // time to answer in seconds, change here for shorter/longer time
            var timer = setInterval(function(){
            //display_element.querySelector("#TimerDisplay").innerHTML = "00:" + (time_left < 10 ? '0' +  time_left: time_left);
            time_left --;            
            if (time_left < 0){
                clearInterval(timer);
                display_element.querySelector("#CategoryA").disabled = true;
                display_element.querySelector("#CategoryB").disabled = true;
                //display_element.querySelector("#CategoryC").disabled = true;
    
                //trial.data.too_Late = true;
                category = "tooSlow";
                document.removeEventListener('keydown', keyListener); 
                return res({category}) 
            }   
            }, 1000);
 */
            display_element.querySelector("#CategoryA").onclick = (evt: PointerEvent) => {
                (evt.target as any).style["background-color"] = "gray";
                display_element.querySelector("#CategoryB").style["background-color"] = "inherit";
                category = trial.category_Names[0].categoryName
                CategorySelected = true;
                //clearInterval(timer);
                return res({
                    category
                })
            }
            display_element.querySelector("#CategoryB").onclick = (evt: PointerEvent) => {
                (evt.target as any).style["background-color"] = "gray";
                display_element.querySelector("#CategoryA").style["background-color"] = "inherit";
                category = trial.category_Names[1].categoryName
                CategorySelected = true;
                //clearInterval(timer);
                return res({
                    category
                })
            }
            
            // Add a keydown event listener
            const keyListener = (e: KeyboardEvent) => {
                if (!CategorySelected) {
                    if (e.key === trial.category_Names[0].categoryKey || e.key === trial.category_Names[0].categoryKey.toUpperCase()) {
                        // Select Category A
                        display_element.querySelector("#CategoryA").style["background-color"] = "gray";
                        display_element.querySelector("#CategoryB").style["background-color"] = "inherit";
                        category = trial.category_Names[0].categoryName;
                        CategorySelected = true;
                        //clearInterval(timer);
                        // Remove listener after response
                        document.removeEventListener('keydown', keyListener);

                        return res({ category });
                    } else if (e.key === trial.category_Names[1].categoryKey || e.key === trial.category_Names[1].categoryKey.toUpperCase()) {
                        // Select Category B
                        display_element.querySelector("#CategoryB").style["background-color"] = "gray";
                        display_element.querySelector("#CategoryA").style["background-color"] = "inherit";
                        category = trial.category_Names[1].categoryName;
                        CategorySelected = true;
                        //clearInterval(timer);
                        // Remove listener after response
                        document.removeEventListener('keydown', keyListener);

                        return res({ category });
                    }
                }
            };

            // Attach the listener
            document.addEventListener('keydown', keyListener);    
            //

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
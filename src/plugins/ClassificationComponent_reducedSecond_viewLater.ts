import { JsPsych } from 'jspsych';
import * as jquery from "jquery";
import { ParameterType } from 'jspsych';

import { playAudio } from "../util/audio";

const info = {
    name: "classification-component-viewLater2",
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
        image1:{
            type: ParameterType.STRING,
            pretty_name: "image1",
            default: undefined,
        },
        image2:{
            type: ParameterType.STRING,
            pretty_name: "image2",
            default: undefined,
        },
        probeLeft:{
            type: ParameterType.BOOL,
            pretty_name: "probeLeft",
            default: undefined,
        },
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
                categoryKey: {
                    type: ParameterType.KEY,
                    pretty_name: "Response Key",
                    default: undefined,
                }
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
        let imageLeft;
        let imageRight;
        let alphaLeft;
        let alphaRight;
        let borderLeft;
        let borderRight;
        let category_later = false; //for view later sound (none)
        if(trial.probeLeft) {
            imageLeft = trial.image1;
            imageRight = trial.image2;
            alphaLeft = 0.1;
            alphaRight = 1;
            borderLeft = ""
            borderRight = "border: 5px solid #000000";
        } else {
            imageLeft = trial.image2;
            imageRight = trial.image1;
            alphaLeft = 1;
            alphaRight = 0.1;
            borderLeft = "border: 5px solid #000000";
            borderRight = "";
        }
        
        display_element.innerHTML = `
        <div>`+trial.clssfctn+`</div>
        <img id="ToBeClassified1" src="`+imageLeft+`" style="opacity:`+alphaLeft+`; `+borderLeft+`; width:440px" >
        <img id="ToBeClassified2" src="`+imageRight+`" style="opacity:`+alphaRight+`; `+borderRight+`; width:440px" > </br> </br>
        <div>`+trial.category_prompt+`</div>
        <button style="width:200px; height: 50px;" id="CategoryA">`+trial.category_Names[0].categoryName+`</button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button style="width:200px; height: 50px;" id="CategoryB"/>`+trial.category_Names[1].categoryName+`</button></br>
        </br>
        <!-- <div>`+trial.category_prompt+`</div> -->
        <button style="width:200px; height: 50px;" id="CategoryC"/>`+trial.category_Names[2].categoryName+`</button></br>
        `;

        // comment out for Screentest
        const responseStartTime = performance.now();
        //
        (new Promise((res) => {
            let CategorySelected = false
            let category = ""
            /// for Screentest
            //setTimeout(() => {
            //    clearInterval(timer);
            //    document.removeEventListener('keydown', keyListener); 
            //    return res(trial.category_Names[2].categoryName)
            //}, 250);
            ///
            // set Timeout
            var time_left = 2; // time to answer in seconds, change here for shorter/longer time
            var timer = setInterval(function(){
            //display_element.querySelector("#TimerDisplay").innerHTML = "00:" + (time_left < 10 ? '0' +  time_left: time_left);
            time_left --;            
            if (time_left < 0){
                clearInterval(timer);
                display_element.querySelector("#CategoryA").disabled = true;
                display_element.querySelector("#CategoryB").disabled = true;
                //display_element.querySelector("#CategoryC").disabled = true;
    
                trial.too_Late = true;
                category = "tooSlow";
                document.removeEventListener('keydown', keyListener); 
                return res({category}) 
            }   
            }, 1000);

            display_element.querySelector("#CategoryA").onclick = (evt: PointerEvent) => {
                (evt.target as any).style["background-color"] = "gray";
                display_element.querySelector("#CategoryB").style["background-color"] = "inherit";
                display_element.querySelector("#CategoryC").style["background-color"] = "inherit";
                category = trial.category_Names[0].categoryName
                CategorySelected = true;
                clearInterval(timer);
                return res({
                    category
                })
            }
            display_element.querySelector("#CategoryB").onclick = (evt: PointerEvent) => {
                (evt.target as any).style["background-color"] = "gray";
                display_element.querySelector("#CategoryA").style["background-color"] = "inherit";
                display_element.querySelector("#CategoryC").style["background-color"] = "inherit";
                category = trial.category_Names[1].categoryName
                CategorySelected = true;
                clearInterval(timer);
                return res({
                    category
                })
            }
            display_element.querySelector("#CategoryC").onclick = (evt: PointerEvent) => {
                (evt.target as any).style["background-color"] = "gray";
                display_element.querySelector("#CategoryA").style["background-color"] = "inherit";
                display_element.querySelector("#CategoryB").style["background-color"] = "inherit";
                category = trial.category_Names[2].categoryName
                CategorySelected = true;
                category_later = true;
                clearInterval(timer);
                return res({
                    category
                })
            }

            const keyListener = (e: KeyboardEvent) => {
                if (!CategorySelected) {
                    if (e.key ===  trial.category_Names[0].categoryKey || e.key === trial.category_Names[0].categoryKey.toUpperCase()) {
                        // Select Category A
                        display_element.querySelector("#CategoryA").style["background-color"] = "gray";
                        display_element.querySelector("#CategoryB").style["background-color"] = "inherit";
                        display_element.querySelector("#CategoryC").style["background-color"] = "inherit";
                        category = trial.category_Names[0].categoryName;
                        CategorySelected = true;
                        clearInterval(timer);

                        // Remove listener after response
                        document.removeEventListener('keydown', keyListener);

                        return res({ category });
                    } else if (e.key === trial.category_Names[1].categoryKey || e.key === trial.category_Names[1].categoryKey.toUpperCase()) {
                        // Select Category B
                        display_element.querySelector("#CategoryB").style["background-color"] = "gray";
                        display_element.querySelector("#CategoryA").style["background-color"] = "inherit";
                        display_element.querySelector("#CategoryC").style["background-color"] = "inherit";
                        category = trial.category_Names[1].categoryName;
                        CategorySelected = true;
                        clearInterval(timer);

                        // Remove listener after response
                        document.removeEventListener('keydown', keyListener);

                        return res({ category });
                    }
                    else if (e.key === trial.category_Names[2].categoryKey || e.key === trial.category_Names[2].categoryKey.toUpperCase()){
                        //Select view later
                        display_element.querySelector("#CategoryC").style["background-color"] = "gray";
                        display_element.querySelector("#CategoryA").style["background-color"] = "inherit";
                        display_element.querySelector("#CategoryB").style["background-color"] = "inherit";
                        category = trial.category_Names[2].categoryName;
                        CategorySelected = true;
                        category_later = true;
                        clearInterval(timer);
                        // Remove listener after response
                        document.removeEventListener('keydown', keyListener);

                        return res({ category });
                    }
                    // gucken ob funktioniert, key für später anschauen: leertaste
                }
            };

            // Attach the listener
            document.addEventListener('keydown', keyListener);    
            //
            /* display_element.querySelector("#CategoryB").onclick = (evt: PointerEvent) => {
                (evt.target as any).style["background-color"] = "gray";
                display_element.querySelector("#CategoryA").style["background-color"] = "inherit";
                display_element.querySelector("#CategoryC").style["background-color"] = "inherit";
                category = trial.category_Names[1].categoryName
                CategorySelected = true;
                return res({
                    category
                })
            } */

        })).then( (value: any) => {

            // comment out for Screentest
            const responseEndTime = performance.now();
            value.rt = Math.round(responseEndTime - responseStartTime);

            const rightCategory = (trial.category_Names[0].categoryRight)?trial.category_Names[0].categoryName:trial.category_Names[1].categoryName;
            if(!category_later) {
                const correct = value?.category == rightCategory
                if (trial.play_feedback) {
                    playAudio(`media/audio/feedback/${correct ? "right" : "wrong"}.wav`);
                };
            }
            jquery(display_element).children().remove()
            this._jsPsych.finishTrial(value)
        
        })
    }
}
ClassificationComponent.info = info;

export { ClassificationComponent as default };
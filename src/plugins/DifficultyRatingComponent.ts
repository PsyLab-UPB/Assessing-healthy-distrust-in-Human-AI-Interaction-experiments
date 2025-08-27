import * as jquery from "jquery";
import "webpack-jquery-ui"
import { JsPsych } from 'jspsych';

import { ParameterType } from 'jspsych';
const info = {
    name: "difficulty-rating-component",
    parameters: {
        prompt:{
            type: ParameterType.HTML_STRING,
            pretty_name: "Prompt",
            default: undefined,
        },
        images: {
            type: ParameterType.COMPLEX,
            array: true,
            pretty_name: "Images",
            nested: {
                /** Question prompt. */
                itemName: {
                    type: ParameterType.STRING,
                    pretty_name: "image",
                    default: undefined,
                },
            }
        },
    }
};
/**
 * **DifficultyRating Component**
 *
 * jsPsych plugin for rating image by difficulty
 *
 * @author Kai Biermeier
 */
class DifficultyRatingComponent{
    private _jsPsych: JsPsych
    public static info:any
    constructor(jsPsych: JsPsych) {
        this._jsPsych = jsPsych;
    }
    trial(display_element, trial) {
        jquery(display_element).append(trial.prompt)
        jquery(display_element).append("<ul id='sortable' style='overflow: auto; height: 80vh'></ul><br>")
        const images = trial.images.map((image) => image.image)
        for(const image of images){
            jquery("#sortable").append("<li><img width='100' height='100' data='"+image+"' src='"+image+"'></li>")
        }
        jquery( "#sortable" ).sortable();
        jquery( "#sortable" ).disableSelection();
        jquery(display_element).append("<button id= 'SubmitOrder'>Submit Order</button>")
        jquery("#SubmitOrder").on("click", () => {
            let items = []
            jquery.each(jquery('#sortable').find('img'), function() {
                items.push((jquery(this).attr("src") as never))
            });
            jquery(display_element).children().remove()
            this._jsPsych.finishTrial({order:items})
        })
    }
}
DifficultyRatingComponent.info = info;

export { DifficultyRatingComponent as default };
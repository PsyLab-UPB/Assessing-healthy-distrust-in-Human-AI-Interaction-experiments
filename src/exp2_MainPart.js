/**
 * @title He-Di TOJ Exp 2 Main Part
 * @description This is the Main Part for the second healthy distrust toj experiment.
 * @version 2.0.0
 *
 * @assets assets/
 * @imageDir images/exp2,images/common
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
import randomInt from "random-int";

import ClassificationComponent from "./plugins/ClassificationComponent";
import ClassificationComponent_reduced_viewLater from "./plugins/ClassificationComponent_reduced_viewLater";
import ClassificationComponent_reducedSecond_viewLater from "./plugins/ClassificationComponent_reducedSecond_viewLater";
import ClassificationComponent_reduced from "./plugins/ClassificationComponent_reduced";
import ClassificationComponent_reducedSecond from "./plugins/ClassificationComponent_reducedSecond";
import ClassificationComponent_reduced_repeatedView from "./plugins/ClassificationComponent_reduced_repeatedView";
import ClassificationComponent_reducedSecond_repeatedView from "./plugins/ClassificationComponent_reducedSecond_repeatedView";
import { data, error, type } from "jquery";
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
    const timelineWarning = []; 

    // URL params
    let searchString = window.location.search
    let urlParam = new URLSearchParams(searchString);
    let VP_id = urlParam.get("VP");
    let expVersion = urlParam.get("Version");
    let session = urlParam.get("Session");
    jsPsych.data.addProperties({
        vpID: VP_id,
        expVersion: expVersion,
        session: session
    })

    alert(
        `Sie starten das Experiment mit folgenden Einstellungen: \n VP = `+VP_id+`\n Version = `+expVersion+` \n und Session = `+session+``
    )

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

    // VP-ID prompt
    timeline.push({
        timeline: [
            {
                type: SurveyTextPlugin,
                questions: [{ prompt: "Bitte geben Sie Ihre Versuchspersonen-ID ein:", required: true }],
                button_label: "Weiter",
            }
        ],
    });
 
    // setting the seed
    jsPsych.randomization.setSeed(VP_id);

    // create arrays for the types of forms
    const images_TypeA = assetPaths.images.filter(str => str.startsWith("media/images/exp2/TypA")).map(str => [str,"Typ A",""]);
    const images_TypeB = assetPaths.images.filter(str => str.startsWith("media/images/exp2/TypB")).map(str => [str,"Typ B",""]);
    const imagesShuffled_TypeAsing = jsPsych.randomization.shuffle(images_TypeA);
    const imagesShuffled_TypeBsing = jsPsych.randomization.shuffle(images_TypeB);
    const imagesShuffled_TypeA = imagesShuffled_TypeAsing.concat(imagesShuffled_TypeAsing);
    const imagesShuffled_TypeB = imagesShuffled_TypeBsing.concat(imagesShuffled_TypeBsing);

    const imagesTutorial_TypeA = assetPaths.images.filter(str => str.startsWith("media/images/exp2/TypA")).map(str => [str,"Typ A",""]); 
    const imagesTutorial_TypeB = assetPaths.images.filter(str => str.startsWith("media/images/exp2/TypB")).map(str => [str,"Typ B",""]);
    const imagesTutorial_all = imagesTutorial_TypeA.concat(imagesTutorial_TypeB)
    const imagesTutorial_shuffled = jsPsych.randomization.shuffle(imagesTutorial_all);

    const soaChoices = [-6, -3, -1, 0, 1, 3, 6].map((x) => (x * 16.6667).toFixed(3));
    const tutorialsoaChoices = [-6, -3, 3, 6].map((x) => (x * 16.6667).toFixed(3));

    const stimOffset = 300;

    const repetitions = 1;
    const factorsTutorialA = {
        probeLeft: [true, false],
        clssfctnType: ["Typ A"],
        clssfctnCorrectness: ["2correct", "2false", "1each"],
        soa: tutorialsoaChoices,
    };
    const factorsTutorialB = {
        probeLeft: [true, false],
        clssfctnType: ["Typ B"],
        clssfctnCorrectness: ["2correct", "2false", "1each"],
        soa: tutorialsoaChoices,
    };

    const probeLeft = [true,false];
    const condition = ["2correct", "2false", "1each"];
    
    let customArray_typeA = [];
    condition.forEach(cond => {
        probeLeft.forEach(probe => {
            soaChoices.forEach(soa => {
                if (soa === "-100.000" || soa === "100.000") {
                    for (let i = 0; i < 7; i++) {
                        customArray_typeA.push({clssfctnType: "Typ A", clssfctnCorrectness: cond, probeLeft: probe, soa: soa})
                    } 
                } else if ((soa === "-50.000" || soa === "50.000")) {
                    for (let i = 0; i < 10; i++) {
                        customArray_typeA.push({clssfctnType: "Typ A", clssfctnCorrectness: cond, probeLeft: probe, soa: soa})
                    } 
                } else {
                    for (let i = 0; i < 12; i++) {
                        customArray_typeA.push({clssfctnType: "Typ A", clssfctnCorrectness: cond, probeLeft: probe, soa: soa})
                    }
                }
            })
        })
    })
    let customArray_typeB = [];
    condition.forEach(cond => {
        probeLeft.forEach(probe => {
            soaChoices.forEach(soa => {
                if (soa === "-100.000" || soa === "100.000") {
                    for (let i = 0; i < 7; i++) {
                        customArray_typeB.push({clssfctnType: "Typ B", clssfctnCorrectness: cond, probeLeft: probe, soa: soa})
                    } 
                } else if ((soa === "-50.000" || soa === "50.000")) {
                    for (let i = 0; i < 10; i++) {
                        customArray_typeB.push({clssfctnType: "Typ B", clssfctnCorrectness: cond, probeLeft: probe, soa: soa})
                    } 
                } else {
                    for (let i = 0; i < 12; i++) {
                        customArray_typeB.push({clssfctnType: "Typ B", clssfctnCorrectness: cond, probeLeft: probe, soa: soa})
                    }
                }
            })
        })
    })


    const customArray_typeA_shuffled1 = jsPsych.randomization.shuffle(customArray_typeA);
    const customArray_typeB_shuffled1 = jsPsych.randomization.shuffle(customArray_typeB);

    function mergeAlternatingBatches(arrayA, arrayB, batchSize = 30) {
        let mergedArray = [];
            let indexA = 0, indexB = 0;    
        while (indexA < arrayA.length || indexB < arrayB.length) {
            if (indexA < arrayA.length) {
                mergedArray.push(...arrayA.slice(indexA, indexA + batchSize));
                indexA += batchSize;
            }
            if (indexB < arrayB.length) {
                mergedArray.push(...arrayB.slice(indexB, indexB + batchSize));
                indexB += batchSize;
            }
            }    
        return mergedArray
    }

    const trialSetTutorialA = jsPsych.randomization.factorial(factorsTutorialA, repetitions);
    const trialSetTutorialB = jsPsych.randomization.factorial(factorsTutorialB, repetitions);

    
    let trialSet = [];
    let trialSetTutorial = [];
    if(jsPsych.randomization.sampleBernoulli(.5)) {  
        trialSet = mergeAlternatingBatches(customArray_typeA_shuffled1, customArray_typeB_shuffled1);
        trialSetTutorial = mergeAlternatingBatches(trialSetTutorialA, trialSetTutorialB, 24);
    } else {
        trialSet = mergeAlternatingBatches(customArray_typeB_shuffled1, customArray_typeA_shuffled1);
        trialSetTutorial = mergeAlternatingBatches(trialSetTutorialB, trialSetTutorialA, 24);
    }

    //// Version set here ////    
    //const expVersion = 1;
    const SALpresent = expVersion<3?"Typ A":"Typ B";
    const SALfirst = expVersion%2==0?true:false; 
        
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

    const setClssfct = (message) => {
        return {
        type: CallFunctionPlugin,
        func: function () {
            const container = document.querySelector('.jspsych-content-wrapper');
            // Ensure the container is positioned relative so that the absolute positioning of its children works as intended.
            container.style.position = 'relative';
            // Insert your text with absolute positioning. Adjust 'top' and 'left' values as needed.
            container.insertAdjacentHTML('beforebegin', 
            `<div id="clssfctText" style="position: relative; top:150px; text-align:center; margin: 0 auto"> 
                <b> <p>KI-Klassifikation: `+message+`</p>
                    <p>Ist das richtig?</p>
                </b>
             </div>`);
        },
        }
    }

    const removeClssfct = {
        type: CallFunctionPlugin,
        func: function () {
        document.getElementById('clssfctText').remove();
        }
    }

    // if_nodeWarning
    const warningSubTimeline = {
        timeline: timelineWarning,
        timeline_variables: [1],
    };
    timelineWarning.push({
        type: HtmlKeyboardResponsePlugin,
        stimulus: "Sie waren zu langsam. Versuchen Sie schneller zu antworten.",
        choices: [""],
        trial_duration: 2500,
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

    const query = {
        type: SurveyLikertPlugin,
        questions: [
            {
                prompt: "Wie sehr misstrauen Sie der KI-Klassifikationen?", 
                labels: [ 
                "Gar nicht",
                "",
                "",
                "",
                "",
                "", 
                "Vollständig", 
                ],
                required: true
            },
            {
                prompt: "Wie sehr vertrauen Sie der KI-Klassifikationen?",
                labels: [ 
                "Gar nicht",
                "",
                "",
                "",
                "",
                "",
                "Vollständig",
                ],
                required: true
            }
        ]
    }

    const SALarray = [];
    let repeatIndex = 0;
    let trialRepeat = "";
    const  repeatTimeline = [
        {
            type: CallFunctionPlugin,
            func: function () {
                trialRepeat = SALarray[repeatIndex];
            }
        },
        {
            type: ClassificationComponent_reduced_repeatedView, 
            image1: () => trialRepeat[0],
            play_feedback: true,   
            clssfctn: () => `KI-Klassifikation: <b> `+trialRepeat[2]+`</b> </br> </br> </br> </br>`, 
            category_prompt: `</br>Ist das richtig? </br> </br>`,
            category_Names: () => [
            {categoryName:"Ja", categoryRight: trialRepeat[1]==trialRepeat[2]?true:false, categoryKey:"a"},
            {categoryName:"Nein", categoryRight: trialRepeat[1]==trialRepeat[2]?false:true, categoryKey:"l"}
            ], 
            on_start: () => {
                setTimeout(() => {
                    document.getElementById("ToBeClassified1").style.visibility="visible"
                    document.getElementById("shownPrompt").style.visibility="visible"
                    document.getElementById("CategoryA").style.visibility="visible"
                    document.getElementById("CategoryB").style.visibility="visible"
                }, 1000); 
            },
            on_finish: (tmp) => {
                tmp.data = {
                    image: trialRepeat[0],
                    clssfctnUsed: trialRepeat[2],
                }
                repeatIndex++;
                if(repeatIndex==SALarray.length) {
                    repeatIndex=0;
                    SALarray.length=0;
                } 
            }
        },
        {
            timeline: [warningSubTimeline],
            conditional_function: function(){
                if (jsPsych.data.getLastTrialData()["trials"][0]["category"]==="tooSlow") {
                        return true;
                    } else {
                        return false;
                    }
            }
        }
    ]

    const conditionalLoop = {
        timeline: repeatTimeline,
        conditional_function: () => {
            if (SALarray.length!=0) {
                return true;
            } else {
                return false;
            }
        },
        loop_function: () => {
            return repeatIndex < SALarray.length;
        },
    }

    const beforeConditionalLoop = {
        type: HtmlKeyboardResponsePlugin,
        stimulus: `<p> Wenn Sie in den bisherigen Durchgängen, Formen zur späteren und erneuten Anzeige ausgewählt haben,
        werden Ihnen diese nun im Folgenden gezeigt. </p>
        <p> Drücken Sie 'Enter', um fortzufahren.`,
        choices: ["Enter"]    
    }
    const afterConditionalLoop = {
        type: HtmlKeyboardResponsePlugin,
        stimulus: `<p> Sie haben alle Formen bearbeitet, die Sie zur erneuten Anzeige ausgewählt hatten. Sollten Sie keine einzelnen Formen gesehen haben,
        hatten Sie bis jetzt bei keiner Form, "Später nochmal anzeigen"  gewählt. Bitte beachten Sie, dass Sie diese Auswahlmöglichkeit in einem Teil der Durchgänge haben.</p>
        <p> Drücken Sie 'Enter', um fortzufahren.`,
        choices: ["Enter"]
    }

    // instructions
    timeline.push({
        type: HtmlKeyboardResponsePlugin,
        stimulus: `Sie sehen gleich zwei Formen und mittig wird ein Buchstabe zu sehen sein. 
                    Fokussieren Sie Ihren Blick möglichst während des gesamten Experiments auf den Buchstaben in der Mitte. <br>
                    Beide gezeigten Formen werden kurz blinken. Ihre erste Aufgabe ist es, zu entscheiden, welche der beiden Formen zuerst geblinkt hat.<br>
                    War es die linke Form, drücken Sie <b>Q</b>. War es die rechte Form, drücken Sie <b>P</b>.</p>
                    <p> Zusätzlich ist es ihre Aufgabe, immer zu entscheiden ob die angezeigte KI-Klassifikation (Typ A oder Typ B) auf die gezeigten Formen zutrifft.
                    Die KI-Klassifikation ist im Tutorial am oberen Bildschirmrand angezeigt und der Buchstabe in der Mitte zeigt ebenfalls an, ob die Formen als A oder B klassifiziert sind. </br>
                    Diese Abfrage zu den Formen beantworten Sie wie folgt: Ist die Form korrekt klassifiziert, drücken Sie <b>A</b>. Ist die Form falsch klassifiziert, drücken Sie <b>L</b>.  </p>
                    <p> Außerdem haben Sie in einem Teil der Durchgänge die Möglichkeit auszuwählen, dass Sie die Formen später erneut angezeigt bekommen
                    und erst dann entscheiden müssen ob die KI-Klassifikation richtig oder falsch ist. Dafür drücken Sie die <b>Leertaste</b>.
                    Sie müssen diese Abfrage zügig beantworten. Sollten Sie zu lange für Ihre Antwort brauchen, erhalten Sie eine Warnung, dass Sie schneller antworten müssen. </p>

                    <p>Versuchen Sie, genau zu sein und keine Fehler zu machen. Wenn Sie nicht wissen, welche Form zuerst geblinkt hat, raten Sie.
                    Zunächst folgt ein Tutorial, bei dem Ihnen die Korrektheit jeder Antwort durch ein Geräusch rückgemeldet wird.</p>
                    <p>Drücken Sie 'Enter', um fortzufahren.</p>`,
        choices: ["Enter"]
    })
    
    ////        TUTORIAL LOOP       ////
    let idxTutorial = 0;
    timeline.push(cursor_off)
    for (let i = 0; i < trialSetTutorial.length; i++) {
        let trial = trialSetTutorial[i];
        let image1Tutorial = imagesTutorial_shuffled[idxTutorial];
        let image2Tutorial = imagesTutorial_shuffled[(idxTutorial+1)];
        if (i % 24 === 0) {
            timeline.push(
                cursor_on,
                {
                type: HtmlKeyboardResponsePlugin,
                stimulus: () => (SALpresent==trial.clssfctnType)?
                `<p>Im kommenden Block werden Ihnen Formen anzeigt, die als <b>`+trial.clssfctnType+`</b> klassifiziert wurden. </p>
                 <p>Ihre Aufgabe ist es nach Ihrem Reihenfolge-Urteil zu entscheiden,
                     ob diese KI-Klassifikation richtig ist für die gezeigten Formen. </p>
                 <p> In diesem Block haben Sie die Möglichkeit Formen zur erneuten Anzeige auszuwählen und erst dann ein Entscheidung zu treffen.
                 </br>Dafür drücken Sie die <b>Leertaste</b>. Die Formen werden Ihnen dann im weiteren Verlauf erneut angezeigt. 
                 </p>
                 <p> Drücken Sie 'Enter', um fortzufahren. </p> </br>`:
                `<p>Im kommenden Block werden Ihnen Formen anzeigt, die als <b>`+trial.clssfctnType+`</b> klassifiziert wurden. </p>
                 <p>Ihre Aufgabe ist es nach Ihrem Reihenfolge-Urteil zu entscheiden,
                     ob diese KI-Klassifikation richtig ist für die gezeigten Formen. </p>
                 <p> Drücken Sie 'Enter', um fortzufahren. </p> </br>`,
                choices: ["Enter"],
                },
                cursor_off)
        } 
        
        timeline.push(        
            //cursor_off,
            setClssfct(trial["clssfctnType"]),
            {
                type: HtmlKeyboardResponsePlugin,
                stimulus: "",            
                trial_duration: 1000,     
            },
            {
                type: ImageTojPluginTryOut,
                probe_image: image1Tutorial[0],
                reference_image: image2Tutorial[0],
                soa: trial.soa,
                clssfctnType: trial.clssfctnType,
                fixation_time: () => randomInt(1700,1900),
                //fixation_mark_html: `<img class='toj-fixation-mark absolute-position' src='media/images/common/fixmark.png' style="visibility: hidden" id="fixMark"></img>`,
                //fixation_mark_html: `<img class='toj-fixation-mark absolute-position' style='width:30px; height:30px;' src='media/images/common/fixLetter.png' id="fixMark"></img>`, 
                fixation_mark_html: () => (trial.clssfctnType=="Typ A" ? `<b style = "font-size: 30px" id="fixMark"> A </b>`:`<b style = "font-size: 30px" id="fixMark"> B </b>`),
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
                hide_stimuli: true,
                modification_function: (element) => ImageTojPluginTryOut.flashElement(element, "toj-flash", 30),
                play_feedback: true,
                //on_start: () => {
                //    setTimeout(() => {document.getElementById("fixMark").style.visibility="visible"}, 200); // could be removed if not hidden in beginning, see above
                //},
                on_finish: (tmp) => {
                    const probeLeft = trial.probeLeft;        // Log probeLeft
                    const clssfctnCorrect = trial.clssfctnCorrectness;
                    const clssfctnType = trial.clssfctnType;
                    tmp.data = {
                    probeLeft: probeLeft,
                    clssfctnCorrect: clssfctnCorrect,
                    clssfctnType: clssfctnType,
                    block: "tutorial",
                    };
                }  
            },
            removeClssfct, // comment in if presented during trial
            //cursor_on,
            )
            if(SALpresent==trial.clssfctnType) {
                timeline.push(
                    {
                        type: ClassificationComponent_reduced_viewLater,
                        image1: image1Tutorial[0],
                        image2: image2Tutorial[0],
                        play_feedback: true,
                        probeLeft: trial.probeLeft,
                        clssfctn: `<b>KI-Klassifikation: </b> `+trial.clssfctnType+`</br> </br> </br> </br>`,
                        category_prompt: `</br>Ist das richtig? </br> </br>`,
                        category_Names:[
                            {categoryName:"Ja", categoryRight: image1Tutorial[1]==trial.clssfctnType?true:false, categoryKey: "a"},
                            {categoryName:"Nein", categoryRight: image1Tutorial[1]==trial.clssfctnType?false:true, categoryKey: "l"},
                            {categoryName:"Später nochmal anschauen", categoryKey: " "}
                        ], 
                        data: {
                            image: image1Tutorial[0], 
                            clssfctnUsed: trial.clssfctnType,
                            block: "tutorial",
                        },
                        on_finish: () => {
                            if(jsPsych.data.getLastTrialData()["trials"][0]["category"] == "Später nochmal anschauen"){
                            image1Tutorial[2] = trial.clssfctnType;
                            SALarray.push(image1Tutorial);
                            }
                        }
                    }
                )
                timeline.push(if_nodeWarning)     
                timeline.push(
                    {
                        type: ClassificationComponent_reducedSecond_viewLater,
                        image1: image1Tutorial[0],
                        image2: image2Tutorial[0],
                        play_feedback: true,
                        probeLeft: trial.probeLeft,
                        clssfctn: `<b>KI-Klassifikation: </b> `+trial.clssfctnType+`</br> </br> </br> </br>`,
                        category_prompt: `</br>Ist das richtig? </br> </br>`,
                        category_Names:[
                        {categoryName:"Ja", categoryRight: image2Tutorial[1]==trial.clssfctnType?true:false, categoryKey:"a"},
                        {categoryName:"Nein", categoryRight: image2Tutorial[1]==trial.clssfctnType?false:true, categoryKey: "l"},
                        {categoryName:"Später nochmal anschauen", categoryKey:" "}
                        ], 
                        data: {
                            image: image2Tutorial[0],
                            clssfctnUsed: trial.clssfctnType,
                            block: "tutorial",
                        },
                        on_finish: () => {
                        if(jsPsych.data.getLastTrialData()["trials"][0]["category"] == "Später nochmal anschauen"){
                            image2Tutorial[2] = trial.clssfctnType;
                            SALarray.push(image2Tutorial);
                        }
                        },
                    }
                )
                timeline.push(if_nodeWarning)
                if ((i+1) % 12 === 0 ) {     
                    timeline.push(beforeConditionalLoop)
                    timeline.push(conditionalLoop)
                    timeline.push(afterConditionalLoop)
                }
            }
            else {
                timeline.push({
                    type: ClassificationComponent_reduced,
                    image1: image1Tutorial[0],
                    image2: image2Tutorial[0],
                    play_feedback: true,
                    probeLeft: trial.probeLeft,
                    clssfctn: `<b>KI-Klassifikation: </b> `+trial.clssfctnType+`</br> </br> </br> </br>`,
                    category_prompt: `</br>Ist das richtig? </br> </br>`,
                    category_Names:[
                    {categoryName:"Ja", categoryRight: image1Tutorial[1]==trial.clssfctnType?true:false, categoryKey:"a"},
                    {categoryName:"Nein", categoryRight: image1Tutorial[1]==trial.clssfctnType?false:true, categoryKey:"l"}
                    ],
                    data: {
                        image: image1Tutorial[0],
                        clssfctnUsed: trial.clssfctnType,
                        block: "tutorial",
                    }, 
                })
                timeline.push(if_nodeWarning)
                timeline.push({
                    type: ClassificationComponent_reducedSecond,
                    image1: image1Tutorial[0],
                    image2: image2Tutorial[0],
                    play_feedback: true,
                    probeLeft: trial.probeLeft,
                    clssfctn: `<b>KI-Klassifikation: </b> `+trial.clssfctnType+`</br> </br> </br> </br>`,
                    category_prompt: `</br>Ist das richtig? </br> </br>`,
                    category_Names:[
                    {categoryName:"Ja", categoryRight: image2Tutorial[1]==trial.clssfctnType?true:false, categoryKey:"a"},
                    {categoryName:"Nein", categoryRight: image2Tutorial[1]==trial.clssfctnType?false:true, categoryKey:"l"}
                    ], 
                    data: {
                        image: image2Tutorial[0],
                        clssfctnUsed: trial.clssfctnType,
                        block: "tutorial",
                    }, 
                })
                timeline.push(if_nodeWarning)
            }     
        idxTutorial = idxTutorial + 2;
    }
    timeline.push({
        type: HtmlKeyboardResponsePlugin,
        stimulus: `<p> Sie haben das Tutorial abgeschlossen. Ihre Aufgabe bleibt im Folgenden die Gleiche, jedoch erhalten Sie bei Ihren Reihenfolgeurteilen keinen Ton mehr als Rückmeldung. </p> 
                   <p> Außerdem wird die KI-Klassifikation der Formen nicht mehr vor jedem Durchgang angekündigt, sondern nur noch durch den Buchstaben in der Mitte gekennzeichnet. 
                   Jedes Mal wenn sich die KI-Klassifikation ändert, wird dies vorab auf dem Bildschirm angekündigt. </p>
                   <p> Drücken Sie 'Enter', um fortzufahren. </p>        
        `,
        choices: ["Enter"]
    })


    ////////////////////////////////////
    ////        1st MAIN LOOP       ////
    let iAddition = session==1?0:420;
    let iSubstrac =  session==2?0:420;

    let counterTypeA = 0;
    let counterTypeB = 0;
    for (let j = 0; j < trialSet.length/2; j++) {
        let trial = trialSet[j];
        if (trial["clssfctnType"] === "Typ A") {
            if (trial["clssfctnCorrectness"] === "2correct") {
                counterTypeA = counterTypeA + 2
            } else if (trial["clssfctnCorrectness"] === "2false") {
                counterTypeB = counterTypeB + 2
            } else if (trial["clssfctnCorrectness"] === "1each") {
                counterTypeA++;
                counterTypeB++;
            }
        } else if (trial["clssfctnType"] === "Typ B") {
            if (trial["clssfctnCorrectness"] === "2correct") {
                counterTypeB = counterTypeB + 2
            } else if (trial["clssfctnCorrectness"] === "2false") {
                counterTypeA = counterTypeA + 2
            } else if (trial["clssfctnCorrectness"] === "1each") {
                counterTypeB++;
                counterTypeA++;
            }
        }
    }

    let idxTypeA = session==1?0:counterTypeA;
    let idxTypeB = session==1?0:counterTypeB;
    timeline.push(cursor_off)
    for (let i = (0+iAddition); i < ((trialSet.length)-iSubstrac); i++) {
        let currentBlock = Math.ceil(i/60);
        let totalBlocknumber = Math.ceil(trialSet.length/60); 
        let trial = trialSet[i];
        let image1 = "";
        let image2 = "";
        if (trial["clssfctnType"] === "Typ A") {
            if (trial["clssfctnCorrectness"] === "2correct") {
                image1 = imagesShuffled_TypeA.slice(idxTypeA)[0] 
                image2 = imagesShuffled_TypeA.slice(idxTypeA+1)[0]
                idxTypeA = idxTypeA + 2
            } else if (trial["clssfctnCorrectness"] === "2false") {
                image1 = imagesShuffled_TypeB.slice(idxTypeB)[0]
                image2 = imagesShuffled_TypeB.slice(idxTypeB+1)[0]
                idxTypeB = idxTypeB + 2
            } else if (trial["clssfctnCorrectness"] === "1each") {
                image1 = imagesShuffled_TypeA.slice(idxTypeA)[0] 
                image2 = imagesShuffled_TypeB.slice(idxTypeB)[0]
                idxTypeA++;
                idxTypeB++;
            }
        } else if (trial["clssfctnType"] === "Typ B") {
            if (trial["clssfctnCorrectness"] === "2correct") {
                image1 = imagesShuffled_TypeB.slice(idxTypeB)[0] 
                image2 = imagesShuffled_TypeB.slice(idxTypeB+1)[0]
                idxTypeB = idxTypeB + 2
            } else if (trial["clssfctnCorrectness"] === "2false") {
                image1 = imagesShuffled_TypeA.slice(idxTypeA)[0]
                image2 = imagesShuffled_TypeA.slice(idxTypeA+1)[0]
                idxTypeA = idxTypeA + 2
            } else if (trial["clssfctnCorrectness"] === "1each") {
                image1 = imagesShuffled_TypeB.slice(idxTypeB)[0]
                image2 = imagesShuffled_TypeA.slice(idxTypeA)[0]
                idxTypeB++;
                idxTypeA++;
            }
        }
        if (i > 1 & i % 120 === 0) {
            timeline.push(cursor_on, query, cursor_off)
        }
        if ((i-iAddition) > 1 & i % 60 === 0) {
            //console.log("block: "+currentBlock+" of "+totalBlocknumber),
            timeline.push(
                {
                type: HtmlKeyboardResponsePlugin,
                stimulus: `Sie haben `+ currentBlock +` von `+ totalBlocknumber +` Blöcken abgeschlossen. </br> Sie können nun eine Pause einlegen. Drücken Sie 'Enter', um fortzufahren. </br> <br>`,
                choices: ["Enter"],
                },
            )
        }
        if (i % 30 === 0) {
            //console.log(trial.clssfctnType)
            timeline.push(
                {
                type: HtmlKeyboardResponsePlugin,
                stimulus: () => ((i<420)===SALfirst & SALpresent==trial.clssfctnType)? `
                <p>Im kommenden Block werden Ihnen Formen anzeigt, die als <b>`+trial.clssfctnType+`</b> klassifiziert wurden. </p>
                <p>Ihre Aufgabe ist es nach Ihrem Reihenfolge-Urteil zu entscheiden, ob diese KI-Klassifikation richtig ist für die gezeigten Formen. </p> 
                <p> In diesem Block haben Sie die Möglichkeit Formen zur erneuten Anzeige auszuwählen und erst dann ein Entscheidung zu treffen.
                   </br>Dafür drücken Sie die <b>Leertaste</b>. Die Formen werden Ihnen dann im weiteren Verlauf erneut angezeigt. </p>
                 <p> Drücken Sie 'Enter', um fortzufahren. </p> 
                 </br>`:
                `<p>Im kommenden Block werden Ihnen Formen anzeigt, die als <b>`+trial.clssfctnType+`</b> klassifiziert wurden. </p>
                 <p>Ihre Aufgabe ist es nach Ihrem Reihenfolge-Urteil zu entscheiden, ob diese KI-Klassifikation richtig ist für die gezeigten Formen. </p> 
                 <p> Drücken Sie 'Enter', um fortzufahren. </p>
                 </br>`,
                choices: ["Enter"],
                },
            )
        } 
        /*if (i+1 == trialSet.length) {
            console.log("last block: "+currentBlock+" of "+totalBlocknumber),
            timeline.push(
                cursor_on, query,
                {
                type: HtmlButtonResponsePlugin,
                stimulus: `Sie haben alle Blöcke abgeschlossen. </br> Sollten Sie Formen zur späteren Ansicht ausgewählt haben, können Sie diese erneut einschätzen. <br> <br>`,
                choices: ["Weiter"],
                },
                cursor_off)
        }*/

        timeline.push(        
        {
            type: ImageTojPluginTryOut,
            probe_image: image1[0],
            reference_image: image2[0],
            soa: trial.soa,
            clssfctnType: trial.clssfctnType,
            fixation_time: () => randomInt(1700,1900),
            //fixation_mark_html: `<img class='toj-fixation-mark absolute-position' src='media/images/common/fixmark.png' style="visibility: hidden" id="fixMark"></img>`,
            //fixation_mark_html: `<img class='toj-fixation-mark absolute-position' style='width:30px; height:30px;' src='media/images/common/fixLetter.png' id="fixMark"></img>`, 
            fixation_mark_html: () => (trial.clssfctnType=="Typ A" ? `<b style = "font-size: 30px" id="fixMark"> A </b>`:`<b style = "font-size: 30px" id="fixMark"> B </b>`),
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
            hide_stimuli: true,
            modification_function: (element) => ImageTojPluginTryOut.flashElement(element, "toj-flash", 30),
            play_feedback: false,
            //on_start: () => {
            //    setTimeout(() => {document.getElementById("fixMark").style.visibility="visible"}, 200); // could be removed if not hidden in beginning, see above
            //},
            on_finish: (tmp) => {
                const probeLeft = trial.probeLeft;        // Log probeLeft
                const clssfctnCorrect = trial.clssfctnCorrectness;
                const clssfctnType = trial.clssfctnType;
                tmp.data = {
                probeLeft: probeLeft,
                clssfctnCorrect: clssfctnCorrect,
                clssfctnType: clssfctnType,
                block: currentBlock,
                };
            }  
        },
        //removeClssfct, // comment in if presented during trial
        //cursor_on,
        )
        if((i<420)===SALfirst) {
            if (SALpresent==trial.clssfctnType) { // change to 2 if conditions
                timeline.push(
                    {
                        type: ClassificationComponent_reduced_viewLater,
                        image1: image1[0],
                        image2: image2[0],
                        play_feedback: true,
                        probeLeft: trial.probeLeft,
                        clssfctn: `<b>KI-Klassifikation: </b> `+trial.clssfctnType+`</br> </br> </br> </br>`,
                        category_prompt: `</br>Ist das richtig? </br> </br>`,
                        category_Names:[
                            {categoryName:"Ja", categoryRight: image1[1]==trial.clssfctnType?true:false, categoryKey: "a"},
                            {categoryName:"Nein", categoryRight: image1[1]==trial.clssfctnType?false:true, categoryKey: "l"},
                            {categoryName:"Später nochmal anschauen", categoryKey:" "}
                        ], 
                        data: {
                            image: image1[0], 
                            clssfctnUsed: trial.clssfctnType,
                            block: currentBlock,
                        },
                        on_finish: () => {
                            if(jsPsych.data.getLastTrialData()["trials"][0]["category"] == "Später nochmal anschauen"){
                            image1[2] = trial.clssfctnType;
                            SALarray.push(image1);
                            }
                        }
                    }
                )
                timeline.push(if_nodeWarning)             
                timeline.push(
                    {
                        type: ClassificationComponent_reducedSecond_viewLater,
                        image1: image1[0],
                        image2: image2[0],
                        play_feedback: true,
                        probeLeft: trial.probeLeft,
                        clssfctn: `<b>KI-Klassifikation: </b> `+trial.clssfctnType+`</br> </br> </br> </br>`,
                        category_prompt: `</br>Ist das richtig? </br> </br>`,
                        category_Names:[
                        {categoryName:"Ja", categoryRight: image2[1]==trial.clssfctnType?true:false, categoryKey:"a"},
                        {categoryName:"Nein", categoryRight: image2[1]==trial.clssfctnType?false:true, categoryKey: "l"},
                        {categoryName:"Später nochmal anschauen", categoryKey:" "}
                        ], 
                        data: {
                        image: image2[0],
                        clssfctnUsed: trial.clssfctnType,
                        block: currentBlock,
                        },
                        on_finish: () => {
                        if(jsPsych.data.getLastTrialData()["trials"][0]["category"] == "Später nochmal anschauen"){
                            image2[2] = trial.clssfctnType;
                            SALarray.push(image2);
                        }
                        },
                    }
                )
                timeline.push(if_nodeWarning) 
            } else {
                timeline.push({
                    type: ClassificationComponent_reduced,
                    image1: image1[0],
                    image2: image2[0],
                    play_feedback: true,
                    probeLeft: trial.probeLeft,
                    clssfctn: `<b>KI-Klassifikation: </b> `+trial.clssfctnType+`</br> </br> </br> </br>`,
                    category_prompt: `</br>Ist das richtig? </br> </br>`,
                    category_Names:[
                        {categoryName:"Ja", categoryRight: image1[1]==trial.clssfctnType?true:false, categoryKey:"a"},
                        {categoryName:"Nein", categoryRight: image1[1]==trial.clssfctnType?false:true, categoryKey:"l"}
                    ],
                    data: {
                        image: image1[0],
                        clssfctnUsed: trial.clssfctnType,
                        block: currentBlock,
                    }, 
                })
                timeline.push(if_nodeWarning)
                timeline.push({
                    type: ClassificationComponent_reducedSecond,
                    image1: image1[0],
                    image2: image2[0],
                    play_feedback: true,
                    probeLeft: trial.probeLeft,
                    clssfctn: `<b>KI-Klassifikation: </b> `+trial.clssfctnType+`</br> </br> </br> </br>`,
                    category_prompt: `</br>Ist das richtig? </br> </br>`,
                    category_Names:[
                        {categoryName:"Ja", categoryRight: image2[1]==trial.clssfctnType?true:false, categoryKey:"a"},
                        {categoryName:"Nein", categoryRight: image2[1]==trial.clssfctnType?false:true, categoryKey:"l"}
                    ], 
                    data: {
                        image: image2[0],
                        clssfctnUsed: trial.clssfctnType,
                        block: currentBlock,
                    }, 
                })
                timeline.push(if_nodeWarning)
            }
            if ((i+1) % 210 === 0) {
                timeline.push(beforeConditionalLoop)
                timeline.push(conditionalLoop)
                timeline.push(afterConditionalLoop)
            }
        }
        else {
            timeline.push({
                type: ClassificationComponent_reduced,
                image1: image1[0],
                image2: image2[0],
                play_feedback: true,
                probeLeft: trial.probeLeft,
                clssfctn: `<b>KI-Klassifikation: </b> `+trial.clssfctnType+`</br> </br> </br> </br>`,
                category_prompt: `</br>Ist das richtig? </br> </br>`,
                category_Names:[
                {categoryName:"Ja", categoryRight: image1[1]==trial.clssfctnType?true:false, categoryKey:"a"},
                {categoryName:"Nein", categoryRight: image1[1]==trial.clssfctnType?false:true, categoryKey:"l"}
                ],
                data: {
                    image: image1[0],
                    clssfctnUsed: trial.clssfctnType,
                    block: currentBlock,
                }, 
            })
            timeline.push(if_nodeWarning)
            timeline.push({
                type: ClassificationComponent_reducedSecond,
                image1: image1[0],
                image2: image2[0],
                play_feedback: true,
                probeLeft: trial.probeLeft,
                clssfctn: `<b>KI-Klassifikation: </b> `+trial.clssfctnType+`</br> </br> </br> </br>`,
                category_prompt: `</br>Ist das richtig? </br> </br>`,
                category_Names:[
                {categoryName:"Ja", categoryRight: image2[1]==trial.clssfctnType?true:false, categoryKey:"a"},
                {categoryName:"Nein", categoryRight: image2[1]==trial.clssfctnType?false:true, categoryKey:"l"}
                ], 
                data: {
                    image: image2[0],
                    clssfctnUsed: trial.clssfctnType,
                    block: currentBlock,
                }, 
            })
            timeline.push(if_nodeWarning)
        } 
    }

    timeline.push(cursor_on, query,
        {
            type: SurveyLikertPlugin,
            questions: [
                {
                    prompt: `Auf welche Formen haben Sie sich eher konzentriert? <br>
                            Auf die Formen, bei denen Sie sich sicher waren, dass die Klassifikation richtig ist oder eher auf die Formen, bei denen Sie sich unsicher waren, dass die Klassifikation richtig ist?`, 
                    labels: [ 
                    "<br>Formen, bei denen \n ich unsicher war",
                    "",
                    "",
                    "", 
                    "<br>Formen, bei denen ich sicher war", 
                    ],
                    required: true
                }
            ],
            button_label: "Weiter",
            scale_width: 1000,
        },
        {
            type: SurveyTextPlugin,
            questions: [{prompt: `In wie viel Prozent der Fälle war die KI-Klassifikation schätzungsweise korrekt? </br>(Bitte geben Sie einen Wert zwischen 0-100% ein.)`, required: true }],
            button_label: ["Weiter"]
        }
    )

    await jsPsych.run(timeline);

    // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
    // if you handle results yourself, be it here or in `on_finish()`)
    return jsPsych;
}
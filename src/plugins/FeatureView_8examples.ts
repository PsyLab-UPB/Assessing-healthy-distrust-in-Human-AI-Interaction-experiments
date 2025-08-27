import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response"
import HtmlButtonResponseWithFeedbackPlugin from "./HtmlButtonResponseWithFeedbackPlugin"
export class FeatureView8 {
  type= HtmlButtonResponseWithFeedbackPlugin
  stimulus=""
  prompt= "<p>Zu welchem Typ gehört die Form in der Mitte?</p>"
  choices= ['Typ A', 'Typ B'] 
  play_feedback = true
  answerCorrect = 0 
  A_images = [] as any[]
  B_images = [] as any[]
  Test_image = [] as any[]
  constructor(featureText, imagesA, imagesB, imagesTest, play_feedback = false, answerCorrect= 0){
    this.stimulus = `<table border="1" style="width: 96vw;">
    <colgroup>
        <col style="width: 16vw">
        <col style="width: 16vw">
        <col style="width: 16vw">
        <col style="width: 16vw">
        <col style="width: 16vw">
    </colgroup>
    <tr>
      <td><img src="`+imagesA[0]+`" style="width: 16vw"></td>
      <td><img src="`+imagesA[1]+`" style="width: 16vw"></td>
      <td style="text-align: center;" rowspan="2">`+featureText+`</td>
      <td><img src="`+imagesB[0]+`" style="width: 16vw"></td>
      <td><img src="`+imagesB[1]+`" style="width: 16vw"></td>
    </tr>
    <tr>
      <td><img src="`+imagesA[2]+`" style="width: 16vw"></td>
      <td><img src="`+imagesA[3]+`" style="width: 16vw"></td>
      <td><img src="`+imagesB[2]+`" style="width: 16vw"></td>
      <td><img src="`+imagesB[3]+`" style="width: 16vw"></td>
    </tr>
    <tr>
    <td></td>
    <td></td>
    <td><img src="`+imagesTest+`" style="width: 16vw"></td>
    <td></td>
    <td></td>
    </tr>
    </table>`
    this.play_feedback = play_feedback
    this.answerCorrect = answerCorrect
    this.A_images = [
      {imageName:imagesA[0]},
      {imageName:imagesA[1]},
      {imageName:imagesA[2]},
      {imageName:imagesA[3]}]
    this.B_images = [
      {imageName:imagesB[0]},
      {imageName:imagesB[1]},
      {imageName:imagesB[2]},
      {imageName:imagesB[3]}]
    this.Test_image = imagesTest
  }
};
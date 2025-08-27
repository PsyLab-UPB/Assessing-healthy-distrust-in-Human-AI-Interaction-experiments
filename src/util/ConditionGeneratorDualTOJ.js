import shuffle from "lodash/shuffle";
import { LabColor } from "./colors";
import sample from "lodash/sample";
import randomInt from "random-int";
import { Quadrant } from "./Quadrant";

class TojTarget {
    /**
     * The target's color
     * @type {LabColor}
     */
    color;
  
    /**
     * The quadrant in which the target is displayed
     * @type {Quadrant}
     */
    quadrant;
  
    /**
     * Whether the target serves as a probe or a reference
     * @type boolean
     */
    isProbe;
  
    /**
     * Position of the target within the bar grid ([x, y])
     * @type number[]
     */
    gridPosition;
  }
  
export class ConditionGeneratorDualTOJ {
    /**
     * The size ([x, y]) of the grid in one quadrant
     */
    static gridSize = [7, 4];
  
    /**
     * Color variation (in LAB degree) between targets of a pair
     */
    static alpha = 20;
  
    _previousOrientations = {};
    _previousPositions = {};

    constructor(soaChoices){
      this.soaChoices = soaChoices
    }
  
    generateOrientation(identifier = null) {
      let orientation;
      do {
        orientation = randomInt(0, 17) * 10;
      } while (identifier && orientation == this._previousOrientations[identifier]);
      if (identifier) {
        this._previousOrientations[identifier] = orientation;
      }
      return orientation;
    }
  
    static generateRandomPos(xRange, yRange) {
      return [randomInt(...xRange), randomInt(...yRange)];
    }
  
    generatePosition(identifier, xRange = [2, 5], yRange = [2, 5]) {
      let pos;
      do {
        pos = ConditionGeneratorDualTOJ._generateRandomPos(xRange, yRange);
      } while (pos == this._previousPositions[identifier]);
      this._previousPositions[identifier] = pos;
      return pos;
    }
  
    static getRandomPrimaryColor() {
      return new LabColor(sample([0, 180]));
    }
  
    generateCondition(probeLeft) {
      const alpha = ConditionGeneratorDualTOJ.alpha;
      const targetPairs = [];
  
      // Choose quadrants for targets
      const quadrantPairs = Quadrant.getRandomMixedSidePairs();
  
      // Generate information for two pairs of targets
      for (let pairIndex = 0; pairIndex < 2; pairIndex++) {
        // Create a target pair
        const primary = new TojTarget();
        const secondary = new TojTarget();
  
        primary.quadrant = quadrantPairs[pairIndex][0];
        secondary.quadrant = quadrantPairs[pairIndex][1];
  
        primary.color =
          pairIndex == 0
            ? ConditionGeneratorDualTOJ.getRandomPrimaryColor()
            : targetPairs[0].primary.color.getRelativeColor(180);
        secondary.color = primary.color.getRandomRelativeColor([alpha, -alpha]);
  
        // Set isProbe
        primary.isProbe = probeLeft ? primary.quadrant.isLeft() : !primary.quadrant.isLeft();
        secondary.isProbe = !primary.isProbe;
  
        [primary, secondary].map((target) => {
          target.gridPosition = ConditionGeneratorDualTOJ.generateRandomPos(
            target.quadrant.isLeft() ? [2, 5] : [1, 4],
            [1, 2]
          );
        });
  
        targetPairs[pairIndex] = { pairIndex, primary, secondary, fixationTime: randomInt(300, 500) };
      }
  
      return {
        targetPairs,
        rotation: this.generateOrientation(),
        distractorSOA: sample(this.soaChoices),
      };
    }
  }
const TRACE_THRESHOLD = 30;
const LERP_AMOUNT = 0.2;
const MONKEY_SIZE = 150;
const BANANA_SIZE = 75;
const PATHWAY_GROUPS = [
  [
    function circleBottom(x) {
      let radius = 100;
      let centerX = width / 2; // Calculate the center x-coordinate
      let centerY = height / 2;
      let deltaX = x - centerX; // Find the horizontal distance from the center

      // Check if the x-coordinate is within the circle's diameter
      if (Math.abs(deltaX) > radius) {
        return null; // The point is outside the circle
      }

      // Calculate the y-coordinate relative to the center of the screen
      return centerY + Math.sqrt(radius * radius - deltaX * deltaX);
    },
    function circleTop(x) {
      let radius = 100;
      let centerX = width / 2; // Calculate the center x-coordinate
      let centerY = height / 2;
      let deltaX = x - centerX; // Find the horizontal distance from the center

      // Check if the x-coordinate is within the circle's diameter
      if (Math.abs(deltaX) > radius) {
        return null; // The point is outside the circle
      }

      // Calculate the y-coordinate for the top half of the circle
      return centerY - Math.sqrt(radius * radius - deltaX * deltaX);
    },
  ],
  [
    function zigzagPath(x) {
      return (
        height / 2 -
        50 -
        100 * sin((x - (width / 2 - 150)) / 25) +
        10 * sin((x - (width / 2 - 150)) / 12)
      );
    },
  ],
  [
    function straightPath(x) {
      return height / 2 + 50;
    },
  ],
  [
    function curvePath(x) {
      return height / 2 + 100 + 30 * sin((x - (width / 2 - 150)) / 30);
    },
  ],
];

let MONKEY_IMAGE;
let BACKGROUND_ONE;
let BANANA_IMAGE;

function monkeyBonanzaPreload() {
  MONKEY_IMAGE = loadImage("resources/Monkey.png");
  BACKGROUND_ONE = loadImage("resources/Jungle.png");
  BANANA_IMAGE = loadImage("resources/Banana.png");
}

class MonkeyBonanza {
  monkeyX = 0;
  monkeyY = 0;
  monkeyXTarget = 0;
  monkeyYTarget = 0;
  level = 0;
  errorCount = 0;
  pathColor = "#FF0000";
  isMonkeyTouched = false;
  bananaPositions = [];
  score = 0;
  currentPathwayGroup = () => PATHWAY_GROUPS[this.level];

  constructor(level = 0) {
    this.level = level;
    this.bananaPositions = this.generateBananaPositions();
  }

  draw() {
    background(BACKGROUND_ONE);
    if (!this.isMonkeyTouched) {
      this.monkeyXTarget = 0 + MONKEY_SIZE / 2;
      this.monkeyYTarget = height / 2;
      this.checkIfMouseTouchingMonkey();
      this.drawMonkey();

      // Draw p5js text in the center of the screen saying "Touch the monkey!"
      push();
      stroke(0);
      strokeWeight(5);
      fill(secondaryShade);
      textSize(84);
      textAlign(CENTER, CENTER);
      text("Touch the monkey!", width / 2, height / 2);
      pop();
    } else {
      this.monkeyXTarget = mouseX;
      this.monkeyYTarget = mouseY;

      this.checkIfTracing();
      this.checkIfMonkeyTouchingBanana();

      for (let i = 0; i < this.currentPathwayGroup().length; i++) {
        this.drawPathway(this.currentPathwayGroup()[i]);
      }
      this.drawBananas();

      this.drawMonkey();
      drawLevelIndicator(this.level + 1);
      drawScore(this.score);
    }
  }

  drawPathway(pathFunction) {
    fill("#00000000");

    stroke("black");
    strokeWeight(20);
    beginShape();
    for (let i = 0; i < width; i++) {
      let y = pathFunction(i);
      if (y === null) continue;
      vertex(i, y);
    }
    endShape();

    stroke(this.pathColor);
    strokeWeight(10);
    beginShape();
    for (let i = 0; i < width; i++) {
      let y = pathFunction(i);
      if (y === null) continue;
      vertex(i, y);
    }
    endShape();
  }

  drawMonkey() {
    this.monkeyX = lerp(this.monkeyX, this.monkeyXTarget, LERP_AMOUNT);
    this.monkeyY = lerp(this.monkeyY, this.monkeyYTarget, LERP_AMOUNT);
    image(
      MONKEY_IMAGE,
      this.monkeyX - MONKEY_SIZE / 2,
      this.monkeyY - MONKEY_SIZE / 2,
      MONKEY_SIZE,
      MONKEY_SIZE,
    );
  }

  checkIfTracing() {
    for (let i = 0; i < this.currentPathwayGroup().length; i++) {
      let pathway = this.currentPathwayGroup()[i];
      if (this.isPosWithinPath(mouseX, mouseY, pathway)) {
        this.pathColor = "#00FF00";

        // Move the monkey along the pathway
        this.monkeyXTarget = mouseX;
        this.monkeyYTarget = pathway(mouseX) ?? mouseY;

        return;
      }
    }
    this.pathColor = "#FF0000";
    this.errorCount++;
  }

  checkIfMonkeyTouchingBanana() {
    for (let i = 0; i < this.bananaPositions.length; i++) {
      if (
        dist(
          this.monkeyX,
          this.monkeyY,
          this.bananaPositions[i][0],
          this.bananaPositions[i][1],
        ) <
        BANANA_SIZE / 2
      ) {
        this.bananaPositions.splice(i, 1);
        this.score++;
        break;
      }
    }
  }

  isPosWithinPath(x, y, pathFunction) {
    for (let i = 0; i < width; i++) {
      let pathX = i;
      let pathY = pathFunction(i);
      if (pathY === null) continue;
      if (dist(x, y, pathX, pathY) < TRACE_THRESHOLD) {
        return true;
      }
    }
    return false;
  }

  checkIfMouseTouchingMonkey() {
    if (dist(mouseX, mouseY, this.monkeyX, this.monkeyY) < MONKEY_SIZE / 2) {
      this.isMonkeyTouched = true;
    }
  }

  // return an array of x and y tuples for banana positions along currentPathwayGroup pathways
  generateBananaPositions() {
    let bananaPositions = [];
    for (let i = 0; i < this.currentPathwayGroup().length; i++) {
      let pathway = this.currentPathwayGroup()[i];
      for (let x = 0; x < width; x++) {
        let y = pathway(x);
        if (y === null) continue;

        // small chance that a banana is spawned at this position on the pathway
        if (Math.random() < 0.01) {
          bananaPositions.push([x, y]);
        }
      }
    }
    return bananaPositions;
  }

  drawBananas() {
    for (let i = 0; i < this.bananaPositions.length; i++) {
      image(
        BANANA_IMAGE,
        this.bananaPositions[i][0] - BANANA_SIZE / 2,
        this.bananaPositions[i][1] - BANANA_SIZE / 2,
        BANANA_SIZE,
        BANANA_SIZE,
      );
    }
  }
}

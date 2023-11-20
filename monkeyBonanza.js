const TRACE_THRESHOLD = 30;
const LERP_AMOUNT = 0.2;
const MONKEY_SIZE = 150;

let MONKEY_IMAGE;
let BACKGROUND_FOREST;
let BANANA_IMAGE;

function monkeyBonanzaPreload() {
  MONKEY_IMAGE = loadImage("resources/Monkey.png");
  BACKGROUND_FOREST = loadImage("resources/Rainforest.jpeg");
  BANANA_IMAGE = loadImage("resources/Rainforest.jpeg");
}

class MonkeyBonanza {
  monkeyX = 0;
  monkeyY = 0;
  monkeyXTarget = 0;
  monkeyYTarget = 0;
  pathwayIndex = 0;
  pathways = [];
  errorCount = 0;
  pathColor = "#FF0000";

  constructor() {
    this.monkeyX = width / 2;
    this.monkeyY = height / 2;
    this.pathways.push(this.zigzagPath, this.straightPath, this.curvePath);
  }

  draw() {
    background(BACKGROUND_FOREST);

    this.monkeyXTarget = mouseX;
    this.monkeyYTarget = mouseY;

    this.checkIfTracing();
    this.drawPathway(this.pathways[i]);
    this.drawMonkey();
  }

  drawPathway(pathFunction) {
    fill("#00000000");

    stroke("black");
    strokeWeight(20);
    beginShape();
    for (let i = 0; i < width; i++) {
      let y = pathFunction(i);
      vertex(i, y);
    }
    endShape();

    stroke(this.pathColor);
    strokeWeight(10);
    beginShape();
    for (let i = 0; i < width; i++) {
      let y = pathFunction(i);
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
    if (
      this.isWithinThreshold(mouseX, mouseY, this.pathways[this.pathwayIndex])
    ) {
      this.pathColor = "#00FF00";

      // Move the monkey along the pathway
      this.monkeyXTarget = mouseX;
      this.monkeyYTarget = this.pathways[this.pathwayIndex](mouseX);
    } else {
      this.pathColor = "#FF0000";

      // Count an error if the monkey deviates from the pathway
      this.errorCount++;
    }
  }

  isWithinThreshold(x, y, pathFunction) {
    for (let i = 0; i < width; i++) {
      let pathX = i;
      let pathY = pathFunction(i);
      if (dist(x, y, pathX, pathY) < TRACE_THRESHOLD) {
        return true;
      }
    }
    return false;
  }

  zigzagPath(x) {
    return (
      height / 2 -
      50 -
      100 * sin((x - (width / 2 - 150)) / 25) +
      10 * sin((x - (width / 2 - 150)) / 12)
    );
  }

  straightPath(x) {
    return height / 2 + 50;
  }

  curvePath(x) {
    return height / 2 + 100 + 30 * sin((x - (width / 2 - 150)) / 30);
  }
}

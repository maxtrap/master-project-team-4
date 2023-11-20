const traceThreshold = 20;
const lerpAmount = 0.2;

let MONKEY_IMAGE;
let BACKGROUND_FOREST;
let BANANA_IMAGE;

function monkeyBonanzaPreload() {
  MONKEY_IMAGE = loadImage("resources/MonkeyVine.jpg");
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

  constructor() {
    this.monkeyX = width / 2;
    this.monkeyY = height / 2;
    this.pathways.push(this.zigzagPath, this.straightPath, this.curvePath);
  }

  draw() {
    background(BACKGROUND_FOREST);

    this.monkeyXTarget = mouseX;
    this.monkeyYTarget = mouseY;

    this.drawPathways();
    this.checkIfTracing();
    this.drawMonkey();
  }

  drawPathway(pathFunction) {
    fill("#00000000");
    stroke("red");
    strokeWeight(10);
    beginShape();
    for (let i = 0; i < width; i++) {
      let y = pathFunction(i);
      vertex(i, y);
    }
    endShape();
  }

  drawPathways() {
    for (let i = 0; i < this.pathways.length; i++) {
      this.drawPathway(this.pathways[i]);
    }
  }

  drawMonkey() {
    this.monkeyX = lerp(this.monkeyX, this.monkeyXTarget, lerpAmount);
    this.monkeyY = lerp(this.monkeyY, this.monkeyYTarget, lerpAmount);
    image(MONKEY_IMAGE, this.monkeyX, this.monkeyY, 50, 50);
  }

  checkIfTracing() {
    if (
      this.isWithinThreshold(mouseX, mouseY, this.pathways[this.pathwayIndex])
    ) {
      // Move the monkey along the pathway
      this.monkeyXTarget = mouseX;
      this.monkeyYTarget = this.pathways[this.pathwayIndex](mouseX);
    } else {
      // Count an error if the monkey deviates from the pathway
      this.errorCount++;
    }
  }

  isWithinThreshold(x, y, pathFunction) {
    for (let i = 0; i < width; i++) {
      let pathX = i;
      let pathY = pathFunction(i);
      if (dist(x, y, pathX, pathY) < traceThreshold) {
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

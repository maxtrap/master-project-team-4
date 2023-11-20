const traceThreshold = 10;

let MONKEY_IMAGE;
let BACKGROUND_FOREST;
let BANANA_IMAGE;

function monkeyBonanzaPreload() {
  MONKEY_IMAGE = loadImage("resources/MonkeyVine.jpg");
  BACKGROUND_FOREST = loadImage("resources/Rainforest.jpeg");
  BANANA_IMAGE = loadImage("resources/Rainforest.jpeg");
}

class MonkeyBonanza {
  monkeyX;
  monkeyY;
  pathwayIndex = 0;
  noCursor = true;
  pathways = [];
  errorCount = 0;

  constructor() {
    this.monkeyX = width / 2;
    this.monkeyY = height / 2;
    this.pathways.push(this.zigzagPath, this.straightPath, this.curvePath);
  }

  draw() {
    background(BACKGROUND_FOREST);
    this.drawPathways();

    this.monkeyX = mouseX;
    this.monkeyY = mouseY;

    this.checkIfTracing();

    this.drawMonkey();
  }

  drawPathway(pathFunction) {
    // Draw the pathway on the canvas for visual reference
    stroke(0);
    strokeWeight(2);
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
    image(MONKEY_IMAGE, this.monkeyX, this.monkeyY, 50, 50);
  }

  checkIfTracing() {
    if (
      this.isWithinThreshold(mouseX, mouseY, this.pathways[this.pathwayIndex])
    ) {
      // Move the monkey along the pathway
      this.monkeyX = mouseX;
      this.monkeyY = this.pathways[this.pathwayIndex](mouseX);
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
      10 * sin((x - (width / 2 - 150)) / 25) +
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

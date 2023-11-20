const TRACE_THRESHOLD = 30;
const LERP_AMOUNT = 0.2;
const MONKEY_SIZE = 150;
const BANANA_SIZE = 75;
const PATHWAY_GROUPS = [
  // [
  //   function zigzagPath(x) {
  //     let amplitude = 50; // Height of each zigzag segment
  //     let period = 100; // Width of each zigzag segment

  //     let segment = Math.floor((x - (width / 2 - period / 2)) / period); // Determine the current segment
  //     let localX = x - segment * period; // x-coordinate within the current segment

  //     if (segment % 2 === 0) {
  //       // For even segments, the line goes up
  //       return height / 2 - (localX / period) * amplitude;
  //     } else {
  //       // For odd segments, the line goes down
  //       return height / 2 - amplitude + (localX / period) * amplitude;
  //     }
  //   },
  // ],
  [
    function wave(x) {
      return height / 2 + 50 * Math.sin((x - width / 2) / 50);
    },
  ],
  [
    function wave(x) {
      return height / 2 + 200 * Math.sin((x - width / 2) / 50);
    },
  ],
  [
    function circleBottom(x) {
      let radius = 300;
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
      let radius = 300;
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
];

let MONKEY_IMAGE;
let BACKGROUND_ONE;
let BANANA_IMAGE;
let CHOMP;

function monkeyBonanzaPreload() {
  MONKEY_IMAGE = loadImage("resources/Monkey.png");
  BACKGROUND_ONE = loadImage("resources/Jungle.png");
  BANANA_IMAGE = loadImage("resources/Banana.png");
  CHOMP = loadSound("resources/chomp.mp3")
}

class MonkeyBonanza {
  monkeyX = 0;
  monkeyY = 0;
  monkeyXTarget = 0;
  monkeyYTarget = 0;
  level = 0;
  pathColor = "#FF0000";
  isMonkeyTouched = false;
  bananaPositions = [];
  totalBananas = 0;
  score = 0;
  currentPathwayGroup = () => PATHWAY_GROUPS[this.level];
  isTracing = false;

  constructor(level = 0) {
    this.level = level;
    this.bananaPositions = this.generateBananaPositions();
  }

  draw() {
    background(BACKGROUND_ONE);
    if (!this.isMonkeyTouched) {
      this.monkeyXTarget = this.monkeyX = 0 + MONKEY_SIZE / 2;
      this.monkeyYTarget = this.monkeyY = height / 2;
      this.checkIfMouseTouchingMonkey();
      this.drawMonkey();
      this.drawNotify("Touch the monkey!");
    } else {
      this.monkeyXTarget = mouseX;
      this.monkeyYTarget = mouseY;

      if (this.bananaPositions.length === 0) {
        if (this.level === PATHWAY_GROUPS.length - 1) {
          this.drawNotify(`You win! Cumulative score: ${this.score}`);
          return;
        } else {
          this.level++;
          this.bananaPositions = this.generateBananaPositions();
          this.isMonkeyTouched = false;
        }
      }

      this.checkIfTracing();
      this.checkIfMonkeyTouchingBanana();

      for (let i = 0; i < this.currentPathwayGroup().length; i++) {
        this.drawPathway(this.currentPathwayGroup()[i]);
      }
      this.drawBananas();

      this.drawMonkey();
      drawScore(this.score);
      this.drawBananaIndicator();
      drawLevelIndicator(this.level + 1);
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

  drawNotify(notification) {
    push();
    stroke(0);
    strokeWeight(5);
    fill(secondaryShade);
    textSize(84);
    textAlign(CENTER, CENTER);
    text(notification, width / 2, height / 2);
    pop();
  }

  checkIfTracing() {
    for (let i = 0; i < this.currentPathwayGroup().length; i++) {
      let pathway = this.currentPathwayGroup()[i];
      if (this.isPosWithinPath(mouseX, mouseY, pathway)) {
        this.isTracing = true;

        this.pathColor = "#00FF00";

        // Move the monkey along the pathway
        this.monkeyXTarget = mouseX;
        this.monkeyYTarget = pathway(mouseX) ?? mouseY;

        return;
      }
    }
    this.pathColor = "#FF0000";

    if (this.isTracing) {
      this.isTracing = false;
      this.score--;
    }
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
        CHOMP.play();
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
    this.totalBananas = bananaPositions.length;
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

  drawBananaIndicator() {
    let indicatorHeight = 100;
    let indicatorText = `Got ${
      this.totalBananas - this.bananaPositions.length
    } out of ${this.totalBananas} bananas`;
    push();
    strokeWeight(3);
    stroke(0);
    fill(secondaryShade + "c8");
    rectMode(CENTER);
    rect(
      width / 2,
      50,
      textWidth(indicatorText),
      indicatorHeight,
      0,
      0,
      20,
      20,
    );
    pop();

    textSize(48);
    fill(0);
    strokeWeight(0);
    textAlign(CENTER);

    text(indicatorText, width / 2, 60);
  }
}

class MonkeyBonanza {
  zigzagCounter = 0;
  straightCounter = 0;
  curveCounter = 0;

  monkeyImage;
  currentLevel = 1;
  nextLevelThreshold = 5; // Number of strokes to reach the next level

  preload() {
    this.rainforestImage = loadImage('resources/Rainforest.jpeg');
  }

  constructor() {
    noLoop();
    background(220);

    let centerX = width / 2;
    let startY = height / 2 - 50;

    this.drawZigzagLine(centerX, startY, 300, 50, 10);
    this.drawStraightLine(centerX, startY + 50, 300);
    this.drawCurveLine(centerX, startY + 100, 300);

    this.monkeyImage = loadImage('resources/MonkeyVine.jpg');
  }

  drawZigzagLine(x, y, length, separation, amplitude) {
    let numSegments = int(length / separation);
    for (let i = 0; i < numSegments; i++) {
      line(
        x - length / 2 + i * separation,
        y,
        x - length / 2 + i * separation + separation / 2,
        y - amplitude
      );
      line(
        x - length / 2 + i * separation + separation / 2,
        y - amplitude,
        x - length / 2 + (i + 1) * separation,
        y
      );
    }
  }

  drawStraightLine(x, y, length) {
    line(x - length / 2, y, x + length / 2, y);
  }

  drawCurveLine(x, y, length) {
    noFill();
    beginShape();
    for (let i = -length / 2; i < length / 2; i++) {
      let yOffset = 30 * sin(i / 30);
      vertex(x + i, y + yOffset);
    }
    endShape();
  }
  drawMonkeyOutline(x, y) {
    // Draw monkey outline (circle with rectangle below)
    stroke(0);
    strokeWeight(2);
    ellipse(x, y, 60, 60); // Circle for head
    rect(x - 30, y + 30, 60, 40); // Rectangle for body
  }

  calculateDistance(x1, y1, x2, y2) {
    return dist(x1, y1, x2, y2);
  }

  isWithinThreshold(x, y, pathFunction) {
    // Define a distance threshold based on your preference
    const threshold = 10;
    // Check if the entire drawn path is within the threshold of the predefined path
    for (let i = 0; i < width; i++) {
      if (this.calculateDistance(x, y, i, pathFunction(i)) > threshold) {
        return false;
      }
    }
    return true;
  }

  draw() {
    background(220);

    // Draw the predefined paths
    let centerX = width / 2;
    let startY = height / 2 - 50;
    this.drawZigzagLine(centerX, startY, 300, 50, 10);
    this.drawStraightLine(centerX, startY + 50, 300);
    this.drawCurveLine(centerX, startY + 100, 300);

    // Draw the monkey image at the mouse position
    image(this.monkeyImage, mouseX, mouseY, 50, 50);

    if (mouseIsPressed) {
      stroke(255, 0, 0);
      strokeWeight(2);
      line(pmouseX, pmouseY, mouseX, mouseY);

      // Check if the user has gotten off any of the paths
      if (dist(pmouseX, pmouseY, mouseX, mouseY) > 5) {
        // Check accuracy for each predefined path
        if (this.isWithinThreshold(mouseX, mouseY, this.zigzagPath.bind(this))) {
          this.zigzagCounter++;
        } else if (
          this.isWithinThreshold(mouseX, mouseY, this.straightPath.bind(this))
        ) {
          this.straightCounter++;
        } else if (
          this.isWithinThreshold(mouseX, mouseY, this.curvePath.bind(this))
        ) {
          this.curveCounter++;
        }
      }
    }

    // Check if the user has reached the next level
    if (
      this.zigzagCounter + this.straightCounter + this.curveCounter >=
      this.nextLevelThreshold
    ) {
      // Reset counters
      this.zigzagCounter = 0;
      this.straightCounter = 0;
      this.curveCounter = 0;

      // Increase the level
      this.currentLevel++;

      // Clear the canvas
      background(220);

      // Update the next level threshold (adjust as needed)
      this.nextLevelThreshold += 5;
    }

    // Display the counters and accuracy on the canvas
    fill(0);
    textSize(16);
    text(`Zigzag Counter: ${this.zigzagCounter}`, 20, 20);
    text(`Straight Counter: ${this.straightCounter}`, 20, 40);
    text(`Curve Counter: ${this.curveCounter}`, 20, 60);
    text(`Current Level: ${this.currentLevel}`, 20, 80);
    text(
      `Accuracy: ${Math.round(
        ((this.zigzagCounter + this.straightCounter + this.curveCounter) /
          (this.nextLevelThreshold * this.currentLevel)) *
          100
      )}%`,
      20,
      100
    );
  }

  zigzagPath(x) {
    return (
      height / 2 - 50 - 10 * sin((x - (width / 2 - 150)) / 25) + 10 * sin((x - (width / 2 - 150)) / 12)
    );
  }

  straightPath(x) {
    return height / 2 + 50;
  }

  curvePath(x) {
    return height / 2 + 100 + 30 * sin((x - (width / 2 - 150)) / 30);
  }
}

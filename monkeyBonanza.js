class MonkeyBonanza {
  zigzagCounter = 0;
  straightCounter = 0;
  curveCounter = 0;

  MonkeyImage;
  
  constructor() {
    noLoop = true;

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
        y - amplitude,
      );
      line(
        x - length / 2 + i * separation + separation / 2,
        y - amplitude,
        x - length / 2 + (i + 1) * separation,
        y,
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

  draw() {
    image(this.monkeyImage, mouseX, mouseY, 50, 50);
    if (mouseIsPressed) {
      stroke(255, 0, 0);
      strokeWeight(2);
      line(pmouseX, pmouseY, mouseX, mouseY);

      // Check if the user has gotten off any of the paths
      if (dist(pmouseX, pmouseY, mouseX, mouseY) > 5) {
        // Increase the counter for the respective path
        if (mouseY >= height / 2 - 50 && mouseY < height / 2 + 50) {
          this.zigzagCounter++;
        } else if (mouseY >= height / 2 + 50 && mouseY < height / 2 + 150) {
          this.straightCounter++;
        } else if (mouseY >= height / 2 + 150 && mouseY < height / 2 + 250) {
          this.curveCounter++;
        }
      }
    }
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
    // Display the counters on the canvas
    fill(0);
    textSize(16);
    text(`Zigzag Counter: ${this.zigzagCounter}`, 20, 20);
    text(`Straight Counter: ${this.straightCounter}`, 20, 40);
    text(`Curve Counter: ${this.curveCounter}`, 20, 60);

    text(`Current Level: ${this.currentLevel}`, 20, 80);
  }
}

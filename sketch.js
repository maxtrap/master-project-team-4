function preload() {
  musicPreload();
  fairytalePreload();
  fontPreload();
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    setScene(new GeckoClimber());
}

function draw() {
  currentScene.draw();
  drawUI();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    togglePause();
  }
}

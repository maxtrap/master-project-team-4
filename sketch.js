function preload() {
  musicPreload();
  fairytalePreload();
  fontPreload();
  geckoClimberPreload();
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");
  setScene(() => new TitleScreen());
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

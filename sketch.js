function preload() {
  musicPreload();
  fairytalePreload();
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");
  setScene(() => new TitleScreen());
}

function draw() {
  currentScene.draw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    togglePause();
  }
}

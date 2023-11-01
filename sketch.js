function preload() {
  musicPreload();
  fairytalePreload();
  fontPreload();
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");
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

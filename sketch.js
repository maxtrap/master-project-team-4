function preload() {
  musicPreload();
  fairytalePreload();
  fontPreload();
  geckoClimberPreload();
  monkeyBonanzaPreload();
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");
  setScene(() => new TitleScreen());
  pauseMenu = select("#pauseMenu");
}

function draw() {
  currentScene.draw();
  drawUIElements();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    togglePause();
  }
}

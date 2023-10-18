var scribble = new Scribble();
var currentScene;

function setup() {
  createCanvas(windowWidth, windowHeight);
  setScene(fairytaleTapper);
}

function draw() {
    currentScene.draw();
}

function setScene(scene) {
    currentScene = scene;
    scene.setup();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

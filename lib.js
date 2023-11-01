var scribble = new Scribble();
var currentScene;
const buttonWidth = 300;
const buttonHeight = 50;
const buttonVerticalPadding = 10;

function setScene(sceneFactory) {
  clearClickables();
  clearMissables();
  if (currentScene !== undefined) {
    currentScene.destructor();
  }
  currentScene = sceneFactory();
  if (currentScene.noLoop) {
    noLoop();
  } else {
    frameRate(currentScene.frameRate || 60);
  }
  playMusic();
}

function buttonFactory(x, y, text, cb) {
  var button = new Clickable();
  button.textScaled = true;
  button.text = text;
  button.locate(x, y);
  button.resize(buttonWidth, buttonHeight);
  button.onPress = cb;
  return button;
}

function togglePause() {
  var pauseMenu = select("#pauseMenu");
  if (pauseMenu.style("display") === "none") {
    noLoop();
    pauseMenu.style("display", "flex");
  } else {
    loop();
    pauseMenu.style("display", "none");
  }
}

const buttonWidth = 300;
const buttonHeight = 50;
const buttonVerticalPadding = 10;
const defaultFont = "Pixeboy";
const secondaryShade = "#0cb277";

var scribble = new Scribble();
var currentScene;
var currentSceneUIElements = [];
var pauseMenu;
var pauseMenuDisplay = () => pauseMenu.style("display");

function setScene(sceneFactory) {
  // clear clickable arrays
  clearClickables();
  clearMissables();
  currentSceneUIElements = [];

  // destroy current scene if necessary
  if (currentScene !== undefined && currentScene.destructor) {
    currentScene.destructor();
  }

  // set current scene
  currentScene = sceneFactory();

  // set framerate or no loop
  if (currentScene.noLoop) {
    noLoop();
  } else {
    frameRate(currentScene.frameRate || 60);
  }

  if (currentScene.noCursor) {
    noCursor();
  } else {
    cursor();
  }

  // play music
  playMusic();
}

function fontPreload() {
  loadFont("resources/Pixeboy.ttf", () => console.log("loaded pixeboy"));
}

function drawUI() {
  textFont(defaultFont);
  currentSceneUIElements.forEach((element) => element.draw());
}

function createUIElement(x, y, text, cb) {
  var button = new Clickable();
  button.textScaled = true;
  button.text = text;
  button.locate(x, y);
  button.resize(buttonWidth, buttonHeight);
  button.onPress = cb;
  button.color = secondaryShade;
  button.textFont = defaultFont;
  currentSceneUIElements.push(button);

  index = currentSceneUIElements.length - 1;
  return index;
}

function updateUIElementText(index, text) {
  currentSceneUIElements[index].text = text;
}

function togglePause() {
  if (pauseMenuDisplay() === "none") {
    if (currentScene instanceof TitleScreen) return;
    if (!currentScene.noLoop) noLoop();
    pauseMenu.style("display", "flex");
  } else {
    if (!currentScene.noLoop) loop();
    pauseMenu.style("display", "none");
  }
}

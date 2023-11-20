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
  // reset drawing stuff
  fill("#00000000");
  stroke("#00000000");

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

function drawUIElements() {
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

function drawLevelIndicator(level) {
  let levelString = `Level ${level}`;
  textSize(64);
  let levelTextWidth = textWidth(levelString);

  push();
  strokeWeight(3);
  stroke(0);
  rectMode(CORNER);
  fill(secondaryShade + "c8");
  rect(
    width - levelTextWidth - 55,
    -10,
    textWidth(levelString) + 55,
    110,
    0,
    0,
    0,
    20,
  );
  pop();

  fill(0);
  strokeWeight(0);
  textAlign(LEFT);
  text(levelString, width - levelTextWidth - 20, 70);
}

function drawScore(score, scoreMax = 0) {
  let scoreString = `Score: ${score}`;
  if (scoreMax !== 0) scoreString += `/${scoreMax}`;
  textSize(64);

  push();
  strokeWeight(3);
  stroke(0);
  rectMode(CORNER);
  fill(secondaryShade + "c8");
  rect(-10, -10, textWidth(scoreString) + 55, 110, 0, 0, 20, 0);
  pop();

  fill(0);
  textAlign(LEFT);
  text(scoreString, 20, 70);
}

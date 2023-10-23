var scribble = new Scribble();
var currentScene;
var buttonWidth = 300;
var buttonHeight = 50;
var buttonVerticalPadding = 10;

function setScene(scene) {
  currentScene = scene;
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

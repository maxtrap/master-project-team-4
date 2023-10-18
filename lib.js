var scribble = new Scribble();
var currentScene;
var buttonWidth = 200;
var buttonHeight = 50;

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

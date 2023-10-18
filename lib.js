var scribble = new Scribble();
var currentScene;

function setScene(scene) {
    currentScene = scene;
}

function buttonFactory(x, y, w, h, text, cb) {
    var button = new Clickable();
    button.textScaled = true;
    button.text = text;
    button.locate(x, y);
    button.resize(w, h);
    button.onPress = cb;
    return button;
}

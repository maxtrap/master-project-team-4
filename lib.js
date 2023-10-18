var scribble = new Scribble();
var currentScene;

function setScene(scene) {
    currentScene = scene;
    scene.setup();
}

function buttonFactory(x, y, cb) {
    var button = new Clickable();
    button.locate(x, y);
    button.onPress = cb;
    return button;
}

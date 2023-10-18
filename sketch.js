var scribble = new Scribble();
var currentScene = titleScreen;

function setup() {
    createCanvas(1600, 900);
}

function draw() {
    background(220);
    currentScene.draw();
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    setScene(titleScreen);
}

function draw() {
    currentScene.draw();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

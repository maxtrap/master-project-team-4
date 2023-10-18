function setup() {
    createCanvas(windowWidth, windowHeight);
    setScene(fairytaleTapper);
}

function draw() {
    currentScene.draw();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

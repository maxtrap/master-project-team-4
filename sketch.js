function setup() {
    createCanvas(windowWidth, windowHeight);
    setScene(new TitleScreen());
}

function draw() {
    currentScene.draw();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

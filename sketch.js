var scribble = new Scribble();

function setup() {
    createCanvas(1600, 900);
}

function draw() {
    background(220);
    scribble.scribbleEllipse(50, 50, 100, 100);
}

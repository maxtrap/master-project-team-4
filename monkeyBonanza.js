class MonkeyBonanza {
    path = [];
    userPath = [];
    tracing = false;
    errorMargin = 50;
    accuracy = 100;

    constructor() {
        createCanvas(400, 400);
        // Define the zigzag path for the user to trace
        path = [
            createVector(100, 100),
            createVector(300, 100),
            createVector(100, 200),
            createVector(300, 200),
            createVector(100, 300),
            createVector(300, 300),
        ];
        noFill();
        stroke(0);
        beginShape();
        for (let point of path) {
            vertex(point.x, point.y);
        }
        endShape();
    }

    draw() {
        background(220);

        // Display the zigzag path
        noFill();
        stroke(0);
        beginShape();
        for (let point of path) {
            vertex(point.x, point.y);
        }
        endShape();

        if (tracing) {
            // Display the user's drawing
            userDrawing();
            calculateAccuracy();
        }

        // Display the user's accuracy
        textSize(24);
        fill(0);
        text("Accuracy: " + accuracy.toFixed(2) + "%", 10, 30);
    }

    mousePressed() {
        // Start tracing when the mouse is pressed
        tracing = true;
        userPath = [];
        accuracy = 100;
    }

    mouseReleased() {
        // Stop tracing when the mouse is released
        tracing = false;
    }

    userDrawing() {
        // Draw the user's path
        stroke(0, 0, 255);
        strokeWeight(2);
        userPath.push(createVector(mouseX, mouseY));
        for (let i = 1; i < userPath.length; i++) {
            line(userPath[i - 1].x, userPath[i - 1].y, userPath[i].x, userPath[i].y);
        }
    }

    calculateAccuracy() {
        let totalDistance = 0;
        for (let i = 0; i < userPath.length; i++) {
            if (i < path.length) {
            let d = dist(path[i].x, path[i].y, userPath[i].x, userPath[i].y);
            totalDistance += d;
            }
        }
        let maxDistance = path.length * errorMargin;
        accuracy = 100 * (1 - totalDistance / maxDistance);
    }

    mouseDragged() {
        if (tracing) {
            userPath.push(createVector(mouseX, mouseY));
        }
    }
}
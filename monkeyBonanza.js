let MONKEY_IMAGE;
let BACKGROUND_FOREST;
let BANANA_IMAGE;
let PATHWAYS = [];
let ERROR_COUNT = 0;

function monkeyBonanzaPreload() {
    MONKEY_IMAGE = loadImage("resources/MonkeyVine.jpg");
    BACKGROUND_FOREST = loadImage('resources/Rainforest.jpeg');
    BANANA_IMAGE = loadImage('resources/Rainforest.jpeg');
}

class MonkeyBonanza {
    monkeyX;
    monkeyY;
    pathwayIndex = 0;

    constructor() {
        this.monkeyX = width / 2;
        this.monkeyY = height / 2;
        this.initializePathways();
    }

    initializePathways() {
        PATHWAYS.push(this.zigzagPath.bind(this), this.straightPath.bind(this), this.curvePath.bind(this));
    }

    draw() {
        background(BACKGROUND_FOREST);

        // Draw the predefined pathways
        for (let i = 0; i < PATHWAYS.length; i++) {
            this.drawPathway(PATHWAYS[i]);
        }

        // Draw the monkey image at the mouse position
        image(MONKEY_IMAGE, mouseX, mouseY, 50, 50);

        // Check if the user is tracing the current pathway
        if (this.isWithinThreshold(mouseX, mouseY, PATHWAYS[this.pathwayIndex])) {
            // Move the monkey along the pathway
            this.monkeyX = mouseX;
            this.monkeyY = PATHWAYS[this.pathwayIndex](mouseX);
        } else {
            // Count an error if the monkey deviates from the pathway
            ERROR_COUNT++;
        }
    }

    drawPathway(pathFunction) {
        // Draw the pathway on the canvas for visual reference
        stroke(0);
        strokeWeight(2);
        beginShape();
        for (let i = 0; i < width; i++) {
            let y = pathFunction(i);
            vertex(i, y);
        }
        endShape();
    }

    isWithinThreshold(x, y, pathFunction) {
        // Define a distance threshold based on your preference
        const threshold = 10;
        // Check if the entire drawn path is within the threshold of the predefined path
        for (let i = 0; i < width; i++) {
            if (this.calculateDistance(x, y, i, pathFunction(i)) > threshold) {
                return false;
            }
        }
        return true;
    }

    calculateDistance(x1, y1, x2, y2) {
        return dist(x1, y1, x2, y2);
    }

    zigzagPath(x) {
        return height / 2 - 50 - 10 * sin((x - (width / 2 - 150)) / 25) + 10 * sin((x - (width / 2 - 150)) / 12);
    }

    straightPath(x) {
        return height / 2 + 50;
    }

    curvePath(x) {
        return height / 2 + 100 + 30 * sin((x - (width / 2 - 150)) / 30);
    }

    getErrorCount() {
        return ERROR_COUNT;
    }
}

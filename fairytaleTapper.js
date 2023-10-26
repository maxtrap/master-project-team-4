const RANDOM_INTERVAL_LOW = 1;
const RANDOM_INTERVAL_HIGH = 3;
const UNICORN_WIDTH = 200;
const UNICORN_HEIGHT = UNICORN_WIDTH * 89/106;
let UNICORN_IMG;
let SPARKLES_GIF;
let BACKGROUND_IMG;
let SPARKLES_FRAME_COUNT;

function fairytalePreload() {
    UNICORN_IMG = loadImage('resources/unicorn.png');
    SPARKLES_GIF = loadImage('resources/sparkles.gif', initializeFrameCount);
    BACKGROUND_IMG = loadImage('resources/castle-background.jpg');
}

function initializeFrameCount() {
    SPARKLES_FRAME_COUNT = SPARKLES_GIF.numFrames();
}

class FairytaleTapper {
    
    unicorns = [];
    score = 0;
    

    constructor() {
        this.generateUnicornAtRandomInterval();
    }

    draw () {
        background(BACKGROUND_IMG);
        this.unicorns.forEach(unicorn => {
            unicorn.draw(this);
        });
        
        
        noStroke();
        fill(255, 200);
        rect(0, 0, 320, 100);

        textSize(64);
        fill(0);
        text(`Score: ${this.score}`, 20, 70);

    }

    makeUnicorn() {
        this.unicorns.push(new Unicorn(this));
    }

    generateUnicornAtRandomInterval() {
        this.makeUnicorn();

        // Generate a random time interval between 3 and 5 seconds (in milliseconds)
        const randomInterval = Math.floor(Math.random() * (RANDOM_INTERVAL_HIGH - RANDOM_INTERVAL_LOW) * 1000) + RANDOM_INTERVAL_LOW * 1000;
      
        // Schedule the function to run again after the random interval
        setTimeout(this.generateUnicornAtRandomInterval.bind(this), randomInterval);
    }
}


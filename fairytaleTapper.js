const RANDOM_INTERVAL_LOW = 0.1;
const RANDOM_INTERVAL_HIGH = 0.5;
const GAME_LENGTH = 10;
const SCORE_GOAL = 200;

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
    time = GAME_LENGTH;
    isGameFinished = false;
    

    constructor() {
        clearClickables();
        this.generateUnicornAtRandomInterval();
        this.startTime = millis();
    }

    draw () {
        background(BACKGROUND_IMG);
        this.drawScore();
        this.drawTimer();

        this.unicorns.forEach(unicorn => {
            unicorn.draw(() => this.unicorns = this.unicorns.filter(uni => uni != unicorn));
        });
    }
    

    drawScore() {
        let scoreString = `Score: ${this.score}/200`

        noStroke();
        rectMode(CORNER);
        fill(255, 200);
        rect(0, 0, textWidth(scoreString) + 45, 100, 0, 0, 20, 0);

        textSize(64);
        fill(0);
        textAlign(LEFT);
        text(scoreString, 20, 70);
    }

    drawTimer() {
        let currentTime = millis();
        let elapsedTime = currentTime - this.startTime;

        this.time = GAME_LENGTH - Math.floor(elapsedTime / 1000);
        noStroke();
        fill(255, 200);
        rectMode(CENTER);
        rect(width / 2, 50, 175, 100, 0, 0, 20, 20);

        textSize(64);
        fill(0);
        textAlign(CENTER);

        let minutes = Math.floor(this.time / 60);
        let seconds = this.time % 60;
        let formattedSeconds = seconds.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          });
        text(`${minutes}:${formattedSeconds}`, width / 2, 70);

        if (this.time <= 0) {
            this.loseGame();
        }
    }


    generateUnicornAtRandomInterval() {
        if (this.unicorns.length <= 20) {
            this.unicorns.push(new Unicorn(() => this.score++));
        }
        // Generate a random time interval between 3 and 5 seconds (in milliseconds)
        const randomInterval = Math.random() * (RANDOM_INTERVAL_HIGH - RANDOM_INTERVAL_LOW) * 1000 + RANDOM_INTERVAL_LOW * 1000;
      
        if (!this.isGameFinished) {
            // Schedule the function to run again after the random interval
            setTimeout(this.generateUnicornAtRandomInterval.bind(this), randomInterval);
        }
    }

    loseGame() {
        this.isGameFinished = true;
        clearClickables();
        setScene(new FairytaleLoseScreen(this.score));
    }
}


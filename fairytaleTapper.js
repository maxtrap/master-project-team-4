const RANDOM_INTERVAL_LOW = 0.1;
const RANDOM_INTERVAL_HIGH = 0.5;
const GAME_LENGTH = 50;
const SCORE_GOAL = 3;

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

        if (localStorage.getItem("ft_highscore") === null) {
            localStorage.setItem("ft_highscore", "-1");
        }
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
        let scoreString = `Score: ${this.score}/${SCORE_GOAL}`
        textSize(64);

        noStroke();
        rectMode(CORNER);
        fill(255, 200);
        rect(0, 0, textWidth(scoreString) + 45, 100, 0, 0, 20, 0);

        
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
        rect(width / 2, 50, 262, 150, 0, 0, 20, 20);

        textSize(100);
        fill(0);
        textAlign(CENTER);

        
        text(timeFormatted(this.time), width / 2, 92);

        if (this.time <= 0) {
            this.loseGame();
        }
    }

    onClick() {
        this.score++;
        if (this.score >= SCORE_GOAL) {
            this.winGame();
        }
    }

    generateUnicornAtRandomInterval() {
        if (this.unicorns.length <= 20) {
            this.unicorns.push(new Unicorn(this.onClick.bind(this)));
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

    winGame() {
        this.isGameFinished = true;
        clearClickables();
        setScene(new FairytaleWinScreen(this.time));
    }
}

function timeFormatted(timeInSeconds) {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;
    let formattedSeconds = seconds.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
    return `${minutes}:${formattedSeconds}`;
}


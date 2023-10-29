const GAME_LENGTH = 60;
const SCORE_GOAL = 30;

const RANDOM_INTERVAL_LOW = 1;
const RANDOM_INTERVAL_HIGH = 2;

let SPARKLE_SOUND;
let ANGRY_UNICORN;

let CORN_IMG;
let BUTTERFLY_GIF;
let SPARKLES_GIF;
let BACKGROUND_IMG;
let SPARKLES_FRAME_COUNT;
let BUTTERFLY_FRAME_COUNT;

function fairytalePreload() {
    SPARKLE_SOUND = loadSound('resources/sparkle.mp3');
    ANGRY_UNICORN = loadSound('resources/horse-neigh.mp3');

    UNICORN_IMG = loadImage('resources/unicorn.png');
    BUTTERFLY_GIF = loadImage('resources/butterfly.gif', initializeButterflyFrameCount);
    SPARKLES_GIF = loadImage('resources/sparkles.gif', initializeSparklesFrameCount);
    BACKGROUND_IMG = loadImage('resources/castle-background.jpg');
}

function initializeSparklesFrameCount() {
    SPARKLES_FRAME_COUNT = SPARKLES_GIF.numFrames();
}

function initializeButterflyFrameCount() {
    BUTTERFLY_FRAME_COUNT = BUTTERFLY_GIF.numFrames();
}

class FairytaleTapper {
    
    creatures = [];
    score = 0;
    time = GAME_LENGTH;
    isGameFinished = false;
    

    constructor(level = 1) {
        this.generateCreatureAtRandomInterval();
        this.startTime = millis();
        this.level = level;

        if (localStorage.getItem("ft_highscore") === null) {
            localStorage.setItem("ft_highscore", "-1");
        }

        cl_missables.push(this.onMiss.bind(this));
    }

    draw () {
        background(BACKGROUND_IMG);
        this.drawScore();
        this.drawTimer();
        this.drawLevelIndicator();

        this.creatures.forEach(creature => {
            creature.draw(() => this.creatures = this.creatures.filter(ctr => ctr != creature));
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

    drawLevelIndicator() {
        let levelString = `Level ${this.level}`
        textSize(64);
        let levelTextWidth = textWidth(levelString);

        noStroke();
        rectMode(CORNER);
        fill(255, 200);
        rect(width - levelTextWidth - 45, 0, textWidth(levelString) + 45, 100, 0, 0, 0, 20);

        
        fill(0);
        textAlign(LEFT);
        text(levelString, width - levelTextWidth - 20, 70);
    }

    onClick() {
        this.score++;

        if (this.score >= SCORE_GOAL) {
            this.winGame();
        }
    }

    onMiss() {
        ANGRY_UNICORN.play();
    }


    //0 = unicorn, 1 = butterfly
    addCreature(creatureNumber) {
        switch(creatureNumber) {
            case 0:
                this.creatures.push(new Unicorn(this.onClick.bind(this)));
                break;
            case 1:
                this.creatures.push(new Butterfly(this.onClick.bind(this)));
                break;
        }
    }
    
    generateCreatureAtRandomInterval() {
        if (this.creatures.length <= 10) {
            this.addCreature(Math.floor(Math.random() * this.level));
        }
        // Generate a random time interval between 3 and 5 seconds (in milliseconds)
        const randomInterval = Math.random() * (RANDOM_INTERVAL_HIGH - RANDOM_INTERVAL_LOW) * 1000 + RANDOM_INTERVAL_LOW * 1000;
      
        if (!this.isGameFinished) {
            // Schedule the function to run again after the random interval
            setTimeout(this.generateCreatureAtRandomInterval.bind(this), randomInterval);
        }
    }

    loseGame() {
        this.isGameFinished = true;
        setScene(() => new FairytaleLoseScreen(this.score));
    }

    winGame() {
        this.isGameFinished = true;
        setScene(() => new FairytaleWinScreen(this.time));
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


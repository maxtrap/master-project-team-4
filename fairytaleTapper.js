const RANDOM_INTERVAL_LOW = 1;
const RANDOM_INTERVAL_HIGH = 3;
const UNICORN_WIDTH = 200;
const UNICORN_HEIGHT = UNICORN_WIDTH * 89/106;
let UNICORN_IMG;
let SPARKLES_GIF;
let SPARKLES_FRAME_COUNT;

function fairytalePreload() {
    UNICORN_IMG = loadImage('resources/unicorn.png');
    SPARKLES_GIF = loadImage('resources/sparkles.gif', updateFrameCount);
}

function updateFrameCount() {
    SPARKLES_FRAME_COUNT = SPARKLES_GIF.numFrames();
}

class FairytaleTapper {
    
    unicorns = [];
    sparkles = [];
    score = 0;
    

    constructor() {
        background(255);
        this.generateUnicornAtRandomInterval();
    }

    draw () {
        background(255);
        this.unicorns.forEach(unicorn => {
            unicorn.draw();
            
        });
        
        this.sparkles.forEach(sparkle => {
            sparkle.draw(this);
        });
        
        
        textSize(64);
        text(`Score: ${this.score}`, 20, 70);
    }

    makeUnicorn() {
        let unicorn = new Clickable();
        unicorn.locate(getRandomX(), getRandomY());
        unicorn.image = UNICORN_IMG;
        unicorn.resize(UNICORN_WIDTH, UNICORN_HEIGHT);
        unicorn.cornerRadius = 0;
        unicorn.strokeWeight = 0;
        unicorn.text = "";
        unicorn.color = "nofill"
        
        unicorn.onPress = this.unicornPressed.bind(this, unicorn);

        this.unicorns.push(unicorn);
        return unicorn;
    }

    unicornPressed(uniPressed) {
       this.unicorns = this.unicorns.filter(uni => uni !== uniPressed); 
       this.sparkles.push(new Sparkles(uniPressed.x, uniPressed.y));
       this.score++;
    }

    generateUnicornAtRandomInterval() {
        this.makeUnicorn();

        // Generate a random time interval between 3 and 5 seconds (in milliseconds)
        const randomInterval = Math.floor(Math.random() * (RANDOM_INTERVAL_HIGH - RANDOM_INTERVAL_LOW) * 1000) + RANDOM_INTERVAL_LOW * 1000;
      
        // Schedule the function to run again after the random interval
        setTimeout(this.generateUnicornAtRandomInterval.bind(this), randomInterval);
    }
}

function getRandomX() {
    return Math.floor(Math.random() * (width - UNICORN_WIDTH))
}

function getRandomY() {
    return Math.floor(Math.random() * (height - UNICORN_HEIGHT))
}


class Sparkles {
    currentFrame = 48;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(game) {
        SPARKLES_GIF.setFrame(this.currentFrame)
        this.currentFrame++;

        // console.log(SPARKLES_GIF)
        
        image(SPARKLES_GIF, this.x, this.y, UNICORN_WIDTH, UNICORN_HEIGHT);
        
        if (this.currentFrame === SPARKLES_FRAME_COUNT) {
            this.currentFrame = 0;
        }

        if (this.currentFrame === 47) {
            game.sparkles = game.sparkles.filter(sparkle => sparkle !== this); 
        }
    }

}
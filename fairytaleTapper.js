const RANDOM_INTERVAL_LOW = 3;
const RANDOM_INTERVAL_HIGH = 5;
const UNICORN_WIDTH = 100;
const UNICORN_HEIGHT = UNICORN_WIDTH * 89/106;

class FairytaleTapper {
    unicornImg = loadImage('resources/unicorn.png');
    unicorns = [];
    score = 0;
    

    constructor() {
        background(255);
        this.generateUnicornAtRandomInterval();
    }

    draw () {
        background(255);
        this.unicorns.forEach(unicorn => {
            unicorn.draw();
        })
        textSize(32);
        text(`Score: ${this.score}`, 10, 30);
    }

    makeUnicorn() {
        let unicorn = new Clickable();
        unicorn.locate(getRandomX(), getRandomY());
        unicorn.image = this.unicornImg;
        unicorn.resize(UNICORN_WIDTH, UNICORN_HEIGHT);
        unicorn.cornerRadius = 0;
        unicorn.strokeWeight = 0;
        unicorn.text = "";
        
        unicorn.onPress = this.unicornPressed.bind(this, unicorn);

        this.unicorns.push(unicorn);
        return unicorn;
    }

    unicornPressed(uniPressed) {
       this.unicorns = this.unicorns.filter(uni => uni !== uniPressed); 
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
    return Math.floor(Math.random() * (width - UNICORN_WIDTH)) + UNICORN_WIDTH / 2;
}

function getRandomY() {
    return Math.floor(Math.random() * (height - UNICORN_HEIGHT)) + UNICORN_HEIGHT / 2;
}
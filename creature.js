class Creature {

    constructor(onClick = null, x = 0, y = 0) {
        this.clickable = new Clickable();
        this.clickable.locate(x, y);
        this.clickable.cornerRadius = 0;
        this.clickable.strokeWeight = 0;
        this.clickable.text = "";
        this.clickable.color = "nofill"
        
        this.clickable.onPress = this.click.bind(this, onClick);

        this.isClicked = false;
    }

    click(onClick) {
        removeClickable(this.clickable);

        this.sparkles = new Sparkles(this.clickable.x + this.clickable.width / 2, this.clickable.y + this.clickable.height / 2);
        this.isClicked = true;

        SPARKLE_SOUND.play();

        if (onClick !== null) {
            onClick();
        }
    }

    draw() {
        if (this.isClicked) {
            return this.sparkles.draw();
        } else {
            this.clickable.draw();
            return false;
        }
    }
}


const SPARKLES_WIDTH = 200;
const SPARKLES_HEIGHT = SPARKLES_WIDTH;

class Sparkles {
    currentFrame = 48;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        SPARKLES_GIF.setFrame(this.currentFrame)
        this.currentFrame++;
        
        push();
        imageMode(CENTER);  
        image(SPARKLES_GIF, this.x, this.y, SPARKLES_WIDTH, SPARKLES_HEIGHT);
        pop();

        if (this.currentFrame === SPARKLES_FRAME_COUNT) {
            this.currentFrame = 0;
        }

        if (this.currentFrame === 47) {
            return true;
        }
        return false;
    }

}

//Returns a random number between 0 and the upperBound
function getRandomCoord(upperBound) {
    return Math.floor(Math.random() * upperBound)
}
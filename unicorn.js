const IMAGE_ROTATION_RANGE = 5;


class Unicorn {

    constructor(game) {
        this.x = getRandomX();
        this.y = getRandomY();
        this.clickable = new Clickable();
        this.clickable.locate(this.x, this.y);
        this.clickable.image = UNICORN_IMG;
        this.clickable.resize(UNICORN_WIDTH, UNICORN_HEIGHT);
        this.clickable.cornerRadius = 0;
        this.clickable.strokeWeight = 0;
        this.clickable.text = "";
        this.clickable.color = "nofill"
        
        this.clickable.onPress = this.click.bind(this, game);

        this.isClicked = false;
        this.sparkles = new Sparkles(this.x, this.y);
        this.rotation = 0;
        this.doSpin = false;
    }

    click(game) {
        this.isClicked = true;
        game.score++;
    }

    draw(game) {
        if (this.isClicked) {
            if (this.sparkles.draw()) {
                game.unicorns = game.unicorns.filter(unicorn => unicorn != this);
            }
        } else {
            this.clickable.draw();
            this.updateImageAngle();
        }
    }

    //Rotation works. I don't know how or why. I couldn't explain it if I tried. IT WORKS DO NOT TOUCH.
    updateImageAngle() {
        if (this.doSpin) {
            if (this.rotation < 180) {
                this.clickable.imageAngle = easeIn(this.rotation / 180) * this.rotation;
            } else {
                this.clickable.imageAngle = easeIn(1 - (this.rotation - 180)/ 180) * (this.rotation - 360) + 360;
            }
            
        } else {
            //This is repsonsible for the small rotation effect. Everything else does the rotation animation.
            this.clickable.imageAngle = sin(PI / 180 * this.rotation) * IMAGE_ROTATION_RANGE;
        }

        //This is basically just the rotation speed
        this.rotation += 2;
        
        if (this.rotation >= 360) {
            this.rotation = 0;
            this.doSpin = false;
            if (Math.random() < 0.2) {
                this.doSpin = true;
            }
        }
    }

}

class Sparkles {
    currentFrame = 48;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        SPARKLES_GIF.setFrame(this.currentFrame)
        this.currentFrame++;
        
        image(SPARKLES_GIF, this.x, this.y, UNICORN_WIDTH, UNICORN_HEIGHT);
        
        if (this.currentFrame === SPARKLES_FRAME_COUNT) {
            this.currentFrame = 0;
        }

        if (this.currentFrame === 47) {
            return true;
        }
        return false;
    }

}

function getRandomX() {
    return Math.floor(Math.random() * (width - UNICORN_WIDTH))
}

function getRandomY() {
    return Math.floor(Math.random() * (height - UNICORN_HEIGHT))
}

//Random function from the internet
function easeIn(angle) {
    return 1 - sin(PI / 2 * (1 - angle));
}
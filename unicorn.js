const UNICORN_WIDTH = 200;
const UNICORN_HEIGHT = UNICORN_WIDTH * 89/106;
const IMAGE_ROTATION_RANGE = 5;


class Unicorn extends Creature {

    constructor(onClick = null, onDespawn = null, x = getRandomCoord(width - UNICORN_WIDTH), y = TIMER_HEIGHT + getRandomCoord(height - UNICORN_HEIGHT - TIMER_HEIGHT)) {
        super(onClick, onDespawn, x, y);
        this.clickable.image = UNICORN_IMG;
        this.clickable.resize(UNICORN_WIDTH, UNICORN_HEIGHT);

        this.rotation = 0;
        this.doSpin = false;
    }

    click(onClick) {
        super.click(onClick, new SparklesEffect(this.clickable.x + this.clickable.width / 2, this.clickable.y + this.clickable.height / 2));
    }

    draw() {
        if (!this.isClicked) {
            this.updateImageAngle();
        }
        return super.draw();
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
            if (Math.random() < 0.5) {
                this.doSpin = true;
            }
        }
    }

}

//Random function from the internet
function easeIn(angle) {
    return 1 - sin(PI / 2 * (1 - angle));
}
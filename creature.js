const DESPAWN_TIME = 10;

class Creature {

    constructor(onClick = null, onDespawn = null, x = 0, y = 0) {
        this.clickable = new Clickable();
        this.clickable.locate(x, y);
        this.clickable.cornerRadius = 0;
        this.clickable.strokeWeight = 0;
        this.clickable.text = "";
        this.clickable.color = "nofill"
        
        this.clickable.onPress = this.click.bind(this, onClick);

        this.isClicked = false;

        this.onDespawn = onDespawn;
        setTimeout(this.despawn.bind(this), DESPAWN_TIME * 1000);
    }

    click(onClick, deathEffect) {
        removeClickable(this.clickable);

        this.deathEffect = deathEffect;
        this.isClicked = true;

        if (onClick) {
            onClick();
        }
    }

    draw() {
        if (this.isClicked) {
            return this.deathEffect.draw();
        } else {
            this.clickable.draw();
            return false;
        }
    }

    despawn() {
        if (this.onDespawn && !this.isClicked) {
            this.onDespawn(this);
        }
    }
}

//Returns a random number between 0 and the upperBound
function getRandomCoord(upperBound) {
    return Math.floor(Math.random() * upperBound)
}


const DEATH_EFFECT_WIDTH = 200;
const DEATH_EFFECT_HEIGHT = DEATH_EFFECT_WIDTH;

class DeathEffect {

    constructor(x, y, gif, numFrames, startFrame, endFrame) {
        this.x = x;
        this.y = y;
        
        this.gif = gif;
        this.numFrames = numFrames;
        this.currentFrame = startFrame;
        this.endFrame = endFrame;
    }

    draw() {
        this.gif.setFrame(this.currentFrame)
        this.currentFrame++;
        
        push();
        imageMode(CENTER);  
        image(this.gif, this.x, this.y, DEATH_EFFECT_WIDTH, DEATH_EFFECT_HEIGHT);
        pop();

        if (this.currentFrame === this.endFrame) {
            return true;
        }
        
        if (this.currentFrame === this.numFrames) {
            this.currentFrame = 0;
        }

        return false;
    }

}

class SparklesEffect extends DeathEffect {
    constructor(x, y) {
        super(x, y, SPARKLES_GIF, SPARKLES_FRAME_COUNT, 48, 47);
        SPARKLE_SOUND.play();
    }
}

class ExplosionEffect extends DeathEffect {
    constructor(x, y) {
        super(x, y, EXPLOSION_GIF, EXPLOSION_FRAME_COUNT, 8, 7);
        EXPLOSION_SOUND.play();
    }
}
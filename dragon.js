const DRAGON_HEIGHT = 200;
const DRAGON_WIDTH = DRAGON_HEIGHT * 0.91;

class Dragon extends Creature {
    constructor(onClick = null, onDespawn = null, x, y = TIMER_HEIGHT + getRandomCoord(height - DRAGON_HEIGHT - TIMER_HEIGHT)) {
        //Picks either 1 or -1 randomly
        let direction = Math.floor(Math.random() * 2) * 2 - 1;
        
        if (!x && x !== 0) {
            x = width * (-direction / 2 + 0.5) - DRAGON_WIDTH / 2;
        }
        
        super(onClick, onDespawn, x, y);

        this.direction = direction;

        
        this.clickable.image = this.direction === 1 ? DRAGON_RIGHT_GIF : DRAGON_LEFT_GIF;

        this.clickable.resize(DRAGON_WIDTH, DRAGON_HEIGHT);        
    }

    click(onClick) {
        super.click(onClick, new ExplosionEffect(this.clickable.x + this.clickable.width / 2 + this.direction * 30, this.clickable.y + this.clickable.height / 2));
    }

    draw() {
        this.moveDragon();
        return super.draw();
    }

    moveDragon() {
        this.clickable.x += this.direction * 5;
        if (this.clickable.x < -DRAGON_WIDTH / 2 || this.clickable.x > width - DRAGON_WIDTH / 2) {
            this.onDespawn(this);
        }
    }

    despawn() {

    }
}
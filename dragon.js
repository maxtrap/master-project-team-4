const DRAGON_HEIGHT = 200;
const DRAGON_WIDTH = DRAGON_HEIGHT * 0.91;

class Dragon extends Creature {
    constructor(onClick = null, x, y = getRandomCoord(height - DRAGON_HEIGHT)) {
        //Picks either 1 or -1 randomly
        let direction = Math.floor(Math.random() * 2) * 2 - 1;
        
        if (!x && x !== 0) {
            x = width * (direction / 2 + 0.5) - DRAGON_WIDTH / 2;
        }
        
        super(onClick, x, y);

        this.direction = direction;

        
        this.clickable.image = this.direction === 1 ? DRAGON_RIGHT_GIF : DRAGON_LEFT_GIF;

        this.clickable.resize(DRAGON_WIDTH, DRAGON_HEIGHT);        
    }

    draw(onDissapear) {
        this.moveDragon();
        super.draw(onDissapear);
    }

    moveDragon() {
        this.clickable.x += this.direction * 5;
        if (this.clickable.x < -DRAGON_WIDTH / 2) {
            this.clickable.x = width - DRAGON_WIDTH / 2;
        } else if(this.clickable.x > width - DRAGON_WIDTH / 2) {
            this.clickable.x = -DRAGON_WIDTH / 2;
        }
    }
}
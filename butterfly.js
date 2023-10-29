const BUTTERFLY_WIDTH = 200;
const BUTTERFLY_HEIGHT = BUTTERFLY_WIDTH;


class Butterfly extends Creature {

    /*
        cl = clockwise, cc = counterclockwise


        Imagine following the path of a circle. It is split into top right, bottom right, bottom left, top left
        
        tr = top right
        br = bottom right
        bl = bottom left
        tl = top left
    */
    movementMappings = {
        'cl tr': ['cl br', 'cc bl'],
        'cl br': ['cl bl', 'cc tl'],
        'cl bl': ['cl tl', 'cc tr'],
        'cl tl': ['cl tr', 'cc br'],

        'cc tr': ['cc tl', 'cl bl'],
        'cc br': ['cc tr', 'cl tl'],
        'cc bl': ['cc br', 'cl tr'],
        'cc tl': ['cc bl', 'cl br']
    }

    constructor(onClick = null, x = getRandomCoord(width - BUTTERFLY_WIDTH), y = getRandomCoord(height - BUTTERFLY_HEIGHT)) {
        super(onClick, x, y);
        this.clickable.image = BUTTERFLY_GIF;
        this.clickable.resize(BUTTERFLY_WIDTH, BUTTERFLY_HEIGHT);

        this.movementStep = 0;
        let directions = Object.keys(this.movementMappings);
        // this.movementDirection = directions[Math.floor(Math.random() * directions.length)];
        this.movementDirection = 'cl tr';
    }

    draw(onDissapear) {
        super.draw(onDissapear);

        this.moveButterfly();
    }

    moveButterfly() {

        let step = this.movementStep * PI / 180;

        //dx is delta x, dy is delta y. It comes out to be the derivative of the position function in this context (shocker)
        let dx;
        let dy;

        switch (this.movementDirection) {
            case 'cl tr':
                dx = cos(step);
                dy = sin(step);
                break;
            case 'cl br':
                dx = -sin(step);
                dy = cos(step);
                break;
            case 'cl bl':
                dx = -cos(step);
                dy = -sin(step);
                break;
            case 'cl tl':
                dx = sin(step);
                dy = -cos(step);
                break;

                
            case 'cc tr':
                dx = -sin(step);
                dy = -cos(step);
                break;
            case 'cc br':
                dx = cos(step);
                dy = -sin(step);
                break;
            case 'cc bl':
                dx = sin(step);
                dy = cos(step);
                break;
            case 'cc tl':
                dx = -cos(step);
                dy = sin(step);
                break;
        }

        this.clickable.x += dx * 4;
        this.clickable.y += dy * 4;

        if (this.clickable.x < -BUTTERFLY_WIDTH / 2) {
            this.clickable.x = width - BUTTERFLY_WIDTH / 2;
        } else if (this.clickable.x > width - BUTTERFLY_WIDTH / 2) {
            this.clickable.x = -BUTTERFLY_WIDTH / 2;
        }

        if (this.clickable.y < -BUTTERFLY_HEIGHT / 2) {
            this.clickable.y = height - BUTTERFLY_HEIGHT / 2;
        } else if (this.clickable.y > height - BUTTERFLY_HEIGHT / 2) {
            this.clickable.y = -BUTTERFLY_HEIGHT / 2;
        }

        this.movementStep += 2;
        if (this.movementStep >= 90) {
            this.movementStep = 0;
            this.movementDirection = this.movementMappings[this.movementDirection][Math.floor(Math.random() * 2)];
        }
    }
}
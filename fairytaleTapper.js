
const FairytaleTapper = class {
    unicorn = loadImage('resources/unicorn.png');

    constructor() {
        background(255);
    }

    draw = () => {
        image(this.unicorn, width / 2, height / 2, 200, 200);
    }
};

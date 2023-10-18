const TitleScreen = class {
    constructor() {
        this.buttons = [];
    }

    setup() {
        background(255, 0, 0);
        this.buttons.push(
            buttonFactory(20, 20, () => {
                alert("bruh");
            })
        );
    }

    draw() {
        randomSeed(0);
        scribble.scribbleEllipse(50, 50, 100, 100);

        textSize(200);
        textAlign(CENTER, CENTER);
        text("ABCD", width / 2, height / 2);

        this.buttons.forEach((b) => {
            b.draw();
        });
    }
};

var titleScreen = new TitleScreen();

const buttonWidth = 200;
const buttonHeight = 200;

class TitleScreen {
    constructor() {
        background(255, 0, 0);
        this.buttons = [];
        this.buttons.push(
            buttonFactory(20, 20, buttonWidth, buttonHeight, "yeah", () => {
                alert("bruh");
            }),
            buttonFactory(40, 20, buttonWidth, buttonHeight, "yeah2", () => {
                alert("two");
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
}

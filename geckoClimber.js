class GeckoClimber {
    input;
    toBeTyped = "Dog";
    score = 0;
    object;


    constructor() {
        this.input = createInput();
        this.input.style('font-size', '20px');
        this.input.position(windowWidth / 2.75, 700);
        this.input.size(400);
        textAlign(CENTER);
        textSize(25);

    }

    draw() {
        background("white");
        text(this.toBeTyped, this.input.x + (this.input.width) / 2, 680);
        fill("black");
        this.object = ellipse(this.input.x + (this.input.width) / 2, windowHeight / 2, 50, 50)
        this.typingSection();
        text(this.score, this.input.x + (this.input.width) / 2, 20)
    }

    typingSection() {
        if (keyCode == ENTER) {
            if (this.input.value() == this.toBeTyped && keyCode == ENTER) {
                keyCode = 0;
                this.score += 10;
                
            }
            if (this.input.value() != this.toBeTyped && keyCode == ENTER && keyIsDown(ENTER) == true) {
                keyCode = 0;
                this.score -= 5;
            }
            this.input.value('');


        }
    }


}

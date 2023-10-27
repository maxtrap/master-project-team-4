class FairytaleLoseScreen {

    constructor(score) {
        this.finalScore = score;
        this.unicorn = new Unicorn(null, width / 2 + 200, height / 2 - UNICORN_HEIGHT / 2);
    }

    get cardWidth() {
        return width - 300;
    }
    get cardHeight() {
        return height - 40;
    }

    draw() {
        tint(128);
        background(BACKGROUND_IMG);
        this.drawBody();
        this.drawTitle(); 
        
    }

    drawTitle() {
        let titleHeight = 100;
        let titleX = width / 2;
        let titleY = (height - this.cardHeight + titleHeight) / 2 + 20;
        

        rectMode(CENTER);
        fill(0, 255, 228);
        rect(titleX, titleY, this.cardWidth - 80, titleHeight, 20, 20, 20, 20);

        textSize(64);
        fill(0);
        textAlign(CENTER);
        text('Fairytale Tapper', titleX, titleY + 20);
    }

    drawBody() {
        rectMode(CENTER);
        fill(255);
        rect(width / 2, height / 2, this.cardWidth, this.cardHeight, 20, 20, 20, 20);

        textSize(64);
        fill(0);
        textAlign(CENTER);
        text(`Your score:  ${this.finalScore}/${SCORE_GOAL}`, width / 2 - 100, height / 2 - this.cardHeight * 0.1);
        textSize(48);
        text('You\'re almost there!', width / 2 - 100, height / 2 + this.cardHeight * 0.05);

        if (this.unicorn !== null) {
            tint(255);
            this.unicorn.draw(() => this.unicorn = null);
        }
    }

}
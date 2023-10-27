class FairytaleLoseScreen {

    replayButtonWidth = this.cardWidth / 2;
    replayButtonHeight = 100;
    replayButtonX = width / 2 - 350;
    replayButtonY = height / 2 + this.cardHeight * 0.25;

    constructor(score) {
        this.finalScore = score;
        this.unicorn = new Unicorn(null, width / 2 + 200, height / 2 - UNICORN_HEIGHT / 2);
        
        
        
        
        this.replayButton = new Clickable();

        this.replayButton.text = 'Play Again';
        this.replayButton.textSize = 35;
        this.replayButton.textScaled = true;
        
        this.replayButton.onOutside = () => {
            this.replayButton.resize(this.replayButtonWidth, this.replayButtonHeight);
            this.replayButton.locate(this.replayButtonX, this.replayButtonY);
        };

        this.replayButton.onHover = () => {
            this.replayButton.resize(this.replayButtonWidth + 10, this.replayButtonHeight + 10);
            this.replayButton.locate(this.replayButtonX - 5, this.replayButtonY - 5);
            
        };

        this.replayButton.color = '#FF9CC7'
        this.replayButton.diagonalCorners = true;
        this.replayButton.cornerRadius = 20;
        this.replayButton.strokeWeight = 2;

        this.replayButton.onPress = () => setScene(new FairytaleTapper());
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
        tint(255);
        this.drawBody();
        this.drawTitle(); 

        rectMode(CORNER);
        this.replayButton.draw();
    }

    drawTitle() {
        let titleHeight = 100;
        let titleX = width / 2;
        let titleY = (height - this.cardHeight + titleHeight) / 2 + 20;
        
        push();
        rectMode(CENTER);
        fill(0, 255, 228);
        stroke(0);
        strokeWeight(2);
        rect(titleX, titleY, this.cardWidth - 80, titleHeight, 20);
        pop();

        textSize(64);
        fill(0);
        textAlign(CENTER);
        text('Fairytale Tapper', titleX, titleY + 20);
        
    }

    drawBody() {
        rectMode(CENTER);
        fill(255);
        rect(width / 2, height / 2, this.cardWidth, this.cardHeight, 20);

        textSize(64);
        fill(0);
        textAlign(CENTER);
        text(`Your score:  ${this.finalScore}/${SCORE_GOAL}`, width / 2 - 100, height / 2 - this.cardHeight * 0.1);
        textSize(48);
        text('You\'re almost there!', width / 2 - 100, height / 2 + this.cardHeight * 0.05);

        if (this.unicorn !== null) {
            this.unicorn.draw(() => this.unicorn = null);
        }
    }

}
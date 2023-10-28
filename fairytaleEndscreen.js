class FairytaleEndScreen {

    constructor(score) {
        this.unicorn = new Unicorn(null, width / 2 + this.cardWidth * 0.25, height / 2 - UNICORN_HEIGHT / 2);
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
        this.drawButtons();
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

    drawBody(bodyText, bodySubtext) {
        rectMode(CENTER);
        fill(255);
        rect(width / 2, height / 2, this.cardWidth, this.cardHeight, 20);

        textSize(64);
        fill(0);
        textAlign(CENTER);
        text(bodyText, width / 2 - 100, height / 2 - this.cardHeight * 0.1);
        textSize(48);
        text(bodySubtext, width / 2 - 100, height / 2 + this.cardHeight * 0.05);

        if (this.unicorn !== null) {
            this.unicorn.draw(() => this.unicorn = null);
        }
    }

    drawButtons() {}

}

class EndScreenButton extends Clickable {

    constructor(onPress) {
        super();
        this.textSize = 35;
        this.textScaled = true;
        
        this.onOutside = () => {
            this.resize(this.defaultWidth, this.defaultHeight);
            this.locate(this.buttonX, this.buttonY);
        };

        this.onHover = () => {
            this.resize(this.defaultWidth + 10, this.defaultHeight + 10);
            this.locate(this.buttonX - 5, this.buttonY - 5);
            
        };

        this.color = '#FF9CC7'
        this.diagonalCorners = true;
        this.cornerRadius = 20;
        this.strokeWeight = 2;

        this.onPress = onPress;
    }


}

class FairytaleLoseScreen extends FairytaleEndScreen {
    constructor(score) {
        super();
        this.finalScore = score;
        
        
        this.replayButton = new EndScreenButton();
        this.replayButton.defaultWidth = this.cardWidth / 2;
        this.replayButton.defaultHeight = 100;
        this.replayButton.buttonX = width / 2 - 350;
        this.replayButton.buttonY = height / 2 + this.cardHeight * 0.25;
        this.replayButton.onPress = () => setScene(new FairytaleTapper());
        
        this.replayButton.text = 'Play Again';
    }

    drawBody() {
        super.drawBody(`Your score:  ${this.finalScore}/${SCORE_GOAL}`, 'You\'re almost there!');
    }

    drawButtons() {
        rectMode(CORNER);
        this.replayButton.draw();
    }
}

class FairytaleWinScreen extends FairytaleEndScreen {
    constructor(timeLeft) {
        super();
        this.timeLeft = timeFormatted(timeLeft);

        let highscore = parseInt(localStorage.getItem("ft_highscore"), 10);
        this.highscore = timeFormatted(highscore);
        if (timeLeft > highscore) {
            this.highscore = timeFormatted(timeLeft);
            localStorage.setItem("ft_highscore", timeLeft.toString());
        }
        
        this.replayButton = new EndScreenButton();
        this.replayButton.defaultWidth = this.cardWidth / 3;
        this.replayButton.defaultHeight = 100;
        this.replayButton.buttonX = width / 2 - 450;
        this.replayButton.buttonY = height / 2 + this.cardHeight * 0.25;
        this.replayButton.onPress = () => setScene(new FairytaleTapper());
        
        this.replayButton.text = 'Play Again';


        this.nextButton = new EndScreenButton();
        this.nextButton.defaultWidth = this.cardWidth / 3;
        this.nextButton.defaultHeight = 100;
        this.nextButton.buttonX = width / 2 - 50;
        this.nextButton.buttonY = height / 2 + this.cardHeight * 0.25;
        this.nextButton.onPress = () => setScene(new FairytaleTapper());
        
        this.nextButton.text = 'Next Level';
    }

    drawBody() {
        super.drawBody(`You won! Time left: ${this.timeLeft}`, `Highscore: ${this.highscore}`);
    }

    drawButtons() {
        rectMode(CORNER);
        this.replayButton.draw();
        this.nextButton.draw();
    }
}
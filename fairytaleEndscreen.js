class FairytaleEndScreen {
  constructor(level) {
    this.level = level;
    this.unicorn = new Unicorn(
      null,
      null,
      width / 2 + this.cardWidth * 0.25,
      height / 2 - UNICORN_HEIGHT / 2,
    );
  }

  get cardWidth() {
    return width - 300;
  }
  get cardHeight() {
    return height - 40;
  }

  draw() {
    tint(128);
    background(getBackground(this.level));
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
    fill(secondaryShade);
    stroke(0);
    strokeWeight(2);
    rect(titleX, titleY, this.cardWidth - 80, titleHeight, 20);
    pop();

    textSize(64);
    fill(0);
    textAlign(CENTER);
    text("Fairytale Tapper", titleX, titleY + 20);
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

    if (this.unicorn && this.unicorn.draw()) {
      this.unicorn = null;
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

    this.color = secondaryShade;
    this.diagonalCorners = true;
    this.cornerRadius = 20;
    this.strokeWeight = 2;

    this.onPress = onPress;
    this.textFont = defaultFont;
  }
}

class FairytaleLoseScreen extends FairytaleEndScreen {
  constructor(level, score) {
    super(level);
    this.finalScore = score;

    this.replayButton = new EndScreenButton();
    this.replayButton.defaultWidth = this.cardWidth / 2;
    this.replayButton.defaultHeight = 100;
    this.replayButton.buttonX = width / 2 - this.replayButton.defaultWidth / 2;
    this.replayButton.buttonY = height / 2 + this.cardHeight * 0.25;
    this.replayButton.onPress = () =>
      setScene(() => new FairytaleTapper(level));

    this.replayButton.text = "Play Again";
  }

  drawBody() {
    super.drawBody(
      `   Your score:  ${this.finalScore}/${SCORE_GOAL}`,
      "   You're almost there!",
    );
  }

  drawButtons() {
    rectMode(CORNER);
    this.replayButton.draw();
  }
}

class FairytaleWinScreen extends FairytaleEndScreen {
  constructor(level, time) {
    super(level);
    this.timeLeft = timeFormatted(time);

    let highscore = parseInt(localStorage.getItem("ft_highscore" + level), 10);
    this.highscore = timeFormatted(highscore);
    if (time < highscore) {
      this.highscore = timeFormatted(time);
      localStorage.setItem("ft_highscore" + level, time.toString());
    }

    let buttonSpacing = 30;

    this.replayButton = new EndScreenButton();
    this.replayButton.defaultWidth = this.cardWidth * 0.4;
    this.replayButton.defaultHeight = 100;
    this.replayButton.buttonX =
      width / 2 - this.replayButton.defaultWidth - buttonSpacing;
    this.replayButton.buttonY = height / 2 + this.cardHeight * 0.25;
    this.replayButton.onPress = () =>
      setScene(() => new FairytaleTapper(level));

    this.replayButton.text = "Play Again";

    this.nextButton = new EndScreenButton();
    this.nextButton.defaultWidth = this.cardWidth * 0.4;
    this.nextButton.defaultHeight = 100;
    this.nextButton.buttonX = width / 2 + buttonSpacing;
    this.nextButton.buttonY = height / 2 + this.cardHeight * 0.25;

    if (this.level < NUM_LEVELS) {
      this.nextButton.onPress = () =>
        setScene(() => new FairytaleTapper(level + 1));
      this.nextButton.text = "Next Level";
    } else {
      this.nextButton.onPress = () => setScene(() => new TitleScreen());
      this.nextButton.text = "Back to Home";
    }
  }

  drawBody() {
    super.drawBody(
      `You won! Your time: ${this.timeLeft}`,
      `Best time: ${this.highscore}`,
    );
  }

  drawButtons() {
    rectMode(CORNER);
    this.replayButton.draw();
    this.nextButton.draw();
  }
}

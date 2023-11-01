var targetButtons = [
  {
    text: "Fairytale Tapper",
    cb: () => {
      setScene(() => new FairytaleTapper());
    },
  },
  {
    text: "Monkey Bonanza",
    cb: () => {
      alert("not implemented");
    },
  },
  {
    text: "Gecko Climber",
    cb: () => {
      alert("not implemented");
    },
  },
];

class TitleScreen {
  frameRate = 10;

  constructor() {
    this.buttons = [];
    this.titleScreen = select("#titleScreen");
    this.titleScreen.style("display", "flex");
    for (const [i, val] of targetButtons.entries()) {
      this.buttons.push(
        buttonFactory(
          width / 2 - buttonWidth / 2,
          height / 2 -
            buttonHeight / 2 -
            buttonHeight * (targetButtons.length - 1) +
            (buttonHeight + buttonVerticalPadding) * i,
          val.text,
          val.cb,
        ),
      );
    }
  }

  draw() {
    background(255, 255, 255);
    scribble.scribbleEllipse(width / 2, 150, 255, 300);

    this.buttons.forEach((b) => {
      b.draw();
    });
  }

  destructor() {
    this.titleScreen.style("display", "none");
  }
}

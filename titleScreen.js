var foo = [
  {
    text: "Fairytale Tapper",
    cb: () => {
      setScene(new FairytaleTapper());
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
  constructor() {
    frameRate(3);
    this.buttons = [];
    for (const [i, val] of foo.entries()) {
      this.buttons.push(
        buttonFactory(
          width / 2 - buttonWidth / 2,
          height / 2 -
            buttonHeight / 2 -
            buttonHeight * (foo.length - 1) +
            (buttonHeight + buttonVerticalPadding) * i,
          val.text,
          val.cb,
        ),
      );
    }
  }

  draw() {
    background(255, 0, 0);
    // randomSeed(0)
    scribble.scribbleEllipse(width / 2, 150, width, 325);

    this.buttons.forEach((b) => {
      b.draw();
    });
  }
}

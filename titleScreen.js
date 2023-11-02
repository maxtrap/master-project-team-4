class TitleScreen {
  frameRate = 10;

  constructor() {
    this.titleScreen = select("#titleScreen");
    this.titleScreen.style("display", "flex");
  }

  draw() {
    background(255, 255, 255);
    scribble.scribbleEllipse(width / 2, 150, 255, 300);
  }

  destructor() {
    this.titleScreen.style("display", "none");
  }
}

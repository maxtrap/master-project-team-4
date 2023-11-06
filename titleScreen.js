class TitleScreen {
  frameRate = 10;

  constructor() {
    this.titleScreen = select("#titleScreen");
    this.titleScreen.style("display", "flex");
  }

  draw() {
    clear();
    fill(250, 235, 215);
    scribble.scribbleEllipse(width / 2, 150, 255, 300);
  }

  destructor() {
    this.titleScreen.style("display", "none");
  }
}

const GAME_LENGTH = 60;
const SCORE_GOAL = 20;

const RANDOM_INTERVAL_LOW = 1;
const RANDOM_INTERVAL_HIGH = 2;

const NUM_LEVELS = 3;
const TIMER_HEIGHT = 150;

//Soun effects
let SPARKLE_SOUND;
let ANGRY_UNICORN;
let EXPLOSION_SOUND;

//Creatures
let UNICORN_IMG;
let BUTTERFLY_RIGHT_GIF;
let BUTTERFLY_LEFT_GIF;
let DRAGON_RIGHT_GIF;
let DRAGON_LEFT_GIF;

//Death effects
let SPARKLES_GIF;
let EXPLOSION_GIF;

//Backdrops
let LEVEL1_BACKGROUND;
let LEVEL2_BACKGROUND;
let LEVEL3_BACKGROUND;

let SPARKLES_FRAME_COUNT;
let EXPLOSION_FRAME_COUNT;

function fairytalePreload() {
  SPARKLE_SOUND = loadSound("resources/sparkle.mp3", () =>
    console.log("loaded sparkle"),
  );
  EXPLOSION_SOUND = loadSound("resources/explosion.mp3", () =>
    console.log("loaded explosion"),
  );
  ANGRY_UNICORN = loadSound("resources/horse-neigh.mp3", () =>
    console.log("loaded horse neigh"),
  );

  UNICORN_IMG = loadImage("resources/unicorn.png", () =>
    console.log("loaded unicorn"),
  );
  BUTTERFLY_RIGHT_GIF = loadImage("resources/butterfly-right.gif", () =>
    console.log("loaded butterfly-right"),
  );
  BUTTERFLY_LEFT_GIF = loadImage("resources/butterfly-left.gif", () =>
    console.log("loaded butterfly-left"),
  );
  DRAGON_RIGHT_GIF = loadImage("resources/dragon-right.gif", () =>
    console.log("loaded dragon-right"),
  );
  DRAGON_LEFT_GIF = loadImage("resources/dragon-left.gif", () =>
    console.log("loaded dragon-left"),
  );

  SPARKLES_GIF = loadImage("resources/sparkles.gif", () => {
    console.log("loaded sparkles");
    initializeSparklesFrameCount();
  });
  EXPLOSION_GIF = loadImage("resources/explosion.gif", () => {
    console.log("loaded explosion");
    initializeExplosionFrameCount();
  });

  LEVEL1_BACKGROUND = loadImage("resources/magical-castle.jpg", () =>
    console.log("loaded magical-castle"),
  );
  LEVEL2_BACKGROUND = loadImage("resources/magical-forest.jpg", () =>
    console.log("loaded magical-forest"),
  );
  LEVEL3_BACKGROUND = loadImage("resources/haunted-castle.jpg", () =>
    console.log("loaded haunted-castle"),
  );
}

function initializeSparklesFrameCount() {
  SPARKLES_FRAME_COUNT = SPARKLES_GIF.numFrames();
}

function initializeExplosionFrameCount() {
  EXPLOSION_FRAME_COUNT = EXPLOSION_GIF.numFrames();
}

class FairytaleTapper {
  creatures = [];
  scoreFallingTexts = [];

  score = 0;
  time = GAME_LENGTH;
  isGameFinished = false;
  framesTillNextSecond = 0;

  constructor(level = 1) {
    this.generateCreatureAtRandomInterval();
    this.level = level;

    if (localStorage.getItem("ft_highscore" + level) === null) {
      localStorage.setItem("ft_highscore" + level, "99999");
    }

    cl_missables.push(this.onMiss.bind(this));
  }

  draw() {
    background(getBackground(this.level));
    this.drawScore();
    this.drawTimer();
    drawLevelIndicator(this.level);

    //Draws falling score texts. Its the little +1s that pop out from the score when you click
    for (let i = 0; i < this.scoreFallingTexts.length; i++) {
      let text = this.scoreFallingTexts[i];
      text.draw();
      if (text.isFaded()) {
        this.scoreFallingTexts.splice(i, 1);
        i--;
      }
    }

    //Draws all creatures. Removes them when necessary.
    for (let i = 0; i < this.creatures.length; i++) {
      let creature = this.creatures[i];
      if (creature.draw()) {
        this.creatures.splice(i, 1);
        i--;
      }
    }
  }

  drawScore() {
    let scoreString = `Score: ${this.score}/${SCORE_GOAL}`;
    textSize(64);

    push();
    strokeWeight(3);
    stroke(0);
    rectMode(CORNER);
    fill(secondaryShade + "c8")
    rect(-10, -10, textWidth(scoreString) + 55, 110, 0, 0, 20, 0);
    pop();

    fill(0);
    textAlign(LEFT);
    text(scoreString, 20, 70);
  }

  drawTimer() {
    this.framesTillNextSecond++;
    if (this.framesTillNextSecond >= 60) {
      this.time--;
      this.framesTillNextSecond = 0;
    }

    push();
    strokeWeight(3);
    stroke(0);
    fill(secondaryShade + "c8")
    rectMode(CENTER);
    rect(width / 2, 50, 262, TIMER_HEIGHT, 0, 0, 20, 20);
    pop();

    textSize(100);
    fill(0);
    textAlign(CENTER);

    text(timeFormatted(this.time), width / 2, 92);

    if (this.time <= 0) {
      this.loseGame();
    }
  }

  addScore() {
    this.score++;
    this.scoreFallingTexts.push(new ScoreFallingText("+1", color(0, 255, 0)));

    if (this.score >= SCORE_GOAL) {
      this.winGame();
    }
  }

  removeScore() {
    let scoreDiff = Math.min(this.score, 5);
    this.score -= scoreDiff;

    this.scoreFallingTexts.push(
      new ScoreFallingText(`-${scoreDiff}`, color(255, 0, 0)),
    );
  }

  onMiss() {
    ANGRY_UNICORN.play();
  }

  //0 = unicorn, 1 = butterfly, 2 = dragon
  addCreature(creatureNumber) {
    switch (creatureNumber) {
      case 0:
        this.creatures.push(
          new Unicorn(this.addScore.bind(this), this.removeCreature.bind(this)),
        );
        break;
      case 1:
        this.creatures.push(
          new Butterfly(
            this.addScore.bind(this),
            this.removeCreature.bind(this),
          ),
        );
        break;
      case 2:
        this.creatures.push(
          new Dragon(
            this.removeScore.bind(this),
            this.removeCreature.bind(this),
          ),
        );
        break;
    }
  }

  removeCreature(creature) {
    this.creatures = this.creatures.filter((ctr) => ctr != creature);
  }

  generateCreatureAtRandomInterval() {
    if (this.creatures.length <= 10 && pauseMenuDisplay() === "none") {
      this.addCreature(Math.floor(Math.random() * this.level));
    }
    // Generate a random time interval between 3 and 5 seconds (in milliseconds)
    const randomInterval =
      Math.random() * (RANDOM_INTERVAL_HIGH - RANDOM_INTERVAL_LOW) * 1000 +
      RANDOM_INTERVAL_LOW * 1000;

    if (!this.isGameFinished) {
      // Schedule the function to run again after the random interval
      setTimeout(
        this.generateCreatureAtRandomInterval.bind(this),
        randomInterval,
      );
    }
  }

  loseGame() {
    this.isGameFinished = true;
    setScene(() => new FairytaleLoseScreen(this.level, this.score));
  }

  winGame() {
    this.isGameFinished = true;
    setScene(() => new FairytaleWinScreen(this.level, GAME_LENGTH - this.time));
  }
}

function timeFormatted(timeInSeconds) {
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds % 60;
  let formattedSeconds = seconds.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  return `${minutes}:${formattedSeconds}`;
}

function getBackground(level) {
  switch (level) {
    case 1:
      return LEVEL1_BACKGROUND;
    case 2:
      return LEVEL2_BACKGROUND;
    case 3:
      return LEVEL3_BACKGROUND;
  }
}

class ScoreFallingText {
  constructor(content, color, x = 260, y = 80) {
    this.x = x;
    this.y = y;
    this.content = content;
    this.color = color;
    this.opacity = 255;
  }

  draw() {
    fill(this.color);
    textSize(64);
    textAlign(CENTER);
    text(this.content, this.x, this.y);

    this.update();
  }

  update() {
    this.y += 2; // Control the speed of the text drop
    this.opacity -= 4; // Control the fading speed
    this.color.setAlpha(this.opacity);
  }

  isFaded() {
    return this.opacity <= 0;
  }
}

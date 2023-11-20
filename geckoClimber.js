let TYPING_DATA;
let GECKO_IMAGE;
let BACKGROUND_LEVELONE;
let BACKGROUNDS = [];
let STRUCTURES = [];
let LEVEL_DIFFICULTY = ["LevelOne", "LevelTwo", "LevelThree"];
let FILL_COLOR = ["Green", "#1A6EDB", "Red"];

function geckoClimberPreload() {
  TYPING_DATA = loadTable("resources/charWordPhrase.csv", "csv", "header");
  GECKO_IMAGE = loadImage("resources/newGecko.gif");
  TREE = loadImage("resources/Rock.png");
  FLAG = loadImage("resources/Flag.png");
  BACKGROUND_LEVELONE = loadImage("resources/Forest.jpg");
  STRUCTURE_LEVELONE = loadImage("resources/Rock.png");
  BACKGROUND_LEVELTWO = loadImage("resources/Desert.jpg");
  STRUCTURE_LEVELTWO = loadImage("resources/Pyramids.png");
  BACKGROUND_LEVELTHREE = loadImage("resources/Wasteland.jpg");
  STRUCTURE_LEVELTHREE = loadImage("resources/volcano.png");
  BACKGROUND_MUSIC = loadSound("resources/jungleMusic.mp3");
  CORRECT_ANSWER = loadSound("resources/correctAnswer.mp3");
  INCORRECT_ANSWER = loadSound("resources/incorrectAnswer.mp3");
  BACKGROUNDS = [
    BACKGROUND_LEVELONE,
    BACKGROUND_LEVELTWO,
    BACKGROUND_LEVELTHREE,
  ];
  STRUCTURES = [STRUCTURE_LEVELONE, STRUCTURE_LEVELTWO, STRUCTURE_LEVELTHREE];
}

function getRandomBetween(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

class GeckoClimber {
  geckoMoveLocation1 = new geckoMovementLocation(1000, 600);
  geckoMoveLocation2 = new geckoMovementLocation(
    getRandomBetween(500, 800),
    560,
  );
  geckoMoveLocation3 = new geckoMovementLocation(
    getRandomBetween(500, 800),
    510,
  );
  geckoMoveLocation4 = new geckoMovementLocation(
    getRandomBetween(500, 800),
    440,
  );
  geckoMoveLocation5 = new geckoMovementLocation(
    getRandomBetween(500, 800),
    380,
  );
  geckoMoveLocation6 = new geckoMovementLocation(
    getRandomBetween(500, 800),
    310,
  );
  geckoMoveLocation7 = new geckoMovementLocation(
    getRandomBetween(500, 800),
    250,
  );
  geckoMoveLocation8 = new geckoMovementLocation(
    getRandomBetween(500, 800),
    150,
  );
  geckoMoveLocation9 = new geckoMovementLocation(700, 100);

  movementIndex = 0;
  moveLocationXPositions = [];
  moveLocationYPositions = [];

  input;
  category;
  toBeTyped = "";
  gecko;
  geckoX;
  geckoY;
  //Change BACK TO 0
  level = 0;
  startTime = millis();

  fromX = 0;
  fromY = 0;
  lerpDX = 0;
  lerpDY = 0;
  lerp = 1.0;
  borderRadius = 5;

  constructor() {
    BACKGROUND_MUSIC.loop();
    this.input = createInput();
    this.input.style("font-size", "30px");
    this.input.style("border-color", "white");
    this.input.position(windowWidth / 2.55, 700);
    this.input.size(400);
    textAlign(CENTER);
    textSize(25);

    this.processPreloads();
    this.toBeTyped = TYPING_DATA.getColumn(LEVEL_DIFFICULTY[this.level])[
      Math.floor(Math.random() * 26)
    ];

    this.moveLocationXPositions = [
      this.geckoMoveLocation1.xPosition,
      this.geckoMoveLocation2.xPosition,
      this.geckoMoveLocation3.xPosition,
      this.geckoMoveLocation4.xPosition,
      this.geckoMoveLocation5.xPosition,
      this.geckoMoveLocation6.xPosition,
      this.geckoMoveLocation7.xPosition,
      this.geckoMoveLocation8.xPosition,
      this.geckoMoveLocation9.xPosition,
    ];
    this.moveLocationYPositions = [
      this.geckoMoveLocation1.yPosition,
      this.geckoMoveLocation2.yPosition,
      this.geckoMoveLocation3.yPosition,
      this.geckoMoveLocation4.yPosition,
      this.geckoMoveLocation5.yPosition,
      this.geckoMoveLocation6.yPosition,
      this.geckoMoveLocation7.yPosition,
      this.geckoMoveLocation8.yPosition,
      this.geckoMoveLocation9.yPosition,
    ];

    this.geckoX = this.moveLocationXPositions[0];
    this.geckoY = this.moveLocationYPositions[0];
  }

  destructor() {
    this.input.remove();
  }

  // Check if CSV and Image is loaded: TEMPORARY
  processPreloads() {
    if (TYPING_DATA) {
      console.log("Data loaded");
    } else {
      console.log("CSV data not loaded.");
    }
    if (GECKO_IMAGE) {
      console.log("Image loaded");
    } else {
      console.log("Image not loaded");
    }
  }

  createGameBorders() {
    push();
    stroke(0);
    noFill();
    strokeWeight(30);
    rect(0, 0, width, height);
    strokeWeight(0);
    fill(FILL_COLOR[this.level]);
    rect(15, 15, 300, 150);
    noFill();
    strokeWeight(15);
    rect(0, 0, 315, 165, 30);
    pop();
  }

  draw() {
    // Setting up the game field
    background(BACKGROUNDS[this.level]);

    fill("white");
    textSize(40);
    this.typingSection();

    image(STRUCTURES[this.level], 280, 60, 900, 700);
    image(
      FLAG,
      this.geckoMoveLocation9.xPosition,
      this.geckoMoveLocation9.yPosition,
      100,
      100,
    );
    this.createGameBorders();
    fill("black");
    textSize(100);
    text(this.elapsedTime(), 150, 100);

    //Text that shows the user what to type and the border around the input box
    textSize(50);
    fill("white");
    text("Type: " + this.toBeTyped, this.input.x + this.input.width / 2, 680);
    fill("black");
    rect(
      this.input.x - this.borderRadius,
      this.input.y - this.borderRadius,
      this.input.width + 2 * this.borderRadius,
      this.input.height + 2 * this.borderRadius,
      this.borderRadius,
    );

    // Creating the gecko
    this.swayAmount = sin(frameCount * 0.1) * 10;
    this.gecko = image(
      GECKO_IMAGE,
      this.geckoX + this.swayAmount,
      this.geckoY,
      150,
      150,
    );

    //Check for nextLevel
    this.checkForNextLevel();
    this.checkForEndGame();

    // Gecko movement
    if (this.lerp < 1.0) {
      this.lerp = min(1.0, this.lerp + deltaTime / 1000);
      let eased = this.easeInOutQuad(this.lerp);
      this.geckoX = this.fromX + eased * this.lerpDX;
      this.geckoY = this.fromY + eased * this.lerpDY;
    }

    console.log(this.movementIndex);
  }

  typingSection() {
    // On ENTER Press
    if (keyCode == ENTER) {
      // ENTER and Input is correct
      if (
        this.input.value().toUpperCase() == this.toBeTyped.toUpperCase() &&
        keyCode == ENTER
      ) {
        CORRECT_ANSWER.play();
        keyCode = 0;
        this.toBeTyped = TYPING_DATA.getColumn(LEVEL_DIFFICULTY[this.level])[
          Math.floor(Math.random() * 26)
        ];

        this.movementIndex += 1;
        if (this.movementIndex > 8) {
          this.movementIndex = 8;
        }
        this.geckoSmoothMovement();
        // Test
      }
      // ENTER and Input is wrong
      if (
        this.input.value() != this.toBeTyped &&
        keyCode == ENTER &&
        keyIsDown(ENTER) == true
      ) {
        INCORRECT_ANSWER.play();
        keyCode = 0;
        this.movementIndex -= 1;
        if (this.movementIndex < 0) {
          this.movementIndex += 1;
        }
        this.geckoSmoothMovement();
      }
      // Erase typing section
      this.input.value("");
    }
  }

  geckoSmoothMovement() {
    // Allows smooth movement of the gecko to each of the designated locations

    this.fromX = this.geckoX;
    this.fromY = this.geckoY;
    this.lerp = 0.0;
    this.lerpDX = this.moveLocationXPositions[this.movementIndex] - this.fromX;
    this.lerpDY = this.moveLocationYPositions[this.movementIndex] - this.fromY;
  }

  elapsedTime() {
    let seconds = Math.floor(((millis() - this.startTime) % 60000) / 1000);
    let minutes = Math.floor((millis() - this.startTime) / 60000);

    // Thanks max
    let formattedSeconds = seconds.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

    return `${minutes}:${formattedSeconds}`;
  }

  checkForNextLevel() {
    //Initial Logic Check : this.geckoY <= this.geckoMoveLocation9.yPosition
    if (this.geckoY <= this.geckoMoveLocation9.yPosition) {
      this.movementIndex = 0;
      this.level++;
      this.geckoX = this.moveLocationXPositions[this.movementIndex];
      this.geckoY = this.moveLocationYPositions[this.movementIndex];
      this.toBeTyped = TYPING_DATA.getColumn(LEVEL_DIFFICULTY[this.level])[
        Math.floor(Math.random() * 26)
      ];
      console.log("Next Level");
    }
  }

  checkForEndGame() {
    if (this.level > 2) {
      this.input.remove();
      fill("Red");
      square(windowWidth / 3.05, 100, 600, 30);

      fill("Black");
      textAlign("CENTER");
      text("Congrats. You Win!", this.input.x + this.input.width / 2, 300);
      text(
        "Your Time: " + this.elapsedTime(),
        this.input.x + this.input.width / 2,
        500,
      );
    }
  }

  easeInOutQuad(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  }
}

class geckoMovementLocation {
  xPosition;
  yPosition;

  constructor(xValue, yValue) {
    this.xPosition = xValue;
    this.yPosition = yValue;
  }
}

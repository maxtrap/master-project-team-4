let TYPING_DATA;
let GECKO_IMAGE;
let TREE;
let BACKGROUND_LEVELONE;
let BACKGROUNDS = [];
let LEVEL_DIFFICULTY = ["LevelOne", "LevelTwo", "LevelThree"];


function geckoClimberPreload() {
    TYPING_DATA = loadTable("resources/charWordPhrase.csv", 'csv', 'header');
    GECKO_IMAGE = loadImage("resources/gecko.png");
    TREE = loadImage("resources/Rock.png");
    FLAG = loadImage("resources/Flag.png")
    BACKGROUND_LEVELONE = loadImage('resources/Forest.jpg');
    BACKGROUND_LEVELTWO = loadImage('resources/Desert.jpg');
    BACKGROUND_LEVELTHREE = loadImage('resources/Wasteland.jpg');
    BACKGROUNDS = [BACKGROUND_LEVELONE, BACKGROUND_LEVELTWO, BACKGROUND_LEVELTHREE];
}

function getRandomBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }

class GeckoClimber {

    geckoMoveLocation1 = new geckoMovementLocation(1000, 600);
    geckoMoveLocation2 = new geckoMovementLocation(getRandomBetween(950, 620), 560);
    geckoMoveLocation3 = new geckoMovementLocation(getRandomBetween(950, 620), 510);
    geckoMoveLocation4 = new geckoMovementLocation(getRandomBetween(950, 620), 440);
    geckoMoveLocation5 = new geckoMovementLocation(getRandomBetween(950, 620), 380);
    geckoMoveLocation6 = new geckoMovementLocation(getRandomBetween(950, 620), 310);
    geckoMoveLocation7 = new geckoMovementLocation(getRandomBetween(950, 620), 250);
    geckoMoveLocation8 = new geckoMovementLocation(getRandomBetween(950, 620), 150);
    geckoMoveLocation9 = new geckoMovementLocation(510, 40);

    
    movementIndex = 0;
    moveLocationXPositions = [];
    moveLocationYPositions = [];
    
    input;
    category;
    toBeTyped = ""
    gecko;
    geckoX;
    geckoY;
    swayAmount;
    level = 0;
    

    fromX = 0
    fromY = 0
    lerpDX = 0
    lerpDY = 0
    lerp = 1.0
    

    constructor() {
        this.input = createInput();
        this.input.style('font-size', '20px');
        this.input.position(windowWidth / 2.75, 700);
        this.input.size(400);
        textAlign(CENTER);
        textSize(25);

        this.processPreloads();
        this.toBeTyped = TYPING_DATA.getColumn(LEVEL_DIFFICULTY[this.level])[Math.floor(Math.random() * 26)];

        this.moveLocationXPositions = [this.geckoMoveLocation1.xPosition, this.geckoMoveLocation2.xPosition, this.geckoMoveLocation3.xPosition, this.geckoMoveLocation4.xPosition, this.geckoMoveLocation5.xPosition, this.geckoMoveLocation6.xPosition, this.geckoMoveLocation7.xPosition, this.geckoMoveLocation8.xPosition, this.geckoMoveLocation9.xPosition];
        this.moveLocationYPositions = [this.geckoMoveLocation1.yPosition, this.geckoMoveLocation2.yPosition, this.geckoMoveLocation3.yPosition, this.geckoMoveLocation4.yPosition, this.geckoMoveLocation5.yPosition, this.geckoMoveLocation6.yPosition, this.geckoMoveLocation7.yPosition, this.geckoMoveLocation8.yPosition, this.geckoMoveLocation9.yPosition];
        this.geckoX = this.moveLocationXPositions[0];
        this.geckoY = this.moveLocationYPositions[0];

    }

    // Check if CSV and Image is loaded: TEMPORARY
    processPreloads() {
        if (TYPING_DATA) {
            console.log('Data loaded')
        } else {
          console.log('CSV data not loaded.');
        } if (GECKO_IMAGE){
            console.log('Image loaded')
        } else {
            console.log('Image not loaded')
        }
    }

    draw() {
        // Setting up the game field
        background(BACKGROUNDS[this.level]);
        fill("white")
        textSize(40);

        this.typingSection();
        image(TREE, 280, 60, 900, 700);
        image(FLAG, this.geckoMoveLocation9.xPosition, this.geckoMoveLocation9.yPosition, 100, 100);
        
        text(this.toBeTyped, this.input.x + (this.input.width) / 2, 680);

        // Creating the gecko
        this.swayAmount = sin(frameCount * 0.1) * 10;
        this.gecko = image(GECKO_IMAGE, this.geckoX + this.swayAmount,this.geckoY, 150, 150);
        
        //Check for nextLevel
        this.checkForNextLevel();
        
        
        // Gecko movement
        if (this.lerp < 1.0) {
            this.lerp = min(1.0, this.lerp + (deltaTime / 1000))
            let eased = this.easeInOutQuad(this.lerp)
            this.geckoX = this.fromX + (eased * this.lerpDX)
            this.geckoY = this.fromY + (eased * this.lerpDY)
        }
    }

    typingSection() {
        // On ENTER Press
        if (keyCode == ENTER) {
            // ENTER and Input is correct
            if (this.input.value().toUpperCase() == this.toBeTyped.toUpperCase() && keyCode == ENTER) {
                keyCode = 0;
                this.score += 10;
                this.toBeTyped = TYPING_DATA.getColumn(LEVEL_DIFFICULTY[this.level])[Math.floor(Math.random() * 26)];
                this.movementIndex += 1;
                this.geckoSmoothMovement();
            }
            // ENTER and Input is wrong
            if (this.input.value() != this.toBeTyped && keyCode == ENTER && keyIsDown(ENTER) == true) {
                keyCode = 0;
                this.score -= 5;
                this.movementIndex -= 1;
                if (this.movementIndex < 0){
                    this.movementIndex += 1;
                }
                this.geckoSmoothMovement();
            }
            // Erase typing section
            this.input.value('');
        }
    }

    
    geckoSmoothMovement(){
        // Allows smooth movement of the gecko to each of the designated locations
        
        this.fromX = this.geckoX
        this.fromY = this.geckoY
        this.lerp = 0.0
        this.lerpDX = this.moveLocationXPositions[this.movementIndex] - this.fromX
        this.lerpDY = this.moveLocationYPositions[this.movementIndex] - this.fromY
    }

    geckoAnimation(){
    }

    checkForNextLevel(){
        if (this.geckoX == this.geckoMoveLocation9.xPosition && this.geckoY == this.geckoMoveLocation9.yPosition){
            this.level += 1;
            this.movementIndex = 0;
            this.geckoX = this.moveLocationXPositions[this.movementIndex];
            this.geckoY = this.moveLocationYPositions[this.movementIndex];
            this.toBeTyped = TYPING_DATA.getColumn(LEVEL_DIFFICULTY[this.level])[Math.floor(Math.random() * 26)];
        }
    }

    easeInOutQuad(x) {
        return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }
}

class geckoMovementLocation {
    xPosition;
    yPosition;

    constructor(xValue, yValue){
        this.xPosition = xValue;
        this.yPosition = yValue;
    }
    
}

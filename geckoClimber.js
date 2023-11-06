let TYPING_DATA;
let GECKO_IMAGE;
let TREE;

function geckoClimberPreload() {
    TYPING_DATA = loadTable("resources/charWordPhrase.csv", 'csv', 'header');
    GECKO_IMAGE = loadImage("resources/gecko.png");
    TREE = loadImage("resources/Tree.png");
    FLAG = loadImage("resources/Flag.png")
}

class GeckoClimber {


    // Locations the gecko will move to
    geckoMoveLocation1 = new geckoMovementLocation();
    geckoMoveLocation2 = new geckoMovementLocation();
    geckoMoveLocation3 = new geckoMovementLocation();
    
    index = 0;
    moveLocationXPositions = [];
    moveLocationYPositions = [];
    
    input;
    category;
    level;
    toBeTyped = ""
    score = 0;
    gecko;
    geckoX;
    geckoY;
    
    
    

    fromX = 0
    fromY = 0
    lerpDX = 0
    lerpDY = 0
    lerp = 1.0
    

    constructor() {
        this.level = "LevelOne";
        this.input = createInput();
        this.input.style('font-size', '20px');
        this.input.position(windowWidth / 2.75, 700);
        this.input.size(400);
        textAlign(CENTER);
        textSize(25);
        this.processPreloads();
        this.toBeTyped = TYPING_DATA.getColumn(this.level)[Math.floor(Math.random() * 26)];
        imageMode(CENTER);

        this.geckoMoveLocation1.setLocation(1000,500);
        this.geckoMoveLocation2.setLocation(400,300);
        this.geckoMoveLocation3.setLocation(600,100);
        this.moveLocationXPositions = [this.geckoMoveLocation1.xPosition, this.geckoMoveLocation2.xPosition, this.geckoMoveLocation3.xPosition];
        this.moveLocationYPositions = [this.geckoMoveLocation1.yPosition, this.geckoMoveLocation2.yPosition, this.geckoMoveLocation3.yPosition];
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
        background("white");
        fill("black")
        text(this.toBeTyped, this.input.x + (this.input.width) / 2, 680);
        this.typingSection();
        fill("green");
        text(this.score, this.input.x + (this.input.width) / 2, 20)
        image(FLAG, this.geckoMoveLocation3.xPosition, this.geckoMoveLocation3.yPosition, 100, 100)

        // Creating the gecko
        this.gecko = image(GECKO_IMAGE, this.geckoX,this.geckoY, 80, 80);
        // Creating the gecko locations to move towards
        //this.geckoMoveLocation1.createLocation();
        //this.geckoMoveLocation2.createLocation();
        //this.geckoMoveLocation3.createLocation();

        
        
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
                this.toBeTyped = TYPING_DATA.getColumn(this.level)[Math.floor(Math.random() * 26)];

                this.geckoSmoothMovement();
            }
            // ENTER and Input is wrong
            if (this.input.value() != this.toBeTyped && keyCode == ENTER && keyIsDown(ENTER) == true) {
                keyCode = 0;
                this.score -= 5;
            }
            // Erase typing section
            this.input.value('');
        }
    }

    
    geckoSmoothMovement(){
        // Allows smooth movement of the gecko to each of the designated locations
        this.index += 1;
        if (this.index > 3){
            this.index -= 1;
        }
        this.fromX = this.geckoX
        this.fromY = this.geckoY
        this.lerp = 0.0
        this.lerpDX = this.moveLocationXPositions[this.index] - this.fromX
        this.lerpDY = this.moveLocationYPositions[this.index] - this.fromY
    }

    easeInOutQuad(x) {
        return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }
}

class geckoMovementLocation {
    xPosition;
    yPosition;
    

    setLocation(xValue, yValue){
        this.xPosition = xValue;
        this.yPosition = yValue;
    }

    createLocation(){
        return ellipse(xPosition, yPosition, 50, 50)
    }
    

}

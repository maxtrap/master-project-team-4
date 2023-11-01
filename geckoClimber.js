let data;
let rows;
let columns;
function preload() {
    data = loadTable("resources/charWordPhrase.csv", 'csv', 'header');
    rows = data.getRows();
}

class GeckoClimber {
    input;
    category;
    level;
    toBeTyped = ""
    score = 0;
    gecko;
    geckoX = windowWidth / 1.5;
    geckoY = 500;
    

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
        this.processCSVData();
        this.toBeTyped = data.getColumn(this.level)[Math.floor(Math.random() * 26)];
    
        
    }


    processCSVData() {
        if (data) {
            console.log('Data loaded')
        } else {
          console.log('CSV data not loaded.');
        }
    }

    draw() {

        // Setting up the game field
        background("white");
        fill("black")
        text(this.toBeTyped, this.input.x + (this.input.width) / 2, 680);
        fill("green");
        
        //ellipse(this.input.x + (this.input.width) / 2, windowHeight / 2, 50, 50)
        this.gecko = ellipse(this.geckoX, this.geckoY, 50, 50)
        this.typingSection();
        text(this.score, this.input.x + (this.input.width) / 2, 20)
        
        // Gecko movement
        if (this.lerp < 1.0) {
            this.lerp = min(1.0, this.lerp + (deltaTime / 1000))
            let eased = this.easeInOutQuad(this.lerp)
            this.geckoX = this.fromX + (eased * this.lerpDX)
            this.geckoY = this.fromY + (eased * this.lerpDY)
        }
    }

    typingSection() {
        if (keyCode == ENTER) {
            if (this.input.value() == this.toBeTyped && keyCode == ENTER) {
                keyCode = 0;
                this.score += 10;
                this.toBeTyped = data.getColumn(this.level)[Math.floor(Math.random() * 26)];

                this.fromX = this.geckoX
                this.fromY = this.geckoY
                this.lerp = 0.0
                this.lerpDX = random(width) - this.fromX
                this.lerpDY = random(height) - this.fromY
            }
            if (this.input.value() != this.toBeTyped && keyCode == ENTER && keyIsDown(ENTER) == true) {
                keyCode = 0;
                this.score -= 5;
            }
            this.input.value('');


        }
    }

    easeInOutQuad(x) {
        return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }




}

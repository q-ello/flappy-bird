class Pipe {
    constructor({up, bottom}) {
        this.up = new PipePart(up)
        this.bottom = new PipePart(bottom)
        this.leftBorder = SIZE_OF_CANVAS[0]
        this.rightBorder = SIZE_OF_CANVAS[0] + SIZE_OF_PIPE[0]
        this.upBorder = up.y + up.height
        this.bottomBorder = bottom.y
        this.bird = up.game._bird
        this.pipes = up.game.pipes.pipes
        this._game = up.game
        this.speed = up.speed
    }

    update(){
        if (this.leftBorder <= this.bird.x + this.bird.width && this.rightBorder >= this.bird.x){
            if (this.upBorder >= this.bird.y || this.bottomBorder <= this.bird.y + SIZE_OF_BIRD[1]) {
                this._game.gameOver();
            }
            if (this.leftBorder - this.bird.x <= this.speed && this.leftBorder - this.bird.x >= 0) {
                this._game._score++;
                if (this._game._score % 10 === 0) {
                    this._game._speed += 0.5;
                    this._game.background.moving1.speed += 0.5;
                    this._game.background.moving2.speed += 0.5;
                    this.up.speed += 0.5;
                    this.bottom.speed += 0.5;
                    this.speed += 0.5;
                }
            }
        }
        this.leftBorder -= this.speed;
        this.rightBorder -= this.speed;
        if (this.rightBorder < 0) {
            this.pipes.shift();
        }
    }

    draw(){
        this.up.draw();
        this.bottom.draw();
    }
}

class PipePart extends Entity {
    constructor(params) {
        super(params)
    }

    draw() {
        super.draw();
        this.x -= this.speed;
    }
}
class StableBackground extends Entity {
    constructor(params) {
        super(params)
    }

    draw(){
        this._drawEngine.drawBG()
        super.draw()
    }
}

class MovingBackground extends Entity {
    constructor(params) {
        super(params)
        this.startX = params.x
    }

    draw(){
        super.draw()
        this.x -= this.speed;
        if (this.startX - this.x > SIZE_OF_CANVAS[0]) {
            this.x = this.startX;
        }
    }
}
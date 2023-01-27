class Bird extends Entity{
    constructor(params){
        super(params)
        this._flapSpeed = params.flapSpeed
        this._animationSpeed = 8
        this._physicsEngine = params.physicsEngine
        this.falling = true
    }

    update(delta){
        super.update(delta);

        this._physicsEngine.update(this, delta);

        if (this.y < 0) {
            this.y = 0;
        }

        if (this.y + this.height >= this._game.height) {
            this._game.gameOver();
        }
    }

    flap(){
        this.speed = -this._flapSpeed;
    }

    draw(){
        this._drawEngine.rotate(this);
        this._drawEngine.drawImage({
            spriteSheet: this._spriteSheet, 
            frame: {
                x: this._frames[this._frameIdx].x, 
                y: this._frames[this._frameIdx].y, 
                width: this._frames[this._frameIdx].width,
                height: this._frames[this._frameIdx].height,
            },
            x: 0,
            y: 0,
            width: this.width,
            height: this.height
        });
    }
}
class Entity {
constructor({x, y, width, height, frames, spriteSheet, drawEngine, game, speed}) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this._frames = frames
        this._spriteSheet = spriteSheet
        
        this._drawEngine = drawEngine
        this._game = game
        this.speed = speed
        this._frameIdx = 0
        this.falling = false
        this._animationSpeed = 1
        this._count = 0
    }

    update(delta){
        if (this._animationSpeed !== 1){
            this._count++;
            if (this._count !== this._animationSpeed) return;
        }
        this._frameIdx = Math.ceil(this._frameIdx + Math.ceil(delta)) % this._frames.length;
        this._count = 0;
    }

    draw(){
        this._drawEngine.drawImage({
            spriteSheet: this._spriteSheet, 
            frame: this._frames[this._frameIdx], 
            x: this.x, 
            y: this.y, 
            width: this.width, 
            height: this.height
        })
    }
}
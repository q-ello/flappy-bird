class DrawEngine {
    drawImage({spriteSheet, frame, x, y, width, height}){}
    clear(){}
    drawBG(){}
    drawScore(){}
}

class CanvasDrawEngine extends DrawEngine {
    constructor({canvas}){
        super(),
        this._canvas = canvas,
        this._context = canvas.getContext('2d')
    }

    rotate(entity){
        this._context.save();
        if (entity.speed < 0) {
            this._context.translate(entity.x, entity.y + entity.height);
            this._context.rotate(-45 * Math.PI / 180);
        }
        else if (entity.speed > 20 && entity.speed < 150) {
            this._context.translate(entity.x + entity.width / 2, entity.y);
            this._context.rotate(45 * Math.PI / 180);
        } else if (entity.speed >= 150) {
            this._context.translate(entity.x + entity.width, entity.y);
            this._context.rotate(90 * Math.PI / 180);
        }
        else {
            this._context.translate(entity.x, entity.y);
        }
    }

    drawImage({spriteSheet, frame, x, y, width, height}){
        super.drawImage({spriteSheet, frame, x, y, width, height});
        this._context.drawImage(spriteSheet, frame.x, frame.y, frame.width, frame.height, x, y, width, height);
        this._context.restore();
    }

    clear(){
        super.clear();
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    drawBG(){
        super.drawBG()
        this._context.fillStyle = '#66B2FF';
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }

    drawScore(font, x, y, align, text){
        super.drawScore();
        this._context.font = `${font}px "Press Start 2P"`;
        this._context.textAlign = align;
        this._context.fillStyle = '#FFF';
        this._context.fillText(text, x, y);
    }
}
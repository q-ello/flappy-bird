class Game {
    constructor(){
        this._score = 0,
        this._config = new Config(),
        this._canvas = document.getElementById(this._config.canvas.id),
        this._canvas.width = this._config.canvas.width,
        this._canvas.height = this._config.canvas.height,

        this.width = this._config.canvas.width,
        this.height = this._config.pipe.height,
        this._speed = this._config.speed,

        this._drawEngine = new CanvasDrawEngine({canvas: this._canvas}),
        this._physicsEngine = new PhysicsEngine({gravity: this._config.gravity}),
        this._resourceLoader = new ResourceLoader(),

        this._inputHandler = [
            new MouseInputHandler({
                left: ({x, y}) => {
                    this._bird.flap();
                }
            }), 
            new BackspaceInputHandler({
                Space: ({x, y}) => {
                    this._bird.flap();
                }
            })
        ]

        this.record = localStorage.getItem('record'),

        this.firstTime = true
    }

    async prepare(){
        this._spriteSheet = await this._resourceLoader.load({
            type: RESOURCE_TYPE.IMAGE,
            src: this._config.spriteSheet.src,
            width: this._config.spriteSheet.width,
            height: this._config.spriteSheet.height
        })
        this.background = {
            stable: new StableBackground({
                x: this._config.bg.stable.x, 
                y: this._config.bg.stable.y, 
                width: this._config.bg.stable.width, 
                height: this._config.bg.stable.height, 
                frames: this._config.bg.stable.frames, 
                spriteSheet: this._spriteSheet, 
                drawEngine: this._drawEngine, 
                game: this,
                speed: 0
            }),
            moving1: new MovingBackground({
                x: this._config.bg.moving.x,
                y: this._config.bg.moving.y,
                width: this._config.bg.moving.width,
                height: this._config.bg.moving.height,
                frames: this._config.bg.moving.frames,
                spriteSheet: this._spriteSheet,
                drawEngine: this._drawEngine,
                game: this,
                speed: this._speed,
            }),
            moving2: new MovingBackground({
                x: this._config.canvas.width,
                y: this._config.bg.moving.y,
                width: this._config.bg.moving.width,
                height: this._config.bg.moving.height,
                frames: this._config.bg.moving.frames,
                spriteSheet: this._spriteSheet,
                drawEngine: this._drawEngine,
                game: this,
                speed: this._speed
            })
        }

        this.background.stable.draw();
        this.background.moving1.draw();
        this._config.getReady.spriteSheet = this._spriteSheet;
        this._drawEngine.drawImage(this._config.getReady);
    }

    reset(){
        this._score = 0;
        this._bird = new Bird({
            x: this._config.bird.x,
            y: this._config.bird.y,
            width: this._config.bird.width,
            height: this._config.bird.height,
            frames: this._config.bird.frames,
            spriteSheet: this._spriteSheet,
            flapSpeed: this._config.bird.flapSpeed,
            physicsEngine: this._physicsEngine, 
            drawEngine: this._drawEngine, 
            game: this,
            speed: -this._config.bird.flapSpeed
        });

        this.pipes = {pipes: [], count: 0};
        this._speed = this._config.speed;
    }

    update(delta){
        this._bird.update(delta);
        if (this.pipes.pipes){
            this.pipes.pipes.forEach(pipe => {
                pipe.update();
            });
        }
        this.pipes.count += this._speed;
        if (this.pipes.count > this._config.pipe.width * 4) {
            const y = getNewPipe();
            const pipe = new Pipe ({
                up: {
                    x: this._canvas.width, 
                    y: y - this._config.pipe.height, 
                    width: this._config.pipe.width, 
                    height: this._config.pipe.height, 
                    frames: this._config.pipe.up.frames, 
                    spriteSheet: this._spriteSheet, 
                    drawEngine: this._drawEngine, 
                    game: this, 
                    speed: this._speed
                }, 
                bottom: {
                    x: this._canvas.width, 
                    y: y + HOLE, 
                    width: this._config.pipe.width, 
                    height: this._config.pipe.height, 
                    frames: this._config.pipe.bottom.frames, 
                    spriteSheet: this._spriteSheet, 
                    drawEngine: this._drawEngine, 
                    game: this, 
                    speed: this._speed
                },
            });
            this.pipes.pipes.push(pipe);
            this.pipes.count = 0;
        }
    }

    draw(){
        this.background.stable.draw();
        if (this.pipes.pipes){
            this.pipes.pipes.forEach(pipe => {
                pipe.draw();
            })
        }
        this.background.moving1.draw();
        this.background.moving2.draw();
        this._bird.draw();
        this._drawEngine.drawScore(this._config.scores.current.fontSize, this._canvas.width / 2, this._config.scores.current.y, 'center', this._score);
        if (this.record !== null) {
            this._drawEngine.drawScore(this._config.scores.best.fontSize, this._canvas.width / 2, this._config.scores.best.y, 'center', `Best score: ${this.record}`);
        }
    }

    _loop(){
        const now = Date.now();
        const delta = now - this._lastUpdate;
        
        this.update(delta/1000);

        if (this._playing){
            this._drawEngine.clear();
            this.draw();

            this._lastUpdate = now;
            requestAnimationFrame(this._loop.bind(this));
        }  
    }

    start(){
        this._playing = true;
        this._inputHandler.forEach(inHan => {
            inHan.subscribe();
        });
        this._lastUpdate = Date.now();
        this.reset();
        this._loop();
    }

    gameOver(){
        if (this.record === null || this.record < this._score) {
            localStorage.setItem('record', this._score);
            this.record = this._score;
        }
        this._playing = false;
        this._config.gameOver.spriteSheet = this._spriteSheet;
        this._drawEngine.drawImage(this._config.gameOver);

        const medal = {
            spriteSheet: this._spriteSheet,
            frame: {
                x: this._config.medals.gold.x,
                y: this._config.medals.gold.y,
                width: this._config.medals.width,
                height: this._config.medals.height
            },
            x: this._config.medals.x,
            y: this._config.medals.y,
            width: this._config.medals.width,
            height: this._config.medals.height,
        }

        if (this._score < 10) {
            medal.frame.x = this._config.medals.bronze.x;
            medal.frame.y = this._config.medals.bronze.y;
        } else if (this._score >= 10 && this._score < 20) {
            medal.frame.x = this._config.medals.silver.x;
            medal.frame.y = this._config.medals.silver.y;
        } else if (this._score >= 20 && this._score < 30) {
            medal.frame.x = this._config.medals.gold.x;
            medal.frame.y = this._config.medals.gold.y;
        } else {
            medal.frame.x = this._config.medals.platinum.x;
            medal.frame.y = this._config.medals.platinum.y;
        }

        this._drawEngine.drawImage(medal);
        this._canvas.addEventListener('click', (e) => {
            if (!this._playing) {
                const x = e.pageX - this._canvas.offsetLeft;
                const y = e.pageY - this._canvas.offsetTop;
                if (y >= this._config.buttonRestart.y && y <= this._config.buttonRestart.y + this._config.buttonRestart.height && x >= this._config.buttonRestart.x && x <= this._config.buttonRestart.width + this._config.buttonRestart.x){
                    this.start();
            }
            }
        });

        this._drawEngine.drawScore(this._config.scores.fontSize, this._canvas.width - this._config.scores.right, this._config.scores.currSmall, 'right', this._score);
        this._drawEngine.drawScore(this._config.scores.fontSize, this._canvas.width - this._config.scores.right, this._config.scores.bestSmall, 'right', this.record);
    }
}
const SIZE_OF_CANVAS = [Math.min((document.documentElement.clientWidth), 500), document.documentElement.clientHeight - 5];
const SIZE_OF_PIPE = [Math.floor((SIZE_OF_CANVAS[1] - 112) / 10 * 1.34), SIZE_OF_CANVAS[1] - 112];
const HOLE = SIZE_OF_PIPE[1] / 4;
const SIZE_OF_BIRD = [Math.floor(HOLE / 5 * 1.34), Math.floor(HOLE / 5)];

function getNewPipe(){
    return Math.floor(Math.random() * (SIZE_OF_PIPE[1] - 50 - HOLE)) + 25;
}

class Config{
    gravity = 1400

    speed = 3

    canvas = {
        id: 'canvas',
        width: SIZE_OF_CANVAS[0],
        height: SIZE_OF_CANVAS[1]
    }

    spriteSheet = {
        src: 'assets/sprite.png',
        width: 606,
        height: 428
    }

    bg = {
        stable: {
            x: 0,
            y: SIZE_OF_CANVAS[1] - 228,
            width: SIZE_OF_CANVAS[0],
            height: 228,

            frames: [{
                x: 0,
                y: 0,
                width: 276,
                height: 228,
            }]
        },
        moving: {
            x: 0,
            y: SIZE_OF_CANVAS[1] - 112,
            width: SIZE_OF_CANVAS[0],
            height: 112,

            frames: [{
                x: 276,
                y: 0,
                width: 224,
                height: 112
            }]
        }
    }

    bird = {
        x: SIZE_OF_CANVAS[0] / 2 - SIZE_OF_BIRD[0] / 2,
        y: SIZE_OF_PIPE[1] / 2 - SIZE_OF_BIRD[1] / 2,
        width: SIZE_OF_BIRD[0],
        height: SIZE_OF_BIRD[1],

        flapSpeed: Math.sqrt(HOLE * this.gravity),

        frames: [{
            x: 277,
            y: 112,
            width: 35,
            height: 26
        },
        {
            x: 277,
            y: 139,
            width: 35,
            height: 26
        },
        {
            x: 277,
            y: 165,
            width: 35,
            height: 26
        },
        {
            x: 277,
            y: 139,
            width: 35,
            height: 26
        }],
    }

    pipe = {
        width: SIZE_OF_PIPE[0],
        height: SIZE_OF_PIPE[1],
        up: {
            frames: [{
                x: 554,
                y: 0,
                width: 52,
                height: 399
            }]
        },

        bottom: {
            frames: [{
                x: 502,
                y: 0,
                width: 52,
                height: 399
            }]
        }
    }

    getReady = {
        frame: {
            x: 0,
            y: 228,
            width: 173,
            height: 153
        }, 
        x: SIZE_OF_CANVAS[0] / 2 - 173 / 2, 
        y: SIZE_OF_CANVAS[1] / 2 - 110, 
        width: 173, 
        height: 153
    }

    gameOver = {
        frame: {
            x: 174,
            y: 228,
            width: 226,
            height: 201
        },
        x: SIZE_OF_CANVAS[0] / 2 - 226 / 2,
        y: SIZE_OF_CANVAS[1] / 2 - 201 / 2,
        width: 226,
        height: 201
    }

    buttonRestart = {
        x: 210,
        y: 426,
        width: 82,
        height: 30
    }

    medals = {
        x: 162,
        y: 340,
        width: 46,
        height: 46,

        bronze: {
            x: 360,
            y: 158
        },

        silver: {
            x: 360,
            y: 112
        },

        gold: {
            x: 311,
            y: 158
        },

        platinum: {
            x: 311,
            y: 112
        }
    }

    scores = {
        current: {
            y: 100,
            fontSize: 30
        },
        best: {
            y: 150,
            fontSize: 10
        },
        currSmall: 350,
        bestSmall: 390,

        right: 158,
        fontSize: 15
    }
}

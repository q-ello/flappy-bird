class InputHandler {
    eventHandlerMap = {}

    constructor(eventHandlerConfig){
        this._eventHandlerConfig = eventHandlerConfig
    }

    subscribe(){
        Object.entries(this.eventHandlerMap).forEach(([name, handler]) => {
            document.addEventListener(name, handler);
        });
    }
}

class MouseInputHandler extends InputHandler {
    buttonIndexNameMap = {
        0: 'left',
        1: 'wheel',
        2: 'right'
    }

    eventHandlerMap = {
        click: (event) => {
            const buttonName = this.buttonIndexNameMap[event.button];
            const handler = this._eventHandlerConfig[buttonName];
            if (handler) {
                handler(event);
            }
        }
    }
}

class BackspaceInputHandler extends InputHandler {
    keyMap = {
        32: 'Space'
    }
    
    eventHandlerMap = {
        keydown: (event) => {
            const key = this.keyMap[event.keyCode];
            const handler = this._eventHandlerConfig[key];
            if (handler) {
                handler(event);
            }
        }
    }
}
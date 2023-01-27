const game = new Game();
game.prepare().then(() => {
    document.addEventListener('click', () => {
        if (game.firstTime) {
            game.start();
            game.firstTime = false;
        }
    });

    document.addEventListener('keydown', (event) => {
        if (!game._playing) {
            if (event.key === ' ') {
                if (game.firstTime) {
                    game.firstTime = false;
                }
                game.start();
            }
        }
    });
});


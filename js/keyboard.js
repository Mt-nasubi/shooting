// keyboard.js

let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;
let spacePressed = false;

document.addEventListener('keydown', e => {
    if (e.code === 'ArrowLeft') leftPressed = true;
    if (e.code === 'ArrowRight') rightPressed = true;
    if (e.code === 'ArrowUp') upPressed = true;
    if (e.code === 'ArrowDown') downPressed = true;
    if (e.code === 'Space') spacePressed = true;

    // スペースでゲーム開始または再スタート
    if (e.code === 'Space' && (gameOver || !gameStarted)) {
        resetGame();
    }

    // Qキーで終了（ゲーム停止と初期化）
    if (e.code === 'KeyQ') {
        gameStarted = false;
        gameOver = false;
        mainBgm.pause();
        mainBgm.currentTime = 0;
        enemies.length = 0;
        healItems.length = 0;
        addItems.length = 0;
        playerAttacks.length = 0;
        enemyAttacks.length = 0;
        player.hp = 3;
        player.stock = 10;
    }
});

document.addEventListener('keyup', e => {
    if (e.code === 'ArrowLeft') leftPressed = false;
    if (e.code === 'ArrowRight') rightPressed = false;
    if (e.code === 'ArrowUp') upPressed = false;
    if (e.code === 'ArrowDown') downPressed = false;
    if (e.code === 'Space') spacePressed = false;
});

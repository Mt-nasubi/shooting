// main.js

// キャンバス描写
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 各フラグ
let gameStarted = false;
let gameOver = false;
let enemiesSpawned = false;
let alienSpawned = false;
let ufoSpawned = false;
let intervalId = null;
let gameOverSoundPlayed = false;

// 背景のずれ量
let bgY = 0;

// ショット制御
let lastShotTime = 0;
let shotInterval = 100;

// スコア
let score = 0;

// キャラクター変数・配列
const player = new Player(canvas.width / 2 - 20, canvas.height - 70, 8);
let enemies = [];
let playerAttacks = [];
let enemyAttacks = [];
let healItems = [];
let addItems = [];



// メインゲームループ
function gameLoop(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 背景スクロール
    drawBackground(ctx, canvas);

    // ゲーム未開始画面
    if (!gameStarted) {
        ctx.fillStyle = 'white';
        ctx.font = '32px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Press SPACE to Start', canvas.width / 2, canvas.height / 2);
        requestAnimationFrame(gameLoop);
        return;
    }

    // 敵生成開始
    /*
    if (gameStarted && !enemiesSpawned) {
        intervalId = setInterval(spawnEnemyRandom, 500);
        enemiesSpawned = true;
    }*/
    stage1(timestamp);


    // ゲームオーバー画面
    if (gameOver) {
        // 背景を暗く
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'red';
        ctx.font = '48px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);

        ctx.fillStyle = 'white';
        ctx.font = '24px sans-serif';
        ctx.fillText('Press SPACE to Continue', canvas.width / 2, canvas.height / 2 + 30);

        ctx.fillStyle = 'white';
        ctx.font = "32px 'DotGothic16'";
        ctx.fillText("SCORE :", canvas.width / 2 - 30, canvas.height / 2 + 100);
        ctx.textAlign = 'left';
        ctx.fillText(` ${score}`, canvas.width / 2 + 30, canvas.height / 2 + 100);
        
        if (!gameOverSoundPlayed) {
            gameOverSound.play();
            gameOverSoundPlayed = true;
        }

        requestAnimationFrame(gameLoop);
        return;
    }

    // プレイヤー移動
    if (leftPressed) player.x -= player.speed;
    if (rightPressed) player.x += player.speed;
    if (upPressed) player.y -= player.speed;
    if (downPressed) player.y += player.speed;

    // playerの移動可能領域指定
    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));

    // 発射（連射制限＋弾薬消費）
    if (gameStarted && spacePressed && timestamp - lastShotTime > shotInterval && player.stock > 0) {
        playBulletSound(); 
        player.attack();
        player.stock--;
        lastShotTime = timestamp;
    }

    // プレイヤー描画
    player.draw(ctx);

    // 敵更新・描画
    updateAndDrawEnemies(ctx);

    // プレイヤー攻撃描画
    updateAndDrawPlayerAttacks(ctx);

    // 敵攻撃描画
    updateAndDrawEnemyAttacks(ctx);

    // 回復アイテム描画
    updateAndDrawHealItems(ctx);

    // 弾補充アイテム描画
    updateAndDrawAddItems(ctx);

    // 衝突判定
    checkCollisions();

    // 弾数表示
    ctx.textAlign = 'left';
    ctx.fillStyle = 'white';
    ctx.font = '20px sans-serif';
    ctx.fillText('🔫', 10, 45);
    ctx.font = '14px sans-serif';
    ctx.fillText('×', 35, 47);
    ctx.font = '20px sans-serif';
    ctx.fillText(player.stock, 52, 45);

    // HP表示
    ctx.font = '25px sans-serif';
    for (let i = 0; i < player.hp; i++) {
        ctx.fillStyle = 'red';
        ctx.fillText('❤', 10 + i * 23, 22);
    }

    // 撃破数表示
    ctx.fillStyle = 'white';
    ctx.font = '20px sans-serif';
    ctx.fillText('SCORE : ', 10, 70);
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(score, 90, 70);

    requestAnimationFrame(gameLoop);
}

// メイン処理
bgImg.onload = () => {
    requestAnimationFrame(gameLoop);
};

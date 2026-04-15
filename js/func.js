// func.js

// ---canvas処理関係---
// ゲームリセット
function resetGame() {
    gameStarted = true;
    gameOver = false;
    enemiesSpawned = false;
    gameOverSoundPlayed = false;
    lastShotTime = performance.now();  // 発射間隔をリセットして即発射を防ぐ
    mainBgm.play();
    mainBgm.volume = 0.2;
    startTime = performance.now();
    spawnedKeys.clear();
    player.hp = player.maxHp;
    player.stock = 10;
    score = 0;
    playerAttacks.length = 0;
    enemyAttacks.length = 0;
    enemies.length = 0;
    healItems.length = 0;
    addItems.length = 0;
    player.x = canvas.width / 2 - player.width / 2;
    player.y = canvas.height - player.height - 10;

    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

// スタート画面に戻る
function backToStart() {
    gameStarted = false;
    gameOver = false;
    enemiesSpawned = false;
    alienSpawned = false;
    ufoSpawned = false;
    gameOverSoundPlayed = false;

    startTime = 0;
    bgY = 0;
    lastShotTime = 0;
    score = 0;

    mainBgm.pause();
    mainBgm.currentTime = 0;
    spawnedKeys.clear();

    enemies.length = 0;
    healItems.length = 0;
    addItems.length = 0;
    playerAttacks.length = 0;
    enemyAttacks.length = 0;

    player.hp = player.maxHp;
    player.stock = 10;

    player.x = canvas.width / 2 - player.width / 2;
    player.y = canvas.height - player.height - 10;

    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}



// 背景スクロール
function drawBackground(ctx, canvas) {
    bgY += 2; // スクロール速度(bgY = 背景画像のずれ量)
    bgY = bgY % canvas.height;

    // 上段
    ctx.drawImage(bgImg, 0, bgY - canvas.height, canvas.width, canvas.height);
    // 下段
    ctx.drawImage(bgImg, 0, bgY, canvas.width, canvas.height);
}


// ---オブジェクト判定関数---
// canvas外判定（完全にキャンバス外なら true）

function isOutOfCanvas(obj) {
    return (
        obj.x + obj.width < 0 ||
        obj.x > canvas.width ||
        obj.y + obj.height < 0 ||
        obj.y > canvas.height
    );
}


// プレイヤー検知
function playerDetection(enemy, rangeX, rangeY) {
    const dx = Math.abs(player.x - enemy.x);
    const dy = Math.abs(player.y - enemy.y);

    if (dx <= rangeX && dy <= rangeY) {
        return {
            px: player.x,
            py: player.y
        };
    }
    return null;
}

// 
function addScore(enemy) {
    return enemy.points;
}

// 衝突判定ユーティリティ
function isColliding(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

// 各種衝突判定
function checkCollisions() {
    // プレイヤー攻撃と敵の衝突判定
    for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        for (let j = playerAttacks.length - 1; j >= 0; j--) {
            const a = playerAttacks[j];
            if (isColliding(a, e)) {
                playerAttacks.splice(j, 1);
                e.hp -= 1;
                if (e.hp <= 0) {
                    e.isDead = true;  
                }
                playDownSound();
            }
        }
    }

    // プレイヤーと敵の衝突判定
    for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        if (isColliding(player, e)) {
            player.hp--;
            enemies.splice(i, 1);
            if (player.hp <= 0) gameOver = true;
        }
    }

    // プレイヤーと回復アイテムの衝突判定
    for (let i = healItems.length - 1; i >= 0; i--) {
        const h = healItems[i];
        if (isColliding(player, h)) {
            healItems.splice(i, 1);
            if (player.hp >= player.maxHp) continue;
            player.hp += h.healpoints;
        }
    }

    // プレイヤーと弾補充アイテムの衝突判定
    for (let i = addItems.length - 1; i >= 0; i--) {
        const a = addItems[i];
        if (isColliding(player, a)) {
            addItems.splice(i, 1);
            player.stock += a.addpoints;
        }
    }

    // 敵攻撃とプレイヤーの衝突判定
    for (let i = enemyAttacks.length - 1; i >= 0; i--) {
        const a = enemyAttacks[i];
        if (isColliding(player, a)) {
            enemyAttacks.splice(i, 1);
            player.hp--;
            if (player.hp <= 0) gameOver = true;
        }
    }
}

// ---描写に関する関数---

// 敵更新・描画
function updateAndDrawEnemies(ctx) {
    for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        if (e.isDead) {
            e.update();  // 爆発アニメ更新
            e.draw(ctx); // 爆発描画
            if (e.isExplosionFinished()) {
                enemies.splice(i, 1);
                score += addScore(e);
            }
        } else {
            e.update();  // 通常更新
            e.draw(ctx); // 通常描画
            if (isOutOfCanvas(e)) {
                enemies.splice(i, 1);
            }
        }
    }
}


// プレイヤー攻撃描写・更新
function updateAndDrawPlayerAttacks(ctx) {
    for (let i = playerAttacks.length - 1; i >= 0; i--) {
        const a = playerAttacks[i];
        a.update();
        a.draw(ctx);
        if (isOutOfCanvas(a) || (a.isDead === true)) {
            playerAttacks.splice(i, 1);
        }
    }
}

// 敵攻撃描写・更新
function updateAndDrawEnemyAttacks(ctx) {
    for (let i = enemyAttacks.length - 1; i >= 0; i--) {
        const a = enemyAttacks[i];
        a.update();
        a.draw(ctx);
        if (isOutOfCanvas(a) || (a.isDead === true)) {
            enemyAttacks.splice(i, 1);
        }
    }
}

// 回復アイテム描写・更新
function updateAndDrawHealItems(ctx) {
    for (let i = healItems.length - 1; i >= 0; i--) {
        const h = healItems[i];
        h.update();
        h.draw(ctx);
        if (isOutOfCanvas(h)) {
            healItems.splice(i, 1);
        }
    }
}

// 弾補充アイテム描写・更新
function updateAndDrawAddItems(ctx) {
    for (let i = addItems.length - 1; i >= 0; i--) {
        const a = addItems[i];
        a.update();
        a.draw(ctx);
        if (isOutOfCanvas(a)) {
            addItems.splice(i, 1);
        }
    }
}







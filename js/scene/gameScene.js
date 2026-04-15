import { bulletImg } from "../assets/image.js";
import { startTime, gameOver, score } from "../core/gameState.js";
import { leftPressed, rightPressed, upPressed, downPressed, spacePressed } from "../core/keyboard.js";
import { drawBackground } from "../render/background.js";
import { stage1 } from "../stage/stage1.js";
import { checkCollisions } from "../system/collision.js";
import { updateAndDrawEnemies, 
        updateAndDrawEnemyAttacks, 
        updateAndDrawPlayerAttacks, 
        updateAndDrawAddItems, 
        updateAndDrawHealItems 
    } from "../system/updater.js";
import { SCENE_GAME_OVER, SCENE_TITLE, setCurrentScene } from "./sceneManager.js";

export function updateGameScene(timestamp, player, canvas) {
    const elapsed = timestamp - startTime;

    stage1(elapsed, canvas);

    player.update();

    if (leftPressed) player.x -= player.speed;
    if (rightPressed) player.x += player.speed;
    if (upPressed) player.y -= player.speed;
    if (downPressed) player.y += player.speed;

    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));

    if (spacePressed) {
        player.attack();
    }

    checkCollisions();

    if (gameOver) {
        setCurrentScene(SCENE_GAME_OVER);
    }
}

function drawHud(ctx, player) {
    ctx.save();

    ctx.textAlign = "left";
    ctx.font = "22px 'DotGothic16', sans-serif";

    // === HP表示 ===
    ctx.fillStyle = "red";

    let hpText = "HP: ";
    for (let i = 0; i < player.hp; i++) {
        hpText += "❤";
    }

    ctx.fillText(hpText, 20, 35);

    // === 弾数表示 ===
    const size = 24;

    if (bulletImg.complete) {
        ctx.drawImage(bulletImg, 26, 48, size, size
        );
    }

    if (player.stock === 0) {
        ctx.fillStyle = "red";
    } else {
        ctx.fillStyle = "white";
    }
    ctx.fillText(`× ${player.stock}`, 22 + size + 10, 68);

    // === スコア表示 ===
    ctx.font = "22px 'DotGothic16', sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText(`SCORE: `, 20, 102);
    ctx.fillStyle = "yellow";
    ctx.fillText(`${score}`, 100, 102);

    ctx.restore();
}

export function drawGameScene(ctx, canvas, player) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground(ctx, canvas);

    updateAndDrawEnemies(ctx, canvas);
    updateAndDrawPlayerAttacks(ctx, canvas);
    updateAndDrawEnemyAttacks(ctx, canvas);
    updateAndDrawHealItems(ctx, canvas);
    updateAndDrawAddItems(ctx, canvas);

    player.draw(ctx);
    drawHud(ctx, player);
}

export function onGameSceneKeyDown(e) {
    if (e.code === "KeyQ") {
        setCurrentScene(SCENE_TITLE);
    }
}
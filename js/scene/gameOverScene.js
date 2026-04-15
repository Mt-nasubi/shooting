import { drawBackground } from "../render/background.js";
import { score, resetState } from "../core/gameState.js";
import { SCENE_GAME, SCENE_TITLE, setCurrentScene } from "./sceneManager.js";

export function updateGameOverScene() {
    // 必要ならここに更新処理
}

export function drawGameOverScene(ctx, canvas) {

    drawBackground(ctx, canvas);

    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = "center";

    ctx.fillStyle = "red";
    ctx.font = "90px sans-serif";
    ctx.fillText("GAME OVER", canvas.width / 2, 150);

    const panelW = 320;
    const panelH = 90;
    const panelX = canvas.width / 2 - panelW / 2;
    const panelY = canvas.height / 2 - panelH / 2 - 30;


    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(panelX, panelY, panelW, panelH);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.strokeRect(panelX, panelY, panelW, panelH);

    ctx.fillStyle = "yellow";
    ctx.font = "42px sans-serif";
    ctx.fillText(`Score: ${score}`, canvas.width / 2, panelY + 60);

    ctx.fillStyle = "white";
    ctx.font = "24px sans-serif";
    ctx.fillText("Press R to Restart", canvas.width / 2, 400);
    ctx.fillText("Press T to Title", canvas.width / 2, 450);
}

export function onGameOverSceneKeyDown(e) {
    if (e.code === "KeyR") {
        resetState();
        setCurrentScene(SCENE_GAME);
    }

    if (e.code === "KeyT") {
        setCurrentScene(SCENE_TITLE);
    }
}
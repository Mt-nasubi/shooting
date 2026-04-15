import { resetState } from "../core/gameState.js";
import { SCENE_GAME, setCurrentScene } from "./sceneManager.js";

export function updateTitleScene() {
    // 更新処理が必要ならここ
}

export function drawTitleScene(ctx, canvas) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    ctx.font = "64px sans-serif";
    ctx.fillText("SPACE SHOOTING", canvas.width / 2, 180);

    ctx.font = "28px sans-serif";
    ctx.fillText("Press Enter to Start", canvas.width / 2, 300);

    ctx.font = "20px sans-serif";
    ctx.fillText("Arrow Keys: Move / Space: Shot", canvas.width / 2, 360);
}

export function onTitleSceneKeyDown(e) {
    if (e.code === "Enter") {
        resetState();
        setCurrentScene(SCENE_GAME);
    }
}
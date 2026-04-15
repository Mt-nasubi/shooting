import { resetState } from "../core/gameState.js";
import { SCENE_GAME, setCurrentScene } from "./sceneManager.js";

export function updateTitleScene() {
    // 更新処理が必要ならここ
}

export function drawTitleScene(ctx, canvas) {
    // 背景（ほんのり暗めグラデ）
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, "#111");
    grad.addColorStop(1, "#000");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = "center";

    // タイトル（太く＋間隔広め）
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 64px sans-serif";
    ctx.shadowColor = "white";
    ctx.shadowBlur = 20;
    ctx.fillText("SPACE SHOOTING", canvas.width / 2, 180);
    ctx.shadowBlur = 0;

    // サブテキスト（少し薄く）
    ctx.fillStyle = "#cccccc";
    ctx.font = "28px sans-serif";
    ctx.fillText("Press Enter to Start", canvas.width / 2, 300);

    // 操作説明（さらに薄く＋小さめ）
    ctx.fillStyle = "#888888";
    ctx.font = "18px sans-serif";
    ctx.fillText("Move : ↑ ↓ ← →", canvas.width / 2, 360);
    ctx.fillText("Shot : Space", canvas.width / 2, 390);
}

export function onTitleSceneKeyDown(e) {
    if (e.code === "Enter") {
        resetState();
        setCurrentScene(SCENE_GAME);
    }
}
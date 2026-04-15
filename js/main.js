import { Player } from "./entities/player.js";
import { setPlayer } from "./core/gameState.js";
import { getCurrentScene, SCENE_TITLE, SCENE_GAME, SCENE_GAME_OVER } from "./scene/sceneManager.js";
import { updateTitleScene, drawTitleScene, onTitleSceneKeyDown } from "./scene/titleScene.js";
import { updateGameScene, drawGameScene, onGameSceneKeyDown } from "./scene/gameScene.js";
import { updateGameOverScene, drawGameOverScene, onGameOverSceneKeyDown } from "./scene/gameOverScene.js";

export const canvas = document.getElementById("gameCanvas");
export const ctx = canvas.getContext("2d");

const player = new Player(canvas.width / 2 - 20, canvas.height - 70, 8);
setPlayer(player);

document.addEventListener("keydown", (e) => {
    const scene = getCurrentScene();

    if (scene === SCENE_TITLE) {
        onTitleSceneKeyDown(e);
    } else if (scene === SCENE_GAME) {
        onGameSceneKeyDown(e);
    } else if (scene === SCENE_GAME_OVER) {
        onGameOverSceneKeyDown(e);
    }
});

function gameLoop(timestamp) {
    const scene = getCurrentScene();

    if (scene === SCENE_TITLE) {
        updateTitleScene();
        drawTitleScene(ctx, canvas);
    } else if (scene === SCENE_GAME) {
        updateGameScene(timestamp, player, canvas, ctx);
        drawGameScene(ctx, canvas, player);
    } else if (scene === SCENE_GAME_OVER) {
        updateGameOverScene();
        drawGameOverScene(ctx, canvas);
    }

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
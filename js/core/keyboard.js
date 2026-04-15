import { resetState } from "./gameState.js";
import {
    getCurrentScene,
    setCurrentScene,
    SCENE_TITLE,
    SCENE_GAME,
    SCENE_GAME_OVER
} from "../scene/sceneManager.js";

// キー状態
export let leftPressed = false;
export let rightPressed = false;
export let upPressed = false;
export let downPressed = false;
export let spacePressed = false;

document.addEventListener("keydown", (e) => {
    const currentScene = getCurrentScene();

    if (e.code === "ArrowLeft") leftPressed = true;
    if (e.code === "ArrowRight") rightPressed = true;
    if (e.code === "ArrowUp") upPressed = true;
    if (e.code === "ArrowDown") downPressed = true;
    if (e.code === "Space") spacePressed = true;

    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Space"].includes(e.code)) {
        e.preventDefault();
    }

    // タイトル画面 → ゲーム開始
    if (currentScene === SCENE_TITLE && e.code === "Enter") {
        resetState();
        setCurrentScene(SCENE_GAME);
    }

    // ゲーム中 → タイトルへ戻る
    if (currentScene === SCENE_GAME && e.code === "KeyQ") {
        setCurrentScene(SCENE_TITLE);
    }

    // ゲームオーバー画面 → 再スタート
    if (currentScene === SCENE_GAME_OVER && e.code === "KeyR") {
        resetState();
        setCurrentScene(SCENE_GAME);
    }

    // ゲームオーバー画面 → タイトルへ戻る
    if (currentScene === SCENE_GAME_OVER && e.code === "KeyT") {
        setCurrentScene(SCENE_TITLE);
    }
});

document.addEventListener("keyup", (e) => {
    if (e.code === "ArrowLeft") leftPressed = false;
    if (e.code === "ArrowRight") rightPressed = false;
    if (e.code === "ArrowUp") upPressed = false;
    if (e.code === "ArrowDown") downPressed = false;
    if (e.code === "Space") spacePressed = false;
});
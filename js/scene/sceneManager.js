// js/scene/sceneManager.js

import { gameBgm1, gameOverSound } from "../assets/sound.js";

export const SCENE_TITLE = "title";
export const SCENE_GAME = "game";
export const SCENE_GAME_OVER = "gameOver";

let currentScene = SCENE_TITLE;

export function getCurrentScene() {
    return currentScene;
}

export function setCurrentScene(scene) {
    if (currentScene === scene) return;

    currentScene = scene;

    if (scene === SCENE_GAME) {
        gameOverSound.pause();
        gameOverSound.currentTime = 0;

        gameBgm1.currentTime = 0;
        gameBgm1.play();
    } else if (scene === SCENE_GAME_OVER) {
        gameBgm1.pause();
        gameBgm1.currentTime = 0;

        gameOverSound.currentTime = 0;
        gameOverSound.play();
    } else {
        gameBgm1.pause();
        gameBgm1.currentTime = 0;

        gameOverSound.pause();
        gameOverSound.currentTime = 0;
    }
}
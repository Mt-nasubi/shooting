// js/core/gameState.js

// ===== 状態 =====
export let gameStarted = false;
export let gameOver = false;
export let score = 0;

// ===== 配列 =====
export let enemies = [];
export let playerAttacks = [];
export let enemyAttacks = [];
export let healItems = [];
export let addItems = [];

// ===== スポーン管理 =====
export let spawnedKeys = new Set();

// ===== 時間 =====
export let startTime = 0;
export let lastShotTime = 0;

// ===== プレイヤー =====
export let player = null;

// ===== set関数 =====
export function setPlayer(p) {
    player = p;
}

// ===== スコアの加算 =====
export function addScore(value) {
    score += value;
}

// ===== リセット（状態だけ） =====
export function resetState() {
    gameOver = false;
    score = 0;

    startTime = performance.now();
    lastShotTime = performance.now();

    spawnedKeys.clear();

    enemies.length = 0;
    playerAttacks.length = 0;
    enemyAttacks.length = 0;
    healItems.length = 0;
    addItems.length = 0;

    if (player) {
        player.x = 1000 / 2 - 20;
        player.y = 600 - 70;
        player.hp = player.maxHp;
        player.stock = 10;
    }
}

// ===== ゲームオーバー状態のセット =====
export function setGameOver(value) {
    gameOver = value;
}

// ===== シューティングのクールダウン =====
export function canShoot(cooldown) {
    const now = performance.now();
    return now - lastShotTime >= cooldown;
}

// ===== 最終発射時間の更新 =====
export function markShotFired() {
    lastShotTime = performance.now();
}
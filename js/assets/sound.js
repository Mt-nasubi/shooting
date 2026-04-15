// js/assets/sound.js

// ---BGM---
// ゲームbgm
export const gameBgm1 = new Audio('sounds/maou_bgm_cyber41.mp3');
gameBgm1.loop = true;
gameBgm1.volume = 0.2;

// ---エフェクト音---
// ゲームオーバー
export const gameOverSound = new Audio('sounds/mixkit-arcade-retro-game-over-213.wav');
gameOverSound.volume = 0.2;

// ---エフェクト音（プール処理付き）---
const maxSounds = 5;

// 弾発射
const bulletSounds = [];
let bulletSoundIndex = 0;

for (let i = 0; i < maxSounds; i++) {
    const bs = new Audio('sounds/mixkit-short-laser-gun-shot-1670.wav');
    bs.volume = 0.5;
    bulletSounds.push(bs);
}

export function playBulletSound() {
    const bs = bulletSounds[bulletSoundIndex];
    bs.currentTime = 0;
    bs.play();
    bulletSoundIndex = (bulletSoundIndex + 1) % maxSounds;
}

// 撃墜
const downSounds = [];
let downSoundIndex = 0;

for (let i = 0; i < maxSounds; i++) {
    const ds = new Audio('sounds/mixkit-arcade-game-explosion-2759.wav');
    ds.volume = 0.2;
    downSounds.push(ds);
}

export function playDownSound() {
    const ds = downSounds[downSoundIndex];
    ds.currentTime = 0;
    ds.play();
    downSoundIndex = (downSoundIndex + 1) % maxSounds;
}
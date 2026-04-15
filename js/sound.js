// sound.js

// ---BGM---
// メインbgm
const mainBgm = new Audio('sounds/maou_bgm_cyber41.mp3');
mainBgm.loop = true;       // ループ再生
mainBgm.volume = 0.2;      // 音量（0.0〜1.0）


// ---エフェクト音---
// ゲームオーバー
const gameOverSound = new Audio('sounds/mixkit-arcade-retro-game-over-213.wav');
gameOverSound.volume = 0.2;

// ---エフェクト音---(プール処理付き)
const maxSounds = 5;  // 同時に鳴らせる最大数
// 弾発射
const bulletSounds = [];
let bulletSoundIndex = 0;

for (let i = 0; i < maxSounds; i++) {
    const bs = new Audio('sounds/mixkit-short-laser-gun-shot-1670.wav');
    bs.volume = 0.5;
    bulletSounds.push(bs);
}

function playBulletSound() {
    const bs = bulletSounds[bulletSoundIndex];
    bs.currentTime = 0;  // 再生位置を先頭に戻す
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

function playDownSound() {
    const ds = downSounds[downSoundIndex];
    ds.currentTime = 0;  // 再生位置を先頭に戻す
    ds.play();
    downSoundIndex = (downSoundIndex + 1) % maxSounds;
}
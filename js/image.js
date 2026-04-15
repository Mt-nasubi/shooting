// image.js

// ---各画像データ---
// 背景
const bgImg = new Image();
bgImg.src = 'images/earth.jpg';

// キャラ
const playerImg = new Image();
playerImg.src = 'images/jet1.png';

const alienImg = new Image();
alienImg.src = 'images/alien.png';

const ufoImg = new Image();
ufoImg.src = 'images/ufo.png';


// 攻撃
const bulletImg = new Image();
bulletImg.src = 'images/bullet.png';

const laserImg = new Image();
laserImg.src = 'images/laser.png';

const bombImg = new Image();
bombImg.src = 'images/laser.png';


// アイテム
const healImg = new Image();
healImg.src = 'images/heal.png';

const addImg = new Image();
addImg.src = 'images/add.png';

// エフェクト
const explosionImg1 = new Image();
explosionImg1.src = "images/explosion1.png";

const explosionImg2 = new Image();
explosionImg2.src = "images/explosion2.png";

const explosionImg3 = new Image();
explosionImg3.src = "images/explosion3.png";

const frames = [
    { img: explosionImg1, sx: 0,   sy: 0,   sw: 317, sh: 418 },
    { img: explosionImg2, sx: 0,  sy: 0,  sw: 358, sh: 467 },
    { img: explosionImg3, sx: 0,  sy: 0,  sw: 371, sh: 446 },
];

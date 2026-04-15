// js/render/effect.js

const explosions = [];

const explosionImg = new Image();
explosionImg.src = "images/explosion.png";  // スプライト画像

class Explosion {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.frame = 0;          // 今のフレーム番号
        this.maxFrame = 7;       // 0〜7 の8フレーム想定
        this.frameInterval = 3;  // 何フレームごとに次へ進むか
        this.frameCount = 0;

        this.size = 64;          // 1フレームの画像サイズ
        this.isFinished = false; // アニメ終了フラグ
    }

    update() {
        this.frameCount++;

        if (this.frameCount % this.frameInterval === 0) {
            this.frame++;

            if (this.frame > this.maxFrame) {
                this.isFinished = true;
            }
        }
    }

    draw(ctx) {
        if (this.isFinished) return;

        ctx.drawImage(
            explosionImg,
            this.frame * this.size,  // スプライト内のX位置
            0,                       // Y位置
            this.size,
            this.size,
            this.x - this.size / 2,  // 中心に描画
            this.y - this.size / 2,
            this.size,
            this.size
        );
    }
}

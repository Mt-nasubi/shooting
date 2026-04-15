// enemy.js

// enemyクラス
class Enemy {
    constructor(x, y, hp, speed, movingType, points) {
        this.x = x;
        this.y = y;
        this.hp = hp;
        this.speed = speed;
        this.movingType = movingType;
        this.points = points;

        this.width = 0;
        this.height = 0;

        this.isAttacking = false;
        this.isFirstDetected = false;

        // 爆発アニメ用
        this.isDead = false;
        this.explosionFrame = 0;
        this.explosionMaxFrame = 2;
        this.explosionFrameInterval = 3;
        this.explosionCounter = 0;
    }

    update() {
        if (this.isDead) {
            // 爆発アニメ更新
            this.explosionCounter++;
            if (this.explosionCounter % this.explosionFrameInterval === 0) {
                this.explosionFrame++;
            }
        } else if (this.isAttacking) {
            this.attack();   // 攻撃中は攻撃のみ
        } else {
            this.move();     // 通常移動
        }
    }

    move() {
        switch (this.movingType) {
            case 0: moveStraight(this); break;
            case 1: moveZig(this); break;
            default: moveCircle(this); break;
        }
    }

    // サブクラスで override する想定
    attack() {}

    draw(ctx) {
        const frame = this.explosionFrame % frames.length;
        const frameData = frames[frame];
        if (this.isDead) {
            // 爆発アニメ描画
        ctx.drawImage(
            frameData.img,
            frameData.sx, frameData.sy,
            frameData.sw, frameData.sh,
            this.x - 32, this.y - 32,
            64, 64
        );
        } else {
            // 何もしない（サブクラスで描画する）
        }
    }

    isExplosionFinished() {
        return this.explosionFrame > this.explosionMaxFrame;
    }
}

// エイリアン
class Alien extends Enemy {
    constructor(x, y) {
        super(x, y, 1, 4, 0, 100);
        this.width = 40;
        this.height = 24;
    }

    update() {
        if (!this.isDead && !this.isAttacking) {
            const detection = playerDetection(this, 250, 250);
            if (detection) {
                this.isAttacking = true;
                this.isFirstDetected = false;
            }
        }
        super.update();
    }

    attack() {
        attackRush(this);
    }

    draw(ctx) {
        if (this.isDead) {
            super.draw(ctx);
        } else {
            ctx.drawImage(alienImg, this.x, this.y, this.width, this.height);
        }
    }
}

// UFO
class Ufo extends Enemy {
    constructor(x, y) {
        super(x, y, 2, 5, 1, 300);
        this.width = 40;
        this.height = 24;
    }

    update() {
        if (!this.isDead) {
            const detection = playerDetection(this, 50, 500);
            if (detection) this.isAttacking = true;
        }
        super.update();
    }

    attack() {
        attackLasers(this);
    }

    draw(ctx) {
        if (this.isDead) {
            super.draw(ctx);
        } else {
            ctx.drawImage(ufoImg, this.x, this.y, this.width, this.height);
        }
    }
}

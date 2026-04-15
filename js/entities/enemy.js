// js/entities/enemy.js

import { moveStraight, moveZig, moveCircle } from "../system/enemyMoving.js";
import { attackRush, attackLasers } from "../entities/enemyAttacks.js";
import { playerDetection } from "../system/util.js";
import { alienImg, ufoImg, explosionFrames } from "../assets/image.js";


// ===== 親クラス =====
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

        // 爆発
        this.isDead = false;
        this.explosionFrame = 0;
        this.explosionMaxFrame = 2;
        this.explosionFrameInterval = 3;
        this.explosionCounter = 0;
    }

    update() {
        if (this.isDead) {
            this.explosionCounter++;
            if (this.explosionCounter % this.explosionFrameInterval === 0) {
                this.explosionFrame++;
            }
        } else if (this.isAttacking) {
            this.attack();
        } else {
            this.move();
        }
    }

    move() {
        switch (this.movingType) {
            case 0: moveStraight(this); break;
            case 1: moveZig(this); break;
            default: moveCircle(this); break;
        }
    }

    attack() {}

    draw(ctx) {
        if (this.isDead) {
            const frame = this.explosionFrame % explosionFrames.length;
            const frameData = explosionFrames[frame];

            ctx.drawImage(
                frameData.img,
                frameData.sx, frameData.sy,
                frameData.sw, frameData.sh,
                this.x - 32, this.y - 32,
                64, 64
            );
        }
    }

    isExplosionFinished() {
        return this.explosionFrame > this.explosionMaxFrame;
    }
}


// ===== エイリアン =====
export class Alien extends Enemy {
    constructor(x, y) {
        super(x, y, 1, 4, 0, 1000);
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


// ===== UFO =====
export class Ufo extends Enemy {
    constructor(x, y) {
        super(x, y, 2, 5, 1, 3000);
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
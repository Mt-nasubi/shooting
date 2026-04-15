// js/entities/player.js

import { shootBullets, shootLasers, shootBombs } from "../entities/playerAttacks.js";
import { playerImg } from "../assets/image.js";
import { canShoot, markShotFired } from "../core/gameState.js";
import { playBulletSound } from "../assets/sound.js";

export class Player {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = 39;
        this.height = 45;
        this.hp = 3;
        this.maxHp = 3;
        this.stock = 10;
        this.skillType = 0;
        this.shotCooldown = 180;
    }

    setSkill(type) {
        this.skillType = type;
    }

    attack() {
        if (this.stock <= 0) return;
        if (!canShoot(this.shotCooldown)) return;

        if (this.skillType === 0) {
            shootBullets(this);
        } else if (this.skillType === 1) {
            shootLasers(this);
        } else if (this.skillType >= 2) {
            shootBombs(this);
        }

        this.stock -= 1;
        markShotFired();
        playBulletSound();
    }

    update() {
    }

    draw(ctx) {
        ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);
    }
}
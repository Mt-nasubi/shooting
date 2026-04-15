// js/entities/playerAttacks.js

import { playerAttacks } from "../core/gameState.js";
import { bulletImg, laserImg, bombImg } from "../assets/image.js";
import { canvas } from "../main.js"; 

// ---クラス---
class Bullet {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = 6;
        this.height = 12;
        this.isDead = false;
    }

    update() {
        this.y -= this.speed;
    }

    draw(ctx) {
        ctx.drawImage(bulletImg, this.x, this.y, this.width, this.height);
    }
}

class Laser {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 6;
        this.height = 10;
        this.growingSpeed = 20;
        this.maxHeight = canvas.height - y;
        this.alpha = 1;
        this.isFading = false;
        this.fadeSpeed = 0.06;
        this.isDead = false;
    }

    update() {
        if (!this.isFading) {
            this.height += this.growingSpeed;
            if (this.height >= this.maxHeight) {
                this.height = this.maxHeight;
                this.isFading = true;
            }
        } else {
            this.alpha -= this.fadeSpeed;
            if (this.alpha <= 0) {
                this.alpha = 0;
                this.isDead = true;
            }
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(laserImg, this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}

class Bomb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 18;
        this.height = 18;
        this.vy = -6;
        this.isDead = false;
    }

    update() {
        this.y += this.vy;
        this.vy += 0.3;
        if (this.y > canvas.height) this.isDead = true;
    }

    draw(ctx) {
        ctx.drawImage(bombImg, this.x, this.y, this.width, this.height);
    }
}

// ---追加---
function addBullet(x, y, speed) {
    playerAttacks.push(new Bullet(x, y, speed));
}

function addLaser(x, y) {
    playerAttacks.push(new Laser(x, y));
}

function addBomb(x, y) {
    playerAttacks.push(new Bomb(x, y));
}

// ---発射（export）---
export function shootBullets(player) {
    addBullet(player.x + player.width / 2 - 5, player.y, 12); 
}

export function shootLasers(player) {
    addLaser(player.x + player.width / 2 - 10, player.y);
}

export function shootBombs(player) {
    addBomb(player.x + player.width / 2 - 10, player.y);
}
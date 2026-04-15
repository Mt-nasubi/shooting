// playerAttack.js




// ---クラス---
// 銃弾
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

// レーザー
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

// 爆弾
class Bomb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 18;
        this.height = 18;
        this.vy = -6; // 投げて上に行くイメージ（必要なら変える）
        this.isDead = false;
    }

    update() {
        // 簡易：上に飛んで落ちる (重力可)
        this.y += this.vy;
        this.vy += 0.3; // gravity
        if (this.y > canvas.height) this.isDead = true;
    }

    draw(ctx) {
        ctx.drawImage(bombImg, this.x, this.y, this.width, this.height);
    }
}


// 配列追加処理
function addBullet(x, y, speed) {
    playerAttacks.push(new Bullet(x, y, speed));
}

function addLaser(x, y) {
    playerAttacks.push(new Laser(x, y));
}

function addBomb(x, y) {
    playerAttacks.push(new Bomb(x, y));
}


// 発射
function shootBullets(player) {
    addBullet(player.x + player.width / 2 - 5, player.y, 12);
}

function shootLasers(player) {
    addLaser(player.x + player.width / 2 - 10, player.y);
}

function shootBombs(player) {
    addBomb(player.x + player.width / 2 - 10, player.y);
}
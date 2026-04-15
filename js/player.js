// player.js

// playerクラス
class Player {
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
    }

    setSkill(type) {
        this.skillType = type;
    }

    attack() {
        if (this.skillType === 0) {
            shootBullets(this);
        } else if (this.skillType === 1) {
            shootLasers(this);
        } else if (this.skillType >= 2) {
            shootBombs(this);
        }
    }

    update() {
        // main.js 側で座標更新
    }

    draw(ctx) {
        ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);
    }
}

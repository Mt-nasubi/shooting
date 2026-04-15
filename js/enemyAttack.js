// enemyAttack.js



// ---クラス---
class EnemyAttack {
    constructor(x, y, speed, width, height) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = width;
        this.height = height;
        this.isDead = false;
    }

    update() {}
    draw(ctx) {}
}

class EnemyLaser extends EnemyAttack {
    constructor(x, y) {
        super(x, y, 10, 6, 20);
    }

    update() {
        this.y += this.speed;  // 下向き
    }

    draw(ctx) {
        ctx.drawImage(laserImg, this.x, this.y, this.width, this.height);
    }
}



// ---配列追加---
function addEnemyAttacks(enemy) {
    enemyAttacks.push(new EnemyLaser(enemy.x + enemy.width / 2 - 3, enemy.y + enemy.height));
}



// ---敵攻撃---
// 突進
function attackRush(enemy) {
    // 一度だけ突進方向を決める処理
    const detection = playerDetection(enemy, 250, 250);
    if (!enemy.isFirstDetected && detection) {
        const dx = detection.px - enemy.x;
        const dy = detection.py - enemy.y;
        const length = Math.sqrt(dx * dx + dy * dy) || 1;

        if (length > 0) {
            enemy.rushDX = dx / length;  // 単位ベクトルのX成分
            enemy.rushDY = dy / length;  // 単位ベクトルのY成分
        } else {
            enemy.rushDX = 0;
            enemy.rushDY = 0;
        }

        enemy.isFirstDetected = true; // 方向決定済みフラグをセット
    }

    const rushMultiplier = 2.5;   // 移動倍率
    enemy.x += enemy.rushDX * enemy.speed * rushMultiplier;
    enemy.y += enemy.rushDY * enemy.speed * rushMultiplier;

    // 画面外に出たら突進終了
    if (isOutOfCanvas(enemy)) {
        enemy.isDead = true;
        enemy.isFirstDetected = false;  // 突進情報リセット
    }
}

// レーザー
function attackLasers(enemy) {
    if (enemy.laserCooldown === undefined) {
        enemy.laserCooldown = 0;
    }

    const detection = playerDetection(enemy, 100, 450);
    if (!detection) {
        enemy.isAttacking = false;
        return;
    }

    if (enemy.laserCooldown > 0) {
        enemy.laserCooldown--;
        return;
    }

    addEnemyAttacks(enemy);

    enemy.laserCooldown = 40;  // クールタイムリセット
}
// spawn.js



// 確率配列追加
function spawnEnemyRandom() {
    const x = Math.random() * (canvas.width - 60) + 10;
    const type = Math.random();
    if (type < 0.6) {
        enemies.push(new Alien(x, 0));
    } else if (type < 0.90){
        enemies.push(new Ufo(x, 0));
    } else if (type < 0.95){
        healItems.push(new HealItem(x, 0, 1, 7));
    } else {
        addItems.push(new AddItem(x, 0, 100, 7));
    }
}

// 敵の記録セット
const spawnedKeys = new Set();

function spawnAlien(x, y, time, timestamp) {
    const key = `alien_${x}_${y}_${time}`;

    if (!spawnedKeys.has(key) && timestamp >= time) {
        enemies.push(new Alien(x, y));
        spawnedKeys.add(key);
    }
}


function spawnUfo(x, y, time, timestamp) {
    const key = `ufo_${x}_${y}_${time}`;

    if (!spawnedKeys.has(key) && timestamp >= time) {
        enemies.push(new Ufo(x, y));
        spawnedKeys.add(key);
    }
}


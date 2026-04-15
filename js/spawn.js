// spawn.js

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

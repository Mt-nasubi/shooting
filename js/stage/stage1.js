// js/stage/stage1.js

import {
    spawnAlien,
    spawnUfo,
    spawnHealItem,
    spawnAddItem
} from "../system/spawn.js";

export function stage1(elapsed, canvas) {
    const center = canvas.width / 2;

    spawnAlien(center, 0, 1500, elapsed);
    spawnAlien(center - 80, 0, 2200, elapsed);
    spawnAlien(center + 80, 0, 2200, elapsed);
    spawnAlien(center - 160, 0, 2900, elapsed);
    spawnAlien(center + 160, 0, 2900, elapsed);

    spawnAddItem(center, 0, 10, 3600, elapsed);

    spawnAlien(100, 0, 4300, elapsed);
    spawnAlien(200, 0, 4600, elapsed);
    spawnAlien(300, 0, 4900, elapsed);
    spawnAlien(400, 0, 5200, elapsed);
    spawnAlien(500, 0, 5500, elapsed);
    spawnAlien(600, 0, 5800, elapsed);
    spawnAlien(700, 0, 6100, elapsed);
    spawnAlien(800, 0, 6400, elapsed);

    spawnAlien(800, 0, 7100, elapsed);
    spawnAlien(700, 0, 7400, elapsed);
    spawnAlien(600, 0, 7700, elapsed);
    spawnAlien(500, 0, 8000, elapsed);
    spawnAlien(400, 0, 8300, elapsed);
    spawnAlien(300, 0, 8600, elapsed);
    spawnAlien(200, 0, 8900, elapsed);
    spawnAlien(100, 0, 9200, elapsed);

    spawnHealItem(center - 120, 0, 1, 9800, elapsed);
    spawnAddItem(center + 120, 0, 10, 10100, elapsed);

    spawnUfo(center - 250, 0, 10800, elapsed);
    spawnUfo(center + 250, 0, 10800, elapsed);

    spawnAlien(center - 100, 0, 11200, elapsed);
    spawnAlien(center + 100, 0, 11200, elapsed);
    spawnAlien(center - 300, 0, 11600, elapsed);
    spawnAlien(center + 300, 0, 11600, elapsed);

    spawnUfo(center, 0, 12200, elapsed);

    spawnAlien(center - 350, 0, 13000, elapsed);
    spawnAlien(center - 250, 0, 13000, elapsed);
    spawnAlien(center - 150, 0, 13000, elapsed);
    spawnAlien(center + 150, 0, 13000, elapsed);
    spawnAlien(center + 250, 0, 13000, elapsed);
    spawnAlien(center + 350, 0, 13000, elapsed);

    spawnAlien(center - 50, 0, 13600, elapsed);
    spawnAlien(center + 50, 0, 13600, elapsed);

    spawnHealItem(center, 0, 1, 14300, elapsed);

    spawnUfo(center - 300, 0, 15000, elapsed);
    spawnUfo(center + 300, 0, 15000, elapsed);

    spawnAlien(center - 200, 0, 15400, elapsed);
    spawnAlien(center, 0, 15400, elapsed);
    spawnAlien(center + 200, 0, 15400, elapsed);

    spawnUfo(center - 100, 0, 16000, elapsed);
    spawnUfo(center + 100, 0, 16000, elapsed);

    spawnAddItem(center - 180, 0, 10, 16600, elapsed);

    spawnAlien(center - 400, 0, 17200, elapsed);
    spawnAlien(center - 250, 0, 17200, elapsed);
    spawnAlien(center - 100, 0, 17200, elapsed);
    spawnAlien(center + 100, 0, 17200, elapsed);
    spawnAlien(center + 250, 0, 17200, elapsed);
    spawnAlien(center + 400, 0, 17200, elapsed);

    spawnUfo(center - 320, 0, 17800, elapsed);
    spawnUfo(center, 0, 17800, elapsed);
    spawnUfo(center + 320, 0, 17800, elapsed);

    spawnAlien(center - 180, 0, 18400, elapsed);
    spawnAlien(center + 180, 0, 18400, elapsed);
}
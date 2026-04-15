// js/system/spawn.js

import { enemies, healItems, addItems, spawnedKeys } from "../core/gameState.js";
import { Alien, Ufo } from "../entities/enemy.js";
import { HealItem, AddItem } from "../entities/item.js";

export function spawnAlien(x, y, time, timestamp) {
    const key = `alien_${x}_${y}_${time}`;

    if (!spawnedKeys.has(key) && timestamp >= time) {
        enemies.push(new Alien(x, y));
        spawnedKeys.add(key);
    }
}

export function spawnUfo(x, y, time, timestamp) {
    const key = `ufo_${x}_${y}_${time}`;

    if (!spawnedKeys.has(key) && timestamp >= time) {
        enemies.push(new Ufo(x, y));
        spawnedKeys.add(key);
    }
}

export function spawnHealItem(x, y, healpoints, time, timestamp) {
    const key = `heal_${x}_${y}_${time}`;

    if (!spawnedKeys.has(key) && timestamp >= time) {
        healItems.push(new HealItem(x, y, healpoints));
        spawnedKeys.add(key);
    }
}

export function spawnAddItem(x, y, addpoints, time, timestamp) {
    const key = `add_${x}_${y}_${time}`;

    if (!spawnedKeys.has(key) && timestamp >= time) {
        addItems.push(new AddItem(x, y, addpoints));
        spawnedKeys.add(key);
    }
}
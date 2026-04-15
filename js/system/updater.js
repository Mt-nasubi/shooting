//updater.js

import { enemies, playerAttacks, enemyAttacks, healItems, addItems, addScore } from "../core/gameState.js";
import { isOutOfCanvas } from "../render/background.js";
import { canvas } from "../main.js";

// 敵更新・描画
export function updateAndDrawEnemies(ctx) {
    for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        if (e.isDead) {
            e.update();  // 爆発アニメ更新
            e.draw(ctx); // 爆発描画
            if (e.isExplosionFinished()) {
                enemies.splice(i, 1);
                addScore(e.points);
            }
        } else {
            e.update();  // 通常更新
            e.draw(ctx); // 通常描画
            if (isOutOfCanvas(e)) {
                enemies.splice(i, 1);
            }
        }
    }
}


// プレイヤー攻撃描写・更新
export function updateAndDrawPlayerAttacks(ctx) {
    for (let i = playerAttacks.length - 1; i >= 0; i--) {
        const a = playerAttacks[i];
        a.update();
        a.draw(ctx);
        if (isOutOfCanvas(a) || (a.isDead === true)) {
            playerAttacks.splice(i, 1);
        }
    }
}

// 敵攻撃描写・更新
export function updateAndDrawEnemyAttacks(ctx) {
    for (let i = enemyAttacks.length - 1; i >= 0; i--) {
        const a = enemyAttacks[i];
        a.update();
        a.draw(ctx);
        if (isOutOfCanvas(a) || (a.isDead === true)) {
            enemyAttacks.splice(i, 1);
        }
    }
}

// 回復アイテム描写・更新
export function updateAndDrawHealItems(ctx) {
    for (let i = healItems.length - 1; i >= 0; i--) {
        const h = healItems[i];
        h.update();
        h.draw(ctx);
        if (isOutOfCanvas(h)) {
            healItems.splice(i, 1);
        }
    }
}

// 弾補充アイテム描写・更新
export function updateAndDrawAddItems(ctx) {
    for (let i = addItems.length - 1; i >= 0; i--) {
        const a = addItems[i];
        a.update();
        a.draw(ctx);
        if (isOutOfCanvas(a, canvas)) {
            addItems.splice(i, 1);
        }
    }
}
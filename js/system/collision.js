//collision.js

import { player, enemies, playerAttacks, enemyAttacks, healItems, addItems, setGameOver } from "../core/gameState.js";
import { isColliding } from "./util.js";
import { playDownSound } from "../assets/sound.js";

// 各種衝突判定
export function checkCollisions() {
    // プレイヤー攻撃と敵の衝突判定
    for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        for (let j = playerAttacks.length - 1; j >= 0; j--) {
            const a = playerAttacks[j];
            if (isColliding(a, e)) {
                playerAttacks.splice(j, 1);
                e.hp -= 1;
                if (e.hp <= 0) {
                    e.isDead = true;  
                }
                playDownSound();
            }
        }
    }

    // プレイヤーと敵の衝突判定
    for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        if (isColliding(player, e)) {
            player.hp--;
            enemies.splice(i, 1);
            if (player.hp <= 0) setGameOver(true);
        }
    }

    // プレイヤーと回復アイテムの衝突判定
    for (let i = healItems.length - 1; i >= 0; i--) {
        const h = healItems[i];
        if (isColliding(player, h)) {
            healItems.splice(i, 1);
            if (player.hp >= player.maxHp) continue;
            player.hp += h.healpoints;
        }
    }

    // プレイヤーと弾補充アイテムの衝突判定
    for (let i = addItems.length - 1; i >= 0; i--) {
        const a = addItems[i];
        if (isColliding(player, a)) {
            addItems.splice(i, 1);
            player.stock += a.addpoints;
        }
    }

    // 敵攻撃とプレイヤーの衝突判定
    for (let i = enemyAttacks.length - 1; i >= 0; i--) {
        const a = enemyAttacks[i];
        if (isColliding(player, a)) {
            enemyAttacks.splice(i, 1);
            player.hp--;
            if (player.hp <= 0) setGameOver(true);
        }
    }
}
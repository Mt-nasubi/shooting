//util.js

import { player } from "../core/gameState.js";

// 衝突判定ユーティリティ
export function isColliding(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

// プレイヤー検知
export function playerDetection(enemy, rangeX, rangeY) {
    const dx = Math.abs(player.x - enemy.x);
    const dy = Math.abs(player.y - enemy.y);

    if (dx <= rangeX && dy <= rangeY) {
        return {
            px: player.x,
            py: player.y
        };
    }
    return null;
}
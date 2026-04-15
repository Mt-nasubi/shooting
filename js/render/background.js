//background.js

import { bgImg } from "../assets/image.js";
import { canvas } from "../main.js";

export let bgY = 0;

// 背景画像のスクロール
export function drawBackground(ctx, canvas) {
    bgY += 2; // スクロール速度(bgY = 背景画像のずれ量)
    bgY = bgY % canvas.height;

    // 上段
    ctx.drawImage(bgImg, 0, bgY - canvas.height, canvas.width, canvas.height);
    // 下段
    ctx.drawImage(bgImg, 0, bgY, canvas.width, canvas.height);
}

// ---オブジェクト判定関数---
// canvas外判定（完全にキャンバス外なら true）
export function isOutOfCanvas(obj) {
    return (
        obj.x + obj.width < 0 ||
        obj.x > canvas.width ||
        obj.y + obj.height < 0 ||
        obj.y > canvas.height
    );
}
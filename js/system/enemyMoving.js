// enemyMoving.js



// ---敵移動---
// まっすぐ下に移動
export function moveStraight(enemy) {
    enemy.y += enemy.speed;
}


// 左右ジグザグしながら下に移動（基準点 baseX, 角度 angle を使用）
export function moveZig(enemy) {
    const amplitude = 40;    // 横の最大振れ幅（px）
    const frequency = 0.06;  // 振動の速さ（角度の増分）

    // 基準X座標を保持（初回のみ）
    if (enemy.baseX === undefined) enemy.baseX = enemy.x;

    // 角度を保持・更新
    if (enemy.angle === undefined) enemy.angle = 0;
    enemy.angle += frequency;

    // 横位置を基準Xからサイン波で振動させる
    enemy.x = enemy.baseX + amplitude * Math.sin(enemy.angle);

    // 縦方向は一定速度で下に移動
    enemy.y += enemy.speed;
}


// 円運動しながら下に移動（baseX, baseY, angle を使用）
export function moveCircle(enemy) {
    // 基準点（円運動の中心）を enemy.baseX, enemy.baseY に保持している想定
    if (enemy.baseX === undefined) enemy.baseX = enemy.x;
    if (enemy.baseY === undefined) enemy.baseY = enemy.y;

    const radius = 30;         // 円の半径（px）
    const angularSpeed = 0.06; // 回転速度（ラジアン/フレーム）

    if (enemy.angle === undefined) enemy.angle = 0;

    // 基準点を下に移動（直進成分）
    enemy.baseY += enemy.speed;

    // 角度更新（回転成分）
    enemy.angle += angularSpeed;

    // 円運動の座標（基準点の周りを回る）
    enemy.x = enemy.baseX + radius * Math.cos(enemy.angle);
    enemy.y = enemy.baseY + radius * Math.sin(enemy.angle);
}

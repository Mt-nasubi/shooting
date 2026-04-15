// stage1.js

function stage1(elapsed) {
    if (!gameStarted) return;
    
    spawnAlien(canvas.width/2, 0, 3000, elapsed);
    spawnAlien(canvas.width/2 - 100, 0, 3400, elapsed);
    spawnAlien(canvas.width/2 + 100, 0, 3400, elapsed);
    spawnAlien(canvas.width/2 - 200, 0, 4400, elapsed);
    spawnAlien(canvas.width/2 + 200, 0, 4400, elapsed);
    spawnAlien(canvas.width/2 - 300, 0, 5400, elapsed);
    spawnAlien(canvas.width/2 + 300, 0, 5400, elapsed);
    spawnAlien(canvas.width/2 - 400, 0, 6400, elapsed);
    spawnAlien(canvas.width/2 + 400, 0, 6400, elapsed);

    spawnUfo(canvas.width/2 - 200, 0, 10000, elapsed);
    spawnUfo(canvas.width/2 + 200, 0, 10000, elapsed);
    spawnUfo(canvas.width/2 - 400, 0, 10000, elapsed);
    spawnUfo(canvas.width/2 + 400, 0, 10000, elapsed);

    spawnUfo(canvas.width/2, 0, 12000, elapsed);
    spawnUfo(canvas.width/2 - 100, 0, 12000, elapsed);
    spawnUfo(canvas.width/2 + 100, 0, 12000, elapsed);
    spawnUfo(canvas.width/2 - 300, 0, 12000, elapsed);
    spawnUfo(canvas.width/2 + 300, 0, 12000, elapsed);
    spawnUfo(canvas.width/2 - 450, 0, 12000, elapsed);
    spawnUfo(canvas.width/2 + 450, 0, 12000, elapsed);

}
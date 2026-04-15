// stage1.js

function stage1(timestamp) {
    spawnAlien(canvas.width/2, 0, 3000, timestamp);
    spawnAlien(canvas.width/2 - 100, 0, 3400, timestamp);
    spawnAlien(canvas.width/2 + 100, 0, 3400, timestamp);
    spawnAlien(canvas.width/2 - 200, 0, 4400, timestamp);
    spawnAlien(canvas.width/2 + 200, 0, 4400, timestamp);
    spawnAlien(canvas.width/2 - 300, 0, 5400, timestamp);
    spawnAlien(canvas.width/2 + 300, 0, 5400, timestamp);
    spawnAlien(canvas.width/2 - 400, 0, 6400, timestamp);
    spawnAlien(canvas.width/2 + 400, 0, 6400, timestamp);

    spawnUfo(canvas.width/2 - 200, 0, 10000, timestamp);
    spawnUfo(canvas.width/2 + 200, 0, 10000, timestamp);
    spawnUfo(canvas.width/2 - 400, 0, 10000, timestamp);
    spawnUfo(canvas.width/2 + 400, 0, 10000, timestamp);

    spawnUfo(canvas.width/2, 0, 12000, timestamp);
    spawnUfo(canvas.width/2 - 100, 0, 12000, timestamp);
    spawnUfo(canvas.width/2 + 100, 0, 12000, timestamp);
    spawnUfo(canvas.width/2 - 300, 0, 12000, timestamp);
    spawnUfo(canvas.width/2 + 300, 0, 12000, timestamp);
    spawnUfo(canvas.width/2 - 450, 0, 12000, timestamp);
    spawnUfo(canvas.width/2 + 450, 0, 12000, timestamp);

}
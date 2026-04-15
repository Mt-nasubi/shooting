// item.js 
import { healImg, addImg } from "../assets/image.js";

export class HealItem {
    constructor(x, y, healpoints, speed) {
        this.x = x;
        this.y = y;
        this.healpoints = healpoints;
        this.speed = speed || 5;
        this.width = 68;
        this.height = 32;
    }

    update() {
        this.y += this.speed;
    }

    draw(ctx) {
        ctx.drawImage(healImg, this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'white';
        ctx.font = '24px `DotGothic16`';
        ctx.textAlign = 'center'; 
        ctx.fillText(`+${this.healpoints}`, this.x + this.width / 2, this.y + this.height / 2 + 8);
    }
}

export class AddItem {
    constructor(x, y, addpoints, speed) {
        this.x = x;
        this.y = y;
        this.addpoints = addpoints;        
        this.speed = speed || 5;
        this.width = 68;
        this.height = 32;
    }

    update() {
        this.y += this.speed;
    }

    draw(ctx) {
        ctx.drawImage(addImg, this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'white';
        ctx.font = '24px `DotGothic16`';
        ctx.textAlign = 'center'; 
        ctx.fillText(`+${this.addpoints}`, this.x + this.width / 2, this.y + this.height / 2 + 8);
    }
}
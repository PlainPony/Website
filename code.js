let loop;
let fps = 60;
let canvas_, ctx;
let balls = [];

class Ball{
    constructor(color, x, y){
        this.color = color
        this.x = x
        this.x = Math.random()*canvas_.width
        this.y = y
        this.y = Math.random()*canvas_.height
        this.xdelta = 5
        this.ydelta = 5
        this.size = 30
        console.log(this.color)
    }

    update(){
        this.x += this.xdelta;
        this.y += this.ydelta;
        if (this.x + this.size / 2 > canvas_.width || this.x - this.size / 2 < 0){
            this.xdelta = -this.xdelta;
        }
        if (this.y + this.size / 2 > canvas_.height || this.y - this.size / 2 < 0){
            this.ydelta = -this.ydelta;
        }
    }

    draw(ctx){
        ctx.fillStyle = this.color
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size, 0,Math.PI*2,true);
        ctx.fill();
    }


}

window.onload = function () {
        console.log('Gameloop');
        prepareCanvas();
        let ball1 = new Ball('green', 50, 50)
        balls.push(ball1)
        let ball2 = new Ball('red', 80, 80)
        balls.push(ball2)
        prepareKeyboardInput();
        loop = setInterval (() =>  {
            update();
            render();
        }, 1000/fps);
}

function fillCanvas() {
    ctx.fillStyle = '#1bafdb';
    ctx.fillRect(0,0, canvas_.width, canvas_.height);
}

function prepareCanvas() {
    canvas_ = document.getElementById('canvas_');
    ctx = canvas_.getContext('2d');
    document.body.style.padding = 0;
    document.body.style.margin = 0;
    canvas_.width = window.innerWidth;
    canvas_.height = window.innerHeight;
}

function prepareKeyboardInput() {
    document.addEventListener('mousedown', (event) => {
        console.log('click');
        for (let ball of balls) {
            ball.xdelta = -ball.xdelta
            ball.ydelta = -ball.ydelta
        }
    },false);
}

function update () {
    for (let ball of balls) {
        ball.update();
    }
}

function render () {
    fillCanvas ();
    for (let ball of balls) {
        ball.draw(ctx);
    }
}
'use strict'

var canvas
var ctx
var isDrawing = false;
var points = [];
var lastX = 0;
var lastY = 0;


function init() {
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        points.push({ x: e.clientX, y: e.clientY });
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
        points.length = 0;
    });
    canvas.addEventListener('mouseout', () => isDrawing = false);
}

function draw(e) {
    // stop the function if they are not mouse down
    if (!isDrawing) return;
    

    points.push({ x: e.clientX, y: e.clientY });
    for (var i = 0; i < points.length; i++) {
        ctx.beginPath();
        drawCircles(i);
        
        ctx.fill();
        ctx.stroke();
    }
}

function drawCircles(i) {
    ctx.lineJoin = ctx.lineCap = 'round';
    
    ctx.arc(points[i].x, points[i].y, 15, false, Math.PI * 2, false);
}

function drawColor() {
    let color = document.querySelector('input').value;
    ctx.fillStyle = color;
}

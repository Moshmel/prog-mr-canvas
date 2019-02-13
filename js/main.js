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
    if (!isDrawing) return;
    drawColor();

    var drawStyle = document.querySelector('select').value;

    points.push({ x: e.clientX, y: e.clientY });
    for (var i = 0; i < points.length; i++) {
        ctx.beginPath();

        switch (drawStyle) {
            case 'pen':
                drawPen(e);
                break;
            case 'circle':
                drawCircles(i);
                break;
            case 'star':
                drawStars(points[i].x,points[i].y);
                break;
            default:
                break;
        }
        ctx.stroke();
    }
}

function drawCircles(i) {
    ctx.save();
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.arc(points[i].x, points[i].y, 15, false, Math.PI * 2, false);
    ctx.restore();
}

function drawPen() {
    ctx.save();
    ctx.lineWidth = 10;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.moveTo(points[0].x, points[0].y);
    for (var i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }   
    ctx.restore();
}

function drawStars(x, y) {
    var length = 15;
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.rotate((Math.PI * 1 / 10));
    for (var i = 5; i--;) {
        ctx.lineTo(0, length);
        ctx.translate(0, length);
        ctx.rotate((Math.PI * 2 / 10));
        ctx.lineTo(0, -length);
        ctx.translate(0, -length);
        ctx.rotate(-(Math.PI * 6 / 10));
    }
    ctx.lineTo(0, length);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

function drawColor() {
    let color = document.querySelector('input').value;
    ctx.strokeStyle = color;
}
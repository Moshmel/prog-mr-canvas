'use strict'

var gCanvas
var gCtx

function init() {
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    console.log(gCtx);

    gCtx.lineJoin = 'round';
    gCtx.lineCap = 'round';
    gCtx.lineWidth = 20;
    gCtx.strokeStyle = "#000000";

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function draw(e) {
        // stop the function if they are not mouse down
        if (!isDrawing) return;
        //listen for mouse move event
        console.log(e);
        gCtx.beginPath();
        gCtx.moveTo(lastX, lastY);
        gCtx.lineTo(e.offsetX, e.offsetY);
        gCtx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    gCanvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    gCanvas.addEventListener('mousemove', draw);
    gCanvas.addEventListener('mouseup', () => isDrawing = false);
    gCanvas.addEventListener('mouseout', () => isDrawing = false);

}
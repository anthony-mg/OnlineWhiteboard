export let P5Events = function (p5Sketch) {

    document.querySelector('.erase').addEventListener('click', (event) => {
        p5Sketch.select('.erase').toggleClass('button-clicked-alt')
        p5Sketch.select('#wrap').toggleClass('eraser-cursor-toggle');
        p5Sketch.erasing = !p5Sketch.erasing;
    });

    document.querySelector('.chat-button').addEventListener('click', (event) => {
        event.target.classList.toggle('button-clicked-alt');
        document.querySelector('.chat-history').classList.toggle('chat-history-display-toggle')
    });

    document.querySelector('.message-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const message = event.target.elements.msg.value;
        if (message === '') {
            return;
        }
        p5Sketch.socket.emit('message', message);
        event.target.elements.msg.value = '';
        event.target.elements.msg.focus();
    })

    p5Sketch.windowResized = () => {
        p5Sketch.resizeCanvas(p5Sketch.windowWidth / 1.3, p5Sketch.windowHeight / 1.3);
        p5Sketch.background('#F');
        p5Sketch.socket.emit('load', 'window rezied...');
    }

    document.querySelector('#wrap').addEventListener('wheel', (event) => {

        if (p5Sketch.mouseX < p5Sketch.width && p5Sketch.mouseX > 0 && p5Sketch.mouseY < p5Sketch.height && p5Sketch.mouseY > 0) {
            if (event.deltaY < 0) {
                p5Sketch.applyZoomScale(1.10);
            }
            else {
                p5Sketch.applyZoomScale(0.90);
            }
            p5Sketch.background('#F');
            p5Sketch.socket.emit('load', 'zooming...');
            return false;
        }
    });

    p5Sketch.applyZoomScale = (s) => {
        p5Sketch.scaleFactor *= s;
        p5Sketch.scaleFactor = p5Sketch.min(p5Sketch.max(.25, p5Sketch.scaleFactor), 30)
        if (p5Sketch.scaleFactor == .25 || p5Sketch.scaleFactor == 30) {
            return;
        }
        p5Sketch.translateX = p5Sketch.mouseX * (1 - s) + p5Sketch.translateX * s;
        p5Sketch.translateY = p5Sketch.mouseY * (1 - s) + p5Sketch.translateY * s;
    }

    document.querySelector('#wrap').addEventListener('panning', () => {
        if (p5Sketch.panning) {
            p5Sketch.translateX += (p5Sketch.width / 2 - p5Sketch.mouseX) * .05;
            p5Sketch.translateY += (p5Sketch.height / 2 - p5Sketch.mouseY) * .05;
            p5Sketch.socket.emit('load', 'panning...');
        }
    })

    p5Sketch.keyPressed = () => {
        if (p5Sketch.keyCode == 17) {
            p5Sketch.panning = true
        }
    }

    p5Sketch.keyReleased = () => {
        if (p5Sketch.keyCode == 17) {
            p5Sketch.select('#wrap').style('cursor: crosshair');
            p5Sketch.panning = false
        }
    }

}
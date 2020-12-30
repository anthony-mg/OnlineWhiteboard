export let P5Events = function (p5Sketch) {

    p5Sketch.windowResized = () => {
        p5Sketch.resizeCanvas(p5Sketch.windowWidth / 1.3, p5Sketch.windowHeight / 1.3);
        p5Sketch.background('#F');
        p5Sketch.socket.emit('load', 'loading...');
    }

    p5Sketch.mouseWheel = (event) => {
        if (p5Sketch.mouseX < p5Sketch.width && p5Sketch.mouseX > 0 && p5Sketch.mouseY < p5Sketch.height && p5Sketch.mouseY > 0) {
            if (event.delta < 0) {
                p5Sketch.applyZoomScale(1.10);
            }
            else {
                p5Sketch.applyZoomScale(0.90);
            }
            p5Sketch.background('#F');
            p5Sketch.socket.emit('load', 'loading...');
            return false;
        }
    }

    p5Sketch.applyZoomScale = (s) => {
        p5Sketch.scaleFactor *= s;
        p5Sketch.translateX = p5Sketch.mouseX * (1 - s) + p5Sketch.translateX * s;
        p5Sketch.translateY = p5Sketch.mouseY * (1 - s) + p5Sketch.translateY * s;
    }

    document.querySelector('#wrap').addEventListener('grabbing', () => {
        if (p5Sketch.panning) {
            p5Sketch.translateX += (p5Sketch.width / 2 - p5Sketch.mouseX) * .05;
            p5Sketch.translateY += (p5Sketch.height / 2 - p5Sketch.mouseY) * .05;
            p5Sketch.socket.emit('load', 'loading...');
        }
    })

    p5Sketch.keyPressed = () => {
        if (p5Sketch.keyCode == 17) {
            p5Sketch.panning = true
        }
    }

    p5Sketch.keyReleased = () => {
        if (p5Sketch.keyCode == 17) {
            p5Sketch.panning = false
        }
    }
}
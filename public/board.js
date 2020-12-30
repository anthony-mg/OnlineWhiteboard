export let sketch = (p) => {
    p5.disableFriendlyErrors = true;
    //p.socket = io('https://shareablewhiteboard.herokuapp.com/');
    p.socket = io("192.168.0.195:5000");
    p.color;
    p.strokeW;
    p.erasing = false;
    p.panning = false;
    p.touchDistance = 0;
    p.scaleFactor = 1;
    p.translateX = 0;
    p.translateY = 0;

    p.setup = () => {

        /*========================================================================================================================
                                                        Sketch Setup
          ========================================================================================================================*/
        p.colorPic = p.select('#colorPic');
        p.strokeSlider = p.select('#sizeSlider');
        p.cursor = p.createGraphics(p.width, p.height);

        p.eraserToggle = p.select('#erase');
        p.eraserToggle.mousePressed(() => {
            p.eraserToggle.toggleClass('erase-alt')
            p.erasing = !p.erasing;
        });

        p.canvas = p.createCanvas(p.windowWidth / 1.5, p.windowHeight / 1.5);
        p.canvas.parent('wrap', '');
        p.canvas.addClass("no-select")

        p.background('#F');
        p.line(0, 0, p.with, p.height);
    }

    p.draw = () => {
        p.translate(p.translateX, p.translateY);
        p.scale(p.scaleFactor)

        if (p.mouseX < p.width + 10 && p.mouseX > -10 && p.mouseY < p.height + 10 && p.mouseY > -10) {
            if (!p.panning) {
                p.select('#wrap').style('cursor: crosshair')
                if (p.erasing)
                    p.c = p.color('#F');
                else
                    p.c = p.color(p.colorPic.value());

                if (p.mouseIsPressed) {
                    let data = {
                        x: (p.mouseX - p.translateX) / p.scaleFactor,
                        y: (p.mouseY - p.translateY) / p.scaleFactor,
                        px: (p.pmouseX - p.translateX) / p.scaleFactor,
                        py: (p.pmouseY - p.translateY) / p.scaleFactor,
                        erasing: p.erasing,
                        incomingWidth: p.width,
                        incomingHeight: p.height,
                        incomingStroke: p.strokeW,
                        color: p.c
                    }

                    p.socket.emit('someoneDrew', data);
                    p.strokeW = p.strokeSlider.value()
                    p.strokeWeight(p.strokeW);
                    p.stroke(data.color);
                    p.line(data.x, data.y, data.px, data.py);
                }
            } else {
                p.select('#wrap').style('cursor: grab')
                if (p.mouseIsPressed) {
                    p.select('#wrap').style('cursor: move')
                    let event = new CustomEvent('grabbing')
                    document.querySelector('#wrap').dispatchEvent(event);
                }
            }
        }
    }
}


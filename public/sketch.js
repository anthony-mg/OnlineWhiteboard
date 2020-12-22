export let sketch = (p) => {
    p5.disableFriendlyErrors = true;
    //p.socket = io('https://shareablewhiteboard.herokuapp.com/');
    p.socket = io("192.168.0.195:5000");
    p.x = 100;
    p.color;
    p.pointsPermanence = [];
    p.strokeW;
    p.erasing = false;

    p.setup = () => {
        /*========================================================================================================================
                                                        Sketch Setup
          ========================================================================================================================*/
        p.colorPic = p.select('#colorPic');
        p.strokeSlider = p.select('#sizeSlider');
        p.clearButton = p.select('#clearButt');

        p.clearButton.mousePressed(() => {
            p.socket.emit('clear', 'clearing screen...');
            p.clear();
            p.background('#F');
        })

        p.eraserToggle = p.select('#erase');
        p.eraserToggle.mousePressed(() => {
            p.eraserToggle.toggleClass('erase-alt')
            p.erasing = !p.erasing;
        });

        p.canvas = p.createCanvas(p.windowWidth / 1.5, p.windowHeight / 1.5);
        p.canvas.parent('wrap', '');
        p.canvas.addClass("no-select")

        p.graphics = p.createGraphics(p.width, p.height);
        p.otherCursors = p.createGraphics(p.width, p.height);
        p.background('#F');


        p.line(0, 0, p.with, p.height);
    }

    p.draw = () => {

        if (p.mouseX < p.width + 10 && p.mouseX > -10 && p.mouseY < p.height + 10 && p.mouseY > -10) {
            let c;
            if (p.erasing)
                p.c = p.color('#F');
            else
                p.c = p.color(p.colorPic.value());

            if (p.mouseIsPressed) {
                p.pixels[100] = 10;
                let data = {
                    x: p.mouseX,
                    y: p.mouseY,
                    px: p.pmouseX,
                    py: p.pmouseY,
                    erasing: p.erasing,
                    incomingWidth: p.width,
                    incomingHeight: p.height,
                    incomingStroke: p.strokeW,
                    color: p.c
                }

                p.socket.emit('someoneDrew', data);
                p.strokeW = p.strokeSlider.value();
                p.strokeWeight(p.strokeW);
                p.stroke(p.c);
                p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
            }
        }
    }


    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth / 1.3, p.windowHeight / 1.3);
        p.background('#F');
        p.socket.emit('load', 'loading...');
    }
}


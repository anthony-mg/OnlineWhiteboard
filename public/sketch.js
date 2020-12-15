let socket;
let color;
let pointsPermanence = [];
let strokeW;
let erasing = false;


function setup() {
    /*========================================================================================================================
                                                    Sketch Setup
      ========================================================================================================================*/
    colorPic = select('#colorPic')//createColorPicker('#000000');
    strokeSlider = select('#sizeSlider')//createSlider(0, 50, 5, 5);

    let clearButton = select('#clearButt')
    clearButton.mousePressed(() => {
        socket.emit('clear', 'clearing screen...')
        clear()
        background('#F')
    })

    let eraserToggle = select('#erase')
    eraserToggle.mousePressed(() => {
        eraserToggle.toggleClass('erase-alt')
        erasing = !erasing;
    })

    let canvas = createCanvas(windowWidth / 1.5, windowHeight / 1.5);
    canvas.parent('wrap', '')
    background("#F")

    /*========================================================================================================================
                                                    Socket Events
      ========================================================================================================================*/
    socket = io.connect('https://shareablewhiteboard.herokuapp.com/')
    //socket = io.connect("192.168.0.195:5000");

    socket.on('someoneDrew', (data) => {
        if (data.incomingStroke == null)
            strokeWeight(1)
        else
            strokeWeight(data.incomingStroke)

        stroke(...data.color.levels)
        let x = map(data.x, 0, data.incomingWidth, 0, width);
        let y = map(data.y, 0, data.incomingHeight, 0, height);
        let px = map(data.px, 0, data.incomingWidth, 0, width);
        let py = map(data.py, 0, data.incomingHeight, 0, height);
        line(x, y, px, py)
    })

    socket.on('load', data => {
        loadWhiteboard(data);
    })

    socket.on('clear', (message) => {
        console.log(message);
        clear()
        background('#F')
    })

    select("#controls")
}

function draw() {

    if (mouseX < width + 10 && mouseX > -10 && mouseY < height + 10 && mouseY > -10) {
        let c;
        if (erasing)
            c = this.color('#F')
        else
            c = this.color(colorPic.value())

        if (mouseIsPressed) {
            let data = {
                x: mouseX,
                y: mouseY,
                px: pmouseX,
                py: pmouseY,
                erasing: erasing,
                incomingWidth: width,
                incomingHeight: height,
                incomingStroke: strokeW,
                color: c
            }

            socket.emit('someoneDrew', data);

            strokeW = strokeSlider.value()
            strokeWeight(strokeW);
            stroke(c)
            line(mouseX, mouseY, pmouseX, pmouseY)
        }
    }
}

function loadWhiteboard(dataPoints) {
    dataPoints.forEach(l => {
        let x = map(l.x, 0, l.incomingWidth, 0, width);
        let y = map(l.y, 0, l.incomingHeight, 0, height);
        let px = map(l.px, 0, l.incomingWidth, 0, width);
        let py = map(l.py, 0, l.incomingHeight, 0, height);

        strokeWeight(l.incomingStroke)
        stroke(...l.color.levels)
        line(x, y, px, py)
    })
}

function windowResized() {
    resizeCanvas(windowWidth / 1.3, windowHeight / 1.3)
    background('#F')
    socket.emit('load', 'loading...')
}
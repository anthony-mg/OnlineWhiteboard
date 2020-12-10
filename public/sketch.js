let socket;
let color;
let graphicsPerminence;

function setup() {
    colorPic = createColorPicker('#000000');
    createCanvas(displayWidth - 50, displayHeight - 175);
    background(100);

    socket = io.connect('http://localhost:5000/');
    socket.on('someoneDrew', (data) => {
        stroke(...data.color.levels)
        line(data.x, data.y, data.px, data.py)
    })

    socket.on('new connection', (socketid) => {

    })

    socket.once('board setup', (points) => {

    })
}

function draw() {

    if (mouseIsPressed) {
        let data = {
            x: mouseX,
            y: mouseY,
            px: pmouseX,
            py: pmouseY,
            color: colorPic.color()
        }

        socket.emit('someoneDrew', data);

        stroke(colorPic.color())
        line(mouseX, mouseY, pmouseX, pmouseY)
    }
}


export var SocketDrawEvents = function (p5Sketch) {
    this.p5Sketch = p5Sketch;

    this.handler = {
        someoneDrew: someoneDrew.bind(p5Sketch),
        load: load.bind(p5Sketch)
    };
}

function someoneDrew(data) {

    if (data.incomingStroke == null)
        this.strokeWeight(1)
    else
        this.strokeWeight(data.incomingStroke)

    this.stroke(...data.color.levels)
    let x = this.map(data.x, 0, data.incomingWidth, 0, this.width);
    let y = this.map(data.y, 0, data.incomingHeight, 0, this.height);
    let px = this.map(data.px, 0, data.incomingWidth, 0, this.width);
    let py = this.map(data.py, 0, data.incomingHeight, 0, this.height);

    console.log(inDrawingRange(x, y, px, py, this.topLeftAndBottomRightCorners))
    if (inDrawingRange(x, y, px, py, this.topLeftAndBottomRightCorners)) {
        this.line(x, y, px, py)
    } else {
        console.log('fuck you!')
    }
}


function load(data) {
    this.background('#F')
    data.forEach(incomingPoint => {
        let x = this.map(incomingPoint.x, 0, incomingPoint.incomingWidth, 0, this.width);
        let y = this.map(incomingPoint.y, 0, incomingPoint.incomingHeight, 0, this.height);
        let px = this.map(incomingPoint.px, 0, incomingPoint.incomingWidth, 0, this.width);
        let py = this.map(incomingPoint.py, 0, incomingPoint.incomingHeight, 0, this.height);

        this.strokeWeight(incomingPoint.incomingStroke)
        this.stroke(...incomingPoint.color.levels)
        if (inDrawingRange(x, y, px, py, this.topLeftAndBottomRightCorners)) {
            this.line(x, y, px, py)
        }
    })

}

function inDrawingRange(x, y, px, py, twoDiagonalCorners) {
    let leniencyOffset = 2;
    twoDiagonalCorners[0][0] -= leniencyOffset;
    twoDiagonalCorners[0][1] -= leniencyOffset;
    twoDiagonalCorners[1][0] += leniencyOffset;
    twoDiagonalCorners[1][1] += leniencyOffset;
    return (x > twoDiagonalCorners[0][0] && x < twoDiagonalCorners[1][0] && y > twoDiagonalCorners[0][1] && y < twoDiagonalCorners[1][1] && px > twoDiagonalCorners[0][0] && px < twoDiagonalCorners[1][0] && py > twoDiagonalCorners[0][1] && py < twoDiagonalCorners[1][1])
}

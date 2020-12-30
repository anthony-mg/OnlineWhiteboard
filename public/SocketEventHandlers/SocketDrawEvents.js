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
    this.line(x, y, px, py)
}



function load(data) {
    this.background('#F')
    data.forEach(l => {
        let x = this.map(l.x, 0, l.incomingWidth, 0, this.width);
        let y = this.map(l.y, 0, l.incomingHeight, 0, this.height);
        let px = this.map(l.px, 0, l.incomingWidth, 0, this.width);
        let py = this.map(l.py, 0, l.incomingHeight, 0, this.height);

        this.strokeWeight(l.incomingStroke)
        this.stroke(...l.color.levels)
        this.line(x, y, px, py)
    })
}

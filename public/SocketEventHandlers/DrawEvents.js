export var DrawEvents = function (p5Sketch) {
    this.p5Sketch = p5Sketch;

    this.handler = {
        someoneDrew: someoneDrew.bind(p5Sketch),
        clear: clear.bind(p5Sketch),
        load: load.bind(p5Sketch)

    };
}

function someoneDrew(data) {

    if (data.incomingStroke == null)
        this.graphics.strokeWeight(1)
    else
        this.graphics.strokeWeight(data.incomingStroke)

    this.graphics.stroke(...data.color.levels)
    let x = this.map(data.x, 0, data.incomingWidth, 0, this.width);
    let y = this.map(data.y, 0, data.incomingHeight, 0, this.height);
    let px = this.map(data.px, 0, data.incomingWidth, 0, this.width);
    let py = this.map(data.py, 0, data.incomingHeight, 0, this.height);
    this.graphics.line(x, y, px, py)
}

function clear() {
    console.log(message);
    this.graphics.clear()
    this.graphics.background('#F')
}

function load(data) {
    data.forEach(l => {
        let x = this.map(l.x, 0, l.incomingWidth, 0, this.width);
        let y = this.map(l.y, 0, l.incomingHeight, 0, this.height);
        let px = this.map(l.px, 0, l.incomingWidth, 0, this.width);
        let py = this.map(l.py, 0, l.incomingHeight, 0, this.height);

        this.graphics.strokeWeight(l.incomingStroke)
        this.graphics.stroke(...l.color.levels)
        this.graphics.line(x, y, px, py)
    })
}

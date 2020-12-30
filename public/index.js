let sketch = (p) => {

    p.setup = () => {
        var canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent('canvasWrap', '');
        canvas.position(0, 0)
        p.background('#FFF')
        p.noStroke()
    }

    p.keyPressed = () => {
        p.fill(p.floor(p.random(256)), p.floor(p.random(256)), p.floor(p.random(256)), 60)
        p.ellipse(p.random(p.windowWidth) + 1, p.random(p.windowHeight) + 1, p.random(50, 100))
    }

    p.mouseClicked = () => {
        let squareSide = p.random(50, 100)
        p.fill(p.floor(p.random(256)), p.floor(p.random(256)), p.floor(p.random(256)), 60)
        p.rect(p.random(p.windowWidth) + 1, p.random(p.windowHeight) + 1, squareSide, squareSide)
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
    }
}

let p5Sketch = new p5(sketch);
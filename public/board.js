export let sketch = (p) => {
  p5.disableFriendlyErrors = true;
  //https://shareablewhiteboard.herokuapp.com/
  p.socket = io("https://ec2-54-165-7-78.compute-1.amazonaws.com:3100", {
    reconnection: false,
    transports: ["websocket"],
    upgrade: false,
  });

  // p.socket = io("192.168.0.195:5000", {
  //     reconnection: false,
  //     transports: ['websocket'],
  //     upgrade: false
  // });
  p.color;
  p.strokeW;
  p.erasing = false;
  p.panning = false;
  p.scaleFactor = 1;
  p.translateX = 0;
  p.translateY = 0;
  p.topLeftAndBottomRightCorners = [];

  p.setup = () => {
    /*========================================================================================================================
                                                        Sketch Setup
          ========================================================================================================================*/
    p.colorPic = p.select("#colorPic");
    p.strokeSlider = p.select("#sizeSlider");
    p.canvas = p.createCanvas(p.windowWidth / 1.5, p.windowHeight / 1.5);
    p.canvas.parent("wrap", "");
    p.canvas.addClass("no-select");
    p.background("#F");
    p.topLeftAndBottomRightCorners = [
      [p.translateX / p.scaleFactor, p.translateY / p.scaleFactor],
      [(p.width + p.translateX) / p.scaleFactor, (p.translateY + p.height) / p.scaleFactor],
    ];
  };

  p.draw = () => {
    p.translate(p.translateX, p.translateY);
    p.scale(p.scaleFactor);

    if (p.mouseX < p.width + 10 && p.mouseX > -10 && p.mouseY < p.height + 10 && p.mouseY > -10) {
      if (!p.panning) {
        if (p.erasing) p.c = p.color("#F");
        else p.c = p.color(p.colorPic.value());

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
            color: p.c,
          };

          p.socket.emit("someoneDrew", data);
          p.strokeW = p.strokeSlider.value();
          p.strokeWeight(p.strokeW);
          p.stroke(data.color);
          p.line(data.x, data.y, data.px, data.py);
        }
      } else {
        p.select("#wrap").style("cursor: grab");
        if (p.mouseIsPressed) {
          p.select("#wrap").style("cursor: move");
          let panningEvent = new CustomEvent("panning");
          document.querySelector("#wrap").dispatchEvent(panningEvent);
        }
      }
    }
  };
};

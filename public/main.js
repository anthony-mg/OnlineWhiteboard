import { sketch } from './sketch.js';
import { DrawEvents } from './SocketEventHandlers/DrawEvents.js';

let p5Sketch = new p5(sketch)

p5Sketch.socket.on('connect', () => {

    var eventHandlers = {
        DrawEvents: new DrawEvents(p5Sketch)
    }

    for (let category in eventHandlers) {
        let handler = eventHandlers[category].handler
        for (let event in handler) {
            console.log(event)
            p5Sketch.socket.on(event, handler[event])
        }
    }

});



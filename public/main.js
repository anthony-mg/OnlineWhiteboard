import { sketch } from './board.js';
import { SocketDrawEvents } from './SocketEventHandlers/SocketDrawEvents.js';
import { P5Events } from './DrawingEventHandlers/p5Events.js'
let p5Sketch = new p5(sketch)

P5Events(p5Sketch)

p5Sketch.socket.on('connect', () => {
    var eventHandlers = {
        DrawEvents: new SocketDrawEvents(p5Sketch)
    }

    for (let category in eventHandlers) {
        let handler = eventHandlers[category].handler
        for (let event in handler) {
            p5Sketch.socket.on(event, handler[event])
        }
    }
});



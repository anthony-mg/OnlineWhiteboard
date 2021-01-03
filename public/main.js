import { sketch } from './board.js';
import { SocketDrawEvents } from './SocketEventHandlers/SocketDrawEvents.js';
import { SocketMessageEvents } from './SocketEventHandlers/SocketMessageEvents.js'
import { P5Events } from './DrawingEventHandlers/p5Events.js'
let p5Sketch = new p5(sketch)

P5Events(p5Sketch)

p5Sketch.socket.on('connect', () => {
    const { nickname } = Qs.parse(location.search, {
        ignoreQueryPrefix: true
    })

    p5Sketch.socket.on('disconnect', () => {
    });

    p5Sketch.socket.emit('connected', nickname);

    var eventHandlers = {
        DrawEvents: new SocketDrawEvents(p5Sketch),
        MessageEvents: new SocketMessageEvents()
    }

    for (let category in eventHandlers) {
        let handler = eventHandlers[category].handler
        for (let event in handler) {
            p5Sketch.socket.on(event, handler[event])
        }
    }
});



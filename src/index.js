const express = require('express');
const socket = require('socket.io');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.static('public'));

let server = app.listen(PORT);
let io = socket(server);

io.sockets.on('connection', (socket) => {
    console.log('new connection: ' + socket.id);

    socket.on('someoneDrew', (data) => {
        socket.broadcast.emit('someoneDrew', data);
    })

    socket.on('board setup', (gp) => {
        io.to(socket.id).emit('board setup', gp);
    })

    socket.broadcast.emit('new connection', socket.id)
})


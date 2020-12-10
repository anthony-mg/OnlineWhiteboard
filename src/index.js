const express = require('express');
const socket = require('socket.io');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.static('public'));

let server = app.listen(PORT);
let io = socket(server);
let points = []

io.sockets.on('connection', (socket) => {
    console.log('new connection: ' + socket.id);

    socket.on('someoneDrew', (data) => {
        points.push(data)
        socket.broadcast.emit('someoneDrew', data);
    })

    io.to(socket.id).emit('load', points)

    socket.on('clear', (message) => {
        points.length = 0;
        socket.broadcast.emit('clear', message)
    })
})


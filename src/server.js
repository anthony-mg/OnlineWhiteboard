const express = require('express');
const socket = require('socket.io');
const PORT = process.env.PORT || 5000;

const app = express();
let server = app.listen(PORT);
let io = socket(server);

app.use(express.static('public'));

let points = []

io.on('connection', (socket) => {
    console.log('new connection: ' + socket.id);

    socket.on('someoneDrew', (data) => {
        points.push(data)
        socket.broadcast.emit('someoneDrew', data);
    })

    socket.on('clear', (message) => {
        points.length = 0;
        socket.broadcast.emit('clear', message)
    })

    socket.on('load', (message) => {
        io.to(socket.id).emit('load', points)
    })

    io.to(socket.id).emit('load', points)
})


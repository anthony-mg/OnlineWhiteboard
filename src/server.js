const express = require('express');
const socket = require('socket.io');
const expressSession = require('express-session')
const mainRoutes = require('./routes/mainRoutes')
const PORT = process.env.PORT || 5000;

const app = express();
let server = app.listen(PORT);
let io = socket(server);

app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));

app.use(expressSession({ secret: 'your secret', saveUninitialized: true, resave: false }));
app.use(mainRoutes);



let points = []
io.on('connection', (socket) => {
    console.log('new connection: ' + socket.id);

    socket.on('disconnect', (reason) => {
        console.log(`disconecting: ${socket.id}\n\t because: ${reason}`);
    })
    socket.on('someoneDrew', (data) => {
        points.push(data)
        socket.broadcast.emit('someoneDrew', data);
    })

    socket.on('load', (message) => {
        io.to(socket.id).emit('load', points)
    })

    io.to(socket.id).emit('load', points)
})





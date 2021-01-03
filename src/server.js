const express = require('express');
const socket = require('socket.io');
const expressSession = require('express-session')
const mainRoutes = require('./routes/mainRoutes')
const MessageBuilder = require('./MessageBuilder.js');
const PORT = process.env.PORT || 5000;
const app = express();
let server = app.listen(PORT);
let io = socket(server);

app.use(express.urlencoded({
    extended: true
}));

app.use(expressSession({ secret: '!()@*AKL23KAD)!', saveUninitialized: true, resave: false }));
app.use(mainRoutes);
app.use(express.static('public'));

let points = []
let messages = []

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

    socket.on('message', (message) => {
        formattedMessage = MessageBuilder.formatUserMessage(app.session.nickname, message);
        messages.push(formattedMessage);
        console.log(messages)
        io.emit('message', formattedMessage);
    })

    socket.on('loadMessages', () => {
        io.to(socket.id).emit('loadMessages', messages);
    })

    let systemMessage = MessageBuilder.formatServerMessage(`${app.session.nickname} has joined! Welcome :^)`)
    messages.push(systemMessage);
    socket.broadcast.emit('message', systemMessage);
    io.to(socket.id).emit('load', points)
    io.to(socket.id).emit('loadMessages', messages);
})







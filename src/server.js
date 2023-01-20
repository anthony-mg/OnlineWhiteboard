const express = require("express");
const socket = require("socket.io");
const mainRoutes = require("./routes/mainRoutes");
const MessageBuilder = require("./MessageBuilder.js");
const PORT = 3100;
const app = express();
let server = app.listen(PORT);
let io = socket(server);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(mainRoutes);
app.use(express.static("public"));

let points = [];
let messages = [];
let users = {};

io.on("connection", (socket) => {
  console.log("new connection: " + socket.id);

  socket.on("disconnect", (reason) => {
    console.log(`disconecting: ${socket.id}\n\t because: ${reason}`);
    let systemMessage = MessageBuilder.formatServerMessage(`${users[socket.id]} has left.`);
    delete users[socket.id];
    messages.push(systemMessage);
    io.emit("message", systemMessage);
  });
  socket.on("someoneDrew", (data) => {
    points.push(data);
    socket.broadcast.emit("someoneDrew", data);
  });

  socket.on("load", (message) => {
    io.to(socket.id).emit("load", points);
  });

  socket.on("message", (message) => {
    formattedMessage = MessageBuilder.formatUserMessage(message.nickname, message.text);
    messages.push(formattedMessage);
    io.emit("message", formattedMessage);
  });

  socket.on("loadMessages", () => {
    io.to(socket.id).emit("loadMessages", messages);
  });

  socket.on("connected", (nickname) => {
    users[socket.id] = nickname;
    let systemMessage = MessageBuilder.formatServerMessage(`${nickname} has joined! Welcome :^)`);
    messages.push(systemMessage);
    socket.broadcast.emit("message", systemMessage);
    io.to(socket.id).emit("loadMessages", messages);
  });

  socket.on("disconnect", (reason) => {});

  io.to(socket.id).emit("load", points);
});

export var SocketNetworkEvents = function () {
  this.messageContainer = document.querySelector(".message-container");

  this.handler = {
    connect: connect.bind(this),
    disconnect: disconnect.bind(this),
  };
};

function connect() {
  console.log("hello user");
}

function disconnect() {
  console.log("goodbye user");
}

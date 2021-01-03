export var SocketNetworkEvents = function () {
    this.messageContainer = document.querySelector('.message-container');

    this.handler = {
        connect: connect.bind(this),
        disconnect: disconnect.bind(this)
    };
}

function connect() {

}

function disconnect() {
    console.log("SEE YA");
}
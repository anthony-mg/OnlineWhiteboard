export var SocketMessageEvents = function () {
    this.messageContainer = document.querySelector('.message-container');

    this.handler = {
        message: message.bind(this),
        loadMessages: loadMessages.bind(this)
    };

    this.outputMessage = (message) => {
        const div = document.createElement('div');
        div.classList.add('message');
        div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p><p class="text" >${message.text}</p>`;
        this.messageContainer.appendChild(div);
    }
}

function message(message) {
    this.outputMessage(message);

    this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
}

function loadMessages(messages) {
    for (let i = 0; i < messages.length; i++) {
        console.log(message[i])
        this.outputMessage(messages[i])
    }
    this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
}
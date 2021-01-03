const moment = require('moment');

const escape = require('escape-html');

function formatUserMessage(username, text) {
    text = escape(text);
    return {
        username,
        text,
        time: moment().format('h:mm a')
    }
}

function formatServerMessage(text) {
    text = escape(text);
    return {
        username: 'System',
        text,
        time: moment().format('h:mm a')
    }
}
module.exports = {
    formatUserMessage,
    formatServerMessage

}
'use strict';

const appState = require('./appState');
const MessageParser = require('../class/messageParser');
const messageParser = new MessageParser();

const bot = appState.bot;

let reader = {
	parser: messageParser
};

// listen to private messages and untargetted group chat messages
bot.on('groupMessage', (message) => onMessage);
bot.on('privateMessage', (message) => onMessage);

module.exports = reader;

/**
 * module methods
 */

function onMessage(message) {
	if (message.isCommand) { return false; }
	let readMessage = messageParser.parseText(message.body);

	bot.emit('parsedMessage', {
		original: message,
		parsed: readMessage
	});
}
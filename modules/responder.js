'use strict';

const appState = require('./appState');
const messageReader = require('./messageReader');
const messageHandler = require('./messageHandler');

const bot = appState.bot;

let responder = {};

let keywords = {
	xyzzy : /xyzzy/i
};

bot.on('message', (message) => {
	if (keywords.xyzzy.test(message.body)) {
		bot.postMessage(message.from, 'Nothing happens...');
	}
});

bot.on('botCommand', (message) => {
	appState.emit('botCommand', message);
});

bot.on('atMention', (message) => {
	bot.postMessage(message.from, `Hey there, ${message.from.getResource()}...`);
});

bot.on('nameMention', (message) => {
	bot.postMessage(message.channel, `yup`);
});

bot.on('channelMention', (message) => {
	bot.postMessage(message.channel, `Present!`);
});

bot.on('parsedMessage', (message) => {
	// do nothing
});

module.exports = responder;
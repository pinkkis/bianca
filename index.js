'use strict';

const config = require('./modules/config');
const logger = require('./modules/logger');
const web = require('./modules/web');
const appComm = require('./modules/appComm');

// init app based on type and options
let bot = require('./modules/botInit');

bot.connect();

let xyzzy = /xyzzy/i;

bot.on('connected', () => {
	appComm.bot = bot;
	appComm.emit('bot');
});

bot.on('message', (message) => {
	if (xyzzy.test(message.body)) {
		bot.postMessage(message.from, 'Nothing happens...');
	}
});

bot.on('atMention', (message) => {
	bot.postMessage(message.from, `Hey there, ${message.from.getResource()}`);
});

bot.on('nameMention', (message) => {
	bot.postMessage(message.channel, `yup`);
});

bot.on('channelMention', (message) => {
	bot.postMessage(message.channel, `Present!`);
});
'use strict';

const util = require('util');
const fs = require('fs-extra');
const argv = require('yargs').argv;

const config = require('./modules/config');
const logger = require('./modules/logger');
logger.createLogDirectory();
// const redis = require('./modules/redis');

const Bot = require('./class/bot');

let botOptions = {
	reconnect: true,
	keepAliveTime: 60000,
	jid: argv.jid,
	password: argv.password,
	host: 'chat.hipchat.com',
	mucHost: 'conf.hipchat.com'
};

let bot = new Bot(botOptions);
bot.connect();

let xyzzy = /xyzzy/i;

bot.on('message', (message) => {
	if (xyzzy.test(message.body)) {
		bot.postMessage(message.from, 'Nothing happens...');
	}
});

bot.on('atMention', (message) => {
	bot.postMessage(message.from, 'Hey there');
});
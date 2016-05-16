'use strict';

const appState = require('./appState');
const logger = require('./logger');
const messageReader = require('./messageReader');
const bot = appState.bot;

appState.on('botCommand', onCommand);

let handler = null;

module.export = handler;

/**
 * methods
 */

function onCommand(message) {
	if (!message.isCommand) { return false; }

	let command = message.commandParams[1];
	let params = message.commandParams[2];

	switch (command) {
		case 'time':
			console.log('command recognized');
			let time = new Date();
			bot.postMessage(message.from, `At the tone, the time will be ${time.toISOString()}. *beep*`);
			break;

		case 'sentiment':
			let result = messageReader.parser.parseText(params);

			let resultStrings = result.map((message) => {
				return `${message.string} -> score: ${message.sentiment.score}, positive: ${message.sentiment.positive.join(',')}, negative: ${message.sentiment.negative.join(',')}`;
			});

			bot.postMessage(message.from, `Sentiment results:\n${resultStrings.join('\n')}`);
			break;

		case 'part':
			if (message.type === 'chat') {
				return bot.postMessage(message.from, `Can't 'part' a 1 on 1 conversation, luv.`);
			}

			bot.postMessage(message.from, `Ok, leaving the room, farewell forever!`);
			bot.partRoom(message.channel);
			break;

		case 'join':
			if (!params) {
				return bot.postMessage(message.from, `Please provide a room name for me to join.`);
			}

			let roomIdx = bot.rooms.map((room) => {
				return room.name.toUpperCase();
			}).indexOf(params.toUpperCase());

			if (roomIdx > -1) {
				bot.postMessage(message.from, `Ok, trying to join "${params}".`);
				bot.joinRoom(bot.rooms[roomIdx].jid, 0);
			} else {
				bot.postMessage(message.from, `Sorry, I don't know what room "${params}" is.`);
			}

			break;

		default:
			bot.postMessage(message.from, `Sorry, command <${command}|${params}> not recognized.`);
	}
}
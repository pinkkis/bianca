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

			bot.postMessage(message.from, `Sentiment results for ${params}:\n${resultStrings.join('\n')}`);
			break;

		default:
			bot.postMessage(message.from, `Sorry, command <${command}|${params}> not recognized.`);
	}
}
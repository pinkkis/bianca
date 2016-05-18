'use strict';

const Plugin = require('../class/plugin');
const plugin = new Plugin(
	'command',
	'sentiment',
	(appState, message) => {
		let params = message.commandParams[2];
		let result = require('../modules/messageReader').parser.parseText(params);

		let resultStrings = result.map((message) => {
			return `${message.string} -> score: ${message.sentiment.score}, positive: ${message.sentiment.positive.join(',')}, negative: ${message.sentiment.negative.join(',')}`;
		});

		appState.bot.postMessage(message.from, `Sentiment results:\n${resultStrings.join('\n')}`);
	}
);

module.exports = plugin;

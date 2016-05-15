'use strict';

const tokenizer = require('sbd');
const sentiment = require('sentiment');
const logger = require('../modules/logger');

class MessageParser {
	constructor(options) {
		options = options || {};
		this.options = options;
	}

	parseText(messageString) {
		if (!messageString) { return []; }

		let sentences = [];
		let strings = tokenizer.sentences(messageString, this.options);

		strings.forEach((string) => {
			sentences.push({
				string: string,
				sentiment: sentiment(string)
			});
		});

		logger.info('messageParser result', sentences);
		return sentences;
	}
}

module.exports = MessageParser;
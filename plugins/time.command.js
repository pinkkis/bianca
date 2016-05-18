'use strict';

const Plugin = require('../class/plugin');
const plugin = new Plugin(
	'command',
	'time',
	(appState, message) => {
		let time = new Date();
		appState.bot.postMessage(message.from, `At the tone, the time will be ${time.toISOString()}. *beep*`);
	}
);

module.exports = plugin;
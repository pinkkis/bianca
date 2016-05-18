'use strict';

const Plugin = require('../class/plugin');
const plugin = new Plugin(
	'command',
	'part',
	(appState, message) => {
		if (message.type === 'chat') {
			return appState.bot.postMessage(message.from, `Can't 'part' a 1 on 1 conversation, luv.`);
		}

		appState.bot.postMessage(message.from, `Ok, leaving the room, farewell forever!`);
		appState.bot.partRoom(message.channel);
	}
);

module.exports = plugin;

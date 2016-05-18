'use strict';

const Plugin = require('../class/plugin');
const plugin = new Plugin(
	'command',
	'join',
	(appState, message) => {
		let params = message.commandParams[2];
		if (!params) {
			return appState.bot.postMessage(message.from, `Please provide a room name for me to join.`);
		}

		let roomIdx = appState.bot.rooms.map((room) => {
			return room.name.toUpperCase();
		}).indexOf(params.toUpperCase());

		if (roomIdx > -1) {
			appState.bot.postMessage(message.from, `Ok, trying to join "${params}".`);
			appState.bot.joinRoom(bot.rooms[roomIdx].jid, 0);
		} else {
			appState.bot.postMessage(message.from, `Sorry, I don't know what room "${params}" is.`);
		}
	}
);

module.exports = plugin;

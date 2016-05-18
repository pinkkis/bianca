'use strict';

class Plugin {
	constructor(type, keyword, plugin) {
		if (!type || typeof type !== 'string') {
			throw new Error('type must be a string <command|message>');
		}
		if (!keyword || typeof keyword !== 'string') {
			throw new Error('keyword must be a string');
		}
		if (!plugin || typeof plugin !== 'function') {
			throw new Error('plugin must be a function');
		}

		this.type = type;
		this.keyword = keyword;
		this.plugin = plugin;
	}

	trigger(appState, message) {
		if (this.type === 'command' && message.isCommand) {
			if (message.commandParams[1] == this.keyword) {
				return this.plugin(appState, message);
			}
		}

		if (this.type === message.type) {
			return this.plugin(appState, message);
		}
	}
}

module.exports = Plugin;
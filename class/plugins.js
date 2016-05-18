'use strict';

const Plugin = require('./plugin');
const logger = require('../modules/logger');
const fs = require('fs-extra');
const path = require('path');

class Plugins {
	constructor(appState) {
		this.initialized = false;
		this.appState = appState;
		this.plugins = [];
	}

	loadPlugins() {
		let pluginPath = path.join(__dirname, '..', 'plugins');

		fs.readdirSync(pluginPath).forEach((file) => {
			logger.info(`Loading plugin ${file}`);
			this.plugins.push( require(`../plugins/${file}`) );
		});

		this.appState.emit('pluginsLoaded');
	}

	addPlugin(plugin) {
		if (plugin instanceof Plugin) {
			this.plugins.push(plugin);
		}
	}

	trigger(message) {
		this.plugins.forEach((plugin) => {
			plugin.trigger(this.appState, message);
		});
	}
}

module.exports = Plugins;
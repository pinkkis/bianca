'use strict';

const appState = require('./appState');
const logger = require('./logger');
const messageReader = require('./messageReader');
const plugins = require('./plugins');
const bot = appState.bot;

const handler = {
	onCommandHandler: onCommandHandler,
	onMessageHandler: onMessageHandler
};

appState.on('botCommand', onCommandHandler);
appState.on('message', onMessageHandler)

module.export = handler;

/**
 * methods
 */

function onMessageHandler(message) {
	// nothing yet
}

function onCommandHandler(message) {
	if (!message.isCommand) { return false; }

	plugins.trigger(message);

	// TODO: need a way to trigger when no command matched
	// bot.postMessage(message.from, `Sorry, command <${command}|${params}> not recognized.`);
}
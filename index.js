'use strict';

const config = require('./modules/config');
const logger = require('./modules/logger');
const redis = require('./modules/redis');
const web = require('./modules/web');
const appState = require('./modules/appState');

// init app based on type and options
let bot = require('./modules/botInit');

appState.bot = bot;
appState.bot.connect();
appState.bot.on('connected', () => {
	appState.emit('botConnected');
});

// init messageParser and responder
let messageReader = require('./modules/messageReader');
let messageResponder = require('./modules/responder');
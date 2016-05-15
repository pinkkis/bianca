'use strict';

const AppState = require('../class/appState');
const logger = require('./logger');
const appState = new AppState();

logger.info('AppState emitter initialized');

module.exports = appState;
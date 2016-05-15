'use strict';

const argv = require('./args');
const config = require('./config');
const logger = require('./modules/logger');
logger.createLogDirectory();

const appState = require('./appState');

// promisify other libs
const bluebird = require('bluebird');
bluebird.promisifyAll([
	require('fs-extra'),
	require('redis'),
	require('request')
]);
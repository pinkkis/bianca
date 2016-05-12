'use strict';

const argv = require('yargs')
	.usage('Usage: $0 --jid <username> --password <password> --type [hipchat]')
	.demand(['u', 'p'])
	.describe('t', 'Bot type (Only Hipchat available for now)')
	.alias('u', 'username')
	.alias('p', 'password')
	.alias('t', 'type')
	.argv;

const config = require('./config');
const logger = require('./modules/logger');
logger.createLogDirectory();

// promisify other libs
const bluebird = require('bluebird');
bluebird.promisifyAll([
	require('fs-extra'),
	require('redis'),
	require('request')
]);
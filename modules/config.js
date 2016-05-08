'use strict';

const pkg = require('../package.json');
const bluebird = require('bluebird');
const argv = require('yargs')
				.usage('Usage: $0 --jid <username> --password <password>')
				.demand(['j', 'p'])
				.alias('j', 'jid')
				.alias('p', 'password')
				.argv;

// promisify other libs
bluebird.promisifyAll([
	require('fs-extra'),
	require('redis'),
	require('request')
]);

let config = {};

/**
 * Get package json details
 */

config.app = {
	name: pkg.name,
	version: pkg.version,
	description: pkg.description
};

Object.assign(config, require('../config/default.json'));

// if (process.env.NODE_ENV === 'production') {
// 	config = _.assignIn(config, require('../config/production.json'));
// }

module.exports = config;
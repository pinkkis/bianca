'use strict';

const pkg = require('../package.json');
const argv = require('yargs').argv;

let config = {
	credentials: {
		username: argv.username,
		password: argv.password
	}
};

if (argv.type) {
	config.botType = argv.type;
}

/**
 * Get package json details
 */

config.app = {
	name: pkg.name,
	version: pkg.version,
	description: pkg.description
};

Object.assign(config, require('../config/default.json'));

if (process.env.NODE_ENV === 'production') {
	Object.assign(config, require('../config/production.json'));
}

module.exports = config;
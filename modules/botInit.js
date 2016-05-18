'use strict';

const config = require('./config.js');
module.exports = (() => {
	let options = {};

	switch (config.botType) {
		case 'hipchat':
			const Hipchat = require('bianca-hipchat');

			options = {
				reconnect: config.reconnect,
				keepAliveTime: config.keepAliveTime,
				jid: config.credentials.username,
				password: config.credentials.password,
				host: config.hipchat.host,
				mucHost: config.hipchat.mucHost,
				logger: require('./logger')
			};

			return new Hipchat(options);

		default:
			throw new Error('Only `hipchat` botType supported');
	}
})();
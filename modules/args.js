'use strict';

const argv = require('yargs')
	.usage('Usage: $0 --jid <username> --password <password> --type [hipchat]')
	.option('username', {
		alias: 'u',
		describe: 'Username for connecting to the chat network',
		demand: true
	})
	.option('password', {
		alias: 'p',
		describe: 'Password for connecting to the chat network',
		demand: true
	})
	.option('type', {
		alias: 't',
		describe: 'type the chat network, currently only `hipchat`',
		demand: false,
		default: 'hipchat'
	})
	.option('webport', {
		alias: 'w',
		describe: 'run web interface on this port',
		demand: false,
		default: '6500'
	})
	.help()
	.wrap(70)
	.argv;

	console.log('Command line arguments', argv);

module.exports = argv;

'use strict';

const winston = require('winston');
const fs = require('fs-extra');
const path = require('path');
const argv = require('yargs');

const logDir = path.normalize(__dirname + '/../logs');

let logger = new winston.Logger({
	transports: [
		new winston.transports.File({
			// logstash: true
			name: 'info-log',
			level: 'info',
			filename: `${logDir}/all-logs.log`,
			handleExceptions: true,
			json: true,
			maxsize: 5242880, //5MB
			maxFiles: 3,
			humanReadableUnhandledException: true,
			colorize: false

		}),
		new winston.transports.File({
			// logstash: true
			name: 'error-log',
			level: 'error',
			filename: `${logDir}/error-logs.log`,
			handleExceptions: true,
			json: true,
			maxsize: 5242880, //5MB
			maxFiles: 2,
			humanReadableUnhandledException: true,
			colorize: false

		}),
		new winston.transports.Console({
			name: 'debug-output',
			level: 'debug',
			handleExceptions: true,
			prettyPrint: true,
			colorize: true
		})
	],
	exitOnError: false
});

/**
 * Morgan stream
 */
logger.stream = {
	write: function (message, encoding) {
		logger.info(message);
	}
};

logger.createLogDirectory = createLogDirectory;

module.exports = logger;

// methods
function createLogDirectory() {
	try {
		fs.ensureDirSync(logDir);
	} catch (err) {
		throw new Error(`## Logger failed to create log directory at ${logDir} with ${err}`);
	} finally {
		// TODO
		// what if this fails?
	}
}
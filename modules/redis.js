'use strict';

const config = require('./config');
const redis = require('redis');
const logger = require('./logger');

let clientOpts = {
	host: config.redis.host
};

let client = redis.createClient(clientOpts);

client.on('error', (err) => logger.error);
client.on('end', (e) => logger.info);
client.on('ready', (e) => logger.info);
client.on('reconnecting', (e) => logger.info);
client.on('warning', (warning) => logger.warn);

module.exports = client;
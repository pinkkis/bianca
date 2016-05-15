'use strict';

const config = require('./config');
const redis = require('redis');
const logger = require('./logger');
const appState = require('./appState');

let clientOpts = {
	port: process.env.REDIS_PORT_6379_TCP_PORT || config.redis.port,
	host: process.env.REDIS_PORT_6379_TCP_ADDR || config.redis.host
};

let client = redis.createClient(clientOpts);

client.on('error', (err) => logger.error);
client.on('end', (e) => logger.info);
client.on('ready', (e) => logger.info);
client.on('reconnecting', (e) => logger.info);
client.on('warning', (warning) => logger.warn);

module.exports = client;
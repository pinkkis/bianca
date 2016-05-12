'use strict';

const AppComm = require('../class/appComm');
const logger = require('./logger');
const appComm = new AppComm();

logger.info('AppComm emitter initialized');

module.exports = appComm;
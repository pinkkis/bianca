'use strict';

const logger = require('./logger');
const appState = require('./appState');
const Plugins = require('../class/plugins');

const plugins = new Plugins(appState);

plugins.loadPlugins();

module.exports = plugins;

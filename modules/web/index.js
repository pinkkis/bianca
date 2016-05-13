'use strict';

const config = require('../config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const logger = require('../logger');
const appComm = require('../appComm');

app.set('port', process.env.WEB_PORT || config.web.port || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use('/', express.static(`${__dirname}/public`));

// app.get('/', (req, res) => {
// 	res.sendFile(__dirname + '/public/index.html');
// });

io.on('connection', (socket) => {
	logger.debug('socket#connect');

	socket.emit('botConnected', {
		rooms: appComm.bot.rooms,
		roster: appComm.bot.roster,
		profile: appComm.bot.profile
	});

	appComm.bot && appComm.bot.on('roomsUpdate', (rooms) => {
		socket.emit('roomsUpdate', rooms);
	});

	appComm.bot && appComm.bot.on('rosterUpdate', (roster) => {
		socket.emit('rosterUpdate', roster);
	});

	appComm.bot && appComm.bot.on('message', (message) => {
		socket.volatile.emit('botMessage', message);
	});

	appComm.bot && appComm.bot.on('disconnected', (message) => {
		socket.emit('botDisconnected', message);
	});

	appComm.bot && appComm.bot.on('reconnecting', (message) => {
		socket.emit('botReconnecting', message);
	});

	appComm.bot && appComm.bot.on('offline', (message) => {
		socket.emit('botOffline', message);
	});

	appComm.bot && appComm.bot.on('error', (message) => {
		socket.emit('botError', message);
	});

	appComm.bot && appComm.bot.on('startup', (message) => {
		socket.emit('botStartup', message);
	});

	if (appComm.bot) {
		socket.emit('botProfile', appComm.bot.profile);
	} else {
		appComm.bot.on('profile', (profile) => {
			socket.emit('botProfile', appComm.bot.profile);
		});
	}
});

server.listen(3000, '0.0.0.0', () => {
	logger.info(`Express listening on port 3000`);
});

process.on('SIGTERM', shutdown);

function shutdown() {
	logger.warn('Express - Termination signal received');
}

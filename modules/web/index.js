'use strict';

const config = require('../config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const logger = require('../logger');
const appState = require('../appState');

passport.use(new BasicStrategy(
	function (username, password, done) {
		if (username === 'foo' && password === 'bar') {
			return done(null, {
				username: 'foo'
			});
		} else {
			return done(null, null);
		}
	}
));

app.set('port', process.env.WEB_PORT || config.web.port || 6500);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

//app.use('/', express.static(`${__dirname}/public`));
app.use('/', passport.authenticate('basic', {session: false}), (req, res) => {
	res.sendFile(`${__dirname}/public/index.html`);
});

io.on('connection', (socket) => {
	logger.debug('web:socket#connect');

	socket.emit('botConnected', {
		rooms: appState.bot.rooms,
		roster: appState.bot.roster,
		profile: appState.bot.profile,
		presences: appState.bot.presences
	});

	appState.bot.on('roomsUpdate', (rooms) => {
		socket.emit('botRooms', rooms);
	});

	appState.bot.on('rosterUpdate', (roster) => {
		socket.emit('botRoster', roster);
	});

	appState.bot.on('message', (message) => {
		socket.volatile.emit('botMessage', message);
	});

	appState.bot.on('presenceUpdate', (message) => {
		socket.volatile.emit('botPresence', appState.bot.presences);
	});

	appState.bot.on('disconnected', (message) => {
		socket.emit('botDisconnected', message);
	});

	appState.bot.on('reconnecting', (message) => {
		socket.emit('botReconnecting', message);
	});

	appState.bot.on('offline', (message) => {
		socket.emit('botOffline', message);
	});

	appState.bot.on('error', (message) => {
		socket.emit('botError', message);
	});

	appState.bot.on('startup', (message) => {
		socket.emit('botStartup', message);
	});

	socket.emit('botProfile', appState.bot.profile);
});

server.listen(app.get('port'), '0.0.0.0', () => {
	logger.info(`Express listening on port ${app.get('port')}...`);
});

process.on('SIGTERM', shutdown);

function shutdown() {
	logger.warn('Express - Termination signal received');
}

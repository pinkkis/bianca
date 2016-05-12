'use strict';

const config = require('../config');
const app = require('express')();
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

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
	logger.debug('socket#connect');
	socket.emit('news', { hello: 'world' });

	socket.on('someEvent', (data) => {
		logger.debug('socket#someEvent', data);
	});

	appComm.bot && appComm.bot.on('message', (message) => {
		socket.emit('message', message);
	});

	if (appComm.bot) {
		socket.emit('profile', appComm.bot.profile);
	} else {
		appComm.bot.once('profile', (profile) => {
			socket.emit('profile', profile);
		});
	}
});

server.listen(3000, '0.0.0.0', () => {
	logger.info(`Express listening on port 3000`);
});

process.on('SIGTERM', shutdown);
//process.on('SIGUSR2', shutdown);

function shutdown() {
	logger.warn('Termination signal received, express server closing...');

	// server.close(() => {
 	// 	//process.exit(0);
	// });
}

var cookieParser = require('cookie-parser');
var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var lo = require('lodash');

var app = express();
var port;
var server = http.createServer(app);

var game = require('./game.route');


module.exports = {
	init: init,
};

function loadResources() {
	// register new routes here
	app.use('/game', game);
}

function init(cb) {
	console.log('Initializing REST API');
	app.disable('etag');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: false,
	}));
	app.use(cookieParser());
	app.use(cors());

	app.use(morgan('dev'));

	loadResources();
	
	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// error handler
	app.use(function(err, req, res, next) {
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};

		// render the error page
		res.status(err.status || 500);
		res.json(err);
	});

	
	startWebService(cb);
}

function startWebService(cb) {
	port = normalizePort(process.env.PORT || '9100');
	app.set('port', port);
	app.set('view engine', 'jade');

	server.on('error', (err) => {
		onError(err);
	});

    process.on('SIGINT', function() {
        server.close();
        process.exit();
      });

	server.on('listening', () => {
		var addr = server.address();
		var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
		console.log('Listening on ' + bind);
		if(cb)
			return cb();
	});

	server.listen(port);
}



function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	console.log('Listening on ' + bind);
}


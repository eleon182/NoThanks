var express = require('express');
var lo = require('lodash');

var router = express.Router();

var game = require('../service/game');

router.get('/', function(req, res, next) {
	var response = game.getGame();
	return res.json(response);
});

router.post('/turn', function(req, res, next) {
	if (!req.body || !req.body.name) {
		return res.status(404).send('requiredName');
	}
	if (!req.body || !req.body.action) {
		return res.status(404).send('requiredAction');
	}

	var response = game.takeTurn(req.body.name, req.body.action);

	if (response) {
		return res.status(400).send(response);

	} else {
		return res.end();
	}
});

router.post('/draw', function(req, res, next) {
	if (!req.body || !req.body.name) {
		return res.status(404).send('requiredName');
	}

	var response = game.draw(req.body.name);

	if (response) {
		return res.status(400).json(response);

	} else {
		return res.end();
	}


});

router.post('/init', function(req, res, next) {
	var response = game.initGame();

	if (response) {
		return res.status(400).send(response);

	} else {
		return res.end();
	}

});

router.post('/start', function(req, res, next) {
	var response = game.startGame();

	if (response) {
		return res.status(400).send(response);

	} else {
		return res.end();
	}

});

router.post('/player', function(req, res, next) {

	if (!req.body || !req.body.name) {
		return res.status(404).send('requiredName');
	}

	var response = game.addNewPlayer(req.body.name);

	if (response) {
		return res.status(400).send(response);

	} else {
		return res.end();
	}

});

module.exports = router;

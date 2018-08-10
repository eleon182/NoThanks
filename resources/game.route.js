var express = require('express');
var lo = require('lodash');

var router = express.Router();

var game = require('../service/game');

router.get('/', function (req, res, next) {
    var response = game.getGame();
    res.json(response);
});

router.post('/turn', function (req, res, next) {
    if (!req.body || !req.body.name) {
        res.sendStatus(404).send('requiredName');
    }
    if (!req.body || !req.body.action) {
        res.sendStatus(404).send('requiredAction');
    }

    var response = game.takeTurn(req.body.name, req.body.action);

    if (response) {
        res.sendStatus(400).send(response);

    } else {
        res.end();
    }
});

router.post('/draw', function (req, res, next) {
    if (!req.body || !req.body.name) {
        res.sendStatus(404).send('requiredName');
    }

    var response = game.draw(req.body.name);

    if (response) {
        res.sendStatus(400).send(response);

    } else {
        res.end();
    }


});

router.post('/init', function (req, res, next) {
    var response = game.initGame();

    if (response) {
        res.sendStatus(400).send(response);

    } else {
        res.end();
    }

});

router.post('/start', function (req, res, next) {
    var response = game.startGame();

    if (response) {
        res.sendStatus(400).send(response);

    } else {
        res.end();
    }

});

router.post('/player', function (req, res, next) {

    if (!req.body || !req.body.name) {
        res.sendStatus(404).send('requiredName');
    }

    var response = game.addNewPlayer(req.body.name);

    if (response) {
        res.sendStatus(400).send(response);

    } else {
        res.end();
    }

});

module.exports = router;

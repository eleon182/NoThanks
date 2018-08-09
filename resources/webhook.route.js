var express = require('express');
var lo = require('lodash');

var router = express.Router();

var service = require('../service/webhook.service');
var common = require('../common');

router.post('/', function(req, res, next) {
    service.processMessage(req.body, (err, data) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.json(data);
        }
    });
});

module.exports = router;

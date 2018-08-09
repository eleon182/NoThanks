var express = require('express');
var async = require('async');
var debug = require('debug')('main');
var newrelic;

var resources = require('./resources');

console.log('Bootstrapping environment start');

async.series(
    [
        resources.init,
    ],
    function(err, results) {
        if (err) {
            console.log('Bootstrapping environment fail', err);
            process.exit(1);
        } else {
            console.log('Bootstrapping environment success');
        }
    }
);

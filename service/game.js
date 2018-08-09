var async = require('async');
var lo = require('lodash');

module.exports = {
	initGame: initGame,
	name: name,
};

var game;

initGame();

console.log(game);
function initGame() {
	game = {
		players: {},
		deck: initNewDeck(),
		turn: 0,
		currentPlayer: false
	};
}

function initNewDeck() {
	var resp = [];

	for(var i = 3; i <=35; i++) {
		resp.push(i);
	}
	return resp;
}

function addNewPlayer(name) {
	if(game.turn > 0) {
		return false;
	}

	var player = {
		cards: [],
		coins: 11,
		name: name
	}

	game.players[name] = player;
	return player;
}

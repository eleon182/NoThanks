var async = require('async');
var lo = require('lodash');

module.exports = {
	initGame: initGame,
	startGame: startGame,
	addNewPlayer: addNewPlayer,
	getGame: getGame,
	draw: draw,
	takeTurn: takeTurn
};

var game;
initGame();

function getGame() {
	return {
		players: game.players,
		turn: game.turn,
		playerOrder: game.playerOrder,
		currentPlayer: game.playerOrder[game.currentPlayer],
		shownCard: game.shownCard,
		remainingCards: game.deck.length,
		pot: game.pot,
		score: calculateScore(),
		status: game.status
	};
}

function takeTurn(name, action) {
	if (action !== 'pass' && action !== 'take') {
		return 'unknownAction';
	}

	if (name !== game.playerOrder[game.currentPlayer]) {
		return 'wrongPlayer';
	}

	if (!game.shownCard) {
		return 'noCardDraw';
	}

	if (!game.players[name]) {
		return 'playerNotRegistered';
	}

	if (action === 'pass' && game.players[name].coins <= 0) {
		return 'noCoinsLeft';
	}

	if (action === 'pass') {
		game.players[name].coins--;
		game.pot++;
		game.turn++;
		nextPlayer();
		return false;
	}

	if (action === 'take') {
		game.turn++;
		game.players[name].cards.push(game.shownCard);
		game.players[name].cards = game.players[name].cards.sort();
		game.players[name].coins += game.pot;
		game.pot = 0;
		game.shownCard = false;
		nextPlayer();
		return false;
	}

	return 'errorAction';
}

function nextPlayer() {
	game.currentPlayer++;
	if (game.currentPlayer > (game.playerOrder.length - 1)) {
		game.currentPlayer = 0;
	}
}

function endGame() {
	game.status = 'done';
	game.score = calculateScore();
}

function calculateScore() {
	if (game.status !== 'done') {
		return {};
	}

	var response = {};
	var players = game.players;
	for (var key in players) {
		response[key] = calculateIndividualScore(players[key]);
	}

	return response;
}

function calculateIndividualScore(player) {
	var score = 0;

	var cards = player.cards;
	var current = 0;
	cards.forEach((card) => {
		if (card !== (current + 1)) {
			score += card;
		}
		current = card;
	})

	score -= player.coins;
	return score;
}

function draw(user) {
	if (game.deck.length <= 0) {
		endGame();
		return 'gameEnded';
	}

	if (game.status === 'initial') {
		return 'gameNotStarted';
	}

	if (game.shownCard) {
		return 'cardDrawn';
	}

	if (game.playerOrder[game.currentPlayer] !== user) {
		return 'wrongPlayer';
	}

	if (game.deck.length <= 0) {
		return 'deckEmpty';
	}

	game.shownCard = lo.take(game.deck)[0];
	game.deck = lo.tail(game.deck);
	return false;
}

function initGame() {
	if (game && game.status !== 'done') {
		return 'gameNotDone';
	}

	game = {
		players: {},
		deck: initNewDeck(),
		turn: 0,
		pot: 0,
		playerOrder: [],
		currentPlayer: false,
		shownCard: false,
		status: 'initial'
	};

	return false;
}

function startGame() {
	if (game.status === 'started') {
		return 'gameStarted';
	}

	if (game.status === 'done') {
		return 'gameDone';
	}

	if (game.playerOrder.length <= 1) {
		return 'morePlayersRequired';
	}

	console.log('Total players:', game.playerOrder);
	game.playerOrder = shuffle(game.playerOrder);
	console.log('Shuffling players', game.playerOrder);
	game.turn = 1;
	game.currentPlayer = 0;
	console.log('Current player:', game.playerOrder[0]);
	game.status = 'started';
	console.log('Starting game, turn 1');

	return false;
}

function initNewDeck() {
	var resp = [];

	for (var i = 3; i <= 35; i++) {
		resp.push(i);
	}
	return shuffle(resp);
}

function addNewPlayer(name) {
	if (game.turn > 0) {
		return 'gameStarted';
	}

	if (game.players[name]) {
		return 'playerExists';
	}

	var player = {
		cards: [],
		coins: 11,
		name: name
	}

	game.playerOrder.push(name);
	game.players[name] = player;
	return false;
}

function shuffle(a) {
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}

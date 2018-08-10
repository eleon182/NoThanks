Vue.config.devtools = true

new Vue({
	el: '#no-thanks',
	data: {
		loggedIn: false,
		watchMode: false,
		showJoinButton: false,
		showStartbutton: false,
		players: '',
		username: null,
		usernameInput: null,
		game: {}
	},
	//watch: {
	//question: function(newQuestion) {
	//this.answer = 'Waiting for you to stop typing...'
	//this.getAnswer()
	//}
	//},
	mounted: function() {
		setInterval(this.loadGame, 5000);
	},
	methods: {
		login: function() {
			if (!this.usernameInput) {
				return;
			}
			this.username = this.usernameInput;
			this.loggedIn = true;
		},
		loadGame: function() {
			var self = this;
			axios.get('/game')
				.then(function(response) {
					self.game = response.data;
					self.players = self.game.playerOrder.toString();
					self.detectWatchMode();
					self.checkJoinMode();
				})
				.catch(function(error) {
					console.log(error);
				})
		},
		startGame: function() {
			var self = this;
			axios.post('/game/start', {})
				.then(function(response) {
					self.showJoinButton = false;
				})
				.catch(function(error) {
					console.log(error);
				})
		},
		passCard: function() {
			var self = this;
			var body = {
				name: this.username,
				action: 'pass'
			};
			axios.post('/game/turn', body)
				.then(function(response) {
					console.log('Drew card');
				})
				.catch(function(error) {
					console.log(error);
				})
		},
		takeCard: function() {
			var self = this;
			var body = {
				name: this.username,
				action: 'take'
			};
			axios.post('/game/turn', body)
				.then(function(response) {
					console.log('Drew card');
				})
				.catch(function(error) {
					console.log(error);
				})
		},
		drawCard: function() {
			var self = this;
			var body = {
				name: this.username
			};
			axios.post('/game/draw', body)
				.then(function(response) {
					console.log('Drew card');
				})
				.catch(function(error) {
					console.log(error);
				})
		},
		drawCard: function() {
			var self = this;
			var body = {
				name: this.username
			};
			axios.post('/game/draw', body)
				.then(function(response) {
					console.log('Drew card');
				})
				.catch(function(error) {
					console.log(error);
				})
		},
		joinGame: function() {
			var self = this;
			var body = {
				name: this.username
			};
			axios.post('/game/player', body)
				.then(function(response) {
					self.showJoinButton = false;
				})
				.catch(function(error) {
					console.log(error);
				})
		},
		checkJoinMode: function() {
			var self = this;
			if (this.username && !this.game.players[this.username] && this.game.status === 'initial') {
				this.showJoinButton = true;
			} else {
				this.showJoinButton = false;
			}
		},
		detectWatchMode: function() {
			var self = this;
			if (!this.game.players[this.username] && this.game.status === 'started') {
				this.watchMode = true;
			} else {
				this.watchMode = false;
			}
		}
	}
})

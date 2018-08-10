Vue.config.devtools = true

new Vue({
	el: '#no-thanks',
	data: {
		loggedIn: false,
		watchMode: false,
		username: null,
		game: {}
	},
	//watch: {
		//question: function(newQuestion) {
			//this.answer = 'Waiting for you to stop typing...'
			//this.getAnswer()
		//}
	//},
	mounted: function() {
		setInterval(this.loadGame, 1000);
	},
	methods: {
		login: function() {
			console.log(this.username);
			this.loggedIn = true;
		},
		loadGame: function() {
			var self= this;
			axios.get('/game')
				.then(function(response) {
					self.game = response.data;
					self.detectWatchMode();
				})
				.catch(function(error) {
					console.log(error);
				})
		},
		detectWatchMode: function() {
			var self = this;
			if(!this.game.players[this.username] && this.game.status === 'started') {
				this.watchMode = true;
			} else {
				this.watchMode = false;
			}
		}
	}
})

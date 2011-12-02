MainController = (function() {
		
		var
			renderer,
			appView,
			mode,

			// Animation Loop
			loop,
			loops = 0,
			nextGameTick = (new Date).getTime();

		var
			// Constants
			FPS = 60,
			MAX_FRAME_SKIP = 10,
			SKIP_TICKS = 1000 / FPS;

		var
			// Ambient Searches
			ambTime = 4000,
			ambLoop;

		var
			// Terms
			terms,
			active,
			inactive,
			que;

		return {
			// Initialize Scene
			init: function(_terms, _mode) {
				log("Main Controller: " + _mode);
				mode = _mode;
				terms = _terms;

				this.initAnim();
				this.initAmbient();
				loop = setInterval(update, 1);
			},
			initAnim: function() {
				log("init Animation");
			},
			initAmbient: function() {
				log("Init Ambient");

				this.ambUpdate();

				//ambLoop = setTimeout(this.ambLoad, ambTime);
				ambLoop = setInterval(this.ambLoad, ambTime);
			},
			ambLoad: function(){
				log("AMB LOAD");

				if (que.length > 0){
					var newTerm = que.pop();
					active.push(newTerm);

					log(que);
					log(active);
					log(inactive);
				
				} else {
					// TODO: Load more results
				}

				//ambLoop = setTimeout(this.ambLoad, 100);
				// TODO: put random ambTime in
			},
			ambUpdate: function(_term){
				que = terms.que();
				active = terms.active();
				inactive = terms.inactive();
			},
			// Animate
			animate: function() {
				//
				loops++;
			},

			// Update
			update: function() {
				//broadcast update
				this.animate();
			},
			// Render
			render: function() {
				
			}
		};

})();

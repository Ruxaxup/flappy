
var obstaculos = {

	_pipes: [],
	_anchoP:[],
	// padding: 80, // TODO: Implement paddle variable

	/**
	 * Empty pipes array
	 */
	reset: function() {
		this._pipes = [];
		this._anchoP=[];
	},

	getAnchoPlataformas:function(){
		var num = plataformas.numPlataformas();
		for (var i = 0; i < num; i++) {
			this._anchoP[i]=plataformas.obtenAnchoPlataforma(i);
		};
	},

	obtenXPlataforma: function(i){
		var posicion = this._anchoP[i]/7;

		 return posicion * Math.floor((Math.random() * 6) + 1);
	},

	/**
	 * Create, push and update all pipes in pipe array
	 */
	update: function() {
		// add new pipe each 300 frames


		if (frames % 500 === 0) {
			this.getAnchoPlataformas();
			// calculate y position
			var _y =height- getAltura1();
			// create and push pipe to array
			this._pipes.push({
				x: width+ this.obtenXPlataforma(0),
				y: _y,
				width: s_pipeSouth.width,
				height: s_pipeSouth.height
			});

			// calculate y position
			var _y =height- getAltura2();
			// create and push pipe to array
			this._pipes.push({
				x: width+ this.obtenXPlataforma(1),
				y: _y,
				width: s_pipeSouth.width,
				height: s_pipeSouth.height
			});
		}
		for (var i = 0, len = this._pipes.length; i < len; i++) {
			var p = this._pipes[i];

			//checar colisiones

				score += p.x === personaje.x ? 1 : 0;

				// collision check, calculates x/y difference and
				// use normal vector length calculation to determine
				// intersection
				var cx  = Math.min(Math.max(personaje.x, p.x), p.x+p.width-50);
				//var cy1 = Math.min(Math.max(bird.y, p.y), p.y+p.height);
				var cy2 = Math.min(Math.max(personaje.y, p.y+p.height-100), p.y+2*p.height-100);
				// closest difference
				var dx  = personaje.x - cx;
				//var dy1 = bird.y - cy1;
				var dy2 = personaje.y - cy2;
				// vector length
				//var d1 = dx*dx + dy1*dy1;
				var d2 = dx*dx + dy2*dy2;
				var r = personaje.radius*personaje.radius;
				// determine intersection
				if (r > d2) {
					personaje.resetearValores();
					currentstate = states.Score;
				}
			// move pipe and remove if outside of canvas
			p.x -= 8;
			if (p.x < -p.width) {
				this._pipes.splice(i, 1);
				i--;
				len--;
			}
		}
	},

	/**
	 * Draw all pipes to canvas context.
	 * 
	 * @param  {CanvasRenderingContext2D} ctx the context used for
	 *                                        drawing
	 */
	draw: function(ctx) {
		for (var i = 0, len = this._pipes.length; i < len; i++) {
			var p = this._pipes[i];
			//s_pipeSouth.draw(ctx, p.x, p.y);
			s_pipeNorth.draw(ctx, p.x, p.y);
		}
	}
};
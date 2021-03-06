// Archivo encargado de los obstaculos
var obstaculos = {
	//El arreglo de pipes
	_pipes: [],
	//El arreglo del ancho de las plataformas
	_anchoP:[],

	//Resetea los arreglos
	reset: function() {
		this._pipes = [];
		this._anchoP = [];
	},
	//obtiene el ancho de las plataformas para poder colocar el pipe obre ellas adecuadamente 
	getAnchoPlataformas:function(){
		var num = plataformas.numPlataformas(); //el numero de plataformas que actualmente se muestran
		for (var i = 0; i < num; i++) {
			this._anchoP[i]=plataformas.obtenAnchoPlataforma(i); // se obtiene el ancho de la plataforma
		};
	},


	//Se encarga de dividir el ancho de la plataforma en 7 pedazos... esto para colocar al pipe de manera aleatoria
	//en cada uno de estos pedazos.
	obtenXPlataforma: function(i){
		var posicion = this._anchoP[i]/7;

		 return posicion * Math.floor((Math.random() * 6) + 1);
	},

	/**
		Verificamos si posX ya ha salido en los pipes
	*/
	isRepeated: function(posX,posiciones){
		for (var i = 0; i < posiciones.length; i++) {
			if(posX == posiciones[i])
				return true;
		}
		return false;
	},

	/**
		Llenamos el arreglo de Pipes para asegurarnos que no se repita la posicion 
		en X
	*/
	createPipes: function(){
		var plataforma = 0; //La plataforma actual calculandose
		var posiciones = new Array();
		posiciones[0] = -1;
		posiciones[1] = -1;
		posiciones[2] = -1;

		// [Falta comprobar el pipe superior]
		while(plataforma < 2){
			var posY = height - getAltura(plataforma);
			var posX = width + this.obtenXPlataforma(plataforma);

			while(this.isRepeated(posX,posiciones)){
				posX = width + this.obtenXPlataforma(plataforma);
			}
			posiciones[plataforma] = posX;
			this._pipes.push({
				x: posX,
				y: posY, //su altura
				width: s_pipeNorth.width, //ancho del sprite es asignado a la variable width
				height: s_pipeNorth.height //alto del sprite es asignado a la variable height
			});
			plataforma++;
		}
	},

	/**
	 * Create, push and update all pipes in pipe array
	 */
	update: function() {
		// se añade un pipe cada 500 frames


		if (frames % 500 === 500) {
			//se obtiene el ancho de plataformas
			this.getAnchoPlataformas();
			//Controla que no se repitan las pipes en Y
			this.createPipes();	
		}

		//ciclo que controla todo lo relacionado a la posición de los pipes e incluso si uno de estos fue tocado por el personaje
		for (var i = 0, len = this._pipes.length; i < len; i++) {
			var p = this._pipes[i];

			//checar colisiones

				score += p.x === personaje.x ? 1 : 0; //aumenta el score si se pasa por un pipe 

				// collision check, calculates x/y difference and
				// use normal vector length calculation to determine
				// intersection
				
				//var cx  = Math.min(Math.max(personaje.x, p.x), (p.x+p.width) - (p.width) );
				var cx  = Math.min(Math.max(personaje.x, p.x), p.x);

				//var cy1 = Math.min(Math.max(bird.y, p.y), p.y+p.height);
				var cy2 = Math.min(Math.max(personaje.y, p.y+p.height-100), p.y+2*p.height-100);
				// closest difference
				var dx  = (personaje.x + 30) - cx;
				var dy2 = personaje.y - cy2;
				// vector length
				var d2 = dx*dx + dy2*dy2;
				var r = personaje.radius*personaje.radius;
				// determine intersection
				if (r > d2) {
					personaje.resetearValores();
					currentstate = states.Score;
				}
			// mueve el pipe en el escenario y además lo elimina si ya no es visible
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
			s_pipeNorth.draw(ctx, p.x, p.y);
		}
	}
};
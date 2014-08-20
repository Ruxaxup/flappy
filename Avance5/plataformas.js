var alturaPlayer=112;
var altura1 = alturaPlayer*2;
var altura2 = alturaPlayer*3.5;

function calculaAltura() {
	var aux  =	Math.floor((Math.random() * 2) + 1); 
		var altura=0;
		switch(aux) {
    		 case 1:
       			 altura = height-altura1;
             break;
   			 case 2:
       			 altura = height-altura2;
      		 break;

   			 default:
        		alert("no existe altura");
        	 break;
		} 
		return altura;
}

function getAltura1(){
	return altura1;
}

function getAltura2(){
	return altura2;
}



var plataformas = {

	_obstaculos: [],
	// padding: 80, // TODO: Implement paddle variable

	/**
	 * Empty pipes array
	 */
	reset: function() {
		
		this._obstaculos = [];
	},

	obtenAnchoPlataforma: function(i){
		return this._obstaculos[i].width;
	},

	numPlataformas: function(){
		return this._obstaculos.length;
	},

	/**
	 * Create, push and update all pipes in pipe array
	 */
	update: function() {
		// add new pipe each 300 frames


		if (frames % 500 === 0) {

			// calculate y position
			//var _y = height - (s_fgObstaculo.height+s_fgObstaculo.height+30+140*Math.random());
			//width: s_fgPLataforma.width * Math.floor((Math.random() * 7) + 3),
			var _y = calculaAltura();

			// create and push pipe to array
			this._obstaculos.push({
				x: width+100,
				y: _y,
				width: s_fgPLataforma.width * 7,
				height: s_fgPLataforma.height,
				existe:true
			});
			//crea plataformas en la altura contraria 
			if(_y== height-altura1){
				this._obstaculos.push({
					x: width+100,
					y: height- altura2,
					width: s_fgPLataforma.width * 7,
					height: s_fgPLataforma.height,
					existe:true
				});
			}else{
				this._obstaculos.push({
					x: width+100,
					y: height- altura1,
					width: s_fgPLataforma.width *7,
					height: s_fgPLataforma.height,
					existe:true
				});
			}

		}
		for (var i = 0, len = this._obstaculos.length; i < len; i++) {
			var p = this._obstaculos[i];
			//checar colisiones

			score += p.x === personaje.x ? 1 : 0;

			// collision check, calculates x/y difference and
			// use normal vector length calculation to determine
			// intersection
			var cx  = Math.min(Math.max(personaje.x, p.x), p.x+p.width);
			//var cy1 = Math.min(Math.max(bird.y, p.y), p.y+p.height);
			var cy2 = Math.min(Math.max(personaje.y, p.y), p.y+p.height);
			// closest difference
			var dx  = personaje.x - cx;
			//var dy1 = bird.y - cy1;
			var dy2 = personaje.y - cy2;
			// vector length
			//var d1 = dx*dx + dy1*dy1;
			var d2 = dx*dx + dy2*dy2;
			var r = (personaje.radius*personaje.radius);
			// determine intersection
			if (r > d2) {
				//alert(personaje.y);
				//determina si esta por debajo del obstaculo
				//determina si esta por arriba del obstaculo
				if (personaje.y<p.y){
					personaje.resetearValores();
					personaje.velocity=0.25;
					personaje.y = p.y-35;
				}
			}
			
			// move pipe and remove if outside of canvas
			p.x -= 8;
			if (p.x < -p.width) {
				this._obstaculos.splice(i, 1);
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
		for (var i = 0, len = this._obstaculos.length; i < len; i++) {
			var p = this._obstaculos[i];
			//s_pipeSouth.draw(ctx, p.x, p.y);
			if(p.width<=s_fgPLataforma.width)
				s_fgPLataforma.draw(ctx, p.x, p.y);
			else{
				var repeticiones = p.width/s_fgPLataforma.width
				var num= s_fgPLataforma.width;
				var contador=0;
				while (repeticiones!=0){
    				s_fgPLataforma.draw(ctx, p.x+(num*contador), p.y);
    				contador++;
    				repeticiones--;
				}
				repeticiones=0;
			}

		}
	}
};
var alturaPlayer=112; //varible que contiene la altura del personaje... solo para determinar la altura a la que se va a colocar la plataforma
var altura1 = alturaPlayer*2;//altura de la primera plataforma
var altura2 = alturaPlayer*3.5;//altura de la 2da plataforma

//determina que altura va a colocar 
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
//obtener altura 1
function getAltura1(){
	return altura1;
}
//obtener altura 2
function getAltura2(){
	return altura2;
}

function getAltura(plataforma){
	return plataforma==0?altura1:altura2;
}


var plataformas = {

	_plataformas: [],

	/**
	 *Array de plataformas
	 */
	//resetea el array
	reset: function() {
		
		this._plataformas = [];
	},
	//obtiene el ancho de las plataformas
	obtenAnchoPlataforma: function(i){
		return this._plataformas[i].width;
	},
	//obtiene el numero de plataformas mostradas
	numPlataformas: function(){
		return this._plataformas.length;
	},

	/**
	 * Create, push and update all pipes in pipe array
	 */
	update: function() {
		// añade una nueva serie de platadormas cada 500 frames


		if (frames % 500 === 0) {

			// calcula la posición en "y" de la plataforma
			var _y = calculaAltura();

			// mete la plataforma en el arreglo
			this._plataformas.push({
				x: width+100,// se le agrega un 100 para que aparezca 100 pixeles fuera de la pantalla
				y: _y,
				width: s_fgPLataforma.width * 7, //se multiplica por 7 para hacer una plataforma del foreground, 7 veces su tamaño
				height: s_fgPLataforma.height, //se asigna el "alto" de la plataforma... haciendo referencia al alto del sprite
			});
			//crea plataformas en la altura contraria a la que se creo mas arriba...
			if(_y== height-altura1){
				this._plataformas.push({
					x: width+100,
					y: height- altura2,
					width: s_fgPLataforma.width * 7,
					height: s_fgPLataforma.height,
				});
			}else{
				this._plataformas.push({
					x: width+100,// se le agrega un 100 para que aparezca 100 pixeles fuera de la pantalla
					y: height- altura1,
					width: s_fgPLataforma.width *7,
					height: s_fgPLataforma.height,
				});
			}

		}
		//ciclo encargado de las plataformas, tanto de su posición como de si el personaje las esta tocando
		for (var i = 0, len = this._plataformas.length; i < len; i++) {
			var p = this._plataformas[i];
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
				//determina si el personaje esta por arriba del obstaculo
				if (personaje.y<p.y){
					//de ser así, lo coloca sobre de el y resetea sus valores
					personaje.resetearValores();
					personaje.velocity=0.25;// no se deja la velocidad en "0" para que sea suave el momento de tocar la plataforma
					personaje.y = p.y-35;
				}
			}
			
			// actualiza la plataforma en cuanto a posición... y además la remueve si ya no es visible
			p.x -= 8;
			if (p.x < -p.width) {
				this._plataformas.splice(i, 1);
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
		for (var i = 0, len = this._plataformas.length; i < len; i++) {
			var p = this._plataformas[i];
			//si la plataforma es igual al tamaño del sprite , entonces lo dibujamos directamente
			if(p.width<=s_fgPLataforma.width)
				s_fgPLataforma.draw(ctx, p.x, p.y);
			//en caso contrario.. si es mas grande, entonces hacemos las repeticiones necesarias
			//para hacer el ajuste del dibujo
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
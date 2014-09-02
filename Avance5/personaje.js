//encargado de todo lo referente al personaje

var personaje = {

	x: 100,//la posición en X
	posYPla:0,
	estaArriba:false,
	tamañoSpr:0,
	y:0, //la posición en Y
	brinca:false, // bandera que determina si el jugador esta brincando
	brincaB:false, //bandera que determina que sprite usar si el jugador brinca o no
	dobleJump:true, //dice si se puede dar otro salto o no
	contadorJump:0, //cuenta  cuantos saltos lleva el jugador
	contadorBajar:0, // cuantas veces ha bajado el jugador...esto porque de otra forma manda a llamar al reseteo de brincar,
	//entonces el jugador podría presionar bajar y tener libre acceso a el botón brincar nuevamente, y practicamente "volar",
	//si así lo quisiera 

	frame: 0, // el frame o sprite que se va a mostrar
	velocity: 0, //la velocidad del jugador (en cuanto a su fuerza de salto en referencia a la gravedad)
	animation: [1,2,3,4,5,6,7,8,9,10], //la animación 1 del jugador (cuando corre)
	animation2: [11,12,13,14,15,16,17,18], // la animación 2 del jugador (cuando salta)

	rotation: 0, //rotación... no es usada por el momento
	radius: 40, // el radio de nuestro personaje... es quién determina la colisión 

	gravity: 0.30, //la gravedad de nuestro entorno
	_jump: 10,//el valor de jump

	/**
	 * controla el salto del personaje
	 */
	jump: function(brinca) {
		if(brinca==true&&dobleJump==true){
			this.brincaB=true;//activa animación de brincar
			contadorJump++;//cuenta el numero de saltos que ha dado el usuario
			this.velocity = -this._jump;
			if(contadorJump==2){
				contadorJump=0;
				dobleJump=false;
			}
		}
		//controla la fuerza del impulso que le de el usuario (dependiendo de cuanto deje presionado el boton)
		else if(this.velocity<=0) {
			this.velocity = this.velocity/2;
		}
	},
	//resetea valores del personaje
	resetearValores: function() {
		contadorJump=0;
		dobleJump=true;
		this.brincaB=false;
		contadorBajar=0;
	},
	// cuando se manda llamar a este método, se hace bajar al personaje de la plataforma
	//a menos que este este corriendo sobre el suelo
	bajarPlataforma: function(){
		if(contadorBajar==0){
			this.brincaB=true;
			this.y = this.y+50;
			contadorBajar++;
			dobleJump=false;
		}
	},

	/**
	 * Update sprite animation and position of bird
	 */
	update: function() {
		// esto es solo para hacer el movimiento un poco mas rápido cuando el jugador esta "jugando" realmente
		//en el state Splash el movimiento del personaje es un tanto mas lento
		var n = currentstate === states.Splash ? 9 : 5;
		if (this.brincaB==false) {
			this.frame += frames % n === 0 ? 1 : 0;
			this.frame %= this.animation.length;
		}else{
			this.frame += frames % n === 0 ? 1 : 0;
			this.frame %= this.animation2.length;
		}

		//se coloca el jugador en el alto del suelo (foreground)
		if (currentstate === states.Splash) {

			this.y = height - this.posYPla-30;//height - 280 + 5*Math.cos(frames/10);
			this.rotation = 0;

		} else { // game and score state //
			//se actualiza la velocidad de acuerdo a la gravedad 
			this.velocity += this.gravity;
			//se actualiza la posición en "y"
			this.y += this.velocity;
			//determina si el personaje a tocado el suelo... si es así, entonces se coloca a este sobre de él
			// y se resetean los valores para que el jugador pueda volver a saltar....lo mismo ocurre con las plataformas
			if (this.y >= height - (this.posYPla/2)-28) {
				personaje.resetearValores();
				this.y = height - (this.posYPla/2)-30;//colocar al personaje sobre el suelo
			}
		}
	},

	/**
	 * Draws bird with rotation to canvas ctx
	 * 
	 * @param  {CanvasRenderingContext2D} ctx the context used for
	 *                                        drawing
	 */
	draw: function(ctx, posY) {
		ctx.save();//se guarda el contexto
		// translate and rotate ctx coordinatesystem
		//ctx.translate(this.x, this.y);
		//se determina que sprite se va a usar
		if(this.brincaB==false){
			if(this.estaArriba==true){
				var n = this.animation[this.frame];
				s_bird[n].drawP(ctx, s_bird[n].d_width, this.y);
			}else{
				var n = this.animation[this.frame];
				s_bird[n].drawP(ctx, s_bird[n].d_width, height - (posY + s_bird[n].d_height));
			}
		}
		else if(this.brincaB==true) {
			var n = this.animation2[this.frame];
			s_bird[n].drawPJ(ctx, s_bird[n].d_width, this.y);
		}
		 //draws the bird with center in origo
		//ver area de choque
		
		//ctx.fillStyle="#f00";
		//ctx.beginPath();
		//ctx.arc(0,0,this.radius,0,2*Math.PI);
		
		ctx.fill();

		ctx.restore();
	},

	inicializaY: function(ctx,posY){
		this.y = height - (posY + s_bird[1].d_height);
		this.posYPla=this.y;
		this.tamañoSpr=s_bird[1].d_height;
	}
};
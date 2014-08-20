var personaje = {

	x: 100,
	y: 0,
	brinca:false,
	brincaB:false,
	dobleJump:true,
	contadorJump:0,
	contadorBajar:0,

	frame: 0,
	velocity: 0,
	animation: [1,2,3,4,5,6,7,8,9,10],
	animation2: [11,12,13,14,15,16,17,18], // animation sequence

	rotation: 0,
	radius: 40,

	gravity: 0.30,
	_jump: 10,

	/**
	 * Makes the bird "flap" and jump
	 */
	jump: function(brinca) {
		//alert("brinca: "+brinca+"dobleJ: "+dobleJump+"Contador: "+ contadorJump);
		if(brinca==true&&dobleJump==true){
			this.brincaB=true;
			contadorJump++;
			this.velocity = -this._jump;
			if(contadorJump==2){
				contadorJump=0;
				dobleJump=false;
			}
		}
		else if(this.velocity<=0) {
			this.velocity = this.velocity/2;
		}
	},

	resetearValores: function() {
		contadorJump=0;
		dobleJump=true;
		this.brincaB=false;
		contadorBajar=0;
	},

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
		// make sure animation updates and plays faster in gamestate
		var n = currentstate === states.Splash ? 9 : 5;
		if (this.brincaB==false) {
			this.frame += frames % n === 0 ? 1 : 0;
			this.frame %= this.animation.length;
		}else{
			this.frame += frames % n === 0 ? 1 : 0;
			this.frame %= this.animation2.length;
		}

		// in splash state make bird hover up and down and set
		// rotation to zero
		if (currentstate === states.Splash) {

			this.y = height - ((s_fg.height)/2)-30;//height - 280 + 5*Math.cos(frames/10);
			this.rotation = 0;

		} else { // game and score state //

			this.velocity += this.gravity;
			this.y += this.velocity;

			// change to the score state when bird touches the ground
			if (this.y >= height - ((s_fg.height)/2)-28) {
				//bird.jump();
				personaje.resetearValores();
				this.y = height - ((s_fg.height)/2)-30;
			}
		}
	},

	/**
	 * Draws bird with rotation to canvas ctx
	 * 
	 * @param  {CanvasRenderingContext2D} ctx the context used for
	 *                                        drawing
	 */
	draw: function(ctx) {
		ctx.save();
		// translate and rotate ctx coordinatesystem
		ctx.translate(this.x, this.y);
		if(this.brincaB==false){
			var n = this.animation[this.frame];
			s_bird[n].drawP(ctx, -s_bird[n].width/4, -s_bird[n].height/2);
		}
		else if(this.brincaB==true) {
			var n = this.animation2[this.frame];
			s_bird[n].drawPJ(ctx, -s_bird[n].width/8, -s_bird[n].height/2);
		}
		 //draws the bird with center in origo
		//ver area de choque
		
		//ctx.fillStyle="#f00";
		//ctx.beginPath();
		//ctx.arc(0,0,this.radius,0,2*Math.PI);
		
		ctx.fill();

		ctx.restore();
	},
};
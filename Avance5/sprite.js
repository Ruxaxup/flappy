var 

// Sprite vars //
aleatorioX,
s_bird=[] ,
s_bg,
s_fg,
s_pipeNorth,
s_pipeSouth,
s_text,
s_score,
s_splash,
s_buttons,
s_numberS,
s_numberB;

/**
 * Simple sprite class
 * 
 * @param {Image}  img    spritesheet image
 * @param {number} x      x-position in spritesheet
 * @param {number} y      y-position in spritesheet
 * @param {number} width  width of sprite 
 * @param {number} height height of sprite
 */
function Sprite(img, x, y, width, height) {
    this.img = img;
    this.x = x*2;
    this.y = y*2;
    this.width = width*2;
    this.height = height*2;
};
/**
 * Draw sprite ta canvas context
 * 
 * @param  {CanvasRenderingContext2D} ctx context used for drawing
 * @param  {number} x   x-position on canvas to draw from
 * @param  {number} y   y-position on canvas to draw from
 */
Sprite.prototype.draw = function(ctx, x, y) {

            ctx.drawImage(this.img, this.x, this.y, this.width, this.height,
            x, y, this.width, this.height); 
};

Sprite.prototype.drawP = function(ctx, x, y) {

            ctx.drawImage(this.img, this.x, this.y, this.width, this.height,
            x, y, this.width/1.5, this.height/1.5); 
};

Sprite.prototype.drawPJ = function(ctx, x, y) {

            ctx.drawImage(this.img, this.x, this.y, this.width, this.height,
            x, y, this.width/2, this.height/2); 
};

/**
 * Initate all sprite
 * 
 * @param  {Image} img spritesheet image
 */

function personajeSprites(img){
    //Animaciones corriendo
    s_bird[1] = new Sprite(img,0, 0, 78, 112.5);
    s_bird[2] = new Sprite(img,80, 0, 78, 112.5);
    s_bird[3] = new Sprite(img,170, 0, 78, 112.5);
    s_bird[4] = new Sprite(img,275, 0, 78, 112.5);
    s_bird[5] = new Sprite(img,355, 0, 78, 112.5);
    s_bird[6] = new Sprite(img,0, 125, 78, 95);
    s_bird[7] = new Sprite(img,80, 125, 78, 95);
    s_bird[8] = new Sprite(img,170, 125, 78, 95);
    s_bird[9] = new Sprite(img,260, 125, 78, 95);
    s_bird[10] = new Sprite(img,355, 125, 78, 95);
}

function personajeSpritesJ(img){
    //animaciones brincando
    s_bird[11] = new Sprite(img,0, 0, 125, 112.5);
    s_bird[12] = new Sprite(img,125, 0, 125, 112.5);
    s_bird[13] = new Sprite(img,250, 0, 125, 112.5);
    s_bird[14] = new Sprite(img,375, 0, 125, 112.5);
    s_bird[15] = new Sprite(img,0, 125, 125, 112.5);
    s_bird[16] = new Sprite(img,125, 125, 125, 112.5);
    s_bird[17] = new Sprite(img,250, 125, 125, 112.5);
    s_bird[18] = new Sprite(img,375, 125, 125, 112.5);
}
 
function initSprites(img,width,height) {

    /*s_bird = [
        new Sprite(img, 68, 112, 35, 35),
        new Sprite(img, 136, 112, 35, 35),
        new Sprite(img, 135, 112, 35, 35),
        new Sprite(img, 174, 112, 35, 35),
        new Sprite(img, 213, 112, 35, 35)
    ];*/

    controlUp = new Sprite(img,224,156,20,20 );
    controlDown = new Sprite(img,224,175,20,22);
    
    s_bg = new Sprite(img,   0, 0, 138, 114);
    s_fg = new Sprite(img, 138, 0, 112,  56);

    s_fgPLataforma = new Sprite(img, 138, 0, 112,  15);
    
    s_pipeNorth = new Sprite(img, 251, 0, 26, 85);
    s_pipeSouth = new Sprite(img, 277, 0, 26, 85);

    s_madera = new Sprite(img,   0, 112,20, 10);
    s_picos = new Sprite(img, 0, 122, 17,  20);
    s_agua = new Sprite(img,   17, 120, 20, 23);
    s_slime = new Sprite(img, 35, 120, 27,  23);
    
    s_text = {
        GetReady:   new Sprite(img, 59, 153, 87, 20)
    }
    s_buttons = {
        Rate:  new Sprite(img,  79, 177, 40, 14),
        Menu:  new Sprite(img, 119, 177, 40, 14),
        Share: new Sprite(img, 159, 177, 40, 14),
        Score: new Sprite(img,  79, 191, 40, 14),
        Ok:    new Sprite(img, 119, 191, 40, 14),
        Start: new Sprite(img, 159, 191, 40, 14)
    }

    s_score  = new Sprite(img, 138,  56, 113, 58);
    s_splash = new Sprite(img,   0, 143,  59, 20);

    s_numberS = new Sprite(img, 0, 177, 6,  7);
    s_numberB = new Sprite(img, 0, 188, 7, 10);

    /**
     * Draw number to canvas
     * 
     * @param  {CanvasRenderingContext2D} ctx context used for drawing
     * @param  {number} x      x-position
     * @param  {number} y      y-position
     * @param  {number} num    number to draw
     * @param  {number} center center to offset from
     * @param  {number} offset padd text to draw right to left
     */
    s_numberS.draw = s_numberB.draw = function(ctx, x, y, num, center, offset) {
        num = num.toString();

        var step = this.width + 2;
        //centrar los numeros del score
        if (center) {
            x = center - (num.length*step-2)/2;
        }
        if (offset) {
            x += step*(offset - num.length);
        }

        for (var i = 0, len = num.length; i < len; i++) {
            var n = parseInt(num[i]);
            ctx.drawImage(img, step*n, this.y, this.width, this.height,
                x, y, this.width, this.height)
            x += step;
        }
    }
}
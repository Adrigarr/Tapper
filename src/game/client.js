/**
 * Clase que representa a un cliente.
 * @param {int}     x       Posición horizontal del cliente.
 * @param {int}     y       Posición vertical del cliente.
 * @param {double}  v       Velocidad con la que se desplaza el cliente.
 */
var Client = function(x, y, v) {
    /*------------------------ATRIBUTOS----------------------*/
    this.setup('NPC', { speed: v });

    this.x = x;
    this.y = y;

    /**
     * Atributos que se utilizarán para generar las jarras vacías lanzadas por el cliente
     */
    this.widthGlass = sprites.Glass.w;
    this.glassInstance = new Beer(STATUS.EMPTY, this.x + this.widthGlass, this.y + 1, 1);
};

/*-----------------------PROTOTIPO---------------------*/
/**
 * Definimos que hereda de la clase Sprite.
 */
Client.prototype = new Sprite();
/**
 * Tipo del objeto, esto servirá para que se pueda calcular las colisiones contra el objeto.
 */
Client.prototype.type = OBJECT_CLIENT;

/*-----------------------MÉTODOS PROTOTIPO---------------------*/
/**
 * Ejecuta un paso de un cliente
 * @param  {double} dt  Tiempo transcurrido entre este paso y el anterior.
 */
Client.prototype.step = function(dt) {
    /**
     * Actualizamos posición.
     */
    this.x += this.speed;
    /**
     * Si se ha colisionado con un DeadZone entonces el cliente se elimina y se pierde
     * la partida.
     */
    if (this.board.collide(this, OBJECT_DEADZONE)) {
        this.board.remove(this);
        GameManager.lose();
    }
};
/**
 * Ejecuta la acción al ser colisionado con otro objeto
 * @param  {double} damage	Cantidad de daño causada.
 */
Client.prototype.hit = function(damage) {
    /**
     * Genera una jarra de cerveza vacía.
     */
    var glass = Object.create(this.glassInstance);
    glass.setX(this.x + this.widthGlass);
    glass.setY(this.y + 1);
    this.board.add(glass);
    
    GameManager.drinkBeer();
    /**
     * Eliminamos el cliente.
     */
    this.board.remove(this);
}
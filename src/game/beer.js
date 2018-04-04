/**
 * Los distintos estados posibles de una cerveza.
 */
var STATUS = {
    FULL: { value: 0, name: "Jarra llena", code: "F", sprite: 'Beer' },
    EMPTY: { value: 1, name: "Jarra vacía", code: "E", sprite: 'Glass' }
};

/**
 * Clase que representa la cerveza del juego.
 * @param {[type]}  status  Estado actual de la cerveza.
 * @param {int}     x       Posición en el plano horizontal de la cerveza.
 * @param {int}     y       Posición en el plano vertical de la cerveza.
 * @param {double}  v       Velocidad con la que se desplaza la cerveza.
 */
var Beer = function(status, x, y, v) {
    /*------------------------ATRIBUTOS----------------------*/
    this.setup(status.sprite, { status: status, reloadTime: 0.25, speed: v });

    this.x = x - 100;
    this.y = y;
    /*------------------------MÉTODOS PROPIOS----------------*/
    /**
     * Dependiendo de si la cerveza está llena o vacía, se moverá hacía la izquierda o
     * a la derecha, respectivamente. 
     */
    this.move = function() {
        this.x += this.speed;
    }
    /**
     * Actualiza el valor del atributo x.
     * @param {int} num Posición actual horizontal de la cerveza
     */
    this.setX = function(num){
        this.x = num;
    }
    /**
     * Actualiza el valor del atributo y.
     * @param {iint} num Posición actual vertical de la cerveza
     */
    this.setY = function(num){
        this.y = num;
    }
};

/*-----------------------PROTOTIPO---------------------*/
/**
 * Definimos que hereda de la clase Sprite.
 */
Beer.prototype = new Sprite();
/**
 * Tipo del objeto, esto servirá para que se pueda calcular las colisiones contra el objeto.
 */
Beer.prototype.type = OBJECT_BEER;

/*-----------------------MÉTODOS PROTOTIPO---------------------*/
/**
 * Ejecuta un paso de la cerveza
 * @param  {double} dt  Tiempo transcurrido entre este paso y el anterior.
 */
Beer.prototype.step = function(dt) {
    this.move();
    var collision;
    /**
     * Dependiendo del estado comprobamos si ha chocado con el cliente o nuestro jugador.
     * En caso de colisionar llama a la función hit del objeto colisionado y la cerveza 
     * se elimina.
     */
    switch (this.status) {
        case STATUS.FULL:
            collision = this.board.collide(this, OBJECT_CLIENT);
            break;
        case STATUS.EMPTY:
            collision = this.board.collide(this, OBJECT_PLAYER);
            break;
    }
    if (collision) {
        collision.hit();
        this.board.remove(this);
    }
    /**
     * Si se ha colisionado con un DeadZone entonces la cerveza se elimina y se pierde
     * la partida.
     */
    if (this.board.collide(this, OBJECT_DEADZONE)) {
        this.board.remove(this);
        GameManager.lose();
    }
};
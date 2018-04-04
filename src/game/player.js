/**
 * Posibles movimientos del jugador.
 */
var movesPlayer = [{ x: 325, y: 90 },
    { x: 357, y: 185 },
    { x: 389, y: 281 },
    { x: 421, y: 377 }
];

/**
 * Clase que representa al jugador.
 */
var Player = function() {
    /*------------------------ATRIBUTOS----------------------*/
    this.setup('Player', { breakTime: 0.25, reloadTime: 0.5 });

    /**
     * Posición actual del jugador
     */
    this.place = 0;

    this.x = movesPlayer[this.place].x;
    this.y = movesPlayer[this.place].y;

    /**
     * Tiempo que tiene que pasar para que el jugador pueda moverse.
     */
    this.break = this.breakTime;
    /**
     * Tiempo que tiene que pasar para que el jugador pueda lanzar otra cerveza.
     */
    this.reload = this.reloadTime;
    /**
     * Atributos que se utilizarán para generar las cervezas lanzadas por el jugador
     */
    this.widthBeer = sprites.Beer.w;
    this.beerInstance = new Beer(STATUS.FULL, this.x - this.widthBeer, this.y, -1);

    /*------------------------MÉTODOS PROPIOS----------------*/
    /**
     * Desplaza al jugador.
     * @param  {int}    num   1 se mueve hacía abajo y -1 hacia arriba . 
     */
    this.move = function(num) {

        if (this.break < 0) {
            this.break = this.breakTime;

            if (num == -1 && this.place == 0) {
                this.place = movesPlayer.length - 1;
            } else if (num == 1 && this.place == movesPlayer.length - 1) {
                this.place = 0;
            } else {
                this.place += num;
            }

            /**
             * Actualizamos la posición
             */
            this.x = movesPlayer[this.place].x;
            this.y = movesPlayer[this.place].y;
        }
    };

};

/*-----------------------PROTOTIPO---------------------*/
/**
 * Definimos que hereda de la clase Sprite.
 */
Player.prototype = new Sprite();
/**
 * Tipo del objeto, esto servirá para que se pueda calcular las colisiones contra el objeto.
 */
Player.prototype.type = OBJECT_PLAYER;

/*-----------------------MÉTODOS PROTOTIPO---------------------*/
/**
 * Ejecuta un paso del jugador
 * @param  {double} dt  Tiempo transcurrido entre este paso y el anterior.
 */
Player.prototype.step = function(dt) {
    /**
     * Se resta el tiempo transcurrido
     */
    this.break -= dt;
    this.reload -= dt;

    /**
     * Se comprueba que tecla (arriba, abajo o espacio) se ha pulsado.
     * · En caso de pulsar 'arriba' o 'abajo' se procede a omver al jugador hacia dirección.
     * · En caso de pulsar 'espacio' se genera una cerveza.
     */
    if (Game.keys['up']) {
        this.move(-1);
    } else if (Game.keys['down']) {
        this.move(1);
    } else if (Game.keys['space'] && this.reload < 0) {

        this.reload = this.reloadTime;

        /**
         * Se genera una cerveza siguiendo la instancia contenida en 'beerInstance'.
         */
        var beer = Object.create(this.beerInstance);
        beer.setX(this.x - this.widthBeer);
        beer.setY(this.y);

        //GameManager.serveBeer();

        this.board.add(beer);
    }
};

Player.prototype.hit = function(damage) {
    GameManager.removeGlass();
}
/**
 * Clase que controlará el funcionamiento del juego.
 * @return {[type]} [description]
 */
var GameManager = new function() {
    /**
     *	Inicializamos el manager del juego
     */
    this.initialize = function() {
        this.numClients = 0;
        this.clientsServed = 0;

        this.beerEmpty = 0;

        Game.activateBoard(2);

    }
    /**
     * Se añaden clientes totales del juego por cada barra.
     * @param {Number} num Número de clientes de la barra.
     */
    this.addClients = function(num) {
        this.numClients += num;
    }
    /**
     * Se sirve al cliente una cerveza
     */
    this.drinkBeer = function() {
        ++this.beerEmpty;
        ++this.clientsServed;
    }
    /**
     * Recogemos una jarra vacía
     */
    this.removeGlass = function() {
        --this.beerEmpty;
        if (this.clientsServed == this.numClients && this.beerEmpty == 0) {
            this.win();
        }
    }
    /**
     * El jugador ha ganado la partida cumpliendo que:
     * • No quedan clientes a los que servir. El número de clientes es fijo para un nivel y
     *   se conoce a priori.
     * • No quedan jarras vacías que recoger.

     */
    this.win = function() {
        Game.deactivateBoard(2);
        Game.activateBoard(3);
    }

    /**
     * El jugador ha perdido la partida por alguno de estos motivos:
     * 
     * • Algún cliente llega al extremo derecho de la barra.
     * • Alguna jarra vacía llega al extremo derecho de la barra.
     * • Alguna cerveza llena llega al extremo izquierdo de la barra.
     */
    this.lose = function() {
        Game.deactivateBoard(2);
        Game.activateBoard(4);
    }
}
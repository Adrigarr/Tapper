/**
 * Clase que representa a un generador de clientes.
 * @param {Client} client     Cliente que se va a generar.
 * @param {Number} numClients Cantidad de clientes que va a generar.
 * @param {Number} freq       Frecuencia con la que se generan los clientes.
 * @param {Number} delay      Tiempo que tiene que transcurrir para que empiece a generar.
 */
var Spawner = function(client, numClients, freq, delay) {
    /*------------------------ATRIBUTOS----------------------*/
    this.contClients = numClients;
    this.frequencyTime = freq;
    this.frequency = freq;
    this.delay = delay;
    this.clientInstance = client;

    /**
     * Añadimos los clientes al manager.
     */
    GameManager.addClients(numClients);
}

/*-----------------------PROTOTIPO---------------------*/
/**
 * Definimos que hereda de la clase Sprite.
 */
Spawner.prototype = new Sprite();

/**
 * Dibuja el generador, que en este aso al ser invisible, no dibuja nada.
 * @param  {[type]} ctx Canvas
 */
Spawner.prototype.draw = function(ctx) {}

/**
 * Cada cierto tiempo el generador añade un nuevo cliente.
 */
Spawner.prototype.step = function(dt) {
    /**
     * Se resta el tiempo transcurrido.
     */
    this.delay -= dt;
    /**
     * Comprobamos si ha transcurrido el tiempo para poder empezar y que nos quedan clientes 
     * por generar.
     */
    if (this.delay < 0 && this.contClients > 0) {
        this.frequency -= dt;
        if (this.frequency < 0) {
            this.frequency = this.frequencyTime;

            var client = Object.create(this.clientInstance);

            this.board.add(client);
            --this.contClients;
        }
    }
}
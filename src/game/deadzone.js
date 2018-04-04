/**
 * Posibles lugar donde se ubicarán los DeadZones
 */
var placesDeadZone = [{ x: 15, y: 377 },
    { x: 45, y: 281 },
    { x: 75, y: 180 },
    { x: 105, y: 89 },
    { x: 431, y: 377 },
    { x: 399, y: 281 },
    { x: 367, y: 180 },
    { x: 335, y: 89 }
];
/**
 * Clase que representa las zonas límites de las barras
 * @param {int} place Posición del array 'placesDeadZone'.
 */
var DeadZone = function(place) {
    /*------------------------ATRIBUTOS----------------------*/
    this.x = placesDeadZone[place].x;
    this.y = placesDeadZone[place].y;
    this.w = 10;
    this.h = 65;
}

/*-----------------------PROTOTIPO---------------------*/
/**
 * Definimos que hereda de la clase Sprite.
 */
DeadZone.prototype = new Sprite();
/**
 * Tipo del objeto, esto servirá para que se pueda calcular las colisiones contra el objeto.
 */
DeadZone.prototype.type = OBJECT_DEADZONE;

/*-----------------------MÉTODOS PROTOTIPO---------------------*/
/**
 * Ejecuta un paso del DeadZone, en este caso como es estático no ocurre nada.
 */
DeadZone.prototype.step = function(dt) {};
/**
 * Dibuja un DeadZone en el canvas
 * @param  {[type]} ctx Canvas sobre el que pintar
 */
DeadZone.prototype.draw = function(ctx) {
    /**
     * Descomentar en la caso de prueba
     */
    /*ctx.fillStyle = '#007D01';
    ctx.fillRect(this.x, this.y, this.w, this.h);*/
};
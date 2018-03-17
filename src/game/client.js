var Client = function(x, y, v) {
    /*------------------------ATRIBUTOS----------------------*/
    this.setup('NPC', { reloadTime: 0.25, speed: v });

    this.x = x;
    this.y = y;
};

Client.prototype = new Sprite();
Client.prototype.type = OBJECT_CLIENT;

Client.prototype.step = function(dt) {
    this.x += this.speed;
};

Client.prototype.hit = function(damage){
	this.board.remove(this);
}
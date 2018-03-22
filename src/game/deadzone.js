var placesDeadZone = [{ x: 15, y: 377 },
    { x: 45, y: 281 },
    { x: 75, y: 180 },
    { x: 105, y: 89 },
    { x: 431, y: 377 },
    { x: 399, y: 281 },
    { x: 367, y: 180 },
    { x: 335, y: 89 }
];

var DeadZone = function(place) {
    this.x = placesDeadZone[place].x;
    this.y = placesDeadZone[place].y;
    this.w = 10;
    this.h = 65;
}

DeadZone.prototype = new Sprite();
DeadZone.prototype.type = OBJECT_DEADZONE;


DeadZone.prototype.step = function() {
    var collision = this.board.collide(this, OBJECT_BEER);
    if(collision){
        collision.hit();
    }
};

DeadZone.prototype.draw = function(ctx) {
    ctx.fillStyle = '#007D01';
    ctx.fillRect(this.x, this.y, this.w, this.h);
};
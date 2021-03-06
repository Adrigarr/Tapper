/** 
 * Situaciones iniciales donde se generan los clientes
 */
var initPlaceClient = [{ x: 120, y: 79 },
    { x: 90, y: 175 },
    { x: 60, y: 271 },
    { x: 30, y: 367 }
];

/**
 * Instancia de un cliente según unos parámetros
 * @param {Number} place Posición del array 'initPlaceClient'ñ
 * @param {Number} v     Velocidad del cliente
 */
var ClientInstance = function(place, v) {
    return new Client(initPlaceClient[place].x, initPlaceClient[place].y, v);
}

var GameBoard = function(activate) {
    this.activate = activate;
    var board = this;

    // The current list of objects
    this.objects = [];
    this.cnt = {};

    // Add a new object to the object list
    this.add = function(obj) {
        obj.board = this;
        this.objects.push(obj);
        this.cnt[obj.type] = (this.cnt[obj.type] || 0) + 1;
        return obj;
    };

    // Mark an object for removal
    this.remove = function(obj) {
        var idx = this.removed.indexOf(obj);
        if (idx == -1) {
            this.removed.push(obj);
            return true;
        } else {
            return false;
        }
    };

    // Reset the list of removed objects
    this.resetRemoved = function() { this.removed = []; };

    // Removed an objects marked for removal from the list
    this.finalizeRemoved = function() {
        for (var i = 0, len = this.removed.length; i < len; i++) {
            var idx = this.objects.indexOf(this.removed[i]);
            if (idx != -1) {
                this.cnt[this.removed[i].type]--;
                this.objects.splice(idx, 1);
            }
        }
    };

    // Call the same method on all current objects 
    this.iterate = function(funcName) {
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, len = this.objects.length; i < len; i++) {
            var obj = this.objects[i];
            obj[funcName].apply(obj, args);
        }
    };

    // Find the first object for which func is true
    this.detect = function(func) {
        for (var i = 0, val = null, len = this.objects.length; i < len; i++) {
            if (func.call(this.objects[i])) return this.objects[i];
        }
        return false;
    };

    // Call step on all objects and them delete
    // any object that have been marked for removal
    this.step = function(dt) {
        this.resetRemoved();
        this.iterate('step', dt);
        this.finalizeRemoved();
    };

    // Draw all the objects
    this.draw = function(ctx) {
        this.iterate('draw', ctx);
    };

    // Check for a collision between the 
    // bounding rects of two objects
    this.overlap = function(o1, o2) {
        return !((o1.y + o1.h - 1 < o2.y) || (o1.y > o2.y + o2.h - 1) ||
            (o1.x + o1.w - 1 < o2.x) || (o1.x > o2.x + o2.w - 1));
    };

    // Find the first object that collides with obj
    // match against an optional type
    this.collide = function(obj, type) {
        return this.detect(function() {
            if (obj != this) {
                var col = (!type || this.type & type) && board.overlap(obj, this);
                return col ? this : false;
            }
        });
    };
    this.deactivateClass = function() {
        this.activate = false;
        this.resetRemoved();
        for (var i = 0; i < this.objects.length; ++i) {
            this.remove(this.objects[i]);
        }
        this.finalizeRemoved();
    }

    this.activateClass = function() {
        this.activate = true;
        this.add(new Player());
        for (var i = 0; i < placesDeadZone.length; ++i) {
            this.add(new DeadZone(i));
        }
        this.add(new Spawner(ClientInstance(0, 0.5), 5, 3, 2));
        this.add(new Spawner(ClientInstance(1, 0.5), 2, 2.5, 3));
        this.add(new Spawner(ClientInstance(2, 0.5), 4, 5, 1));
        this.add(new Spawner(ClientInstance(3, 0.5), 7, 4, 6));
    }
};
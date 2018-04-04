var GamePoints = function() {
    Game.points = 0;
    this.activate = true;

    var pointsLength = 8;

    this.draw = function(ctx) {
        ctx.save();
        ctx.font = "bold 18px arial";
        ctx.fillStyle = "#FFFFFF";

        var txt = "" + Game.points;
        var i = pointsLength - txt.length,
            zeros = "";
        while (i-- > 0) { zeros += "0"; }

        ctx.fillText(zeros + txt, 10, 20);
        ctx.restore();

    };

    this.step = function(dt) {};

    this.deactivate = function() {
        this.activate = false;
    }
    
    this.activate = function() {
        this.activate = true;
    }
};
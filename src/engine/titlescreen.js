var TitleScreen = function TitleScreen(activate, title, subtitle, callback) {
    this.activate = activate;
    var up = false;
    this.step = function(dt) {
        if (!Game.keys['space']) up = true;

        if (up && Game.keys['space'] && callback) {
            this.deactivateClass();
            callback();
        }
    };

    this.draw = function(ctx) {

        // Background
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, Game.width, Game.height);

        // Foreground
        ctx.fillStyle = "#FFFFFF";

        ctx.font = "bold 40px bangers";
        var measure = ctx.measureText(title);
        ctx.fillText(title, Game.width / 2 - measure.width / 2, Game.height / 2);

        ctx.font = "bold 20px bangers";
        var measure2 = ctx.measureText(subtitle);
        ctx.fillText(subtitle, Game.width / 2 - measure2.width / 2, Game.height / 2 + 40);
    };

    this.deactivateClass = function() {
        this.activate = false;
    }

    this.activateClass = function() {
        this.activate = true;
    }
};
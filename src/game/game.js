/**
 * Los diversos tipos de objetos.
 */
var OBJECT_PLAYER = 1,
    OBJECT_BEER = 2,
    OBJECT_CLIENT = 4,
    OBJECT_DEADZONE = 8;

var startGame = function() {
    Game.activateBoard(7);
};

var level1 = [
    // Start,   End, Gap,  Type,   Override
    [0, 4000, 500, 'step'],
    [6000, 13000, 800, 'ltr'],
    [10000, 16000, 400, 'circle'],
    [17800, 20000, 500, 'straight', { x: 50 }],
    [18200, 20000, 500, 'straight', { x: 90 }],
    [18200, 20000, 500, 'straight', { x: 10 }],
    [22000, 25000, 400, 'wiggle', { x: 150 }],
    [22000, 25000, 400, 'wiggle', { x: 100 }]
];

var playGame = function() {
    GameManager.initialize();
};

var Enemy = function(blueprint, override) {
    this.merge(this.baseParameters);
    this.setup(blueprint.sprite, blueprint);
    this.merge(override);
};

window.addEventListener("load", function() {
    Game.initialize("game", sprites, startGame);
});
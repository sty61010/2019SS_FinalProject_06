// Initialize Phaser
var game = new Phaser.Game(800,600, Phaser.AUTO, 'canvas'); // Define our global variable
game.global = {  level: 1 , sound: 1, music: 0, reset:1}; 
// score1: 0 ,score2: 0, score3: 0, score4: 0,
var scoreBoard = document.querySelectorAll(".score");
var GAME_SIZE = 600;
var gameInPlay;
var scoreString1;
var scoreText1;
var scoreString2;
var scoreText2;
var scoreString3;
var scoreText3;
var scoreString4;
var scoreText4;
var bg_score;
var score1=0;
var score2=0;
var score3=0;
var score4=0;
//var myHealthBar1;
//var myHealthBar2;
// Add all the states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('mode', modeState);

game.state.add('menu', menuState);
// game.state.add('play', mainState);
game.state.add('normal', normalState);
game.state.add('coincollect',coincollectState);
game.state.add('win', winState);
game.state.add('lose', loseState);
game.state.add('rank', rankState);
// Start the 'boot' state
game.state.start('boot');
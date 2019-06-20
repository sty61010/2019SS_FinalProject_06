// Initialize Phaser
var game = new Phaser.Game(800,600, Phaser.AUTO, 'canvas'); // Define our global variable
game.global = { sound: 1, music: 0, reset:1}; 
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
var bomb1=0;
var bomb2=0;
var bomb3=0;
var bomb4=0;
var live1=3;
var live2=3;
var live3=1;
var live4=1;
var livegroup1;
var livegroup2;
var level=1;
var animation1='down';
var animation2='down';
var animation3='down';
var animation4='down';

//var myHealthBar1;
//var myHealthBar2;
// Add all the states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('mode', modeState);

game.state.add('menu', menuState);
// game.state.add('play', mainState);
game.state.add('killing',killingState);
game.state.add('killing2',killingState2);
game.state.add('killing3',killingState3);
game.state.add('normal', normalState);
game.state.add('normal2', normalState2);
game.state.add('normal3', normalState3);
game.state.add('coincollect',coincollectState);
game.state.add('coincollect2',coincollectState2);
game.state.add('coincollect3',coincollectState3);
game.state.add('win', winState);
game.state.add('lose', loseState);
game.state.add('rank', rankState);
// Start the 'boot' state
game.state.start('boot');
var loadState = { 
    preload: function () {
        // Add a 'loading...' label on the screen
        var loadingLabel = game.add.text(game.width/2, 150, 'loading...', { font: '30px Arial', fill: '#ffffff' });
        loadingLabel.anchor.setTo(0.5, 0.5);
        // Display the progress bar
        var progressBar = game.add.sprite(game.width/2, 200, 'progressBar'); 
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);
        
        // Load all game assets

        //candy
        game.load.spritesheet('candy1', './assets/candy6.png', 40, 160);
        game.load.spritesheet('candy2', './assets/candy7.png', 40, 160);
        game.load.spritesheet('candy3', './assets/candy8.png', 40, 160);
        game.load.spritesheet('candy4', './assets/candy9.png', 40, 160);
        game.load.image('candy_ground', 'assets/candy5.png');

        //house
        game.load.image('house1','./assets/house1.png');
        game.load.image('house2','./assets/house2.png');
        game.load.image('house3','./assets/house3.png');
        game.load.image('house4','./assets/house4.png');
        game.load.image('house_ground','./assets/house5.png');
        game.load.image('house5','./assets/house6.png');
        game.load.image('house_ground2','./assets/house7.png');

        //volcanoA
        game.load.image('volcano1','./assets/volcano1.png');
        game.load.image('volcano2','./assets/volcano2.png');
        game.load.image('volcano3','./assets/volcano3.png');
        game.load.image('volcano4','./assets/volcano4.png');
        game.load.image('volcano_ground','./assets/volcano5.png');
        game.load.image('volcano5','./assets/volcano6.png');
        game.load.image('volcano_ground2','./assets/volcano7.png');

        // Map sprites
        game.load.image('ground', 'assets/ground.png');
        game.load.image('grass', 'assets/grass.png');
        game.load.image('wall', 'assets/wall.png');
        game.load.image('brick', 'assets/brick.png');
        game.load.image('blue-flag', 'assets/blue-flag.png');
        game.load.image('red-flag', 'assets/red-flag.png');

        // Weapon sprites
        // game.load.image('bomb', 'assets/bomb.png');
        game.load.image('explosion', 'assets/explosion.png');

        // Player sprites
        game.load.image('bomber', 'assets/bomber.png');
        game.load.image('bomber-front', 'assets/bomber-front.png');
        game.load.image('bomber-left', 'assets/bomber-left.png');
        game.load.image('bomber-right', 'assets/bomber-right.png');
        game.load.image('bomber-back', 'assets/bomber-back.png');

        // Button sprites
        game.load.image('next-round', 'assets/next-round.png');
        game.load.image('start-game', 'assets/start-game.png');
        game.load.image('play-again', 'assets/play-again.png');
        game.load.spritesheet('button_music', './assets/sound_bt.png', 166, 156);
        game.load.spritesheet('button_stop', './assets/p_bt.png', 166, 152);
        game.load.spritesheet('button_rank', './assets/rank_bt.png', 167, 150);
        game.load.spritesheet('button_sound', './assets/music_bt.png', 168, 155);
        game.load.spritesheet('button_mode', './assets/mode_bt.png', 163, 170);
        game.load.image('button_start', './assets/start-game.png');
        game.load.image('button_restart', './assets/play-again.png');
        game.load.image('button_back', './assets/start-game.png');
        game.load.spritesheet('button_play', 'assets/playbutton.png', 249, 83);
        game.load.spritesheet('button_setting', 'assets/settingbutton.png', 250, 100);
        game.load.spritesheet('button_credict', 'assets/credictbutton.png', 250, 85);
        game.load.spritesheet('button_play2', 'assets/play2_bt.png', 115, 46);
        game.load.spritesheet('button_next', 'assets/next_bt.png', 115, 46);
        // Power up sprites
        game.load.image('boots', 'assets/boots.png');
        // game.load.image('star', 'assets/star.png');

        // Audio clip sprites
        game.load.audio('bomb-sound', 'assets/bomb-sound.wav');
        game.load.audio('power-up', 'assets/power-up.wav');
        game.load.audio('winner', 'assets/winner.wav');
        game.load.audio('intro', 'assets/intro.wav');
        game.load.audio('game-start', 'assets/game-start.wav');
        game.load.audio('round-end', 'assets/round-end.wav');
        game.load.audio('bg-music', 'assets/48-battle.mp3');
        game.load.audio('button_sound', 'assets/button.wav');
        // Background
        game.load.image('background_menu', './assets/bg.jpg');
        //game.load.image('background_score', './assets/score_bg.jpg');
        game.load.image('background_score', './assets/newscore_bg.jpg');


        game.load.image('background_win', './assets/win_bg.jpg');
        game.load.image('background_lose', './assets/lose_bg.jpg');

        // Ice
        game.load.image('ice', './assets/ice.png');
        game.load.image('iceberg', './assets/iceberg.png');

        //Piexl
        game.load.image('pixel', 'assets/flame.png');
        game.load.image('pixel2', 'assets/pixel.png');
        //Coin
        game.load.spritesheet('coin', 'assets/coin.png', 40, 40);
        //Star
        game.load.spritesheet('star', 'assets/star2.png',40, 40);
        // game.load.spritesheet('star', 'assets/star1.png',28, 30);

        //Lighting
        game.load.spritesheet('lighting', 'assets/lighting.png',40, 40);
        //Heart
        game.load.spritesheet('heart', 'assets/heart.png',40, 40);

        //tube
        game.load.spritesheet('tube', 'assets/tube.png',20, 35);

        //Bomb
        game.load.spritesheet('bomb', 'assets/bomb1.png', 123, 115);
        game.load.spritesheet('bomb1', 'assets/bomb_3.png', 40, 40); 
        ///killing
        game.load.image('ice','assets/ice.png');
        game.load.image('iceberg','assets/iceberg.png');
        game.load.image('bomb_increase','assets/bomb_increase.png');
        game.load.image('glove','assets/gloves.png');

        game.load.image('gun','assets/gun.png');
        game.load.image('laser_up','assets/laser_up.png');
        game.load.image('laser_down','assets/laser_down.png');
        game.load.image('laser_left','assets/laser_left.png');
        game.load.image('laser_right','assets/laser_right.png');
        //normal
        game.load.image('tree1', 'assets/mapAssets_1.png');
        game.load.image('tree2', 'assets/mapAssets_2.png');
        game.load.image('tree3', 'assets/mapAssets_3.png');
        game.load.image('wall1', 'assets/mapAssets_5.png');
        game.load.image('brick1', 'assets/mapAssets_4.png');
        game.load.image('ground1', 'assets/mapAssets_6.png');
        game.load.spritesheet('glove2', 'assets/glove.png', 40, 40);
        //boss
        game.load.spritesheet('boss', 'assets/boss_3.png', 67, 120);
        //boss_bullet
        
 
    },
    create: function() {

        console.log('load state ok');
        game.state.start('menu');

    } 
};
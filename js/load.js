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
        game.load.image('door', 'assets/spiral.png');
        game.load.image('board','./assets/board.png');

         //menu
        game.load.image('menu_1','./assets/menu_1.png');
        game.load.spritesheet('menu_2', './assets/menu_2.png', 100, 98);
        game.load.spritesheet('title', './assets/title_1.png', 512, 146);
        game.load.image('menu_3','./assets/menu_3.png');
        game.load.spritesheet('menu_4', './assets/volcano_2.png', 125,210);
        game.load.spritesheet('menu_5', './assets/din.png', 301,223);



        //background
        game.load.image('bg_menu','./assets/bg_1.jpg');
        game.load.image('bg_menu2','./assets/bg_2.jpg');
        game.load.image('bg_menu3','./assets/bg_3.jpg');
        game.load.image('bg_menu4','./assets/bg_4.jpg');
        game.load.image('bg_menu5','./assets/bg_5.jpg');
        game.load.image('bg_menu6','./assets/bg_6.jpg');
    


        //sprite
        game.load.spritesheet('player01', './assets/player01.png',40, 40);
        game.load.spritesheet('player02', './assets/player02.png',40, 40);
        game.load.spritesheet('player03', './assets/player03.png',40, 40);
        game.load.spritesheet('player04', './assets/player04.png',40, 40);

        //boss
        game.load.spritesheet('boss', 'assets/boss_3.png', 67, 120);
        game.load.spritesheet('boss2', 'assets/boss4.png', 28.3, 30);
        game.load.spritesheet('boss3', 'assets/boss5.png', 53.5, 80);
        //boss_bullet
        game.load.spritesheet('boss_bullet', 'assets/red_flame.png', 131, 169);
        game.load.spritesheet('boss_bullet2', 'assets/blue_flame.png', 60, 60);

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

        //sea
        game.load.image('sea1','./assets/sea1.png');
        game.load.image('sea2','./assets/sea2.png');
        game.load.image('sea3','./assets/sea3.png');
        game.load.image('sea4','./assets/sea4.png');
        game.load.image('sea_ground','./assets/ice5.png');
        game.load.image('sea5','./assets/sea5.png');
        game.load.image('sea_ground2','./assets/sea6.png');

        //volcano
        game.load.image('volcano1','./assets/volcano1.png');
        game.load.image('volcano2','./assets/volcano2.png');
        game.load.image('volcano3','./assets/volcano3.png');
        game.load.image('volcano4','./assets/volcano4.png');
        game.load.image('volcano_ground','./assets/volcano7.png');
        game.load.image('volcano5','./assets/volcano6.png');
        game.load.image('volcano_ground2','./assets/volcano5.png');

        //candy
        game.load.image('candy1','./assets/candy1.png');
        game.load.image('candy2','./assets/candy2.png');
        game.load.image('candy3','./assets/candy3.png');
        game.load.image('candy4','./assets/candy4.png');
        game.load.image('candy_ground','./assets/candy12.png');
        game.load.image('candy5','./assets/candy10.png');
        game.load.image('candy_ground2','./assets/candy5.png');
        game.load.image('candy_wall','./assets/candy11.png');

        //snow
        game.load.image('snow1','./assets/ice1.png');
        game.load.image('snow2','./assets/ice2.png');
        game.load.image('snow3','./assets/ice3.png');
        game.load.image('snow4','./assets/ice4.png');
        game.load.image('snow_ground','./assets/ice6.png');
        game.load.image('snow5','./assets/ice9.png');
        game.load.image('snow_ground2','./assets/ice7.png');

        //forest
        game.load.image('forest1','./assets/forest1.png');
        game.load.image('forest2','./assets/forest2.png');
        game.load.image('forest3','./assets/forest3.png');
        game.load.image('forest4','./assets/forest4.png');
        game.load.image('forest_ground','./assets/forest8.png');
        game.load.image('forest5','./assets/forest7.png');


        //player
        game.load.image('player1_original','./assets/player1_original.png');
        game.load.spritesheet('player1', './assets/player1.png',36.5, 40);

        //scoreboard
        //player headshot
        game.load.image('headshot1','./assets/headshot_01.png');
        game.load.image('headshot2','./assets/headshot_02.png');
        game.load.image('headshot3','./assets/headshot_03.png');
        game.load.image('headshot4','./assets/headshot_04.png');
        //level number
        game.load.image('levelNumber1','./assets/levelNumber1.png');
        game.load.image('levelNumber2','./assets/levelNumber2.png');
        game.load.image('levelNumber3','./assets/levelNumber3.png');
        //button
        //game.load.spritesheet('button_pause', './assets/button_pause.png',100, 93);
        game.load.spritesheet('button_pause', './assets/button_stop.png',100, 95);
        game.load.spritesheet('button_voice', './assets/button_voice.png',100, 95);
        game.load.spritesheet('button_menu', './assets/button_menu.png',100, 95);

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
        game.load.spritesheet('button_click', 'assets/button_click.png', 237, 178);
        game.load.spritesheet('button_signin', './assets/lock_bt.png', 169, 149);
        game.load.spritesheet('button_menu2', './assets/button_menu2.png',150,80);
        game.load.spritesheet('button_mode2', './assets/button_mode.png',150,80);
        game.load.spritesheet('button_info', './assets/info_bt.png',71,68);

        // Power up sprites
        game.load.image('boots', 'assets/boots.png');
        // game.load.image('star', 'assets/star.png');

        // Audio clip sprites
        game.load.audio('bg-music-2', 'assets/music_1.wav');
        game.load.audio('bomb-sound', 'assets/bomb-sound.wav');
        game.load.audio('power-up', 'assets/power-up.wav');
        game.load.audio('winner', 'assets/winner.wav');
        game.load.audio('intro', 'assets/intro.wav');
        game.load.audio('game-start', 'assets/game-start.wav');
        game.load.audio('round-end', 'assets/round-end.wav');
        game.load.audio('bg-music', 'assets/bg_music.wav');
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
        game.load.spritesheet('star', 'assets/star1.png',28, 30);
        //Lighting
        game.load.spritesheet('lighting', 'assets/lighting.png',40, 40);
        //Heart
        game.load.spritesheet('heart', 'assets/heart.png',48, 40);
        //snow
        game.load.spritesheet('snow', 'assets/snow.png',40, 40);


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
        game.load.spritesheet('glove2', 'assets/glove_2.png', 40, 40);

        game.load.spritesheet('fire', './assets/fire.png',  37.5,110);

    },
    create: function() {

        console.log('load state ok');
        game.state.start('menu');

    } 
};
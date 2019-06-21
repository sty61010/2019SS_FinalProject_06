// var button_rank;
// var button_music;
// var button_sound;
// var button_start;
// var bg;

var menuState = { 
    create: function() {
        // Add a background image 
        game.stage.backgroundColor = '#000000';
        this.bg = game.add.tileSprite(0, 0, 1280, 720, 'bg_menu2');
        
        //this.volcano = game.add.image(50, 400, 'menu_1');
        //this.explosion = game.add.sprite(150,280, 'menu_2');
         this.volcano = game.add.sprite(70,250, 'menu_4');
         this.volcano.animations.add('exp', [0,1,2,3,4,5,6,7], 5, true);
         this.volcano.animations.play('exp');

 
        //this.bg = game.add.image(0, 0, 'background_menu'); 
        //this.bg.alpha=0.5;
        // Display the name of the game
        this.title = game.add.sprite(50,50, 'title');
        this.title.animations.add('move', [0,1,2,3,4], 30, true);
        this.title.animations.play('move');

        //var nameLabel = game.add.text(game.width/2-100, 150, 'Final Explosion', { font: '60px Georgia', fill: '#ffffff' }); 
        //nameLabel.anchor.setTo(0.5, 0.5);

        this.button_rank = game.add.button(580, 80, 'button_rank', this.checkRank, this, 0, 1, 0);
        this.button_rank.scale.setTo(0.5,0.5);
        this.button_music = game.add.button(580, 180, 'button_music', this.musicChange, this, 1, 0, 0);
        this.button_music.scale.setTo(0.5,0.5);
        this.button_sound = game.add.button(580, 280, 'button_sound', this.soundChange, this, 1, 0, 0);
        this.button_sound.scale.setTo(0.5,0.5);
        this.button_mode = game.add.button(680, 80, 'button_mode', this.modeChange, this, 1, 0, 0);
        this.button_mode.scale.setTo(0.5, 0.5);
        this.button_signin = game.add.button(680, 180, 'button_signin', this.signinPage, this, 0, 1, 0);
        this.button_signin.scale.setTo(0.5, 0.5);
        this.button_signin = game.add.button(680, 280, 'button_info', this.infoPage, this, 0, 1, 0);
        this.button_signin.scale.setTo(1.2, 1.2); 

        this.button_start = game.add.button(game.width/2, game.height/2+100, 'button_play', this.clickStart, this, 1, 0, 0);
        this.button_start.anchor.setTo(0.5, 0.5);

        if (game.global.sound == 1){
            music = game.add.audio('bg-music');
            music.play();
        }

        this.button_rank.onInputOver.add(this.buttonOver,this);
        this.button_mode.onInputOver.add(this.buttonOver,this);
        this.button_music.onInputOver.add(this.buttonOver,this);
        this.button_sound.onInputOver.add(this.buttonOver,this);
        this.button_start.onInputOver.add(this.buttonOver,this);



    },
    update:function(){
        this.bg.tilePosition.x -= 3;
        if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
            game.state.start('signin');
        }
    }, 
    buttonOver:function(){
        this.buttonSound=game.add.audio('button_sound');
        if(game.global.sound==1)
            this.buttonSound.play();
    },
    start: function() {
        // Start the actual game 
        console.log('menu ok');
        game.state.start('normal'); 
    },
    checkRank: function () {
        game.state.start('win');
    },
    modeChange: function(){
        game.state.start('mode');
    },
    clickStart: function () {
        game.state.start('normal');
        //game.state.start('win');

    },
    musicChange: function () {
        if (game.global.music == 1){
            game.global.music = 0;
            music.stop();
        }
        else{
            game.global.music = 1;
            music.play();
        }
        console.log('music:'+game.global.music);
    },
    soundChange: function () {
        if (game.global.sound == 1){
            game.global.sound = 0;
        }
        else{
            game.global.sound = 1;
        }
        console.log('sound:'+game.global.sound);
    },
    signinPage: function(){
        game.state.start('signin');
    },
    infoPage: function(){
        game.state.start('info');
    }
};
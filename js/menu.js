// var button_rank;
// var button_music;
// var button_sound;
// var button_start;
// var bg;

var menuState = { 
    create: function() {
        // Add a background image 
        this.bg = game.add.image(0, 0, 'background_menu'); 
        //this.bg.alpha=0.5;
        // Display the name of the game
        var nameLabel = game.add.text(game.width/2-100, 150, 'Final Explosion', 
        { font: '60px Georgia', fill: '#ffffff' }); 
        nameLabel.anchor.setTo(0.5, 0.5);

        this.button_rank = game.add.button(game.width-150, 50, 'button_rank', this.checkRank, this, 1, 0, 0);
        this.button_rank.scale.setTo(0.5,0.5);
        this.button_music = game.add.button(game.width-150, 150, 'button_music', this.musicChange, this, 1, 0, 0);
        this.button_music.scale.setTo(0.5,0.5);
        this.button_sound = game.add.button(game.width-150, 250, 'button_sound', this.soundChange, this, 1, 0, 0);
        this.button_sound.scale.setTo(0.5,0.5);
        this.button_start = game.add.button(game.width/2, game.height/2+100, 'button_play', this.clickStart, this, 1, 0, 0);
        this.button_start.anchor.setTo(0.5, 0.5);
        this.button_mode = game.add.button(game.width-150, 350, 'button_mode', this.modeChange, this, 1, 0, 0);
        this.button_mode.scale.setTo(0.5, 0.5);
        // if (game.global.sound == 1){
        //     music = game.add.audio('bg-music');
        //     music.play();
        // }

        this.button_rank.onInputOver.add(this.buttonOver,this);
        this.button_mode.onInputOver.add(this.buttonOver,this);
        this.button_music.onInputOver.add(this.buttonOver,this);
        this.button_sound.onInputOver.add(this.buttonOver,this);
        this.button_start.onInputOver.add(this.buttonOver,this);

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
        game.state.start('rank');
    },
    modeChange: function(){
        game.state.start('mode');
    },
    clickStart: function () {
        game.state.start('normal');
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
};
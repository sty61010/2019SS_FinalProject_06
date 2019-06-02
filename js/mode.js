// var button_rank;
// var button_music;
// var button_sound;
// var button_start;
// var bg;

var modeState = { 
    create: function() {
        // Add a background image 
        this.bg = game.add.image(0, 0, 'background_menu'); 
        //this.bg.alpha=0.5;
        // Display the name of the game
        var nameLabel = game.add.text(game.width/2, 50, 'Game Mode', { font: '60px Georgia', fill: '#ffffff' }); 
        nameLabel.anchor.setTo(0.5, 0.5);

        this.button_coincollect = game.add.button(game.world.centerX - 295, 400, 'button_play', this.killing, this, 1, 0, 0);
        this.button_coincollect.scale.setTo(0.5,0.5);
        this.button_normal = game.add.button(game.world.centerX - 95, 400, 'button_play', this.normal, this, 1, 0, 0);
        this.button_normal.scale.setTo(0.5,0.5);
        this.button_killing = game.add.button(game.world.centerX + 115, 400, 'button_play', this.coincollect, this, 1, 0, 0);
        this.button_killing.scale.setTo(0.5,0.5);

        game.add.text(game.world.centerX - 295, 450, 'Killing Mode', { font: '20px Georgia', fill: '#ffffff' }); 
        game.add.text(game.world.centerX - 95, 450, 'Normal Mode', { font: '20px Georgia', fill: '#ffffff' }); 
        game.add.text(game.world.centerX +115, 450, 'Coin Collecting Mode', { font: '20px Georgia', fill: '#ffffff' });

        this.button_coincollect.onInputOver.add(this.buttonOver,this);
        this.button_normal.onInputOver.add(this.buttonOver,this);
        this.button_killing.onInputOver.add(this.buttonOver,this);
    }, 
    buttonOver:function(){
        this.buttonSound=game.add.audio('button_sound');
        if(game.global.sound==1)
            this.buttonSound.play();
    },
    killing:function(){

    },
    coincollect:function(){
        game.state.start('coincollect');
    },
    normal(){
        game.state.start('normal');

    }
};
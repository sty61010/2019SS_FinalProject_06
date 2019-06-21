var modeState = { 
    create: function() {
        // Add a background image 
        this.bg = game.add.image(0, 0, 'bg_menu4'); 
  
        // Display the name of the game
        // var nameLabel = game.add.text(game.width/2, 50, 'Game Mode', { font: '60px Georgia', fill: '#ffffff' }); 
        // nameLabel.anchor.setTo(0.5, 0.5);

        this.button_coincollect = game.add.button(50, 300, 'button_click', this.killing, this, 1, 0, 0);
        this.button_coincollect.onInputOver.add(this.fire1,this);
        //this.button_coincollect.scale.setTo(0.5,0.5);
        this.button_normal = game.add.button(300, 300, 'button_click', this.normal, this, 1, 0, 0);
        this.button_normal.onInputOver.add(this.fire2,this);
        //this.button_normal.scale.setTo(0.5,0.5);
        this.button_killing = game.add.button(550, 300, 'button_click', this.coincollect, this, 1, 0, 0);
        this.button_killing.onInputOver.add(this.fire3,this);
        //this.button_killing.scale.setTo(0.5,0.5);

        // game.add.text(game.world.centerX - 295, 450, 'Killing Mode', { font: '20px Georgia', fill: '#ffffff' }); 
        // game.add.text(game.world.centerX - 95, 450, 'Normal Mode', { font: '20px Georgia', fill: '#ffffff' }); 
        // game.add.text(game.world.centerX +115, 450, 'Coin Collecting Mode', { font: '20px Georgia', fill: '#ffffff' });

        this.button_coincollect.onInputOver.add(this.buttonOver,this);
        this.button_normal.onInputOver.add(this.buttonOver,this);
        this.button_killing.onInputOver.add(this.buttonOver,this);
    }, 
    buttonOver:function(){
        this.buttonSound=game.add.audio('button_sound');
        if(game.global.sound==1)
            this.buttonSound.play();
    },
    fire1: function(){
        console.log('over');
        this.fire = game.add.sprite(120,1, 'fire');
        this.fire.scale.setTo(3);
        this.fire.animations.add('fire', [0,1,2,3,4,5,6,7], 5, true);
        this.fire.animations.play('fire');
    },
    fire2: function(){
        console.log('over');
        this.fire = game.add.sprite(370,1, 'fire');
        this.fire.scale.setTo(3);
        this.fire.animations.add('fire', [0,1,2,3,4,5,6,7], 5, true);
        this.fire.animations.play('fire');
    },
    fire3: function(){
        console.log('over');
        this.fire = game.add.sprite(620,1, 'fire');
        this.fire.scale.setTo(3);
        this.fire.animations.add('fire', [0,1,2,3,4,5,6,7], 5, true);
        this.fire.animations.play('fire');
    },
    killing:function(){
        game.state.start('killing');
        
    },
    coincollect:function(){
        game.state.start('coincollect');
    },
    normal:function(){
        game.state.start('normal');

    }
};
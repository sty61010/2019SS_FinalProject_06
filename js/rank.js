var rankState = {
    preload: function (){
        console.log('rank state ok');
    },
    create: function() {
        var nameLabel = game.add.text(game.width/2, 50, 'ScoreBoard', { font: '60px Georgia', fill: '#ffffff' }); 
        nameLabel.anchor.setTo(0.5, 0.5);

        this.button_start = game.add.button(game.width/2, game.height/2+200, 'button_play', this.clickStart, this, 1, 0, 0);
        this.button_start.anchor.setTo(0.5, 0.5);
        this.button_start.scale.setTo(0.5);
        this.button_start.onInputOver.add(this.buttonOver,this);
        pushData();
    }, 
    buttonOver:function(){
        this.buttonSound=game.add.audio('button_sound');
        if(game.global.sound==1)
            this.buttonSound.play();
    }
}; 

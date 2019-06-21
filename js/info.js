var infoState = { 
    create: function() {

        console.log('info state ok');
        game.add.image(0, 0, 'bg_menu6'); 

        this.rKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
    
    },
    update: function(){
        if (this.rKey.isDown){
            game.state.start('menu');
        }
    }

};
var winState = { 
    create: function() {

        console.log('win state ok');
        game.add.image(0, 0, 'bg_menu5'); 
        var hs1 = game.add.image(70,130,'headshot1');
        hs1.scale.setTo(1.5);
        var nameLabel = game.add.text(130,110, ': '+score1, { font: '80px Georgia', fill: '#fff' }); 
        var hs2 = game.add.image(70,230,'headshot2');
        hs2.scale.setTo(1.5);
        var nameLabel2 = game.add.text(130,210, ': '+score2, { font: '80px Georgia', fill: '#fff' }); 
        var hs3 = game.add.image(70,330,'headshot3');
        hs3.scale.setTo(1.5);
        var nameLabel3 = game.add.text(130,310, ': '+score3, { font: '80px Georgia', fill: '#fff' }); 
        var hs4 = game.add.image(70,430,'headshot4');
        hs4.scale.setTo(1.5);
        var nameLabel4 = game.add.text(130,410, ': '+score4, { font: '80px Georgia', fill: '#fff' }); 

        this.button_restart = game.add.button(60, 510, 'button_menu2', this.clickMenu, this, 1, 0, 0);
        //button_restart.scale.setTo(0.5);

        //nameLabel.anchor.setTo(0.5, 0.5);
        
        //  The score
        //scoreString = 'Score : ';
        //scoreText = game.add.text(80, game.height/2-150, scoreString + game.global.score, {  font: '36px Georgia', fill: '#fff' });

        //  The level
        // levelString = 'Level : ';
        // levelText = game.add.text(80, game.height/2-150, levelString + game.global.level, { font: '36px Georgia', fill: '#fff' });

        // this.button_restart = game.add.button(game.width/2-100, 300, 'button_restart', this.clickRestart, this, 0, 0, 0);
        // this.button_back = game.add.button(game.width/2-100, 400, 'button_back', this.clickMenu, this, 0, 0, 0);

    }, 
    start: function() {

    },
    clickMenu: function() {
        game.state.start('menu');
    },
    clickRestart: function () {

        game.global.score1 = 1;
        game.global.score2 = 1;
        game.global.level = 1;

        game.state.start('play');
    
    },
    clickMenu: function () {
        game.global.score1 = 1;
        game.global.score2 = 1;
        game.global.level = 1;

        game.state.start('menu');
        
    }
};
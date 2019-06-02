var winState = { 
    create: function() {

        console.log('win state ok');
        game.add.image(0, 0, 'background_win'); 
        var nameLabel = game.add.text(game.width/2-200, 80, 'You win', 
        { font: '80px Georgia', fill: '#fff' }); 
        nameLabel.anchor.setTo(0.5, 0.5);
        
        //  The score
        //scoreString = 'Score : ';
        //scoreText = game.add.text(80, game.height/2-150, scoreString + game.global.score, {  font: '36px Georgia', fill: '#fff' });

        //  The level
        levelString = 'Level : ';
        levelText = game.add.text(80, game.height/2-150, levelString + game.global.level, { font: '36px Georgia', fill: '#fff' });

        this.button_restart = game.add.button(game.width/2-100, 300, 'button_restart', this.clickRestart, this, 0, 0, 0);
        this.button_back = game.add.button(game.width/2-100, 400, 'button_back', this.clickMenu, this, 0, 0, 0);

    }, 
    start: function() {

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
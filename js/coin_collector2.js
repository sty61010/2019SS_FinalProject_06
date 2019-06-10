



var coincollectState2 = {
    preload: function(){
    },
    //=============================================================================================
    create: function(){
        this.BLOCK_COUNT = 15;
        this.PIXEL_SIZE = GAME_SIZE / this.BLOCK_COUNT;
        music = game.add.audio('bg-music', 1, true);
        // music.play();
        this.bg_score = game.add.image(600, 0, 'background_score'); 
        game.stage.backgroundColor = "#000000";
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;

        // Adds ground to entire map
        for (var x = 0; x < 15; x++) {
            for (var y = 0; y < 15; y++) {
                this.addGround(x, y);
            }
        }
        // Group container of game sprites
        this.groupCreate();
        // Adds walls, bricks and powerups
        this.createMap();
        // Players 1's intial properties
        this.playerSpeed = 150;
        this.playerPower = false;
        this.playerDrop = true;
        // Players 2's intial properties
        this.playerSpeed_2 = 150;
        this.playerPower_2 = false;
        this.playerDrop_2 = true;

        //control
        this.control();
        // Creates game feedback message
        this.gameMessage = "";

        // Adds audio clips to game
        this.soundCreate();
        //scoreboard
        this.scoreboard();
        //Live UI
        this.liveCreate();

    },
    liveCreate:function(){
        livegroup1 = game.add.group();
        for (var i = 0; i < live1; i++) 
        {
            var livestate = game.add.sprite(game.width-140+i*40 , 100, 'heart');
            livestate.body.immovable = true;
            livestate.anchor.setTo(1);
            livestate.scale.setTo(0.7);
            livestate.animations.add('heart', [0,1,2,3,4,5,6],5,true);
            livestate.play('heart');
            livegroup1.add(livestate);

        }
        livegroup2 = game.add.group();
        for (var i = 0; i < live2; i++) 
        {
            var livestate = game.add.sprite(game.width-140+i*40 , 200, 'heart');
            livestate.body.immovable = true;
            livestate.anchor.setTo(1);
            livestate.scale.setTo(0.7);
            livestate.animations.add('heart', [0,1,2,3,4,5,6],5,true);
            livestate.play('heart');
            livegroup2.add(livestate);

        }
    },
    groupCreate:function(){

        this.grassList = game.add.group();
        this.coinList = game.add.group();
        this.wallList = game.add.group();
        this.bootList = game.add.group();
        this.starList = game.add.group();
        this.brickList = game.add.group();
        this.bombList = game.add.group();
        this.bombList_2 = game.add.group();
        this.flagList = game.add.group();
        this.explosionList = game.add.group();
        this.explosionList_2 = game.add.group();
        this.addPlayers();
    },
    soundCreate:function(){
        bombSound = game.add.audio('bomb-sound');
        powerUp = game.add.audio('power-up');
        winner = game.add.audio('winner');
        intro = game.add.audio('intro');
        gameStart = game.add.audio('game-start');
        roundEnd = game.add.audio('round-end');
    },
    control:function(){
        // Creates listeners for player 1's controls
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.qKey=game.input.keyboard.addKey(Phaser.Keyboard.Q);
        this.kKey=game.input.keyboard.addKey(Phaser.Keyboard.K);
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // Creates listeners for player 2's controls
        this.cursor = game.input.keyboard.createCursorKeys();
        this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    },
    scoreboard:function(){
        // scoreText1=game.add.text(620, 50, scoreString1+score1, { font: '30px Georgia', fill: '#fff' });
        // scoreText2=game.add.text(620, 200, scoreString2+score2, { font: '30px Georgia', fill: '#fff' });
        // scoreText3=game.add.text(620, 350, scoreString3+score3, { font: '30px Georgia', fill: '#fff' });
        // scoreText4=game.add.text(620, 500, scoreString4+score4, { font: '30px Georgia', fill: '#fff' });
        scoreString1 = 'Player 1: ';
        scoreString2 = 'Player 2: ';
        scoreString3 = 'Player 3: ';
        scoreString4 = 'Player 4: ';
        levelString = 'Level : ';
        scoreText1 = game.add.text(game.width-170, 40, scoreString1 + score1, {  font: '28px Georgia', fill: '#fff' });
        scoreText2 = game.add.text(game.width-170, 140, scoreString2 + score2, {  font: '28px Georgia', fill: '#fff' });
        scoreText3 = game.add.text(game.width-170, 240, scoreString3 + score3, {  font: '28px Georgia', fill: '#fff' });
        scoreText4 = game.add.text(game.width-170, 340, scoreString4 + score4, {  font: '28px Georgia', fill: '#fff' });
        levelText = game.add.text(game.width-170, 440, levelString + level, {  font: '28px Georgia', fill: '#fff' });
    },
    //=============================================================================================
    update: function(){
        //Player Move
        this.player1Move();
        this.player2Move();
        this.player3Move();
        this.player4Move();

        game.physics.arcade.collide(this.player, this.wallList);
        game.physics.arcade.collide(this.player, this.brickList);

        game.physics.arcade.collide(this.player_2, this.wallList);
        game.physics.arcade.collide(this.player_2, this.brickList);

        game.physics.arcade.overlap(this.player, this.explosionList, this.burn, null, this);
        game.physics.arcade.overlap(this.player, this.explosionList_2, this.burn, null, this);

        game.physics.arcade.overlap(this.player_2, this.explosionList_2, this.burn, null, this);
        game.physics.arcade.overlap(this.player_2, this.explosionList, this.burn, null, this);

        game.physics.arcade.overlap(this.explosionList, this.flagList.children[0], function(){this.getFlag(1);}, null, this);
        game.physics.arcade.overlap(this.explosionList_2, this.flagList.children[1], function(){this.getFlag(2);}, null, this);

        game.physics.arcade.overlap(this.player, this.bootList, this.speedUp, null, this);
        game.physics.arcade.overlap(this.player_2, this.bootList, this.speedUp, null, this);

        game.physics.arcade.overlap(this.player, this.starList, this.starUp, null, this);
        game.physics.arcade.overlap(this.player_2, this.starList, this.starUp, null, this);
        
        game.physics.arcade.overlap(this.player, this.coinList, this.getCoin, null, this);
        game.physics.arcade.overlap(this.player_2, this.coinList, this.getCoin, null, this);

        //win
        if(score1 == 20){
            this.showGameWinner(1);
        }
        else if(score2==20){
            this.showGameWinner(2);
        }
        if (this.kKey.isDown){
            this.showGameWinner(1);
        }

    },
    //=============================================================================================
    player1Move:function(){
        if (this.cursor.down.isDown || this.cursor.up.isDown || this.cursor.right.isDown || this.cursor.left.isDown){
            if (this.cursor.left.isDown){
                this.player.body.velocity.x = -(this.playerSpeed);
                this.player.loadTexture('bomber-left', 0);
            }
            if (this.cursor.right.isDown){
                this.player.body.velocity.x = (this.playerSpeed);
                this.player.loadTexture('bomber-right', 0);
            }
            if (this.cursor.up.isDown){
                this.player.body.velocity.y = -(this.playerSpeed);
                this.player.loadTexture('bomber-back', 0);
            }
            if (this.cursor.down.isDown){
                this.player.body.velocity.y = (this.playerSpeed);
                this.player.loadTexture('bomber-front', 0);
            }
        } else{
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
        }

        if (this.spaceKey.justUp){
            this.dropBomb(1);
        }
    },
    player2Move:function(){
        if (this.aKey.isDown || this.sKey.isDown || this.dKey.isDown || this.wKey.isDown){
            if (this.aKey.isDown){
                this.player_2.body.velocity.x = -(this.playerSpeed_2);
                this.player_2.loadTexture('bomber-left', 0);
                // this.player_2.body.velocity.y = 0;
            }
            if (this.dKey.isDown){
                this.player_2.body.velocity.x = (this.playerSpeed_2);
                this.player_2.loadTexture('bomber-right', 0);
                // this.player_2.body.velocity.y = 0;
            }
            if (this.wKey.isDown){
                this.player_2.body.velocity.y = -(this.playerSpeed_2);
                this.player_2.loadTexture('bomber-back', 0);
                // this.player_2.body.velocity.x = 0;
            }
            if (this.sKey.isDown){
                this.player_2.body.velocity.y = (this.playerSpeed_2);
                this.player_2.loadTexture('bomber-front', 0);
                // this.player_2.body.velocity.x = 0;
            }
        } else{
            this.player_2.body.velocity.x = 0;
            this.player_2.body.velocity.y = 0;
        }
        if (this.qKey.isDown){
            this.dropBomb(2);
        }
    },
    player3Move:function(){

    },
    player4Move:function(){

    },
    //=============================================================================================
    createMap: function(){
        for (var x = 0; x < 15; x++) {
            for (var y = 0; y < 15; y++) {
                if( x == 1 && x == y){
                    this.addBlueFlag();
                    this.addRedFlag();
                    // this.addCoin();
                }
                if((x==6||x==7||x==8)&&(y==6||y==7||y==8))
                    this.addWall(x,y);
                if (x === 0 || y === 0 || x == 14 || y == 14){
                    this.addWall(x, y);
                }
                else if(x % 2 === 0 && y % 2 === 0){
                    this.addBrick(x,y);
                    this.addCoin(x,y);
                } else if(x < 4 && y < 4 || x > 10 && y > 10){
                    this.addGrass(x, y);
                } else {
                    if(Math.floor(Math.random() * 3)){

                        if(Math.floor(Math.random() * 1.02)){
                            this.addBoots(x, y);
                        }
                        if(Math.floor(Math.random() * 1.02)){
                            this.addStar(x, y);
                        }
                    } 
                    else {
                    }
                    this.addGrass(x, y);

                }
            }
        }
    },
    burn: function(player,fire){
        fire.kill();
        if(player==this.player){
            score2+=1;
            scoreText2.text = scoreString2 + score2;
            ///live
            live = livegroup1.getFirstAlive();
            if (live)
            {
                live.kill();
            }
            if (livegroup1.countLiving() < 1)
            {
                this.player.kill();
                this.showGameWinner(2);
            }
        }
        else if(player==this.player_2){
            score1+=1;
            scoreText1.text = scoreString1 + score1;
            ///live
            live = livegroup2.getFirstAlive();
            if (live)
            {
                live.kill();
            }
            if (livegroup2.countLiving() < 1)
            {
                this.player_2.kill();
                this.showGameWinner(1);
            }
        }
    },

    getFlag: function(player){
        powerUp.play();
        var x=game.width-210;
        var y;
        if(player==1){
            this.flagList.children[0].kill();
            score1+=5;
            scoreText1.text = scoreString1 + score1;
            y=10;
            var Flag = game.add.sprite(x, y, 'red-flag');
            Flag.body.immovable = true;
        }
        else if (player==2){
            this.flagList.children[1].kill();
            score2+=5;
            scoreText2.text = scoreString2 + score2;
            y=110;
            var Flag = game.add.sprite(x,y, 'blue-flag');
            Flag.body.immovable = true;
        }
    },
    starUp: function(player,star){
        powerUp.play();
        var x=game.width-130;
        var y;
        if(player == this.player){
            this.playerPower = true;
            y=50;
        } else if(player==this.player_2){
            this.playerPower_2 = true;
            y=150;
        }
        star.kill();
        //        
        var starstate = game.add.sprite(x, y, 'star');
        starstate.body.immovable = true;
        starstate.anchor.setTo(1);
        starstate.animations.add('star', [0,1,2,3,4],5,true);
        starstate.play('star');
    },
    getCoin:function(player, coin){
        powerUp.play();
        if(player == this.player){
            score1+=1;
            scoreText1.text = scoreString1 + score1;
        } else if(player==this.player_2){
            score2+=1;
            scoreText2.text=scoreString2+score2;
        }
        coin.kill();
    },
    speedUp: function(player, boot){
        powerUp.play();
        var x=game.width-100;
        var y;
        if(player == this.player){
            this.playerSpeed = 350;
            y=50;
        } else if(player==this.player_2){
            this.playerSpeed_2 = 350;
            y=150;
        }
        var boots = game.add.sprite(x, y, 'lighting');
        boots.body.immovable = true;
        boots.anchor.setTo(1);
        boots.animations.add('lighting', [0,1,2,3],5,true);
        boots.play('lighting');
        boot.kill();
    },
    addPlayers: function(){
        this.player = game.add.sprite(GAME_SIZE - 2 * this.PIXEL_SIZE, GAME_SIZE - 2 * this.PIXEL_SIZE, 'bomber');
        game.physics.arcade.enable(this.player);
        this.player_2 = game.add.sprite(this.PIXEL_SIZE, this.PIXEL_SIZE, 'bomber');
        game.physics.arcade.enable(this.player_2);
    },
    addBoots: function(x, y){
        var boots = game.add.sprite(x * this.PIXEL_SIZE, y * this.PIXEL_SIZE, 'lighting');
        game.physics.arcade.enable(boots);
        boots.body.immovable = true;
        boots.anchor.setTo(0);
        boots.animations.add('lighting', [0,1,2,3],5,true);
        boots.play('lighting');
        this.bootList.add(boots);
    },
    addStar: function(x, y){
        var star = game.add.sprite(x * this.PIXEL_SIZE, y * this.PIXEL_SIZE, 'star');
        game.physics.arcade.enable(star);
        star.body.immovable = true;
        star.anchor.setTo(0);
        star.animations.add('star', [0,1,2,3,4],5,true);
        star.play('star');
        this.starList.add(star);
    },
    addCoin: function(x, y){
        var coin = game.add.sprite(x * this.PIXEL_SIZE, y * this.PIXEL_SIZE, 'coin');
        game.physics.arcade.enable(coin);
        coin.body.immovable = true;
        // coin.scale.setTo(0.5);        
        coin.anchor.setTo(0);
        coin.animations.add('coin', [0,1,2,3,4],5,true);
        coin.play('coin');
        this.coinList.add(coin);
    },
    addBlueFlag: function(){
        var blueFlag = game.add.sprite(1 * this.PIXEL_SIZE, 1 * this.PIXEL_SIZE, 'blue-flag');
        game.physics.arcade.enable(blueFlag);
        blueFlag.body.immovable = true;
        this.flagList.add(blueFlag);

    },
    addRedFlag: function(){
        var redFlag = game.add.sprite((this.BLOCK_COUNT - 2) * this.PIXEL_SIZE, (this.BLOCK_COUNT - 2) * this.PIXEL_SIZE, 'red-flag');
        game.physics.arcade.enable(redFlag);
        redFlag.body.immovable = true;
        this.flagList.add(redFlag);
    },
    addWall: function(x, y){
        var wall = game.add.sprite(x * this.PIXEL_SIZE, y * this.PIXEL_SIZE, 'wall');
        game.physics.arcade.enable(wall);
        wall.body.immovable = true;
        this.wallList.add(wall);
    },
    addBrick: function(x, y){
        var brick = game.add.sprite(x * this.PIXEL_SIZE, y * this.PIXEL_SIZE, 'brick');
        game.physics.arcade.enable(brick);
        brick.body.immovable = true;
        this.brickList.add(brick);

    },
    addGrass: function(x, y){
        var grass = game.add.sprite(x * this.PIXEL_SIZE, y * this.PIXEL_SIZE, 'grass');
        game.physics.arcade.enable(grass);
        grass.body.immovable = true;
        this.grassList.add(grass);

    },
    addGround: function(x, y){
        var wall = game.add.sprite(x * this.PIXEL_SIZE, y * this.PIXEL_SIZE, 'ground');
        wall.body.immovable = true;
    },
    detonateBomb: function(player, x, y, explosionList, wallList, brickList){
        bombSound.play();
        // this.bombExplosion(x,y);
        this.emitter = game.add.emitter(0, 0, 500);
        this.emitter.makeParticles('pixel');
        this.emitter.setYSpeed(-500, 500);
        this.emitter.setXSpeed(-500, 500);
        this.emitter.setScale(2, 0, 2, 0, 800);
        this.emitter.gravity = 0;
        // this.emitter.scale.setTo(0.1,0.1);

        this.emitter.x = x;
        this.emitter.y = y; 
        this.emitter.start(true, 800, null, 15);

        var fire = [
            game.add.sprite(x, y, 'explosion'),
            game.add.sprite(x, y + 40, 'explosion'),
            game.add.sprite(x, y - 40, 'explosion'),
            game.add.sprite(x + 40, y, 'explosion'),
            game.add.sprite(x - 40, y, 'explosion')
        ];
        if(player == 1 && coincollectState2.playerPower){
            fire.push(game.add.sprite(x, y + 80, 'explosion'));
            fire.push(game.add.sprite(x, y - 80, 'explosion'));
            fire.push(game.add.sprite(x + 80, y, 'explosion'));
            fire.push(game.add.sprite(x - 80, y, 'explosion'));
        } else if (player == 2 && coincollectState2.playerPower_2) {
            fire.push(game.add.sprite(x, y + 80, 'explosion'));
            fire.push(game.add.sprite(x, y - 80, 'explosion'));
            fire.push(game.add.sprite(x + 80, y, 'explosion'));
            fire.push(game.add.sprite(x - 80, y, 'explosion'));

        }
        for (var i = 0; i < fire.length; i++) {
            fire[i].body.immovable = true;
            explosionList.add(fire[i]);
        }

        for (i = 0; i < fire.length; i++) {
            if(game.physics.arcade.overlap(fire[i], wallList)){
                fire[i].kill();
                if(i > 0 && fire[i + 4] !== undefined){
                    fire[i + 4].kill();
                }
            }
        }
        setTimeout(function(){
            explosionList.forEach(function(element){
                element.kill();
            });
            var temp = brickList.filter(function(element){
                for (var i = 0; i < fire.length; i++) {
                    if(element.x == fire[i].x && element.y == fire[i].y){
                        return true;
                    }
                }
                return false;
            });

            temp.list.forEach(function(element){
                element.kill();
            });
        }, 1000);
    },
    dropBomb: function(player){
        var gridX;
        var gridY;
        var bomb;
        var detonateBomb;
        var explosionList;
        var wallList;
        var brickList;
        if(player == 1  && this.playerDrop){
            this.playerDrop = false;
            gridX = this.player.x - this.player.x % 40;
            gridY = this.player.y - this.player.y % 40;

            bomb = game.add.sprite(gridX, gridY, 'bomb1');
            bomb.anchor.setTo(0)
            // bomb.scale.setTo(0.5,0.5);
            bomb.animations.add('bomb1', [0,1,2,3,4,5], 5, true);
            bomb.play('bomb1',true,true); 
            game.physics.arcade.enable(bomb);
            bomb.body.immovable = true;
            this.bombList.add(bomb);

            detonateBomb = this.detonateBomb;
            explosionList = this.explosionList;
            wallList = this.wallList;
            brickList = this.brickList;
            setTimeout(function(){
                bomb.kill();
                detonateBomb(player, bomb.x, bomb.y, explosionList, wallList, brickList);
                coincollectState2.enablePlayerBomb(1);
            }, 2000);

            setTimeout(this.thisEnableBomb, 2000);

        } else if (player == 2  && this.playerDrop_2){
            this.playerDrop_2 = false;
            gridX = this.player_2.x - this.player_2.x % 40;
            gridY = this.player_2.y - this.player_2.y % 40;

            bomb = game.add.sprite(gridX, gridY, 'bomb1');

            bomb.anchor.setTo(0)
            // bomb.scale.setTo(0.5,0.5);
            bomb.animations.add('bomb1', [0,1,2,3,4,5], 5, true);
            bomb.play('bomb1',true,true);
            game.physics.arcade.enable(bomb);
            bomb.body.immovable = true;
            this.bombList_2.add(bomb);

            detonateBomb = this.detonateBomb;
            explosionList_2 = this.explosionList_2;
            wallList = this.wallList;
            brickList = this.brickList;

            setTimeout(function(){
                bomb.kill();
                detonateBomb(player, bomb.x, bomb.y, explosionList_2, wallList, brickList);
                coincollectState2.enablePlayerBomb(2);
            }, 2000);
        }
    },
    enablePlayerBomb: function(player){
        if(player == 1){
            this.playerDrop = true;
        } else {
            this.playerDrop_2 = true;
        }

    },
    showGameWinner: function(player){
        this.gameMessage = game.add.text(150, 150, 'Player ' +player+"Wins", { font: '60px Georgia', fill: '#ffffff' });
        this.play2_bt = game.add.button(200, game.height/2+100, 'button_play2', this.restartGame, this, 1, 0, 0);        
        this.next_bt = game.add.button(350, game.height/2+95, 'button_next', this.nextLevel, this, 1, 0, 0);   
    },
    restartGame: function(){
        score1=0;
        score2=0;
        score3=0;
        score4=0;
        live1=3;
        live2=3;
        live3=3;
        live4=4;

        music.stop();
        gameStart.play();
        game.state.start('coincollect2');
    },
    nextLevel:function(){
        game.add.text(150, 150, "Level Up", { font: '60px Georgia', fill: '#ffffff' });
        game.state.start('coincollect3');
        level=3;
    }

};



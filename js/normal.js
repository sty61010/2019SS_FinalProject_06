

var normalState = {
    preload: function(){

    },

    create: function(){
        this.BLOCK_COUNT = 15;
        this.PIXEL_SIZE = 600 / this.BLOCK_COUNT;

        //game.stage.backgroundColor = "#49311C";
        this.bg_score = game.add.image(600, 0, 'background_score'); 
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;

        //var barConfig1 = {x: 200, y: 100};
	    //this.myHealthBar1 = new HealthBar(this.game, barConfig1);

        scoreString1 = 'Player 1: ';
        scoreText1 = game.add.text(game.width-170, 40, scoreString1 + score1, {  font: '28px Georgia', fill: '#fff' });
        scoreString2 = 'Player 2: ';
        scoreText2 = game.add.text(game.width-170, 140, scoreString2 + score2, {  font: '28px Georgia', fill: '#fff' });
        scoreString3 = 'Player 3: ';
        scoreText3 = game.add.text(game.width-170, 240, scoreString3 + score3, {  font: '28px Georgia', fill: '#fff' });
        scoreString4 = 'Player 4: ';
        scoreText4 = game.add.text(game.width-170, 340, scoreString4 + score4, {  font: '28px Georgia', fill: '#fff' });
        
        levelString = 'Level : ';
        levelText = game.add.text(game.width-170, 440, levelString + game.global.level, {  font: '28px Georgia', fill: '#fff' });
       
        music = game.add.audio('bg-music', 1, true);
        // if (game.global.music == 1)
        //     music.play();

        // Adds ground to entire map
        for (var x = 0; x < 15; x++) {
            for (var y = 0; y < 15; y++) {
                this.addGround(x, y);
            }
        }

        // Group container of game sprites
        this.grassList = game.add.group();
        this.wallList = game.add.group();
        this.bootList = game.add.group();
        this.starList = game.add.group();
        this.brickList = game.add.group();
        this.bombList = game.add.group();
        this.bombList_2 = game.add.group();
        this.flagList = game.add.group();
        this.addPlayers();
        this.explosionList = game.add.group();
        this.explosionList_2 = game.add.group();
        //like bomblist
        this.iceList = game.add.group();
        //like explosionList
        this.icebergList = game.add. group();
        this.icebergList_2 = game.add.group();


        // Adds walls, bricks and powerups
        this.createMap();

        // Players 1's intial properties
        this.playerSpeed = 150;
        this.playerPower = false;
        this.playerDrop = true;

        //ice
        this.playerIceDrop = true;
        this.playerIceDrop_2 = true;
        this.frozen_attackable = false;
        this.frozen_attackable_2 = false;

        // Players 2's intial properties
        this.playerSpeed_2 = 150;
        this.playerPower_2 = false;
        this.playerDrop_2 = true;

        // Creates listeners for player 1's controls
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Creates listeners for player 2's controls
        this.cursor = game.input.keyboard.createCursorKeys();
        this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        // Creates game feedback message
        this.gameMessage = "";
        this.messageStyle = { font: "60px Arcade", fill: "#FFFFFF", boundsAlignV: "middle", boundsAlignH: "center", align: "center", wordWrapWidth: 600};
        this.infoStyle = { font: "30px Arcade", fill: "#FFFFFF", boundsAlignV: "middle", boundsAlignH: "center", align: "center", wordWrapWidth: 600};

        // Adds audio clips to game
        if (game.global.sound == 1) {

            bombSound = game.add.audio('bomb-sound');
            powerUp = game.add.audio('power-up');
            winner = game.add.audio('winner');
            intro = game.add.audio('intro');
            gameStart = game.add.audio('game-start');
            roundEnd = game.add.audio('round-end');
        
        }

        // Shows splash screen
        if(!gameInPlay){
            this.showRoundWinner(null);
        }
    },

    update: function(){

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

        if (this.enterKey.justUp){
            if(gameInPlay && this.frozen_attackable == false)
                this.dropBomb(1);
            else 
                this.frozen_attack(1);
        }

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

        if (this.spaceKey.justUp){
            if(gameInPlay && this.frozen_attackable_2 == false)
                this.dropBomb(2);
            else 
                this.frozen_attack(2);
        }

        game.physics.arcade.collide(this.player, this.wallList);
        game.physics.arcade.collide(this.player, this.brickList);

        game.physics.arcade.collide(this.player_2, this.wallList);
        game.physics.arcade.collide(this.player_2, this.brickList);

        game.physics.arcade.overlap(this.player, this.explosionList, function(){this.burn(1);}, null, this);
        game.physics.arcade.overlap(this.player, this.explosionList_2, function(){this.burn(1);}, null, this);

        game.physics.arcade.overlap(this.player_2, this.explosionList_2, function(){this.burn(2);}, null, this);
        game.physics.arcade.overlap(this.player_2, this.explosionList, function(){this.burn(2);}, null, this);

        game.physics.arcade.overlap(this.explosionList, this.flagList.children[0], function(){this.getFlag(1);}, null, this);
        game.physics.arcade.overlap(this.explosionList_2, this.flagList.children[1], function(){this.getFlag(2);}, null, this);

        game.physics.arcade.overlap(this.player, this.bootList, function(){this.speedUp(1);}, null, this);
        game.physics.arcade.overlap(this.player_2, this.bootList, function(){this.speedUp(2);}, null, this);

        game.physics.arcade.overlap(this.player, this.starList, function(){this.starUp(1);}, null, this);
        game.physics.arcade.overlap(this.player_2, this.starList, function(){this.starUp(2);}, null, this);

        game.physics.arcade.overlap(this.player, this.icebergList, function(){this.frozen(2);}, null, this);
        game.physics.arcade.overlap(this.player_2, this.icebergList_2, function(){this.frozen(1);}, null, this);
        game.physics.arcade.overlap(this.player, this.iceList, this.get_ice, null, this);
        game.physics.arcade.overlap(this.player_2, this.iceList, function(){this.get_ice(2);}, null, this);
    },

    createMap: function(){
        for (var x = 0; x < 15; x++) {
            for (var y = 0; y < 15; y++) {
                if( x == 1 && x == y){
                    this.addBlueFlag();
                    this.addRedFlag();
                }
                if (x === 0 || y === 0 || x == 14 || y == 14){
                    this.addWall(x, y);
                }
                else if(x % 2 === 0 && y % 2 === 0){
                    this.addWall(x, y);
                } else if(x < 4 && y < 4 || x > 10 && y > 10){
                    this.addGrass(x, y);
                } else {
                    if(Math.floor(Math.random() * 3)){
                        this.addBrick(x, y);
                        if(Math.floor(Math.random() * 1.02)){
                            this.addBoots(x, y);
                        }
                        if(Math.floor(Math.random() * 1.02)){
                            this.addStar(x, y);
                        }
                        if(Math.floor(Math.random() * 1.02)){
                            console.log(x,y);
                            this.addIce(x, y);
                        }
                    } else {
                        this.addGrass(x, y);
                    }
                }
            }
        }
    },

    burn: function(player){

        if(gameInPlay){
            if (player == 1){
                score1++;
                scoreText1.text=scoreString1+score1;
                // this.player.kill();
            } else if (player == 2){
                score2++;
                scoreText2.text=scoreString2+score2;
                this.player_2.kill();
            } else if (player == 3){
                score3++;
                scoreText3.text=scoreString3+score3;
            } else {
                score4++;
                scoreText4.text=scoreString4+score4;
            }    

            // if (score1 == 0 || score2 == 0)
                // game.state.start('lose');
            //if(game.global.score3 == 0 || game.global.score4 == 0)
            //    game.state.start('win');

            //var score = Number(scoreBoard[player - 1].innerText);
            //scoreBoard[player - 1].innerText = score + 1;

        //     if(score + 1 === 5){
        //         this.showGameWinner(player);
        //         if (game.global.sound == 1)
        //             winner.play();
        //         game.state.start('win');
        //     } else {
        //         this.showRoundWinner(player);
        //         if (game.global.sound == 1)
        //             roundEnd.play();
        //         game.state.start('lose');
        //    }
        }

        gameInPlay = false;
    },

    getFlag: function(player){

        if(gameInPlay){
            //var score = Number(scoreBoard[player - 1].innerText);
            //scoreBoard[player - 1].innerText = score + 1;
            if(score1 == 0 || score2 == 0)
                game.state.start('lose');
            if(score3 == 0 && score4 == 0)
                game.state.start('win');

            //if(score + 1 === 5){
            //    this.showGameWinner(player);
            //} else {
            //   this.showRoundWinner(player);
            //}
        }

        gameInPlay = false;
    },

    speedUp: function(player){
        if (game.global.sound == 1)
            powerUp.play();

        if(player == 1){
            this.playerSpeed = 350;
        } else {
            this.playerSpeed_2 = 350;
        }

        this.bootList.forEach(function(element){
            element.kill();
        });
    },

    addBoots: function(x, y){
        var boots = game.add.sprite(x * this.PIXEL_SIZE, y * this.PIXEL_SIZE, 'boots');
        game.physics.arcade.enable(boots);
        boots.body.immovable = true;
        this.bootList.add(boots);
    },

    starUp: function(player){
        powerUp.play();

        if(player == 1){
            this.playerPower = true;
        } else {
            this.playerPower_2 = true;
        }
 
        this.starList.forEach(function(element){
            element.kill();
        });
    },

    addStar: function(x, y){
        var star = game.add.sprite(x * this.PIXEL_SIZE, y * this.PIXEL_SIZE, 'star');
        game.physics.arcade.enable(star);
        star.body.immovable = true;
        this.starList.add(star);
    },

    addPlayers: function(){

        this.player = game.add.sprite(GAME_SIZE - 2 * this.PIXEL_SIZE, GAME_SIZE - 2 * this.PIXEL_SIZE, 'bomber');
        game.physics.arcade.enable(this.player);

        this.player_2 = game.add.sprite(this.PIXEL_SIZE, this.PIXEL_SIZE, 'bomber');
        game.physics.arcade.enable(this.player_2);

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

    detonateBomb: function(player, x, y, explosionList, wallList, brickList){
        if (game.global.sound == 1)
            bombSound.play();

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
        if(player == 1 && normalState.playerPower){
            fire.push(game.add.sprite(x, y + 80, 'explosion'));
            fire.push(game.add.sprite(x, y - 80, 'explosion'));
            fire.push(game.add.sprite(x + 80, y, 'explosion'));
            fire.push(game.add.sprite(x - 80, y, 'explosion'));
        } else if (player == 2 && normalState.playerPower_2) {
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

            bomb = game.add.sprite(gridX, gridY, 'bomb');
            bomb.anchor.setTo(0.5)
            bomb.scale.setTo(0.5,0.5);
            bomb.animations.add('bomb', [0,1,2,3,4,5,6,7], 5, true);
            bomb.play('bomb',true,true); 
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
                normalState.enablePlayerBomb(1);
            }, 2000);

            setTimeout(this.thisEnableBomb, 2000);

        } else if (player == 2  && this.playerDrop_2){
            this.playerDrop_2 = false;
            gridX = this.player_2.x - this.player_2.x % 40;
            gridY = this.player_2.y - this.player_2.y % 40;

            bomb = game.add.sprite(gridX, gridY, 'bomb');
            bomb.anchor.setTo(0.5)
            bomb.scale.setTo(0.5,0.5);
            bomb.animations.add('bomb', [0,1,2,3,4,5,6,7], 5, true);
            bomb.play('bomb',true,true); 
            game.physics.arcade.enable(bomb);
            bomb.body.immovable = true;
            this.bombList.add(bomb);

            detonateBomb = this.detonateBomb;
            explosionList_2 = this.explosionList_2;
            wallList = this.wallList;
            brickList = this.brickList;

            setTimeout(function(){
                bomb.kill();
                detonateBomb(player, bomb.x, bomb.y, explosionList_2, wallList, brickList);
                normalState.enablePlayerBomb(2);
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

    addGround: function(x, y){
        var wall = game.add.sprite(x * this.PIXEL_SIZE, y * this.PIXEL_SIZE, 'ground');
        wall.body.immovable = true;

    },

    showRoundWinner: function(player){

        if(player !== null){
            this.gameMessage = game.add.text(0, 0, "PLAYER " + player + " WINS", this.messageStyle);
            this.gameMessage.setTextBounds(0, 0, 600, 560);
            this.button = game.add.button(230, 300, 'next-round');
        } else{
            if (game.global.sound == 1)
                intro.play();
            this.background = game.add.tileSprite(40, 40, 520, 520, 'grass');
            var introString = "LET'S PLAY BOMBERMAN" + "\n";
                introString += "You are in a mission to take control" + "\n";
                introString += "of you opponents base. Drop bombs" + "\n";
                introString += "to destroy the walls and navigate" + "\n";
                introString += "through the field." + "\n";

            this.gameMessage = game.add.text(0, 0, introString, this.infoStyle);
            this.gameMessage.setTextBounds(0, 0, 600, 560);
            this.button = game.add.button(230, 350, 'start-game');
        }

        this.button.onInputUp.add(this.restartGame, this);
    },

    showGameWinner: function(player){

        game.state.start('win');
        this.gameMessage = game.add.text(0, 0, "GAME OVER!\nPLAYER " + player + " WINS", this.messageStyle);
        this.gameMessage.setTextBounds(0, 0, 600, 560);
        this.button = game.add.button(230, 350, 'play-again');

        this.button.onInputUp.add(function(){
            score1=0;
            score2=0;
            score3=0;
            score4=0;
            this.restartGame();
        }, this);
    },

    restartGame: function(){
        gameInPlay = true;
        music.stop();
        if (game.global.sound == 1)
            gameStart.play();
        game.state.start('normal');
    },

    get_ice: function(player,ice){
        ice.kill();
        if (player == this.player ){
            if(gameInPlay)
            this.frozen_attackable = true;
        }
        if(player == this.player2){
            if(gameInPlay)
               this.frozen_attackable_2 = true;
        }
    },
    frozen_attack: function(player){
        if(player == 1){
            var x = this.player.x - this.player.x % 40;
            var y = this.player.y - this.player.y % 40;
            var ice = [
                game.add.sprite(x, y-40, 'iceberg'),
                game.add.sprite(x, y+40, 'iceberg'),
                game.add.sprite(x, y-80, 'iceberg'),
                game.add.sprite(x, y+80, 'iceberg'),
                game.add.sprite(x-40, y, 'iceberg'),
                game.add.sprite(x+40, y, 'iceberg'),
                game.add.sprite(x-80, y, 'iceberg'),
                game.add.sprite(x+80, y, 'iceberg'),

            ];
            for (var i = 0; i < ice.length; i++) {
                ice[i].body.immovable = true;
                this.icebergList.add(ice[i]);
            }
            for (i = 0; i < ice.length; i++) {
                if(game.physics.arcade.overlap(ice[i], this.wallList)){
                    console.log("wall");
                    ice[i].kill();
                    if(i > 0 && ice[i + 8] !== undefined){
                        ice[i + 8].kill();
                    }
                }
            }
            for (i = 0; i < ice.length; i++) {
                if(game.physics.arcade.overlap(ice[i], this.brickList)){
                    console.log("brick");
                    ice[i].kill();
                    if(i > 0 && ice[i + 8] !== undefined){
                        ice[i + 8].kill();
                    }
                }
            }
            
                setTimeout(function(){for (i = 0; i < ice.length; i++) {ice[i].kill()} },2000);
            
            this.frozen_attackable = false;
        }
        else{
            var x = this.player2.x - this.player2.x % 40;
            var y = this.player2.y - this.player2.y % 40;
            var ice = [
                game.add.sprite(x, y-40, 'iceberg'),
                game.add.sprite(x, y+40, 'iceberg'),
                game.add.sprite(x, y-80, 'iceberg'),
                game.add.sprite(x, y+80, 'iceberg'),
                game.add.sprite(x-40, y, 'iceberg'),
                game.add.sprite(x+40, y, 'iceberg'),
                game.add.sprite(x-80, y, 'iceberg'),
                game.add.sprite(x+80, y, 'iceberg'),

            ];
            for (var i = 0; i < ice.length; i++) {
                ice[i].body.immovable = true;
                this.icebergList.add(ice[i]);
            }
            for (i = 0; i < ice.length; i++) {
                if(game.physics.arcade.overlap(ice[i], this.wallList)){
                    console.log("ice hit wall");
                    ice[i].kill();
                    if(i > 0 && ice[i + 8] !== undefined){
                        ice[i + 8].kill();
                    }
                }
            }
            for (i = 0; i < ice.length; i++) {
                if(game.physics.arcade.overlap(ice[i], this.brickList)){
                    console.log("ice hit brick");
                    ice[i].kill();
                    if(i > 0 && ice[i + 8] !== undefined){
                        ice[i + 8].kill();
                    }
                }
            }
            
                setTimeout(function(){for (i = 0; i < ice.length; i++) {ice[i].kill()} },2000);
            
            this.frozen_attackable_2 = false;
        }
    },
    frozen: function(player){
        if(player == 1){
            var speed = this.playerSpeed;
            this.playerSpeed = 0;
            setTimeout(function(){normalState.playerSpeed = speed;},2000);//!!!
        }else{
            var speed = this.playerSpeed_2;
            this.playerSpeed_2 = 0;
            setTimeout(function(){normalState.playerSpeed_2 = speed;},2000);       
        }

        this.iceList.forEach(function(element){
            element.kill();
        });
        
    },
    addIce: function(x,y){
        this.ice = game.add.sprite(x * this.PIXEL_SIZE, y * this.PIXEL_SIZE, 'ice');
        game.physics.arcade.enable(this.ice);
        this.ice.body.immovable = true;
        this.iceList.add(this.ice);
    }

};


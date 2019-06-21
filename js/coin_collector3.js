var coincollectState3 = {
    preload: function(){
    },
    //=============================================================================================
    create: function(){
        this.BLOCK_COUNT = 15;
        this.PIXEL_SIZE = GAME_SIZE / this.BLOCK_COUNT;
        //music = game.add.audio('bg-music', 1, true);
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

        this.playerSpeed3 = 150;
        this.playerPower3 = false;
        this.playerDrop3 = true;

        this.playerSpeed4 = 150;
        this.playerPower4 = false;
        this.playerDrop4 = true;

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

        counter = 120;


    },
    liveCreate:function(){
        livegroup1 = game.add.group();
        for (var i = 0; i < live1; i++) 
        {
            var livestate = game.add.sprite(730-i*40 , 93, 'heart');
            livestate.body.immovable = true;
            livestate.anchor.setTo(1);
            livestate.scale.setTo(0.7);
            livestate.animations.add('heart', [0,1,2,3,4],5,true);
            livestate.play('heart');
            livegroup1.add(livestate);

        }
        livegroup2 = game.add.group();
        for (var i = 0; i < live2; i++) 
        {
            var livestate = game.add.sprite(730-i*40 , 190, 'heart');
            livestate.body.immovable = true;
            livestate.anchor.setTo(1);
            livestate.scale.setTo(0.7);
            livestate.animations.add('heart', [0,1,2,3,4],5,true);
            livestate.play('heart');
            livegroup2.add(livestate);

        }
        livegroup3 = game.add.group();
        for (var i = 0; i < live3/4; i++) 
        {
            var livestate = game.add.sprite(730-i*40 ,290, 'heart');
            livestate.body.immovable = true;
            livestate.anchor.setTo(1);
            livestate.scale.setTo(0.7);
            livestate.animations.add('heart', [0,1,2,3,4],5,true);
            livestate.play('heart');
            livegroup3.add(livestate);

        }
        livegroup4 = game.add.group();
        for (var i = 0; i < live4/4; i++) 
        {
            var livestate = game.add.sprite(730-i*40 ,390, 'heart');
            livestate.body.immovable = true;
            livestate.anchor.setTo(1);
            livestate.scale.setTo(0.7);
            livestate.animations.add('heart', [0,1,2,3,4],5,true);
            livestate.play('heart');
            livegroup4.add(livestate);

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
        this.bombList3 = game.add.group();
        this.bombList4 = game.add.group();
        this.flagList = game.add.group();
        this.explosionList = game.add.group();
        this.explosionList_2 = game.add.group();
        this.explosionList3 = game.add.group();
        this.explosionList4 = game.add.group();
        this.addPlayers();

        this.boss_bulletList=game.add.group();
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
        var player1_headshot = game.add.image(620,20, 'headshot1');
        var player2_headshot = game.add.image(620,118, 'headshot2');
        var player3_headshot = game.add.image(620,218, 'headshot3');
        var player4_headshot = game.add.image(620,318, 'headshot4');
        var levelNumber = game.add.image(700,400,'levelNumber3');
        this.button_pause = game.add.button(640,550, 'button_pause', this.clickPause, this, 1, 0, 0);
        this.button_pause.anchor.setTo(0.5, 0.5);
        this.button_pause.scale.setTo(0.7);
        this.button_menu = game.add.button(700,550, 'button_menu', this.clickMenu, this, 1, 0, 0);
        this.button_menu.anchor.setTo(0.5, 0.5);
        this.button_menu.scale.setTo(0.7);
        this.button_voice = game.add.button(760,550, 'button_voice', this.clickVoice, this, 1, 0, 0);
        this.button_voice.anchor.setTo(0.5, 0.5);
        this.button_voice.scale.setTo(0.7);

        text = game.add.text(740,490, '00:59', { font: "40px Arial", fill: "#000000", align: "center" });
        text.anchor.setTo(0.5, 0.5);
        game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);

        scoreText1 = game.add.text(750, 20, score1, { font: '30px Georgia', fill: '#fff' });
        scoreText2 = game.add.text(750, 118, score2, { font: '30px Georgia', fill: '#fff' });
        scoreText3 = game.add.text(750, 218, score3, { font: '30px Georgia', fill: '#fff' });
        scoreText4 = game.add.text(750, 318, score4, { font: '30px Georgia', fill: '#fff' });


    },
    //=============================================================================================
    update: function(){
        if ( game.global.pause == 0){
            //Player Move
            this.player1Move();
            this.player2Move();
            this.player3Move();
            this.player4Move();

            game.physics.arcade.collide(this.player, this.wallList);
            game.physics.arcade.collide(this.player, this.brickList);
            game.physics.arcade.collide(this.player, this.brickList1);
            game.physics.arcade.collide(this.player, this.treeList1);
            game.physics.arcade.collide(this.player, this.treeList2);
            game.physics.arcade.collide(this.player, this.treeList3);
            game.physics.arcade.collide(this.player, this.wallList1);

            game.physics.arcade.collide(this.player_2, this.wallList);
            game.physics.arcade.collide(this.player_2, this.brickList);
            game.physics.arcade.collide(this.player_2, this.brickList1);
            game.physics.arcade.collide(this.player_2, this.treeList1);
            game.physics.arcade.collide(this.player_2, this.treeList2);
            game.physics.arcade.collide(this.player_2, this.treeList3);
            game.physics.arcade.collide(this.player_2, this.wallList1);
            
            game.physics.arcade.collide(this.player3, this.wallList);
	        game.physics.arcade.collide(this.player3, this.brickList);
	
	        game.physics.arcade.collide(this.player3, this.brickList1);
	        game.physics.arcade.collide(this.player3, this.treeList1);
	        game.physics.arcade.collide(this.player3, this.treeList2);
	        game.physics.arcade.collide(this.player3, this.treeList3);
	        game.physics.arcade.collide(this.player3, this.wallList1);
            
            game.physics.arcade.collide(this.player4, this.wallList);
	        game.physics.arcade.collide(this.player4, this.brickList);
	
	        game.physics.arcade.collide(this.player4, this.brickList1);
	        game.physics.arcade.collide(this.player4, this.treeList1);
	        game.physics.arcade.collide(this.player4, this.treeList2);
	        game.physics.arcade.collide(this.player4, this.treeList3);
	        game.physics.arcade.collide(this.player4, this.wallList1);

            game.physics.arcade.overlap(this.player, this.explosionList, this.burn, null, this);
            game.physics.arcade.overlap(this.player, this.explosionList_2, this.burn, null, this);

            game.physics.arcade.overlap(this.player_2, this.explosionList_2, this.burn, null, this);
            game.physics.arcade.overlap(this.player_2, this.explosionList, this.burn, null, this);
            
            game.physics.arcade.overlap(this.player3, this.explosionList3, this.burn, null, this);
	        game.physics.arcade.overlap(this.player3, this.explosionList, this.burn, null, this);
	
	        game.physics.arcade.overlap(this.player4, this.explosionList4, this.burn, null, this);
            game.physics.arcade.overlap(this.player4, this.explosionList, this.burn, null, this);
            
            game.physics.arcade.overlap(this.explosionList, this.flagList.children[0], function(){this.getFlag(1);}, null, this);
            game.physics.arcade.overlap(this.explosionList_2, this.flagList.children[1], function(){this.getFlag(2);}, null, this);

            game.physics.arcade.overlap(this.player, this.bootList, this.speedUp, null, this);
            game.physics.arcade.overlap(this.player_2, this.bootList, this.speedUp, null, this);
            game.physics.arcade.overlap(this.player3, this.bootList, this.speedUp, null, this);
        	game.physics.arcade.overlap(this.player4, this.bootList, this.speedUp, null, this);

            game.physics.arcade.overlap(this.player, this.starList, this.starUp, null, this);
            game.physics.arcade.overlap(this.player_2, this.starList, this.starUp, null, this);
            game.physics.arcade.overlap(this.player3, this.starList, this.starUp, null, this);
            game.physics.arcade.overlap(this.player4, this.starList, this.starUp, null, this);
            
            game.physics.arcade.overlap(this.player, this.coinList, this.getCoin, null, this);
            game.physics.arcade.overlap(this.player_2, this.coinList, this.getCoin, null, this);
            game.physics.arcade.overlap(this.player3, this.coinList, this.getCoin, null, this);
        	game.physics.arcade.overlap(this.player4, this.coinList, this.getCoin, null, this);

            game.physics.arcade.overlap(this.player, this.boss_bulletList,this.getCoin, null, this);   
            game.physics.arcade.overlap(this.player_2, this.boss_bulletList,this.getCoin, null, this); 
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
        }

    },
    //=============================================================================================
    player1Move:function(){
        if (this.cursor.down.isDown || this.cursor.up.isDown || this.cursor.right.isDown || this.cursor.left.isDown){
            if (this.cursor.left.isDown){
                animation1='left';
                this.player.animations.add('run3', [15,19], 2, true);
                this.player.animations.play('run3');
                if (this.player.x>0){
                    this.player.body.velocity.x = -(this.playerSpeed);
                }
                // if(animation1!='left')this.plauer1Animation();
            }
            if (this.cursor.right.isDown){
                animation1='right';
                this.player.animations.add('run4', [5,9], 2, true);
                this.player.animations.play('run4');
                if (this.player.x<600){
                    this.player.body.velocity.x = (this.playerSpeed);
                }
                // if(animation1!='right')this.plauer1Animation();
            }
            if (this.cursor.up.isDown){
                animation1='up';
                this.player.animations.add('run2', [10,14], 2, true);
                this.player.animations.play('run2');
                if (this.player.y>0){
                    this.player.body.velocity.y = -(this.playerSpeed);
                }
                // if(animation1!='up')this.plauer1Animation();
            }
            if (this.cursor.down.isDown){
                animation1='down';
                this.player.animations.add('run1', [0,4], 2, true);
                this.player.animations.play('run1');
                if (this.player.y<600){
                    this.player.body.velocity.y = (this.playerSpeed);
                }
                // if(animation1!='down')this.plauer1Animation();
            } 
        } else{
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
        }

        if (this.spaceKey.justUp){
            this.dropBomb(1);
            this.bossFire();

        }
    },
    player2Move:function(){
        if (this.aKey.isDown || this.sKey.isDown || this.dKey.isDown || this.wKey.isDown){
            if (this.aKey.isDown){
                if (this.player_2.x>0){
                    this.player_2.body.velocity.x = -(this.playerSpeed_2);
                    this.player_2.animations.add('run', [15,19], 2, true);
                    this.player_2.animations.play('run');
                    //this.player_2.loadTexture('bomber-left', 0);
                    // this.player_2.body.velocity.y = 0;
                }
            }
            if (this.dKey.isDown){
                if (this.player_2.x<600){
                    this.player_2.body.velocity.x = (this.playerSpeed_2);
                    this.player_2.animations.add('run', [5,9], 2, true);
                    this.player_2.animations.play('run');
                    //this.player_2.loadTexture('bomber-right', 0);
                    // this.player_2.body.velocity.y = 0;
                }
            }
            if (this.wKey.isDown){
                if (this.player_2.y>0){
                    this.player_2.body.velocity.y = -(this.playerSpeed_2);
                    this.player_2.animations.add('run', [10,14], 2, true);
                    this.player_2.animations.play('run');
                    //this.player_2.loadTexture('bomber-back', 0);
                    // this.player_2.body.velocity.x = 0;
                }
            }
            if (this.sKey.isDown){
                if (this.player_2.y<600){
                    this.player_2.body.velocity.y = (this.playerSpeed_2);
                    this.player_2.animations.add('run', [0,4], 2, true);
                    this.player_2.animations.play('run');
                    //this.player_2.loadTexture('bomber-front', 0);
                    // this.player_2.body.velocity.x = 0;
                }
            }
        } else{
            this.player_2.body.velocity.x = 0;
            this.player_2.body.velocity.y = 0;
        }
        if (this.qKey.isDown){
            this.dropBomb(2);
            this.bossFire();

        }
    },
    player3Move:function(){
        var diff, prevdiff = 0;
        var nowx;
        var nowy;
        var begin = 1;
        var tmpx,tmpy, cc;
        var tx = this.player.body.x - this.player3.body.x;
        var ty = this.player.body.y - this.player3.body.y;
        if(tx < 0){
            tx = -tx;
        }
        if(ty < 0){
            ty = -ty;
        }
        if(begin == 1){
            nowx = 0;
            nowy = 0;
            begin = 0;
        }
        if(1){
            // if(diff != prevdiff){
            //     if(prevdiff == 1){
            //         nowx -= 2;
            //     }
            //     if(prevdiff == 2){
            //         nowx += 2;
            //     }
            //     if(prevdiff == 3){
            //         nowy += 2;
            //     }
            //     if(prevdiff == 4){
            //         nowy -= 2;
            //     }
            //     // prevdiff = diff;
            //     console.log(nowx);
            //     // counter += 1;
            // }
            // console.log(diff);
            if(this.player.body.x > this.player3.body.x && tx>ty){
                diff = 1;
                if(prevdiff != diff)prevdiff = diff;
            }
            if(this.player.body.x < this.player3.body.x && tx>ty){
                diff = 2;
                if(prevdiff != diff)prevdiff = diff;
            }
            if(this.player.body.y > this.player3.body.y && ty>tx){
                diff = 3;
                if(prevdiff != diff)prevdiff = diff;
            }
            if(this.player.body.y < this.player3.body.y && ty>tx){
                diff = 4;
                if(prevdiff != diff)prevdiff = diff;
            }
        }
        // console.log("diff = ")
        // console.log(diff);
        // var begin = 1;
        // var tmpx,tmpy, cc;
        // this.takex(begin, nowx, nowy);

        
        // cc = tmpx%this.PIXEL_SIZE;
        // nowx = (tmpx-cc)/this.PIXEL_SIZE;
        // cc = tmpy%this.PIXEL_SIZE;
        // nowy = (tmpx-cc)/this.PIXEL_SIZE;

        if (diff === 2) {
            // this.move = Move.Left;
            // console.log(this.player_2.body.x);

            tmpx = nowx*this.PIXEL_SIZE - 2*this.PIXEL_SIZE;
            
            if(tmpx < this.player3.body.x){
                this.player3.animations.add('run3', [15,19], 2, true);
                this.player3.animations.play('run3');
                this.player3.body.velocity.x = -1*(this.playerSpeed3);
            }
        } 
        if (diff === 1) {
            // this.player_2.body.velocity.x = (this.playerSpeed_2)
            // this.move = Move.Right;
            tmpx = nowx*this.PIXEL_SIZE + 2*this.PIXEL_SIZE;
            if(tmpx > this.player3.body.x){
                this.player3.animations.add('run', [5,9], 2, true);
                this.player3.animations.play('run');
                this.player3.body.velocity.x = (this.playerSpeed3);
            }
        } 
        if (diff === 3) {
            // this.move = Move.Up;
            // this.player_2.body.velocity.y = -(this.playerSpeed_2)
            tmpy = nowy*this.PIXEL_SIZE + 2*this.PIXEL_SIZE;
            if(tmpy > this.player3.body.y){
                this.player3.animations.add('run', [0,4], 2, true);
                this.player3.animations.play('run');
                this.player3.body.velocity.y = (this.playerSpeed3);
            }
        } 
        if (diff === 4) {
            // this.move = Move.Down;
            // this.player_2.body.velocity.y = (this.playerSpeed_2)
            tmpy = nowy*this.PIXEL_SIZE - 2*this.PIXEL_SIZE;
            if(tmpy < this.player3.body.y){
                this.player3.animations.add('run', [10,14], 2, true);
                this.player3.animations.play('run');
                this.player3.body.velocity.y = -(this.playerSpeed3);
            }
        }
        console.log(tmpx);
        cc = tmpx%this.PIXEL_SIZE;
        nowx = (tmpx-cc)/this.PIXEL_SIZE;
        cc = tmpy%this.PIXEL_SIZE;
        nowy = (tmpx-cc)/this.PIXEL_SIZE;
        // console.log(nowy);
        if (diff == 3 && live3 > 0){
            this.dropBomb(3);
        }
    },
    player4Move:function(){
        var diff, prevdiff = 0;
        var nowx;
        var nowy;
        var begin = 1;
        var tmpx,tmpy, cc;
        var tx = this.player.body.x - this.player4.body.x;
        var ty = this.player.body.y - this.player4.body.y;
        if(tx < 0){
            tx = -tx;
        }
        if(ty < 0){
            ty = -ty;
        }
        if(begin == 1){
            nowx = 0;
            nowy = 0;
            begin = 0;
        }
        if(1){
            // if(diff != prevdiff){
            //     if(prevdiff == 1){
            //         nowx -= 2;
            //     }
            //     if(prevdiff == 2){
            //         nowx += 2;
            //     }
            //     if(prevdiff == 3){
            //         nowy += 2;
            //     }
            //     if(prevdiff == 4){
            //         nowy -= 2;
            //     }
            //     // prevdiff = diff;
            //     console.log(nowx);
            //     // counter += 1;
            // }
            // console.log(diff);
            if(this.player.body.x > this.player4.body.x && tx>ty){
                diff = 1;
                if(prevdiff != diff)prevdiff = diff;
            }
            if(this.player.body.x < this.player4.body.x && tx>ty){
                diff = 2;
                if(prevdiff != diff)prevdiff = diff;
            }
            if(this.player.body.y > this.player4.body.y && ty>tx){
                diff = 3;
                if(prevdiff != diff)prevdiff = diff;
            }
            if(this.player.body.y < this.player4.body.y && ty>tx){
                diff = 4;
                if(prevdiff != diff)prevdiff = diff;
            }
        }
        // console.log("diff = ")
        // console.log(diff);
        // var begin = 1;
        // var tmpx,tmpy, cc;
        // this.takex(begin, nowx, nowy);

        
        // cc = tmpx%this.PIXEL_SIZE;
        // nowx = (tmpx-cc)/this.PIXEL_SIZE;
        // cc = tmpy%this.PIXEL_SIZE;
        // nowy = (tmpx-cc)/this.PIXEL_SIZE;


        if (diff === 2) {
            // this.move = Move.Left;
            // console.log(this.player_2.body.x);

            tmpx = nowx*this.PIXEL_SIZE - 2*this.PIXEL_SIZE;
            
            if(tmpx < this.player4.body.x){
                this.player4.animations.add('run3', [15,19], 2, true);
                this.player4.animations.play('run3');
                this.player4.body.velocity.x = -1*(this.playerSpeed3);
            }
        } 
        if (diff === 1) {
            // this.player_2.body.velocity.x = (this.playerSpeed_2)
            // this.move = Move.Right;
            tmpx = nowx*this.PIXEL_SIZE + 2*this.PIXEL_SIZE;
            if(tmpx > this.player4.body.x){
                this.player4.animations.add('run', [5,9], 2, true);
                this.player4.animations.play('run');
                this.player4.body.velocity.x = (this.playerSpeed3);
            }
        } 
        if (diff === 3) {
            // this.move = Move.Up;
            // this.player_2.body.velocity.y = -(this.playerSpeed_2)
            tmpy = nowy*this.PIXEL_SIZE + 2*this.PIXEL_SIZE;
            if(tmpy > this.player4.body.y){
                this.player4.animations.add('run', [0,4], 2, true);
                this.player4.animations.play('run');
                this.player4.body.velocity.y = (this.playerSpeed3);
            }
        } 
        if (diff === 4) {
            // this.move = Move.Down;
            // this.player_2.body.velocity.y = (this.playerSpeed_2)
            tmpy = nowy*this.PIXEL_SIZE - 2*this.PIXEL_SIZE;
            if(tmpy < this.player4.body.y){
                this.player4.animations.add('run', [10,14], 2, true);
                this.player4.animations.play('run');
                this.player4.body.velocity.y = -(this.playerSpeed3);
            }
        }
        console.log(tmpx);
        cc = tmpx%this.PIXEL_SIZE;
        nowx = (tmpx-cc)/this.PIXEL_SIZE;
        cc = tmpy%this.PIXEL_SIZE;
        nowy = (tmpx-cc)/this.PIXEL_SIZE;
        // console.log(nowy);
        if (diff == 1 && live4 > 0){
            this.dropBomb(4);
        }
    },
    //=============================================================================================
    createMap: function(){
        for (var x = 0; x < 15; x++) {
            for (var y = 0; y < 15; y++) {
                this.createBoss();
                if( x == 1 && x == y){
                    this.addBlueFlag();
                    this.addRedFlag();
                    // this.addCoin();
                }
                if (x === 0 || y === 0 || x == 14 || y == 14){
                    this.addWall(x, y);
                }
                // else if((x==3||x==11)&&y>2&&y<12){
                //     this.addWall(x, y);
                // }
                // else if(y==3&&x<12&&x>2){
                //     this.addWall(x, y);
                // }
                // else if(y==11&&x<12&&x>2&&x!=7){
                //     this.addWall(x, y);
                // }
                else if (x==3&&(y==3||y==4||y==10||y==11))
                this.addWall(x, y);
                else if (x==4&&(y==3||y==4||y==10||y==11))
                this.addWall(x, y);
                else if (x==10&&(y==3||y==4||y==10||y==11))
                this.addWall(x, y);
                else if (x==11&&(y==3||y==4||y==10||y==11))
                this.addWall(x, y);
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
    createCoin:function(){
        for(var x=0;x<15;x++){
            for(var y=0;y<15;y++){
                var rand=game.rnd.integerInRange(0, 100);
                if(rand<20)
                this.addCoin(x,y);
                rand=0;
            }
        }
    },
    burn: function(player,fire){
        this.createCoin();
        fire.kill();
        if(player==this.player){
            score2+=1;
            scoreText2.text = score2;
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
            scoreText1.text = score1;
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
        else if(player==this.player3){
            score1+=1;
            scoreText1.text = score1;
            ///live
            live = livegroup3.getFirstAlive();
            if (live)
            {
                live.kill();
            }
            if (livegroup3.countLiving() < 1)
            {
                this.player3.kill();
                //game.global.normal = 1;
                // this.showGameWinner(1);
            }
        }
        else if(player==this.player4){
            score1+=1;
            scoreText1.text =  score1;
            ///live
            live = livegroup4.getFirstAlive();
            if (live)
            {
                live.kill();
            }
            if (livegroup4.countLiving() < 1)
            {
                this.player4.kill();
                //game.global.normal = 1;
                // this.showGameWinner(1);
            }
        }
    },

    getFlag: function(player){
        if(game.global.sound == 1)
            powerUp.play();
        var x=game.width-210;
        var y;
        if(player==1){
            this.flagList.children[0].kill();
            score1+=5;
            scoreText1.text = score1;
            y=10;
            var Flag = game.add.sprite(x, y, 'red-flag');
            Flag.body.immovable = true;
        }
        else if (player==2){
            this.flagList.children[1].kill();
            score2+=5;
            scoreText2.text = score2;
            y=110;
            var Flag = game.add.sprite(x,y, 'blue-flag');
            Flag.body.immovable = true;
        }
    },
    starUp: function(player,star){
        if(game.global.sound == 1)
            powerUp.play();
        var x=game.width-130;
        var y;
        if(player == this.player){
            this.playerPower = true;
            y=50;
        } else if(player==this.player_2){
            this.playerPower_2 = true;
            y=150;
        } else if(player==this.player3){
            this.playerPower3 = true;
            y=250;
        } else if(player==this.player4){
            this.playerPower4 = true;
            y=350;
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
        if(game.global.sound == 1)
            powerUp.play();
        if(player == this.player){
            score1+=1;
            scoreText1.text = score1;
        } else if(player==this.player_2){
            score2+=1;
            scoreText2.text = score2;
        } else if(player==this.player3){
            score3+=1;
            scoreText3.text = score3;
        } else if(player==this.player4){
            score4+=1;
            scoreText4.text = score4;
        }
        coin.kill();
    },
    speedUp: function(player, boot){
        if(game.global.sound == 1)
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
        var boots = game.add.sprite(x, y, 'tube');
        boots.body.immovable = true;
        boots.anchor.setTo(1);
        boots.animations.add('lighting', [0,1,2,3,4],5,true);
        boots.play('lighting');
        boot.kill();
    },
    addPlayers: function(){
        this.player = game.add.sprite(GAME_SIZE - 2 * this.PIXEL_SIZE, GAME_SIZE - 2 * this.PIXEL_SIZE, 'player01');
        this.player.scale.setTo(0.9);
        game.physics.arcade.enable(this.player);
        this.player_2 = game.add.sprite(this.PIXEL_SIZE, this.PIXEL_SIZE, 'player02');
        this.player_2.scale.setTo(0.9);
        game.physics.arcade.enable(this.player_2);

        this.player3 = game.add.sprite(GAME_SIZE - 2 * this.PIXEL_SIZE, this.PIXEL_SIZE, 'player03');
        game.physics.arcade.enable(this.player3);
		this.player3.scale.setTo(0.9);
        
		this.player4 = game.add.sprite(this.PIXEL_SIZE, GAME_SIZE - 2 * this.PIXEL_SIZE, 'player04');
        game.physics.arcade.enable(this.player4);
        this.player4.scale.setTo(0.9);
    },
    addBoots: function(x, y){
        var boots = game.add.sprite(x * this.PIXEL_SIZE, y * this.PIXEL_SIZE, 'tube');
        game.physics.arcade.enable(boots);
        boots.body.immovable = true;
        boots.anchor.setTo(0);
        boots.animations.add('lighting', [0,1,2,3,4],5,true);
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
        var wall = game.add.sprite(x * this.PIXEL_SIZE, y * this.PIXEL_SIZE, 'candy_wall')
        game.physics.arcade.enable(wall);
        wall.body.immovable = true;
        this.wallList.add(wall);
    },
    addBrick: function(x, y){
        var ran = Math.floor(Math.random() * 4) + 1 ; 
        if (ran == 1)
            var brick = game.add.sprite(x * this.PIXEL_SIZE, y * this.PIXEL_SIZE, 'candy1');
        else if(ran == 2)
            var brick = game.add.sprite(x * this.PIXEL_SIZE, y * this.PIXEL_SIZE, 'candy2');
        else if(ran == 3)
            var brick = game.add.sprite(x * this.PIXEL_SIZE, y * this.PIXEL_SIZE, 'candy3');
        else if(ran == 4)
            var brick = game.add.sprite(x * this.PIXEL_SIZE, y * this.PIXEL_SIZE, 'candy4');
        game.physics.arcade.enable(brick);
        brick.body.immovable = true;
        this.brickList.add(brick);

    },
    addGrass: function(x, y){
        var grass = game.add.sprite(x * this.PIXEL_SIZE, y * this.PIXEL_SIZE, 'candy_ground');
        game.physics.arcade.enable(grass);
        grass.body.immovable = true;
        this.grassList.add(grass);

    },
    addGround: function(x, y){
        var wall = game.add.sprite(x * this.PIXEL_SIZE, y * this.PIXEL_SIZE, 'candy_ground2');
        wall.body.immovable = true;
    },
    detonateBomb: function(player, x, y, explosionList, wallList, brickList){
        if(game.global.sound == 1)
            bombSound.play();
        // this.bombExplosion(x,y);
        this.emitter = game.add.emitter(0, 0, 500);
        this.emitter.makeParticles('pixel2');
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
        if(player == 1 && coincollectState3.playerPower){
            fire.push(game.add.sprite(x, y + 80, 'explosion'));
            fire.push(game.add.sprite(x, y - 80, 'explosion'));
            fire.push(game.add.sprite(x + 80, y, 'explosion'));
            fire.push(game.add.sprite(x - 80, y, 'explosion'));
        } else if (player == 2 && coincollectState3.playerPower_2) {
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
            bomb.animations.add('bomb', [0,1,2,3,4,5], 5, true);
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
                coincollectState3.enablePlayerBomb(1);
            }, 2000);

            setTimeout(this.thisEnableBomb, 2000);

        } else if (player == 2  && this.playerDrop_2){
            this.playerDrop_2 = false;
            gridX = this.player_2.x - this.player_2.x % 40;
            gridY = this.player_2.y - this.player_2.y % 40;

            bomb = game.add.sprite(gridX, gridY, 'bomb1');

            bomb.anchor.setTo(0)
            // bomb.scale.setTo(0.5,0.5);
            bomb.animations.add('bomb', [0,1,2,3,4,5], 5, true);
            bomb.play('bomb',true,true);
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
                coincollectState3.enablePlayerBomb(2);
            }, 2000);
        } else if (player == 3  && this.playerDrop3){
            this.playerDrop3 = false;
            gridX = this.player3.x - this.player3.x % 40;
            gridY = this.player3.y - this.player3.y % 40;

            bomb = game.add.sprite(gridX, gridY, 'bomb1');

            bomb.anchor.setTo(0)
            // bomb.scale.setTo(0.5,0.5);
            bomb.animations.add('bomb', [0,1,2,3,4,5], 5, true);
            bomb.play('bomb',true,true);
            game.physics.arcade.enable(bomb);
            bomb.body.immovable = true;
            this.bombList3.add(bomb);

            detonateBomb = this.detonateBomb;
            explosionList3 = this.explosionList3;
            wallList = this.wallList;
            brickList = this.brickList;

            setTimeout(function(){
                bomb.kill();
                detonateBomb(player, bomb.x, bomb.y, explosionList3, wallList, brickList);
                coincollectState3.enablePlayerBomb(3);
            }, 2000);
        } else if (player == 4  && this.playerDrop4){
            this.playerDrop4 = false;
            gridX = this.player4.x - this.player4.x % 40;
            gridY = this.player4.y - this.player4.y % 40;

            bomb = game.add.sprite(gridX, gridY, 'bomb1');

            bomb.anchor.setTo(0)
            // bomb.scale.setTo(0.5,0.5);
            bomb.animations.add('bomb', [0,1,2,3,4,5], 5, true);
            bomb.play('bomb',true,true);
            game.physics.arcade.enable(bomb);
            bomb.body.immovable = true;
            this.bombList4.add(bomb);

            detonateBomb = this.detonateBomb;
            explosionList4 = this.explosionList4;
            wallList = this.wallList;
            brickList = this.brickList;

            setTimeout(function(){
                bomb.kill();
                detonateBomb(player, bomb.x, bomb.y, explosionList4, wallList, brickList);
                coincollectState3.enablePlayerBomb(4);
            }, 2000);
        } 
    },
    enablePlayerBomb: function(player){
        if(player == 1){
            this.playerDrop = true;
        } else if(player == 2) {
            this.playerDrop_2 = true;
        } else if(player == 3) {
            this.playerDrop3 = true;
        } else if(player == 4) {
            this.playerDrop4 = true;
        }

    },
    showGameWinner: function(player){
        // this.player3.kill();
        // this.player4.kill();
        // live1=0;
        // live2=0;
        // live3=0;
        // live4=0;

        this.bgEnd = game.add.image(0, 0, 'bg_menu3'); 
        //this.bgEnd.scale.setTo(0.5);
        this.gameMessage = game.add.text(200, 220, 'Player ' + player +" Wins", { font: '60px Chalaathah',fill: "#ffffff" });
        this.play2_bt = game.add.button(230, 320, 'button_play2', this.restartGame, this, 1, 0, 0);        
        this.next_bt = game.add.button(380, 320, 'button_next', this.nextLevel, this, 1, 0, 0); 
        
        
    },
    restartGame: function(){
        score1=0;
        score2=0;
        score3=0;
        score4=0;
        live1=3;
        live2=3;
        live3=12;
        live4=12;

        music.stop();
        if(game.global.sound == 1)
            gameStart.play();
        game.state.start('coincollect3');
    },
    nextLevel:function(){
        //game.add.text(150, 150, "Level Up", { font: '60px Georgia', fill: '#ffffff' });
        game.state.start('win');

        pushData();
    },
    clickMenu:function(){
        music.stop();
        game.state.start('menu');
    },
    clickPause:function(){
        if (game.global.pause == 1){
            game.global.pause = 0;
            console.log('pause:' + game.global.pause);
        }
        else {
            game.global.pause = 1;
            console.log('pause:' + game.global.pause);
        }
    },
    clickVoice:function(){
        if (game.global.music == 1){
            game.global.music = 0;
            music.stop();
        }
        else{
            game.global.music = 1;
            music.play();
        }
        console.log('music:'+game.global.music);
        if (game.global.sound == 1){
            game.global.sound = 0;
            bombSound.stop();
            powerUp.stop();
            winner.stop();
            intro.stop(); 
            gameStart.stop(); 
            roundEnd.stop();
        }
        else{
            game.global.sound = 1;
        }
        console.log('sound:'+game.global.sound);
    },
    updateCounter:function() {
        counter--;
        //console.log(counter);
        if(counter > 0){
            if(counter >= 60){
                var second = counter - 60; 
                if(counter >= 70)
                    text.setText('01:' + second);
                else
                    text.setText('01:0' + second);
            }   
            else{
                if(counter>=10)
                    text.setText('00:' + counter);
                else
                    text.setText('00:0' + counter);
            }
                
        }
        else{
            this.showGameWinner(2);
        }
    },
    createBoss:function(){

        this.boss=game.add.sprite(40*4, 40*3.5, 'boss3');
        this.boss.body.immovable = true;
        this.boss.anchor.setTo(0.5);
        this.boss.scale.setTo(1.2);
        this.boss.animations.add('boss', [0,1,2,3,4,5],5,true);
        this.boss.play('boss'); 

        this.boss1=game.add.sprite(40*4, 40*10.5, 'boss3');
        this.boss1.body.immovable = true;
        this.boss1.anchor.setTo(0.5);
        this.boss1.scale.setTo(1.2);
        this.boss1.animations.add('boss', [0,1,2,3,4,5],5,true);
        this.boss1.play('boss'); 

        this.boss2=game.add.sprite(40*11, 40*3.5, 'boss3');
        this.boss2.body.immovable = true;
        this.boss2.anchor.setTo(0.5);
        this.boss2.scale.setTo(1.2);
        this.boss2.animations.add('boss', [0,1,2,3,4,5],5,true);
        this.boss2.play('boss'); 

        this.boss3=game.add.sprite(40*11, 40*10.5, 'boss3');
        this.boss3.body.immovable = true;
        this.boss3.anchor.setTo(0.5);
        this.boss3.scale.setTo(1.2);
        this.boss3.animations.add('boss', [0,1,2,3,4,5],5,true);
        this.boss3.play('boss'); 

    },
    bossFire:function(){
        for(var i=0;i<1;i++)
        {
            var x, y;
            x=game.rnd.integerInRange(-400,400);
            y=game.rnd.integerInRange(-400,400);
            var boss_bullet= game.add.sprite(this.boss.x, this.boss.y, 'coin');
            game.physics.arcade.enable(boss_bullet);
            boss_bullet.anchor.setTo(0.5);
            // boss_bullet.scale.setTo(0.5);
            boss_bullet.body.velocity.x=x;
            boss_bullet.body.velocity.y=y;
            boss_bullet.animations.add('boss_bullet', [0,1,2,3,4],5,true);
            boss_bullet.play('boss_bullet');
            this.boss_bulletList.add(boss_bullet);

            var boss_bullet= game.add.sprite(this.boss1.x, this.boss1.y, 'coin');
            game.physics.arcade.enable(boss_bullet);
            boss_bullet.anchor.setTo(0.5);
            // boss_bullet.scale.setTo(0.5);
            boss_bullet.body.velocity.x=x;
            boss_bullet.body.velocity.y=y;
            boss_bullet.animations.add('boss_bullet', [0,1,2,3,4],5,true);
            boss_bullet.play('boss_bullet');
            this.boss_bulletList.add(boss_bullet);

            var boss_bullet= game.add.sprite(this.boss2.x, this.boss2.y, 'coin');
            game.physics.arcade.enable(boss_bullet);
            boss_bullet.anchor.setTo(0.5);
            // boss_bullet.scale.setTo(0.5);
            boss_bullet.body.velocity.x=x;
            boss_bullet.body.velocity.y=y;
            boss_bullet.animations.add('boss_bullet', [0,1,2,3,4],5,true);
            boss_bullet.play('boss_bullet');
            this.boss_bulletList.add(boss_bullet);

            var boss_bullet= game.add.sprite(this.boss3.x, this.boss3.y, 'coin');
            game.physics.arcade.enable(boss_bullet);
            boss_bullet.anchor.setTo(0.5);
            // boss_bullet.scale.setTo(0.5);
            boss_bullet.body.velocity.x=x;
            boss_bullet.body.velocity.y=y;
            boss_bullet.animations.add('boss_bullet', [0,1,2,3],5,true);
            boss_bullet.play('boss_bullet');
            this.boss_bulletList.add(boss_bullet);
        }
    }
};



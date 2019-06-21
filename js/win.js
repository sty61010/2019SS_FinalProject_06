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
        this.button_mode = game.add.button(200, 510, 'button_mode2', this.clickMode, this, 1, 0, 0);

        printData();


    }, 
    start: function() {

    },
    clickMode: function(){
        game.state.start('mode');
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
function printData() {
    var scoreRef = firebase.database().ref('scoreboard').orderByChild("score").limitToFirst(5);
    var index=1;
    scoreRef.once('value', function (snapshot) {
        for (var i in snapshot.val()) {
            // console.log(i);

            var namedata=snapshot.val()[i].name;
            var scoredata=snapshot.val()[i].score;
            scoredata*=-1;
            var scoreString='Rank'+index+' '+namedata+':'+scoredata;
            // if(index<=5){
            game.add.text(400, 100+index*50, scoreString, { font: '40px Georgia', fill: '#ffffff' });
            // }
            //console.log('name:'+namedata+'score:'+scoredata);
            index++;
        }
    })
};
function pushData(){
    var scoreRef = firebase.database().ref('scoreboard');
    var newPostKey = firebase.database().ref().child('scoreboard').push().key;
    finalname=name1;
    finalscore=score1;
    if(score1<score2){
        finalname=name2;
        finalscore=score2;
    }
    finalscore*=-1;
    var postData = {
        id:newPostKey,
        name:finalname,
        score:finalscore,
        time:Date()
    };
    var updates = {};
    updates[newPostKey] = postData;
    //console.log(updates);
    scoreRef.update(updates);
}
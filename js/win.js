var winState = { 
    create: function() {

        console.log('win state ok');
        game.add.image(0, 0, 'bg_menu5'); 
        var hs1 = game.add.image(70,130,'headshot1');
        hs1.scale.setTo(1.5);
        var nameLabel = game.add.text(130,110, ': '+score1, { font: '70px Georgia', fill: '#fff' }); 
        var hs2 = game.add.image(70,230,'headshot2');
        hs2.scale.setTo(1.5);
        var nameLabel2 = game.add.text(130,210, ': '+score2, { font: '70px Georgia', fill: '#fff' }); 
        var hs3 = game.add.image(70,330,'headshot3');
        hs3.scale.setTo(1.5);
        var nameLabel3 = game.add.text(130,310, ': '+score3, { font: '70px Georgia', fill: '#fff' }); 
        var hs4 = game.add.image(70,430,'headshot4');
        hs4.scale.setTo(1.5);
        var nameLabel4 = game.add.text(130,410, ': '+score4, { font: '70px Georgia', fill: '#fff' }); 

        this.button_restart = game.add.button(60, 510, 'button_menu2', this.clickMenu, this, 1, 0, 0);
        this.button_mode = game.add.button(200, 510, 'button_mode2', this.clickMode, this, 1, 0, 0);

        var scoreboard = game.add.image(300,135,'board');
        scoreboard.scale.setTo(0.58);

        printData();

    }, 
    start: function() {

    },
    clickMode: function(){
        music.stop();
        game.state.start('mode');
    },
    clickMenu: function() {
        music.stop();
        game.state.start('menu');
    }
};

function printData() {
    var scoreRef = firebase.database().ref('scoreboard').orderByChild("score").limitToFirst(5);
    var index=1;
    scoreRef.once('value', function (snapshot) {
        // for (var i in snapshot.val()) {
        //     // console.log(i);

        //     var namedata=snapshot.val()[i].name;
        //     var scoredata=snapshot.val()[i].score;
        //     scoredata*=-1;
        //     var scoreString='Rank'+index+' '+namedata+':'+scoredata;
        //     // if(index<=5){
        //     game.add.text(400, 100+index*50, scoreString, { font: '40px Georgia', fill: '#ffffff' });
        //     // }
        //     //console.log('name:'+namedata+'score:'+scoredata);
        //     index++;
        // }
        snapshot.forEach(function (item) {
            var namedata=item.val().name;
            var scoredata=item.val().score;
            scoredata*=-1;
            var scoreString='Rank'+index+' '+namedata+':'+scoredata;
            game.add.text(400, 180+index*45, scoreString, { font: '27px Georgia', fill: '#ffffff' }); 
            index++;

        })
    })
    // scoreRef.once.then
    // query.once("value").then(function(snapshot) {
    // snapshot.forEach(function(childSnapshot) {
    //   var key = childSnapshot.key; // "ada"

    //   // Cancel enumeration
    //   return true;
    //     });
    // });
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
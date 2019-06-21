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
        printData();
    }, 
    buttonOver:function(){
        this.buttonSound=game.add.audio('button_sound');
        if(game.global.sound==1)
            this.buttonSound.play();
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
                game.add.text(game.width/2-200, 100+index*50, scoreString, { font: '60px Georgia', fill: '#ffffff' });
            // }
            console.log('name:'+namedata+'score'+scoredata);
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
    console.log(updates);
    scoreRef.update(updates);
}



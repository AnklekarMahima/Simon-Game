var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["red", "blue", "green", "yellow"];

var level=0;
var start=false;

$(document).on("keypress click",function(){
    if(start==false) {
        $("#level-title").text("Level "+level);
        nextsequence();
        setTimeout(function() {
            start=true;
        }, 200);
    }
});

$(".btn").on("click",function (){
    if(start==true) {
        var userChosenColour=$(this).attr("id");
        userClickedPattern.push(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
        playSound(userChosenColour);
        animatePress(userChosenColour);
    }
});

function checkAnswer(currentLevel) {
        if(userClickedPattern[currentLevel]!=gamePattern[currentLevel]){
            $("#level-title").text("Game Over, Press Any Key or Tap to Restart");
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
                startOver();
            }, 200);
        }
        else{
            if(currentLevel==level-1){
                setTimeout(function() {
                    nextsequence();
                }, 1000);
            }
        }
}

function startOver() {
    gamePattern.length=0;
    start=false;
    level=0;
}

function nextsequence() {
    userClickedPattern=[];
    level=level+1;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("./" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}



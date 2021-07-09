buttonColors = ["red", "blue", "green", "yellow"];

gamePattern = []
userClickedPattern = []

var level_title = 0;
var started = false;

$(document).on("keypress", function(e) {
    if (!started) {
        setTimeout(function() {}, 500);
        $("h1").text("Level " + level_title);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function(e) {
    userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    console.log(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
    console.log(gamePattern);
    console.log(userClickedPattern);
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('success');
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("Array are not equal");
        playSound('wrong');
        $('body').addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 2000);
        console.log("DONe");
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level_title += 1;
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    $("h1").text("Level " + level_title);

}



function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();

}

function animatePress(color) {
    $("#" + color).addClass("pressed");

    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    }, 100);
}


function startOver() {
    level_title = 0;
    gamePattern = [];
    started = false;
}
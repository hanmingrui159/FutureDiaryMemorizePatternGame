var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];


$(".btn").click(function(e){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    // play sound
    playSound(userChosenColor);

    // animation
    animatePress(userChosenColor);

    // DIY
    if (userClickedPattern.length > gamePattern.length) {
        alert("an unexpected error happened!");
    }

    var lastIndex = userClickedPattern.length - 1;
    if (userClickedPattern[lastIndex] != gamePattern[lastIndex]){
        //game fail
        currLevel = -1;
        $("h1").html("Game Over, Press Any Key to Restart")
    }
    else if (userClickedPattern.length == gamePattern.length) {
        currLevel++;
        setTimeout(setUpNewLevel, 1000);
    }

})

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)

    playSound(randomChosenColor)

    return randomChosenColor;
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) { 
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){$("#" + currentColor).removeClass("pressed")}, 100);
}


// DIY

// add listener for keypress to start/restart game
$(document).keydown(function (e){
    if (currLevel <= 0) {
        gameStart();
        setUpNewLevel();
    }
})

var currLevel = 0;

function gameStart() {
    currLevel = 1;
    gamePattern = [];
}

function setUpNewLevel() {
    $("h1").html("Level " + currLevel);
    nextSequence();
    userClickedPattern = [];
}


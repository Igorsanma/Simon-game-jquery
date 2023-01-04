var colorsofbuttons = ["green", "red", "yellow", "blue"];
var userPattern = [];
var gamePattern = [];


var level = 1;

//checking if game has started
var started = false;
$(document).keydown(function(){
  if (!started){
    $("#level-title").text("level "+level);
    started = true;
    nextSequence();
  }
});

//click event to log userPattern
  $(".btn").click(function(){
    var userChosenColor = this.id;
    userPattern.push(userChosenColor);

    console.log(userPattern);

    playAnimation(userChosenColor);
    playSound(userChosenColor);

    checkAwnser(userPattern.length-1);
  });


// number randomiser pattern
function nextSequence(){
  userPattern = [];
  var randomNumGen = Math.floor(Math.random()*4);
  var randomChosenColor = colorsofbuttons[randomNumGen];
  gamePattern.push(randomChosenColor);

  console.log(gamePattern);

  playAnimation(randomChosenColor);
  playSound(randomChosenColor);
}

function nextLevelDisplay(){
  level++;
  $("#level-title").text("level "+level);
}

//gamecheck
function checkAwnser(currentLevel){
  if (gamePattern[currentLevel] === userPattern[currentLevel]){
    console.log("well done");
    if (gamePattern.length === userPattern.length){
      setTimeout(function() {
        nextLevelDisplay()
        nextSequence();
      }, 800);
    }
  }
  else{
    gameover();
  }
}

//function for when the games over
function gameover(){
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();

  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  $("h1").text("Game Over, Press Any Key to Restart");
//reset values
  started = false;
  level = 1
  gamePattern = [];
}

//plays sound based on the button
function playSound(colorbtn){
  var audio = new Audio("sounds/" + colorbtn + '.mp3');
  audio.play();
}

//plays animation based on the button
function playAnimation(colorbtn){
  $("#"+colorbtn).fadeOut(100).fadeIn(100);
}



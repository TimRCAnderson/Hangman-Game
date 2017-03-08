/*jslint browser:true */

var winTextDiv = document.getElementById("winText");
var lossTextDiv = document.querySelector("#lossText");
var guessTextDiv = document.querySelector("#guessText");
var remTextDiv = document.querySelector("#remText");
var winDiv = document.querySelector("#wins");
var lossDiv = document.querySelector("#losses");
var guessDiv = document.querySelector("#guesses");
var remDiv = document.querySelector("#remaining");
var wins = 0;
var losses = 0;
var remGuess = 5;
var iThink = "";
var guesses = [];
var mobileSuits = ["Zaku", "Rick Dom", "ZGok", "Gelgoog", "Gyan", "Hyaku Shiki", "Zeong", "Sazabi", "Rick Dias", "Guntank", "Gundam", "Zeta Gundam", "Jegan", "Guncannon", "Gouf", "Bigro", "Big Zam", "Hygogg", "Acguy", "Hizack", "Nemo", "Ball", "ZZ Gundam", "ReZel", "Byarlant"];
var picture = document.querySelector("#suitImg");
var suitIndex = 0;
var revealed = [];
var revealedLetters = document.querySelector("#suitName");
var validKeys = "abcdefghijklmnopqrstuvwxyz".split("");
var isPlaying = true;
var youLose = document.querySelector("#youLose");
var youWin = document.querySelector("#aWinnerIsYou");
var playAgain = document.querySelector(".interGame");

function setUnderscores()
{
  revealed = [];
  for(i = 0; i < iThink.length; i++)
  {
    if(iThink.charAt(i) != " ")
    {
      revealed.push("_");
    }
    else
    {
      revealed.push(" ");
    }
  }
}

function updateWord(userKey)
{
  console.log("4");
  for(i = 0; i < iThink.length; i++)
  {
    if(iThink.toLowerCase().charAt(i) === userKey)
    {
      revealed[i] = iThink.charAt(i);
    }
  }
}

function update()
{
  revealedLetters.innerHTML = revealed.join("&ensp;");
  remDiv.innerHTML = remGuess;
  guessDiv.innerHTML = guesses.join(" ");
}


function updateStats()
{
  winDiv.innerHTML = wins;
  lossDiv.innerHTML = losses;
}



function softReset()
{
  guesses = [];
  remGuess = 5;
  guessDiv.innerHTML = "None"
  remDiv.innerHTML = remGuess;
  suitIndex = (Math.floor(Math.random() * mobileSuits.length));
  iThink = mobileSuits[suitIndex];
  picture.setAttribute("src", ("assets/images/" + suitIndex + ".jpg"));
  setUnderscores();
  update();
  isPlaying = true;
  youLose.style.display = "none";
  youWin.style.display = "none";
  playAgain.style.display = "none";
}

function hardReset()
{
  losses = 0;
  wins = 0;
  updateStats();
  softReset();
}

function init()
{
  winTextDiv.innerHTML = "Wins: ";
  lossTextDiv.innerHTML = "Losses: ";
  guessTextDiv.innerHTML = "Your Guesses: ";
  remTextDiv.innerHTML = "Remaining Chances: ";
  hardReset();
  updateStats();
  
}

function play(pressedKey)
{
  if(isPlaying && validKeys.indexOf(pressedKey) !== -1)
  {
    console.log("1");
    if(guesses.indexOf(pressedKey) === -1)
    {
      console.log("2");
      guesses.push(pressedKey);
      if(iThink.toLowerCase().split("").indexOf(pressedKey) !== -1)
      {
        console.log("3");
        updateWord(pressedKey);
      }
      else
      {
        remGuess--;
      }
      update();
    }

    if(revealed.join("") === iThink)
    {
      wins++;
      updateStats();
      isPlaying = false;
      youWin.style.display = "block";
      playAgain.style.display = "block";
    }
    else if(remGuess === 0)
    {
      losses++;
      updateStats();
      isPlaying = false;
      youLose.style.display = "block";
      playAgain.style.display = "block";
    }

  }

}

init();

document.onkeyup = function(event)
{
  var userKey = event.key.toLowerCase();
  play(userKey);
}


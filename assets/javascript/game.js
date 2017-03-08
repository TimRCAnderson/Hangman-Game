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
var remGuess = 5
var iThink = "";
var guesses = [];
var mobileSuits = ["Zaku", "Rick Dom", "ZGok", "Gelgoog", "Gyan", "Hyaku Shiki", "Zeong", "Sazabi", "Rick Dias", "Guntank", "Gundam", "Zeta Gundam", "Jegan", "Guncannon", "Gouf", "Bigro", "Big Zam", "Hygogg", "Acguy", "Hizack", "Nemo", "Ball", "ZZ Gundam", "ReZel", "Byarlant"];
var picture = document.querySelector("#suitImg");
var suitIndex = 0;
var revealed = [];
var revealedLetters = document.querySelector("#suitName");
var validKeys = "abcdefghijklmnopqrstuvwxyz".split("");
var isPlaying = true;

console.log(mobileSuits);

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

function update(userKey)
{
	for(i = 0; i < iThink.length; i++)
	{
		if(iThink.charAt(i) === userKey)
		{
			revealed[i] = iThink.charAt(i);
		}
	}
	revealedLetters.innerHTML = revealed.join("&ensp;");
	remDiv.innerHTML = remGuess;

}

function update()
{
	revealedLetters.innerHTML = revealed.join("&ensp;");
	remDiv.innerHTML = remGuess;

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
	updateStats();
	guessDiv.innerHTML = "None"
	remDiv.innerHTML = remGuess;
	suitIndex = (Math.floor(Math.random() * mobileSuits.length));
	iThink = mobileSuits[suitIndex];
	picture.setAttribute("src", ("assets/images/" + suitIndex + ".jpg"));
	setUnderscores();
	update();
}

function hardReset()
{
	losses = 0;
	wins = 0;
	softReset();
}

function init()
{
	winTextDiv.innerHTML = "Wins: ";
	lossTextDiv.innerHTML = "Losses: ";
	guessTextDiv.innerHTML = "Your Guesses: ";
	remTextDiv.innerHTML = "Remaining Guesses: ";
	hardReset();
	
}

function play(pressedKey)
{
	if(isPlaying && validKeys.indexOf(pressedKey) !== -1)
	{
		if(pressedKey === iThink)
		{
			alert("You win!");
			wins++;
			softReset();
		}
		else
		{
			remGuess--;
			guesses.push(pressedKey);
			remDiv.innerHTML = remGuess;
			guessDiv.innerHTML = guesses.join(" ");

			if(remGuess === 0)
			{
				remDiv.innerHTML = remGuess;
				losses++;
				softReset();
				alert("You lose :(");
			}
		}
	}

}

init();

document.onkeyup = function(event)
{
	var userKey = event.key.toLowerCase();
	play(userKey);
}
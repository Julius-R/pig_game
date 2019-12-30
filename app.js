const log = val => console.log(val);
let currentPlayer = 0;
let players = document.querySelectorAll(".palyer");
let scores = [0, 0];
let roundScore = 0;
let dice = document.querySelector(".dice");
let holdBtn = document.querySelector(".btn-hold");
let rollbtn = document.querySelector(".btn-roll");
let resetBtn = document.querySelector(".btn-new");

// Start
gameStart();

// Create event for new game button
resetBtn.addEventListener("click", gameStart);

// Create event to roll the dice
rollbtn.addEventListener("click", function() {
	let diceRoll = Math.floor(Math.random() * 6) + 1;
	// Show the dice and have the image based on dice number
	dice.style.display = "block";
	dice.src = `dice-${diceRoll}.png`;
	if (diceRoll == 1) {
		players[currentPlayer].children[2].children[1].innerText = 0;
		nextPlayer();
	} else {
		roundScore += diceRoll;
		players[currentPlayer].children[2].children[1].innerText = roundScore;
		log(roundScore);
	}
});

// Create event for hold button
holdBtn.addEventListener("click", function() {
	// Take round score from the current player and add it to the global score
	scores[currentPlayer] += Number(
		players[currentPlayer].children[2].children[1].innerText
	);
	players[currentPlayer].children[1].innerText = scores[currentPlayer];
	players[currentPlayer].children[2].children[1].innerText = 0;
	nextPlayer();
});

function nextPlayer() {
	roundScore = 0;
	// Check if previous players score is not more than 100
	if (scores[currentPlayer] >= 100) {
		playerWon();
	} else {
		players[currentPlayer].classList.remove("active");
		currentPlayer == 0 ? (currentPlayer = 1) : (currentPlayer = 0);
		players[currentPlayer].classList.add("active");
	}
}

function playerWon() {
	// Hide the dice from view
	dice.style.display = "none";

	// Customize the text and css class of the winner player
	players[currentPlayer].classList.add("winner");
	players[currentPlayer].classList.remove("active");
	players[currentPlayer].children[0].innerText = "Winner!!";

	// Disable all buttons except new game
	holdBtn.setAttribute("disabled", true);
	rollbtn.setAttribute("disabled", true);
}

function gameStart() {
	// HIde the dice, reset current player to first player, and enable all buttons
	dice.style.display = "none";
	currentPlayer = 0;
	holdBtn.removeAttribute("disabled");
	rollbtn.removeAttribute("disabled");

	// Reset all changes back to default
	players.forEach((player, key) => {
		player.classList.remove("winner");
		player.classList.remove("active");
		player.children[0].innerText = `Player ${key + 1}`;
		player.children[1].innerText = 0;
		player.children[2].children[1].innerText = 0;
	});
	players[0].classList.add("active");
}

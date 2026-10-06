// Board Object

const gameboard = (function () {
	// private
	let DOMcells = [...document.querySelectorAll(".cell")];
	let boardMap = Array(9);
	let moveCounter = 0;

	let player1 = null;
	let player2 = null;

	// false = player1 , true = player2
	let playerSwitch = false;
	let activePlayer = null;

	const WINS = [7, 56, 448, 73, 146, 292, 273, 84];

	//Player
	function createPlayers() {
		let playerInput = prompt("> Name for player 1: ");
		player1 = new player(playerInput, "O");

		playerInput = prompt("> Name for player 2: ");
		player2 = new player(playerInput, "X");

		console.log(`>PLAYERS CREATED:
            1. ${player1.name}
            2. ${player2.name}`);

        setPlayerScore();
	}

	function checkPlayersExist() {
		return player1 && player2;
	}

	function playerToggle() {
		playerSwitch = playerSwitch ? false : true;
		activePlayer = playerSwitch ? player2 : player1;

		console.log(
			`Player${playerSwitch ? "2" : "1"}: ${activePlayer.name} (${activePlayer.mark}) TURN`,
		);
	}

	function logPlayerBinaries() {
		console.log(`>Player 1 Board:
            ${player1.binary}`);
		console.log(`>Player 2 Board:
            ${player2.binary}`);
	}

	// Controls
	function playRound() {
		if (!checkPlayersExist()) createPlayers();
		roundReset();
		activePlayer = player1;

		console.log("++ ROUND BEGIN ++");
	}

	function roundReset() {
		boardMap = Array(9);
		player1.binary = 0;
		player2.binary = 0;
		moveCounter = 0;
		activePlayer = null;
		clearBoard();
		console.log("  !ROUND RESET!  ");
	}

	function gameReset() {
		player1 = null;
		player2 = null;
		boardMap = Array(9);
		activePlayer = null;
		moveCounter = 0;
		clearBoard();
		console.log("======= GAME RESET ========");
		playRound();
	}

	function placeMark(cell) {
		if (!checkCell(cell) && cell <= 8 && cell > -1) {
			++moveCounter;

			activePlayer.binary |= 1 << cell;
			console.log(activePlayer.binary);
			boardMap[cell] = activePlayer.mark;
			DOMcells[cell].textContent = activePlayer.mark;

			logBoard(boardMap);

			if (moveCounter >= 5) {
				// Check End Game Conditions
				checkRoundCondition();
			}

			playerToggle();
		} else {
			console.log(`> ${cell + 1} already has marker placed`);
		}
	}

	// Board
	function checkRoundCondition() {
		let winner = checkWinCondition();
		if (winner) {
			displayGameEnd(winner);
		}
		if (checkMoveCounterMax()) displayGameEnd();
	}

	function checkWinCondition() {
		console.log("checked win condition debug");
		if (WINS.some((binWin) => (player1.binary & binWin) === binWin)) {
			player1.score += 1;
            setPlayerScore();
			displayPlayerWin(player1);
			displayGameEnd(player1);
		}
		if (WINS.some((binWin) => (player2.binary & binWin) === binWin)) {
			displayPlayerWin(player2);
            setPlayerScore();
			player2.score += 1;
			displayGameEnd(player2);
		}

		return false;
	}

	function checkMoveCounterMax() {
		return moveCounter === 9;
	}

	function checkCell(num) {
		return Boolean(boardMap[num]);
	}

	function logBoard(arr) {
		for (let i = 0; i < arr.length; i += 3) {
			let row = [];
			for (let j = i; j < i + 3; j++) {
				row.push(arr[j] ?? "-");
			}
			console.log(row.join(" "));
		}
		return "";
	}

	function clearBoard() {
		DOMcells.forEach((c) => (c.textContent = ""));
	}

	// Display Controller
	const endGameModal = document.querySelector("dialog");
    const nextRndBtn = endGameModal.querySelector("#nextround");

    const p1Score = document.querySelector("#p1-score");
    const p2Score = document.querySelector("#p2-score");

	const resetBtn = (document.querySelector("#reset-btn").onclick = gameReset);
    nextRndBtn.onclick = function () {
        endGameModal.close();
        playRound();
    }

    function setPlayerScore() {
        p1Score.textContent = player1.score;
        p2Score.textContent = player2.score;
    }

	function displayGameEnd(playerObj) {
		console.log("DISPLAYENGAME");
		if (playerObj) {
			endGameModal.querySelector("#result").textContent =
				`Player ${playerObj.name} HAS WON!`;
		} else {
			endGameModal.querySelector("#result").textContent = `TIED`;
		}

		endGameModal.showModal();
	}

	function displayPlayerWin(playerObj) {
		console.log(` PLAYER ${playerObj.name} WON`);
	}


	return {
		logBoard,
		clearBoard,
		playRound,
		logPlayerBinaries,
		placeMark,
		boardMap,
	};
})();

// Player Constructor
function player(name, mark) {
	this.name = name;
	this.binary = 0;
	this.score = 0;
	this.mark = mark;
}

// Inintialize
gameboard.playRound();

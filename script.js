// Board Object

const gameboard = (function () {
	// private
	let DOMcells = [...document.querySelectorAll(".cell")];
	let boardMap = Array(9);
	let resetBtn = (document.querySelector("#reset-btn").onclick = gameReset);

	let moveCounter = 0;

	let player1 = null;
	let player2 = null;

	// false = player1 , true = player2
	let playerSwitch = false;
	let activePlayer = null;

	//Player

	// Check if players exist

	function createPlayers() {
		let playerInput = prompt("> Name for player 1: ");
		player1 = new player(playerInput, "O");

		playerInput = prompt("> Name for player 2: ");
		player2 = new player(playerInput, 'X');

		console.log(`>PLAYERS CREATED:
            1. ${player1.name}
            2. ${player2.name}`);
	}

	function checkPlayersExist() {
		return player1 && player2;
	}

	function playerToggle() { 
        playerSwitch = playerSwitch ? false : true;
        activePlayer = playerSwitch ? player2 : player1;

        console.log(`Player${playerSwitch ? '2' : '1'}: ${activePlayer.name} (${activePlayer.mark}) TURN`);
	}

	function logPlayerBoards() {
		console.log(`>Player 1 Board:
            ${logBoard(player1.playerMap)}`);
		console.log(`>Player 2 Board:
            ${logBoard(player2.playerMap)}`);
	}

	// Controls
	function playRound() {
        
		if (!checkPlayersExist()) createPlayers();
		activePlayer = player1;

		console.log("++ ROUND BEGIN ++");
	}

    function roundReset() {
        boardMap = Array(9);
        player1.playerMap = Array(9).fill(0);
        player2.playerMap = Array(9).fill(0);
        moveCounter = 0;
        clearBoard();
        console.log('> !ROUND RESET!')
    }
    
    function gameReset() {
        player1 = null;
        player2 = null;
        boardMap = Array(9);
        moveCounter = 0;
        clearBoard();
         console.log("======= GAME RESET ========");
        playRound();
        
    }

	function placeMark(cell) {
		if (!checkCell(cell) && cell <= 8) {
            moveCounter++;

			activePlayer.playerMap[cell] = 1;
			boardMap[cell] = activePlayer.mark;
            DOMcells[cell].textContent = activePlayer.mark;

            logBoard(boardMap);

            if (moveCounter >= 5) {
            // Check End Game Conditions
            }

            playerToggle();
		} else {
			console.log(`> ${cell + 1} already has marker placed`);
		}
	}

	// Board
	function checkRoundCondition() {
        
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
        return '';
	}

	function clearBoard() {
		DOMcells.forEach((c) => (c.textContent = ""));
	}

	return { logBoard, clearBoard, playRound, logPlayerBoards, placeMark, boardMap };
})();

// Player Constructor
function player(name, mark) {
	this.name = name;
	this.playerMap = Array(9).fill(0);
	this.score = 0;
	this.mark = mark;
}

// Inintialize
gameboard.playRound();

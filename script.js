// Board Object

const gameboard = (function () {

    // private
    let cells = [...document.querySelectorAll('.cell')];
    let resetBtn = document.querySelector('#reset-btn').onclick = clear;

    // public
    function logBoard () {
        console.log(cells);
    }

    function clear() {
        cells.forEach(c => c.textContent = '');
    }

    return {logBoard, clear};

})();

gameboard.logBoard();

// Player Object

// player factory
function playerFactory () {
    
}

let bina = 0b111000000;
console.log(bina)

// Game Controller

// 
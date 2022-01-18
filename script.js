const gameDisplay = document.querySelector('#game-display');
const gameStart = document.querySelector('#game-start');

const gameBoard = (() => {
    let gameSquares = ["","","","","","","","",""];
    
    const square = document.createElement('div');
    square.classList.add('game-board')

    const add = () => {
        square.innerHTML = ""
        for (let i = 0; i < 3; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            square.appendChild(row);
            for (let j = 0; j < 3; j++) {
                const checkBox = document.createElement('div');
                checkBox.classList.add('checkbox');
                row.appendChild(checkBox);
            }
        }
        gameDisplay.appendChild(square);
    };
    return {add, gameSquares};
})();

const player = (symbol) => {

    const getSymbol = () => symbol;
    return {getSymbol};

};

const displayController = (() => {
    playerOne = document.querySelector('#Player1');
    playerTwo = document.querySelector('#Player2');

    
    
})();

gameStart.addEventListener('click', gameBoard.add);
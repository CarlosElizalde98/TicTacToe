const gameDisplay = document.querySelector('#game-display');

const gameBoard = (() => {
    let gameSquares = [];
    const square = document.createElement('div');
    square.classList.add('game-board')
    const add = () => {
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
    return {add, };
})();

const player = (name) => {

};

gameBoard.add();
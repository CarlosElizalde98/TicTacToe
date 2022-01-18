const gameDisplay = document.querySelector('#game-display');
const gameStart = document.querySelector('#game-start');

const gameBoard = (() => {
    let gameSquares = ["X","O","X","","","","","",""];
    
    const square = document.createElement('div');
    square.classList.add('game-board')

    //Creates game board for each round.
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

        //Give each checkbox an array place
        let checkboxes = document.querySelectorAll(".checkbox");
        for (i = 0; i < checkboxes.length;i++) {
            checkboxes[i].setAttribute("array-place", i);
        }
    };
    return {add, gameSquares};
})();

//Basic factory for creation of game players.
const player = (symbol) => {

    const getSymbol = () => symbol;
    return {getSymbol};

};

//Controls display of content for game board.
const displayController = (() => {
    playerOne = document.querySelector('#Player1');
    playerTwo = document.querySelector('#Player2');

    playerOne.addEventListener('click', player(playerOne.value).getSymbol);
    playerTwo.addEventListener('click', player(playerTwo.value).getSymbol);

    const add = () => {
    let checkboxes = document.querySelectorAll('.checkbox');
    let checkboxArray = Array.from(checkboxes);
    
    checkboxArray.forEach( checkbox => {
        let arrayPlace = checkbox.getAttribute('array-place');
        checkbox.innerHTML = gameBoard.gameSquares[arrayPlace];
    })
    }

    return {add};
})();

gameStart.addEventListener('click', gameBoard.add);
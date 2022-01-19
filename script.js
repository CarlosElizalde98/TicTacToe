const gameDisplay = document.querySelector('#game-display');
const gameStart = document.querySelector('#game-start');

const gameBoard = (() => {
    let gameSquares = ["","","","","","","","",""];
    
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
    
        checkboxes.forEach((checkbox) => 
        checkbox.addEventListener('click', (e) => {
            gameController.playRound(parseInt(e.target.getAttribute('array-place')));
            displayController.updateGameBoard();
        })
    );
    };

    const select = (index, symbol) => {
        if (index > gameSquares.length) {
            return;
        }
        gameSquares[index] = symbol;
    }

    const getSymbol = (index) => {
        if (index > gameSquares.length) {
            return;
        }
        return gameSquares[index];
    }

    const reset = () => {
        for (let i = 0; i < gameSquares.length; i++) {
            gameSquares[i] = "";
        }
    }
    return {add, select, getSymbol, reset};
})();

//Basic factory for creation of game players.
const player = (symbol) => {

    const getSymbol = () => symbol;
    return {getSymbol};

};

//Controls display of content for game board.
const displayController = (() => {

    gameBoard.add();

    const checkboxes = document.querySelectorAll('.checkbox');
    console.log(checkboxes)
    const messageElement = document.querySelector('#message');
     
    const updateGameBoard = () => {
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].innerHTML = gameBoard.getSymbol(i);
        }
    };

    const setGameMessage = (message) => {
        messageElement.textContent = message;
    }

    return {updateGameBoard, setGameMessage};
})();

const gameController = (() => {

    let winStatus = false;
    let round = 0;

    playerOne = player('X').getSymbol();
    playerTwo = player('O').getSymbol();
    console.log(playerOne)

    const playRound = (checkBoxIndex) => {
        gameBoard.select(checkBoxIndex, getCurrentPlayerSymbol());
        round++;
        displayController.setGameMessage(
            `Player ${getCurrentPlayerSymbol()}'s turn.`
        );
      
    };

    const getCurrentPlayerSymbol = () => {
        return round % 2 === 1 ? playerOne : playerTwo;
    };

    return {playRound, getCurrentPlayerSymbol};
})();
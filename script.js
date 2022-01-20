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
            if (e.target.textContent !== "" || gameController.getWinStatus()) return;
            gameController.playRound(parseInt(e.target.getAttribute('array-place')));
            displayController.updateGameBoard();
        })
    );
    };

    //Add a symbol into Game board
    const select = (index, symbol) => {
        if (index > gameSquares.length) {
            return;
        }
        gameSquares[index] = symbol; 
    }

    //Return current symbol from array
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
    return {gameSquares, add, select, getSymbol, reset};
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
    const messageElement = document.querySelector('#message');
    
    //Updates gameboard with the current symbol from Player
    const updateGameBoard = () => {
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].innerHTML = gameBoard.getSymbol(i);
        }
    };

    //Sets message on top of the game board
    const setGameMessage = (message) => {
        messageElement.textContent = message;
    }

    return {updateGameBoard, setGameMessage};
})();

const gameController = (() => {

    let winStatus = false;
    let round = 1;

    playerOne = player('X').getSymbol();
    playerTwo = player('O').getSymbol();

    const playRound = (checkBoxIndex) => {
        gameBoard.select(checkBoxIndex, getCurrentPlayerSymbol());

        checkWin();

        if (getWinStatus()) {
            displayController.setGameMessage(`Player ${getCurrentPlayerSymbol()} wins!`)
            return;
        }
        if (round === 9) {
            displayController.setGameMessage("It's a Draw! Press restart to play again.");
            winStatus = true;
            return;
        }
        
            round++;
            displayController.setGameMessage(
                `Player ${getCurrentPlayerSymbol()}'s turn.`
            );
        
    };

    const getCurrentPlayerSymbol = () => {
        return round % 2 === 1 ? playerOne : playerTwo;
    };

    const checkWin = () => {
        const winSpace = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];

        winSpace.forEach((item, index) => {
            if (gameBoard.gameSquares[item[0]] === getCurrentPlayerSymbol() &&
            gameBoard.gameSquares[item[1]] === getCurrentPlayerSymbol() && 
            gameBoard.gameSquares[item[2]] === getCurrentPlayerSymbol()){
                winStatus = true;
            }
        })
    }

    const getWinStatus = () => {
        return winStatus;
    }

    const reset = () => {
        round = 1;
        winStatus = false;
    }

    return {playRound, getWinStatus, reset, getCurrentPlayerSymbol};
})();
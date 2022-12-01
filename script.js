const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const boardCell = document.querySelectorAll('[data-cell]'),
      winningMessage = document.querySelector('.winning-message'),
      message = document.querySelector('.message'),
      resetGame = document.querySelector('.resetBtn'),
      xWin = document.getElementById('x-wins'),
      oWin = document.getElementById('o-wins'),
      draw = document.getElementById('draws');


let currentUser;

function countScore() {
    if (!sessionStorage.getItem('xwin')) {
        sessionStorage.setItem('xwin', 0);
    }
    if (!sessionStorage.getItem('owin')) {
        sessionStorage.setItem('owin', 0);
    }
    if (!sessionStorage.getItem('draw')) {
        sessionStorage.setItem('draw', 0);
    }

    xWin.textContent = sessionStorage.getItem('xwin');
    oWin.textContent = sessionStorage.getItem('owin');
    draw.textContent = sessionStorage.getItem('draw');
}

countScore(); // Get from sessionStorage data and set score.
setTurn();  // Set hover effect of x and o in order to know who is turn.
handleClick(); // Make your turn and change user/turn(hover).


function setTurn() {
    if (currentUser) {
        for (let key of boardCell) {
            key.classList.remove('x-turn');
            key.classList.add('circle-turn');
    
            if (key.classList.contains('x') || key.classList.contains('circle')) {
                key.classList.remove('circle-turn');
            }
        }

        
    } else {
        for (let key of boardCell) {
            key.classList.remove('circle-turn');
            key.classList.add('x-turn');
    
            if (key.classList.contains('x') || key.classList.contains('circle')) {
                key.classList.remove('x-turn');
            }
        }
    }
}

function handleClick() {
    boardCell.forEach(cell => {
        cell.addEventListener('click', (e) => {

            if (currentUser) {
                e.target.classList.add('circle');   
            } else {
                e.target.classList.add('x');
            }

            currentUser = !currentUser;

            checkWhoIsWinner();
            checkIfDraw();
            setTurn();
        }, {once : true});
    }); 
}

// Check if one of the Players win and save data/score in sessionStorage
// Save results in index.html 

function checkWhoIsWinner() {
    let result;
    let xCounter = sessionStorage.getItem('xwin'), 
        oCounter = sessionStorage.getItem('owin');

    for (let arr of winningCombinations) {
        if (Array.isArray(arr)) {
            if (arr.every(i => boardCell[i].classList.contains('x'))) {
                result = true;
                xCounter++;

                message.textContent = 'X\`s win!';
                showWinningMessage(result);
                sessionStorage.setItem('xwin', xCounter);
                sessionStorage.setItem('user', currentUser);
            } else if (arr.every(i => boardCell[i].classList.contains('circle'))) {
                result = true;
                oCounter++;

                message.textContent = 'O\`s win!';
                showWinningMessage(result);
                sessionStorage.setItem('owin', oCounter);
                sessionStorage.setItem('user', currentUser);
            } else {
                result = false;
            }
        }
    }  
}

function showWinningMessage(result) {
    if(result) {
        winningMessage.classList.add('show');
    }
}

// Check if it is a draw. 
// If all cells on the board have either x or circle class and there is no other turn then it is draw.


function checkIfDraw() {
    let result;
    let drawCounter = sessionStorage.getItem('draw');

    for (let cell of boardCell) {
        if (cell.classList.contains('x') || cell.classList.contains('circle')) {
            result = true;
        } else {
            result = false;
            break;
        }
    }

    if(winningMessage.classList.contains('show')) {
        return;
    }
    if (result) {
        drawCounter++;

        message.textContent = 'Draw!';
        showWinningMessage(result);
        sessionStorage.setItem('draw', drawCounter);
    }        
}

// If x or o wins or it is a draw then show message who is a winner and restart game by clicking on the button.

function startNewGame() {
    resetGame.addEventListener('click', () => {
        window.location.reload();
    });    
}
    
startNewGame();


//classess that will be added later on
const X_CLASS = "x";
const O_CLASS = "o";
let circleTurn

const WINNING_C = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4 ,6]
]

//selecting cells by data-cell
const cellsElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById("container");
const winningMsg = document.querySelector("[data-winning-message-text]")
const winningMsgEl = document.getElementById("winningMessage");
const restartB = document.getElementById("restartB");

startGame()
restartB.addEventListener("click", startGame);

function startGame(){
    circleTurn = false
    cellsElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMsgEl.classList.remove("show");
    
}
//listens on the cells

//function triggerd by cells click
function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? O_CLASS : X_CLASS 
    placeMark(cell, currentClass)
    if(checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
    swapTurns()
    setBoardHoverClass()
    }
}

function endGame(draw) {
    if(draw) {
        winningMsg.innerText = "GoodGame It's a DRAW!"
    } else {
        winningMsg.innerText = `${circleTurn ? "O's" : "X's"} Wins!` 
    }
    winningMsgEl.classList.add("show");
}
//placing the x and o's
function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

// switches the turns after one is placed
function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if (circleTurn) {
        board.classList.add(O_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_C.some(combination => {
        return combination.every(index => {
            return cellsElements[index].classList.contains(currentClass)
        })
    })
}

function isDraw() {
    return [...cellsElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
    }
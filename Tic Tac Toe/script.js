const cellDivs = document.querySelectorAll(".cell")
let board = ['#', "#", '#', "#", '#', '#', '#', '#', '#'];
const winningOptions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let running = true

const boardOptions = (function () {
    const markBoard = (position, symbol) => board[position] = symbol;
    const resetBoard = () => board = ['#', "#", '#', "#", '#', '#', '#', '#', '#']
    return { markBoard, resetBoard}

})()


function createPlayer(namePlayer, symbolPlayer) {
    const name = namePlayer
    const turn = false
    const symbol = symbolPlayer
    return {name, turn, symbol}
}


function initializeGame() {
    let players = [createPlayer("Player 1", "X"), createPlayer('Player 2', "O")]
    // define First Turn}
    players = defineFirstTurn(players)
    cellDivs.forEach(cell => {
        cell.addEventListener("click", (e) => playTurn(e.target, players))
    });
}

function playTurn(cell, players) {
    const cellIndex = cell.getAttribute("data-cell")
    let currentTurn = findCurrentPlayer(players)
   

    if (board[cellIndex] === "#" && running) {
        boardOptions.markBoard(cellIndex, currentTurn.symbol)
        cell.textContent = currentTurn.symbol
        checkWinner(players)
        console.log(board)
    }
}   

function checkWinner(players) {
    let roundWon = false;
    const switchPlayer = () => {
        if (players[0].turn === true && players[1].turn === false) {
            players[0].turn = false
            players[1].turn = true
        } else if (players[0].turn === false && players[1].turn === true) {
            players[0].turn = true
            players[1].turn = false
        }
    }

    for (let i = 0; i < winningOptions.length; i++) {
        const condition = winningOptions[i]
        const cellA = board[condition[0]]
        const cellB = board[condition[1]]
        const cellC = board[condition[2]]

        if (cellA == "#" || cellB == "#" || cellA == "#") {
            continue
        }

        if (cellA == cellB && cellB == cellC) {
            roundWon = true
            break;
        }
    }

    if (roundWon) {
        running = false
        document.getElementById('text').textContent = `${findCurrentPlayer(players).name} Wins!`
        console.log('you win')

    } else if (!board.includes("#")) {
        document.getElementById('text').textContent = `Draw`
        running = false
    } else {
        switchPlayer()
        document.getElementById("text").textContent = `It's ${findCurrentPlayer(players).name} Turn`
    }
}

function defineFirstTurn(players) {
    const whoGoesFirst = Math.floor(Math.random() * players.length);

    players[whoGoesFirst].turn = true
    document.getElementById('text').textContent = `It's ${players[whoGoesFirst].name} Turn`

    return players
}

function findCurrentPlayer(players) {
    let currentTurn = players.find(item => item.turn == true)
    return currentTurn
}

// function switchTurns 

initializeGame()

// ---------------------------------------

// function createPlayer(symbol) {
//     let mark = symbol;
//     return{mark}
// }

// const play = (function() {
//     const markSymbol = (cell, symbol) => cell.classList.add(symbol); 
//     const switchTurn = (turn) => turn=='user' ? 'computer' : 'user'
//     const markBoard = (board, position, symbol) =>  {board[position] = symbol 
//         return board}
//     const checkWinner = function (cells, winningOptions, currentClass){
//         return winningOptions.some(combination => {
//             return combination.every(index => {
//                 return cells[index].classList.contains(currentClass)
//             })
//         }
//         )
//     }
//     const isDraw = function(cells){
//         return [...cells].every(cell => {
//             return cell.classList.contains('mark-x') || cell.classList.contains('mark-circle')
//     })}
//     const endGame = function(draw, turn) {
//         if(draw) {
//             console.log('draw')
//         } else {
//             console.log(`${(turn=='mark-circle') ? "o's" : "x's"} Wins`)
//         }
//     }

//     return {markSymbol, switchTurn, markBoard, checkWinner, isDraw, endGame}
// })();

// function gameboard() {
//     const cellElements = document.querySelectorAll('[data-cell]')
//     const user = createPlayer('mark-x')
//     const computer = createPlayer('mark-circle')
//     let turn = 'user';
//     let winningOptions = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6]
//     ]
    
//     cellElements.forEach(cell => {
//         cell.addEventListener('click', handleClick)
//     });

//     function handleClick(e) {
//         const cell = e.target
//         const cellPosition = parseInt(cell.dataset.cell);
//         let currentTurn = turn=='user' ? `${user.mark}` : `${computer.mark}`
//         if(!cell.className.includes('mark-circle') && !cell.className.includes('mark-x') ) {
//             play.markSymbol(cell, currentTurn)
//             board = play.markBoard(board, cellPosition, currentTurn)
//             // Check results after turn
//             // checkwineer = put the cell divs, the winningoptions, and the current turn
//             if (play.checkWinner(cellElements, winningOptions,currentTurn)) {
//                 play.endGame(false, currentTurn)
//             } else if (play.isDraw(cellElements)) {
//                 play.endGame(true, currentTurn)
//             } else {
//                 turn = play.switchTurn(turn)
//             }
//         }
//     }
// };

// gameboard()


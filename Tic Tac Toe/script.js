function createBoard (){
    arrayBoard = ['#', "#", '#', "#", '#', '#', '#', '#', '#',];

    return {arrayBoard}
}

const boardOptions = (function () {
    const markBoard = (array, position, symbol) => array[position] = symbol;
    return {markBoard}
})()


function createPlayer(namePlayer, symbolPlayer) {
    const name = namePlayer
    const turn = false
    const symbol = symbolPlayer

    return {name, turn, symbol}
}

const playerOne = createPlayer("player 1", "X")
const cpu = createPlayer('CPU', "O")


const startGame = (function (playerOne, playerTwo) {
    const board = createBoard();
    const players = [playerOne, playerTwo]
    const theresWinner = false
    // define who goes first
    players[Math.floor(Math.random() * players.length)].turn = true

    while (theresWinner == false) {
        playTurn()
    }  


    function playTurn() {
        player = players.find(item => item.turn == true)
        nextPlayer = players.findIndex(item => item.turn != true)
        let selectPosition;

        if (player.name.includes('CPU')) {
            console.log(`Turn: ${player.name}`)
            selectPosition = Math.floor(Math.random() * board.arrayBoard.length) 
            boardOptions.markBoard(board.arrayBoard, parseFloat(selectPosition), player.symbol)
            player.turn = false 
            players[nextPlayer].turn = true
            console.log(board.arrayBoard)
        } else {
            console.log(`Turn: ${player.name}`)
            selectPosition = prompt('select the position' + ' ' + player.name)
            boardOptions.markBoard(board.arrayBoard, parseFloat(selectPosition), player.symbol)
            player.turn = false 
            players[nextPlayer].turn = true
            console.log(board.arrayBoard)
        }


    }



    // console.log(`Turn: ${players[randomTurn].name}`)
})

startGame(playerOne, cpu)

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
//         return combination.every(index => {
//         return cells[index].classList.contains(currentClass)
//     })})}
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
//             board = play.markBoard(board, cellPosition,currentTurn)
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


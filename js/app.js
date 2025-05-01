/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;


/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr')
// console.log(squareEls)

const messageEl = document.querySelector('#message')
// console.log(messageEl)
const boardEl = document.querySelector('.board') 

const resetBtnEl = document.querySelector('.reset-btn')
/*-------------------------------- Functions --------------------------------*/

const init =  () => {
  board = ['', '', '', '', '', '', '', '', ''];
  turn = 'X';
  winner = false;
  tie = false;
  render()
}

const render = () => {
updateBoard()
updateMessage()
}

const updateBoard = () => {
  board.forEach((square, idx) => {
    squareEls[idx].textContent = square;
  })
}

const updateMessage = () => {
  if (winner === false && tie === false) {
  messageEl.textContent = `${turn}'s turn`
  } else if (winner === false && tie === true) {
  messageEl.textContent = `well you tied`
  } else if (turn === 'X'){
    messageEl.textContent =` W goes to X`
  } else {
    messageEl.textContent = `W goes to O`
  }
 }

const handleClick = (event) => {
  const clickedSquare = event.target;
  const squareIndex = event.target.id
  if (!clickedSquare.classList.contains('sqr')) return;
  if (board[squareIndex] === 'X' || board[squareIndex] === 'O') return;
  if (winner) return;
  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
 }

const placePiece = (index) => {
  board[index] = turn
  console.log(board)
}

const checkForWinner = () => {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    const val1 = board[a];
    const val2 = board[b];
    const val3 = board[c];
    if (val1 !== '' && val1 === val2 && val2 === val3){
      winner = true;
      return
    }
  }
  winner = false
}

const checkForTie = () => {
  if(winner === true) return;
  if(board.includes('')){
    tie = false
  } else {
    tie = true
  }

  }
const switchPlayerTurn = () => {
  if(winner === true) return;
  if(winner === false) {
    if (turn === 'X') {
      turn = 'O'
    } else {
      turn = 'X'
    }
  }
}

window.onload = init;

/*----------------------------- Event Listeners -----------------------------*/

resetBtnEl.addEventListener('click', init)
boardEl.addEventListener('click', handleClick)


  
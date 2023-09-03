const gameboard = (() => {

  const playerFactory = (player, mark, turn, board) => {
    return {player, mark, turn, board} 
  }
  // Default Setup
  const player1 = playerFactory(0, 'X', true, []);
  const player2 =  playerFactory(1, 'O', false, []);
  let gameTurn = 0
  let winner= null
  const winCombos = [
    [1,2,3],
    [1,4,7],
    [4,5,6],
    [7,8,9],
    [2,5,8],
    [3,5,7],
    [3,6,9],
    [1,5,9]
];

  // To make Player selections
  const makeMove = (function () {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
      cell.addEventListener("click", (e) => {
        if (player1.turn == true && winner == null && e.target.textContent == '') {
          cell.textContent = player1.mark
          player1.board.push(parseInt(e.target.id))
          player1.turn = false
          player2.turn = true
        } else if (player2.turn == true && winner == null && e.target.textContent == '') {
          cell.textContent = player2.mark
          player2.board.push(parseInt(e.target.id))
          player1.turn = true
          player2.turn = false
        }
        gameTurn++
        console.log(gameTurn)
        gameCheck()
      })
    });

    gameCheck = () => {
      for (const combo of winCombos) {
        if (combo.every(num => player1.board.includes(num))) {
            // Player 1 has a winning combo
            winner = player1;
            gameReset()
        } else if (combo.every(num => player2.board.includes(num))) {
            // Player 2 has a winning combo
            winner = player2;
            gameReset()
        } else if (gameTurn == 9) {
            winner = 'Tie'
            gameReset()
        }
      }
    }

    gameReset = () => {
      player1.board = []
      player2.board = []
      player1.turn = true
      player2.turn = false
      gameTurn = 0
      winner = null
      cells.forEach(cell => {
        cell.textContent = ''
      })
    }
  })();
})();
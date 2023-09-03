const gameboard = (() => {
  const turnInfo = document.querySelector('#turnInfo')
  const p1Score = document.querySelector('#p1Score')
  const p2Score = document.querySelector('#p2Score')
  const playerFactory = (player, mark, turn, board, wins) => {
    return {player, mark, turn, board, wins} 
  }
  // Default Setup
  const player1 = playerFactory(0, 'X', true, [], 0);
  const player2 =  playerFactory(1, 'O', false, [], 0);
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
          turnInfo.textContent = 'O Turn'
        } else if (player2.turn == true && winner == null && e.target.textContent == '') {
          cell.textContent = player2.mark
          player2.board.push(parseInt(e.target.id))
          player1.turn = true
          player2.turn = false
          turnInfo.textContent = 'X Turn'
        }
        gameTurn++
        gameCheck()
      })
    });

    gameCheck = () => {
      for (const combo of winCombos) {
        if (combo.every(num => player1.board.includes(num))) {
            // Player 1 has a winning combo
            winner = player1;
            player1.wins++
            updateScore()
            gameReset()
        } else if (combo.every(num => player2.board.includes(num))) {
            // Player 2 has a winning combo
            winner = player2;
            player2.wins++
            updateScore()
            gameReset()
        } else if (gameTurn == 9) {
            winner = 'No one'
            gameReset()
        }
      }
    }

    gameReset = () => {
      (winner == 'No one') ? turnInfo.textContent = 'I\'ts a Tie!': turnInfo.textContent = `${winner.mark} won!`
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

    updateScore = () => {
      p1Score.textContent = `X - ${player1.wins}`
      p2Score.textContent = `O - ${player2.wins}`
    }
  })();
})();
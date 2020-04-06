import './style.css';
import Board from './board';
import Player from './player';
import Game from './game';

(() => {
  const player1 = document.querySelector('#player1');
  const player2 = document.querySelector('#player2');
  const congrats = document.querySelector('#congrats');
  const form = document.querySelector('form');
  const boxes = document.querySelectorAll('td');

  const board = new Board();
  const p1 = new Player(player1.value, 'X');
  const p2 = new Player(player2.value, 'O');
  const game = new Game(p1, p2, board);
  const DisplayController = (() => {
    const addMark = (event) => {
      const { index } = event.target.dataset;

      if (game.checkSpace(index) && !game.gameEnd()) {
        const currentPlayer = game.playerTurn();
        game.play(currentPlayer, index);
        event.target.innerHTML = currentPlayer.symbol;
        if (game.gameWin(currentPlayer.symbol)) {
          congrats.innerHTML = `Hurray!! ${currentPlayer.name} won the game`;
          return;
        }
        if (game.boardFull()) {
          congrats.innerHTML = 'It\'s a tie';
        }
      }
    };

    const clearBoard = () => {
      boxes.forEach((box) => {
        box.innerHTML = '';
      });
    };

    return { addMark, clearBoard };
  })();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    congrats.innerHTML = '';
    // Clear board
    DisplayController.clearBoard();

    // Set all value in array to empty
    board.gameBoard = ['', '', '', '', '', '', '', '', ''];
    game.changeGameStatus();
    boxes.forEach((box) => {
      const id = box.dataset.index;
      box.innerHTML = board.gameBoard[id];

      box.addEventListener('click', DisplayController.addMark);
    });
    game.start([
      { name1: player1.value, sym1: 'X' },
      { name2: player2.value, sym2: 'O' },
    ]);
  });
})();

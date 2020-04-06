import "./style.css";
import Board from "./board";
import Player from "./player";
import Game from "./game";
(() => {
  const player1 = document.querySelector("#player1");
  const player2 = document.querySelector("#player2");
  const congrats = document.querySelector("#congrats");
  const form = document.querySelector("form");
  const boxes = document.querySelectorAll("td");

  // const Player = (name, symbol) => {
  //   const playing = false;
  //   return { name, symbol, playing };
  // };

  // const GameBoard = (() => {
  //   let gameBoard = ["", "", "", "", "", "", "", "", ""];
  //   return { gameBoard };
  // })();

  const board = new Board()
  const p1 = new Player(player1.value, "X")
  const p2 = new Player(player2.value, "O")
  const game = new Game(p1,p2,board);
  const DisplayController = (() => {
    const addMark = (event) => {
      const { index } = event.target.dataset;

      if (game.checkSpace(index) && !game.gameEnd()) {
        const currentPlayer = game.playerTurn();
        console.log(currentPlayer);
        game.play(currentPlayer, index);
        event.target.innerHTML = currentPlayer.symbol;
        if (game.gameWin(currentPlayer.symbol)) {
          console.log(currentPlayer);
          congrats.innerHTML = `Hurray!! ${currentPlayer.name} won the game`;
          return;
        }
        if (game.boardFull()) {
          congrats.innerHTML = `It's a tie`;
        }
      }
    };
    // const initialize = (board) => {
    //   boxes.forEach((box) => {
    //     const id = box.dataset.index;
    //     box.innerHTML = board.gameBoard[id];

    //     box.addEventListener("click", addMark);
    //   });
    // };

    const clearBoard = () => {
      boxes.forEach((box) => {
        box.innerHTML = "";
      });
    };

    return { addMark, clearBoard };
  })();

  // const GameFlow = (() => {
    // const board = GameBoard;
    // let p1, p2;
    // let boardCount = 0;
    // let gameStatus = "playing";
    // let nextPlayer = null;
    // const start = () => {
    //   p1 = Player(player1.value, "X");
    //   p2 = Player(player2.value, "O");

    //   //Display the board with an empty array
    //   DisplayController.initialize(board);
    //   //others stuff
    // };
    // const checkSpace = (position) => {
    //   if (board.gameBoard[position] !== "") {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // };
    // const playerTurn = () => {
    //   if (!p1.playing) {
    //     p1.playing = true;
    //     p2.playing = false;
    //     nextPlayer = p2;
    //     return p1;
    //   } else {
    //     p1.playing = false;
    //     p2.playing = true;
    //     nextPlayer = p1;
    //     return p2;
    //   }
    // };

    // const changeGameStatus = () => {
    //   gameStatus = "playing";
    //   boardCount = 0;
    // };
    // const play = (player, position) => {
    //   updateBoard(player.symbol, position);
    //   if (gameWin(player.symbol)) {
    //     gameStatus = "end";
    //     return false;
    //   }
    //   return true;
    // };

    // const updateBoard = (mark, position) => {
    //   board.gameBoard[position] = mark;
    //   boardCount++;
    // };

    // const gameWin = (mark) => {
    //   if (
    //     (board.gameBoard[0] == mark &&
    //       board.gameBoard[1] == mark &&
    //       board.gameBoard[2] == mark) ||
    //     (board.gameBoard[3] == mark &&
    //       board.gameBoard[4] == mark &&
    //       board.gameBoard[5] == mark) ||
    //     (board.gameBoard[6] == mark &&
    //       board.gameBoard[7] == mark &&
    //       board.gameBoard[8] == mark) ||
    //     (board.gameBoard[0] == mark &&
    //       board.gameBoard[3] == mark &&
    //       board.gameBoard[6] == mark) ||
    //     (board.gameBoard[1] == mark &&
    //       board.gameBoard[4] == mark &&
    //       board.gameBoard[7] == mark) ||
    //     (board.gameBoard[2] == mark &&
    //       board.gameBoard[5] == mark &&
    //       board.gameBoard[8] == mark) ||
    //     (board.gameBoard[0] == mark &&
    //       board.gameBoard[4] == mark &&
    //       board.gameBoard[8] == mark) ||
    //     (board.gameBoard[2] == mark &&
    //       board.gameBoard[4] == mark &&
    //       board.gameBoard[6] == mark)
    //   ) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // };

    // const gameEnd = () => {
    //   if (boardCount == board.gameBoard.length || gameStatus == "end") {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // };

    // const boardFull = () => {
    //   if (boardCount == board.gameBoard.length) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // };

    // return {
      // start,
      // checkSpace,
      // playerTurn,
      // gameEnd,
      // updateBoard,
      // gameWin,
      // play,
      // changeGameStatus,
      // nextPlayer,
      // boardFull,
    // };
  // })();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    congrats.innerHTML = "";
    //Clear board
    DisplayController.clearBoard();

    //Set all value in array to empty
    board.gameBoard =  ["", "", "", "", "", "", "", "", ""]
    // GameBoard.gameBoard = ["", "", "", "", "", "", "", "", ""];
    // GameFlow.changeGameStatus();
    // GameFlow.start();
    game.changeGameStatus();
    boxes.forEach((box) => {
      const id = box.dataset.index;
      box.innerHTML = board.gameBoard[id];

      box.addEventListener("click", DisplayController.addMark);
    });
    game.start([
      {name1:player1.value,sym1:'X'},
      {name2:player2.value,sym2:'O'}
    ]);
  });
})();

import Player from './player';
export default class game {
  constructor(player1Val, player2Val, board) {
    this.board = board;
 
    // this.boardCount = 0;
    this.gameStatus = "playing";
    this.nextPlayer = null;
    this.player1Val = player1Val;
    this.player2Val = player2Val;
  }

  start(players){
    console.log(players[0]);
    this.player1Val= new Player(players[0].name1, players[0].sym1);
    this.player2Val = new Player(players[1].name2, players[1].sym2)
  }

  checkSpace(position){
    if (this.board.gameBoard[position] !== "") {
      return false;
    } else {
      return true;
    }
  }
  playerTurn(){
    if (!this.player1Val.playing) {
      this.player1Val.playing = true;
      this.player2Val.playing = false;
      this.nextPlayer = this.player2Val;
      return this.player1Val;
    } else {
      this.player1Val.playing = false;
      this.player2Val.playing = true;
      this.nextPlayer = this.player1Val;
      return this.player2Val;
    }
  }

  changeGameStatus(){
    this.gameStatus = "playing";
    this.board.boardCount = 0;
  }

  play(player, position){
    this.updateBoard(player.symbol, position);
    if (this.gameWin(player.symbol)) {
      this.gameStatus = "end";
      return false;
    }
    return true;
  }
   gameWin(mark){
    if (
      (this.board.gameBoard[0] == mark &&
        this.board.gameBoard[1] == mark &&
        this.board.gameBoard[2] == mark) ||
      (this.board.gameBoard[3] == mark &&
        this.board.gameBoard[4] == mark &&
        this.board.gameBoard[5] == mark) ||
      (this.board.gameBoard[6] == mark &&
        this.board.gameBoard[7] == mark &&
        this.board.gameBoard[8] == mark) ||
      (this.board.gameBoard[0] == mark &&
        this.board.gameBoard[3] == mark &&
        this.board.gameBoard[6] == mark) ||
      (this.board.gameBoard[1] == mark &&
        this.board.gameBoard[4] == mark &&
        this.board.gameBoard[7] == mark) ||
      (this.board.gameBoard[2] == mark &&
        this.board.gameBoard[5] == mark &&
        this.board.gameBoard[8] == mark) ||
      (this.board.gameBoard[0] == mark &&
        this.board.gameBoard[4] == mark &&
        this.board.gameBoard[8] == mark) ||
      (this.board.gameBoard[2] == mark &&
        this.board.gameBoard[4] == mark &&
        this.board.gameBoard[6] == mark)
    ) {
      return true;
    } else {
      return false;
    }
  }

  gameEnd(){
    if (this.board.boardCount == this.board.gameBoard.length || this.gameStatus == "end") {
      return true;
    } else {
      return false;
    }
  }

  updateBoard(mark, position){
    this.board.gameBoard[position] = mark;
    this.board.boardCount++;
  }

  boardFull(){
    if (this.board.boardCount == this.board.gameBoard.length) {
      return true;
    } else {
      return false;
    }
  }

}

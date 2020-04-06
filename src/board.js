class Board {
  constructor() {
    this.gameBoard = ['', '', '', '', '', '', '', '', ''];
    this.boardCount = 0;
  }

  // updateBoard(mark, position){
  //   this.gameBoard[position] = mark;
  //   this.boardCount++;
  // }

  // boardFull(){
  //   if (this.boardCount == this.gameBoard.length) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
export default Board;
import Board from '../src/board';

describe('Board', () => {
  const board = new Board();
  it('should display an empty board', () => {
    expect(board.gameBoard).toEqual(['', '', '', '', '', '', '', '', '']);
  });
  it('new board count should be 0', () => {
    expect(board.boardCount).toEqual(0);
  });
});

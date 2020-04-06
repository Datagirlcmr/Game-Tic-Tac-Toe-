import Board from './board';


describe('Board', () => {
    const board = new Board;

    it('should display an empty board', () => {
    expect(board.gameBoard).toBe(["", "", "", "", "", "", "", "", ""])
    })
})
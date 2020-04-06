import Player from "../src/player";
import Game from "../src/game";
import Board from "../src/board";

describe("Game Flow", () => {
  const p1 = new Player("John", "X");
  const p2 = new Player("Smith", "O");
  const board = new Board();
  const game = new Game(p1, p2, board);
  it("New game has a stasus of playing", () => {
    expect(game.gameStatus).toBe("playing");
  });
  it("New game has a next player set to null", () => {
    expect(game.nextPlayer).toBe(null);
  });
  it("return true for empty space in the game board ", () => {
    expect(game.checkSpace(0)).toBe(true);
  });
  it("return false for occupied space in the game board ", () => {
    game.play(p1, 2);
    expect(game.checkSpace(2)).toBe(false);
  });

  it("return the player whose turn it is to play ", () => {
    expect(game.playerTurn()).toBe(p1);
  });

  it("reset the game status and the board count", () => {
    game.changeGameStatus();
    expect(game.gameStatus).toBe("playing");
    expect(game.board.boardCount).toBe(0);
  });

  it("should return true when the game board is full",()=>{
    game.play(p1, 0);
    game.play(p2, 1);
    game.play(p1, 2);
    game.play(p2, 3);
    game.play(p1, 4);
    game.play(p2, 5);
    game.play(p1, 6);
    game.play(p2, 7);
    game.play(p1, 8);
    expect(game.gameEnd()).toBe(true)
  })

  it("should return true when the board is full",()=>{
    game.changeGameStatus()
    game.play(p1, 0);
    game.play(p2, 1);
    game.play(p1, 2);
    game.play(p2, 3);
    game.play(p1, 4);
    game.play(p2, 5);
    game.play(p1, 6);
    game.play(p2, 7);
    game.play(p1, 8);
    expect(game.boardFull()).toBe(true)
  })
  it("should return false when the board is not full",()=>{
    game.changeGameStatus()
    game.play(p1, 0);
    game.play(p2, 1);
    game.play(p1, 2);
    game.play(p2, 3);
    expect(game.boardFull()).toBe(false)
  })
});

describe("Game play", () => {
  const p1 = new Player("John", "X");
  const p2 = new Player("Smith", "O");
  const board = new Board();
  const game = new Game(p1, p2, board);
  it("plays the game and return true if game not ended", () => {
    expect(game.play(p1, 0)).toBe(true);
  });

  it("plays the game and return false if game is ended", () => {
    game.play(p1, 0);
    game.play(p2, 1);
    game.play(p1, 2);
    game.play(p2, 3);
    game.play(p1, 4);
    game.play(p2, 5);
    game.play(p1, 6);
    game.play(p2, 7);
    expect(game.play(p1, 8)).toBe(false);
  });

  it("should return gamestatus end for a game that has ended", () => {
    expect(game.gameStatus).toBe("end");
  });
});

describe("Game win", () => {
  const p1 = new Player("John", "X");
  const p2 = new Player("Smith", "O");
  const board = new Board();
  const game = new Game(p1, p2, board);
  it("check for game win scenario", () => {
    game.play(p1, 0);
    game.play(p2, 3);
    game.play(p1, 1);
    game.play(p2, 5);
    game.play(p1, 2);
    expect(game.gameWin('X')).toBe(true)
  });
});

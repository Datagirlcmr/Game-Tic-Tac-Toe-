import Player from '../src/player';

describe('Player Flow', () => {
  const player = new Player('Selma', 'X');

  it('checks the player name', () => {
    expect(player.name).toBe('Selma');
  });

  it('checks the player symbol', () => {
    expect(player.symbol).toBe('X');
  });

  it('checks the player status', () => {
    expect(player.playing).toBe(false);
  });
});
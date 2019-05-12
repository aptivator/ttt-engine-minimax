import {expect}  from 'chai';
import {minimax} from '../../src/engine/minimax';

describe('minimax() engine', () => {
  it('diagnoses a submitted draw', () => {
    let grid = [
      'x', 'o', 'x',
      'x', 'x', 'o',
      'o', 'x', 'o'
    ];
    
    let move = minimax({grid, ch: 'x'});
    expect(move).to.deep.equal({draw: true});
  });
  
  it('determines a submitted win', () => {
    let grid = [
      'x', 'o', 'o',
      'x', 'x', 'o',
      'o', 'x', 'x'
    ];
    
    let move = minimax({grid, ch: 'x'});
    expect(move).to.deep.equal({win: [0, 4, 8], ch: 'x'});
  });
  
  it('finds a winning move and returns a win', () => {
    let grid = [
      'x', 'o', 'o',
      'x', 'x', 'o',
      'o', 'x', null    
    ];
    
    let move = minimax({grid, ch: 'x'});
    expect(move).to.deep.equal({move: 8, ch: 'x', win: [0, 4, 8]});
  });
  
  it('finds an optimal move when playing perfect', () => {
    let grid = [
      'x', null, null,
      null, null, null,
      null, null, null
    ];
    
    let move = minimax({grid, ch: 'o'});
    expect(move).to.deep.equal({move: 4, ch: 'o'});
  });
  
  it(`does not find an optimal move when set to be 'dumb'`, () => {
    let grid = [
      'x', null, null,
      null, null, null,
      null, null, null
    ];
    
    let move = minimax({grid, ch: 'o', level: 0});
    expect(move).to.deep.equal({move: 1, ch: 'o'});
  });
});

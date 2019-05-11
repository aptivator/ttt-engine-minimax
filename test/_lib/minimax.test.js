import {expect} from 'chai';
import {ttt}    from '../../src';

describe('ttt()', () => {
  it('works', () => {
    let grid = [
      'o', 'o', 'x',
      'x', 'x', 'o',
      'o', 'o', 'o'
    ];
    
    let ch = 'o';
    let move = ttt(grid, ch);
    console.log(move);
  });
});

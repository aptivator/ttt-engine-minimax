import {expect}            from 'chai';
import {ttt}               from '../src';
import {pickRandomElement} from '../src/_lib/utils';

describe('two-player game simulation', () => {
  it('perfect player beats lower-level player and perfect players draw', () => {
    let results = {
      perfect: {},
      imperfect: {}
    };

    let perfect = (board) => ttt({board, ch: 'x'});
    
    for(let level of [0, 9]) {
      results.perfect[level] = {wins: 0};
      results.imperfect[level] = {wins: 0};

      let imperfect = (board) => ttt({board, ch: 'o', level});
      
      for(let game = 0; game < 3; game++) {
        let start = pickRandomElement([0, 1]);

        let board = [
          null, null, null,
          null, null, null,
          null, null, null
        ];
        
        for(let i = start; ; i++) {
          let player = i % 2 === 0 ? perfect : imperfect;
          let {move, ch, win, draw, winningCh} = player(board);
          let playerType = (winningCh === 'x' ? '' : 'im') + 'perfect';
          
          if(draw) {
            break;
          }
          
          if(win) {
            results[playerType][level].wins++;
            break;
          }
          
          board[move] = ch;
        }
      }
    }

    expect(results.perfect[0].wins).to.be.above(results.imperfect[0].wins);
    expect(results.perfect[9].wins).to.equal(0);
    expect(results.perfect[9].wins).to.equal(0);
  }).timeout(50000);
});

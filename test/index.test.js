import {expect}               from 'chai';
import {ttt}                  from '../src';
import {aggregateUniqueMoves} from './_fixtures/moves-aggregator';

describe('ttt() engine wrapper', () => {
  it('diagnoses an opponent win', () => {
    let board = [
      'x', 'o', 'o',
      'x', 'x', 'o',
      'x', null, null
    ];

    let move = ttt({board, ch: 'o'});
    expect(move).to.eql({win: [0, 3, 6], ch: 'o', winningCh: 'x'});
  });

  it('finds a submitted draw', () => {
    let board = [
      'o', 'x', 'o',
      'x', 'x', 'o',
      'o', 'o', 'x'
    ];
    
    let move = ttt({board, ch: 'x'});
    expect(move).to.eql({draw: true, ch: 'x'});
  });

  it('selects a winning move', () => {
    let board = [
      'o', 'x', 'o',
      'o', 'x', 'x',
      'x', null, 'o'
    ];
    
    let move = ttt({board, ch: 'x'});
    expect(move).to.eql({move: 7, winningCh: 'x', ch: 'x', win: [1, 4, 7]});
  });

  it('draws a game', () => {
    let board = [
      'o', 'x', 'o',
      'x', 'x', 'o',
      'o', 'o', null
    ];
    
    let move = ttt({board, ch: 'x'});
    expect(move).to.eql({draw: true, ch: 'x', move: 8});
  });

  it('produces an optimal move', () => {
    let board = 'o        ';
    let moves = aggregateUniqueMoves(ttt, 5, {board, ch: 'x'});
    expect(moves).to.eql([4]);
  });

  it('plays "dumb" by selecting any available move', () => {
    let board = [
      'x', 'o', 'o',
      'x', 'x', 'o',
      null, null, null
    ];

    let moves = aggregateUniqueMoves(ttt, 20, {board, ch: 'x', level: 0});
    expect(moves.sort()).to.eql([6, 7, 8]);
  });

  it('plays "dumb" by selecting first available move', () => {
    let board = [
      'x', 'x', 'o',
      'o', 'x', 'o',
      null, null, null
    ];

    let moves = aggregateUniqueMoves(ttt, 10, {board, ch: 'x', random: false, level: 0});
    expect(moves).to.eql([6]);
  });

  it('picks a move randomly out of equivalently strong moves', () => {
    let board = [
      null, null, null,
      null, 'x', null,
      null, null, null
    ];

    let moves = aggregateUniqueMoves(ttt, 20, {board, ch: 'o'});
    expect(moves.sort()).to.eql([0, 2, 6, 8]);
  }).timeout(10000);
});

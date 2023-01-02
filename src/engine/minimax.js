import {findWin, getBlankCells, isFullAndDrawn} from '../_lib/ttt-utils';
import {opponent}                               from '../_lib/vars';

function scoreBoard({board, ch, level, depth}) {
  if(depth > level) {
    return 0;
  }

  if(findWin(board, ch)) {
    return 10 - depth;
  }

  if(findWin(board, opponent[ch])) {
    return depth - 10;
  }

  if(isFullAndDrawn(board)) {
    return 0;
  }
}

export function minimax({board, ch, ch_ = ch, level, moves = [], depth = 0}) {
  let score = scoreBoard({board, ch, level, depth});

  if(typeof score === 'undefined') {
    let maximizing = ch === ch_;
    let minmax = maximizing ? -Infinity : Infinity;
    let blanks = getBlankCells(board);
    board = board.slice();
    
    for(let cell of blanks) {
      board[cell] = ch_;
      let {score} = minimax({board, ch, ch_: opponent[ch_], level, moves: false, depth: depth + 1});
      board[cell] = null;

      if(maximizing && score > minmax || !maximizing && score < minmax) {
        minmax = score;
        moves && (moves = [cell]);
      } else if(moves && score === minmax) {
        moves.push(cell);
      }
    }

    return {score: minmax, moves};
  }

  return {score};
}

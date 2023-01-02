import {findWinOrDraw, normalizeBoard} from './_lib/ttt-utils';
import {pickRandomElement}             from './_lib/utils';
import {opponent}                      from './_lib/vars';
import {minimax}                       from './engine/minimax';

export function ttt({board: _board, ch, random = true, level = Infinity}) {
  let board = normalizeBoard(_board);
  let winOrDraw = findWinOrDraw(board, opponent[ch]);

  if(!winOrDraw) {
    let {moves} = minimax({board, ch, level});
    let move = random ? pickRandomElement(moves) : moves[0];

    board = board.slice();
    board[move] = ch;
    move = {move, ch};
    winOrDraw = findWinOrDraw(board, ch);

    if(winOrDraw) {
      Object.assign(move, winOrDraw);
    }
  
    return move;    
  }

  return Object.assign(winOrDraw, {ch});
}

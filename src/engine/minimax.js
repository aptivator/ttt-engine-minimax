import {opponent} from '../_lib/vars';
import tttUtils   from '../_lib/ttt-utils';

export function minimax({grid: _grid, ch, _ch = ch, level = Infinity, depth = 0}) {
  if(depth > level || tttUtils.isFullAndDrawn(_grid) || depth > level) {
    return depth ? 0 : {draw: true};
  }
  
  let win = tttUtils.findWin(_grid, ch);
  
  if(win) {
    return depth ? 10 - depth : {win, ch};
  }
  
  win = tttUtils.findWin(_grid, opponent[ch]);
  
  if(win) {
    return depth ? depth - 10 : {win, ch: opponent[ch]};
  }
  
  let maximizing = ch === _ch;
  let minmax = maximizing ? -Infinity : Infinity;
  let grid = _grid.slice();
  let blanks = tttUtils.blanks(_grid);
  let move;
  
  for(let cell of blanks) {
    grid[cell] = _ch;
    let score = minimax({grid, ch, _ch: opponent[_ch], level, depth: depth + 1});
    grid[cell] = null;

    if(maximizing && score > minmax || !maximizing && score < minmax) {
      minmax = score;
      move = cell;
    }
  }

  if(!depth) {
    grid[move] = ch;
    move = {move, ch};
    win = tttUtils.findWin(grid, ch);
    
    if(win) {
      Object.assign(move, {win});
    }
    return move;
  }
  
  return minmax;
}

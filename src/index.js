import tttUtils  from './_lib/ttt-utils';
import {minimax} from './engine/minimax';

export function ttt(grid, ch) {
  grid = tttUtils.normalizeGrid(grid);
  return minimax({grid, ch});
}

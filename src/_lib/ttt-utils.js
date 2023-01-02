import {opponent, wins} from './vars';

export function findWin(board, ch) {
  winsLoop:
  for(let win of wins) {
    for(let cell of win) {
      if(board[cell] !== ch) {
        continue winsLoop;
      }
    }

    return win;
  }
}

export function findWinOrDraw(board, ch) {
  let win = findWin(board, ch);

  if(win) {
    return {win, winningCh: ch};
  }

  if(isFullAndDrawn(board)) {
    return {draw: true};
  }
}

export function getBlankCells(board) {
  for(var blankCells = [], i = 0, {length} = board; i < length; i++) {
    if(!board[i]) {
      blankCells.push(i);
    }
  }

  return blankCells;
}

export function isFullAndDrawn(board) {
  let blanks = getBlankCells(board);

  if(!blanks.length) {
    let [ch, ch_] = Object.keys(opponent);
    return !findWin(board, ch) && !findWin(board, ch_);
  }
}

export function normalizeBoard(board) {
  if(typeof board === 'string') {
    board = board.split('').map((ch) => ch === ' ' ? null : ch);
  }

  return board;
}

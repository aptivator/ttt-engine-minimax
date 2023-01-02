export function aggregateUniqueMoves(callback, iterations, ...params) {
  for(var i = 0, moves = new Set(); i < iterations; i++) {
    let {move} = callback(...params);
    moves.add(move);
  }

  return Array.from(moves);
}

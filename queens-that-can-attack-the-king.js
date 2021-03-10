/*
Leetcode. 09/03/2021. On an 8x8 chessboard, there can be multiple black queens and one white king. Given an array of integer coordinates -
queens - that represent the positions of the queens, and a pair of coordinates - king - that represents the position of the king, return a
list of the queens - in any order - that can attack the king.

The Pattern
- The coordinates in queens and king are [row, column] or [y, x].
- A king can be attacked only by a queen in the same row, column or diagnal.
- Only the closest queen in the same row, column or diagnal can actually the king.
- Using the 8x8 chess board diagrams provided on Leetcode, I deduced that the king could be attacked from above, below, left, right,
  diagnal top left, diagnol top right, diagnol bottom left and diagnol bottom right.
- There can never be more than 8 queens that can attack the king.

Defining The Directions
- king = [3, 4].
1) Above: [2, 4], decrease y, keep x the same.
2) Below: [5, 4], increase y, keep x the same.
3) Left: [3, 3], keep y the same, decrease x.
4) Right: [3, 5], keep y the same, increase x.
5) Diagnal Top Left: [2, 3], decrease y, decrease x by the same interval.
6) Diagnal Bottom Right: [4, 5], increase y, increase x by the same interval.
7) Diagnal Top Right: [2, 5], decrease y, increase x by same interval.
8) Diagnal Bottom Left: [4, 3], increase y, decrease x by same interval.

The Implementation
1) We first call our validlyPositionedQueens function, which returns an object where the properties are directions the king can be attacked
   from, and the values are queens from inside the queens array, which align with those positions i.e. above, below, top left etc.
2) In this function we first create an empty object vpq.
3) We then isolate the y and x coordinates of the king, which we will need.
4) We iterate over queens, which is an array of arrays where each sub-array holds the [y, x] coordinates of a queen.
5) For each queen, we isolate that queen's y and x coordinates.
6) We have an if statement for each of our directions the king can attack from, by queen y with king y and queen x with king x.
   1) topLeft: queen y < king y and queen x < king x and queen y - queen x must be the same as king y - king x. For example, if king is at
      [3, 4], the first topLeft is [2, 3], 3 - 4 = -1 and 2 - 3 = -1.
   2) bottomRight: queen y > king y and queen x > king x and queen y - queen x must be the same as king y - king x. For example, if king is
      [3, 4], the first bottomRight is [4, 5], 3 - 4 = -1 and 4 - 5 = -1.
   3) topRight: queen y < king y and queen x > king x and queen y + queen x must be the same as king y + king x. For example, if king is
      [3, 4], the first topRight is [2, 5], 3 + 4 = 7 and 2 + 5 = 7.
   4) bottomLeft: queen y > king y and queen x < king x and queen y + queen x must be the same as king y + king x. For example, if king is
      [3, 4], the first bottomLeft is [4, 3], 3 + 4 = 7 and 4 + 3 = 7.
7) For each queen, we add it to the object in the corresponding direction, if it is a direction from which the king can be attacked.
8) We return the object.
9) Back inside attackingQueensMS, we convert the vpq object into an array of arrays then map over the array.
10) Each sub-array holds the queens in a particular direction from where the king can be attacked from. The first thing we do is push the
    king into this sub-array.
11) We then sort the sub-array and return the index position of the king, storing this in the variable kingIndex.
12) We also take the length of the sub-array.
13) In this king-appended sub-array, the king will either have been located in the first index position, or the last index position. For
    example if king is [3, 3] and the sub-array contains [1, 1] and [2, 2], this sub-array represents topLeft queens and king will be at the
    end. If the sub-array contains [4, 4] and [5, 5], this sub-array represents bottomRight queens and king will be at the beginning.
14) Therefore, if kingIndex is equal to the length of the array minus 1, we convert this entire sub-array to the queen at
    queens[kingIndex - 1]. If not, king is at the front of the array, and we convert this entire sub-array to the queen at the index
    position after kingIndex.
15) Now we have the queens capable of attacking the king, in an array of arrays, we return that array.
*/

function attackingQueensMS(queens, king) {
  const vpq = validlyPositionedQueens(queens, king);
  
  const capableQueens = Object.values(vpq).map(queens => {
    queens.push(king);

    let kingIndex = queens.sort().findIndex(pair => {
      return pair[0] === king[0] && pair[1] === king[1];
    });

    let n = queens.length;

    return kingIndex === n - 1 ? queens[kingIndex - 1] : queens[kingIndex + 1];
  });

  return capableQueens;
}

const validlyPositionedQueens = (queens, king) => {
  let vpq = {};

  const ky = king[0];
  const kx = king[1];
  
  queens.forEach(queen => {
    let qy = queen[0];
    let qx = queen[1];
    
    if (qy < ky && qx === kx) {
      vpq['above'] ? vpq['above'].push(queen) : vpq['above'] = [queen];
    } 
    
    if (qy > ky && qx === kx) {
      vpq['below'] ? vpq['below'].push(queen) : vpq['below'] = [queen];
    } 
    
    if (qy === ky && qx < kx) {
      vpq['left'] ? vpq['left'].push(queen) : vpq['left'] = [queen];
    } 
    
    if (qy === ky && qx > kx) {
      vpq['right'] ? vpq['right'].push(queen) : vpq['right'] = [queen];
    } 
    
    if (qy < ky && qx < kx && qy - qx === ky - kx) {
      vpq['topLeft'] ? vpq['topLeft'].push(queen) : vpq['topLeft'] = [queen];
    } 
    
    if (qy < ky && qx > kx && qy + qx === ky + kx) {
      vpq['topRight'] ? vpq['topRight'].push(queen) : vpq['topRight'] = [queen];
    } 
    
    if (qy > ky && qx < kx && qy + qx === ky + kx) {
      vpq['bottomLeft'] ? vpq['bottomLeft'].push(queen) : vpq['bottomLeft'] = [queen];
    }
    
    if (qy > ky && qx > kx && qy - qx === ky - kx) {
      vpq['bottomRight'] ? vpq['bottomRight'].push(queen) : vpq['bottomRight'] = [queen];
    } 
  });

  return vpq;
}
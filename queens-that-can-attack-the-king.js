/*
Leetcode. 09/03/2021.

// 8 possible directions
// the closest queen in each direction
// there can never be more than 8 queens that can attack the king

// have an object
// define each direction
// iterate over array and add each queen to the direction in the object

// king = [3,4], y (row) = 3. x (column) = 4, 

// directly above [2,4] -1 to y
// directly below [5,4] +1 to y
// directly left [3,3] -1 from x
// directly right [3,5] +1 to x
// diag top left [2, 3] -1 from both
// diag bottom left [4, 3] +1 to y, -1 from x
// diag top right [2, 5] -1 from y, +1 to x
// diag bottom right [4, 5] +1 to both

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

// potential alternative ? sort according to kings[0] and kings[1] then take the first (or last element)

const validlyPositionedQueens = (queens, king) => {
  let vpq = {};
  
  queens.forEach(queen => {
    let qy = queen[0];
    let qx = queen[1];
    let ky = king[0];
    let kx = king[1];
    
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

console.log(attackingQueensMS([[0,0],[1,1],[2,2],[3,4],[3,5],[4,4],[4,5]], [3,3]))
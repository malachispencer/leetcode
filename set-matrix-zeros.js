/*
Leetcode. 02/03/2021. Given an m x n matrix, if an element is 0, set its entire row and column to 0, do it in-place. For example, if our
matrix is [[0,1,2,0], [3,4,5,2], [1,3,1,5]], since the first row contains a zero, that entire row should become 0, also, zeros exist at
column positions 0 and 4, so every row's 0 and 4 elements should be zero. Thus the ouput will be [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]. 
Here is the solution I developed to solve the challenge.
1) We pass our matrix into the getZeroPositions function, which returns an object where the property is the index of a row containing one or
   more zeros, and the value is an array of the column index positions of the zero(s). We store the object in a variable zeros.
2) Inside getZeroPositions, we first initialize the empty object.
3) We create a for loop to iterate over each row.
4) We create a nested for loop for each row, which iterates over each column in that row.
5) If any column is zero, we first check if our object has the current row index as a property, if it does, we push the colum index 
   position into the value array, if not, we set the value equal to an array containing just the first column index.
6) We then return the object.
7) Now we have the index positions of the rows containing zeros along with the index positions of the columns where those zeros are inside
   the respective rows, we must get to mutating the matrix.
8) We iterate over the object properties i.e. the rows. Then for each row, we iterate over the array of zero columns.
9) For each zeroColumn, we iterate over the rows of the matrix and if the index position of the matrix is the same as the index position
   of the zeroColumn's row, we convert that entire row of the matrix to zeros. If the matrix row is not the zeroColumn's parent row, we
   simply convert the zeroColmun index position of that matrix row, to zero.
10) Note, with this implementation, a matrix row with more than one zeros, will have all its elements changed to zero, as many times as the
    amount of zeros that exist in the row.
11) Also note, in our object, the row property - row index in the matrix containing one or more zeros - is a string, so we must convert it
    back to an integer when comparing it with the matrix index positions.

setZerosMS([[0, 1, 2, 7], [3, 4, 5, 6], [0, 8, 9, 0]])
1) zeros = { '0': [ 0 ], '2': [ 0, 3 ] }.
2) row = '0'. matrix = [[0, 1, 2, 7], [3, 4, 5, 6], [0, 8, 9, 0].
   - zeroColumn = 0.
     - i = 0.
       - i is equal to row so the whole row [0, 1, 2, 7] is changed to [0, 0, 0, 0].
     - i = 1.
       - i is not equal row so matrix[i][zeroColumn] becomes 0. Essentially [3, 4, 5, 6] becomes [0, 4, 5, 6].
      - i = 2.
        - i is not equal to row so [0, 8, 9, 0] becomes [0, 8, 9, 0].
  row = '2'. matrix = [[0, 0, 0, 0], [0, 4, 5, 6], [0, 8, 9, 0]].
    - zeroColumn = 0.
      - i = 0. matrix[i] = [0, 0, 0, 0].
        - i is not equal to row so [0, 0, 0, 0] becomes [0, 0, 0, 0].
      - i = 1. matrix[i] = [0, 4, 5, 6].
        - i is not equal to row so [0, 4, 5, 6] becomes [0, 4, 5, 6].
      - i = 2. matrix[i] = [0, 8, 9, 0].
         - i is equal to row so whole row [0, 8, 9, 0] becomes [0, 0, 0, 0].
    - zeroColumn = 3.
      - i = 0. matrix[i] = [0, 0, 0, 0].
        - i is is not equal to row so [0, 1, 2, 7] becomes [0, 0, 0, 0].
      - i = 1. matrix[i] = [0, 4, 5, 6].
        - is is not equal to row so [0, 4, 5, 6] becomes [0, 4, 5, 0].
      - i = 2. matrix[i] = [0, 0, 0, 0].
        - i is equal to the row so [0, 0, 0, 0] becomes [0, 0, 0, 0].
3) The matrix is now [[ 0, 0, 0, 0 ], [ 0, 4, 5, 0 ], [ 0, 0, 0, 0 ]]. It has its zeros set so we return it.
*/

function setZerosMS(matrix) {
  const zeros = getZeroPositions(matrix);
  
  for (const row in zeros) {
    zeros[row].forEach(zeroColumn => {
      for (let i = 0; i < matrix.length; i++) {
        if (i === Number(row)) {
          console.log(matrix[i])
          matrix[i] = Array(matrix[row].length).fill(0);
        } else {
          matrix[i][zeroColumn] = 0;
        }
      }
    });
  }
  
  return matrix;
}

const getZeroPositions = matrix => {
  let zeros = {};

  for (let ri = 0; ri < matrix.length; ri++) {
    let row = matrix[ri];

    for (let ci = 0; ci < row.length; ci++) {
      let column = row[ci];

      if (column === 0) {
        zeros[ri] ? zeros[ri].push(ci) : zeros[ri] = [ci];
      }
    }
  }

  return zeros;
}
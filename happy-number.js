/*
Leetcode. 23/03/2021. Write an algorithm to determine if a number is happy. A happy number is defined by the following process:
1) Starting with any positive integer, replace the number by the sum of squares of its digits.
2) Keep doing that until the number is 1, or it keeps looping endlessly in a cycle where 1 is never encountered.
3) The numbers for which this process ends in 1, are happy numbers.

____MY ALGORITHM____

If there is a 4 in the sequence of any number n, this will result in an endless loop, and thus n will undoubtedly not be a happy number.
Otherwise, n will be a happy number. The 2 lowest numbers that can be appear in any sequence are 1 (1 ** 2) and 4 (2 ** 2), thus it makes
sense for us to track the appearance of a 4, which indicates an endless loop.

1 Sequence:
1) 1 ** 2 = 1.

2 Sequence:
1) 2 ** 2 = 4. 
2) 4 ** 2 = 16.
3) 1 ** 2 (1) + 6 ** 2 (36) = 37.
4) 3 ** 2 (9) + 7 ** 2 (49) = 58.
5) 5 ** 2 (25) + 8 ** 2 (64) = 89.
6) 8 ** 2 (64) + 9 ** 2 (81) = 145.
7) 1 ** 2 (1) + 4 ** 2 (16) + 5 ** 2 (25) = 42.
8) 4 ** 2 (16) + 2 ** 2 (4) = 20.
9) 2 ** 2 (4) + 0 ** 2 (0) = 4.

3 Sequence:
1) 3 ** 2 = 9.
2) 9 ** 2 = 81.
3) 8 ** 2 (64) + 1 ** 2 (1) = 65.
4) 6 ** 2 (36) + 5 ** 2 (25) = 61.
5) 6 ** 2 (36) + 1 ** 2 (1) = 37.
6) We encountered 37 in 2 sequence, this will lead to 4 eventually, and then keep cycling back to 4 endlessly.

4 Sequence:
1) We encountered 4 in 2 sequence, this will lead back to 4 and loop endlessly.

5 Sequence:
1) 5 ** 2 = 25.
2) 2 ** 2 (4) + 5 ** 2 (25) = 29.
3) 2 ** 2 (4) + 9 ** 2 (81) = 85.
4) 8 ** 2 (64) + 1 ** 2 (1) = 65.
4) We encountered 65 in 3 sequence, which eventually leads to 4 and loops endlessly.

6 Sequence:
1) 6 ** 2 = 36.
2) 3 ** 2 (9) + 6 ** 2 (36) = 45.
3) 4 ** 2 (16) + 5 ** 2 (25) = 61.
4) We encountered 61 in 3 sequence, which eventually leads to 4 and loops endlessly.

7 Sequence
1) 7 ** 2 = 49.
2) 4 ** 2 (16) + 9 ** 2 (81) = 97.
3) 9 ** 2 (81) + 7 ** 2 (49) = 130.
4) 1 ** 2 (1) + 3 ** 2 (9) + 0 ** 2 (0) = 10.
5) 1 ** 2 (1) + 0 ** 2 (0) = 1.
6) 7 is the lowest happy number.

____MY IMPLEMENTATION____

1) We first create our helper function sumOfSquaresMS, which converts the integer passed in to a string, splits the string into an array
   of string numbers, then maps over the array and converts the string numbers to integers. It then uses the reduce method to square each
   number in the array and sum them.
2) We create a variable ssd, where we store the sum of squared digits of n.
3) As long as ssd is greater than 4, we keep performing the sum of squared digits, eventually it will either hit 4 or 1, at which point
   we break out of the while loop.
4) If ssd is 1, we return true, otherwise (it's 4), we return false.
*/

function isHappyMS(n) {
  let ssd = sumOfSquares(n);
  
  while (ssd > 4) {
    ssd = sumOfSquares(ssd);
  }
  
  return ssd === 1;
}

const sumOfSquaresMS = n => {
  let digits = n.toString().split('').map(Number);
  return digits.reduce((acc, v) => acc + (v ** 2), 0);
}
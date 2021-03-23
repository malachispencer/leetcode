/*
Leetcode. 17/03/2021. We have two special characters, the first character can be represented bt 1-bit (0) and the second can be represented
by 2-bits (10 or 11). Given an array of several bits, return whether the last character is a 1-bit character or not. The last bit will
always be 0. For example, [1, 0, 0] => true because we have 10 and 0, [1, 1, 1, 0] => false because we have 11 and 10. Here is the
solution I used to solve the challenge.

____THE ALGORITHM____

We can iterate in steps in order to solve this problem. We start at the first element in the array, if the current element is a 1, it most
definitely is part of a 2-bit character (10 or 11), so we increment the iterator variable by 2. If the current eleemnt is a 0, we have
encountered a 1-bit character, so we increment the iterator variable by 1. Once we reach the end of the array, we have touched every
character. We keep track of every bit as we traverse the array, if the last bit we encountered was a 0, we return true because the
sequence does end with a 0, if the last bit we encountered is a 1, we return false.

____SOLUTION EXAMPLES____

isLastCharOneBit([1, 1, 1, 1, 1, 1, 0])
1) bits.length = 7. bits index = 0..6.
2) Iteration 1: i = 0, bit[i] = 1. We increment i by 2.
3) Iteration 2: i = 2. bit[i] = 1. We increment i by 2.
4) Iteration 3: i = 4. bit[i] = 1. We increment i by 2.
5) Iteration 4: i = 6. bit[i] = 0. We increment i by 1.
6) i (7) is no longer less than bits.length (7) so the loop breaks.
7) The last bit[i] was 0, so the sequence ends with a 1-bit character, we return true.

isLastCharOneBit([0, 0, 0, 1, 0, 1, 1, 1, 0])
1) bits.length = 9. bits index = 0..8.
2) Iteration 1: i = 0. bit[i] = 0. We increment i by 1.
3) Iteration 2: i = 1. bit[i] = 0. We increment i by 1.
4) Iteration 3: i = 2. bit[i] = 0. We increment i by 1.
5) Iteration 4: i = 3. bit[i] = 1. We increment i by 2.
6) Iteration 5: i = 5. bit[i] = 1. We increment i by 2.
7) Iteration 6: i = 7. bit[i] = 1. We increment i by 2.
8) i (9) is no longer less than bits.length (9) so the loop breaks.
9) The last bit[i] was 1, so the sequence does not end with a 1-bit character, we return false.
*/

function isLastCharOneBit(bits) {  
  let i = 0;
  let bit;
  
  while (i < bits.length) {
    bit = bits[i];
    
    if (bit == 1) {
      i += 2;
    } else {
      i += 1;
    }
  }

  return bit === 0;
}
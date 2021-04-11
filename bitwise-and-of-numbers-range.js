/*
Leetcode. 12/03/2021. Given two integers left and right that represent a range, return the bitwise AND of all numbers in this range,
inclusive.


____BITWISE AND_____

A bitwise AND is a binary operation that takes two equal length binary representations and performs the logical AND operation on each pair
of the corresponding bits, which is the equivalent of multiplying them. If both bits in the compared position are 1, the resultant bit is
1, otherwise, the resultant bit is 0. 

5 AND 6:
5 = 00000101
6 = 00000110
R = 00000100 = 4

6 AND 7:
6 = 00000110
7 = 00000111
R = 00000100 = 4

____BITWISE SHIFT____

A bitwise shift shifts all the bits in a binary number to the left (<<) or right (>>).

7 (0111) << 3 = 0111000 === 8 + 16 + 32 = 56
7 (0111) >> 3 = 0000 === 0

In general, shifting to the left by k, multiplies that number by 2 ** k, this is because each 1 bit represents a power of 2, then when
shifted to the left, it represents a larger power of 2, larger by k. Essentially, x << k === x * 2 ** k.

7 << 3 = 56
7 * (2 ** 3) = 7 * 8 = 56

7 = 0111 = (2 ** 2) + (2 ** 1) + (2 ** 0) = 4 + 2 + 1
7 << 3 = 56 = 0111000 = (2 ** 5) + (2 ** 4) + (2 ** 3) = 32 + 16 + 8

When shifting to the right, the last k bits are cut out. In general, shifting to the right by k, divides x by 2 ** k i.e.
x >> k === Math.floor(x / (2 ** k)).

13 (1101) >> 2 = 0011 = 3
13 / 2 ** 2 = 13 / 4 = 3.25 = 3

____FINDING 1 BITS____ 

We can combine bitwise left shift and bitwise AND to find the position of each 1 bit in the binary representation of a number. This is 
because 1 << k will always return a binary number with only a single 1 bit and this 1 bit will be in the position that represents 2 ** k.
Or in other words, from right to left of the binary number, it will be in index position k. When we then do n & (1 << k), the only place 
we can get two 1 bits in the corresponding positions, is in the position that represents 2 ** k. So if we can know whether we get a 1 bit
or a 0 bit in position k of n's binary representation, using this formula. This method is illustrated with the examples below and
implemented with the oneBitOf function.

1 << 1 = 10 = 2
1 << 2 = 100 = 4
1 << 3 = 1000 = 8
1 << 4 = 10000 = 16
1 << 5 = 100000 = 32
1 << 6 = 1000000 = 64
1 << 7 = 10000000 = 128
1 << 8 = 100000000 = 256

If we want to find out whether there is a 1 bit in position 2 ** 1 (k = 1) of the binary representation of 36, we would do:

1) 100100 = 36
2) 000010 = 1 << 1 = 2
3) 000000 = 36 & 2

We can see that there is not a 1 bit at the bit which represents 2 ** 1 (i.e. position 1). If we wanted to see whether there is a 1 bit 
at the position where 2 ** 2 (k = 2) is represented we would do:

1) 100100 = 36
2) 000100 = 1 << 2 = 4
3) 000100 = 36 & 4

We can see that there is a 1 bit at the position which represents 2 ** 2 (k = 2) i.e. 4.

____Bitwise AND of Range____

The bitwise AND of all numbers in a given range m to n (inclusive) can be found in the common prefix between the binary representation
of the first number in the range (m) and the binary representation of the last number in the range (n). We can find the common prefix by
performing a bitwise AND operation on all the corresponding bits in m and n, or we can simply do a comparison. As long as both are 0 or both 
are 1, we keep doing so, but once we get a mismatch, we stop, as we have found the common prefix. We append zeros to the end of the common
prefix to get the relevant number of bits, then we convert this to decimal, and we have the bitwise AND of all numbers in the range. This
is illustrated with the examples below.

m = 5, n = 7 => 4
101 = 5
111 = 7
1 = common prefix = 100 = 4

m = 7, n = 12 => 0
0111 = 7
1000 = 8
1001 = 9
1010 = 10
1011 = 11
1100 = 12
0000 = R = 0

m = 16, n = 20 => 16
10000 = 16
10001 = 17
10010 = 18
10011 = 19
10100 = 20
10000 = R = 16
*/

/*
Here is a solution which builds the commonPrefix of m and n.
1) We first initialize an empty string commonPrefix, where we will store the common prefix between the binary representations of left
   and right.
2) We are working with 32 bit numbers, and we want to traverse from the most significant bit - the leftmost bit - to the least
   significant bit. So we create a for loop that starts at 31 and ends at 0. Remember, every bit in binary represents a power of 2
   and in a 32 bit number, that starts at 2 ** 0 (1) and finishes at 2 ** 31 (2147483648).
3) k represents the bit position i.e. 31 (32nd bit) and 0 (1st bit). For each k, we perform a bitwise left shift to give us a number
   where the only 1 bit will be in position k e.g. if k = 31, 1 << k = 2147483648 = 1000000000000000000000000000000.
4) We can then use 1 << k to check whether there is a 1 bit in position k in left and right using bitwise AND. In bitwise AND, we
   return 1 if there are corresponding 1 bits and 0 in all other cases. So for example, if k = 31 and left is 5, left1Bit will be
   0 because the bitwise AND will come out to 00000000000000000000000000000000.
5) left1Bit and right1Bit's exact return value is the bitwise AND of left/right and 1 << k. They will return a decimal number, which will
   be 0 if there is not a 1 bit at k. If there is a 1 bit at k, they will return the number this 1 bit represents i.e. the power of 2.
   For example, if k = 2, 1 << k = 4 = 100. When left or right is 5, 5 (101) & 4 (100) = 100 = 4.
6) Now, if the left1Bit and right1Bit are both 0 at position k, we append a 0 to commonPrefix.
7) If left1Bit and right1Bit are both not 0, we append a 1 to commonPrefix. Note that if this is ever the case, both left1Bit and
   right1Bit are the same, because we are checking the bit in position k.
8) In any other case, which will be when left1Bit and right1Bit are different, the previous bit was the end of the common prefix,
   so we break out of the for loop.
9) Now we have the common prefix between left and right's binary representations, we append zeros to create the 32 bit binary
   number that will be our answer.
10) In the case that there was a common prefix, we return the decimal representation of commonPrefix. In the case that there was no common
    prefix, we return 0. This is the bitwise AND of all the numbers in the range.
*/

function rangeBitwiseAnd(left, right) {
  let commonPrefix = '';
  
  for (let k = 31; k >= 0; k--) {
    let left1Bit = left & (1 << k);
    let right1Bit = right & (1 << k);
    
    if (!left1Bit && !right1Bit) {
      commonPrefix += '0';
    } else if (left1Bit && right1Bit) {
      commonPrefix += '1';
    } else {
      break;
    }
  }
  
  commonPrefix = commonPrefix.padEnd(32, '0');
  return commonPrefix ? parseInt(commonPrefix, 2) : 0;
}

/*
Here is a solution which instead of building the common prefix, increments the answer by the power of 2 that bit-k represents, when both
left and right have 1 bits at position k and we are still inside the common prefix.
*/

function rangeBitwiseAndX(left, right) {
  let answer = 0;
  
  for (let k = 31; k >= 0; k--) {
    let left1Bit = left & (1 << k);
    let right1Bit = right & (1 << k);
    
    if (left1Bit !== right1Bit) {
      break;
    }
    
    if (left1Bit && right1Bit) {
      answer += left1Bit;
    }
  }
  
  return answer;
}

/*
Here is a solution which instead of using bitwise shifts and bitwise AND, converts left and right to their 32 bit binary representations,
then does a simple equality check, incrementing the answer by the power of 2 the current bit represents, when both the left and right
bits are 1 and we are still inside the common prefix. Our iterator goes from 0..31, but because 0 will represent the bit that is 2 ** 31,
1 will represent the bit that is 2 ** 30 and so forth, we have to increment answer by 2 ** (31 - i).
*/

function rangeBitwiseAndXX(left, right) {
  left = left.toString(2).padStart(32, '0');
  right = right.toString(2).padStart(32, '0');

  let answer = 0;
  
  for (let i = 0; i < left.length; i++) {
    let leftBit = left[i];
    let rightBit = right[i];
    
    if (leftBit != rightBit) {
      break;
    }
    
    if (leftBit == 1 && rightBit == 1) {
      answer += 2 ** (31 - i);
    }
  }
  
  return answer;
}

/*
Here is a function which finds the position of all the 1 bits in the binary representation of a number n, and returns an array of
arrays where each sub-array contains the index position of the 1 bit and the power of 2 this index position represents.
*/

function oneBitsOf(n) {
  let powersOf2 = [];

  for (let k = 0; k <= 31; k++) {
    let powerOf2 = 1 << k;

    if (n & powerOf2) {
      powersOf2.push([k, powerOf2]);
    }
  }

  return powersOf2;
}
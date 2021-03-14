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
*/

function oneBitsOf(n) {
  let powersOf2 = [];

  for (let k = 0; k < 30; k++) {
    let powerOf2 = 1 << k;

    if (n & powerOf2) {
      powersOf2.push([powerOf2, k]);
    }
  }

  return powersOf2;
}
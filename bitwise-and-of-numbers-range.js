/*
Leetcode. 12/03/2021. Given two integers left and right that represent a range, return the bitwise AND of all numbers in this range,
inclusive.

Bitwise AND
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

Bitwise Shifts
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
*/

function rangeBitwiseAND(left, right) {

}
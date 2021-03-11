/*
11/03/2021. Leetcode. We are given an array of integers - nums - where every element appears twice apart from one. Find that single element
and do so in linear time complexity without using extra memory. 

Example Inputs/Outputs
[2, 1, 2] => 1
[4, 1, 2, 1, 2] => 4
[1] => 1

Here is the solution I developed to solve the challenge.
1) We first sort the array in order to make duplicates adjacent, so [4, 1, 2, 1, 2] will become [1, 1, 2, 2, 4].
2) We then create a for loop to traverse the array from start to end.
3) nums[i] represents the current element, nums[i - 1] the previous element and nums[i + 1] the next element.
4) If the previous element is different from the current element and the next element is different from the current element, we have found
   our single number, so we return it.
5) When i = 0, nums[i - 1] will be undefined. Likewise, when i = nums.length - 1, nums[i + 1] will be undefined. In those cases nums[i] will
   not be equal to undefined so our conditional will still work.
*/

function singleNumberMS(nums) {
  nums.sort((a,b) => a - b);
  
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1] && nums[i] !== nums[i + 1]) {
      return nums[i];
    }
  }
}

/*
Here is an even better solution, which uses bitwise XOR.

A bitwise XOR is a binary operation which takes two bit patterns of equal lengths and performs the logical exclusive OR operation on each
pair of corresponding bits. If the two bits are the same, the resultant bit is 0. If the two bits are different, the resultant bit is 1.
For example, 1 XOR 2 would be:

1 = 00000001
2 = 00000010
X = 00000011 = 3

The Algorithm
1) If we take the XOR of 0 and another number, it will return that number, for example:
   0 = 00000000
   7 = 00000111
   X = 00000111 = 7
2) If we XOR the two same numbers, it will return 0, for example:
   2 = 00000010
   2 = 00000010
   X = 00000000 = 0
3) a ^ b ^ a === (a ^ a) ^ b === 0 ^ b === b. In plain English, if you have 2 duplicates numbers and a single number in a sequence, in any
   order, XORing all of them cumulatively will produce a result that is equal to the single number. For example:
   1) 2 ^ 1 ^ 2
      2 = 00000010
      1 = 00000001
      X = 00000011 = 3
      2 = 00000010
      X = 00000001 = 1
   2) 2 ^ 2 ^ 1
      2 = 00000010
      2 = 00000010
      X = 00000000 = 0
      1 = 00000001
      X = 00000001 = 1
4) Bearing these rules in mind, as long as a sequence contains all elements that are repeated twice, and only one element that occurs once,
   all we need to do to find the single number in linear time complexity - without using extra memory - is XOR all the numbers
   cumulatively.
*/

function singleNumber(nums) {
  return nums.reduce((acc, v) => acc ^ v, 0);
}
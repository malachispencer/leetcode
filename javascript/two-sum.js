/*
Leetcode. 12/02/2021. Given an array of integers and a target integer, returns the indices of the two numbers in the array which will add
up to the target. Here is the solution I used, taken from a Codewars user the first time I solved 'Two Sum' (on Codewars).
1) We create an empty object called indexOf, which will store the index position of each number in the array.
2) We iterate over nums and in the indexOf object, we set the properties to the numbers and the keys to their index position. If there are
   duplicate numbers in the array, indexOf[num] will be the index position of the last appearance in the array, which suits our purposes
   perfectly.
3) We iterate over nums again, this time using a for loop.
4) For each number we are on in nums, we have a variable called otherNum, which is the target minus the number we are currently on in nums.
5) If otherNum exists as a property in indexOf, we simply return the current index position, and the index position of otherNum.
6) We don't need to make sure indexOf[otherNum] is not equal to i, because if there are duplicate values in the array, indexOf[otherNum]
   will always be the LAST index position of that number in the array.
7) We only need to check that otherNum exists as a property in the object.

Example 1: [15, 4, 3], 7 => [1, 2]
1) indexOf = { 15: 0, 4: 1, 3: 2 }.
2) Iteration 1: otherNum = 7 - 15 = -8. -8 is not included in indexOf so we move to the next iteration.
3) Iteration 2: otherNum = 7 - 4 = 3. 3 is included in indexOf and its value/index position is 2.
4) We return [1, 2].

Example 2: [3, 0, 1, 3], 6 => [0, 3]
1) indeOf = { 3: 3, 0: 1, 1: 2 }.
2) Iteration 1: otherNum = 6 - 3 = 3. 3 is included in indexOf and its value/index position is 3.
3) We return [0, 3].
*/

function twoSum(nums, target) {
  let indexOf = {};
  
  nums.forEach((num, i) => indexOf[num] = i);
  
  for (let i = 0; i < nums.length; i++) {
    let otherNum = target - nums[i];
    
    if (indexOf[otherNum]) {
      return [i, indexOf[otherNum]];
    }
  }
}

/*
Here is an ever so slight variation of the solution I originally developed when I solved this challenge on Codewars in June 2020.
1) We create a for loop which traverses the length of nums.
2) We create our otherNum variable, which on each iteration is the target minus the current number.
3) We simultaneously check that otherNum is included in nums and that its index position is not i. In the case where our input array is
   [3, 0, 1, 3], when i = 0 and otherNum = 3, nums.indexOf(otherNum) will return 0. So this case is only actually resolved when i gets to
   3, resulting in [3, 0] being returned as opposed to [0, 3] being returned like with the solution above.
4) Once we've found that otherNum is included in nums and is not the current index position, we return i and the index position of the
   first occurrence of otherNum.
*/

function twoSumMS(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    console.log(i)
    let otherNum = target - nums[i];

    if (![i, -1].includes(nums.indexOf(otherNum))) {
      return [i, nums.indexOf(otherNum)]
    }
  }
}
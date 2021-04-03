/*
Leetcode. 03/04/2021. Given an array of integers nums, move all 0s to the end of the array while preserving the order of the non-zero
integers. For example, [0,1,0,3,12] should become [1,3,12,0,0]. The array must be changed in-place. Here is the solution I developed to 
solve the challenge.
1) We first ascertain a count of how many zeroes there are in the array, which we will use as the break condition of our while loop.
2) We initialize a variable i, to keep track of the elements in nums.
3) We run our while loop as long as zeroCount is above 0, each time we encounter a zero, we will decrement zeroCount, this ensures that
   once we have moved all the zeros, we break out of the loop instead of continuing to traverse, which would result in us infinitely
   moving the zeros at the end.
4) We initialize a variable called zeros, where we will store the result of the splice.
5) If the nums[i] is 0, we use the splice method to remove that zero from the array. Splice returns an array of the removed elements, we
   store this in zeros.
6) zeros contains only one element, we pop that element and append it to nums.
7) Because we have just moved the current element to the end of the array, we need to ensure that i remains the same on the next iteration,
   otherwise we would skip an element. For example, if nums is [0, 1, 0, 3, 12], after iteration 1, it becomes [1, 0, 3, 12, 0]. If i
   were to simply be 1 on the next iteration, we would be evaluating 0 and skipping over the 1. Therefore inside our conditional we
   decrement i by 1, before it's incremented outside the conditional.
8) Inside our conditional, we also decrement zeroCount by 1.
9) Once zeroCount becomes zero, we have moved all the zeroes, so the loop is broken out of.
10) We return nums.

moveZerosMS([0,1,0,3,12])
1) zeroCount = 2.
2) Iteration 1: 
  - nums = [0, 1, 0, 3, 12]. i = 0. nums[i] = 0. 
  - We remove the 0, then push it to the end of nums. nums = [1, 0, 3, 12, 0]. 
  - i - 1 = -1. i + 1 = 0.
  - zeroCount - 1 = 1.
3) Iteration 2: 
  - nums = [1, 0, 3, 12, 0]. i = 0. nums[i] = 1. 
  - Not 0 so nums stays the same. 
  - i + 1 = 1.
4) Iteration 3:
   - nums = [1, 0, 3, 12, 0]. i = 1. nums[i] = 0.
   - We remove the 0, then push it to the end of nums. nums = [1, 3, 12, 0, 0].
   - i - 1 = 0. i + 1 = 1.
   - zeroCount - 1 = 0.
5) zeroCount is now 0, we have moved all the zeroes, so we break out of the loop.
6) We return nums, which is [1, 3, 12, 0, 0].
*/

function moveZeroesMS(nums) {
  let zeroCount = nums.filter(v => v === 0).length;
  let i = 0;
  
  while (zeroCount > 0) {
    let zeros;
    
    if (nums[i] === 0) {
      zeros = nums.splice(i, 1);
      nums.push(zeros.pop());
      i--;
      zeroCount--;
    }
    
    i++;
  }
  
  return nums;
}

/*
Here is an alternative solution, which uses a tracker, two for loops and moves the non-zero elements to the beginning of the array, rather
than moving the zero elements to the end of the array.
1) We first initialize a variable called nextIndex to 0, this variable will keep track of the index position the next non-zero element
   needs to be placed in.
2) Our first for loop traverses the entire length of the array. If the current element is not zero, we make the element at index position
   nextIndex, equal to the current element. We then increment nextIndex by 1. Because the next non-zero element we encounter will need to
   come after where we just placed the current element.
3) Once we finish this main for loop, all non zero elements have been moved to the front of the array, in-place, with their order preserved.
4) nextIndex will have finished that for loop one index position after the last non-zero element, now all elements from nextIndex to the
   end of the array, simply need to be converted to 0, in-place.
5) We return nums.

moveZeroes([0, 1, 0, 3, 12])
1) The following iterations pertain to the main (first) for loop.
2) Iteration 1:
   - nums = [0, 1, 0, 3, 12]. i = 0. nums[i] = 0. nextIndex = 0.
   - nums[i] is 0 so nothing happens.
3) Iteration 2:
   - nums = [0, 1, 0, 3, 12]. i = 1. nums[i] = 1. nextIndex = 0.
   - nums[nextIndex] = 1.
   - nextIndex + 1 = 1.
   - nums = [1, 1, 0, 3, 12].
4) Iteration 3:
   - nums = [1, 1, 0, 3, 12]. i = 2. nums[i] = 0. nextIndex = 1.
   - nothing happens.
5) Iteration 4:
   - nums = [1, 1, 0, 3, 12]. i = 3. nums[i] = 3. nextIndex = 1.
   - nums[nextIndex] = 3.
   - nextIndex + 1 = 2.
   - nums = [1, 3, 0, 3, 12].
6) Iteration 5:
   - nums = [1, 3, 0, 3, 12]. i = 4. nums[i] = 12. nextIndex = 2.
   - nums[nextIndex] = 12.
   - nextIndex + 1 = 3.
   - nums = [1, 3, 12, 3, 12].
7) Now all non zero elements have been moved to the beginning of the array, we turn all the elements from nextIndex (3) to the end of the
   array into 0.
8) We return nums, which is [1, 3, 12, 0, 0].
*/

function moveZeroes(nums) {
  let nextIndex = 0;
  
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[nextIndex] = nums[i];
      nextIndex++;
    }
  }
  
  for (let i = nextIndex; i < nums.length; i++) {
    nums[i] = 0;
  }

  return nums;
}
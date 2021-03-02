/*
Leetcode. 02/03/2021. Given an array of integers sorted in ascending order, find the starting and ending position of a given target value.
For example, nums = [5,7,7,8,8,10], target = 8 should return [3, 4]. If target is not found in the array, return [-1, -1]. Here is the
solution I developed to solve the challenge.
1) We initialize a variable called seen to false, which we will use to isolate the first occurrence of target.
2) We initialize variables firstSeen and lastSeen to -1, so if target is not found in the array, our return value for this case is already
   ready.
3) We iterate over nums using forEach and we also need the index positions in our callback.
4) If seen is false and num is equal to target, we have spotted target for the first time, so we set firstSeen equal to the current index
   position, we do the same with lastSeen, and we set seen to true.
5) In our else if, we check is seen is true and num is equal to target, then set lastSeen to the current index position if this is the case.
   This ensures that we get the correct last position of target.
6) We return firstSeen and lastSeen inside an array.
*/

function searchInRangeMS(nums, target) {
  let seen = false;
  let firstSeen = -1;
  let lastSeen = -1;
  
  nums.forEach((num, i) => {
    if (!seen && num === target) {
      firstSeen = i;
      lastSeen = i;
      seen = true
    } else if (seen && num === target) {
      lastSeen = i;
    }
  });
  
  return [firstSeen, lastSeen];
};
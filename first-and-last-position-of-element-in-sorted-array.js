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

/*
Here is a much more effecient solution using the binary search algorithm.
1) The binarySearch algorithm we have here is designed to find the lowest index position where an element is greater than or equal to the
   target value. So if nums = [5,7,7,8,8,10] and target = 6, our binarySearch function will return 1 because 7 is the lowest indexed
   element greater than or equal to 6, and arr[1] = 7.
2) So in our searchInRange function, we pass nums and the target into our binarySearch function and store the result in a variable
   firstSeen.
3) If the target does not exist in the array, nums[firstSeen] will not be equal to target, so we return [-1, -1].
4) If the target did exist in the array, we now have its first occurrence.
5) In order to find the last occurrence of target, we simply pass in nums to our binarySearch function again, but this time we set target
   equal to target + 1.
6) If for example nums = [2, 2, 3, 4, 5, 7, 7, 8, 8, 10] and target = 9, our binarySearch function will return the index position of 10,
   which is the lowest indexed position element that is greater than or equal to 9. Therefore, all we have to do from here is subtract
   1 from the index position returned from the binarySearch, and we will have the index position of the last occurrence of 8.
7) We return firstSeen and lastSeen inside an array.
8) Note, inside our binarySearch function, initializing firstSeen to the size of nums, allows to account for when target is at the end of
   the array, because in this case, lastSeen will always be the length of the array - 1.

binarySearch([2, 2, 3, 4, 5, 7, 7, 8, 8, 10], 8)
1) Iteration 1: 
   - start = 0. end = 9. mid = 4. 
   - searching in [2, 2, 3, 4, 5, 7, 7, 8, 8, 10]. 
   - nums[mid] = 5.
   - 5 is less than target, so we set start equal to mid + 1 i.e. we search in the higher half of this array.
   - firstSeen = 10 (the length of the array it was initialized to).
2) Iteration 2:
   - start 5. end = 9. mid = 7.
   - searching in [7, 7, 8, 8, 10].
   - nums[mid] = 8.
   - 8 is equal to target, so we set firstSeen to mid and because we the integers in the array are not unique, there could be another 8 at
     a lower index position, so we set end equal to mid - 1 to keep looking in the lower half of this array slice.
   - firstSeen = 7.
3) Iteration 3:
   - start = 5. end = 6. mid = 5.
   - searching in [7, 7].
   - nums[mid] = 7.
   - 7 is less than target, so we set start equal to mid + 1 to keep looking in the higher half of this sub-array.
   - firstSeen = 7.
4) Iteration 4:
   - start = 6. end = 6. mid = 6.
   - searching in [7].
   - nums[mid] = 7.
   - 7 is less than target, so we set start equal to mid + 1.
5) Now start is 7 but end is 6, so the loop is broken out of.
6) We return firstSeen, 8 is first seen at index position 7.

binarySearch([1], 1)
1) firstSeen starts off as 1, the length of the array.
2) Iteration 1:
   - start = 0. end = 0. mid = 0.
   - searching in [1].
   - nums[mid] = 1.
   - 1 is equal to target, so we set end equal to mid - 1 to search in the lower half of this array.
   - firstSeen = 0.
3) end is now -1 and start is 0, so the loop is broken out of.
4) firstSeen is returned, 1 is first seen at index position 0.

binarySearch([1], 2)
1) firstSeen starts off as 1, the length of the array.
2) Iteration 1:
   - start = 0. end = 0. mid = 0.
   - searching in [1].
   - nums[mid] = 1.
   - 1 is less than the target, so we want to search in the higher half of this array, so we set start equal to mid + 1.
   - firstSeen = 1.
3) start is now 1 and end is 0, so the loop is broken out of.
4) firstSeen is returned, 2 is not in the array, but we are really using this firstSeen variable to get the lastSeen of 1, and since 1 is
   the last element in the array, if 2 did exist in the array, it would come just after 1 and be in index position 1. So we subtract 1 from
   2's 'last seen' to give us the lastSeen of 1 (or any target which is at the end of the array). 
*/

function searchInRange(nums, target) {
  const firstSeen = binarySearch(nums, target);
  
  if (nums[firstSeen] !== target) { return [-1, -1]; }
  
  const lastSeen = binarySearch(nums, target + 1) - 1;

  return [firstSeen, lastSeen];
}

const binarySearch = (nums, target) => {
  let start = 0;
  let end = nums.length - 1;
  let firstSeen = nums.length;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    
    if (nums[mid] >= target) {
      firstSeen = mid;
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  
  return firstSeen;
}
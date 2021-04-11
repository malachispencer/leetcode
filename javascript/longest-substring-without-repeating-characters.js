/*
Leetcode. 11/02/2021.

The Challenge

Given a string, find the length of the longest substring without repeating characters.

Solution: The Sliding Window Algorithm

1) We create a variable called end, which will provide the index position for the character we compare with the substring.
2) We create a variable called max, which will be increased or stay the same every time a character is added to the current substring.
3) Our variable substring, begins as an empty string, but will be appended to if the current character at index position end, is not
   included in it, it will have its first character removed when the current character at index position end is included in it.
4) We create a while loop, which runs as long as end is less than the length of the string.
5) If the substring doesn't include the current character, we add that character to substring, then make max equal to whichever is greater
   of the current max, or the length of the new subtring.
6) If the substring does include the current character, we remove the first character from the substring.
7) Once our 'slider' has reached the end of the string, the loop finishes.
8) We return max, which holds the length of the longest substring.

Example: 'abcabcbb' => 3`

1) Iteration 1: end = 0. substring = ''. str[end] = 'a'. 'a' is added to substring and end is incremented. max = 1.
2) Iteration 2: end = 1. substring = 'a'. str[end] = 'b'. 'b' is added to subtring and end is incremented. max = 2.
3) Iteration 3: end = 2. subtring = 'ab'. str[end] = 'c'. 'c' is added to substring and end is incremented. max = 3.
4) Iteration 4: end = 3. substring = 'abc'. str[end] = 'a'. 'a' is removed from substring and end stays the same. max = 3.
5) Iteration 5: end = 3. substring = 'bc'. str[end] = 'a'. 'a' is added to substring and end is incremented. max = 3.
6) Iteration 6: end = 4. substring = 'bca'. str[end] = 'b'. 'b' is removed from substring and end stays the same. max = 3.
7) Iteration 7: end = 4. substring = 'ca'. str[end] = 'b'. 'b' is added to substring and end is incremented. max = 3.
8) Iteration 8: end = 5. substring = 'cab'. str[end] = 'c'. 'c' is removed from substring and end stays the same. max = 3.
9) Iteration 9: end = 5. substring = 'ab'. str[end] = 'c'. 'c' is added to substring and end is incremented. max = 3.
10) Iteration 10: end = 6. substring = 'abc'. str[end] = 'b'. 'a' is removed from substring and end stays the same. max = 3.
11) Iteration 11: end = 6. substring = 'bc'. str[end] = 'b'. 'b' is removed from substring and end stays the same. max = 3.
12) Iteration 12: end = 6. substring = 'c'. str[end] = 'b'. 'b' is added to substring and end is incremented. max = 3.
13) Iteration 13: end = 7. substring = 'cb'. str[end] = 'b'. 'c' is removed from substring and end stays the same. max = 3.
14) Iteration 14: end = 7. substring = 'b'. str[end] = 'b'. 'b' is removed from substring and end stays the same. max = 3.
15) Iteration 15: end = 7. substring = ''. str[end] = 'b'. 'b' is added to substring and end is incremented. max = 3.
16) end is now 8, which is not less than the length of the string, so the while loop is broken out of.
17) max, which is 3, is returned.
*/

function lengthOfLongestSubstring(str) {
  let end = 0;
  let max = 0;
  let substring = '';
  
  while (end < str.length) {
    if (!substring.includes(str[end])) {
      substring += str[end];
      max = Math.max(substring.length, max);
      end++
    } else {
      substring = substring.slice(1);
    }
  }
  
  return max;
}
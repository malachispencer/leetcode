/*
Leetcode. 11/02/2021. 

The Challenge

Write a function which returns the longest common prefix amongst an array of strings. If there is no common
prefix, return an empty string.

Solution using sorting algorithm

1) Sort the array of words in alphabetical order.
2) Compare the characters in the first and last words of the sorted array. Since the array is sorted, common characters among the
   first and last words will be common to all words in the array.
3) As one word might be shorter than the other, only iterate the length of the shorter word, out of the first and last word in
   the array.
4) When characters are common, append them to a prefix string.
5) As soon as non-common characters are found, break from the loop and return the prefix string.

The Code

1) If the array is empty, we return an empty string.
2) If the length of the array is 1, we return the sole word in the array.
3) In all other cases, we first sort the array. JavaScript's sort method sorts an array in-place, meaning it mutates the original
   array.
4) To make our code more readable, we store the length of the first and last word in variables.
5) We then use those variables to find the length of the shorter word between the first and last word.
6) We initialize a variable called prefix to an empty string, here we will append common characters.
7) We iterate the length of minWordLen using a for loop.
8) Inside the loop, we compare the ith character in the first word in the array, with the ith character in the last word in the
   array. If they are the same, we appened the character to prefix. If not, we break out of the for loop.
9) We return the prefix.

Example with LCP: ['geeksforgeeks', 'geeks', 'geek', 'geezer'] => 'gee'

1) Sorted Array: [ 'geek', 'geeks', 'geeksforgeeks', 'geezer' ].
2) minWordLen = 4.
3) Iteration 1: 'g' is compared with 'g'. prefix = 'g'.
2) Iteration 2: 'e' is compared with 'e'. prefix = 'ge'.
3) Iteration 3: 'e' is compared with 'e'. prefix = 'gee'
4) Iteration 4: 'k' is compared with 'z'. Loop is broken out of.
5) 'gee' is returned.

Example without LCP: ['dog','racecar', 'car', 'erth'] => ''

1) Sorted Array: ['car', 'dog', 'erth', 'racecar'].
2) minWordLen = 3.
3) Iteration 1: 'c' is compared with 'r'. Loop is broken out of.
4) '' is returned.
*/

function longestCommonPrefix(arr) {
  if (!arr.length) { return ''; }

  if (arr.length === 1) { return arr[0]; }

  arr.sort();

  const firstWordLen = arr[0].length;
  const lastWordLen = arr[arr.length - 1].length;
  const minWordLen = Math.min(firstWordLen, lastWordLen);
  let prefix = '';

  for (let i = 0; i < minWordLen; i++) {
    let currentCharInFirst = arr[0][i];
    let currentCharInLast = arr[arr.length - 1][i];

    if (currentCharInFirst === currentCharInLast) {
      prefix += currentCharInFirst;
    } else {
      break;
    }
  }

  return prefix;
}
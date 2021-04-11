/*
Leetcode. 14/02/2021. Given an array of strings, group the anagrams together in an array of arrays. An anagram is two words which contain
exactly the same letters e.g. 'iceman' and 'cinema'. Here is the solution I developed to solve the challenge.
1) We initialize an empty object called group, which we will use to group the anagrams.
2) We iterate over the array using a forEach loop.
3) On each iteration, we create a sorted version of the word, which we will use as the property in our object.
4) If the sorted version of the word does not exist as a property in the object, we set the value to an array containing the word.
5) If the sorted version of the current word does exist as a property in the object, we push the word into the array, which is the value
   of the object property.
6) Essentially, we group the words according to their sorted version.
7) Once our loop finishes, we simply call Object.values to return an array of the object values, which returns an array of arrays of the
   grouped anagrams.
8) This solutions works seamlessly for examples with ['a'] as input and even [''] as input.
*/

function groupAnagrams(arr) {
  let group = {};

  arr.forEach(word => {
    let sorted = [...word].sort().join('');

    if (!group[sorted]) {
      return group[sorted] = [word];
    } else {
      return group[sorted].push(word);
    }
  });

  return Object.values(group);
}
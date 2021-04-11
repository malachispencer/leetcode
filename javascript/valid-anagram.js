/*
Leetcode. 12/02/2021. Two words are an anagram of each other if they contain the same letters. For example 'anagram' and 'nagaram' are
anagrams. Here we create a function which takes two strings and determines whether they are an anagram of each other. Here is the solution 
I developed to solve the challenge.
1) With both strings, we convert them to an array of characters using the spread operator, sort them, and then join them back into a
   string.
2) We then compare them with the strict equality operator to see if they are equal, if so, they are anagrams, if not, they are not
   anagrams.
*/

function isAnagramMS(str1, str2) {
  return [...str1].sort().join('') === [...str2].sort().join('');
}

/*
Here is an alternative solution I developed, which uses the reduce function.
1) We first check if the two strings do not have the same length, if so, they are definitely not anagrams, so we return false.
2) For strings which are the same length, we can do a comparison using the reduce function.
3) We convert str1 to an array of characters using the spread operator, then we call reduce on it. We set str2 to the starting value of
   the accumulator.
4) As we traverse each character of str1, we remove the first occurrence of that character from the accumulator/str2 using the replace
   method.
5) What we essentially do here is remove every character in str1, from str2, if there are no characters left in the resultant string,
   we had an anagram.
*/

function isAnagramMSX(str1, str2) {
  if (str1.length !== str2.length) { return false; }

  const str1MinusStr2 = [...str1].reduce((string2, str1Char) => { 
    return string2.replace(str1Char, ''); 
  }, str2);
  
  return str1MinusStr2.length === 0;
}

/*
Here is another alternative solution I developed, which uses a for loop instead of reduce.
*/

function isAnagramMSXX(str1, str2) {
  if (str1.length === str2.length) { return false; }

  for (let i = 0; i < str1.length; i++) {
    str2 = str2.replace(str1[i], '');
  }

  return !str2.length;
}
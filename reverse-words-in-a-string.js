/*
Leetcode. 12/02/2021. Here we create a function which reverses the words in a string. The input string may contain leading and/or trailing
whitespace and the output must not contain any leading or trailing whitespace. A word in a string is defined as a sequence of non-space
characters, some words may be seperated by more than one whitespace. The output string should have words seperated by only 1 space. Here is
the solution I developed to solve the challenge.
1) We first remove the leading and trailing whitespace from the string using the trim method.
2) We then split the string wherever there is one or more spaces, into an array of words/strings.
3) We reverse the words in the string.
4) Then we join the array of words back into a string, delimited by a single space.
*/

function reverseWordsMS(str) {
  return str.trim().split(/\s+/).reverse().join(' ');
}

/*
Here is an alternative solution I developed, which involves using a for loop and iterating backwards.
1) We create an array of words by trimming the string and splitting it wherever there is one or more spaces.
2) We initialize a string called reversed, where we will append each word, with a space at the end of it.
3) We create a for loop with an iterator variable that starts at the last element of the array and then decrements until it reaches the
   first element in the array.
4) As we traverse the array from the back to the front, we append each word, along with a space at the end of it, to reversed.
5) reversed will have all the words but also a space at the end of it, so we remove that space using the replace method and return the
   string.
*/

function reverseWordsMSX(str) {
  const arr = str.trim().split(/\s+/);
  let reversed = '';
  
  for (let i = arr.length - 1; i >= 0; i--) {
    let word = arr[i];
    reversed += `${word} `;
  }
  
  return reversed.replace(/\s$/, '');
}
  
/*
Leetcode. 13/02/2021. Given a non-empty array of words, return the k most frequent elements. The output should be an array of the words,
where the words are sorted by frequency from highest to lowest. If two words have the same frequency, the word that is lower alphabetically
should come first.

Example Inputs/Outputs
["i", "love", "leetcode", "i", "love", "coding"], k = 2 => [ 'i', 'love' ]
["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], k = 4 => [ 'the', 'is', 'sunny', 'day' ]
["i", "love", "leetcode", "i", "love", "coding"], 3 => [ 'i', 'love', 'coding' ]

Here is the solution I developed to solve the challenge.
1) We initialize an object, where we will store the count of each word in the array.
2) We iterate over the array of words and populate our object. The property is the word and the value is its frequency in the array.
3) We call Object.entries to convert the object into an array of arrays where each sub-array holds the property/word as its first
   element and the value/count as its second element.
4) We then call the sort method on this array of arrays.
5) For readability, we create variables to store the a and b elements of the two comparison sub-array, because we need custom sorting, we
   are using the sort method's compare function.
6) The compareFunction is a callback which sorts according to its return value, a number less than 0 means no change needs to be made
   between a/b b/a because they are already correctly sorted, a number greater than 0 means a change needs to be made i.e. they need to
   have their positions swapped, 0 means they are the same.
7) Our main sort criteria is that we want to sort by the frequencies, in descending order. So for this we do bFreq - aFreq. For example is
   bFreq is 4 and aFreq is 1, 4 - 1 = 3, this positive return value means a and b need to be swapped, so the sort function puts b before a.
8) In cases where two words have the same frequency, we need to sort according to the words' alphabetical order, so we actually handle
   this case first with a conditional. So when bFreq - aFreq = 0 (i.e. same frequency), we check whether aWord is less than bWord, if so,
   we return -1 because they are already in correct position i.e. a coming before b. When aWord is greater than bWord, we return 1, because
   a should come after b. When aWord and bWord are the same, we leave them as they are.
9) After we have sorted the countArr, we need to slice off the first k elements. Now we have an array of arrays with the most k frequent
   words and their count.
10) Finally, we map over the array of arrays and keep only the words.
11) We return the array of words.
*/

function mostFrequentWords(words, k) {
  countObj = {};

  words.forEach(word => { 
    return countObj[word] ? countObj[word]++ : countObj[word] = 1;
  });

  const countArr = Object.entries(countObj).sort((a, b) => {
    let aWord = a[0];
    let bWord = b[0];
    let aFreq = a[1];
    let bFreq = b[1];

    if (bFreq - aFreq === 0) {
      return aWord < bWord ? -1 : aWord > bWord ? 1 : 0; 
    } else {
      return bFreq - aFreq;
    }
  }).slice(0, k).map(pair => pair[0]);
  
  return countArr;
}
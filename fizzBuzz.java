import java.util.ArrayList;
import java.util.List;

/*
Leetcode. 12/04/2021. Here we create a FizzBuzz array. Here is the solution I developed to solve the challenge.
1) Inside our create method, we first create a List of strings, specifically, an ArrayList of strings. new ArrayList<>() takes the type
   specified before the variable.
2) We create our for loop from 1 up to and including n.
3) On each condition, we use the add() method from the List class to append to our List.
4) We return the fizzbuzz list.
5) Note, in order to convert a List to an Array, we can use the toArray() method. If we know our List contains all strings, we can do
   for example String[] result = create(15).toArray(new String[0]), leaving out "new String[0]" will not work when trying to store the
   conversion in a variable.
6) Originally, I convert the result of create() into an array to print it to the terminal. However, an ArrayList, unlike an Array, can be
   used inside System.out.println() without needing to be converted into a string, so this was not necessary.
*/

public class fizzBuzz {
  public static void main(String[] args) {
    //System.out.println(create());
  }

  public static List<String> create(int n) {
    List<String> fb = new ArrayList<>();
    
    for (int i = 1; i <= n; i++) {
      if (i % 5 == 0 && i % 3 == 0) {
        fb.add("FizzBuzz");
      } else if (i % 3 == 0) {
        fb.add("Fizz");
      } else if (i % 5 == 0) {
        fb.add("Buzz");
      } else {
        fb.add(Integer.toString(i));
      }
    }
    
    return fb;
  }
}
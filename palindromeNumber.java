import java.util.Objects;

/*
Leetcode. 11/04/2021. Here we create a function that returns whether a number is a palindrome. A palindrome is a number or word that is
exactly the same when reversed. Here is the solution I developed to solve the challenge.
1) All code in a Java program is enclosed in classes and the main method is the entry point of a Java Program, so we invoke our
   isPalindrome method from there.
2) isPalindrome takes an integer as an argument, the first thing we do is convert this integer to a string by using the Integer.toString()
   method and storing this in the string variable number.
3) We then take the length of number and store this in len, for convenience.
4) We find the mid point of the number by dividing its length in half and flooring the result. In JavaScript, Math.floor() returns an
   integer, but in Java it returns a double, thus we cast the result to an integer, and store it in the variable mid.
5) We then create a for loop, where we will iterate from the first digit up to the digit just before the middle digit. For example, if num
   is 12321, mid will be 2, we will only iterate 0 and 1 so we check 12. If num were 1221, mid would again be 2, and we would iterate 
   0 and 1 so we check 12.
6) A for loop in Java is exactly the same as in JavaScript.
7) Inside our for loop, we keep track of the leftmost digit and work our way inwards, and we also keep track of the rightmost digit and
   work our way inwards.
8) In Java, you cannot grab the character from a string using for example number[0], you have to use the charAt() method.
9) If, else and else if statements are exactly the same in Java as they are in JavaScript.
10) At any point in our for loop, if left and right are different, we return false because the number is definitely not a palindrome. 
11) In Java, there is no strict equality (===) operator like in JavaScript, only == and !=, which compare values when used with
    primitive data types.
12) If we made it out of our for loop without returning false, the number is a palindrome, so we return true.

isPalindromeX
1) We first convert the integer to a string.
2) We then pass the string number into our reverse function, which reverses a string by creating a StringBuilder object, appending each
   character to the StringBuilder object from right to left, then returning it in string format.
3) We then use the Object.equals() method to check whether the number and its reverse are the same.
4) In Java, Strings are not primitive data types, they are reference types. Therefore, we cannot use the equality operator (==) to check
   whether two strings have the same value, as for reference types, the equality operator checks whether they are the exact same object
   i.e. stored at the same place in memory.
5) Instead, we use the equals() method, or even better, the Object.equals() method, because equals() will throw an exception is comparing
   strings that contain null, whereas Object.equals() won't.
*/


public class palindromeNumber {
  public static void main(String[] args) {
    //System.out.println(isPalindrome());
    //System.out.println(isPalindromeX());
  }

  public static boolean isPalindrome(int num) {
    String number = Integer.toString(num);
    int len = number.length();
    int mid = (int)Math.floor(len / 2);
    
    for (int i = 0; i < mid; i++) {
      char left = number.charAt(i);
      char right = number.charAt(len - 1 - i);
      
      if (left != right) {
        return false;
      }
    }

    return true;
  }

  public static boolean isPalindromeX(int num) {
    String number = Integer.toString(num);
    String reversed = reverse(number);
    return Objects.equals(number, reversed);
  }

  public static String reverse(String str) {
    StringBuilder reversed = new StringBuilder();
    
    for (int i = str.length() - 1; i >= 0; i--) {
      reversed.append(str.charAt(i));
    }
    
    return reversed.toString();
  }
}
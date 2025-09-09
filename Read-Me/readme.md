1. What is the difference between var, let, and const?

Ans: var → We can function scoped, re-declare & re-assign.
     let → We can block scoped, re-assign , but can't re-declare.
     const → block scoped, cannot be re-declared or re-assigned.

2. What is the difference between map(), forEach(), and filter()?

Ans: map() → returns a new array.
     forEach() → executes a function for each item, returns nothing.
     filter() → returns a new array with elements that match a condition.

3. What are arrow functions in ES6?

Ans: Shorter syntax for functions, this is lexically bound (from surrounding context).
     Example: const add = (a, b) => a + b; 

4. How does destructuring assignment work in ES6?

Ans: Extract values from arrays or objects into variables.
     Example:
     const [x, y] = [10, 20];
     const {name, age} = {name: "Mahmud", age: 22};  

5. Explain template literals in ES6. How are they different from string concatenation?

Ans: Written with backticks (`).
     Supports embedding variables and expressions with ${}.
     Example:
     const name = "Mahmud";
     console.log(`Hello, ${name}!`);
     Difference → Easier and cleaner than + string concatenation.                 


# HyperCode (Say)

An English-like programming language designed to be readable, intuitive, and fun. HyperCode uses natural language keywords — you `put` values `into` variables, `show` output, `ask` for input, define `kind`s (classes), and `send` messages to objects.

Files use the `.say` extension and run with the `say` CLI.

## Quick Start

```bash
npm install
npm run build
```

Run a program:

```bash
say examples/hello.say
```

Start the interactive REPL:

```bash
say repl
```

Run tests inside a `.say` file:

```bash
say test myfile.say
```

## Hello World

```say
put ask What is your name into name
show Hello .name, welcome to HyperCode!
```

## Language Guide

### Variables

Use `put VALUE into NAME` to store values. Variable names are plain identifiers.

```say
put 42 into age
put Hello World into greeting
put true into active
put nothing into empty
```

### Data Types

| Type | Examples | Notes |
|------|----------|-------|
| Number | `42`, `3.14`, `-5` | Integers and decimals |
| Text | `Hello`, `Some words` | Unquoted strings |
| Boolean | `true`, `false` | |
| Nothing | `nothing` | Null value |
| List | `list 1, 2, 3` | Ordered collection |

### Output

`show` prints to the console. Use `.variable` for interpolation and `(expression)` for inline math.

```say
put 10 into x
put 20 into y
show The value of x is .x
show The sum is (x + y)
```

### Input

`ask` prompts the user and stores the answer in `it`.

```say
put ask What is your name into name
show Hello .name

ask How old are you
put it into age
show You are .age years old
```

### Comments

```say
-- This is a single-line comment

---
This is a
multi-line comment
---
```

### Arithmetic

```say
put 10 + 3 into sum        -- 13
put 10 - 3 into diff       -- 7
put 10 * 3 into product    -- 30
put 10 / 3 into quotient   -- 3.333...
put 10 % 3 into remainder  -- 1
put 2 ^ 8 into power       -- 256
put (3 + 4) * 2 into grouped -- 14
```

### Comparison

Symbolic and English-style comparisons are both supported.

```say
-- Symbolic
if x == 10 ... end
if x != 10 ... end
if x > 10  ... end
if x < 10  ... end
if x >= 10 ... end
if x <= 10 ... end

-- English
if x is 10 ... end
if x is not 10 ... end
if x is greater than 10 ... end
if x is less than 10 ... end
```

### Logic

```say
if x > 0 and x < 100
  show In range
end

if name is Alice or name is Bob
  show Welcome back
end

if not active
  show Inactive
end
```

### Conditionals

```say
put 85 into score

if score >= 90
  show Grade: A
else if score >= 80
  show Grade: B
else if score >= 70
  show Grade: C
else
  show Grade: F
end
```

### Loops

**Repeat N times:**

```say
repeat 5 times
  show Hello!
end
```

**While / Until:**

```say
put 1 into n
repeat while n <= 10
  show .n
  put n + 1 into n
end

put 0 into count
repeat until count == 5
  put count + 1 into count
end
```

**Forever (with stop):**

```say
put 0 into n
repeat forever
  put n + 1 into n
  if n > 10
    stop
  end
end
```

**For each:**

```say
put list Red, Green, Blue into colors
for each color in colors
  show .color
end
```

**Ranges:**

```say
for each i in 1 to 10
  show .i
end
```

### Lists

Create lists with the `list` keyword.

```say
put list 10, 50, 80, 90, 30 into scores
```

**Built-in properties:**

| Property | Description |
|----------|-------------|
| `.first` | First item |
| `.last` | Last item |
| `.count` | Number of items |
| `.sum` | Sum of all numbers |
| `.average` | Average of all numbers |
| `.max` | Largest number |
| `.min` | Smallest number |

```say
put list 10, 20, 30, 40, 50 into nums
show First is (.nums.first)
show Last is (.nums.last)
show Count is (.nums.count)
show Sum is (.nums.sum)
show Average is (.nums.average)
```

**Modify lists:**

```say
add 60 to nums
remove 10 from nums
sort nums
reverse nums
shuffle nums
```

**Filter with `where`:**

```say
put list 92, 45, 78, 55, 88 into scores
put scores where it >= 70 into passing
show .passing
```

**Transform with `each`:**

```say
put list 1, 2, 3, 4, 5 into nums
put nums each it * 10 into scaled
show .scaled
```

**Check membership:**

```say
if scores contains 100
  show Perfect score found!
end
```

### Kinds (Classes)

Define object types with `kind`. Fields use `is` for default values. Methods use `on`.

```say
kind Dog
  name is Unknown
  energy is 100

  on bark
    show .me.name says Woof!
  end

  on run
    put me.energy - 10 into me.energy
    show .me.name runs! Energy: .me.energy
  end
end

make a Dog called rex with name Rex
send bark to rex
send run to rex
send run to rex
```

### Inheritance

Use `from` to inherit fields and methods from a parent kind.

```say
kind Animal
  name is Unknown
  sound is ...
  legs is 4

  on speak
    show .me.name says .me.sound
  end
end

kind Dog from Animal
  sound is Woof
  tricks is 0

  on learn
    put me.tricks + 1 into me.tricks
    show .me.name learned trick number .me.tricks
  end
end

kind Bird from Animal
  sound is Tweet
  legs is 2
end

make a Dog called rex with name Rex
make a Bird called tweety with name Tweety

send speak to rex
send speak to tweety
send learn to rex
```

### Methods with Parameters

`on` handlers accept parameters after the method name.

```say
kind Calculator
  result is 0

  on add n
    put me.result + n into me.result
  end

  on reset
    put 0 into me.result
  end
end

make a Calculator called calc
send add 10 to calc
send add 25 to calc
show (.calc.result)
```

### Commands (Functions)

Define reusable functions with `command`. Use `and` to separate multiple parameters.

```say
command greet someone
  show Hello .someone
end

greet World

command add a and b
  return a + b
end

put add 10 and 25 into result
show .result
```

### String Properties

```say
put hello world into text
show (.text.upper)
show (.text.lower)
show (.text.length)
show (.text.trim)
```

### String Interpolation

Use `.variable` anywhere in `show` to insert a value. Use `.object.property` for nested access. Use `(expression)` for computed values.

```say
put HyperCode into lang
put 2026 into year
show .lang was created in .year
show That was (2026 - year) years ago
```

### Error Handling

**Basic try/or:**

```say
try
  make a Unicorn called sparkle
or
  show Caught: Unicorn kind does not exist
end
```

**Try/catch with error variable:**

```say
try
  send fly to nothing
catch err
  show Error: (.err.message)
end

show Program continues after errors
```

### Testing

Define tests with `test` blocks and assertions with `check`.

```say
command double n
  return n + n
end

test double works
  put double 5 into result
  check result == 10
end

test lists have correct count
  put list 1, 2, 3 into nums
  check nums.count == 3
end
```

Run with:

```bash
say test myfile.say
```

Output:

```
  PASS  double works
  PASS  lists have correct count

2 passed, 0 failed, 2 total
```

### Inspect and Explain

Use `explain` for detailed info about a value. Use `?` for a quick inspection.

```say
kind Cat
  name is Unknown
  lives is 9
end

make a Cat called whiskers with name Whiskers
explain whiskers
-- Output: Cat with name: Whiskers, lives: 9
-- Output: Can: (list of methods)
```

### The `it` Variable

`it` holds the last input value or the current item in `where`/`each` expressions.

```say
ask What is your favorite color
show You said .it

put list 1, 2, 3, 4, 5 into nums
put nums where it > 3 into big
put nums each it * 2 into doubled
```

### The `me` Keyword

Inside an `on` handler, `me` refers to the current instance.

```say
kind Counter
  value is 0

  on increment
    put me.value + 1 into me.value
  end

  on report
    show Count is .me.value
  end
end
```

## Examples

### Fibonacci Sequence

```say
put 0 into a
put 1 into b
put list a, b into fibs

repeat 13 times
  put a + b into temp
  put b into a
  put temp into b
  add b to fibs
end

show Fibonacci sequence:
for each n in fibs
  show .n
end

show Sum: (.fibs.sum)
show Count: (.fibs.count)
show Max: (.fibs.max)
```

Output:

```
Fibonacci sequence
0
1
1
2
3
5
8
13
21
34
55
89
144
233
377
Sum 986
Count 15
Max 377
```

### Grade Report with List Operations

```say
put list 92, 87, 45, 78, 95, 63, 88, 71, 55, 100 into scores

show All scores: .scores
show Average: (.scores.average)
show Highest: (.scores.max)
show Lowest: (.scores.min)

put scores where it >= 70 into passing
put scores where it < 70 into failing

show Passing scores: .passing
show Failing scores: .failing
show Pass rate: (.passing.count) out of (.scores.count)

put scores each it / 2 into halved
show Halved: .halved

sort scores
show Sorted: .scores

reverse scores
show Descending: .scores

if scores contains 100
  show Someone got a perfect score!
end
```

Output:

```
All scores 92, 87, 45, 78, 95, 63, 88, 71, 55, 100
Average 77.4
Highest 100
Lowest 45
Passing scores 92, 87, 78, 95, 88, 71, 100
Failing scores 45, 63, 55
Pass rate 7 out of 10
Halved 46, 43.5, 22.5, 39, 47.5, 31.5, 44, 35.5, 27.5, 50
Sorted 45, 55, 63, 71, 78, 87, 88, 92, 95, 100
Descending 100, 95, 92, 88, 87, 78, 71, 63, 55, 45
Someone got a perfect score!
```

### Zoo with Inheritance

```say
kind Animal
  name is Unknown
  sound is ...
  legs is 4

  on speak
    show .me.name says .me.sound
  end

  on describe
    show .me.name has .me.legs legs
  end
end

kind Dog from Animal
  sound is Woof
  tricks is 0

  on learn
    put me.tricks + 1 into me.tricks
    show .me.name learned trick number .me.tricks
  end
end

kind Bird from Animal
  sound is Tweet
  legs is 2
end

make a Dog called rex with name Rex
make a Dog called luna with name Luna, tricks 3
make a Bird called tweety with name Tweety

put list rex, luna, tweety into animals

show Zoo Roll Call
for each a in animals
  send speak to a
  send describe to a
end

send learn to rex
send learn to rex
show Luna already knows (.luna.tricks) tricks
```

Output:

```
Zoo Roll Call
Rex says Woof
Rex has 4 legs
Luna says Woof
Luna has 4 legs
Tweety says Tweet
Tweety has 2 legs
Rex learned trick number 1
Rex learned trick number 2
Luna already knows 3 tricks
```

### To-Do List Manager

```say
kind Task
  title is Untitled
  done is false

  on finish
    put true into me.done
  end

  on status
    if me.done
      show DONE .me.title
    else
      show TODO .me.title
    end
  end
end

make a Task called t1 with title Buy groceries
make a Task called t2 with title Walk the dog
make a Task called t3 with title Write HyperCode
make a Task called t4 with title Do homework

put list t1, t2, t3, t4 into tasks

send finish to t1
send finish to t3

show Task List
for each t in tasks
  send status to t
end

put tasks where it.done == true into completed
put tasks where it.done == false into remaining

show Completed: (.completed.count)
show Remaining: (.remaining.count)
```

Output:

```
Task List
DONE Buy groceries
TODO Walk the dog
DONE Write HyperCode
TODO Do homework
Completed 2
Remaining 2
```

### Calculator with Commands

```say
command add a and b
  return a + b
end

command multiply a and b
  return a * b
end

command power base and exp
  put 1 into result
  repeat exp times
    put result * base into result
  end
  return result
end

command clamp value and low and high
  if value < low
    return low
  end
  if value > high
    return high
  end
  return value
end

put add 10 and 25 into sum
show 10 + 25 = .sum

put multiply 6 and 7 into product
show 6 x 7 = .product

put power 2 and 10 into big
show 2^10 = .big

put clamp 150 and 0 and 100 into c1
show Clamp 150 to 0-100: .c1

put -20 into neg
put clamp neg and 0 and 100 into c2
show Clamp -20 to 0-100: .c2

put 17 % 5 into remainder
show 17 mod 5 = .remainder

put (3 + 4) * 2 into grouped
show Grouped math = .grouped
```

Output:

```
10 + 25 = 35
6 x 7 = 42
2 ^ 10 = 1024
Clamp 150 to 0 - 100 100
Clamp - 20 to 0 - 100 0
17 mod 5 = 2
Grouped math = 14
```

### Error Handling

```say
try
  make a Unicorn called sparkle
or
  show Caught an error! Unicorn kind does not exist.
end

try
  send fly to nothing
catch err
  show Error caught: (.err.message)
end

show Program continues running after errors!

try
  show Starting risky operation...
  try
    make a Ghost called casper
  or
    show Inner catch: Ghost kind does not exist either
  end
  show Outer block continues
or
  show This won't run because inner try handled it
end

show All done!
```

Output:

```
Caught an error! Unicorn kind does not exist.
Error caught Cannot send message to non-instance: nothing
Program continues running after errors!
Starting risky operation...
Inner catch Ghost kind does not exist either
Outer block continues
All done!
```

### Interactive Quiz

```say
kind Question
  text is Empty
  answer is Empty

  on check guess
    if guess == me.answer
      show Correct!
      return true
    else
      show Wrong. The answer was .me.answer
      return false
    end
  end
end

put 0 into score
put 0 into total

put list into questions
  make a Question with text What planet is closest to the sun, answer Mercury
  make a Question with text What language is this, answer HyperCode
  make a Question with text How many legs does a spider have, answer 8
end

for each q in questions
  ask .q.text
  put it into guess
  put total + 1 into total
  if send check guess to q
    put score + 1 into score
  end
end

show You got .score out of .total
```

## Architecture

The interpreter has three stages:

```
Source Code → Lexer → Tokens → Parser → AST → Interpreter → Output
```

| Component | File | Role |
|-----------|------|------|
| Lexer | `src/lexer.ts` | Tokenizes source text into tokens |
| Parser | `src/parser.ts` | Builds an Abstract Syntax Tree from tokens |
| Interpreter | `src/interpreter.ts` | Walks the AST and executes the program |
| AST | `src/ast.ts` | Type definitions for all AST nodes |
| Tokens | `src/tokens.ts` | Token types and keyword mappings |
| CLI | `src/cli.ts` | Command-line interface and REPL |

## Using as a Library

```typescript
import { Lexer, Parser, Interpreter } from 'hypercode';

const source = `
put 10 into x
show .x
`;

const lexer = new Lexer(source);
const tokens = lexer.tokenize();
const parser = new Parser();
const program = parser.parse(tokens);

const interpreter = new Interpreter({
  output: (text) => console.log(text),
  input: (prompt) => 'user input here',
  maxIterations: 100000,
});

await interpreter.run(program);
```

## Running Tests

```bash
npm test
```

## Keyword Reference

### Core Verbs

| Keyword | Usage | Description |
|---------|-------|-------------|
| `put` | `put VALUE into NAME` | Assign a value to a variable |
| `show` | `show TEXT` | Print output |
| `ask` | `ask PROMPT` | Get user input (stored in `it`) |
| `make` | `make a KIND called NAME` | Create an instance |
| `send` | `send METHOD to TARGET` | Call a method on an instance |
| `add` | `add VALUE to LIST` | Append to a list |
| `remove` | `remove VALUE from LIST` | Remove from a list |

### Structure

| Keyword | Usage | Description |
|---------|-------|-------------|
| `kind` | `kind NAME ... end` | Define a class |
| `from` | `kind Child from Parent` | Inherit from a parent kind |
| `on` | `on METHOD ... end` | Define a method |
| `command` | `command NAME PARAMS ... end` | Define a function |
| `return` | `return VALUE` | Return a value |
| `end` | `end` | Close any block |
| `me` | `me.property` | Reference to the current instance |
| `it` | `it` | Last input or current iteration item |
| `with` | `make a X called Y with ...` | Set properties inline |

### Control Flow

| Keyword | Usage | Description |
|---------|-------|-------------|
| `if` | `if COND ... end` | Conditional |
| `else` | `else ... end` | Alternative branch |
| `else if` | `else if COND ... end` | Chained conditional |
| `repeat` | `repeat N times ... end` | Fixed loop |
| `while` | `repeat while COND ... end` | Conditional loop |
| `until` | `repeat until COND ... end` | Inverse conditional loop |
| `forever` | `repeat forever ... end` | Infinite loop |
| `for each` | `for each X in LIST ... end` | Iteration |
| `to` | `1 to 10` | Range expression |
| `stop` | `stop` | Break out of a loop |

### Lists

| Keyword | Usage | Description |
|---------|-------|-------------|
| `list` | `list 1, 2, 3` | Create a list |
| `sort` | `sort LIST` | Sort in place |
| `reverse` | `reverse LIST` | Reverse in place |
| `shuffle` | `shuffle LIST` | Randomize order |
| `contains` | `LIST contains VALUE` | Check membership |
| `where` | `LIST where COND` | Filter items |
| `each` | `LIST each TRANSFORM` | Map/transform items |

### Error Handling

| Keyword | Usage | Description |
|---------|-------|-------------|
| `try` | `try ... end` | Begin error handling block |
| `or` | `or ... end` | Catch block (no variable) |
| `catch` | `catch VAR ... end` | Catch block with error |

### Testing

| Keyword | Usage | Description |
|---------|-------|-------------|
| `test` | `test NAME ... end` | Define a test block |
| `check` | `check EXPRESSION` | Assert a condition is true |

### Debugging

| Keyword | Usage | Description |
|---------|-------|-------------|
| `explain` | `explain TARGET` | Show detailed info about a value |
| `?` | `value?` | Quick inspect |

## Operator Precedence (Highest to Lowest)

1. Parentheses, literals, property access
2. Unary (`-`, `not`)
3. Exponent (`^`)
4. Multiplication (`*`, `/`, `%`)
5. Addition (`+`, `-`)
6. Comparison (`==`, `!=`, `>`, `<`, `>=`, `<=`, `is`, `is not`)
7. `contains`
8. `where`, `each`
9. `and`
10. `or`

## License

ISC

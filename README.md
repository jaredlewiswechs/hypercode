# HyperCode (Say)

An English-like programming language designed to be readable, intuitive, and fun. HyperCode uses natural language keywords — you `put` text `into` variables, `set` variables `to` expressions, `show` output, `ask` for input, define `kind`s (classes), and `send` messages to objects.

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

HyperCode has two ways to store values:

- **`put VALUE into NAME`** — stores literal text or numbers as-is (no math evaluation)
- **`set NAME to EXPRESSION`** — evaluates an expression and stores the result

```say
-- put is for literal values
put 42 into age
put Hello World into greeting
put true into active
put nothing into empty

-- set is for expressions and computed values
set total to price * quantity
set doubled to n * 2
set result to add 5 and 3
```

Use `put` when you have a plain value. Use `set` when you need math, function calls, or any computation.

### Data Types

| Type | Examples | Notes |
|------|----------|-------|
| Number | `42`, `3.14`, `-5` | Integers and decimals |
| Text | `Hello`, `"with spaces"` | Unquoted or quoted strings |
| Boolean | `true`, `false` | |
| Nothing | `nothing` | Null value |
| List | `list 1, 2, 3` | Ordered collection |
| Map | `map` | Key-value dictionary |

### Strings

Strings can be unquoted (in `put` and `show`) or quoted with double quotes (in `set` and expressions).

```say
put Hello World into greeting
set name to "Alice"
set message to "She said \"hello\""
```

**String concatenation** with `+`:

```say
set full to first + " " + last
show (.full)
```

**String properties:**

```say
put hello world into text
show (.text.upper)       -- HELLO WORLD
show (.text.lower)       -- hello world
show (.text.length)      -- 11
show (.text.trim)        -- hello world
show (.text.first)       -- h
show (.text.last)        -- d
```

**String indexing:**

```say
set letter to text.at 3       -- l (1-based)
set part to text.from 1 to 5  -- hello
```

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
set sum to 10 + 3          -- 13
set diff to 10 - 3         -- 7
set product to 10 * 3      -- 30
set quotient to 10 / 3     -- 3.333...
set remainder to 10 % 3    -- 1
set power to 2 ^ 8         -- 256
set grouped to (3 + 4) * 2 -- 14
```

### Math Builtins

Access math functions through the `math` module:

```say
set x to math.round 3.7      -- 4
set x to math.floor 3.7      -- 3
set x to math.ceil 3.2       -- 4
set x to math.abs (-5)       -- 5
set x to math.sqrt 16        -- 4
```

### Random

Generate random values:

```say
-- Random integer in a range (inclusive)
set roll to random 1 to 6

-- Random pick from a list
set color to random pick from colors

-- Random decimal between 0 and 1
set chance to random float
```

### Formatted Numbers

Round numbers to a specific number of decimal places:

```say
set pi to 3.14159
set short to pi rounded to 2    -- 3.14
show Pi is approximately (pi rounded to 3)
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

### Type Checking

Check the type of a value at runtime:

```say
if x is a number
  show x is a number
end

if name is a text
  show name is text
end

if items is a list
  show items is a list
end

if x is not a boolean
  show x is not a boolean
end
```

Supported types: `number`, `text`, `list`, `map`, `boolean`, `nothing`.

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

### When Blocks (Pattern Matching)

Match a value against multiple cases:

```say
set day to "Monday"

when day
is Monday
  show Start of the work week
is Friday
  show Almost the weekend!
is Saturday
  show Weekend!
is Sunday
  show Weekend!
else
  show Regular day
end
```

### Loops

**Repeat N times:**

```say
repeat 5 times
  show Hello!
end
```

**Repeat with counter:**

```say
repeat 5 times with i
  show Iteration .i
end
-- i goes from 1 to 5
```

**While / Until:**

```say
put 1 into n
repeat while n <= 10
  show .n
  set n to n + 1
end

put 0 into count
repeat until count == 5
  set count to count + 1
end
```

**Forever (with stop):**

```say
put 0 into n
repeat forever
  set n to n + 1
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

**For each with index:**

```say
for each item at i in items
  show Item .i is .item
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
set passing to scores where it >= 70
show .passing
```

**Transform with `each`:**

```say
put list 1, 2, 3, 4, 5 into nums
set scaled to nums each it * 10
show .scaled
```

**Check membership:**

```say
if scores contains 100
  show Perfect score found!
end
```

### Maps (Dictionaries)

Create key-value stores with `map`:

```say
set data to map
set data.name to "Alice"
set data.age to 30
show (.data.name) is (.data.age) years old
```

**Map properties:**

| Property | Description |
|----------|-------------|
| `.count` | Number of entries |
| `.keys` | List of all keys |
| `.values` | List of all values |

```say
show Keys: (.data.keys)
show Count: (.data.count)
```

**Check and remove entries:**

```say
if data contains "name"
  show Has a name
end

remove "age" from data
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
    set me.energy to me.energy - 10
    show .me.name runs! Energy: .me.energy
  end
end

make a Dog called rex with name Rex
send bark to rex
send run to rex
```

### Inheritance

Use `from` to inherit fields and methods from a parent kind.

```say
kind Animal
  name is Unknown
  sound is ...

  on speak
    show .me.name says .me.sound
  end
end

kind Dog from Animal
  sound is Woof
  tricks is 0

  on learn
    set me.tricks to me.tricks + 1
    show .me.name learned trick number .me.tricks
  end
end

make a Dog called rex with name Rex
send speak to rex
send learn to rex
```

### Methods with Parameters

`on` handlers accept parameters after the method name.

```say
kind Calculator
  result is 0

  on add n
    set me.result to me.result + n
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

set result to add 10 and 25
show .result
```

### File I/O

Read and write files:

```say
-- Write to a file
write "output.txt" with "Hello, world!"

-- Append to a file
append "log.txt" with "New entry"

-- Read a file as text
set content to read "data.txt"

-- Read a file as a list of lines
set lines to read "data.txt" as list
```

### Imports

Import code from other `.say` files:

```say
use "helpers.say"
use "utils/math.say"
```

The imported file is executed, making its commands and kinds available.

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
  set result to double 5
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
```

### The `it` Variable

`it` holds the last input value or the current item in `where`/`each` expressions.

```say
ask What is your favorite color
show You said .it

put list 1, 2, 3, 4, 5 into nums
set big to nums where it > 3
set doubled to nums each it * 2
```

### The `me` Keyword

Inside an `on` handler, `me` refers to the current instance.

```say
kind Counter
  value is 0

  on increment
    set me.value to me.value + 1
  end

  on report
    show Count is .me.value
  end
end
```

## Examples

See the `examples/` directory for complete programs:

| File | Description |
|------|-------------|
| `hello.say` | Hello world with user input |
| `calculator.say` | Reusable math commands |
| `fibonacci.say` | Fibonacci sequence generation |
| `grades.say` | List filtering and statistics |
| `string_fun.say` | Text manipulation and loops |
| `guessing_game.say` | Number guessing with loops |
| `quiz.say` | Interactive quiz with kinds |
| `classroom.say` | Student reports with inheritance |
| `zoo.say` | Animal hierarchy with inheritance |
| `todo.say` | To-do list manager with kinds |
| `error_handling.say` | Try/catch error patterns |

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
set x to 10
show .x
`;

const lexer = new Lexer(source);
const tokens = lexer.tokenize();
const parser = new Parser();
const program = parser.parse(tokens);

const interpreter = new Interpreter({
  output: (text) => console.log(text),
  input: (prompt) => 'user input here',
  readFile: (path) => fs.readFileSync(path, 'utf-8'),
  writeFile: (path, content) => fs.writeFileSync(path, content, 'utf-8'),
  appendFile: (path, content) => fs.appendFileSync(path, content, 'utf-8'),
  maxIterations: 100000,
});

await interpreter.run(program);
```

## Running Tests

```bash
npm test
```

## Keyword Reference

### Assignment

| Keyword | Usage | Description |
|---------|-------|-------------|
| `put` | `put VALUE into NAME` | Store literal text/numbers (no evaluation) |
| `set` | `set NAME to EXPR` | Evaluate expression and store result |

### Core Verbs

| Keyword | Usage | Description |
|---------|-------|-------------|
| `show` | `show TEXT` | Print output |
| `ask` | `ask PROMPT` | Get user input (stored in `it`) |
| `make` | `make a KIND called NAME` | Create an instance |
| `send` | `send METHOD to TARGET` | Call a method on an instance |
| `add` | `add VALUE to LIST` | Append to a list |
| `remove` | `remove VALUE from LIST` | Remove from a list or map |

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
| `use` | `use "file.say"` | Import another file |

### Control Flow

| Keyword | Usage | Description |
|---------|-------|-------------|
| `if` | `if COND ... end` | Conditional |
| `else` | `else ... end` | Alternative branch |
| `else if` | `else if COND ... end` | Chained conditional |
| `when` | `when VALUE ... end` | Pattern matching |
| `repeat` | `repeat N times ... end` | Fixed loop |
| `while` | `repeat while COND ... end` | Conditional loop |
| `until` | `repeat until COND ... end` | Inverse conditional loop |
| `forever` | `repeat forever ... end` | Infinite loop |
| `for each` | `for each X in LIST ... end` | Iteration |
| `to` | `1 to 10` | Range expression |
| `stop` | `stop` | Break out of a loop |

### Data

| Keyword | Usage | Description |
|---------|-------|-------------|
| `list` | `list 1, 2, 3` | Create a list |
| `map` | `set x to map` | Create an empty map |
| `sort` | `sort LIST` | Sort in place |
| `reverse` | `reverse LIST` | Reverse in place |
| `shuffle` | `shuffle LIST` | Randomize order |
| `contains` | `LIST contains VALUE` | Check membership |
| `where` | `LIST where COND` | Filter items |
| `each` | `LIST each TRANSFORM` | Map/transform items |
| `random` | `random 1 to 6` | Generate random values |
| `rounded` | `x rounded to 2` | Round to decimal places |

### Type Checking

| Keyword | Usage | Description |
|---------|-------|-------------|
| `is a` | `x is a number` | Check if value is a type |
| `is not a` | `x is not a text` | Negated type check |

### File I/O

| Keyword | Usage | Description |
|---------|-------|-------------|
| `read` | `read "file.txt"` | Read file contents |
| `write` | `write "file" with "text"` | Write to a file |
| `append` | `append "file" with "text"` | Append to a file |

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

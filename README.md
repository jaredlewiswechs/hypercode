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

```
put ask What is your name into name
show Hello .name, welcome to HyperCode!
```

## Language Guide

### Variables

HyperCode has two ways to store values:

- **`put VALUE into NAME`** — stores literal text or numbers as-is (no math evaluation)
- **`set NAME to EXPRESSION`** — evaluates an expression and stores the result

```
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
| Map | `map`, `map name: "Alice"` | Key-value dictionary |
| Pair | `pair 1 and 2` | Two-element tuple |
| Set | `unique 1, 2, 3` | Collection with no duplicates |
| Enum | `enum Color is red, green, blue` | Named set of constants |
| Lambda | `{ x -> x * 2 }` | Anonymous function |

### Strings

Strings can be unquoted (in `put` and `show`) or quoted with double quotes (in `set` and expressions).

```
put Hello World into greeting
set name to "Alice"
set message to "She said \"hello\""
```

**String interpolation** with `{variable}` inside quoted strings:

```
set name to "World"
set msg to "Hello {name}!"
show .msg
-- Shows: Hello World!
```

**Triple-quoted strings** for multiline text:

```
set poem to """roses are red
violets are blue"""
show .poem
```

**String concatenation** with `+`:

```
set full to first + " " + last
show (.full)
```

**Regex matching** with `matches`:

```
set valid to "hello123" matches "[a-z]+[0-9]+"
show .valid
-- Shows: true
```

**String properties:**

```
put hello world into text
show (.text.upper)       -- HELLO WORLD
show (.text.lower)       -- hello world
show (.text.length)      -- 11
show (.text.trim)        -- hello world
show (.text.first)       -- h
show (.text.last)        -- d
```

**String indexing:**

```
set letter to text.at 3       -- l (1-based)
set part to text.from 1 to 5  -- hello
```

### Output

`show` prints to the console. Use `.variable` for interpolation and `(expression)` for inline math.

```
put 10 into x
put 20 into y
show The value of x is .x
show The sum is (x + y)
```

### Input

`ask` prompts the user and stores the answer in `it`.

```
put ask What is your name into name
show Hello .name

ask How old are you
put it into age
show You are .age years old
```

### Comments

```
-- This is a single-line comment

---
This is a
multi-line comment
---
```

### Arithmetic

```
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

```
set x to math.round 3.7      -- 4
set x to math.floor 3.7      -- 3
set x to math.ceil 3.2       -- 4
set x to math.abs (-5)       -- 5
set x to math.sqrt 16        -- 4
```

### Random

Generate random values:

```
-- Random integer in a range (inclusive)
set roll to random 1 to 6

-- Random pick from a list
set color to random pick from colors

-- Random decimal between 0 and 1
set chance to random float
```

### Formatted Numbers

Round numbers to a specific number of decimal places:

```
set pi to 3.14159
set short to pi rounded to 2    -- 3.14
show Pi is approximately (pi rounded to 3)
```

Use `format` for explicit formatting:

```
set x to 3.14159
set result to x format 2 places
show .result
-- Shows: 3.14
```

### Comparison

Symbolic and English-style comparisons are both supported.

```
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

```
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

Supported types: `number`, `text`, `list`, `map`, `boolean`, `nothing`, `pair`, `set`, `enum`, `lambda`.

### Logic

```
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

```
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

```
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

**Or fallthrough** — match multiple values in a single case:

```
set x to 2

when x
  is 1 or 2
    show one or two
  is 3
    show three
end
```

### Loops

**Repeat N times:**

```
repeat 5 times
  show Hello!
end
```

**Repeat with counter:**

```
repeat 5 times with i
  show Iteration .i
end
-- i goes from 1 to 5
```

**While / Until:**

```
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

```
put 0 into n
repeat forever
  set n to n + 1
  if n > 10
    stop
  end
end
```

**For each:**

```
put list Red, Green, Blue into colors
for each color in colors
  show .color
end
```

**For each with index:**

```
for each item at i in items
  show Item .i is .item
end
```

**Ranges:**

```
for each i in 1 to 10
  show .i
end
```

**Step value** — skip items in a range:

```
for each i in 1 to 10 by 3
  show .i
end
-- Shows: 1, 4, 7, 10
```

**Labeled loops** — break from outer loops:

```
repeat 5 times as outer
  repeat 5 times as inner
    if something
      stop outer
    end
  end
end
```

### Lists

Create lists with the `list` keyword.

```
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

```
put list 10, 20, 30, 40, 50 into nums
show First is (.nums.first)
show Last is (.nums.last)
show Count is (.nums.count)
show Sum is (.nums.sum)
show Average is (.nums.average)
```

**Modify lists:**

```
add 60 to nums
remove 10 from nums
sort nums
reverse nums
shuffle nums
```

**Filter with `where`:**

```
put list 92, 45, 78, 55, 88 into scores
set passing to scores where it >= 70
show .passing
```

**Transform with `each`:**

```
put list 1, 2, 3, 4, 5 into nums
set scaled to nums each it * 10
show .scaled
```

**Check membership:**

```
if scores contains 100
  show Perfect score found!
end
```

### Maps (Dictionaries)

Create key-value stores with `map`:

```
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

```
show Keys: (.data.keys)
show Count: (.data.count)
```

**Check and remove entries:**

```
if data contains "name"
  show Has a name
end

remove "age" from data
```

### Pairs

A pair holds exactly two values:

```
set p to pair "hello" and "world"
show .p           -- (hello, world)
show .p.first     -- hello
show .p.second    -- world
```

### Sets

Sets are collections with no duplicate values. Create them with `unique`:

```
set s to unique 1, 2, 3, 2, 1
show .s.count     -- 3 (duplicates removed)
```

**Set properties:**

| Property | Description |
|----------|-------------|
| `.count` | Number of unique items |
| `.list` | Convert to a list |

```
if s contains 2
  show found
end

for each item in s
  show .item
end
```

### Enums

Declare named constants with `enum`:

```
enum Color is red, green, blue
show .color
-- Shows: [Enum Color: red, green, blue]
```

### Map Literals with Entries

Create maps with initial key-value pairs inline:

```
set m to map name: "Alice", age: 25
show .m.name   -- Alice
show .m.age    -- 25
```

### Destructuring

Unpack lists and pairs into individual variables:

```
set data to list 10, 20, 30
set a, b, c from data
show .a   -- 10
show .b   -- 20
show .c   -- 30

set p to pair "x" and "y"
set first, second from p
```

### Exists Check

Check if a variable has been defined:

```
set x to 5
if x exists
  show x is defined
end
```

### Kinds (Classes)

Define object types with `kind`. Fields use `is` for default values. Methods use `on`.

```
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

```
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

### Contracts (Interfaces)

Define a contract that kinds must implement:

```
contract Describable
  method describe
end

kind Dog implements Describable
  name is "Rex"

  on describe
    show I am .me.name
  end
end

make Dog called d
send describe to d
```

### Secret (Private) Fields

Mark fields as private with `secret`:

```
kind Account
  secret balance is 100

  on getBalance
    return me.balance
  end
end

make Account called a
set b to send getBalance to a
show .b   -- 100
-- Direct access from outside is prevented
```

### Static Methods

Define methods on the kind itself, not on instances:

```
kind MathHelper
  static on double x
    return x * 2
  end
end
```

### Methods with Parameters

`on` handlers accept parameters after the method name.

```
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

```
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

### Guard Clause Returns

Return early from a command based on a condition:

```
command check x
  return "small" if x < 10
  return "big"
end

show (check 5)    -- small
show (check 15)   -- big
```

### Type Annotations

Add optional type annotations to command parameters:

```
command add (a as number, b as number)
  return a + b
end
show (add 3, 4)   -- 7
```

### Lambda Expressions

Create anonymous functions with `{ params -> body }`:

```
set double to { x -> x * 2 }
show (double 5)   -- 10

set factor to 3
set mult to { x -> x * factor }
show (mult 4)     -- 12
```

### Pipeline Operator

Chain values through a series of functions with `|`:

```
command double x
  return x * 2
end
command add1 x
  return x + 1
end

set result to 5 | double | add1
show .result   -- 11
```

### Curry (Partial Application)

Create a new function by fixing some arguments of an existing one:

```
command add a, b
  return a + b
end

set add5 to curry add 5
show (add5 3)   -- 8
```

### Compose

Combine two functions into one that applies them in sequence:

```
set double to { x -> x * 2 }
set inc to { x -> x + 1 }
set doubleThenInc to compose double, inc
show (doubleThenInc 3)   -- 7
```

### Templates

Declare reusable code templates:

```
template greeting name
  show Hello .name
end
```

### Environment Variables

Read environment variables:

```
set p to env "PATH"
if p exists
  show has path
end
```

### Date and Time

Access current date/time values:

```
set y to current year
set t to today
show .y
show .t
```

### JSON and CSV Parsing

Parse data formats:

```
-- Parse JSON
set raw to "[1, 2, 3]"
set data to json raw
show .data.count   -- 3

-- Parse CSV
set csv_data to "name,age\nAlice,30"
set rows to csv csv_data
show .rows.count   -- 1 (data rows, first line is headers)
```

### File I/O

Read and write files:

```
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

```
use "helpers.say"
use "utils/math.say"
```

The imported file is executed, making its commands and kinds available.

### String Interpolation

Use `.variable` anywhere in `show` to insert a value. Use `.object.property` for nested access. Use `(expression)` for computed values.

```
put HyperCode into lang
put 2026 into year
show .lang was created in .year
show That was (2026 - year) years ago
```

### Error Handling

**Basic try/or:**

```
try
  make a Unicorn called sparkle
or
  show Caught: Unicorn kind does not exist
end
```

**Try/catch with error variable:**

```
try
  send fly to nothing
catch err
  show Error: (.err.message)
end

show Program continues after errors
```

### Testing

Define tests with `test` blocks and assertions with `check`.

```
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

### Mock Commands

Replace commands with mock implementations in tests:

```
command fetch_data
  return "real data"
end
mock fetch_data returns "fake data"
show (fetch_data)   -- fake data
```

### Benchmark

Measure how long code takes to run:

```
benchmark "sorting"
  sort big_list
end
-- Shows: Benchmark "sorting": 12ms
```

### Snapshot Testing

Save and verify values against snapshots:

```
set x to 42
snapshot x as "my_value"
```

### Turtle Graphics

Draw with Logo-style turtle commands:

```
forward 100
turn right 90
forward 50
pen up
forward 20
pen down
forward 50
```

### Animation

Animate properties over time:

```
animate ball.x from 0 to 100 over 500
```

### Scene Switching

Switch between scenes in games/apps:

```
switch scene "menu"
```

### Inspect and Explain

Use `explain` for detailed info about a value. Use `?` for a quick inspection.

```
kind Cat
  name is Unknown
  lives is 9
end

make a Cat called whiskers with name Whiskers
explain whiskers
```

### The `it` Variable

`it` holds the last input value or the current item in `where`/`each` expressions.

```
ask What is your favorite color
show You said .it

put list 1, 2, 3, 4, 5 into nums
set big to nums where it > 3
set doubled to nums each it * 2
```

### The `me` Keyword

Inside an `on` handler, `me` refers to the current instance.

```
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

### Graphics (Draw)

Draw shapes to a canvas. When running from the CLI, an SVG file is automatically saved.

```
draw circle at 200, 200 size 80
draw rectangle at 50, 50 size 100
draw line from 0, 400 to 400, 0
```

Supported shapes: `circle`, `rectangle`, `line`, `text`, `ellipse`, `triangle`, `star`.

### Sound

Play sounds (outputs descriptions in CLI mode):

```
play sound ding
```

### AI Integration (`think`)

Ask an AI a question (requires `ANTHROPIC_API_KEY` environment variable):

```
set answer to think "What is the capital of France?"
show .answer

put ask Ask me anything into question
set response to think question
show .response
```

### HTTP Fetch

Make HTTP requests and work with web data:

```
set data to fetch "https://api.example.com/data"
show .data
```

JSON responses are automatically converted to maps and lists.

### Web Server

Serve web pages from HyperCode:

```
serve on port 8080

route GET "/"
  respond with "<h1>Hello from HyperCode!</h1>"
end

route GET "/about"
  respond with "<h1>About</h1><p>Made with HyperCode.</p>"
end
```

### WebSocket Connections

Connect to WebSocket servers:

```
connect "ws://localhost:8080" as ws
```

### Emit Events

Emit events to listeners:

```
emit "click"
emit "message" with "hello"
```

### Cookies

Manage browser cookies:

```
cookie set "user" to "Alice"
show .cookie_user         -- Alice
cookie delete "user"
```

### CORS (Cross-Origin)

Allow cross-origin requests:

```
allow "https://example.com"
```

### Streaming

Start a data stream:

```
stream "heartbeat"
```

### Persistent Storage (`remember` / `recall`)

Store values that survive between program runs:

```
-- Save a value
remember "high_score" as 100

-- Load it later (even after restarting)
set best to recall "high_score"
show Best score: .best

-- Delete a stored value
forget "high_score"
```

### Packages (`grab`)

Import community packages:

```
grab "colors"
grab "trivia-api"
```

Packages are loaded from `packages/<name>/index.say`.

### Concurrent Execution (`do together`)

Run multiple blocks of code at the same time:

```
do together
  show Task 1 running
  repeat 3 times
    show Working on task 1...
  end
and
  show Task 2 running
  repeat 3 times
    show Working on task 2...
  end
end
```

### Event Listeners

Listen for events and run code when they happen:

```
listen for click as data
  show Clicked: .data
end
```

### Timers (`every`)

Run code on a recurring interval:

```
every 2 seconds
  show Tick!
end
```

### Pattern Matching on Kinds

Match objects by their type in `when` blocks:

```
when animal
is a Dog
  show It's a dog!
is a Bird
  show It's a bird!
else
  show Unknown animal
end
```

## CLI Commands

```bash
say <file.say>              Run a program
say run <file.say>          Run a program
say test <file.say>         Run tests in a file
say repl                    Start interactive REPL
say debug <file.say>        Debug a program step-by-step
say playground [port]       Start browser playground (default: 3000)
say share <file.say> [port] Share a file via local server
say classroom start [port]  Start classroom dashboard
say submit <file.say> ...   Submit code to classroom
say tutor <file.say>        Get AI feedback on your code
say create "<description>"  Generate a program from a description
```

### Browser Playground

Start a browser-based IDE where students can write and run HyperCode without installing anything:

```bash
say playground
# Opens at http://localhost:3000
```

### Debugger

Step through a program line by line:

```bash
say debug myprogram.say
```

Commands: `s`tep, `c`ontinue, `b N` (breakpoint), `v`ariables, `q`uit.

### AI Tutor

Get AI-powered feedback on your code:

```bash
say tutor myprogram.say
```

### Code Generation

Generate a program from a description:

```bash
say create "a quiz game about geography with 5 questions"
```

### Live Sharing

Share a program via a local web server:

```bash
say share myprogram.say
# Outputs a URL others can visit to view the code
```

### Classroom Dashboard

Teachers can collect and view student submissions:

```bash
# Teacher starts the dashboard:
say classroom start

# Students submit their work:
say submit myfile.say --name "Alice" --to localhost:5000
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
| `drawing.say` | Graphics with draw commands |
| `storage.say` | Persistent storage with remember/recall |
| `web_server.say` | Simple web server |
| `ai_demo.say` | AI integration with think |
| `concurrent.say` | Concurrent tasks with do together |
| `pattern_matching.say` | Pattern matching with when/is a |

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
| Graphics | `src/graphics.ts` | SVG canvas rendering for draw commands |
| AI | `src/ai.ts` | Claude API integration for think/tutor/create |
| Server | `src/server.ts` | HTTP server for serve/route/respond |
| Storage | `src/storage.ts` | Persistent key-value storage |
| Playground | `src/playground.ts` | Browser-based IDE |
| Share | `src/share.ts` | Live sharing and classroom dashboard |
| Debugger | `src/debugger.ts` | Step-through debugger |

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
| `implements` | `kind X implements Y` | Implement a contract |
| `contract` | `contract NAME ... end` | Define an interface |
| `on` | `on METHOD ... end` | Define a method |
| `static on` | `static on METHOD ... end` | Define a static method |
| `secret` | `secret field is val` | Declare a private field |
| `command` | `command NAME PARAMS ... end` | Define a function |
| `return` | `return VALUE` | Return a value |
| `end` | `end` | Close any block |
| `me` | `me.property` | Reference to the current instance |
| `it` | `it` | Last input or current iteration item |
| `with` | `make a X called Y with ...` | Set properties inline |
| `use` | `use "file.say"` | Import another file |
| `template` | `template NAME PARAMS ... end` | Declare a reusable template |

### Control Flow

| Keyword | Usage | Description |
|---------|-------|-------------|
| `if` | `if COND ... end` | Conditional |
| `else` | `else ... end` | Alternative branch |
| `else if` | `else if COND ... end` | Chained conditional |
| `when` | `when VALUE ... end` | Pattern matching |
| `is ... or` | `is 1 or 2` | Match multiple values in when |
| `repeat` | `repeat N times ... end` | Fixed loop |
| `while` | `repeat while COND ... end` | Conditional loop |
| `until` | `repeat until COND ... end` | Inverse conditional loop |
| `forever` | `repeat forever ... end` | Infinite loop |
| `for each` | `for each X in LIST ... end` | Iteration |
| `to` | `1 to 10` | Range expression |
| `by` | `1 to 10 by 2` | Step value in range |
| `as` | `repeat 5 times as label` | Label a loop |
| `stop` | `stop` / `stop label` | Break out of a loop |
| `\|` | `value \| fn1 \| fn2` | Pipeline operator |
| `return ... if` | `return X if COND` | Guard clause return |

### Data

| Keyword | Usage | Description |
|---------|-------|-------------|
| `list` | `list 1, 2, 3` | Create a list |
| `map` | `map` / `map key: val` | Create a map (empty or with entries) |
| `pair` | `pair A and B` | Create a two-element pair |
| `unique` | `unique 1, 2, 3` | Create a set (no duplicates) |
| `enum` | `enum Name is a, b, c` | Declare named constants |
| `sort` | `sort LIST` | Sort in place |
| `reverse` | `reverse LIST` | Reverse in place |
| `shuffle` | `shuffle LIST` | Randomize order |
| `contains` | `LIST contains VALUE` | Check membership |
| `where` | `LIST where COND` | Filter items |
| `each` | `LIST each TRANSFORM` | Map/transform items |
| `random` | `random 1 to 6` | Generate random values |
| `rounded` | `x rounded to 2` | Round to decimal places |
| `format` | `x format 2 places` | Format to decimal places |
| `set ... from` | `set a, b from list` | Destructure into variables |
| `exists` | `if x exists` | Check if variable is defined |

### Strings

| Keyword | Usage | Description |
|---------|-------|-------------|
| `matches` | `str matches "pattern"` | Regex match test |
| `"""..."""` | `"""multiline"""` | Triple-quoted multiline string |
| `"{var}"` | `"Hello {name}"` | Interpolated string |

### Type Checking

| Keyword | Usage | Description |
|---------|-------|-------------|
| `is a` | `x is a number` | Check if value is a type |
| `is not a` | `x is not a text` | Negated type check |

### File I/O & System

| Keyword | Usage | Description |
|---------|-------|-------------|
| `read` | `read "file.txt"` | Read file contents |
| `write` | `write "file" with "text"` | Write to a file |
| `append` | `append "file" with "text"` | Append to a file |
| `env` | `env "PATH"` | Read environment variable |
| `json` | `json raw_string` | Parse JSON string |
| `csv` | `csv raw_string` | Parse CSV string |
| `current year` | `current year` | Get current year |
| `today` | `today` | Get today's date |

### Error Handling

| Keyword | Usage | Description |
|---------|-------|-------------|
| `try` | `try ... end` | Begin error handling block |
| `or` | `or ... end` | Catch block (no variable) |
| `catch` | `catch VAR ... end` | Catch block with error |

### Functional

| Keyword | Usage | Description |
|---------|-------|-------------|
| `{ -> }` | `{ x -> x * 2 }` | Lambda expression |
| `curry` | `curry fn arg` | Partial application |
| `compose` | `compose f, g` | Function composition |

### Testing

| Keyword | Usage | Description |
|---------|-------|-------------|
| `test` | `test NAME ... end` | Define a test block |
| `check` | `check EXPRESSION` | Assert a condition is true |
| `mock` | `mock fn returns val` | Mock a command |
| `before` | `before ... end` | Setup block |
| `after` | `after ... end` | Teardown block |
| `benchmark` | `benchmark "name" ... end` | Measure execution time |
| `snapshot` | `snapshot val as "name"` | Snapshot testing |

### AI

| Keyword | Usage | Description |
|---------|-------|-------------|
| `think` | `think "prompt"` | Ask AI a question (returns text) |

### HTTP

| Keyword | Usage | Description |
|---------|-------|-------------|
| `fetch` | `fetch "url"` | Make an HTTP request |

### Web Server

| Keyword | Usage | Description |
|---------|-------|-------------|
| `serve` | `serve on port N` | Start a web server |
| `route` | `route GET "/" ... end` | Define a route handler |
| `respond` | `respond with "text"` | Send an HTTP response |
| `connect` | `connect "ws://..." as name` | WebSocket connection |
| `emit` | `emit "event"` | Emit an event |
| `cookie` | `cookie set/delete "name"` | Manage cookies |
| `allow` | `allow "origin"` | Set CORS origin |
| `stream` | `stream "name"` | Start a data stream |

### Storage

| Keyword | Usage | Description |
|---------|-------|-------------|
| `remember` | `remember "key" as VALUE` | Persist a value |
| `recall` | `recall "key"` | Retrieve a persisted value |
| `forget` | `forget "key"` | Delete a persisted value |

### Packages

| Keyword | Usage | Description |
|---------|-------|-------------|
| `grab` | `grab "name"` | Import a package |

### Concurrency

| Keyword | Usage | Description |
|---------|-------|-------------|
| `do together` | `do together ... and ... end` | Run blocks concurrently |

### Events

| Keyword | Usage | Description |
|---------|-------|-------------|
| `listen` | `listen for EVENT ... end` | Register an event listener |
| `every` | `every N seconds ... end` | Run code on an interval |

### Graphics

| Keyword | Usage | Description |
|---------|-------|-------------|
| `draw` | `draw circle at X, Y size N` | Draw a shape on the canvas |
| `clear` | `clear canvas` | Clear the canvas |
| `play` | `play sound NAME` | Play a sound |
| `forward` | `forward 100` | Turtle: move forward |
| `turn` | `turn right 90` | Turtle: turn direction |
| `pen` | `pen up` / `pen down` | Turtle: lift/lower pen |
| `animate` | `animate obj.prop from A to B over N` | Animate a property |
| `switch scene` | `switch scene "menu"` | Switch to a scene |

### Debugging

| Keyword | Usage | Description |
|---------|-------|-------------|
| `explain` | `explain TARGET` | Show detailed info about a value |
| `?` | `value?` | Quick inspect |

## Operator Precedence (Highest to Lowest)

1. Parentheses, literals, property access, lambdas
2. Unary (`-`, `not`)
3. Exponent (`^`)
4. Multiplication (`*`, `/`, `%`)
5. Addition (`+`, `-`)
6. `format`, `matches`
7. Comparison (`==`, `!=`, `>`, `<`, `>=`, `<=`, `is`, `is not`)
8. `contains`, `exists`
9. `where`, `each`
10. `and`
11. `or`
12. Pipeline (`|`)

## License

ISC

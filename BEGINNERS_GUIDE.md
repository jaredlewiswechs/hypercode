# HyperCode Beginner's Guide

A friendly introduction for students and teachers.

---

## What is HyperCode?

HyperCode is a programming language that reads like English. Instead of cryptic symbols and confusing syntax, you write code the way you talk. It's designed for people who are learning to code for the first time.

Here's your first program:

```say
show Hello, world!
```

That's it. No imports, no semicolons, no curly braces. Just tell the computer what to do.

---

## Getting Set Up

### Install

You need [Node.js](https://nodejs.org) (version 18 or later). Then:

```bash
npm install
npm run build
```

### Run a Program

Save your code in a file ending with `.say` (for example, `myprogram.say`), then run it:

```bash
say myprogram.say
```

### Try It Live

Start the interactive mode to type code and see results immediately:

```bash
say repl
```

Type `quit` to exit.

---

## Lesson 1: Saying Hello

The `show` command prints text to the screen.

```say
show Hello!
show My name is HyperCode.
show I can print anything.
```

**Output:**
```
Hello!
My name is HyperCode.
I can print anything.
```

**Try it yourself:** Write a program that shows your name, your age, and your favorite food on three separate lines.

---

## Lesson 2: Variables — Remembering Things

A variable is like a labeled box that holds a value. You give it a name and put something in it.

### Storing Text and Numbers

Use `put` to store simple values:

```say
put Alice into name
put 15 into age
put Pizza into food

show My name is .name
show I am .age years old
show I love .food
```

**Output:**
```
My name is Alice
I am 15 years old
I love Pizza
```

Notice the `.name`, `.age`, and `.food` — the dot before a variable name inserts its value into the text.

### Doing Math

Use `set` when you need to calculate something:

```say
put 10 into apples
put 6 into oranges
set total to apples + oranges

show I have .apples apples and .oranges oranges
show That is .total pieces of fruit!
```

**Output:**
```
I have 10 apples and 6 oranges
That is 16 pieces of fruit!
```

### The Difference Between `put` and `set`

This is important:

- **`put`** takes the words literally — `put 3 + 4 into x` stores the text "3 + 4"
- **`set`** does the math — `set x to 3 + 4` stores the number 7

```say
put 3 + 4 into a
set b to 3 + 4

show put gives us: .a
show set gives us: .b
```

**Output:**
```
put gives us: 3 + 4
set gives us: 7
```

**Rule of thumb:** Use `put` for plain text and simple values. Use `set` for math and calculations.

**Try it yourself:** Create variables for the length and width of a rectangle, then calculate and show the area.

---

## Lesson 3: Getting Input

Use `ask` to ask the user a question. Their answer goes into a variable called `it`.

```say
put ask What is your name into name
show Nice to meet you, .name!

ask How old are you
put it into age
show .name is .age years old
```

Both forms work:
- `put ask QUESTION into NAME` — asks and stores in one line
- `ask QUESTION` then `put it into NAME` — two steps

**Try it yourself:** Write a program that asks for someone's name and favorite color, then shows "NAME's favorite color is COLOR".

---

## Lesson 4: Math

HyperCode supports all the math you'd expect:

| Operator | Meaning | Example |
|----------|---------|---------|
| `+` | Add | `set x to 5 + 3` |
| `-` | Subtract | `set x to 10 - 4` |
| `*` | Multiply | `set x to 6 * 7` |
| `/` | Divide | `set x to 20 / 4` |
| `%` | Remainder | `set x to 17 % 5` |
| `^` | Power | `set x to 2 ^ 10` |

Use parentheses to control order:

```say
set x to (3 + 4) * 2
show .x
-- Shows: 14
```

### Math Functions

```say
set x to math.round 3.7    -- 4
set x to math.floor 3.7    -- 3
set x to math.ceil 3.2     -- 4
set x to math.abs (-5)     -- 5
set x to math.sqrt 16      -- 4
```

### Rounding Numbers

```say
set pi to 3.14159
show (pi rounded to 2)
-- Shows: 3.14
```

### Random Numbers

```say
-- Roll a die (1 through 6)
set roll to random 1 to 6
show You rolled .roll

-- Pick a random item from a list
put list Red, Blue, Green into colors
set pick to random pick from colors
show Random color: .pick
```

**Try it yourself:** Write a program that asks the user for two numbers and shows their sum, difference, product, and quotient.

---

## Lesson 5: Making Decisions

### If / Else

Programs need to make choices. Use `if` to check a condition:

```say
put 85 into score

if score >= 90
  show Great job! You got an A!
else if score >= 80
  show Good work! You got a B.
else if score >= 70
  show Not bad. You got a C.
else
  show Let's study harder next time.
end
```

Every `if` block must end with `end`.

### Comparisons

| Symbol | Meaning | English version |
|--------|---------|----------------|
| `==` | Equal to | `is` |
| `!=` | Not equal to | `is not` |
| `>` | Greater than | `is greater than` |
| `<` | Less than | `is less than` |
| `>=` | Greater or equal | — |
| `<=` | Less or equal | — |

You can use either style:

```say
if score >= 90
  show A
end

-- Same thing, English style:
if score is greater than 89
  show A
end
```

### Combining Conditions

Use `and`, `or`, and `not`:

```say
if age >= 13 and age <= 19
  show You are a teenager
end

if day is Saturday or day is Sunday
  show It's the weekend!
end

if not raining
  show Go outside!
end
```

### When Blocks

When you need to match many values, use `when` instead of lots of `if`/`else if`:

```say
put ask Pick a number 1-3 into choice

when choice
is 1
  show You picked one!
is 2
  show You picked two!
is 3
  show You picked three!
else
  show That's not 1, 2, or 3.
end
```

### Type Checking

You can check what kind of value a variable holds:

```say
if x is a number
  show x is a number
end

if name is a text
  show name is text
end
```

**Try it yourself:** Write a program that asks for the user's age and tells them if they can vote (18+), can drive (16+), or are too young for both.

---

## Lesson 6: Loops — Doing Things More Than Once

### Repeat N Times

```say
repeat 3 times
  show Hip hip hooray!
end
```

**Output:**
```
Hip hip hooray!
Hip hip hooray!
Hip hip hooray!
```

### Counting with a Loop

Use `with` to get a counter variable:

```say
repeat 5 times with i
  show Round .i
end
```

**Output:**
```
Round 1
Round 2
Round 3
Round 4
Round 5
```

### While Loops

Keep going as long as a condition is true:

```say
put 1 into countdown
repeat while countdown <= 5
  show .countdown...
  set countdown to countdown + 1
end
show Go!
```

### For Each

Go through every item in a list:

```say
put list Apples, Bananas, Cherries into fruits

for each fruit in fruits
  show I like .fruit
end
```

### Ranges

Count through a range of numbers:

```say
for each number in 1 to 10
  show .number
end
```

### Stopping a Loop Early

Use `stop` to break out:

```say
repeat forever
  put ask Type quit to exit into answer
  if answer is quit
    stop
  end
  show You said: .answer
end
show Goodbye!
```

**Try it yourself:** Write a program that prints the multiplication table for 7 (7 x 1 = 7, 7 x 2 = 14, etc., up to 7 x 12).

---

## Lesson 7: Lists — Collections of Things

Lists hold multiple values in order.

```say
put list 90, 85, 72, 98, 67 into scores
```

### List Properties

```say
show First: (.scores.first)      -- 90
show Last: (.scores.last)        -- 67
show Count: (.scores.count)      -- 5
show Sum: (.scores.sum)          -- 412
show Average: (.scores.average)  -- 82.4
show Highest: (.scores.max)      -- 98
show Lowest: (.scores.min)       -- 67
```

### Changing Lists

```say
add 88 to scores              -- add to end
remove 67 from scores         -- remove a value
sort scores                   -- put in order
reverse scores                -- flip the order
shuffle scores                -- randomize
```

### Filtering

Get only the items that match a condition:

```say
put list 90, 85, 72, 98, 67 into scores
set passing to scores where it >= 70
show Passing: .passing
-- Shows: Passing: 90, 85, 72, 98
```

### Transforming

Change every item in a list:

```say
put list 1, 2, 3, 4, 5 into nums
set doubled to nums each it * 2
show .doubled
-- Shows: 2, 4, 6, 8, 10
```

### Checking Membership

```say
if scores contains 100
  show Someone got a perfect score!
end
```

**Try it yourself:** Create a list of 5 test scores. Show the average, the highest, and filter out any scores below 75.

---

## Lesson 8: Maps — Looking Things Up

Maps store key-value pairs, like a dictionary:

```say
set student to map
set student.name to "Alice"
set student.grade to 10
set student.gpa to 3.8

show (.student.name) is in grade (.student.grade)
show GPA: (.student.gpa)
```

### Map Properties

```say
show Keys: (.student.keys)      -- name, grade, gpa
show Count: (.student.count)    -- 3
```

**Try it yourself:** Create a map to store info about your favorite movie (title, year, director, rating).

---

## Lesson 9: Commands — Reusable Code

Commands are like recipes — you define them once, then use them whenever you need them.

### Simple Command

```say
command greet someone
  show Hello, .someone! Welcome!
end

greet Alice
greet Bob
```

**Output:**
```
Hello, Alice! Welcome!
Hello, Bob! Welcome!
```

### Commands That Return Values

```say
command double n
  return n * 2
end

set result to double 7
show .result
-- Shows: 14
```

### Multiple Parameters

Separate parameters with `and`:

```say
command add a and b
  return a + b
end

set total to add 10 and 25
show .total
-- Shows: 35
```

**Try it yourself:** Write a command called `max` that takes two numbers and returns the bigger one.

---

## Lesson 10: Kinds — Building Your Own Types

Kinds are like blueprints for creating objects. Think of them like a template.

### Defining a Kind

```say
kind Pet
  name is Unknown
  species is Unknown
  age is 0

  on greet
    show Hi! I'm .me.name the .me.species
  end

  on birthday
    set me.age to me.age + 1
    show .me.name is now .me.age years old!
  end
end
```

### Creating Instances

```say
make a Pet called buddy with name Buddy, species Dog, age 3
make a Pet called whiskers with name Whiskers, species Cat, age 5

send greet to buddy
send greet to whiskers
send birthday to buddy
```

**Output:**
```
Hi! I'm Buddy the Dog
Hi! I'm Whiskers the Cat
Buddy is now 4 years old!
```

### Inheritance — Building on Existing Kinds

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
end

kind Cat from Animal
  sound is Meow
end

make a Dog called rex with name Rex
make a Cat called luna with name Luna

send speak to rex    -- Rex says Woof
send speak to luna   -- Luna says Meow
```

`Dog` and `Cat` inherit the `speak` method from `Animal` but have their own sounds.

**Try it yourself:** Create a `Student` kind with name, grade, and a method that says whether they're passing (grade >= 70).

---

## Lesson 11: Strings — Working with Text

### Quoted Strings

When you need exact text (especially with special characters), use double quotes:

```say
set message to "Hello, world!"
set quote to "She said \"wow!\""
```

### String Properties

```say
put hello world into text
show (.text.upper)       -- HELLO WORLD
show (.text.lower)       -- hello world
show (.text.length)      -- 11
show (.text.first)       -- h
show (.text.last)        -- d
```

### String Indexing

```say
set letter to text.at 3         -- l (position 1 is the first character)
set piece to text.from 1 to 5   -- hello
```

### Joining Strings

Use `+` to combine strings:

```say
set first to "Hello"
set second to "World"
set greeting to first + " " + second
show .greeting
-- Shows: Hello World
```

---

## Lesson 12: Error Handling

Sometimes things go wrong. Use `try` to catch errors instead of crashing:

```say
try
  -- this will fail because "Ghost" isn't defined
  make a Ghost called casper
or
  show Oops! Something went wrong.
end

show But the program keeps running!
```

You can also capture the error details:

```say
try
  send fly to nothing
catch err
  show Error: (.err.message)
end
```

---

## Lesson 13: Testing Your Code

HyperCode has built-in testing. Use `test` blocks to verify your code works:

```say
command add a and b
  return a + b
end

command double n
  return n * 2
end

test addition works
  set result to add 3 and 4
  check result == 7
end

test doubling works
  set result to double 5
  check result == 10
end
```

Run tests with:

```bash
say test myfile.say
```

**Output:**
```
  PASS  addition works
  PASS  doubling works

2 passed, 0 failed, 2 total
```

---

## Lesson 14: File I/O

Read and write files from your programs:

```say
-- Save text to a file
write "diary.txt" with "Dear diary, today I learned HyperCode!"

-- Add more text to the end
append "diary.txt" with "It was awesome."

-- Read the file back
set contents to read "diary.txt"
show .contents
```

---

## Lesson 15: Comments

Comments explain your code to other humans. The computer ignores them.

```say
-- This is a single-line comment

---
This is a multi-line comment.
You can write as much as you want here.
The computer will skip all of it.
---
```

Use comments to:
- Explain *why* you did something (not *what* — the code shows that)
- Leave notes for yourself or your classmates
- Temporarily disable code while debugging

---

## Lesson 16: Drawing Pictures

HyperCode can draw shapes! When you run a program with draw commands, it creates an SVG image file.

```say
draw circle at 200, 200 size 80
draw rectangle at 50, 50 size 100
draw line from 0, 400 to 400, 0
```

Shapes you can draw: `circle`, `rectangle`, `line`, `text`, `triangle`, `star`, `ellipse`.

---

## Lesson 17: Remembering Things Between Runs

Normally, variables disappear when your program ends. Use `remember` to save values permanently:

```say
set visits to recall "visit_count"
if visits is nothing
  set visits to 0
end
set visits to visits + 1
remember "visit_count" as visits
show This program has been run .visits times!
```

Run this program multiple times — the count goes up each time!

Use `forget` to delete a stored value:
```say
forget "visit_count"
```

---

## Lesson 18: Asking AI Questions

If you have an AI API key set up, you can ask AI questions from your programs:

```say
set answer to think "What is the largest planet?"
show .answer
```

---

## Lesson 19: The Browser Playground

You don't need to install anything to try HyperCode! Start the playground:

```bash
say playground
```

Then open `http://localhost:3000` in your browser. You can write code, run it, and see the output — all in the browser.

---

## Lesson 20: Running Tasks at the Same Time

Use `do together` to run multiple blocks of code concurrently:

```say
do together
  repeat 3 times
    show Task A working...
  end
and
  repeat 3 times
    show Task B working...
  end
end
show Both tasks done!
```

---

## Lesson 21: Pattern Matching on Kinds

You can match objects by their type using `when ... is a`:

```say
kind Dog
  name is Unknown
end
kind Cat
  name is Unknown
end

make a Dog called pet with name Buddy

when pet
is a Dog
  show It's a dog!
is a Cat
  show It's a cat!
else
  show Unknown pet
end
```

---

## Quick Reference Card

### Storing Values
```say
put Hello into greeting          -- literal text
put 42 into age                  -- literal number
set total to price * 2           -- computed value
```

### Showing Output
```say
show Hello!                      -- plain text
show My name is .name            -- with variable
show The answer is (2 + 3)       -- with expression
```

### Getting Input
```say
put ask What's your name into name
```

### Math
```say
set x to 5 + 3       -- add
set x to 10 - 4      -- subtract
set x to 6 * 7       -- multiply
set x to 20 / 4      -- divide
set x to 17 % 5      -- remainder
set x to 2 ^ 3       -- power (8)
```

### Decisions
```say
if condition
  -- do something
else if other_condition
  -- do something else
else
  -- fallback
end
```

### Loops
```say
repeat 10 times                  -- fixed count
repeat 10 times with i           -- with counter
repeat while condition           -- while true
repeat until condition           -- until true
repeat forever                   -- infinite (use stop)
for each item in list            -- iterate
for each i in 1 to 10            -- range
```

### Lists
```say
put list 1, 2, 3 into nums      -- create
add 4 to nums                   -- append
remove 2 from nums              -- remove
set big to nums where it > 2    -- filter
set x2 to nums each it * 2     -- transform
```

### Commands
```say
command add a and b
  return a + b
end
```

### Kinds
```say
kind Person
  name is Unknown
  on greet
    show Hi, I'm .me.name
  end
end
make a Person called p with name Alex
send greet to p
```

### Drawing
```say
draw circle at 200, 200 size 50
draw rectangle at 10, 10 size 100
draw line from 0, 0 to 400, 400
```

### Storage
```say
remember "key" as value          -- save permanently
set x to recall "key"            -- load it back
forget "key"                     -- delete it
```

### AI
```say
set answer to think "question"   -- ask AI (needs API key)
```

### Web Server
```say
serve on port 8080
route GET "/"
  respond with "<h1>Hello!</h1>"
end
```

### Concurrency
```say
do together
  -- block 1
and
  -- block 2
end
```

---

## Project Ideas

Here are some projects to try as you learn. They're listed from easiest to hardest.

### Beginner

1. **Mad Libs** — Ask the user for a noun, verb, adjective, and place, then show a silly story using their words.

2. **Temperature Converter** — Ask for a temperature in Fahrenheit and convert it to Celsius. (Formula: C = (F - 32) * 5 / 9)

3. **Countdown Timer** — Count down from 10 to 1, then show "Blast off!"

### Intermediate

4. **Grade Calculator** — Ask for 5 test scores, store them in a list, show the average, highest, and lowest, and whether the student passes.

5. **Number Guessing Game** — Pick a random number 1-100 and let the user guess with "too high" / "too low" hints. (See `examples/guessing_game.say` for inspiration.)

6. **Shopping List** — Build a to-do list app where the user can add items, remove items, and show the list. Use a `repeat forever` loop with `ask` for the menu.

### Advanced

7. **Quiz Game** — Create a `Question` kind with a question and answer. Make a list of questions and quiz the user, keeping score. (See `examples/quiz.say`.)

8. **Student Report Card** — Create a `Student` kind with name and list of grades. Add methods to calculate GPA, check if passing, and show a report.

9. **Simple Bank** — Create an `Account` kind with deposit, withdraw, and balance methods. Handle overdraft errors with `try`/`or`.

### Using New Features

10. **Persistent High Score** — Build a game (like number guessing) that uses `remember`/`recall` to keep a high score between runs.

11. **Drawing Art** — Use `draw` commands to create a picture (house, face, flag, pattern). The SVG file is saved automatically.

12. **Personal Website** — Use `serve` and `route` to build a multi-page website about yourself.

13. **AI Study Helper** — Use `think` to build a study tool that explains topics, generates practice questions, or checks answers.

14. **Classroom Poll** — Use the classroom features to build a poll where students submit answers and the teacher sees results in real-time.

---

## For Teachers

### Why HyperCode?

HyperCode is designed to remove the barriers that frustrate beginning programmers:

- **No syntax gotchas** — No missing semicolons, mismatched braces, or indentation errors. Blocks start with a keyword and end with `end`.
- **English-like keywords** — `put`, `show`, `ask`, `repeat`, `if` — students can read code aloud and understand it.
- **Immediate feedback** — The REPL lets students experiment line by line.
- **Built-in testing** — Students can write `test` and `check` blocks to verify their own work.
- **Gradual complexity** — Start with `show` and `put`, then introduce `if`/`else`, loops, lists, commands, and kinds at your own pace.

### Suggested Curriculum Sequence

| Week | Topics | Key Concepts |
|------|--------|-------------|
| 1 | Lessons 1-2 | Output, variables, `put` vs `set` |
| 2 | Lessons 3-4 | Input, math, expressions |
| 3 | Lesson 5 | Conditionals, comparisons, logic |
| 4 | Lesson 6 | Loops: repeat, while, for each |
| 5 | Lesson 7 | Lists, filtering, transforming |
| 6 | Lesson 9 | Commands (functions), parameters, return |
| 7 | Lesson 10 | Kinds (OOP), instances, methods |
| 8 | Lessons 8, 11 | Maps, string operations |
| 9 | Lessons 12-14 | Error handling, testing, file I/O |
| 10 | Lessons 16-17 | Drawing, persistent storage |
| 11 | Lessons 18-21 | AI, concurrency, pattern matching, web |
| 12 | Projects | Student-chosen projects |

### Assessment Ideas

- **Code reading** — Give students a HyperCode program and ask them to predict the output.
- **Bug hunting** — Give students a program with 3-5 bugs and ask them to find and fix them.
- **Feature building** — Start with a working program and ask students to add a feature (e.g., add a method to a kind, add filtering to a list).
- **Test writing** — Give students a command and ask them to write `test`/`check` blocks that verify it works.
- **Free project** — Let students build something of their own using at least 3 language features.

### Classroom Tips

- **Start in the REPL** — Let students type one line at a time before writing files. Seeing immediate results builds confidence.
- **Use the Playground** — Run `say playground` and share the URL with students. No installation needed — they code in the browser.
- **Pair programming** — Have students work in pairs. One types, one reads the output. Switch every 10 minutes.
- **Read code aloud** — HyperCode is designed to be read as English. Have students practice reading their programs out loud.
- **Show the examples** — The `examples/` directory has complete programs that demonstrate every major feature. Walk through them together.
- **Use `explain`** — When students are confused about what a variable holds, have them use `explain` to see its contents.
- **Use the Classroom** — Run `say classroom start` to collect student submissions. Students submit with `say submit myfile.say --name "Name"`.
- **Try AI Tutor** — If you have an API key, `say tutor myfile.say` gives students personalized feedback on their code.
- **Use the Debugger** — When students are stuck, `say debug myfile.say` lets them step through their program line by line.

---

## Troubleshooting

### "I get an error when I run my file"

- Make sure your file ends with `.say`
- Check that every `if`, `repeat`, `for`, `kind`, `on`, `command`, `test`, `try`, and `when` has a matching `end`
- Make sure you spelled keywords correctly (`show`, not `Show`)

### "My math isn't working"

- Use `set` for math, not `put`. `put 3 + 4 into x` stores the text "3 + 4", not 7.

### "My variable shows nothing"

- Check that you spelled the variable name the same way everywhere
- Remember the dot: `show .x` shows the value of x, `show x` shows the letter "x"

### "My loop runs forever"

- Make sure you're changing the variable you're checking (`set count to count + 1`)
- Use `stop` to break out of `repeat forever` loops
- If stuck, press Ctrl+C to stop the program

---

Happy coding!

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

```ansi
[1;34mput[0m [1;34mask[0m What [1;34mis[0m your name [1;34minto[0m name
[1;34mshow[0m Hello [36m.name[0m, welcome [1;34mto[0m HyperCode[31m![0m
```

## Language Guide

### Variables

HyperCode has two ways to store values:

- **`put VALUE into NAME`** — stores literal text or numbers as-is (no math evaluation)
- **`set NAME to EXPRESSION`** — evaluates an expression and stores the result

```ansi
[90m-- put is for literal values[0m
[1;34mput[0m [33m42[0m [1;34minto[0m age
[1;34mput[0m Hello World [1;34minto[0m greeting
[1;34mput[0m [35mtrue[0m [1;34minto[0m active
[1;34mput[0m [35mnothing[0m [1;34minto[0m empty

[90m-- set is for expressions and computed values[0m
[1;34mset[0m total [1;34mto[0m price [31m*[0m quantity
[1;34mset[0m doubled [1;34mto[0m n [31m*[0m [33m2[0m
[1;34mset[0m result [1;34mto[0m [1;34madd[0m [33m5[0m [1;34mand[0m [33m3[0m
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

```ansi
[1;34mput[0m Hello World [1;34minto[0m greeting
[1;34mset[0m name [1;34mto[0m [32m"Alice"[0m
[1;34mset[0m message [1;34mto[0m [32m"She said \"hello\""[0m
```

**String interpolation** with `{variable}` inside quoted strings:

```ansi
[1;34mset[0m name [1;34mto[0m [32m"World"[0m
[1;34mset[0m msg [1;34mto[0m [32m"Hello {name}!"[0m
[1;34mshow[0m [36m.msg[0m
[90m-- Shows: Hello World![0m
```

**Triple-quoted strings** for multiline text:

```ansi
[1;34mset[0m poem [1;34mto[0m [32m"""roses are red
violets are blue"""[0m
[1;34mshow[0m [36m.poem[0m
```

**String concatenation** with `+`:

```ansi
[1;34mset[0m full [1;34mto[0m first [31m+[0m [32m" "[0m [31m+[0m last
[1;34mshow[0m ([36m.full[0m)
```

**Regex matching** with `matches`:

```ansi
[1;34mset[0m valid [1;34mto[0m [32m"hello123"[0m [1;34mmatches[0m [32m"[a-z]+[0-9]+"[0m
[1;34mshow[0m [36m.valid[0m
[90m-- Shows: true[0m
```

**String properties:**

```ansi
[1;34mput[0m hello world [1;34minto[0m [1;34mtext[0m
[1;34mshow[0m ([36m.text.upper[0m)       [90m-- HELLO WORLD[0m
[1;34mshow[0m ([36m.text.lower[0m)       [90m-- hello world[0m
[1;34mshow[0m ([36m.text.length[0m)      [90m-- 11[0m
[1;34mshow[0m ([36m.text.trim[0m)        [90m-- hello world[0m
[1;34mshow[0m ([36m.text.first[0m)       [90m-- h[0m
[1;34mshow[0m ([36m.text.last[0m)        [90m-- d[0m
```

**String indexing:**

```ansi
[1;34mset[0m letter [1;34mto[0m [1;34mtext[0m[36m.at[0m [33m3[0m       [90m-- l (1-based)[0m
[1;34mset[0m part [1;34mto[0m [1;34mtext[0m[36m.from[0m [33m1[0m [1;34mto[0m [33m5[0m  [90m-- hello[0m
```

### Output

`show` prints to the console. Use `.variable` for interpolation and `(expression)` for inline math.

```ansi
[1;34mput[0m [33m10[0m [1;34minto[0m x
[1;34mput[0m [33m20[0m [1;34minto[0m y
[1;34mshow[0m The value [1;34mof[0m x [1;34mis[0m [36m.x[0m
[1;34mshow[0m The sum [1;34mis[0m (x [31m+[0m y)
```

### Input

`ask` prompts the user and stores the answer in `it`.

```ansi
[1;34mput[0m [1;34mask[0m What [1;34mis[0m your name [1;34minto[0m name
[1;34mshow[0m Hello [36m.name[0m

[1;34mask[0m How old are you
[1;34mput[0m [1;34mit[0m [1;34minto[0m age
[1;34mshow[0m You are [36m.age[0m years old
```

### Comments

```ansi
[90m-- This is a single-line comment[0m

[90m---[0m
This [1;34mis[0m [1;34ma[0m
multi[31m-[0m[1;34mline[0m comment
[90m---[0m
```

### Arithmetic

```ansi
[1;34mset[0m sum [1;34mto[0m [33m10[0m [31m+[0m [33m3[0m          [90m-- 13[0m
[1;34mset[0m diff [1;34mto[0m [33m10[0m [31m-[0m [33m3[0m         [90m-- 7[0m
[1;34mset[0m product [1;34mto[0m [33m10[0m [31m*[0m [33m3[0m      [90m-- 30[0m
[1;34mset[0m quotient [1;34mto[0m [33m10[0m [31m/[0m [33m3[0m     [90m-- 3.333...[0m
[1;34mset[0m remainder [1;34mto[0m [33m10[0m [31m%[0m [33m3[0m    [90m-- 1[0m
[1;34mset[0m power [1;34mto[0m [33m2[0m [31m^[0m [33m8[0m         [90m-- 256[0m
[1;34mset[0m grouped [1;34mto[0m ([33m3[0m [31m+[0m [33m4[0m) [31m*[0m [33m2[0m [90m-- 14[0m
```

### Math Builtins

Access math functions through the `math` module:

```ansi
[1;34mset[0m x [1;34mto[0m [1;34mmath[0m[36m.round[0m [33m3.7[0m      [90m-- 4[0m
[1;34mset[0m x [1;34mto[0m [1;34mmath[0m[36m.floor[0m [33m3.7[0m      [90m-- 3[0m
[1;34mset[0m x [1;34mto[0m [1;34mmath[0m[36m.ceil[0m [33m3.2[0m       [90m-- 4[0m
[1;34mset[0m x [1;34mto[0m [1;34mmath[0m[36m.abs[0m ([33m-5[0m)       [90m-- 5[0m
[1;34mset[0m x [1;34mto[0m [1;34mmath[0m[36m.sqrt[0m [33m16[0m        [90m-- 4[0m
```

### Random

Generate random values:

```ansi
[90m-- Random integer in a range (inclusive)[0m
[1;34mset[0m roll [1;34mto[0m [1;34mrandom[0m [33m1[0m [1;34mto[0m [33m6[0m

[90m-- Random pick from a list[0m
[1;34mset[0m color [1;34mto[0m [1;34mrandom[0m [1;34mpick[0m [1;34mfrom[0m colors

[90m-- Random decimal between 0 and 1[0m
[1;34mset[0m chance [1;34mto[0m [1;34mrandom[0m [1;34mfloat[0m
```

### Formatted Numbers

Round numbers to a specific number of decimal places:

```ansi
[1;34mset[0m pi [1;34mto[0m [33m3.14159[0m
[1;34mset[0m short [1;34mto[0m pi [1;34mrounded[0m [1;34mto[0m [33m2[0m    [90m-- 3.14[0m
[1;34mshow[0m Pi [1;34mis[0m approximately (pi [1;34mrounded[0m [1;34mto[0m [33m3[0m)
```

Use `format` for explicit formatting:

```ansi
[1;34mset[0m x [1;34mto[0m [33m3.14159[0m
[1;34mset[0m result [1;34mto[0m x [1;34mformat[0m [33m2[0m [1;34mplaces[0m
[1;34mshow[0m [36m.result[0m
[90m-- Shows: 3.14[0m
```

### Comparison

Symbolic and English-style comparisons are both supported.

```ansi
[90m-- Symbolic[0m
[1;34mif[0m x [31m==[0m [33m10[0m ... [1;34mend[0m
[1;34mif[0m x [31m!=[0m [33m10[0m ... [1;34mend[0m
[1;34mif[0m x [31m>[0m [33m10[0m  ... [1;34mend[0m
[1;34mif[0m x [31m<[0m [33m10[0m  ... [1;34mend[0m
[1;34mif[0m x [31m>=[0m [33m10[0m ... [1;34mend[0m
[1;34mif[0m x [31m<=[0m [33m10[0m ... [1;34mend[0m

[90m-- English[0m
[1;34mif[0m x [1;34mis[0m [33m10[0m ... [1;34mend[0m
[1;34mif[0m x [1;34mis[0m [1;34mnot[0m [33m10[0m ... [1;34mend[0m
[1;34mif[0m x [1;34mis[0m greater than [33m10[0m ... [1;34mend[0m
[1;34mif[0m x [1;34mis[0m less than [33m10[0m ... [1;34mend[0m
```

### Type Checking

Check the type of a value at runtime:

```ansi
[1;34mif[0m x [1;34mis[0m [1;34ma[0m number
  [1;34mshow[0m x [1;34mis[0m [1;34ma[0m number
[1;34mend[0m

[1;34mif[0m name [1;34mis[0m [1;34ma[0m [1;34mtext[0m
  [1;34mshow[0m name [1;34mis[0m [1;34mtext[0m
[1;34mend[0m

[1;34mif[0m items [1;34mis[0m [1;34ma[0m [1;34mlist[0m
  [1;34mshow[0m items [1;34mis[0m [1;34ma[0m [1;34mlist[0m
[1;34mend[0m

[1;34mif[0m x [1;34mis[0m [1;34mnot[0m [1;34ma[0m boolean
  [1;34mshow[0m x [1;34mis[0m [1;34mnot[0m [1;34ma[0m boolean
[1;34mend[0m
```

Supported types: `number`, `text`, `list`, `map`, `boolean`, `nothing`, `pair`, `set`, `enum`, `lambda`.

### Logic

```ansi
[1;34mif[0m x [31m>[0m [33m0[0m [1;34mand[0m x [31m<[0m [33m100[0m
  [1;34mshow[0m In range
[1;34mend[0m

[1;34mif[0m name [1;34mis[0m Alice [1;34mor[0m name [1;34mis[0m Bob
  [1;34mshow[0m Welcome back
[1;34mend[0m

[1;34mif[0m [1;34mnot[0m active
  [1;34mshow[0m Inactive
[1;34mend[0m
```

### Conditionals

```ansi
[1;34mput[0m [33m85[0m [1;34minto[0m score

[1;34mif[0m score [31m>=[0m [33m90[0m
  [1;34mshow[0m Grade: A
[1;34melse[0m [1;34mif[0m score [31m>=[0m [33m80[0m
  [1;34mshow[0m Grade: B
[1;34melse[0m [1;34mif[0m score [31m>=[0m [33m70[0m
  [1;34mshow[0m Grade: C
[1;34melse[0m
  [1;34mshow[0m Grade: F
[1;34mend[0m
```

### When Blocks (Pattern Matching)

Match a value against multiple cases:

```ansi
[1;34mset[0m day [1;34mto[0m [32m"Monday"[0m

[1;34mwhen[0m day
[1;34mis[0m Monday
  [1;34mshow[0m Start [1;34mof[0m [1;34mthe[0m work week
[1;34mis[0m Friday
  [1;34mshow[0m Almost [1;34mthe[0m weekend[31m![0m
[1;34mis[0m Saturday
  [1;34mshow[0m Weekend[31m![0m
[1;34mis[0m Sunday
  [1;34mshow[0m Weekend[31m![0m
[1;34melse[0m
  [1;34mshow[0m Regular day
[1;34mend[0m
```

**Or fallthrough** — match multiple values in a single case:

```ansi
[1;34mset[0m x [1;34mto[0m [33m2[0m

[1;34mwhen[0m x
  [1;34mis[0m [33m1[0m [1;34mor[0m [33m2[0m
    [1;34mshow[0m one [1;34mor[0m two
  [1;34mis[0m [33m3[0m
    [1;34mshow[0m three
[1;34mend[0m
```

### Loops

**Repeat N times:**

```ansi
[1;34mrepeat[0m [33m5[0m [1;34mtimes[0m
  [1;34mshow[0m Hello[31m![0m
[1;34mend[0m
```

**Repeat with counter:**

```ansi
[1;34mrepeat[0m [33m5[0m [1;34mtimes[0m [1;34mwith[0m i
  [1;34mshow[0m Iteration [36m.i[0m
[1;34mend[0m
[90m-- i goes from 1 to 5[0m
```

**While / Until:**

```ansi
[1;34mput[0m [33m1[0m [1;34minto[0m n
[1;34mrepeat[0m [1;34mwhile[0m n [31m<=[0m [33m10[0m
  [1;34mshow[0m [36m.n[0m
  [1;34mset[0m n [1;34mto[0m n [31m+[0m [33m1[0m
[1;34mend[0m

[1;34mput[0m [33m0[0m [1;34minto[0m count
[1;34mrepeat[0m [1;34muntil[0m count [31m==[0m [33m5[0m
  [1;34mset[0m count [1;34mto[0m count [31m+[0m [33m1[0m
[1;34mend[0m
```

**Forever (with stop):**

```ansi
[1;34mput[0m [33m0[0m [1;34minto[0m n
[1;34mrepeat[0m [1;34mforever[0m
  [1;34mset[0m n [1;34mto[0m n [31m+[0m [33m1[0m
  [1;34mif[0m n [31m>[0m [33m10[0m
    [1;34mstop[0m
  [1;34mend[0m
[1;34mend[0m
```

**For each:**

```ansi
[1;34mput[0m [1;34mlist[0m Red, Green, Blue [1;34minto[0m colors
[1;34mfor[0m [1;34meach[0m color [1;34min[0m colors
  [1;34mshow[0m [36m.color[0m
[1;34mend[0m
```

**For each with index:**

```ansi
[1;34mfor[0m [1;34meach[0m item [1;34mat[0m i [1;34min[0m items
  [1;34mshow[0m Item [36m.i[0m [1;34mis[0m [36m.item[0m
[1;34mend[0m
```

**Ranges:**

```ansi
[1;34mfor[0m [1;34meach[0m i [1;34min[0m [33m1[0m [1;34mto[0m [33m10[0m
  [1;34mshow[0m [36m.i[0m
[1;34mend[0m
```

**Step value** — skip items in a range:

```ansi
[1;34mfor[0m [1;34meach[0m i [1;34min[0m [33m1[0m [1;34mto[0m [33m10[0m [1;34mby[0m [33m3[0m
  [1;34mshow[0m [36m.i[0m
[1;34mend[0m
[90m-- Shows: 1, 4, 7, 10[0m
```

**Labeled loops** — break from outer loops:

```ansi
[1;34mrepeat[0m [33m5[0m [1;34mtimes[0m [1;34mas[0m outer
  [1;34mrepeat[0m [33m5[0m [1;34mtimes[0m [1;34mas[0m inner
    [1;34mif[0m something
      [1;34mstop[0m outer
    [1;34mend[0m
  [1;34mend[0m
[1;34mend[0m
```

### Lists

Create lists with the `list` keyword.

```ansi
[1;34mput[0m [1;34mlist[0m [33m10[0m, [33m50[0m, [33m80[0m, [33m90[0m, [33m30[0m [1;34minto[0m scores
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

```ansi
[1;34mput[0m [1;34mlist[0m [33m10[0m, [33m20[0m, [33m30[0m, [33m40[0m, [33m50[0m [1;34minto[0m nums
[1;34mshow[0m First [1;34mis[0m ([36m.nums.first[0m)
[1;34mshow[0m Last [1;34mis[0m ([36m.nums.last[0m)
[1;34mshow[0m Count [1;34mis[0m ([36m.nums.count[0m)
[1;34mshow[0m Sum [1;34mis[0m ([36m.nums.sum[0m)
[1;34mshow[0m Average [1;34mis[0m ([36m.nums.average[0m)
```

**Modify lists:**

```ansi
[1;34madd[0m [33m60[0m [1;34mto[0m nums
[1;34mremove[0m [33m10[0m [1;34mfrom[0m nums
[1;34msort[0m nums
[1;34mreverse[0m nums
[1;34mshuffle[0m nums
```

**Filter with `where`:**

```ansi
[1;34mput[0m [1;34mlist[0m [33m92[0m, [33m45[0m, [33m78[0m, [33m55[0m, [33m88[0m [1;34minto[0m scores
[1;34mset[0m passing [1;34mto[0m scores [1;34mwhere[0m [1;34mit[0m [31m>=[0m [33m70[0m
[1;34mshow[0m [36m.passing[0m
```

**Transform with `each`:**

```ansi
[1;34mput[0m [1;34mlist[0m [33m1[0m, [33m2[0m, [33m3[0m, [33m4[0m, [33m5[0m [1;34minto[0m nums
[1;34mset[0m scaled [1;34mto[0m nums [1;34meach[0m [1;34mit[0m [31m*[0m [33m10[0m
[1;34mshow[0m [36m.scaled[0m
```

**Check membership:**

```ansi
[1;34mif[0m scores [1;34mcontains[0m [33m100[0m
  [1;34mshow[0m Perfect score found[31m![0m
[1;34mend[0m
```

### Maps (Dictionaries)

Create key-value stores with `map`:

```ansi
[1;34mset[0m data [1;34mto[0m [1;34mmap[0m
[1;34mset[0m data[36m.name[0m [1;34mto[0m [32m"Alice"[0m
[1;34mset[0m data[36m.age[0m [1;34mto[0m [33m30[0m
[1;34mshow[0m ([36m.data.name[0m) [1;34mis[0m ([36m.data.age[0m) years old
```

**Map properties:**

| Property | Description |
|----------|-------------|
| `.count` | Number of entries |
| `.keys` | List of all keys |
| `.values` | List of all values |

```ansi
[1;34mshow[0m Keys: ([36m.data.keys[0m)
[1;34mshow[0m Count: ([36m.data.count[0m)
```

**Check and remove entries:**

```ansi
[1;34mif[0m data [1;34mcontains[0m [32m"name"[0m
  [1;34mshow[0m Has [1;34ma[0m name
[1;34mend[0m

[1;34mremove[0m [32m"age"[0m [1;34mfrom[0m data
```

### Pairs

A pair holds exactly two values:

```ansi
[1;34mset[0m p [1;34mto[0m [1;34mpair[0m [32m"hello"[0m [1;34mand[0m [32m"world"[0m
[1;34mshow[0m [36m.p[0m           [90m-- (hello, world)[0m
[1;34mshow[0m [36m.p.first[0m     [90m-- hello[0m
[1;34mshow[0m [36m.p.second[0m    [90m-- world[0m
```

### Sets

Sets are collections with no duplicate values. Create them with `unique`:

```ansi
[1;34mset[0m s [1;34mto[0m [1;34munique[0m [33m1[0m, [33m2[0m, [33m3[0m, [33m2[0m, [33m1[0m
[1;34mshow[0m [36m.s.count[0m     [90m-- 3 (duplicates removed)[0m
```

**Set properties:**

| Property | Description |
|----------|-------------|
| `.count` | Number of unique items |
| `.list` | Convert to a list |

```ansi
[1;34mif[0m s [1;34mcontains[0m [33m2[0m
  [1;34mshow[0m found
[1;34mend[0m

[1;34mfor[0m [1;34meach[0m item [1;34min[0m s
  [1;34mshow[0m [36m.item[0m
[1;34mend[0m
```

### Enums

Declare named constants with `enum`:

```ansi
[1;34menum[0m Color [1;34mis[0m red, green, blue
[1;34mshow[0m [36m.color[0m
[90m-- Shows: [Enum Color: red, green, blue][0m
```

### Map Literals with Entries

Create maps with initial key-value pairs inline:

```ansi
[1;34mset[0m m [1;34mto[0m [1;34mmap[0m name: [32m"Alice"[0m, age: [33m25[0m
[1;34mshow[0m [36m.m.name[0m   [90m-- Alice[0m
[1;34mshow[0m [36m.m.age[0m    [90m-- 25[0m
```

### Destructuring

Unpack lists and pairs into individual variables:

```ansi
[1;34mset[0m data [1;34mto[0m [1;34mlist[0m [33m10[0m, [33m20[0m, [33m30[0m
[1;34mset[0m [1;34ma[0m, b, c [1;34mfrom[0m data
[1;34mshow[0m [36m.a[0m   [90m-- 10[0m
[1;34mshow[0m [36m.b[0m   [90m-- 20[0m
[1;34mshow[0m [36m.c[0m   [90m-- 30[0m

[1;34mset[0m p [1;34mto[0m [1;34mpair[0m [32m"x"[0m [1;34mand[0m [32m"y"[0m
[1;34mset[0m first, second [1;34mfrom[0m p
```

### Exists Check

Check if a variable has been defined:

```ansi
[1;34mset[0m x [1;34mto[0m [33m5[0m
[1;34mif[0m x [1;34mexists[0m
  [1;34mshow[0m x [1;34mis[0m defined
[1;34mend[0m
```

### Kinds (Classes)

Define object types with `kind`. Fields use `is` for default values. Methods use `on`.

```ansi
[1;34mkind[0m Dog
  name [1;34mis[0m Unknown
  energy [1;34mis[0m [33m100[0m

  [1;34mon[0m bark
    [1;34mshow[0m [36m.me.name[0m says Woof[31m![0m
  [1;34mend[0m

  [1;34mon[0m run
    [1;34mset[0m [1;34mme[0m[36m.energy[0m [1;34mto[0m [1;34mme[0m[36m.energy[0m [31m-[0m [33m10[0m
    [1;34mshow[0m [36m.me.name[0m runs[31m![0m Energy: [36m.me.energy[0m
  [1;34mend[0m
[1;34mend[0m

[1;34mmake[0m [1;34ma[0m Dog [1;34mcalled[0m rex [1;34mwith[0m name Rex
[1;34msend[0m bark [1;34mto[0m rex
[1;34msend[0m run [1;34mto[0m rex
```

### Inheritance

Use `from` to inherit fields and methods from a parent kind.

```ansi
[1;34mkind[0m Animal
  name [1;34mis[0m Unknown
  [1;34msound[0m [1;34mis[0m ...

  [1;34mon[0m speak
    [1;34mshow[0m [36m.me.name[0m says [36m.me.sound[0m
  [1;34mend[0m
[1;34mend[0m

[1;34mkind[0m Dog [1;34mfrom[0m Animal
  [1;34msound[0m [1;34mis[0m Woof
  tricks [1;34mis[0m [33m0[0m

  [1;34mon[0m learn
    [1;34mset[0m [1;34mme[0m[36m.tricks[0m [1;34mto[0m [1;34mme[0m[36m.tricks[0m [31m+[0m [33m1[0m
    [1;34mshow[0m [36m.me.name[0m learned trick number [36m.me.tricks[0m
  [1;34mend[0m
[1;34mend[0m

[1;34mmake[0m [1;34ma[0m Dog [1;34mcalled[0m rex [1;34mwith[0m name Rex
[1;34msend[0m speak [1;34mto[0m rex
[1;34msend[0m learn [1;34mto[0m rex
```

### Contracts (Interfaces)

Define a contract that kinds must implement:

```ansi
[1;34mcontract[0m Describable
  [1;34mmethod[0m describe
[1;34mend[0m

[1;34mkind[0m Dog [1;34mimplements[0m Describable
  name [1;34mis[0m [32m"Rex"[0m

  [1;34mon[0m describe
    [1;34mshow[0m I am [36m.me.name[0m
  [1;34mend[0m
[1;34mend[0m

[1;34mmake[0m Dog [1;34mcalled[0m d
[1;34msend[0m describe [1;34mto[0m d
```

### Secret (Private) Fields

Mark fields as private with `secret`:

```ansi
[1;34mkind[0m Account
  [1;34msecret[0m balance [1;34mis[0m [33m100[0m

  [1;34mon[0m getBalance
    [1;34mreturn[0m [1;34mme[0m[36m.balance[0m
  [1;34mend[0m
[1;34mend[0m

[1;34mmake[0m Account [1;34mcalled[0m [1;34ma[0m
[1;34mset[0m b [1;34mto[0m [1;34msend[0m getBalance [1;34mto[0m [1;34ma[0m
[1;34mshow[0m [36m.b[0m   [90m-- 100[0m
[90m-- Direct access from outside is prevented[0m
```

### Static Methods

Define methods on the kind itself, not on instances:

```ansi
[1;34mkind[0m MathHelper
  [1;34mstatic[0m [1;34mon[0m double x
    [1;34mreturn[0m x [31m*[0m [33m2[0m
  [1;34mend[0m
[1;34mend[0m
```

### Methods with Parameters

`on` handlers accept parameters after the method name.

```ansi
[1;34mkind[0m Calculator
  result [1;34mis[0m [33m0[0m

  [1;34mon[0m [1;34madd[0m n
    [1;34mset[0m [1;34mme[0m[36m.result[0m [1;34mto[0m [1;34mme[0m[36m.result[0m [31m+[0m n
  [1;34mend[0m

  [1;34mon[0m reset
    [1;34mput[0m [33m0[0m [1;34minto[0m [1;34mme[0m[36m.result[0m
  [1;34mend[0m
[1;34mend[0m

[1;34mmake[0m [1;34ma[0m Calculator [1;34mcalled[0m calc
[1;34msend[0m [1;34madd[0m [33m10[0m [1;34mto[0m calc
[1;34msend[0m [1;34madd[0m [33m25[0m [1;34mto[0m calc
[1;34mshow[0m ([36m.calc.result[0m)
```

### Commands (Functions)

Define reusable functions with `command`. Use `and` to separate multiple parameters.

```ansi
[1;34mcommand[0m greet someone
  [1;34mshow[0m Hello [36m.someone[0m
[1;34mend[0m

greet World

[1;34mcommand[0m [1;34madd[0m [1;34ma[0m [1;34mand[0m b
  [1;34mreturn[0m [1;34ma[0m [31m+[0m b
[1;34mend[0m

[1;34mset[0m result [1;34mto[0m [1;34madd[0m [33m10[0m [1;34mand[0m [33m25[0m
[1;34mshow[0m [36m.result[0m
```

### Guard Clause Returns

Return early from a command based on a condition:

```ansi
[1;34mcommand[0m [1;34mcheck[0m x
  [1;34mreturn[0m [32m"small"[0m [1;34mif[0m x [31m<[0m [33m10[0m
  [1;34mreturn[0m [32m"big"[0m
[1;34mend[0m

[1;34mshow[0m ([1;34mcheck[0m [33m5[0m)    [90m-- small[0m
[1;34mshow[0m ([1;34mcheck[0m [33m15[0m)   [90m-- big[0m
```

### Type Annotations

Add optional type annotations to command parameters:

```ansi
[1;34mcommand[0m [1;34madd[0m ([1;34ma[0m [1;34mas[0m number, b [1;34mas[0m number)
  [1;34mreturn[0m [1;34ma[0m [31m+[0m b
[1;34mend[0m
[1;34mshow[0m ([1;34madd[0m [33m3[0m, [33m4[0m)   [90m-- 7[0m
```

### Lambda Expressions

Create anonymous functions with `{ params -> body }`:

```ansi
[1;34mset[0m double [1;34mto[0m { x [31m->[0m x [31m*[0m [33m2[0m }
[1;34mshow[0m (double [33m5[0m)   [90m-- 10[0m

[1;34mset[0m factor [1;34mto[0m [33m3[0m
[1;34mset[0m mult [1;34mto[0m { x [31m->[0m x [31m*[0m factor }
[1;34mshow[0m (mult [33m4[0m)     [90m-- 12[0m
```

### Pipeline Operator

Chain values through a series of functions with `|`:

```ansi
[1;34mcommand[0m double x
  [1;34mreturn[0m x [31m*[0m [33m2[0m
[1;34mend[0m
[1;34mcommand[0m add1 x
  [1;34mreturn[0m x [31m+[0m [33m1[0m
[1;34mend[0m

[1;34mset[0m result [1;34mto[0m [33m5[0m [31m|[0m double [31m|[0m add1
[1;34mshow[0m [36m.result[0m   [90m-- 11[0m
```

### Curry (Partial Application)

Create a new function by fixing some arguments of an existing one:

```ansi
[1;34mcommand[0m [1;34madd[0m [1;34ma[0m, b
  [1;34mreturn[0m [1;34ma[0m [31m+[0m b
[1;34mend[0m

[1;34mset[0m add5 [1;34mto[0m [1;34mcurry[0m [1;34madd[0m [33m5[0m
[1;34mshow[0m (add5 [33m3[0m)   [90m-- 8[0m
```

### Compose

Combine two functions into one that applies them in sequence:

```ansi
[1;34mset[0m double [1;34mto[0m { x [31m->[0m x [31m*[0m [33m2[0m }
[1;34mset[0m inc [1;34mto[0m { x [31m->[0m x [31m+[0m [33m1[0m }
[1;34mset[0m doubleThenInc [1;34mto[0m [1;34mcompose[0m double, inc
[1;34mshow[0m (doubleThenInc [33m3[0m)   [90m-- 7[0m
```

### Templates

Declare reusable code templates:

```ansi
[1;34mtemplate[0m greeting name
  [1;34mshow[0m Hello [36m.name[0m
[1;34mend[0m
```

### Environment Variables

Read environment variables:

```ansi
[1;34mset[0m p [1;34mto[0m [1;34menv[0m [32m"PATH"[0m
[1;34mif[0m p [1;34mexists[0m
  [1;34mshow[0m has path
[1;34mend[0m
```

### Date and Time

Access current date/time values:

```ansi
[1;34mset[0m y [1;34mto[0m [1;34mcurrent[0m year
[1;34mset[0m t [1;34mto[0m [1;34mtoday[0m
[1;34mshow[0m [36m.y[0m
[1;34mshow[0m [36m.t[0m
```

### JSON and CSV Parsing

Parse data formats:

```ansi
[90m-- Parse JSON[0m
[1;34mset[0m raw [1;34mto[0m [32m"[1, 2, 3]"[0m
[1;34mset[0m data [1;34mto[0m [1;34mjson[0m raw
[1;34mshow[0m [36m.data.count[0m   [90m-- 3[0m

[90m-- Parse CSV[0m
[1;34mset[0m csv_data [1;34mto[0m [32m"name,age\nAlice,30"[0m
[1;34mset[0m rows [1;34mto[0m [1;34mcsv[0m csv_data
[1;34mshow[0m [36m.rows.count[0m   [90m-- 1 (data rows, first line is headers)[0m
```

### File I/O

Read and write files:

```ansi
[90m-- Write to a file[0m
[1;34mwrite[0m [32m"output.txt"[0m [1;34mwith[0m [32m"Hello, world!"[0m

[90m-- Append to a file[0m
[1;34mappend[0m [32m"log.txt"[0m [1;34mwith[0m [32m"New entry"[0m

[90m-- Read a file as text[0m
[1;34mset[0m content [1;34mto[0m [1;34mread[0m [32m"data.txt"[0m

[90m-- Read a file as a list of lines[0m
[1;34mset[0m lines [1;34mto[0m [1;34mread[0m [32m"data.txt"[0m [1;34mas[0m [1;34mlist[0m
```

### Imports

Import code from other `.say` files:

```ansi
[1;34muse[0m [32m"helpers.say"[0m
[1;34muse[0m [32m"utils/math.say"[0m
```

The imported file is executed, making its commands and kinds available.

### String Interpolation

Use `.variable` anywhere in `show` to insert a value. Use `.object.property` for nested access. Use `(expression)` for computed values.

```ansi
[1;34mput[0m HyperCode [1;34minto[0m lang
[1;34mput[0m [33m2026[0m [1;34minto[0m year
[1;34mshow[0m [36m.lang[0m was created [1;34min[0m [36m.year[0m
[1;34mshow[0m That was ([33m2026[0m [31m-[0m year) years ago
```

### Error Handling

**Basic try/or:**

```ansi
[1;34mtry[0m
  [1;34mmake[0m [1;34ma[0m Unicorn [1;34mcalled[0m sparkle
[1;34mor[0m
  [1;34mshow[0m Caught: Unicorn [1;34mkind[0m [1;34mdoes[0m [1;34mnot[0m [1;34mexist[0m
[1;34mend[0m
```

**Try/catch with error variable:**

```ansi
[1;34mtry[0m
  [1;34msend[0m fly [1;34mto[0m [35mnothing[0m
[1;34mcatch[0m err
  [1;34mshow[0m Error: ([36m.err.message[0m)
[1;34mend[0m

[1;34mshow[0m Program continues [1;34mafter[0m errors
```

### Testing

Define tests with `test` blocks and assertions with `check`.

```ansi
[1;34mcommand[0m double n
  [1;34mreturn[0m n [31m+[0m n
[1;34mend[0m

[1;34mtest[0m double works
  [1;34mset[0m result [1;34mto[0m double [33m5[0m
  [1;34mcheck[0m result [31m==[0m [33m10[0m
[1;34mend[0m

[1;34mtest[0m lists have correct count
  [1;34mput[0m [1;34mlist[0m [33m1[0m, [33m2[0m, [33m3[0m [1;34minto[0m nums
  [1;34mcheck[0m nums[36m.count[0m [31m==[0m [33m3[0m
[1;34mend[0m
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

```ansi
[1;34mcommand[0m fetch_data
  [1;34mreturn[0m [32m"real data"[0m
[1;34mend[0m
[1;34mmock[0m fetch_data [1;34mreturns[0m [32m"fake data"[0m
[1;34mshow[0m (fetch_data)   [90m-- fake data[0m
```

### Benchmark

Measure how long code takes to run:

```ansi
[1;34mbenchmark[0m [32m"sorting"[0m
  [1;34msort[0m big_list
[1;34mend[0m
[90m-- Shows: Benchmark "sorting": 12ms[0m
```

### Snapshot Testing

Save and verify values against snapshots:

```ansi
[1;34mset[0m x [1;34mto[0m [33m42[0m
[1;34msnapshot[0m x [1;34mas[0m [32m"my_value"[0m
```

### Turtle Graphics

Draw with Logo-style turtle commands:

```ansi
[1;34mforward[0m [33m100[0m
[1;34mturn[0m [1;34mright[0m [33m90[0m
[1;34mforward[0m [33m50[0m
[1;34mpen[0m [1;34mup[0m
[1;34mforward[0m [33m20[0m
[1;34mpen[0m [1;34mdown[0m
[1;34mforward[0m [33m50[0m
```

### Animation

Animate properties over time:

```ansi
[1;34manimate[0m ball[36m.x[0m [1;34mfrom[0m [33m0[0m [1;34mto[0m [33m100[0m [1;34mover[0m [33m500[0m
```

### Scene Switching

Switch between scenes in games/apps:

```ansi
[1;34mswitch[0m [1;34mscene[0m [32m"menu"[0m
```

### Inspect and Explain

Use `explain` for detailed info about a value. Use `?` for a quick inspection.

```ansi
[1;34mkind[0m Cat
  name [1;34mis[0m Unknown
  lives [1;34mis[0m [33m9[0m
[1;34mend[0m

[1;34mmake[0m [1;34ma[0m Cat [1;34mcalled[0m whiskers [1;34mwith[0m name Whiskers
[1;34mexplain[0m whiskers
```

### The `it` Variable

`it` holds the last input value or the current item in `where`/`each` expressions.

```ansi
[1;34mask[0m What [1;34mis[0m your favorite color
[1;34mshow[0m You said [36m.it[0m

[1;34mput[0m [1;34mlist[0m [33m1[0m, [33m2[0m, [33m3[0m, [33m4[0m, [33m5[0m [1;34minto[0m nums
[1;34mset[0m big [1;34mto[0m nums [1;34mwhere[0m [1;34mit[0m [31m>[0m [33m3[0m
[1;34mset[0m doubled [1;34mto[0m nums [1;34meach[0m [1;34mit[0m [31m*[0m [33m2[0m
```

### The `me` Keyword

Inside an `on` handler, `me` refers to the current instance.

```ansi
[1;34mkind[0m Counter
  value [1;34mis[0m [33m0[0m

  [1;34mon[0m increment
    [1;34mset[0m [1;34mme[0m[36m.value[0m [1;34mto[0m [1;34mme[0m[36m.value[0m [31m+[0m [33m1[0m
  [1;34mend[0m

  [1;34mon[0m report
    [1;34mshow[0m Count [1;34mis[0m [36m.me.value[0m
  [1;34mend[0m
[1;34mend[0m
```

### Graphics (Draw)

Draw shapes to a canvas. When running from the CLI, an SVG file is automatically saved.

```ansi
[1;34mdraw[0m [1;34mcircle[0m [1;34mat[0m [33m200[0m, [33m200[0m [1;34msize[0m [33m80[0m
[1;34mdraw[0m [1;34mrectangle[0m [1;34mat[0m [33m50[0m, [33m50[0m [1;34msize[0m [33m100[0m
[1;34mdraw[0m [1;34mline[0m [1;34mfrom[0m [33m0[0m, [33m400[0m [1;34mto[0m [33m400[0m, [33m0[0m
```

Supported shapes: `circle`, `rectangle`, `line`, `text`, `ellipse`, `triangle`, `star`.

### Sound

Play sounds (outputs descriptions in CLI mode):

```ansi
[1;34mplay[0m [1;34msound[0m [1;34mding[0m
```

### AI Integration (`think`)

Ask an AI a question (requires `ANTHROPIC_API_KEY` environment variable):

```ansi
[1;34mset[0m answer [1;34mto[0m [1;34mthink[0m [32m"What is the capital of France?"[0m
[1;34mshow[0m [36m.answer[0m

[1;34mput[0m [1;34mask[0m Ask [1;34mme[0m anything [1;34minto[0m question
[1;34mset[0m response [1;34mto[0m [1;34mthink[0m question
[1;34mshow[0m [36m.response[0m
```

### HTTP Fetch

Make HTTP requests and work with web data:

```ansi
[1;34mset[0m data [1;34mto[0m [1;34mfetch[0m [32m"https://api.example.com/data"[0m
[1;34mshow[0m [36m.data[0m
```

JSON responses are automatically converted to maps and lists.

### Web Server

Serve web pages from HyperCode:

```ansi
[1;34mserve[0m [1;34mon[0m [1;34mport[0m [33m8080[0m

[1;34mroute[0m [1;34mGET[0m [32m"/"[0m
  [1;34mrespond[0m [1;34mwith[0m [32m"<h1>Hello from HyperCode!</h1>"[0m
[1;34mend[0m

[1;34mroute[0m [1;34mGET[0m [32m"/about"[0m
  [1;34mrespond[0m [1;34mwith[0m [32m"<h1>About</h1><p>Made with HyperCode.</p>"[0m
[1;34mend[0m
```

### WebSocket Connections

Connect to WebSocket servers:

```ansi
[1;34mconnect[0m [32m"ws://localhost:8080"[0m [1;34mas[0m ws
```

### Emit Events

Emit events to listeners:

```ansi
[1;34memit[0m [32m"click"[0m
[1;34memit[0m [32m"message"[0m [1;34mwith[0m [32m"hello"[0m
```

### Cookies

Manage browser cookies:

```ansi
[1;34mcookie[0m [1;34mset[0m [32m"user"[0m [1;34mto[0m [32m"Alice"[0m
[1;34mshow[0m [36m.cookie_user[0m         [90m-- Alice[0m
[1;34mcookie[0m delete [32m"user"[0m
```

### CORS (Cross-Origin)

Allow cross-origin requests:

```ansi
[1;34mallow[0m [32m"https://example.com"[0m
```

### Streaming

Start a data stream:

```ansi
[1;34mstream[0m [32m"heartbeat"[0m
```

### Persistent Storage (`remember` / `recall`)

Store values that survive between program runs:

```ansi
[90m-- Save a value[0m
[1;34mremember[0m [32m"high_score"[0m [1;34mas[0m [33m100[0m

[90m-- Load it later (even after restarting)[0m
[1;34mset[0m best [1;34mto[0m [1;34mrecall[0m [32m"high_score"[0m
[1;34mshow[0m Best score: [36m.best[0m

[90m-- Delete a stored value[0m
[1;34mforget[0m [32m"high_score"[0m
```

### Packages (`grab`)

Import community packages:

```ansi
[1;34mgrab[0m [32m"colors"[0m
[1;34mgrab[0m [32m"trivia-api"[0m
```

Packages are loaded from `packages/<name>/index.say`.

### Concurrent Execution (`do together`)

Run multiple blocks of code at the same time:

```ansi
[1;34mdo[0m [1;34mtogether[0m
  [1;34mshow[0m Task [33m1[0m running
  [1;34mrepeat[0m [33m3[0m [1;34mtimes[0m
    [1;34mshow[0m Working [1;34mon[0m task [33m1...[0m
  [1;34mend[0m
[1;34mand[0m
  [1;34mshow[0m Task [33m2[0m running
  [1;34mrepeat[0m [33m3[0m [1;34mtimes[0m
    [1;34mshow[0m Working [1;34mon[0m task [33m2...[0m
  [1;34mend[0m
[1;34mend[0m
```

### Event Listeners

Listen for events and run code when they happen:

```ansi
[1;34mlisten[0m [1;34mfor[0m click [1;34mas[0m data
  [1;34mshow[0m Clicked: [36m.data[0m
[1;34mend[0m
```

### Timers (`every`)

Run code on a recurring interval:

```ansi
[1;34mevery[0m [33m2[0m [1;34mseconds[0m
  [1;34mshow[0m Tick[31m![0m
[1;34mend[0m
```

### Pattern Matching on Kinds

Match objects by their type in `when` blocks:

```ansi
[1;34mwhen[0m animal
[1;34mis[0m [1;34ma[0m Dog
  [1;34mshow[0m It[32m's a dog![0m
[1;34mis[0m [1;34ma[0m Bird
  [1;34mshow[0m It[32m's a bird![0m
[1;34melse[0m
  [1;34mshow[0m Unknown animal
[1;34mend[0m
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
| `|` | `value | fn1 | fn2` | Pipeline operator |
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

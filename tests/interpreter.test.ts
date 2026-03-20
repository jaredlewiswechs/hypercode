import { describe, it, expect } from 'vitest';
import { run, runTests } from '../src/index';

function collect(source: string): Promise<string[]> {
  const output: string[] = [];
  return run(source, { output: (text) => output.push(text) }).then(() => output);
}

describe('Interpreter - Values', () => {
  it('puts literal text', async () => {
    const output = await collect('put Hello World into greeting\nshow .greeting');
    expect(output).toEqual(['Hello World']);
  });

  it('put stores text even for keywords', async () => {
    const output = await collect('put true into answer\nshow .answer');
    expect(output).toEqual(['true']);
  });

  it('put stores text for nothing', async () => {
    const output = await collect('put nothing into label\nshow .label');
    expect(output).toEqual(['nothing']);
  });

  it('put stores numbers as text', async () => {
    const output = await collect('put 42 into jersey\nshow .jersey');
    expect(output).toEqual(['42']);
  });

  it('set evaluates expressions', async () => {
    const output = await collect('set total to 10 + 5\nshow .total');
    expect(output).toEqual(['15']);
  });

  it('set evaluates booleans', async () => {
    const output = await collect('set active to true\nshow .active');
    expect(output).toEqual(['true']);
  });

  it('set evaluates to nothing', async () => {
    const output = await collect('set pet to nothing\nshow .pet');
    expect(output).toEqual(['nothing']);
  });

  it('set resolves variables', async () => {
    const output = await collect('put Maya into name\nset backup to name\nshow .backup');
    expect(output).toEqual(['Maya']);
  });

  it('handles string interpolation in show', async () => {
    const output = await collect('put Maya into name\nset age to 14\nshow .name is .age years old');
    expect(output).toEqual(['Maya is 14 years old']);
  });

  it('handles expression interpolation in show', async () => {
    const output = await collect('set price to 10\nset tax to 2\nshow Total is (price + tax) dollars');
    expect(output).toEqual(['Total is 12 dollars']);
  });
});

describe('Interpreter - Math', () => {
  it('addition', async () => {
    const output = await collect('set r to 10 + 5\nshow .r');
    expect(output).toEqual(['15']);
  });

  it('subtraction', async () => {
    const output = await collect('set r to 10 - 5\nshow .r');
    expect(output).toEqual(['5']);
  });

  it('multiplication', async () => {
    const output = await collect('set r to 10 * 5\nshow .r');
    expect(output).toEqual(['50']);
  });

  it('division', async () => {
    const output = await collect('set r to 10 / 4\nshow .r');
    expect(output).toEqual(['2.5']);
  });

  it('modulo', async () => {
    const output = await collect('set r to 10 % 3\nshow .r');
    expect(output).toEqual(['1']);
  });

  it('exponent', async () => {
    const output = await collect('set r to 2 ^ 10\nshow .r');
    expect(output).toEqual(['1024']);
  });

  it('operator precedence', async () => {
    const output = await collect('set r to 2 + 3 * 4\nshow .r');
    expect(output).toEqual(['14']);
  });

  it('parenthesized expressions', async () => {
    const output = await collect('set r to (2 + 3) * 4\nshow .r');
    expect(output).toEqual(['20']);
  });
});

describe('Interpreter - If/Else', () => {
  it('true branch', async () => {
    const output = await collect('set age to 20\nif age >= 16\nshow You can drive\nend');
    expect(output).toEqual(['You can drive']);
  });

  it('false branch', async () => {
    const output = await collect('set age to 10\nif age >= 16\nshow You can drive\nelse\nshow Not yet\nend');
    expect(output).toEqual(['Not yet']);
  });

  it('else if chain', async () => {
    const output = await collect('set score to 85\nif score >= 90\nshow A\nelse if score >= 80\nshow B\nelse if score >= 70\nshow C\nelse\nshow F\nend');
    expect(output).toEqual(['B']);
  });

  it('comparison ==', async () => {
    const output = await collect('set x to 5\nif x == 5\nshow yes\nend');
    expect(output).toEqual(['yes']);
  });

  it('comparison !=', async () => {
    const output = await collect('set x to 5\nif x != 3\nshow yes\nend');
    expect(output).toEqual(['yes']);
  });

  it('english is comparison', async () => {
    const output = await collect('put Jared into name\nif name is Jared\nshow found\nend');
    expect(output).toEqual(['found']);
  });

  it('english is not comparison', async () => {
    const output = await collect('set x to 5\nif x is not 0\nshow nonzero\nend');
    expect(output).toEqual(['nonzero']);
  });

  it('and operator', async () => {
    const output = await collect('set x to 5\nif x > 0 and x < 10\nshow in range\nend');
    expect(output).toEqual(['in range']);
  });

  it('or operator', async () => {
    const output = await collect('set x to 15\nif x < 0 or x > 10\nshow out of range\nend');
    expect(output).toEqual(['out of range']);
  });

  it('not operator', async () => {
    const output = await collect('set done to false\nif not done\nshow working\nend');
    expect(output).toEqual(['working']);
  });
});

describe('Interpreter - Loops', () => {
  it('repeat N times', async () => {
    const output = await collect('set x to 0\nrepeat 5 times\nset x to x + 1\nend\nshow .x');
    expect(output).toEqual(['5']);
  });

  it('repeat while', async () => {
    const output = await collect('set x to 0\nrepeat while x < 3\nset x to x + 1\nend\nshow .x');
    expect(output).toEqual(['3']);
  });

  it('repeat until', async () => {
    const output = await collect('set x to 0\nrepeat until x == 3\nset x to x + 1\nend\nshow .x');
    expect(output).toEqual(['3']);
  });

  it('repeat forever with stop', async () => {
    const output = await collect('set x to 0\nrepeat forever\nset x to x + 1\nif x == 5\nstop\nend\nend\nshow .x');
    expect(output).toEqual(['5']);
  });

  it('for each in list', async () => {
    const output = await collect('set nums to list 1, 2, 3\nset total to 0\nfor each n in nums\nset total to total + n\nend\nshow .total');
    expect(output).toEqual(['6']);
  });

  it('for each with index', async () => {
    const output = await collect('set items to list A, B, C\nfor each item at i in items\nshow (.i)\nend');
    expect(output).toEqual(['1', '2', '3']);
  });

  it('for each in range', async () => {
    const output = await collect('set total to 0\nfor each i in 1 to 5\nset total to total + i\nend\nshow .total');
    expect(output).toEqual(['15']);
  });

  it('repeat with counter', async () => {
    const output = await collect('repeat 3 times with i\nshow (.i)\nend');
    expect(output).toEqual(['1', '2', '3']);
  });
});

describe('Interpreter - Lists', () => {
  it('creates inline list', async () => {
    const output = await collect('set nums to list 10, 20, 30\nshow .nums');
    expect(output).toEqual(['10, 20, 30']);
  });

  it('list first/last/count', async () => {
    const output = await collect('set nums to list 10, 20, 30\nshow (.nums.first)\nshow (.nums.last)\nshow (.nums.count)');
    expect(output).toEqual(['10', '30', '3']);
  });

  it('add to list', async () => {
    const output = await collect('set nums to list 1, 2\nadd 3 to nums\nshow (.nums.count)');
    expect(output).toEqual(['3']);
  });

  it('remove from list', async () => {
    const output = await collect('set nums to list 1, 2, 3\nremove 2 from nums\nshow .nums');
    expect(output).toEqual(['1, 3']);
  });

  it('sort list', async () => {
    const output = await collect('set nums to list 3, 1, 2\nsort nums\nshow .nums');
    expect(output).toEqual(['1, 2, 3']);
  });

  it('reverse list', async () => {
    const output = await collect('set nums to list 1, 2, 3\nreverse nums\nshow .nums');
    expect(output).toEqual(['3, 2, 1']);
  });

  it('list sum/average/max/min', async () => {
    const output = await collect('set nums to list 10, 20, 30\nshow (.nums.sum)\nshow (.nums.average)\nshow (.nums.max)\nshow (.nums.min)');
    expect(output).toEqual(['60', '20', '30', '10']);
  });

  it('list contains', async () => {
    const output = await collect('set students to list Maya, Jordan, Alex\nif students contains Maya\nshow Found\nend');
    expect(output).toEqual(['Found']);
  });

  it('where filter', async () => {
    const output = await collect('set scores to list 10, 50, 80, 90, 30\nset high to scores where it > 50\nshow .high');
    expect(output).toEqual(['80, 90']);
  });

  it('each map', async () => {
    const output = await collect('set nums to list 1, 2, 3\nset doubled to nums each it * 2\nshow .doubled');
    expect(output).toEqual(['2, 4, 6']);
  });
});

describe('Interpreter - Kinds and Objects', () => {
  it('defines kind and makes instance', async () => {
    const output = await collect(`
kind Person
  name is Unknown
  age is 0
end

make a Person called teacher
put Ms. Lopez into teacher.name
set teacher.age to 31
show .teacher.name
show .teacher.age
`);
    expect(output).toEqual(['Ms. Lopez', '31']);
  });

  it('calls method with send', async () => {
    const output = await collect(`
kind Dog
  name is Buddy

  on bark
    show Woof! I am .me.name
  end
end

make a Dog called rex
put Rex into rex.name
send bark to rex
`);
    expect(output).toEqual(['Woof! I am Rex']);
  });

  it('method with parameters', async () => {
    const output = await collect(`
kind Player
  name is Unknown
  score is 0

  on addPoints amount
    set me.score to me.score + amount
  end
end

make a Player called hero
put Maya into hero.name
set hero.score to 0
send addPoints 10 to hero
send addPoints 25 to hero
show .hero.score
`);
    expect(output).toEqual(['35']);
  });

  it('method with return', async () => {
    const output = await collect(`
kind Calculator
  on add a b
    return a + b
  end
end

make a Calculator called calc
set result to send add 5 3 to calc
show .result
`);
    expect(output[0]).toBe('8');
  });

  it('inheritance', async () => {
    const output = await collect(`
kind Animal
  name is Unknown

  on speak
    show ...
  end
end

kind Dog from Animal
  on speak
    show Woof from .me.name
  end
end

make a Dog called rex
put Rex into rex.name
send speak to rex
`);
    expect(output).toEqual(['Woof from Rex']);
  });

  it('make with inline props', async () => {
    const output = await collect(`
kind Person
  name is Unknown
  age is 0
end

make a Person called bob with name Bob, age 25
show .bob.name
show .bob.age
`);
    expect(output).toEqual(['Bob', '25']);
  });
});

describe('Interpreter - Commands', () => {
  it('defines and calls command', async () => {
    const output = await collect(`
command greet someone
  show Hello .someone
end

greet Jared
`);
    expect(output).toEqual(['Hello Jared']);
  });

  it('command with return value', async () => {
    const output = await collect(`
command add a and b
  return a + b
end

set result to add 5 and 3
show .result
`);
    expect(output[0]).toBe('8');
  });

  it('command with multiple params', async () => {
    const output = await collect(`
command multiply a and b
  return a * b
end

set result to multiply 6 and 7
show .result
`);
    expect(output[0]).toBe('42');
  });
});

describe('Interpreter - Error Handling', () => {
  it('try/or catches errors', async () => {
    const output = await collect(`
try
  set x to nothing
  show .x.nonexistent.deep
or
  show Caught an error
end
`);
    expect(output.length).toBeGreaterThanOrEqual(1);
  });

  it('try/catch with variable', async () => {
    const source = `
try
  put hello into x
  make a NonExistent called y
catch error
  show Got error
end
`;
    const output = await collect(source);
    expect(output).toEqual(['Got error']);
  });
});

describe('Interpreter - Dot Access', () => {
  it('nested dot access', async () => {
    const output = await collect(`
kind Person
  name is Unknown
  grade is 0
end

make a Person called student
put Maya into student.name
set student.grade to 9
show .student.name
show .student.grade
`);
    expect(output).toEqual(['Maya', '9']);
  });

  it('auto-creates nested objects', async () => {
    const output = await collect(`
put Maya into student.name
set student.grade to 9
show .student.name
show .student.grade
`);
    expect(output).toEqual(['Maya', '9']);
  });
});

describe('Interpreter - Ask', () => {
  it('captures input into it', async () => {
    const output: string[] = [];
    await run('ask What is your name\nshow .it', {
      output: (text) => output.push(text),
      input: () => 'Jared',
    });
    expect(output).toEqual(['Jared']);
  });

  it('put ask into variable', async () => {
    const output: string[] = [];
    await run('put ask What is your name into name\nshow Hello .name', {
      output: (text) => output.push(text),
      input: () => 'Maya',
    });
    expect(output).toEqual(['Hello Maya']);
  });
});

describe('Interpreter - Inspect', () => {
  it('inspects a number', async () => {
    const output = await collect('set x to 42\nx?');
    expect(output[0]).toContain('42');
  });

  it('inspects a list', async () => {
    const output = await collect('set nums to list 1, 2, 3\nnums?');
    expect(output[0]).toContain('List');
    expect(output[0]).toContain('count: 3');
  });

  it('inspects an instance', async () => {
    const output = await collect(`
kind Person
  name is Unknown
  age is 0
end

make a Person called bob
put Bob into bob.name
bob?
`);
    expect(output[0]).toContain('Person');
    expect(output[0]).toContain('Bob');
  });
});

describe('Interpreter - Tests (say test)', () => {
  it('runs passing tests', async () => {
    const source = `
command add a and b
  return a + b
end

test addition
  check add 2 and 2 == 4
  check add 0 and 0 == 0
end
`;
    const results = await runTests(source);
    expect(results).toHaveLength(1);
    expect(results[0].passed).toBe(true);
    expect(results[0].name).toBe('addition');
  });

  it('runs failing tests', async () => {
    const source = `
test bad math
  check 2 + 2 == 5
end
`;
    const results = await runTests(source);
    expect(results).toHaveLength(1);
    expect(results[0].passed).toBe(false);
  });

  it('runs multiple tests', async () => {
    const source = `
test one
  check 1 == 1
end

test two
  check 2 == 2
end

test three fails
  check 1 == 2
end
`;
    const results = await runTests(source);
    expect(results).toHaveLength(3);
    expect(results[0].passed).toBe(true);
    expect(results[1].passed).toBe(true);
    expect(results[2].passed).toBe(false);
  });
});

describe('Interpreter - Full Programs', () => {
  it('grade calculator', async () => {
    const output = await collect(`
set score to 85

if score >= 90
  show A
else if score >= 80
  show B
else if score >= 70
  show C
else
  show F
end
`);
    expect(output).toEqual(['B']);
  });

  it('counter with loop', async () => {
    const output = await collect(`
set sum to 0
for each i in 1 to 5
  set sum to sum + i
end
show .sum
`);
    expect(output).toEqual(['15']);
  });

  it('list operations pipeline', async () => {
    const output = await collect(`
set scores to list 10, 50, 80, 90, 30, 95, 60
set high to scores where it >= 80
show .high
show (.high.count)
show (.high.average)
`);
    expect(output).toEqual(['80, 90, 95', '3', '88.33333333333333']);
  });

  it('classroom example', async () => {
    const output = await collect(`
kind Student
  name is Unknown
  grade is 0

  on passing
    return me.grade >= 70
  end
end

make a Student called alice with name Alice, grade 95
make a Student called bob with name Bob, grade 60

set alicePassing to send passing to alice
set bobPassing to send passing to bob

if alicePassing
  show Alice is passing
end

if bobPassing
  show Bob is passing
else
  show Bob needs help
end
`);
    expect(output).toEqual(['Alice is passing', 'Bob needs help']);
  });
});

describe('Interpreter - Comments', () => {
  it('ignores single-line comments', async () => {
    const output = await collect('-- this is a comment\nset x to 5\nshow .x -- inline comment');
    expect(output).toEqual(['5']);
  });

  it('ignores multi-line comments', async () => {
    const output = await collect('set x to 5\n---\nthis is\na comment\n---\nshow .x');
    expect(output).toEqual(['5']);
  });
});

describe('Interpreter - Edge Cases', () => {
  it('empty program', async () => {
    const output = await collect('');
    expect(output).toEqual([]);
  });

  it('only comments', async () => {
    const output = await collect('-- just a comment');
    expect(output).toEqual([]);
  });

  it('reassignment', async () => {
    const output = await collect('set x to 1\nset x to 2\nshow .x');
    expect(output).toEqual(['2']);
  });

  it('division by zero returns 0', async () => {
    const output = await collect('set r to 10 / 0\nshow .r');
    expect(output).toEqual(['0']);
  });

  it('max iterations prevents infinite loops', async () => {
    await expect(collect('repeat forever\nshow loop\nend')).rejects.toThrow('Maximum iterations exceeded');
  });
});

// ---- New Feature Tests ----

describe('Feature 1: put/set split', () => {
  it('put stores literal text', async () => {
    const output = await collect('put Hello World into greeting\nshow .greeting');
    expect(output).toEqual(['Hello World']);
  });

  it('put stores true as string', async () => {
    const output = await collect('put true into answer\nshow .answer');
    expect(output).toEqual(['true']);
  });

  it('put stores nothing as string', async () => {
    const output = await collect('put nothing into label\nshow .label');
    expect(output).toEqual(['nothing']);
  });

  it('put stores 42 as string', async () => {
    const output = await collect('put 42 into jersey\nshow .jersey');
    expect(output).toEqual(['42']);
  });

  it('set evaluates arithmetic', async () => {
    const output = await collect('set score to 50 + 25\nshow .score');
    expect(output).toEqual(['75']);
  });

  it('set evaluates boolean true', async () => {
    const output = await collect('set active to true\nif active\nshow yes\nend');
    expect(output).toEqual(['yes']);
  });

  it('set evaluates list', async () => {
    const output = await collect('set items to list 1, 2, 3\nshow (.items.count)');
    expect(output).toEqual(['3']);
  });

  it('set to dot path', async () => {
    const output = await collect(`
kind Player
  health is 0
end
make a Player called hero
set hero.health to 100
show .hero.health
`);
    expect(output).toEqual(['100']);
  });
});

describe('Feature 2: String concatenation with +', () => {
  it('concatenates strings with +', async () => {
    const output = await collect('put Hello into a\nput World into b\nset c to a + " " + b\nshow .c');
    expect(output).toEqual(['Hello World']);
  });

  it('adds numbers with +', async () => {
    const output = await collect('set x to 10\nset y to 20\nset z to x + y\nshow .z');
    expect(output).toEqual(['30']);
  });

  it('put strings concatenate as strings', async () => {
    const output = await collect('put 5 into s\nset result to s + s\nshow .result');
    expect(output).toEqual(['55']);
  });

  it('set numbers add as numbers', async () => {
    const output = await collect('set n to 5\nset result to n + n\nshow .result');
    expect(output).toEqual(['10']);
  });
});

describe('Feature 3: Dictionary/Map', () => {
  it('creates and accesses map', async () => {
    const output = await collect('set scores to map\nset scores.math to 95\nset scores.english to 88\nshow .scores.math');
    expect(output).toEqual(['95']);
  });

  it('map count', async () => {
    const output = await collect('set scores to map\nset scores.math to 95\nset scores.english to 88\nshow (.scores.count)');
    expect(output).toEqual(['2']);
  });

  it('map keys', async () => {
    const output = await collect('set data to map\nset data.x to 1\nset data.y to 2\nshow .data.keys');
    expect(output).toEqual(['x, y']);
  });

  it('remove from map', async () => {
    const output = await collect('set scores to map\nset scores.math to 95\nset scores.english to 88\nremove "math" from scores\nshow (.scores.count)');
    expect(output).toEqual(['1']);
  });

  it('map contains key', async () => {
    const output = await collect('set scores to map\nset scores.math to 95\nif scores contains "math"\nshow found\nend');
    expect(output).toEqual(['found']);
  });
});

describe('Feature 4: Math builtins', () => {
  it('math.round', async () => {
    const output = await collect('set r to math.round 3.7\nshow .r');
    expect(output).toEqual(['4']);
  });

  it('math.floor', async () => {
    const output = await collect('set f to math.floor 3.7\nshow .f');
    expect(output).toEqual(['3']);
  });

  it('math.ceil', async () => {
    const output = await collect('set c to math.ceil 3.2\nshow .c');
    expect(output).toEqual(['4']);
  });

  it('math.abs', async () => {
    const output = await collect('set a to math.abs (-5)\nshow .a');
    expect(output).toEqual(['5']);
  });

  it('math.sqrt', async () => {
    const output = await collect('set s to math.sqrt 16\nshow .s');
    expect(output).toEqual(['4']);
  });

  it('math.power', async () => {
    const output = await collect('set p to 2 ^ 8\nshow .p');
    expect(output).toEqual(['256']);
  });

  it('math.pi exists', async () => {
    const output = await collect('show (math.pi)');
    expect(parseFloat(output[0])).toBeCloseTo(Math.PI);
  });
});

describe('Feature 5: Random', () => {
  it('random range returns integer in range', async () => {
    const output = await collect('set roll to random 1 to 6\nshow .roll');
    const val = parseInt(output[0]);
    expect(val).toBeGreaterThanOrEqual(1);
    expect(val).toBeLessThanOrEqual(6);
  });

  it('random float returns 0..1', async () => {
    const output = await collect('set val to random\nshow .val');
    const val = parseFloat(output[0]);
    expect(val).toBeGreaterThanOrEqual(0);
    expect(val).toBeLessThan(1);
  });

  it('random pick from list', async () => {
    const output = await collect('set items to list 10, 20, 30\nset picked to random pick from items\nshow .picked');
    const val = parseInt(output[0]);
    expect([10, 20, 30]).toContain(val);
  });
});

describe('Feature 6: String indexing', () => {
  it('string .at', async () => {
    const output = await collect('put Hello into word\nset letter to word.at 1\nshow .letter');
    expect(output).toEqual(['H']);
  });

  it('string .first and .last', async () => {
    const output = await collect('put Hello into word\nshow .word.first\nshow .word.last');
    expect(output).toEqual(['H', 'o']);
  });

  it('string .length', async () => {
    const output = await collect('put Hello into word\nshow (.word.length)');
    expect(output).toEqual(['5']);
  });

  it('string .from N to M', async () => {
    const output = await collect('put Hello World into word\nset piece to word.from 1 to 5\nshow .piece');
    expect(output).toEqual(['Hello']);
  });

  it('string .upper and .lower', async () => {
    const output = await collect('put Hello into word\nshow .word.upper\nshow .word.lower');
    expect(output).toEqual(['HELLO', 'hello']);
  });
});

describe('Feature 7: Type checking', () => {
  it('is a number', async () => {
    const output = await collect('set x to 42\nif x is a number\nshow yes\nend');
    expect(output).toEqual(['yes']);
  });

  it('is a text', async () => {
    const output = await collect('put hello into y\nif y is a text\nshow yes\nend');
    expect(output).toEqual(['yes']);
  });

  it('is a list', async () => {
    const output = await collect('set items to list 1, 2, 3\nif items is a list\nshow yes\nend');
    expect(output).toEqual(['yes']);
  });

  it('is a map', async () => {
    const output = await collect('set data to map\nif data is a map\nshow yes\nend');
    expect(output).toEqual(['yes']);
  });

  it('is nothing', async () => {
    const output = await collect('set z to nothing\nif z is nothing\nshow yes\nend');
    expect(output).toEqual(['yes']);
  });

  it('is not a text', async () => {
    const output = await collect('set x to 42\nif x is not a text\nshow yes\nend');
    expect(output).toEqual(['yes']);
  });

  it('is a Kind', async () => {
    const output = await collect(`
kind Dog
  name is Buddy
end
make a Dog called rex
if rex is a Dog
  show yes
end
`);
    expect(output).toEqual(['yes']);
  });
});

describe('Feature 8: Repeat with counter', () => {
  it('counter is 1-based', async () => {
    const output = await collect('repeat 5 times with i\nshow (.i)\nend');
    expect(output).toEqual(['1', '2', '3', '4', '5']);
  });

  it('repeat without counter still works', async () => {
    const output = await collect('set count to 0\nrepeat 3 times\nset count to count + 1\nend\nshow .count');
    expect(output).toEqual(['3']);
  });
});

describe('Feature 9: When blocks', () => {
  it('matches first case', async () => {
    const output = await collect(`
set grade to "A"
when grade
  is "A"
    show Excellent
  is "B"
    show Good
  else
    show Keep trying
end
`);
    expect(output).toEqual(['Excellent']);
  });

  it('matches later case', async () => {
    const output = await collect(`
set x to 3
when x
  is 1
    show One
  is 2
    show Two
  is 3
    show Three
end
`);
    expect(output).toEqual(['Three']);
  });

  it('falls through to else', async () => {
    const output = await collect(`
set x to 99
when x
  is 1
    show One
  else
    show Other
end
`);
    expect(output).toEqual(['Other']);
  });
});

describe('Feature 10: Rounded to', () => {
  it('rounds to 2 decimal places', async () => {
    const output = await collect('set pi to math.pi\nset short to pi rounded to 2\nshow .short');
    expect(output).toEqual(['3.14']);
  });

  it('rounds to 0 decimal places', async () => {
    const output = await collect('set whole to 3.7 rounded to 0\nshow .whole');
    expect(output).toEqual(['4']);
  });
});

describe('Feature 11: Quoted string literals', () => {
  it('string literal in expression', async () => {
    const output = await collect('set greeting to "Hello World"\nshow .greeting');
    expect(output).toEqual(['Hello World']);
  });

  it('escape sequences', async () => {
    const output = await collect('set msg to "line1\\nline2"\nshow .msg');
    expect(output).toEqual(['line1\nline2']);
  });
});

describe('Feature 12: File I/O and Imports', () => {
  it('read and write files', async () => {
    const fs: Record<string, string> = {};
    const output: string[] = [];
    await run(`
write "test.txt" with "Hello World"
set content to read "test.txt"
show .content
`, {
      output: (text) => output.push(text),
      writeFile: (path, content) => { fs[path] = content; },
      readFile: (path) => { if (fs[path] !== undefined) return fs[path]; throw new Error('File not found'); },
    });
    expect(output).toEqual(['Hello World']);
  });

  it('read as list', async () => {
    const output: string[] = [];
    await run(`
set lines to read "data.txt" as list
show (.lines.count)
`, {
      output: (text) => output.push(text),
      readFile: () => 'line1\nline2\nline3',
    });
    expect(output).toEqual(['3']);
  });

  it('append to file', async () => {
    const fs: Record<string, string> = { 'out.txt': 'first' };
    const output: string[] = [];
    await run(`
append "out.txt" with "\\nsecond"
set content to read "out.txt"
show .content
`, {
      output: (text) => output.push(text),
      writeFile: (path, content) => { fs[path] = content; },
      appendFile: (path, content) => { fs[path] = (fs[path] || '') + content; },
      readFile: (path) => { if (fs[path] !== undefined) return fs[path]; throw new Error('File not found'); },
    });
    expect(output).toEqual(['first\nsecond']);
  });

  it('use imports commands from another file', async () => {
    const output: string[] = [];
    await run(`
use "helpers.say"
set result to double 5
show .result
`, {
      output: (text) => output.push(text),
      readFile: (path) => {
        if (path === 'helpers.say') return 'command double x\nreturn x * 2\nend';
        throw new Error('File not found');
      },
    });
    expect(output).toEqual(['10']);
  });
});

describe('Strict mode', () => {
  function collectStrict(source: string): Promise<string[]> {
    const output: string[] = [];
    return run(source, { output: (text) => output.push(text), strict: true }).then(() => output);
  }

  it('throws on undefined variable in set expression', async () => {
    await expect(collectStrict('set result to unknownVar + 1')).rejects.toThrow('Undefined variable "unknownVar"');
  });

  it('throws on undefined variable in if condition', async () => {
    await expect(collectStrict('if missingVar is 5\nshow yes\nend')).rejects.toThrow('Undefined variable "missingVar"');
  });

  it('allows defined variables in strict mode', async () => {
    const output = await collectStrict('put Maya into name\nset backup to name\nshow .backup');
    expect(output).toEqual(['Maya']);
  });

  it('non-strict mode preserves identifier-as-string fallback', async () => {
    const output = await collect('put Jared into name\nif name is Jared\nshow found\nend');
    expect(output).toEqual(['found']);
  });
});

describe('put with data structure keywords', () => {
  it('put map into creates empty map', async () => {
    const output = await collect('put map into data\nset data.name to Maya\nshow .data.name');
    expect(output).toEqual(['Maya']);
  });

  it('put pair creates a pair', async () => {
    const output = await collect('put pair 1 and 2 into p\nshow (.p.first)');
    expect(output).toEqual(['1']);
  });

  it('put unique into creates empty set', async () => {
    const output = await collect('put unique into s\nshow (.s.count)');
    expect(output).toEqual(['0']);
  });

  it('put unique list with items creates set', async () => {
    const output = await collect('put unique list 1, 2, 3 into s\nshow (.s.count)');
    expect(output).toEqual(['3']);
  });
});

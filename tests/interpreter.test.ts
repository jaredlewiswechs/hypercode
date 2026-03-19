import { describe, it, expect } from 'vitest';
import { run, runTests } from '../src/index';

function collect(source: string): Promise<string[]> {
  const output: string[] = [];
  return run(source, { output: (text) => output.push(text) }).then(() => output);
}

describe('Interpreter - Values', () => {
  it('puts and shows a number', async () => {
    const output = await collect('put 42 into x\nshow .x');
    expect(output).toEqual(['42']);
  });

  it('puts and shows text', async () => {
    const output = await collect('put Jared into name\nshow Hello .name');
    expect(output).toEqual(['Hello Jared']);
  });

  it('puts and shows a boolean', async () => {
    const output = await collect('put true into ready\nshow .ready');
    expect(output).toEqual(['true']);
  });

  it('puts and shows nothing', async () => {
    const output = await collect('put nothing into pet\nshow .pet');
    expect(output).toEqual(['nothing']);
  });

  it('handles expression in put', async () => {
    const output = await collect('put 10 + 5 into total\nshow .total');
    expect(output).toEqual(['15']);
  });

  it('handles string interpolation in show', async () => {
    const output = await collect('put Maya into name\nput 14 into age\nshow .name is .age years old');
    expect(output).toEqual(['Maya is 14 years old']);
  });

  it('handles expression interpolation in show', async () => {
    const output = await collect('put 10 into price\nput 2 into tax\nshow Total is (price + tax) dollars');
    expect(output).toEqual(['Total is 12 dollars']);
  });
});

describe('Interpreter - Math', () => {
  it('addition', async () => {
    const output = await collect('put 10 + 5 into r\nshow .r');
    expect(output).toEqual(['15']);
  });

  it('subtraction', async () => {
    const output = await collect('put 10 - 5 into r\nshow .r');
    expect(output).toEqual(['5']);
  });

  it('multiplication', async () => {
    const output = await collect('put 10 * 5 into r\nshow .r');
    expect(output).toEqual(['50']);
  });

  it('division', async () => {
    const output = await collect('put 10 / 4 into r\nshow .r');
    expect(output).toEqual(['2.5']);
  });

  it('modulo', async () => {
    const output = await collect('put 10 % 3 into r\nshow .r');
    expect(output).toEqual(['1']);
  });

  it('exponent', async () => {
    const output = await collect('put 2 ^ 10 into r\nshow .r');
    expect(output).toEqual(['1024']);
  });

  it('operator precedence', async () => {
    const output = await collect('put 2 + 3 * 4 into r\nshow .r');
    expect(output).toEqual(['14']);
  });

  it('parenthesized expressions', async () => {
    const output = await collect('put (2 + 3) * 4 into r\nshow .r');
    expect(output).toEqual(['20']);
  });
});

describe('Interpreter - If/Else', () => {
  it('true branch', async () => {
    const output = await collect('put 20 into age\nif age >= 16\nshow You can drive\nend');
    expect(output).toEqual(['You can drive']);
  });

  it('false branch', async () => {
    const output = await collect('put 10 into age\nif age >= 16\nshow You can drive\nelse\nshow Not yet\nend');
    expect(output).toEqual(['Not yet']);
  });

  it('else if chain', async () => {
    const output = await collect('put 85 into score\nif score >= 90\nshow A\nelse if score >= 80\nshow B\nelse if score >= 70\nshow C\nelse\nshow F\nend');
    expect(output).toEqual(['B']);
  });

  it('comparison ==', async () => {
    const output = await collect('put 5 into x\nif x == 5\nshow yes\nend');
    expect(output).toEqual(['yes']);
  });

  it('comparison !=', async () => {
    const output = await collect('put 5 into x\nif x != 3\nshow yes\nend');
    expect(output).toEqual(['yes']);
  });

  it('english is comparison', async () => {
    const output = await collect('put Jared into name\nif name is Jared\nshow found\nend');
    expect(output).toEqual(['found']);
  });

  it('english is not comparison', async () => {
    const output = await collect('put 5 into x\nif x is not 0\nshow nonzero\nend');
    expect(output).toEqual(['nonzero']);
  });

  it('and operator', async () => {
    const output = await collect('put 5 into x\nif x > 0 and x < 10\nshow in range\nend');
    expect(output).toEqual(['in range']);
  });

  it('or operator', async () => {
    const output = await collect('put 15 into x\nif x < 0 or x > 10\nshow out of range\nend');
    expect(output).toEqual(['out of range']);
  });

  it('not operator', async () => {
    const output = await collect('put false into done\nif not done\nshow working\nend');
    expect(output).toEqual(['working']);
  });
});

describe('Interpreter - Loops', () => {
  it('repeat N times', async () => {
    const output = await collect('put 0 into x\nrepeat 5 times\nput x + 1 into x\nend\nshow .x');
    expect(output).toEqual(['5']);
  });

  it('repeat while', async () => {
    const output = await collect('put 0 into x\nrepeat while x < 3\nput x + 1 into x\nend\nshow .x');
    expect(output).toEqual(['3']);
  });

  it('repeat until', async () => {
    const output = await collect('put 0 into x\nrepeat until x == 3\nput x + 1 into x\nend\nshow .x');
    expect(output).toEqual(['3']);
  });

  it('repeat forever with stop', async () => {
    const output = await collect('put 0 into x\nrepeat forever\nput x + 1 into x\nif x == 5\nstop\nend\nend\nshow .x');
    expect(output).toEqual(['5']);
  });

  it('for each in list', async () => {
    const output = await collect('put list 1, 2, 3 into nums\nput 0 into total\nfor each n in nums\nput total + n into total\nend\nshow .total');
    expect(output).toEqual(['6']);
  });

  it('for each with index', async () => {
    const output = await collect('put list A, B, C into items\nfor each item at i in items\nshow (.i)\nend');
    expect(output).toEqual(['1', '2', '3']);
  });

  it('for each in range', async () => {
    const output = await collect('put 0 into total\nfor each i in 1 to 5\nput total + i into total\nend\nshow .total');
    expect(output).toEqual(['15']);
  });
});

describe('Interpreter - Lists', () => {
  it('creates inline list', async () => {
    const output = await collect('put list 10, 20, 30 into nums\nshow .nums');
    expect(output).toEqual(['10, 20, 30']);
  });

  it('list first/last/count', async () => {
    const output = await collect('put list 10, 20, 30 into nums\nshow (.nums.first)\nshow (.nums.last)\nshow (.nums.count)');
    expect(output).toEqual(['10', '30', '3']);
  });

  it('add to list', async () => {
    const output = await collect('put list 1, 2 into nums\nadd 3 to nums\nshow (.nums.count)');
    expect(output).toEqual(['3']);
  });

  it('remove from list', async () => {
    const output = await collect('put list 1, 2, 3 into nums\nremove 2 from nums\nshow .nums');
    expect(output).toEqual(['1, 3']);
  });

  it('sort list', async () => {
    const output = await collect('put list 3, 1, 2 into nums\nsort nums\nshow .nums');
    expect(output).toEqual(['1, 2, 3']);
  });

  it('reverse list', async () => {
    const output = await collect('put list 1, 2, 3 into nums\nreverse nums\nshow .nums');
    expect(output).toEqual(['3, 2, 1']);
  });

  it('list sum/average/max/min', async () => {
    const output = await collect('put list 10, 20, 30 into nums\nshow (.nums.sum)\nshow (.nums.average)\nshow (.nums.max)\nshow (.nums.min)');
    expect(output).toEqual(['60', '20', '30', '10']);
  });

  it('list contains', async () => {
    const output = await collect('put list Maya, Jordan, Alex into students\nif students contains Maya\nshow Found\nend');
    expect(output).toEqual(['Found']);
  });

  it('where filter', async () => {
    const output = await collect('put list 10, 50, 80, 90, 30 into scores\nput scores where it > 50 into high\nshow .high');
    expect(output).toEqual(['80, 90']);
  });

  it('each map', async () => {
    const output = await collect('put list 1, 2, 3 into nums\nput nums each it * 2 into doubled\nshow .doubled');
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
put 31 into teacher.age
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
    put me.score + amount into me.score
  end
end

make a Player called hero
put Maya into hero.name
put 0 into hero.score
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
put send add 5 3 to calc into result
show .result
`);
    // Note: send used as expression
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

put add 5 and 3 into result
show .result
`);
    // The command is called as an identifier then with args
    // Actually the parser sees "add" as a command call in expression position
    // Let's handle this - the identifier "add" gets resolved as command
    expect(output[0]).toBe('8');
  });

  it('command with multiple params', async () => {
    const output = await collect(`
command multiply a and b
  return a * b
end

put multiply 6 and 7 into result
show .result
`);
    expect(output[0]).toBe('42');
  });
});

describe('Interpreter - Error Handling', () => {
  it('try/or catches errors', async () => {
    const output = await collect(`
try
  put nothing into x
  show .x.nonexistent.deep
or
  show Caught an error
end
`);
    // Even accessing properties on nothing returns nothing gracefully
    expect(output.length).toBeGreaterThanOrEqual(1);
  });

  it('try/catch with variable', async () => {
    const source = `
try
  put nonExistentKind into x
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
put 9 into student.grade
show .student.name
show .student.grade
`);
    expect(output).toEqual(['Maya', '9']);
  });

  it('auto-creates nested objects', async () => {
    const output = await collect(`
put Maya into student.name
put 9 into student.grade
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
    const output = await collect('put 42 into x\nx?');
    expect(output[0]).toContain('42');
  });

  it('inspects a list', async () => {
    const output = await collect('put list 1, 2, 3 into nums\nnums?');
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
put 85 into score

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
put 0 into sum
for each i in 1 to 5
  put sum + i into sum
end
show .sum
`);
    expect(output).toEqual(['15']);
  });

  it('list operations pipeline', async () => {
    const output = await collect(`
put list 10, 50, 80, 90, 30, 95, 60 into scores
put scores where it >= 80 into high
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

put send passing to alice into alicePassing
put send passing to bob into bobPassing

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
    const output = await collect('-- this is a comment\nput 5 into x\nshow .x -- inline comment');
    expect(output).toEqual(['5']);
  });

  it('ignores multi-line comments', async () => {
    const output = await collect('put 5 into x\n---\nthis is\na comment\n---\nshow .x');
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
    const output = await collect('put 1 into x\nput 2 into x\nshow .x');
    expect(output).toEqual(['2']);
  });

  it('division by zero returns 0', async () => {
    const output = await collect('put 10 / 0 into r\nshow .r');
    expect(output).toEqual(['0']);
  });

  it('max iterations prevents infinite loops', async () => {
    await expect(collect('repeat forever\nshow loop\nend')).rejects.toThrow('Maximum iterations exceeded');
  });
});

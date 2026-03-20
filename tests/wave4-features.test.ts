import { describe, it, expect } from 'vitest';
import { run, Interpreter, Lexer, Parser, InterpreterOptions, SayList, SayMap, SaySet, SayPair, SayEnum, SayLambda } from '../src/index';

function collect(source: string, options: InterpreterOptions = {}): Promise<string[]> {
  const output: string[] = [];
  return run(source, { output: (text) => output.push(text), ...options }).then(() => output);
}

// ============================================================
// DATA TYPES
// ============================================================

describe('Pairs', () => {
  it('creates a pair with pair keyword', async () => {
    const out = await collect('set p to pair 1 and 2\nshow .p');
    expect(out).toEqual(['(1, 2)']);
  });

  it('accesses pair first and second', async () => {
    const out = await collect('set p to pair "hello" and "world"\nshow .p.first\nshow .p.second');
    expect(out).toEqual(['hello', 'world']);
  });

  it('type checks pair', async () => {
    const out = await collect('set p to pair 1 and 2\nif p is a pair\n  show yes\nend');
    expect(out).toEqual(['yes']);
  });
});

describe('Sets', () => {
  it('creates a set with unique keyword', async () => {
    const out = await collect('set s to unique 1, 2, 3, 2, 1\nshow .s.count');
    expect(out).toEqual(['3']);
  });

  it('set has no duplicates', async () => {
    const out = await collect('set s to unique 5, 5, 5\nshow .s.count');
    expect(out).toEqual(['1']);
  });

  it('converts set to list', async () => {
    const out = await collect('set s to unique 3, 1, 2\nset l to s.list\nshow .l.count');
    expect(out).toEqual(['3']);
  });

  it('type checks set', async () => {
    const out = await collect('set s to unique 1, 2\nif s is a set\n  show yes\nend');
    expect(out).toEqual(['yes']);
  });
});

describe('Enums', () => {
  it('declares an enum', async () => {
    const out = await collect('enum Color is red, green, blue\nshow .color');
    expect(out).toEqual(['[Enum Color: red, green, blue]']);
  });

  it('type checks enum', async () => {
    const out = await collect('enum Color is red, green, blue\nif color is a enum\n  show yes\nend');
    expect(out).toEqual(['yes']);
  });
});

describe('Map literal with entries', () => {
  it('creates a map with key: value syntax', async () => {
    const out = await collect('set m to map name: "Alice", age: 25\nshow .m.name\nshow .m.age');
    expect(out).toEqual(['Alice', '25']);
  });
});

describe('Destructuring', () => {
  it('destructures a list', async () => {
    const out = await collect('set data to list 10, 20, 30\nset a, b, c from data\nshow .a\nshow .b\nshow .c');
    expect(out).toEqual(['10', '20', '30']);
  });

  it('destructures a pair', async () => {
    const out = await collect('set p to pair "x" and "y"\nset a, b from p\nshow .a\nshow .b');
    expect(out).toEqual(['x', 'y']);
  });
});

describe('Exists expression', () => {
  it('checks if variable exists', async () => {
    const out = await collect('set x to 5\nif x exists\n  show yes\nend');
    expect(out).toEqual(['yes']);
  });
});

// ============================================================
// STRING & TEXT
// ============================================================

describe('Interpolated strings', () => {
  it('interpolates variables in strings', async () => {
    const out = await collect('set name to "World"\nset msg to "Hello {name}!"\nshow .msg');
    expect(out).toEqual(['Hello World!']);
  });

  it('escapes braces with backslash', async () => {
    const out = await collect('set msg to "literal \\{brace}"\nshow .msg');
    expect(out).toEqual(['literal {brace}']);
  });
});

describe('Regex matching', () => {
  it('checks if string matches pattern', async () => {
    const out = await collect('set result to "hello123" matches "[a-z]+[0-9]+"\nshow .result');
    expect(out).toEqual(['true']);
  });

  it('returns false for non-match', async () => {
    const out = await collect('set result to "hello" matches "^[0-9]+$"\nshow .result');
    expect(out).toEqual(['false']);
  });
});

describe('Triple-quoted strings', () => {
  it('supports multiline strings', async () => {
    const out = await collect('set s to """line1\nline2"""\nshow .s');
    expect(out).toEqual(['line1\nline2']);
  });
});

describe('Format expression', () => {
  it('formats a number to decimal places', async () => {
    const out = await collect('set x to 3.14159\nset result to x format 2 places\nshow .result');
    expect(out).toEqual(['3.14']);
  });
});

// ============================================================
// CONTROL FLOW
// ============================================================

describe('Step in for-each loops', () => {
  it('iterates with step value', async () => {
    const out = await collect('for each i in 1 to 10 by 3\n  show .i\nend');
    expect(out).toEqual(['1', '4', '7', '10']);
  });
});

describe('Guard clause returns', () => {
  it('returns value if condition is true', async () => {
    const out = await collect('command check x\n  return "small" if x < 10\n  return "big"\nend\nshow (check 5)\nshow (check 15)');
    expect(out).toEqual(['small', 'big']);
  });
});

describe('Labeled loops', () => {
  it('breaks from labeled loop', async () => {
    const out = await collect('repeat 5 times as outer\n  show loop\n  stop outer\nend');
    expect(out).toEqual(['loop']);
  });
});

describe('Pipeline operator', () => {
  it('pipes value through functions', async () => {
    const out = await collect('command double x\n  return x * 2\nend\ncommand add1 x\n  return x + 1\nend\nset result to 5 | double | add1\nshow .result');
    expect(out).toEqual(['11']);
  });
});

// ============================================================
// OOP FEATURES
// ============================================================

describe('Contracts/Interfaces', () => {
  it('declares a contract', async () => {
    const out = await collect('contract Printable\n  method show\n  method describe\nend\nshow ok');
    expect(out).toEqual(['ok']);
  });
});

describe('Kind with implements', () => {
  it('declares kind that implements contract', async () => {
    const out = await collect('contract Describable\n  method describe\nend\nkind Dog implements Describable\n  name is "Rex"\n  on describe\n    show I am .me.name\n  end\nend\nmake Dog called d\nsend describe to d');
    expect(out).toEqual(['I am Rex']);
  });
});

describe('Secret/private fields', () => {
  it('declares kind with secret field', async () => {
    const out = await collect('kind Account\n  secret balance is 100\n  on getBalance\n    return me.balance\n  end\nend\nmake Account called a\nset b to send getBalance to a\nshow .b');
    expect(out).toEqual(['100']);
  });
});

describe('Static methods', () => {
  it('declares kind with static method', async () => {
    const out = await collect('kind MathHelper\n  static on double x\n    return x * 2\n  end\nend\nshow ok');
    expect(out).toEqual(['ok']);
  });
});

describe('Enum shorthand kind', () => {
  it('declares enum as kind shorthand', async () => {
    const out = await collect('kind Color is red, green, blue end\nshow ok');
    expect(out).toEqual(['ok']);
  });
});

// ============================================================
// FUNCTIONAL
// ============================================================

describe('Lambda expressions', () => {
  it('creates and calls a lambda', async () => {
    const out = await collect('set double to { x -> x * 2 }\nshow (double 5)');
    expect(out).toEqual(['10']);
  });

  it('lambda captures closure', async () => {
    const out = await collect('set factor to 3\nset mult to { x -> x * factor }\nshow (mult 4)');
    expect(out).toEqual(['12']);
  });

  it('type checks lambda', async () => {
    const out = await collect('set f to { x -> x }\nif f is a lambda\n  show yes\nend');
    expect(out).toEqual(['yes']);
  });
});

describe('Curry expression', () => {
  it('partially applies a function', async () => {
    const out = await collect('command add a, b\n  return a + b\nend\nset add5 to curry add 5\nshow (add5 3)');
    expect(out).toEqual(['8']);
  });
});

describe('Compose expression', () => {
  it('composes two lambdas', async () => {
    const out = await collect('set double to { x -> x * 2 }\nset inc to { x -> x + 1 }\nset doubleThenInc to compose double, inc\nshow (doubleThenInc 3)');
    expect(out).toEqual(['7']);
  });
});

// ============================================================
// I/O & SYSTEM
// ============================================================

describe('Environment variables', () => {
  it('reads env variable', async () => {
    const out = await collect('set p to env "PATH"\nif p exists\n  show has path\nend');
    expect(out).toEqual(['has path']);
  });
});

describe('Date/Time', () => {
  it('gets current year', async () => {
    const out = await collect('set y to current year\nif y > 2020\n  show future\nend');
    expect(out).toEqual(['future']);
  });

  it('gets today', async () => {
    const out = await collect('set t to today\nif t is a text\n  show ok\nend');
    expect(out).toEqual(['ok']);
  });
});

describe('JSON parse', () => {
  it('parses JSON array', async () => {
    const out = await collect('set raw to "[1, 2, 3]"\nset data to json raw\nshow .data.count');
    expect(out).toEqual(['3']);
  });
});

describe('CSV parse', () => {
  it('parses CSV string to list', async () => {
    const out = await collect('set raw to "a,b,c\\n1,2,3"\nset data to csv raw\nshow .data.count');
    expect(out).toEqual(['1']); // 1 data row (first line is headers)
  });
});

// ============================================================
// TESTING FEATURES
// ============================================================

describe('Mock statement', () => {
  it('mocks a command', async () => {
    const out = await collect('command fetch_data\n  return "real data"\nend\nmock fetch_data returns "fake data"\nshow (fetch_data)');
    expect(out).toEqual(['fake data']);
  });
});

describe('Before/After blocks', () => {
  it('registers before and after blocks', async () => {
    const out = await collect('before\n  show setup\nend\nshow ok');
    expect(out).toEqual(['ok']);
  });
});

describe('Benchmark block', () => {
  it('measures execution time', async () => {
    const out = await collect('benchmark "test"\n  set x to 1 + 1\nend');
    expect(out.length).toBe(1);
    expect(out[0]).toMatch(/^Benchmark "test": \d+ms$/);
  });
});

describe('Snapshot check', () => {
  it('saves and verifies snapshot', async () => {
    const out = await collect('set x to 42\nsnapshot x as "my_value"\nshow ok');
    expect(out).toEqual(['ok']);
  });
});

// ============================================================
// GRAPHICS
// ============================================================

describe('Animate statement', () => {
  it('outputs animation info', async () => {
    const out = await collect('animate ball.x from 0 to 100 over 500');
    expect(out).toEqual(['Animate ball.x from 0 to 100 over 500ms']);
  });
});

describe('Turtle graphics', () => {
  it('executes turtle forward', async () => {
    const out = await collect('forward 100\nshow ok');
    expect(out).toEqual(['ok']);
  });

  it('executes turtle turn', async () => {
    const out = await collect('turn right 90\nforward 50\nshow ok');
    expect(out).toEqual(['ok']);
  });

  it('executes pen up/down', async () => {
    const out = await collect('pen up\nforward 50\npen down\nshow ok');
    expect(out).toEqual(['ok']);
  });
});

describe('Scene switching', () => {
  it('switches scene', async () => {
    const out = await collect('switch scene "menu"');
    expect(out).toEqual(['Switched to scene: menu']);
  });
});

// ============================================================
// WEB FEATURES
// ============================================================

describe('Connect (WebSocket)', () => {
  it('connects to websocket', async () => {
    const out = await collect('connect "ws://localhost:8080" as ws');
    expect(out).toEqual(['Connected to ws://localhost:8080 as ws']);
  });
});

describe('Emit statement', () => {
  it('emits an event', async () => {
    const out = await collect('emit "click"');
    expect(out).toEqual(['Emit "click"']);
  });

  it('emits with data', async () => {
    const out = await collect('emit "message" with "hello"');
    expect(out).toEqual(['Emit "message": hello']);
  });
});

describe('Cookie statement', () => {
  it('sets a cookie', async () => {
    const out = await collect('cookie set "user" to "Alice"\nshow ok');
    expect(out).toEqual(['ok']);
  });

  it('sets and reads cookie via env', async () => {
    // Cookies are stored as cookie_NAME variables
    const out = await collect('cookie set "user" to "Alice"\nshow .cookie_user');
    expect(out).toEqual(['Alice']);
  });

  it('deletes a cookie', async () => {
    const out = await collect('cookie set "user" to "Bob"\ncookie delete "user"\nshow .cookie_user');
    expect(out).toEqual(['nothing']);
  });
});

describe('Allow (CORS)', () => {
  it('sets CORS origin', async () => {
    const out = await collect('allow "https://example.com"');
    expect(out).toEqual(['CORS allowed: https://example.com']);
  });
});

describe('Stream statement', () => {
  it('starts a stream', async () => {
    const out = await collect('stream "heartbeat"');
    expect(out).toEqual(['Stream: heartbeat every 1000ms']);
  });
});

// ============================================================
// TEMPLATE
// ============================================================

describe('Template declaration', () => {
  it('declares a template', async () => {
    const out = await collect('template greeting name\n  show Hello .name\nend\nshow ok');
    expect(out).toEqual(['ok']);
  });
});

// ============================================================
// WHEN FALLTHROUGH
// ============================================================

describe('When with or fallthrough', () => {
  it('matches multiple values with or', async () => {
    const out = await collect('set x to 2\nwhen x\n  is 1 or 2\n    show one or two\n  is 3\n    show three\nend');
    expect(out).toEqual(['one or two']);
  });
});

// ============================================================
// TYPE ANNOTATIONS
// ============================================================

describe('Command with type annotations', () => {
  it('declares command with typed params', async () => {
    const out = await collect('command add (a as number, b as number)\n  return a + b\nend\nshow (add 3, 4)');
    expect(out).toEqual(['7']);
  });
});

// ============================================================
// FOR-EACH SET ITERATION
// ============================================================

describe('For-each over set', () => {
  it('iterates over set items', async () => {
    const out = await collect('set s to unique 3, 1, 2\nfor each item in s\n  show .item\nend');
    expect(out).toEqual(['3', '1', '2']);
  });
});

// ============================================================
// INTEGRATION TESTS
// ============================================================

describe('Integration: combined new features', () => {
  it('lambda + pipeline', async () => {
    const out = await collect('set double to { x -> x * 2 }\nset inc to { x -> x + 1 }\nset result to 3 | double | inc\nshow .result');
    expect(out).toEqual(['7']);
  });

  it('enum + when', async () => {
    const out = await collect('enum Direction is north, south, east, west\nset dir to "north"\nwhen dir\n  is "north"\n    show going up\n  is "south"\n    show going down\nend');
    expect(out).toEqual(['going up']);
  });

  it('map entries + property access', async () => {
    const out = await collect('set m to map x: 10, y: 20\nshow .m.x\nshow .m.y');
    expect(out).toEqual(['10', '20']);
  });

  it('pair in list', async () => {
    const out = await collect('set p1 to pair "a" and 1\nset p2 to pair "b" and 2\nset items to list p1, p2\nshow .items.count');
    expect(out).toEqual(['2']);
  });

  it('set + contains', async () => {
    const out = await collect('set s to unique 1, 2, 3\nif s contains 2\n  show found\nend');
    expect(out).toEqual(['found']);
  });
});

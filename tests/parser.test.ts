import { describe, it, expect } from 'vitest';
import { Lexer } from '../src/lexer';
import { Parser } from '../src/parser';

function parse(source: string) {
  const lexer = new Lexer(source);
  const tokens = lexer.tokenize();
  const parser = new Parser();
  return parser.parse(tokens);
}

describe('Parser', () => {
  it('parses put statement', () => {
    const program = parse('put 42 into x');
    expect(program.body).toHaveLength(1);
    expect(program.body[0].type).toBe('PutStatement');
  });

  it('parses show statement with text', () => {
    const program = parse('show Hello World');
    expect(program.body).toHaveLength(1);
    expect(program.body[0].type).toBe('ShowStatement');
  });

  it('parses show with interpolation', () => {
    const program = parse('show Hello .name');
    const show = program.body[0] as any;
    expect(show.parts).toHaveLength(2);
    expect(show.parts[0].type).toBe('text');
    expect(show.parts[1].type).toBe('interpolation');
    expect(show.parts[1].path).toBe('name');
  });

  it('parses show with expression', () => {
    const program = parse('show Total is (x + 5)');
    const show = program.body[0] as any;
    expect(show.parts.length).toBeGreaterThanOrEqual(2);
    const exprPart = show.parts.find((p: any) => p.type === 'expression');
    expect(exprPart).toBeTruthy();
  });

  it('parses if/else/end', () => {
    const program = parse('if x > 5\nshow big\nelse\nshow small\nend');
    expect(program.body[0].type).toBe('IfStatement');
    const ifStmt = program.body[0] as any;
    expect(ifStmt.body).toHaveLength(1);
    expect(ifStmt.elseBody).toHaveLength(1);
  });

  it('parses else if', () => {
    const program = parse('if x > 90\nshow A\nelse if x > 80\nshow B\nelse\nshow C\nend');
    const ifStmt = program.body[0] as any;
    expect(ifStmt.elseIfClauses).toHaveLength(1);
    expect(ifStmt.elseBody).toHaveLength(1);
  });

  it('parses repeat N times', () => {
    const program = parse('repeat 5 times\nshow hello\nend');
    const repeat = program.body[0] as any;
    expect(repeat.type).toBe('RepeatStatement');
    expect(repeat.variant).toBe('times');
  });

  it('parses repeat while', () => {
    const program = parse('repeat while x < 10\nput x + 1 into x\nend');
    const repeat = program.body[0] as any;
    expect(repeat.variant).toBe('while');
  });

  it('parses repeat forever', () => {
    const program = parse('repeat forever\nshow hi\nstop\nend');
    const repeat = program.body[0] as any;
    expect(repeat.variant).toBe('forever');
  });

  it('parses for each', () => {
    const program = parse('for each item in items\nshow .item\nend');
    const forEach = program.body[0] as any;
    expect(forEach.type).toBe('ForEachStatement');
    expect(forEach.variable).toBe('item');
  });

  it('parses for each with index', () => {
    const program = parse('for each item at i in items\nshow .i\nend');
    const forEach = program.body[0] as any;
    expect(forEach.indexVariable).toBe('i');
  });

  it('parses for each with range', () => {
    const program = parse('for each i in 1 to 10\nshow .i\nend');
    const forEach = program.body[0] as any;
    expect(forEach.iterable.type).toBe('RangeExpression');
  });

  it('parses kind declaration', () => {
    const program = parse('kind Person\nname is Unknown\nage is 0\nend');
    const kind = program.body[0] as any;
    expect(kind.type).toBe('KindDeclaration');
    expect(kind.name).toBe('Person');
    expect(kind.fields).toHaveLength(2);
  });

  it('parses kind with methods', () => {
    const program = parse('kind Dog\nname is Buddy\non bark\nshow Woof\nend\nend');
    const kind = program.body[0] as any;
    expect(kind.methods).toHaveLength(1);
    expect(kind.methods[0].name).toBe('bark');
  });

  it('parses kind with inheritance', () => {
    const program = parse('kind ServiceDog from Dog\njob is Guide\nend');
    const kind = program.body[0] as any;
    expect(kind.parent).toBe('Dog');
  });

  it('parses make statement', () => {
    const program = parse('make a Person called teacher');
    const make = program.body[0] as any;
    expect(make.type).toBe('MakeStatement');
    expect(make.kindName).toBe('Person');
    expect(make.instanceName).toBe('teacher');
  });

  it('parses make with inline props', () => {
    const program = parse('make a Person called teacher with name Ms. Lopez, age 31');
    const make = program.body[0] as any;
    expect(make.inlineProps).toHaveLength(2);
  });

  it('parses send statement', () => {
    const program = parse('send greet to teacher');
    const send = program.body[0] as any;
    expect(send.type).toBe('SendStatement');
    expect(send.message).toBe('greet');
  });

  it('parses command declaration', () => {
    const program = parse('command add a and b\nreturn a + b\nend');
    const cmd = program.body[0] as any;
    expect(cmd.type).toBe('CommandDeclaration');
    expect(cmd.name).toBe('add');
    expect(cmd.params).toHaveLength(2);
  });

  it('parses add/remove statements', () => {
    const program = parse('add Chris to students\nremove Jordan from students');
    expect(program.body[0].type).toBe('AddStatement');
    expect(program.body[1].type).toBe('RemoveStatement');
  });

  it('parses try/or', () => {
    const program = parse('try\nshow ok\nor\nshow fail\nend');
    const tryStmt = program.body[0] as any;
    expect(tryStmt.type).toBe('TryStatement');
    expect(tryStmt.body).toHaveLength(1);
    expect(tryStmt.catchBody).toHaveLength(1);
  });

  it('parses try/catch with variable', () => {
    const program = parse('try\nshow ok\ncatch error\nshow .error\nend');
    const tryStmt = program.body[0] as any;
    expect(tryStmt.catchVar).toBe('error');
  });

  it('parses test block', () => {
    const program = parse('test addition\ncheck 2 + 2 == 4\nend');
    const test = program.body[0] as any;
    expect(test.type).toBe('TestBlock');
    expect(test.name).toBe('addition');
  });

  it('parses use statement', () => {
    const program = parse('use math');
    expect(program.body[0].type).toBe('UseStatement');
  });

  it('parses sort/reverse/shuffle', () => {
    const program = parse('sort students\nreverse students\nshuffle students');
    expect(program.body[0].type).toBe('SortStatement');
    expect(program.body[1].type).toBe('ReverseStatement');
    expect(program.body[2].type).toBe('ShuffleStatement');
  });

  it('parses math expressions', () => {
    const program = parse('put 2 + 3 * 4 into x');
    const put = program.body[0] as any;
    expect(put.value.type).toBe('BinaryExpression');
  });

  it('parses comparison operators', () => {
    const program = parse('if x >= 10\nshow ok\nend');
    const ifStmt = program.body[0] as any;
    expect(ifStmt.condition.type).toBe('ComparisonExpression');
    expect(ifStmt.condition.op).toBe('>=');
  });

  it('parses english comparisons', () => {
    const program = parse('if name is Jared\nshow found\nend');
    const ifStmt = program.body[0] as any;
    expect(ifStmt.condition.op).toBe('==');
  });

  it('parses logical operators', () => {
    const program = parse('if x > 0 and x < 10\nshow ok\nend');
    const ifStmt = program.body[0] as any;
    expect(ifStmt.condition.type).toBe('LogicalExpression');
    expect(ifStmt.condition.op).toBe('and');
  });

  it('parses inline list', () => {
    const program = parse('put list 1, 2, 3 into nums');
    const put = program.body[0] as any;
    expect(put.value.type).toBe('ListLiteral');
    expect(put.value.items).toHaveLength(3);
  });

  it('parses return statement', () => {
    const program = parse('command double n\nreturn n * 2\nend');
    const cmd = program.body[0] as any;
    expect(cmd.body[0].type).toBe('ReturnStatement');
  });

  it('parses stop statement', () => {
    const program = parse('repeat forever\nstop\nend');
    const repeat = program.body[0] as any;
    expect(repeat.body[0].type).toBe('StopStatement');
  });

  it('parses ask expression', () => {
    const program = parse('ask What is your name');
    expect(program.body[0].type).toBe('AskExpression');
  });

  it('parses wait statement', () => {
    const program = parse('wait 2 seconds');
    const wait = program.body[0] as any;
    expect(wait.type).toBe('WaitStatement');
  });

  it('parses go statement', () => {
    const program = parse('go to nextCard');
    expect(program.body[0].type).toBe('GoStatement');
  });

  it('parses open statement', () => {
    const program = parse('open app');
    expect(program.body[0].type).toBe('OpenStatement');
  });

  it('parses hide statement', () => {
    const program = parse('hide scoreLabel');
    expect(program.body[0].type).toBe('HideStatement');
  });
});

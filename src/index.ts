export { Lexer } from './lexer';
export { Parser } from './parser';
export { Interpreter, InterpreterOptions, SayValue, SayList, SayMap, SayInstance, SayKind, SayUIElement, toString, toNumber, isTruthy, valuesEqual } from './interpreter';
export { Token, TokenType } from './tokens';
export * as AST from './ast';

import { Lexer } from './lexer';
import { Parser } from './parser';
import { Interpreter, InterpreterOptions } from './interpreter';

export async function run(source: string, options: InterpreterOptions = {}): Promise<void> {
  const lexer = new Lexer(source);
  const tokens = lexer.tokenize();
  const parser = new Parser();
  const program = parser.parse(tokens);
  const interpreter = new Interpreter(options);
  await interpreter.run(program);
}

export async function runTests(source: string, options: InterpreterOptions = {}): Promise<{ name: string; passed: boolean; error?: string }[]> {
  const lexer = new Lexer(source);
  const tokens = lexer.tokenize();
  const parser = new Parser();
  const program = parser.parse(tokens);
  const interpreter = new Interpreter(options);
  return interpreter.runTests(program);
}

import { describe, it, expect } from 'vitest';
import { Lexer } from '../src/lexer';
import { TokenType } from '../src/tokens';

describe('Lexer', () => {
  it('tokenizes numbers', () => {
    const lexer = new Lexer('42 3.14');
    const tokens = lexer.tokenize();
    expect(tokens[0]).toMatchObject({ type: TokenType.NUMBER, value: '42' });
    expect(tokens[1]).toMatchObject({ type: TokenType.NUMBER, value: '3.14' });
  });

  it('tokenizes keywords', () => {
    const lexer = new Lexer('put into show ask');
    const tokens = lexer.tokenize();
    expect(tokens[0].type).toBe(TokenType.PUT);
    expect(tokens[1].type).toBe(TokenType.INTO);
    expect(tokens[2].type).toBe(TokenType.SHOW);
    expect(tokens[3].type).toBe(TokenType.ASK);
  });

  it('tokenizes identifiers', () => {
    const lexer = new Lexer('myVar another_one');
    const tokens = lexer.tokenize();
    expect(tokens[0]).toMatchObject({ type: TokenType.IDENTIFIER, value: 'myVar' });
    expect(tokens[1]).toMatchObject({ type: TokenType.IDENTIFIER, value: 'another_one' });
  });

  it('tokenizes dot identifiers', () => {
    const lexer = new Lexer('.name .student.grade');
    const tokens = lexer.tokenize();
    expect(tokens[0]).toMatchObject({ type: TokenType.DOT_IDENTIFIER, value: '.name' });
    expect(tokens[1]).toMatchObject({ type: TokenType.DOT_IDENTIFIER, value: '.student.grade' });
  });

  it('tokenizes operators', () => {
    const lexer = new Lexer('+ - * / % ^ == != > < >= <=');
    const tokens = lexer.tokenize();
    expect(tokens[0].type).toBe(TokenType.PLUS);
    expect(tokens[1].type).toBe(TokenType.MINUS);
    expect(tokens[2].type).toBe(TokenType.STAR);
    expect(tokens[3].type).toBe(TokenType.SLASH);
    expect(tokens[4].type).toBe(TokenType.PERCENT);
    expect(tokens[5].type).toBe(TokenType.CARET);
    expect(tokens[6].type).toBe(TokenType.EQ);
    expect(tokens[7].type).toBe(TokenType.NEQ);
    expect(tokens[8].type).toBe(TokenType.GT);
    expect(tokens[9].type).toBe(TokenType.LT);
    expect(tokens[10].type).toBe(TokenType.GTE);
    expect(tokens[11].type).toBe(TokenType.LTE);
  });

  it('tokenizes delimiters', () => {
    const lexer = new Lexer('( ) , . ?');
    const tokens = lexer.tokenize();
    expect(tokens[0].type).toBe(TokenType.LPAREN);
    expect(tokens[1].type).toBe(TokenType.RPAREN);
    expect(tokens[2].type).toBe(TokenType.COMMA);
    expect(tokens[3].type).toBe(TokenType.DOT);
    expect(tokens[4].type).toBe(TokenType.QUESTION);
  });

  it('tokenizes booleans and nothing', () => {
    const lexer = new Lexer('true false nothing');
    const tokens = lexer.tokenize();
    expect(tokens[0].type).toBe(TokenType.TRUE);
    expect(tokens[1].type).toBe(TokenType.FALSE);
    expect(tokens[2].type).toBe(TokenType.NOTHING);
  });

  it('skips single-line comments', () => {
    const lexer = new Lexer('put 5 into x -- this is a comment\nshow x');
    const tokens = lexer.tokenize();
    const types = tokens.map(t => t.type).filter(t => t !== TokenType.NEWLINE && t !== TokenType.EOF);
    expect(types).toEqual([TokenType.PUT, TokenType.NUMBER, TokenType.INTO, TokenType.IDENTIFIER,
                           TokenType.SHOW, TokenType.IDENTIFIER]);
  });

  it('skips multi-line comments', () => {
    const lexer = new Lexer('put 5 into x\n---\nthis is\nmulti-line\n---\nshow x');
    const tokens = lexer.tokenize();
    const types = tokens.map(t => t.type).filter(t => t !== TokenType.NEWLINE && t !== TokenType.EOF);
    expect(types).toEqual([TokenType.PUT, TokenType.NUMBER, TokenType.INTO, TokenType.IDENTIFIER,
                           TokenType.SHOW, TokenType.IDENTIFIER]);
  });

  it('tokenizes else if as single token', () => {
    const lexer = new Lexer('else if');
    const tokens = lexer.tokenize();
    expect(tokens[0].type).toBe(TokenType.ELSE_IF);
  });

  it('handles newlines', () => {
    const lexer = new Lexer('put 1 into x\nshow x');
    const tokens = lexer.tokenize();
    const hasNewline = tokens.some(t => t.type === TokenType.NEWLINE);
    expect(hasNewline).toBe(true);
  });

  it('tracks line numbers', () => {
    const lexer = new Lexer('put 1 into x\nshow x');
    const tokens = lexer.tokenize();
    const showToken = tokens.find(t => t.type === TokenType.SHOW);
    expect(showToken?.line).toBe(2);
  });

  it('tokenizes control flow keywords', () => {
    const lexer = new Lexer('if else end repeat while until forever for each in');
    const tokens = lexer.tokenize();
    const types = tokens.map(t => t.type).filter(t => t !== TokenType.EOF);
    expect(types).toEqual([
      TokenType.IF, TokenType.ELSE, TokenType.END, TokenType.REPEAT,
      TokenType.WHILE, TokenType.UNTIL, TokenType.FOREVER, TokenType.FOR,
      TokenType.EACH, TokenType.IN,
    ]);
  });

  it('tokenizes string literals', () => {
    const lexer = new Lexer('"Hello World" "with \\"quotes\\""');
    const tokens = lexer.tokenize();
    expect(tokens[0]).toMatchObject({ type: TokenType.STRING, value: 'Hello World' });
    expect(tokens[1]).toMatchObject({ type: TokenType.STRING, value: 'with "quotes"' });
  });

  it('tokenizes set keyword', () => {
    const lexer = new Lexer('set x to 5');
    const tokens = lexer.tokenize();
    expect(tokens[0].type).toBe(TokenType.SET);
    expect(tokens[2].type).toBe(TokenType.TO);
  });

  it('tokenizes new keywords', () => {
    const lexer = new Lexer('map random when rounded read write append');
    const tokens = lexer.tokenize();
    const types = tokens.map(t => t.type).filter(t => t !== TokenType.EOF);
    expect(types).toEqual([
      TokenType.MAP, TokenType.RANDOM, TokenType.WHEN, TokenType.ROUNDED,
      TokenType.READ, TokenType.WRITE, TokenType.APPEND,
    ]);
  });

  it('tokenizes object keywords', () => {
    const lexer = new Lexer('kind from on me make a called with send');
    const tokens = lexer.tokenize();
    const types = tokens.map(t => t.type).filter(t => t !== TokenType.EOF);
    expect(types).toEqual([
      TokenType.KIND, TokenType.FROM, TokenType.ON, TokenType.ME,
      TokenType.MAKE, TokenType.A, TokenType.CALLED, TokenType.WITH, TokenType.SEND,
    ]);
  });
});

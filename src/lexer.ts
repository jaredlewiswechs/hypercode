import { Token, TokenType, KEYWORDS } from './tokens';

export class Lexer {
  private source: string;
  private pos: number = 0;
  private line: number = 1;
  private column: number = 1;
  private tokens: Token[] = [];

  constructor(source: string) {
    this.source = source;
  }

  tokenize(): Token[] {
    this.tokens = [];
    this.pos = 0;
    this.line = 1;
    this.column = 1;

    while (this.pos < this.source.length) {
      this.skipSpaces();
      if (this.pos >= this.source.length) break;

      const ch = this.source[this.pos];

      // Multi-line comment ---
      if (ch === '-' && this.peek(1) === '-' && this.peek(2) === '-') {
        this.readMultiLineComment();
        continue;
      }

      // Single-line comment --
      if (ch === '-' && this.peek(1) === '-' && this.peek(2) !== '-') {
        this.readSingleLineComment();
        continue;
      }

      // Newline
      if (ch === '\n') {
        this.addToken(TokenType.NEWLINE, '\n');
        this.pos++;
        this.line++;
        this.column = 1;
        continue;
      }

      if (ch === '\r') {
        this.pos++;
        if (this.pos < this.source.length && this.source[this.pos] === '\n') {
          this.pos++;
        }
        this.addToken(TokenType.NEWLINE, '\n');
        this.line++;
        this.column = 1;
        continue;
      }

      // String literals
      if (ch === '"') {
        this.readString();
        continue;
      }

      // Numbers
      if (this.isDigit(ch) || (ch === '-' && this.pos + 1 < this.source.length && this.isDigit(this.source[this.pos + 1]) && this.shouldBeNegativeNumber())) {
        this.readNumber();
        continue;
      }

      // Dot identifier (.name for interpolation)
      if (ch === '.' && this.pos + 1 < this.source.length && this.isAlpha(this.source[this.pos + 1])) {
        this.readDotIdentifier();
        continue;
      }

      // Operators and symbols
      switch (ch) {
        case '+': this.addToken(TokenType.PLUS, '+'); this.advance(); continue;
        case '*': this.addToken(TokenType.STAR, '*'); this.advance(); continue;
        case '/': this.addToken(TokenType.SLASH, '/'); this.advance(); continue;
        case '%': this.addToken(TokenType.PERCENT, '%'); this.advance(); continue;
        case '^': this.addToken(TokenType.CARET, '^'); this.advance(); continue;
        case '(': this.addToken(TokenType.LPAREN, '('); this.advance(); continue;
        case ')': this.addToken(TokenType.RPAREN, ')'); this.advance(); continue;
        case ',': this.addToken(TokenType.COMMA, ','); this.advance(); continue;
        case '.': this.addToken(TokenType.DOT, '.'); this.advance(); continue;
        case '?': this.addToken(TokenType.QUESTION, '?'); this.advance(); continue;
        case '-': this.addToken(TokenType.MINUS, '-'); this.advance(); continue;
        case '=':
          if (this.peek(1) === '=') {
            this.addToken(TokenType.EQ, '==');
            this.advance(); this.advance();
          } else {
            // Just an equals, treat as identifier
            this.addToken(TokenType.IDENTIFIER, '=');
            this.advance();
          }
          continue;
        case '!':
          if (this.peek(1) === '=') {
            this.addToken(TokenType.NEQ, '!=');
            this.advance(); this.advance();
          } else {
            this.addToken(TokenType.IDENTIFIER, '!');
            this.advance();
          }
          continue;
        case '>':
          if (this.peek(1) === '=') {
            this.addToken(TokenType.GTE, '>=');
            this.advance(); this.advance();
          } else {
            this.addToken(TokenType.GT, '>');
            this.advance();
          }
          continue;
        case '<':
          if (this.peek(1) === '=') {
            this.addToken(TokenType.LTE, '<=');
            this.advance(); this.advance();
          } else {
            this.addToken(TokenType.LT, '<');
            this.advance();
          }
          continue;
      }

      // Identifiers and keywords
      if (this.isAlpha(ch) || ch === '_') {
        this.readIdentifier();
        continue;
      }

      // Unknown character - skip
      this.advance();
    }

    this.addToken(TokenType.EOF, '');
    return this.tokens;
  }

  private skipSpaces() {
    while (this.pos < this.source.length) {
      const ch = this.source[this.pos];
      if (ch === ' ' || ch === '\t') {
        this.pos++;
        this.column++;
      } else {
        break;
      }
    }
  }

  private isDigit(ch: string): boolean {
    return ch >= '0' && ch <= '9';
  }

  private isAlpha(ch: string): boolean {
    return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch === '_';
  }

  private isAlphaNumeric(ch: string): boolean {
    return this.isAlpha(ch) || this.isDigit(ch);
  }

  private peek(offset: number = 0): string | undefined {
    return this.source[this.pos + offset];
  }

  private advance(): void {
    this.pos++;
    this.column++;
  }

  private addToken(type: TokenType, value: string): void {
    this.tokens.push({ type, value, line: this.line, column: this.column });
  }

  private shouldBeNegativeNumber(): boolean {
    // A minus is a negative number if there's no previous token or previous is an operator/keyword
    if (this.tokens.length === 0) return true;
    const prev = this.tokens[this.tokens.length - 1];
    return [
      TokenType.PLUS, TokenType.MINUS, TokenType.STAR, TokenType.SLASH,
      TokenType.PERCENT, TokenType.CARET, TokenType.LPAREN, TokenType.COMMA,
      TokenType.EQ, TokenType.NEQ, TokenType.GT, TokenType.LT,
      TokenType.GTE, TokenType.LTE, TokenType.NEWLINE, TokenType.INTO,
      TokenType.PUT, TokenType.SET, TokenType.TO, TokenType.RETURN,
    ].includes(prev.type);
  }

  private readNumber(): void {
    const start = this.pos;
    if (this.source[this.pos] === '-') this.pos++;
    while (this.pos < this.source.length && this.isDigit(this.source[this.pos])) {
      this.pos++;
    }
    if (this.pos < this.source.length && this.source[this.pos] === '.' &&
        this.pos + 1 < this.source.length && this.isDigit(this.source[this.pos + 1])) {
      this.pos++; // skip dot
      while (this.pos < this.source.length && this.isDigit(this.source[this.pos])) {
        this.pos++;
      }
    }
    const value = this.source.slice(start, this.pos);
    this.addToken(TokenType.NUMBER, value);
    this.column += value.length;
  }

  private readDotIdentifier(): void {
    const start = this.pos;
    this.pos++; // skip initial dot
    while (this.pos < this.source.length && (this.isAlphaNumeric(this.source[this.pos]) || this.source[this.pos] === '.')) {
      this.pos++;
    }
    const value = this.source.slice(start, this.pos);
    this.addToken(TokenType.DOT_IDENTIFIER, value);
    this.column += value.length;
  }

  private readIdentifier(): void {
    const start = this.pos;
    while (this.pos < this.source.length && (this.isAlphaNumeric(this.source[this.pos]) || this.source[this.pos] === '_')) {
      this.pos++;
    }
    const value = this.source.slice(start, this.pos);
    const lower = value.toLowerCase();

    // Check for "else if" as two-word keyword
    if (lower === 'else') {
      const savedPos = this.pos;
      const savedCol = this.column;
      this.skipSpaces();
      if (this.pos < this.source.length) {
        const nextStart = this.pos;
        while (this.pos < this.source.length && this.isAlphaNumeric(this.source[this.pos])) {
          this.pos++;
        }
        const nextWord = this.source.slice(nextStart, this.pos).toLowerCase();
        if (nextWord === 'if') {
          this.addToken(TokenType.ELSE_IF, 'else if');
          this.column = savedCol + (this.pos - start);
          return;
        }
      }
      // Not "else if", restore
      this.pos = savedPos;
    }

    const type = KEYWORDS[lower];
    if (type !== undefined) {
      this.addToken(type, value);
    } else {
      this.addToken(TokenType.IDENTIFIER, value);
    }
    this.column += value.length;
  }

  private readSingleLineComment(): void {
    while (this.pos < this.source.length && this.source[this.pos] !== '\n') {
      this.pos++;
    }
    // Don't skip the newline itself - let the main loop handle it
  }

  private readString(): void {
    const start = this.pos;
    this.pos++; // skip opening quote
    let value = '';
    while (this.pos < this.source.length && this.source[this.pos] !== '"') {
      if (this.source[this.pos] === '\\' && this.pos + 1 < this.source.length) {
        this.pos++;
        switch (this.source[this.pos]) {
          case 'n': value += '\n'; break;
          case 't': value += '\t'; break;
          case '"': value += '"'; break;
          case '\\': value += '\\'; break;
          default: value += this.source[this.pos];
        }
      } else {
        value += this.source[this.pos];
      }
      this.pos++;
    }
    if (this.pos < this.source.length) this.pos++; // skip closing quote
    this.addToken(TokenType.STRING, value);
    this.column += (this.pos - start);
  }

  private readMultiLineComment(): void {
    this.pos += 3; // skip ---
    this.column += 3;
    while (this.pos < this.source.length) {
      if (this.source[this.pos] === '-' && this.peek(1) === '-' && this.peek(2) === '-') {
        this.pos += 3;
        this.column += 3;
        // Skip to end of line
        while (this.pos < this.source.length && this.source[this.pos] !== '\n') {
          this.pos++;
          this.column++;
        }
        return;
      }
      if (this.source[this.pos] === '\n') {
        this.line++;
        this.column = 1;
      } else {
        this.column++;
      }
      this.pos++;
    }
  }
}

import { Token, TokenType } from './tokens';
import * as AST from './ast';
import { Lexer } from './lexer';

export class ParseError extends Error {
  constructor(message: string, public line: number, public column: number) {
    super(`Parse error at line ${line}: ${message}`);
  }
}

export class Parser {
  private tokens: Token[] = [];
  private pos: number = 0;

  parse(tokens: Token[]): AST.Program {
    this.tokens = tokens;
    this.pos = 0;
    const body: AST.ASTNode[] = [];

    while (!this.isAtEnd()) {
      this.skipNewlines();
      if (this.isAtEnd()) break;
      const node = this.parseStatement();
      if (node) body.push(node);
    }

    return { type: 'Program', body };
  }

  private parseStatement(): AST.ASTNode | null {
    this.skipNewlines();
    if (this.isAtEnd()) return null;

    const token = this.current();

    switch (token.type) {
      case TokenType.PUT: return this.parsePut();
      case TokenType.SET: return this.parseSet();
      case TokenType.SHOW: return this.parseShow();
      case TokenType.ASK: return this.parseAskStatement();
      case TokenType.IF: return this.parseIf();
      case TokenType.REPEAT: return this.parseRepeat();
      case TokenType.FOR: return this.parseForEach();
      case TokenType.KIND: return this.parseKind();
      case TokenType.MAKE: return this.parseMake();
      case TokenType.SEND: return this.parseSend();
      case TokenType.ON: return this.parseOn();
      case TokenType.COMMAND: return this.parseCommand();
      case TokenType.RETURN: return this.parseReturn();
      case TokenType.ADD: return this.parseAdd();
      case TokenType.REMOVE: return this.parseRemove();
      case TokenType.SORT: return this.parseSort();
      case TokenType.REVERSE: return this.parseReverse();
      case TokenType.SHUFFLE: return this.parseShuffle();
      case TokenType.TRY: return this.parseTry();
      case TokenType.USE: return this.parseUse();
      case TokenType.TEST: return this.parseTest();
      case TokenType.CHECK: return this.parseCheck();
      case TokenType.EXPLAIN: return this.parseExplain();
      case TokenType.STOP: return this.parseStop();
      case TokenType.WAIT: return this.parseWait();
      case TokenType.DRAW: return this.parseDraw();
      case TokenType.CLEAR: return this.parseClear();
      case TokenType.GO: return this.parseGo();
      case TokenType.OPEN: return this.parseOpen();
      case TokenType.HIDE: return this.parseHide();
      case TokenType.PLAY: return this.parsePlay();
      case TokenType.WHEN: return this.parseWhen();
      case TokenType.WRITE: return this.parseWrite();
      case TokenType.APPEND: return this.parseAppend();
      case TokenType.REMEMBER: return this.parseRemember();
      case TokenType.FORGET: return this.parseForget();
      case TokenType.SERVE: return this.parseServe();
      case TokenType.RESPOND: return this.parseRespond();
      case TokenType.ROUTE: return this.parseRoute();
      case TokenType.GRAB: return this.parseGrab();
      case TokenType.SHARE: return this.parseShare();
      case TokenType.DO: return this.parseDoTogether();
      case TokenType.LISTEN: return this.parseListen();
      case TokenType.EVERY: return this.parseEvery();
      case TokenType.CONTRACT: return this.parseContract();
      case TokenType.ENUM: return this.parseEnum();
      case TokenType.MOCK: return this.parseMock();
      case TokenType.BEFORE: return this.parseBefore();
      case TokenType.AFTER: return this.parseAfter();
      case TokenType.BENCHMARK: return this.parseBenchmark();
      case TokenType.ANIMATE: return this.parseAnimate();
      case TokenType.FORWARD: return this.parseTurtle('forward');
      case TokenType.BACKWARD: return this.parseTurtle('backward');
      case TokenType.TURN: return this.parseTurnStatement();
      case TokenType.PEN: return this.parsePen();
      case TokenType.SWITCH: return this.parseSwitchScene();
      case TokenType.CONNECT: return this.parseConnect();
      case TokenType.EMIT: return this.parseEmit();
      case TokenType.COOKIE: return this.parseCookie();
      case TokenType.ALLOW: return this.parseAllow();
      case TokenType.STREAM: return this.parseStream();
      case TokenType.TEMPLATE: return this.parseTemplate();
      case TokenType.FORMAT: return this.parseFormat();
      case TokenType.APPLY: return this.parseApply();
      default:
        return this.parseExpressionStatement();
    }
  }

  // ---- Statement parsers ----

  private parsePut(): AST.PutStatement | AST.ListLiteralMultiline {
    const line = this.current().line;
    this.advance(); // skip 'put'

    // Check for "put list into X" with multiline
    if (this.check(TokenType.LIST)) {
      this.advance(); // skip 'list'

      // Inline list: put list Maya, Jordan into X
      if (!this.check(TokenType.INTO) && !this.check(TokenType.NEWLINE) && !this.isAtEnd()) {
        const items = this.parseListItems();
        this.expect(TokenType.INTO);
        const target = this.parseExpression();
        this.skipNewlines();
        return { type: 'PutStatement', value: { type: 'ListLiteral', items }, target, line };
      }

      // Check if "into" follows on same line
      if (this.check(TokenType.INTO)) {
        this.advance(); // skip 'into'
        const targetName = this.expectIdentifierName();
        this.skipNewlines();

        // Check for multiline list
        if (this.check(TokenType.NEWLINE) || this.checkListBody()) {
          this.skipNewlines();
          const items: AST.Expression[] = [];
          while (!this.check(TokenType.END) && !this.isAtEnd()) {
            this.skipNewlines();
            if (this.check(TokenType.END)) break;
            items.push(this.parseExpression());
            this.skipNewlines();
          }
          this.expect(TokenType.END);
          return { type: 'ListLiteralMultiline', target: targetName, items, line };
        }

        return {
          type: 'PutStatement',
          value: { type: 'ListLiteral', items: [] },
          target: { type: 'Identifier', name: targetName },
          line
        };
      }

      // Multiline list: put list into X \n items \n end
      this.skipNewlines();
      if (this.check(TokenType.INTO)) {
        this.advance();
        const targetName = this.expectIdentifierName();
        this.skipNewlines();
        const items: AST.Expression[] = [];
        while (!this.check(TokenType.END) && !this.isAtEnd()) {
          this.skipNewlines();
          if (this.check(TokenType.END)) break;
          items.push(this.parseExpression());
          this.skipNewlines();
        }
        this.expect(TokenType.END);
        return { type: 'ListLiteralMultiline', target: targetName, items, line };
      }

      return {
        type: 'PutStatement',
        value: { type: 'ListLiteral', items: [] },
        target: { type: 'Identifier', name: 'list' },
        line
      };
    }

    // "put ask ... into X" shortform
    if (this.check(TokenType.ASK)) {
      const askExpr = this.parseAskExpr();
      this.expect(TokenType.INTO);
      const target = this.parseExpression();
      return { type: 'PutStatement', value: askExpr, target, line };
    }

    // "put map into X" — create an empty map (matches "put list into X" behavior)
    if (this.check(TokenType.MAP)) {
      this.advance(); // skip 'map'
      if (this.check(TokenType.INTO)) {
        this.expect(TokenType.INTO);
        const target = this.parseExpression();
        return { type: 'PutStatement', value: { type: 'MapLiteral' }, target, line };
      }
      // Not followed by INTO — fall through to literal text, but put 'map' back
      this.pos--;
    }

    // "put pair X and Y into Z" — create a pair
    if (this.check(TokenType.PAIR)) {
      const saved = this.pos;
      this.advance(); // skip 'pair'
      if (!this.check(TokenType.INTO) && !this.check(TokenType.NEWLINE) && !this.isAtEnd()) {
        const first = this.parseAddition();
        if (this.check(TokenType.AND) || this.check(TokenType.COMMA)) {
          this.advance();
          const second = this.parseAddition();
          this.expect(TokenType.INTO);
          const target = this.parseExpression();
          return { type: 'PutStatement', value: { type: 'PairLiteral', first, second }, target, line };
        }
      }
      // Not a valid pair expression — fall through to literal text
      this.pos = saved;
    }

    // "put unique list X, Y into Z" — create a set (matches "put list" behavior)
    if (this.check(TokenType.UNIQUE)) {
      const saved = this.pos;
      this.advance(); // skip 'unique'
      if (this.check(TokenType.LIST)) this.advance(); // optional 'list'
      if (this.check(TokenType.INTO)) {
        this.expect(TokenType.INTO);
        const target = this.parseExpression();
        return { type: 'PutStatement', value: { type: 'SetLiteral', items: [] }, target, line };
      }
      if (!this.check(TokenType.NEWLINE) && !this.isAtEnd()) {
        const items = this.parseListItems();
        this.expect(TokenType.INTO);
        const target = this.parseExpression();
        return { type: 'PutStatement', value: { type: 'SetLiteral', items }, target, line };
      }
      // Not a valid unique expression — fall through to literal text
      this.pos = saved;
    }

    // put is ALWAYS literal text — collect all tokens between put and into as raw text
    const parts: string[] = [];
    while (!this.isAtEnd() && !this.check(TokenType.INTO) && !this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF)) {
      const val = this.current().value;
      if (this.check(TokenType.DOT)) {
        // Attach punctuation to previous word
        if (parts.length > 0) {
          parts[parts.length - 1] += '.';
        }
      } else if (val === '!' || val === '?' || val === ',' || val === ':' || val === ';') {
        if (parts.length > 0) {
          parts[parts.length - 1] += val;
        }
      } else {
        parts.push(val);
      }
      this.advance();
    }
    const value: AST.Expression = { type: 'StringLiteral', value: parts.join(' ') };

    this.expect(TokenType.INTO);
    const target = this.parseExpression();
    return { type: 'PutStatement', value, target, line };
  }

  private parseSet(): AST.SetStatement | AST.DestructureStatement {
    const line = this.current().line;
    this.advance(); // skip 'set'

    // Parse target: identifier or dot path
    let target: AST.Expression;
    let name: string;
    if (this.check(TokenType.ME)) {
      name = 'me';
      this.advance();
    } else {
      name = this.expectIdentifierName();
    }

    // Check for destructuring: set a, b, c from expr
    if (this.check(TokenType.COMMA)) {
      const variables = [name];
      while (this.check(TokenType.COMMA)) {
        this.advance();
        variables.push(this.expectIdentifierName());
      }
      this.expect(TokenType.FROM);
      const source = this.parseExpression();
      return { type: 'DestructureStatement', variables, source, line };
    }

    if (this.check(TokenType.DOT)) {
      // dot path: x.y.z
      const path = [name];
      while (this.check(TokenType.DOT)) {
        this.advance();
        path.push(this.expectIdentifierName());
      }
      if (path.length === 2) {
        target = { type: 'PropertyAccess', object: { type: 'Identifier', name: path[0] }, property: path[1] };
      } else {
        target = { type: 'DotExpression', path };
      }
    } else if (this.check(TokenType.DOT_IDENTIFIER)) {
      const dotPath = this.current().value.slice(1).split('.');
      this.advance();
      const path = [name, ...dotPath];
      if (path.length === 2) {
        target = { type: 'PropertyAccess', object: { type: 'Identifier', name: path[0] }, property: path[1] };
      } else {
        target = { type: 'DotExpression', path };
      }
    } else {
      target = { type: 'Identifier', name };
    }

    this.expect(TokenType.TO);
    const value = this.parseSetValue();
    return { type: 'SetStatement', target, value, line };
  }

  private parseSetValue(): AST.Expression {
    // Special keyword expressions that should not be parsed as command calls
    if (this.check(TokenType.PAIR) || this.check(TokenType.UNIQUE) ||
        this.check(TokenType.CURRY) || this.check(TokenType.COMPOSE) ||
        this.check(TokenType.JSON_TYPE) || this.check(TokenType.CSV) ||
        this.check(TokenType.ENV) || this.check(TokenType.LBRACE)) {
      return this.parseExpression();
    }

    // Check for command call patterns
    if (this.check(TokenType.IDENTIFIER) || this.isKeywordUsableAsIdentifier()) {
      const savedPos = this.pos;
      const firstType = this.current().type;

      // Scan ahead to categorize
      let hasAnd = false;
      let hasOperator = false;
      let tokenCount = 0;
      let scanPos = this.pos;
      while (scanPos < this.tokens.length) {
        const t = this.tokens[scanPos].type;
        if (t === TokenType.NEWLINE || t === TokenType.EOF) break;
        if (t === TokenType.AND) hasAnd = true;
        if ([TokenType.PLUS, TokenType.MINUS, TokenType.STAR, TokenType.SLASH,
             TokenType.PERCENT, TokenType.CARET, TokenType.EQ, TokenType.NEQ,
             TokenType.GT, TokenType.LT, TokenType.GTE, TokenType.LTE,
             TokenType.IS, TokenType.CONTAINS, TokenType.WHERE, TokenType.EACH,
             TokenType.LPAREN, TokenType.DOT, TokenType.DOT_IDENTIFIER,
             TokenType.ROUNDED, TokenType.FORMAT, TokenType.MATCHES,
             TokenType.PIPE, TokenType.EXISTS].includes(t)) {
          hasOperator = true;
        }
        tokenCount++;
        scanPos++;
      }

      // If has 'and' separator and no operators that suggest an expression, parse as command call
      if (hasAnd && !hasOperator) {
        const cmdName = this.current().value;
        this.advance();
        const args: AST.Expression[] = [];
        while (!this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.isAtEnd()) {
          if (this.check(TokenType.AND) || this.check(TokenType.COMMA)) { this.advance(); continue; }
          args.push(this.parseAddition());
        }
        if (args.length > 0) {
          return { type: 'CallExpression', name: cmdName, args };
        }
        this.pos = savedPos;
      }

      // If identifier followed by simple args (no operators), could be a command call
      // e.g., "set result to double 5" — identifier followed by a value
      if (!hasOperator && !hasAnd && tokenCount > 1 && firstType === TokenType.IDENTIFIER) {
        const cmdName = this.current().value;
        this.advance();
        const args: AST.Expression[] = [];
        while (!this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.isAtEnd()) {
          if (this.check(TokenType.COMMA)) { this.advance(); continue; }
          args.push(this.parseAddition());
        }
        if (args.length > 0) {
          return { type: 'CallExpression', name: cmdName, args };
        }
        this.pos = savedPos;
      }
    }

    // Check for "send X to Y" expression
    if (this.check(TokenType.SEND)) {
      return this.parsePrimary();
    }

    return this.parseExpression();
  }

  private parseShow(): AST.ShowStatement {
    const line = this.current().line;
    this.advance(); // skip 'show'
    const parts: AST.ShowPart[] = [];

    while (!this.isAtEnd() && !this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF)) {
      if (this.check(TokenType.DOT_IDENTIFIER)) {
        const path = this.current().value;
        this.advance();
        parts.push({ type: 'interpolation', path: path.slice(1) }); // remove leading dot
      } else if (this.check(TokenType.LPAREN)) {
        this.advance(); // skip (
        // Check for function call pattern: (funcName args...)
        const savedPos = this.pos;
        if ((this.check(TokenType.IDENTIFIER) || this.isKeywordUsableAsIdentifier()) && !this.check(TokenType.RPAREN)) {
          const name = this.current().value;
          this.advance();
          if (!this.check(TokenType.RPAREN) && !this.check(TokenType.PLUS) && !this.check(TokenType.MINUS) &&
              !this.check(TokenType.STAR) && !this.check(TokenType.SLASH) && !this.check(TokenType.EQ) &&
              !this.check(TokenType.NEQ) && !this.check(TokenType.GT) && !this.check(TokenType.LT) &&
              !this.check(TokenType.GTE) && !this.check(TokenType.LTE) && !this.check(TokenType.DOT) &&
              !this.check(TokenType.DOT_IDENTIFIER) &&
              !this.check(TokenType.IS) && !this.check(TokenType.AND) && !this.check(TokenType.OR)) {
            // Looks like a function call: (funcName arg1, arg2)
            const args: AST.Expression[] = [];
            while (!this.check(TokenType.RPAREN) && !this.isAtEnd()) {
              args.push(this.parseAddition());
              if (this.check(TokenType.COMMA)) this.advance();
            }
            this.expect(TokenType.RPAREN);
            parts.push({ type: 'expression', expr: { type: 'CallExpression', name, args } });
            continue;
          }
          this.pos = savedPos;
        }
        const expr = this.parseExpression();
        this.expect(TokenType.RPAREN);
        parts.push({ type: 'expression', expr });
      } else {
        // Collect text tokens
        let text = this.current().value;
        this.advance();
        // Collect consecutive text-like tokens
        while (!this.isAtEnd() && !this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) &&
               !this.check(TokenType.DOT_IDENTIFIER) && !this.check(TokenType.LPAREN)) {
          const val = this.current().value;
          // Don't add space before punctuation
          if (val === '!' || val === '?' || val === '.' || val === ',' || val === ':' || val === ';') {
            text += val;
          } else {
            text += ' ' + val;
          }
          this.advance();
        }
        parts.push({ type: 'text', value: text });
      }
    }

    return { type: 'ShowStatement', parts, line };
  }

  private parseAskExpr(): AST.AskExpression {
    const line = this.current().line;
    this.advance(); // skip 'ask'
    let prompt = '';
    while (!this.isAtEnd() && !this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.check(TokenType.INTO)) {
      if (this.check(TokenType.DOT_IDENTIFIER)) {
        prompt += this.current().value;
      } else {
        if (prompt) prompt += ' ';
        prompt += this.current().value;
      }
      this.advance();
    }
    return { type: 'AskExpression', prompt: prompt.trim(), line };
  }

  private parseAskStatement(): AST.AskExpression {
    return this.parseAskExpr();
  }

  private parseIf(): AST.IfStatement {
    const line = this.current().line;
    this.advance(); // skip 'if'
    const condition = this.parseExpression();
    this.skipNewlines();
    const body = this.parseBlock(['ELSE', 'ELSE_IF', 'END']);
    const elseIfClauses: { condition: AST.Expression; body: AST.ASTNode[] }[] = [];
    let elseBody: AST.ASTNode[] = [];

    while (this.check(TokenType.ELSE_IF)) {
      this.advance(); // skip 'else if'
      const eifCondition = this.parseExpression();
      this.skipNewlines();
      const eifBody = this.parseBlock(['ELSE', 'ELSE_IF', 'END']);
      elseIfClauses.push({ condition: eifCondition, body: eifBody });
    }

    if (this.check(TokenType.ELSE)) {
      this.advance(); // skip 'else'
      this.skipNewlines();
      elseBody = this.parseBlock(['END']);
    }

    this.expect(TokenType.END);
    return { type: 'IfStatement', condition, body, elseIfClauses, elseBody, line };
  }

  private parseRepeat(): AST.RepeatStatement {
    const line = this.current().line;
    this.advance(); // skip 'repeat'

    // Check for label: repeat as outer
    let label: string | undefined;
    if (this.check(TokenType.AS)) {
      this.advance();
      label = this.expectIdentifierName();
    }

    if (this.check(TokenType.FOREVER)) {
      this.advance();
      this.skipNewlines();
      const body = this.parseBlock(['END']);
      this.expect(TokenType.END);
      return { type: 'RepeatStatement', variant: 'forever', label, body, line };
    }

    if (this.check(TokenType.WHILE)) {
      this.advance();
      const condition = this.parseExpression();
      this.skipNewlines();
      const body = this.parseBlock(['END']);
      this.expect(TokenType.END);
      return { type: 'RepeatStatement', variant: 'while', condition, body, line };
    }

    if (this.check(TokenType.UNTIL)) {
      this.advance();
      const condition = this.parseExpression();
      this.skipNewlines();
      const body = this.parseBlock(['END']);
      this.expect(TokenType.END);
      return { type: 'RepeatStatement', variant: 'until', condition, body, line };
    }

    // repeat N times [with i] [as label]
    const count = this.parseExpression();
    this.expect(TokenType.TIMES);

    let counterVariable: string | undefined;
    if (this.check(TokenType.WITH)) {
      this.advance(); // skip 'with'
      counterVariable = this.expectIdentifierName();
    }

    // Check for label after times: repeat 5 times as outer
    if (this.check(TokenType.AS)) {
      this.advance();
      label = this.expectIdentifierName();
    }

    this.skipNewlines();
    const body = this.parseBlock(['END']);
    this.expect(TokenType.END);
    return { type: 'RepeatStatement', variant: 'times', count, counterVariable, label, body, line };
  }

  private parseForEach(): AST.ForEachStatement {
    const line = this.current().line;
    this.advance(); // skip 'for'
    this.expect(TokenType.EACH);

    const variable = this.expectIdentifierName();
    let indexVariable: string | undefined;

    // Check for "at i"
    if (this.check(TokenType.AT)) {
      this.advance();
      indexVariable = this.expectIdentifierName();
    }

    this.expect(TokenType.IN);

    // Check for range: 1 to 10
    const startExpr = this.parseExpression();
    let iterable: AST.Expression;

    if (this.check(TokenType.TO)) {
      this.advance();
      const endExpr = this.parseExpression();
      iterable = { type: 'RangeExpression', start: startExpr, end: endExpr };
    } else {
      iterable = startExpr;
    }

    // Check for "by N" step
    let step: AST.Expression | undefined;
    if (this.check(TokenType.BY)) {
      this.advance();
      step = this.parseExpression();
    }

    this.skipNewlines();
    const body = this.parseBlock(['END']);
    this.expect(TokenType.END);
    return { type: 'ForEachStatement', variable, indexVariable, iterable, step, body, line };
  }

  private parseKind(): AST.KindDeclaration | AST.EnumDeclaration {
    const line = this.current().line;
    this.advance(); // skip 'kind'
    const name = this.expectIdentifierName();

    // Enum shorthand: kind Color is red, green, blue end
    if (this.check(TokenType.IS)) {
      const savedPos = this.pos;
      this.advance();
      if (!this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.isAtEnd()) {
        const firstName = this.expectIdentifierName();
        if (this.check(TokenType.COMMA)) {
          const values: string[] = [firstName];
          while (this.check(TokenType.COMMA)) {
            this.advance();
            values.push(this.expectIdentifierName());
          }
          this.skipNewlines();
          if (this.check(TokenType.END)) this.advance();
          return { type: 'EnumDeclaration', name, values, line };
        }
        // Not an enum, restore - fall through to normal kind
        this.pos = savedPos;
      } else {
        this.pos = savedPos;
      }
    }

    let parent: string | undefined;
    let implementsList: string[] | undefined;
    let mixins: string[] | undefined;

    if (this.check(TokenType.FROM)) {
      this.advance();
      parent = this.expectIdentifierName();
    }

    if (this.check(TokenType.IMPLEMENTS)) {
      this.advance();
      implementsList = [this.expectIdentifierName()];
      while (this.check(TokenType.COMMA)) {
        this.advance();
        implementsList.push(this.expectIdentifierName());
      }
    }

    if (this.check(TokenType.USES)) {
      this.advance();
      mixins = [this.expectIdentifierName()];
      while (this.check(TokenType.COMMA)) {
        this.advance();
        mixins.push(this.expectIdentifierName());
      }
    }

    this.skipNewlines();

    const fields: { name: string; defaultValue: AST.Expression; isPrivate?: boolean }[] = [];
    const methods: AST.OnHandler[] = [];
    const staticMethods: AST.OnHandler[] = [];
    const getters: AST.OnHandler[] = [];
    const operators: { op: string; handler: AST.OnHandler }[] = [];

    while (!this.check(TokenType.END) && !this.isAtEnd()) {
      this.skipNewlines();
      if (this.check(TokenType.END)) break;

      if (this.check(TokenType.ON)) {
        methods.push(this.parseOn() as AST.OnHandler);
      } else if (this.check(TokenType.STATIC)) {
        this.advance();
        if (this.check(TokenType.ON)) {
          staticMethods.push(this.parseOn() as AST.OnHandler);
        }
      } else if (this.check(TokenType.GETTER)) {
        this.advance();
        getters.push(this.parseOn() as AST.OnHandler);
      } else if (this.check(TokenType.OVERLOAD)) {
        this.advance();
        const op = this.expectIdentifierName();
        const handler = this.parseOn() as AST.OnHandler;
        operators.push({ op, handler });
      } else if (this.check(TokenType.SECRET)) {
        this.advance();
        const fieldName = this.expectIdentifierName();
        this.expect(TokenType.IS);
        const defaultValue = this.parseSimpleValue();
        fields.push({ name: fieldName, defaultValue, isPrivate: true });
        this.skipNewlines();
      } else {
        // field: name is default
        const fieldName = this.expectIdentifierName();
        this.expect(TokenType.IS);
        const defaultValue = this.parseSimpleValue();
        fields.push({ name: fieldName, defaultValue });
        this.skipNewlines();
      }
    }

    this.expect(TokenType.END);
    return {
      type: 'KindDeclaration', name, parent,
      implements: implementsList, mixins,
      fields, methods, staticMethods, getters, operators,
      line,
    };
  }

  private parseMake(): AST.MakeStatement {
    const line = this.current().line;
    this.advance(); // skip 'make'

    if (this.check(TokenType.A)) this.advance(); // skip optional 'a'

    const kindName = this.expectIdentifierName();
    this.expect(TokenType.CALLED);
    const instanceName = this.expectIdentifierName();

    let inlineProps: { name: string; value: AST.Expression }[] | undefined;

    if (this.check(TokenType.WITH)) {
      this.advance();
      inlineProps = this.parseInlineProps();
    }

    return { type: 'MakeStatement', kindName, instanceName, inlineProps, line };
  }

  private parseSend(): AST.SendStatement {
    const line = this.current().line;
    this.advance(); // skip 'send'

    const message = this.expectIdentifierName();
    const args: AST.Expression[] = [];

    // Collect args until 'to'
    while (!this.check(TokenType.TO) && !this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.isAtEnd()) {
      args.push(this.parseExpression());
    }

    this.expect(TokenType.TO);
    const target = this.parseExpression();

    return { type: 'SendStatement', message, args, target, line };
  }

  private parseOn(): AST.OnHandler {
    const line = this.current().line;
    this.advance(); // skip 'on'

    const name = this.expectIdentifierName();
    const params: string[] = [];

    // Collect params until newline
    while (!this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.isAtEnd()) {
      // Skip event keywords
      if (this.check(TokenType.CLICKED) || this.check(TokenType.PRESSED) ||
          this.check(TokenType.CHANGED) || this.check(TokenType.EVERY)) {
        this.advance();
        // For timer events, skip duration tokens
        while (!this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.isAtEnd()) {
          this.advance();
        }
        break;
      }
      params.push(this.expectIdentifierName());
    }

    this.skipNewlines();
    const body = this.parseBlock(['END']);
    this.expect(TokenType.END);

    return { type: 'OnHandler', name, params, body, line };
  }

  private parseCommand(): AST.CommandDeclaration {
    const line = this.current().line;
    this.advance(); // skip 'command'

    const name = this.expectIdentifierName();
    const params: string[] = [];
    const paramTypes: (string | undefined)[] = [];

    // Support (param as type, param as type) syntax
    if (this.check(TokenType.LPAREN)) {
      this.advance();
      while (!this.check(TokenType.RPAREN) && !this.isAtEnd()) {
        const paramName = this.expectIdentifierName();
        params.push(paramName);
        if (this.check(TokenType.AS)) {
          this.advance();
          paramTypes.push(this.parseTypeName());
        } else {
          paramTypes.push(undefined);
        }
        if (this.check(TokenType.COMMA)) this.advance();
      }
      if (this.check(TokenType.RPAREN)) this.advance();
    } else {
      while (!this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.isAtEnd()) {
        // Skip 'and' and commas between params
        if (this.check(TokenType.AND) || this.check(TokenType.COMMA)) {
          this.advance();
          continue;
        }
        const paramName = this.current().value;
        params.push(paramName);
        this.advance();
      }
    }

    this.skipNewlines();
    const body = this.parseBlock(['END']);
    this.expect(TokenType.END);

    return { type: 'CommandDeclaration', name, params, paramTypes: paramTypes.length > 0 ? paramTypes : undefined, body, line };
  }

  private parseReturn(): AST.ReturnStatement {
    const line = this.current().line;
    this.advance(); // skip 'return'
    // Guard clause: return if condition
    if (this.check(TokenType.IF)) {
      this.advance();
      const condition = this.parseExpression();
      return { type: 'ReturnStatement', value: { type: 'NothingLiteral' }, condition, line };
    }
    const value = this.parseExpression();
    // Check for guard: return VALUE if CONDITION
    let condition: AST.Expression | undefined;
    if (this.check(TokenType.IF)) {
      this.advance();
      condition = this.parseExpression();
    }
    return { type: 'ReturnStatement', value, condition, line };
  }

  private parseAdd(): AST.AddStatement {
    const line = this.current().line;
    this.advance(); // skip 'add'
    const value = this.parseExpression();
    this.expect(TokenType.TO);
    const target = this.parseExpression();
    return { type: 'AddStatement', value, target, line };
  }

  private parseRemove(): AST.RemoveStatement {
    const line = this.current().line;
    this.advance(); // skip 'remove'
    const value = this.parseExpression();
    this.expect(TokenType.FROM);
    const target = this.parseExpression();
    return { type: 'RemoveStatement', value, target, line };
  }

  private parseSort(): AST.SortStatement {
    const line = this.current().line;
    this.advance();
    const target = this.parseExpression();
    return { type: 'SortStatement', target, line };
  }

  private parseReverse(): AST.ReverseStatement {
    const line = this.current().line;
    this.advance();
    const target = this.parseExpression();
    return { type: 'ReverseStatement', target, line };
  }

  private parseShuffle(): AST.ShuffleStatement {
    const line = this.current().line;
    this.advance();
    const target = this.parseExpression();
    return { type: 'ShuffleStatement', target, line };
  }

  private parseTry(): AST.TryStatement {
    const line = this.current().line;
    this.advance(); // skip 'try'
    this.skipNewlines();

    const body = this.parseBlock(['OR', 'CATCH', 'END']);
    let catchVar: string | undefined;
    let catchBody: AST.ASTNode[] = [];

    if (this.check(TokenType.OR)) {
      this.advance();
      this.skipNewlines();
      catchBody = this.parseBlock(['END']);
    } else if (this.check(TokenType.CATCH)) {
      this.advance();
      if (!this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF)) {
        catchVar = this.expectIdentifierName();
      }
      this.skipNewlines();
      catchBody = this.parseBlock(['END']);
    }

    this.expect(TokenType.END);
    return { type: 'TryStatement', body, catchVar, catchBody, line };
  }

  private parseUse(): AST.UseStatement {
    const line = this.current().line;
    this.advance();

    let module: string;
    if (this.check(TokenType.STRING)) {
      module = this.current().value;
      this.advance();
    } else {
      module = this.expectIdentifierName();
    }

    return { type: 'UseStatement', module, line };
  }

  private parseTest(): AST.TestBlock {
    const line = this.current().line;
    this.advance(); // skip 'test'

    // Collect test name (everything until newline)
    let name = '';
    while (!this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.isAtEnd()) {
      if (name) name += ' ';
      name += this.current().value;
      this.advance();
    }

    this.skipNewlines();
    const body = this.parseBlock(['END']);
    this.expect(TokenType.END);

    return { type: 'TestBlock', name, body, line };
  }

  private parseCheck(): AST.CheckStatement {
    const line = this.current().line;
    this.advance(); // skip 'check'

    // Look ahead: if we see identifier followed by values then == , it's a command call comparison
    if ((this.check(TokenType.IDENTIFIER) || this.isKeywordUsableAsIdentifier()) &&
        !this.check(TokenType.NOT)) {
      const savedPos = this.pos;
      // Scan ahead to find == before newline
      let hasComparison = false;
      let hasAnd = false;
      while (!this.isAtEnd() && !this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF)) {
        if (this.check(TokenType.EQ) || this.check(TokenType.NEQ) ||
            this.check(TokenType.GT) || this.check(TokenType.LT) ||
            this.check(TokenType.GTE) || this.check(TokenType.LTE)) {
          hasComparison = true;
          break;
        }
        if (this.check(TokenType.AND)) hasAnd = true;
        this.advance();
      }
      this.pos = savedPos;

      if (hasComparison && hasAnd) {
        // Parse as command call with comparison
        const name = this.current().value;
        this.advance();
        const args: AST.Expression[] = [];
        while (!this.check(TokenType.EQ) && !this.check(TokenType.NEQ) &&
               !this.check(TokenType.GT) && !this.check(TokenType.LT) &&
               !this.check(TokenType.GTE) && !this.check(TokenType.LTE) &&
               !this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.isAtEnd()) {
          if (this.check(TokenType.AND)) { this.advance(); continue; }
          args.push(this.parseAddition());
        }
        const callExpr: AST.Expression = { type: 'CallExpression', name, args };
        // Now parse the comparison
        if (this.check(TokenType.EQ) || this.check(TokenType.NEQ) ||
            this.check(TokenType.GT) || this.check(TokenType.LT) ||
            this.check(TokenType.GTE) || this.check(TokenType.LTE)) {
          const op = this.current().value;
          this.advance();
          const right = this.parseExpression();
          return { type: 'CheckStatement', expression: { type: 'ComparisonExpression', op, left: callExpr, right }, line };
        }
        return { type: 'CheckStatement', expression: callExpr, line };
      }
    }

    const expression = this.parseExpression();
    return { type: 'CheckStatement', expression, line };
  }

  private parseExplain(): AST.ExplainStatement {
    const line = this.current().line;
    this.advance();
    const target = this.parseExpression();
    return { type: 'ExplainStatement', target, line };
  }

  private parseStop(): AST.StopStatement {
    const line = this.current().line;
    this.advance();
    // Check for labeled break: stop outer
    let label: string | undefined;
    if (this.check(TokenType.IDENTIFIER) && !this.check(TokenType.NEWLINE)) {
      label = this.current().value;
      this.advance();
    }
    return { type: 'StopStatement', label, line };
  }

  private parseWait(): AST.WaitStatement {
    const line = this.current().line;
    this.advance();
    const duration = this.parseExpression();
    let unit = 'seconds';
    if (this.check(TokenType.SECOND) || this.check(TokenType.SECONDS)) {
      unit = this.current().value;
      this.advance();
    } else if (this.check(TokenType.IDENTIFIER)) {
      unit = this.current().value;
      this.advance();
    }
    return { type: 'WaitStatement', duration, unit, line };
  }

  private parseDraw(): AST.DrawStatement {
    const line = this.current().line;
    this.advance(); // skip 'draw'
    const shape = this.expectIdentifierName();
    const params: Record<string, AST.Expression> = {};

    // Skip 'on canvas' if present
    let canvas = 'canvas';
    if (this.check(TokenType.ON)) {
      this.advance();
      canvas = this.expectIdentifierName();
    }

    // Parse draw params based on shape
    while (!this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.isAtEnd()) {
      const paramName = this.current().value;
      this.advance();
      if (paramName === 'at' || paramName === 'from' || paramName === 'to' ||
          paramName === 'radius' || paramName === 'size' || paramName === 'saying') {
        params[paramName] = this.parseExpression();
      }
    }

    return { type: 'DrawStatement', shape, canvas, params, line };
  }

  private parseClear(): AST.ClearStatement {
    const line = this.current().line;
    this.advance();
    const target = this.check(TokenType.IDENTIFIER) ? this.current().value : 'canvas';
    if (this.check(TokenType.IDENTIFIER)) this.advance();
    return { type: 'ClearStatement', target, line };
  }

  private parseGo(): AST.GoStatement {
    const line = this.current().line;
    this.advance(); // skip 'go'
    if (this.check(TokenType.TO)) this.advance(); // skip optional 'to'
    const target = this.parseExpression();
    return { type: 'GoStatement', target, line };
  }

  private parseOpen(): AST.OpenStatement {
    const line = this.current().line;
    this.advance();
    const target = this.parseExpression();
    return { type: 'OpenStatement', target, line };
  }

  private parseHide(): AST.HideStatement {
    const line = this.current().line;
    this.advance();
    const target = this.parseExpression();
    return { type: 'HideStatement', target, line };
  }

  private parsePlay(): AST.PlayStatement {
    const line = this.current().line;
    this.advance(); // skip 'play'
    // expect 'sound'
    if (this.check(TokenType.IDENTIFIER) && this.current().value === 'sound') {
      this.advance();
    }
    const sound = this.expectIdentifierName();
    let waitFlag = false;
    if (this.check(TokenType.AND)) {
      this.advance();
      if (this.check(TokenType.WAIT)) {
        this.advance();
        waitFlag = true;
      }
    }
    return { type: 'PlayStatement', sound, waitFlag, line };
  }

  private parseWhen(): AST.WhenStatement {
    const line = this.current().line;
    this.advance(); // skip 'when'
    const target = this.parseExpression();
    this.skipNewlines();

    const cases: { value: AST.Expression; body: AST.ASTNode[] }[] = [];
    let elseBody: AST.ASTNode[] = [];

    while (!this.check(TokenType.END) && !this.isAtEnd()) {
      this.skipNewlines();
      if (this.check(TokenType.END)) break;

      if (this.check(TokenType.IS)) {
        this.advance(); // skip 'is'
        // Support "is a KindName" for type-based matching
        if (this.check(TokenType.A)) {
          this.advance(); // skip 'a'
          const typeName = this.parseTypeName();
          this.skipNewlines();
          const body = this.parseBlock(['IS', 'ELSE', 'END']);
          // Encode as TypeCheckExpression in the value slot
          const value: AST.Expression = { type: 'TypeCheckExpression', value: { type: 'StringLiteral', value: '__when_type_check__' }, targetType: typeName, negated: false };
          cases.push({ value, body });
        } else {
          const value = this.parseExpression();
          // Support "is VALUE1 or VALUE2" fallthrough
          const orValues: AST.Expression[] = [value];
          while (this.check(TokenType.OR)) {
            this.advance();
            orValues.push(this.parseExpression());
          }
          this.skipNewlines();
          const body = this.parseBlock(['IS', 'ELSE', 'END']);
          if (orValues.length === 1) {
            cases.push({ value, body });
          } else {
            // Add each or-value with the same body
            for (const v of orValues) {
              cases.push({ value: v, body });
            }
          }
        }
      } else if (this.check(TokenType.ELSE)) {
        this.advance();
        this.skipNewlines();
        elseBody = this.parseBlock(['END']);
      } else {
        this.advance(); // skip unexpected
      }
    }

    this.expect(TokenType.END);
    return { type: 'WhenStatement', target, cases, elseBody, line };
  }

  private parseWrite(): AST.WriteStatement {
    const line = this.current().line;
    this.advance(); // skip 'write'
    const path = this.parsePrimary();
    this.expect(TokenType.WITH);
    const value = this.parseExpression();
    return { type: 'WriteStatement', path, value, append: false, line };
  }

  private parseAppend(): AST.WriteStatement {
    const line = this.current().line;
    this.advance(); // skip 'append'
    const path = this.parsePrimary();
    this.expect(TokenType.WITH);
    const value = this.parseExpression();
    return { type: 'WriteStatement', path, value, append: true, line };
  }

  // --- Remember/Recall/Forget ---
  private parseRemember(): AST.RememberStatement {
    const line = this.current().line;
    this.advance(); // skip 'remember'
    const key = this.parseExpression();
    this.expect(TokenType.AS);
    const value = this.parseExpression();
    return { type: 'RememberStatement', key, value, line };
  }

  private parseForget(): AST.ForgetStatement {
    const line = this.current().line;
    this.advance(); // skip 'forget'
    const key = this.parseExpression();
    return { type: 'ForgetStatement', key, line };
  }

  // --- Web server ---
  private parseServe(): AST.ServeStatement {
    const line = this.current().line;
    this.advance(); // skip 'serve'
    if (this.check(TokenType.ON)) this.advance(); // skip optional 'on'
    if (this.check(TokenType.IDENTIFIER) && this.current().value === 'port') this.advance(); // skip optional 'port'
    const port = this.parseExpression();
    return { type: 'ServeStatement', port, line };
  }

  private parseRespond(): AST.RespondStatement {
    const line = this.current().line;
    this.advance(); // skip 'respond'
    if (this.check(TokenType.WITH)) this.advance(); // skip optional 'with'
    const value = this.parseExpression();
    let statusCode: AST.Expression | undefined;
    if (this.check(TokenType.STATUS)) {
      this.advance();
      statusCode = this.parseExpression();
    }
    return { type: 'RespondStatement', value, statusCode, line };
  }

  private parseRoute(): AST.RouteStatement {
    const line = this.current().line;
    this.advance(); // skip 'route'
    let method = 'GET';
    if (this.check(TokenType.IDENTIFIER)) {
      const upper = this.current().value.toUpperCase();
      if (['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(upper)) {
        method = upper;
        this.advance();
      }
    }
    const path = this.parseExpression();
    this.skipNewlines();
    const body = this.parseBlock(['END']);
    this.expect(TokenType.END);
    return { type: 'RouteStatement', method, path, body, line };
  }

  // --- Packages ---
  private parseGrab(): AST.GrabStatement {
    const line = this.current().line;
    this.advance(); // skip 'grab'
    let module: string;
    if (this.check(TokenType.STRING)) {
      module = this.current().value;
      this.advance();
    } else {
      module = this.expectIdentifierName();
    }
    return { type: 'GrabStatement', module, line };
  }

  // --- Sharing ---
  private parseShare(): AST.ShareStatement {
    const line = this.current().line;
    this.advance(); // skip 'share'
    const target = this.parseExpression();
    return { type: 'ShareStatement', target, line };
  }

  // --- Do together ---
  private parseDoTogether(): AST.DoTogetherStatement {
    const line = this.current().line;
    this.advance(); // skip 'do'
    this.expect(TokenType.TOGETHER);
    this.skipNewlines();

    const blocks: AST.ASTNode[][] = [];
    let currentBlock: AST.ASTNode[] = [];

    while (!this.check(TokenType.END) && !this.isAtEnd()) {
      this.skipNewlines();
      if (this.check(TokenType.END)) break;

      // 'and' separates concurrent blocks
      if (this.check(TokenType.AND)) {
        this.advance();
        this.skipNewlines();
        if (currentBlock.length > 0) {
          blocks.push(currentBlock);
          currentBlock = [];
        }
        continue;
      }

      const node = this.parseStatement();
      if (node) currentBlock.push(node);
    }

    if (currentBlock.length > 0) blocks.push(currentBlock);
    this.expect(TokenType.END);
    return { type: 'DoTogetherStatement', blocks, line };
  }

  // --- Listen ---
  private parseListen(): AST.ListenStatement {
    const line = this.current().line;
    this.advance(); // skip 'listen'

    // listen for <event> [as <var>]
    if (this.check(TokenType.FOR)) this.advance(); // skip optional 'for'
    const event = this.expectIdentifierName();
    let variable: string | undefined;
    if (this.check(TokenType.AS)) {
      this.advance();
      variable = this.expectIdentifierName();
    }
    this.skipNewlines();
    const body = this.parseBlock(['END']);
    this.expect(TokenType.END);
    return { type: 'ListenStatement', event, variable, body, line };
  }

  // --- Every (timer) ---
  private parseEvery(): AST.EveryStatement {
    const line = this.current().line;
    this.advance(); // skip 'every'
    const interval = this.parseExpression();
    let unit = 'seconds';
    if (this.check(TokenType.SECOND) || this.check(TokenType.SECONDS)) {
      unit = this.current().value;
      this.advance();
    } else if (this.check(TokenType.IDENTIFIER)) {
      unit = this.current().value;
      this.advance();
    }
    this.skipNewlines();
    const body = this.parseBlock(['END']);
    this.expect(TokenType.END);
    return { type: 'EveryStatement', interval, unit, body, line };
  }

  private parseExpressionStatement(): AST.ExpressionStatement | AST.InspectExpression {
    const line = this.current().line;

    // Check if this looks like a command call: identifier followed by args
    if (this.check(TokenType.IDENTIFIER)) {
      const name = this.current().value;
      const savedPos = this.pos;
      this.advance();

      // Check for ? (inspect)
      if (this.check(TokenType.QUESTION)) {
        this.advance();
        return { type: 'InspectExpression', target: { type: 'Identifier', name }, line };
      }

      // If followed by arguments (not operator, not newline, not EOF)
      if (!this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.isAtEnd() &&
          !this.isOperator() && !this.check(TokenType.DOT) && !this.check(TokenType.DOT_IDENTIFIER)) {
        // Collect arguments
        const args: AST.Expression[] = [];
        while (!this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.isAtEnd()) {
          if (this.check(TokenType.AND)) {
            this.advance(); // skip 'and' separator
            continue;
          }
          args.push(this.parseAddition());
        }
        if (args.length > 0) {
          return {
            type: 'ExpressionStatement',
            expression: { type: 'CallExpression', name, args },
            line
          };
        }
      }

      // Restore and parse normally
      this.pos = savedPos;
    }

    const expr = this.parseExpression();

    // Check for ? (inspect)
    if (this.check(TokenType.QUESTION)) {
      this.advance();
      return { type: 'InspectExpression', target: expr, line };
    }

    return { type: 'ExpressionStatement', expression: expr, line };
  }

  // ---- Expression parsing ----

  private parseExpression(): AST.Expression {
    let expr = this.parseLogical();

    // Pipeline: expr | transform | transform  or  expr |> transform
    while (this.check(TokenType.PIPE)) {
      this.advance();
      const stages: AST.Expression[] = [expr];
      stages.push(this.parseLogical());
      while (this.check(TokenType.PIPE)) {
        this.advance();
        stages.push(this.parseLogical());
      }
      expr = { type: 'PipelineExpression', stages };
    }

    return expr;
  }

  private parseLogical(): AST.Expression {
    let left = this.parseComparison();

    while (this.check(TokenType.AND) || this.check(TokenType.OR)) {
      const op = this.current().value as 'and' | 'or';
      this.advance();
      const right = this.parseComparison();
      left = { type: 'LogicalExpression', op, left, right };
    }

    return left;
  }

  private parseComparison(): AST.Expression {
    let left = this.parseContainsOrWhere();

    // English-style comparisons
    if (this.check(TokenType.IS)) {
      this.advance(); // skip 'is'

      if (this.check(TokenType.NOT)) {
        this.advance(); // skip 'not'
        // "is not a <type>" — type check negated
        if (this.check(TokenType.A)) {
          this.advance(); // skip 'a'
          const typeName = this.parseTypeName();
          return { type: 'TypeCheckExpression', value: left, targetType: typeName, negated: true };
        }
        const right = this.parseAddition();
        return { type: 'ComparisonExpression', op: '!=', left, right };
      }

      // "is a <type>" — type check
      if (this.check(TokenType.A)) {
        this.advance(); // skip 'a'
        const typeName = this.parseTypeName();
        return { type: 'TypeCheckExpression', value: left, targetType: typeName, negated: false };
      }

      // "is nothing" — special equality
      if (this.check(TokenType.NOTHING)) {
        this.advance();
        return { type: 'TypeCheckExpression', value: left, targetType: 'nothing', negated: false };
      }

      if (this.check(TokenType.GREATER)) {
        this.advance(); // skip 'greater'
        this.expect(TokenType.THAN);
        const right = this.parseAddition();
        return { type: 'ComparisonExpression', op: '>', left, right };
      }

      if (this.check(TokenType.LESS)) {
        this.advance(); // skip 'less'
        this.expect(TokenType.THAN);
        const right = this.parseAddition();
        return { type: 'ComparisonExpression', op: '<', left, right };
      }

      // "is X" means equality
      const right = this.parseAddition();
      return { type: 'ComparisonExpression', op: '==', left, right };
    }

    // "matches" pattern
    if (this.check(TokenType.MATCHES)) {
      this.advance();
      const pattern = this.parseAddition();
      return { type: 'RegexMatchExpression', value: left, pattern };
    }

    // "exists" check
    if (this.check(TokenType.EXISTS)) {
      this.advance();
      return { type: 'ExistsExpression', target: left };
    }

    // "format N places" expression
    if (this.check(TokenType.FORMAT)) {
      this.advance();
      const places = this.parseAddition();
      if (this.check(TokenType.PLACES)) this.advance();
      return { type: 'FormatExpression', value: left, places };
    }

    // "touches" check
    if (this.check(TokenType.TOUCHES)) {
      this.advance();
      const right = this.parseAddition();
      return { type: 'TouchesExpression', left, right };
    }

    if (this.check(TokenType.EQ) || this.check(TokenType.NEQ) ||
        this.check(TokenType.GT) || this.check(TokenType.LT) ||
        this.check(TokenType.GTE) || this.check(TokenType.LTE)) {
      const op = this.current().value;
      this.advance();
      const right = this.parseAddition();
      return { type: 'ComparisonExpression', op, left, right };
    }

    return left;
  }

  private parseContainsOrWhere(): AST.Expression {
    let left = this.parseAddition();

    if (this.check(TokenType.CONTAINS)) {
      this.advance();
      const value = this.parseAddition();
      return { type: 'ContainsExpression', collection: left, value };
    }

    while (this.check(TokenType.WHERE)) {
      this.advance();
      const predicate = this.parseComparison();
      left = { type: 'WhereExpression', source: left, predicate };
    }

    while (this.check(TokenType.EACH) && !this.checkPrev(TokenType.FOR)) {
      this.advance();
      const transform = this.parseAddition();
      left = { type: 'EachMapExpression', source: left, transform };
    }

    return left;
  }

  private parseAddition(): AST.Expression {
    let left = this.parseMultiplication();

    while (this.check(TokenType.PLUS) || this.check(TokenType.MINUS)) {
      const op = this.current().value;
      this.advance();
      const right = this.parseMultiplication();
      left = { type: 'BinaryExpression', op, left, right };
    }

    return left;
  }

  private parseMultiplication(): AST.Expression {
    let left = this.parseExponent();

    while (this.check(TokenType.STAR) || this.check(TokenType.SLASH) || this.check(TokenType.PERCENT)) {
      const op = this.current().value;
      this.advance();
      const right = this.parseExponent();
      left = { type: 'BinaryExpression', op, left, right };
    }

    return left;
  }

  private parseExponent(): AST.Expression {
    let left = this.parseUnary();

    if (this.check(TokenType.CARET)) {
      this.advance();
      const right = this.parseExponent(); // right-associative
      left = { type: 'BinaryExpression', op: '^', left, right };
    }

    return left;
  }

  private parseUnary(): AST.Expression {
    if (this.check(TokenType.NOT)) {
      this.advance();
      const operand = this.parseUnary();
      return { type: 'LogicalExpression', op: 'not', right: operand };
    }

    if (this.check(TokenType.MINUS)) {
      this.advance();
      const operand = this.parsePrimary();
      return { type: 'UnaryExpression', op: '-', operand };
    }

    return this.parsePostfix();
  }

  private parsePostfix(): AST.Expression {
    let expr = this.parsePrimary();

    while (true) {
      // Property access with dot token
      if (this.check(TokenType.DOT)) {
        this.advance(); // skip dot
        const property = this.expectIdentifierName();

        // Special handling for ".from N to M" (substring)
        if (property === 'from') {
          if (!this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.isAtEnd() && this.looksLikeMethodArg()) {
            const args: AST.Expression[] = [];
            args.push(this.parseAddition());
            this.expect(TokenType.TO);
            args.push(this.parseAddition());
            expr = { type: 'DotCallExpression', object: expr, method: 'from', args };
            continue;
          }
        }

        // Check if it's a method call (followed by args before newline)
        if (!this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.isAtEnd() &&
            !this.check(TokenType.DOT) && !this.isOperator() && !this.isEndToken() &&
            !this.check(TokenType.RPAREN) && !this.check(TokenType.COMMA) &&
            !this.check(TokenType.AND) && !this.check(TokenType.OR) &&
            !this.check(TokenType.INTO) && !this.check(TokenType.TO) &&
            !this.check(TokenType.FROM) && !this.check(TokenType.WHERE) &&
            !this.check(TokenType.EACH) && !this.check(TokenType.CONTAINS) &&
            !this.check(TokenType.QUESTION) && !this.check(TokenType.DOT_IDENTIFIER) &&
            !this.check(TokenType.ROUNDED) &&
            this.looksLikeMethodArg()) {
          const args: AST.Expression[] = [];
          args.push(this.parseExpression());
          expr = { type: 'DotCallExpression', object: expr, method: property, args };
        } else {
          expr = { type: 'PropertyAccess', object: expr, property };
        }
        continue;
      }

      // "rounded to N" postfix
      if (this.check(TokenType.ROUNDED)) {
        this.advance(); // skip 'rounded'
        this.expect(TokenType.TO);
        const decimals = this.parsePrimary();
        expr = { type: 'RoundedExpression', value: expr, decimals };
        continue;
      }

      // Property access via DOT_IDENTIFIER (e.g., teacher followed by .name)
      if (this.check(TokenType.DOT_IDENTIFIER)) {
        const path = this.current().value.slice(1).split('.');
        this.advance();
        // Build all but last as PropertyAccess
        for (let pi = 0; pi < path.length - 1; pi++) {
          expr = { type: 'PropertyAccess', object: expr, property: path[pi] };
        }
        const lastProp = path[path.length - 1];

        // Special handling for ".from N to M" (substring)
        if (lastProp === 'from') {
          if (!this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.isAtEnd() && this.looksLikeMethodArg()) {
            const args: AST.Expression[] = [];
            args.push(this.parseAddition());
            this.expect(TokenType.TO);
            args.push(this.parseAddition());
            expr = { type: 'DotCallExpression', object: expr, method: 'from', args };
            continue;
          }
        }

        // Check if last property is a method call (followed by args)
        if (!this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.isAtEnd() &&
            !this.check(TokenType.DOT) && !this.isOperator() && !this.isEndToken() &&
            !this.check(TokenType.RPAREN) && !this.check(TokenType.COMMA) &&
            !this.check(TokenType.AND) && !this.check(TokenType.OR) &&
            !this.check(TokenType.INTO) && !this.check(TokenType.TO) &&
            !this.check(TokenType.FROM) && !this.check(TokenType.WHERE) &&
            !this.check(TokenType.EACH) && !this.check(TokenType.CONTAINS) &&
            !this.check(TokenType.QUESTION) && !this.check(TokenType.DOT_IDENTIFIER) &&
            !this.check(TokenType.ROUNDED) &&
            this.looksLikeMethodArg()) {
          const args: AST.Expression[] = [];
          args.push(this.parseExpression());
          expr = { type: 'DotCallExpression', object: expr, method: lastProp, args };
        } else {
          expr = { type: 'PropertyAccess', object: expr, property: lastProp };
        }
        continue;
      }

      break;
    }

    return expr;
  }

  private parsePrimary(): AST.Expression {
    const token = this.current();

    // String literals
    if (this.check(TokenType.STRING)) {
      const val = this.current().value;
      this.advance();
      return { type: 'StringLiteral', value: val };
    }

    // Numbers
    if (this.check(TokenType.NUMBER)) {
      this.advance();
      return { type: 'NumberLiteral', value: parseFloat(token.value) };
    }

    // Booleans
    if (this.check(TokenType.TRUE)) {
      this.advance();
      return { type: 'BooleanLiteral', value: true };
    }
    if (this.check(TokenType.FALSE)) {
      this.advance();
      return { type: 'BooleanLiteral', value: false };
    }

    // Nothing
    if (this.check(TokenType.NOTHING)) {
      this.advance();
      return { type: 'NothingLiteral' };
    }

    // Me
    if (this.check(TokenType.ME)) {
      this.advance();
      return { type: 'MeExpression' };
    }

    // It
    if (this.check(TokenType.IT)) {
      this.advance();
      return { type: 'ItExpression' };
    }

    // Dot identifier (.name interpolation)
    if (this.check(TokenType.DOT_IDENTIFIER)) {
      const path = token.value.slice(1).split('.');
      this.advance();
      if (path.length === 1) {
        return { type: 'Identifier', name: path[0] };
      }
      return { type: 'DotExpression', path };
    }

    // Parenthesized expression or tuple
    if (this.check(TokenType.LPAREN)) {
      this.advance();
      const expr = this.parseExpression();
      this.expect(TokenType.RPAREN);
      return { type: 'ParenExpression', expr };
    }

    // Map literal (empty or with entries)
    if (this.check(TokenType.MAP)) {
      this.advance();
      // Check for map with entries: map key: value, key: value
      if (!this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.isAtEnd() &&
          !this.check(TokenType.INTO) && !this.check(TokenType.RPAREN)) {
        const savedPos = this.pos;
        try {
          const entries: { key: AST.Expression; value: AST.Expression }[] = [];
          const keyName = this.expectIdentifierName();
          if (this.check(TokenType.COLON)) {
            this.advance();
            const val = this.parseExpression();
            entries.push({ key: { type: 'StringLiteral', value: keyName }, value: val });
            while (this.check(TokenType.COMMA)) {
              this.advance();
              const k = this.expectIdentifierName();
              this.expect(TokenType.COLON);
              const v = this.parseExpression();
              entries.push({ key: { type: 'StringLiteral', value: k }, value: v });
            }
            return { type: 'MapLiteralWithEntries', entries };
          }
          // Not a keyed map, restore
          this.pos = savedPos;
        } catch {
          this.pos = savedPos;
        }
      }
      return { type: 'MapLiteral' };
    }

    // Random expression
    if (this.check(TokenType.RANDOM)) {
      this.advance();

      // random pick from <list>
      if (this.check(TokenType.PICK)) {
        this.advance(); // skip 'pick'
        this.expect(TokenType.FROM);
        const source = this.parseExpression();
        return { type: 'RandomExpression', variant: 'pick', source };
      }

      // random <n> to <m>
      if (!this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.isAtEnd() &&
          !this.check(TokenType.RPAREN) && !this.check(TokenType.COMMA) && !this.isEndToken()) {
        const start = this.parseAddition();
        this.expect(TokenType.TO);
        const end = this.parseAddition();
        return { type: 'RandomExpression', variant: 'range', start, end };
      }

      // random (bare float)
      return { type: 'RandomExpression', variant: 'float' };
    }

    // Think expression (AI)
    if (this.check(TokenType.THINK)) {
      const thinkLine = this.current().line;
      this.advance();
      const prompt = this.parseExpression();
      return { type: 'ThinkExpression', prompt, line: thinkLine };
    }

    // Fetch expression (HTTP)
    if (this.check(TokenType.FETCH)) {
      const fetchLine = this.current().line;
      this.advance();
      const url = this.parsePrimary();
      return { type: 'FetchExpression', url, line: fetchLine };
    }

    // Recall expression (storage)
    if (this.check(TokenType.RECALL)) {
      const recallLine = this.current().line;
      this.advance();
      const key = this.parseExpression();
      return { type: 'RecallExpression', key, line: recallLine };
    }

    // Interpolated string: "hello {name}"
    if (this.check(TokenType.INTERPOLATED_STRING)) {
      const raw = this.current().value;
      this.advance();
      return this.parseInterpolatedString(raw);
    }

    // Lambda: { x -> x * 2 } or { -> show hello }
    if (this.check(TokenType.LBRACE)) {
      return this.parseLambda();
    }

    // Pair literal
    if (this.check(TokenType.PAIR)) {
      this.advance();
      const first = this.parseComparison();
      if (this.check(TokenType.AND)) {
        this.advance();
      } else {
        this.expect(TokenType.COMMA);
      }
      const second = this.parseComparison();
      return { type: 'PairLiteral', first, second };
    }

    // Set literal: unique list or set keyword
    if (this.check(TokenType.UNIQUE)) {
      this.advance();
      if (this.check(TokenType.LIST)) this.advance();
      const items = this.parseListItems();
      return { type: 'SetLiteral', items };
    }

    // Curry expression
    if (this.check(TokenType.CURRY)) {
      this.advance();
      const command = this.expectIdentifierName();
      const args: AST.Expression[] = [];
      if (this.check(TokenType.WITH)) this.advance();
      // Parse remaining args (with or without 'with' keyword)
      while (!this.isAtEnd() && !this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) &&
             !this.check(TokenType.RPAREN) && !this.check(TokenType.RBRACE)) {
        args.push(this.parseAddition());
        if (this.check(TokenType.COMMA)) this.advance();
        else break;
      }
      return { type: 'CurryExpression', command, args };
    }

    // Compose expression
    if (this.check(TokenType.COMPOSE)) {
      this.advance();
      const functions: AST.Expression[] = [];
      functions.push(this.parsePrimary());
      while (this.check(TokenType.COMMA)) {
        this.advance();
        functions.push(this.parsePrimary());
      }
      return { type: 'ComposeExpression', functions };
    }

    // Env expression
    if (this.check(TokenType.ENV)) {
      this.advance();
      const key = this.parsePrimary();
      return { type: 'EnvExpression', key };
    }

    // DateTime expressions
    if (this.check(TokenType.CURRENT)) {
      this.advance();
      if (this.check(TokenType.TIME)) { this.advance(); return { type: 'DateTimeExpression', variant: 'now' }; }
      if (this.check(TokenType.DATE)) { this.advance(); return { type: 'DateTimeExpression', variant: 'today' }; }
      return { type: 'DateTimeExpression', variant: 'now' };
    }
    if (this.check(TokenType.TODAY)) {
      this.advance();
      return { type: 'DateTimeExpression', variant: 'today' };
    }

    // CSV parse
    if (this.check(TokenType.CSV)) {
      const csvLine = this.current().line;
      this.advance();
      const source = this.parsePrimary();
      return { type: 'CsvParseExpression', source, line: csvLine };
    }

    // JSON parse
    if (this.check(TokenType.JSON_TYPE)) {
      const jsonLine = this.current().line;
      this.advance();
      const source = this.parsePrimary();
      return { type: 'JsonParseExpression', source, line: jsonLine };
    }

    // Files expression
    if (this.check(TokenType.FILES)) {
      const filesLine = this.current().line;
      this.advance();
      if (this.check(TokenType.IN)) this.advance();
      const path = this.parsePrimary();
      return { type: 'FilesExpression', path, line: filesLine };
    }

    // Shell expression
    if (this.check(TokenType.SHELL) || this.check(TokenType.EXECUTE)) {
      const shellLine = this.current().line;
      this.advance();
      const command = this.parsePrimary();
      return { type: 'ShellExpression', command, line: shellLine };
    }

    // Await expression
    if (this.check(TokenType.AWAIT)) {
      const awaitLine = this.current().line;
      this.advance();
      const value = this.parseExpression();
      return { type: 'AwaitExpression', value, line: awaitLine };
    }

    // Arguments
    if (this.check(TokenType.ARGUMENTS)) {
      this.advance();
      return { type: 'Identifier', name: '__arguments' };
    }

    // Read expression
    if (this.check(TokenType.READ)) {
      const readLine = this.current().line;
      this.advance();
      const path = this.parsePrimary();
      let asType: 'list' | undefined;
      if (this.check(TokenType.AS)) {
        this.advance();
        this.expect(TokenType.LIST);
        asType = 'list';
      }
      return { type: 'ReadExpression', path, asType, line: readLine };
    }

    // List literal
    if (this.check(TokenType.LIST)) {
      this.advance();
      const items = this.parseListItems();
      return { type: 'ListLiteral', items };
    }

    // Ask expression
    if (this.check(TokenType.ASK)) {
      return this.parseAskExpr();
    }

    // Make expression (inline)
    if (this.check(TokenType.MAKE)) {
      this.advance();
      if (this.check(TokenType.A)) this.advance();
      const kindName = this.expectIdentifierName();
      let inlineProps: { name: string; value: AST.Expression }[] | undefined;
      if (this.check(TokenType.WITH)) {
        this.advance();
        inlineProps = this.parseInlineProps();
      }
      return { type: 'MakeExpression', kindName, inlineProps };
    }

    // New expression (for UI)
    if (this.check(TokenType.NEW)) {
      this.advance();
      const typeName = this.expectIdentifierName();
      return { type: 'CallExpression', name: '__new', args: [{ type: 'StringLiteral', value: typeName }] };
    }

    // Send expression (for inline use)
    if (this.check(TokenType.SEND)) {
      this.advance();
      const message = this.expectIdentifierName();
      const args: AST.Expression[] = [];
      while (!this.check(TokenType.TO) && !this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.isAtEnd()) {
        args.push(this.parseExpression());
      }
      this.expect(TokenType.TO);
      const target = this.parseExpression();
      return { type: 'CallExpression', name: '__send', args: [{ type: 'StringLiteral', value: message }, target, ...args] };
    }

    // Identifiers (variables, function calls)
    if (this.check(TokenType.IDENTIFIER)) {
      const name = token.value;
      this.advance();
      return { type: 'Identifier', name };
    }

    // Keywords used as identifiers in expressions (common in show/put contexts)
    if (this.isKeywordUsableAsIdentifier()) {
      const name = token.value;
      this.advance();
      return { type: 'Identifier', name };
    }

    throw new ParseError(`Unexpected token: ${token.value} (${token.type})`, token.line, token.column);
  }

  // ---- Helpers ----

  private parseBlock(endTokens: string[]): AST.ASTNode[] {
    const body: AST.ASTNode[] = [];
    while (!this.isAtEnd()) {
      this.skipNewlines();
      if (this.isAtEnd()) break;
      const t = this.current().type;
      if (endTokens.includes(t)) break;
      const node = this.parseStatement();
      if (node) body.push(node);
    }
    return body;
  }

  private parseListItems(): AST.Expression[] {
    const items: AST.Expression[] = [];
    if (this.check(TokenType.NEWLINE) || this.check(TokenType.EOF) || this.isAtEnd()) {
      return items;
    }

    items.push(this.parseExpression());
    while (this.check(TokenType.COMMA)) {
      this.advance();
      items.push(this.parseExpression());
    }
    return items;
  }

  private parseInlineProps(): { name: string; value: AST.Expression }[] {
    const props: { name: string; value: AST.Expression }[] = [];

    while (!this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.isAtEnd()) {
      const name = this.expectIdentifierName();
      const value = this.parseSimpleValue();
      props.push({ name, value });

      if (this.check(TokenType.COMMA)) {
        this.advance();
      } else {
        break;
      }
    }

    return props;
  }

  private parseSimpleValue(): AST.Expression {
    if (this.check(TokenType.NUMBER)) {
      const val = parseFloat(this.current().value);
      this.advance();
      return { type: 'NumberLiteral', value: val };
    }
    if (this.check(TokenType.TRUE)) { this.advance(); return { type: 'BooleanLiteral', value: true }; }
    if (this.check(TokenType.FALSE)) { this.advance(); return { type: 'BooleanLiteral', value: false }; }
    if (this.check(TokenType.NOTHING)) { this.advance(); return { type: 'NothingLiteral' }; }
    if (this.check(TokenType.LIST)) {
      this.advance();
      const items = this.parseListItems();
      return { type: 'ListLiteral', items };
    }

    // Collect text until comma, newline, or end
    let text = '';
    while (!this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.isAtEnd() &&
           !this.check(TokenType.COMMA) && !this.check(TokenType.END)) {
      // Stop at "on" for kind field definitions
      if (this.check(TokenType.ON)) break;
      if (text) text += ' ';
      text += this.current().value;
      this.advance();
    }

    if (text) {
      // Try to parse as number
      const num = parseFloat(text);
      if (!isNaN(num) && text === String(num)) {
        return { type: 'NumberLiteral', value: num };
      }
      return { type: 'StringLiteral', value: text };
    }

    return { type: 'NothingLiteral' };
  }

  private expectIdentifierName(): string {
    const token = this.current();
    if (token.type === TokenType.IDENTIFIER) {
      this.advance();
      return token.value;
    }
    // Allow keywords to be used as identifiers in certain contexts
    if (this.isKeywordUsableAsIdentifier()) {
      this.advance();
      return token.value;
    }
    throw new ParseError(`Expected identifier, got ${token.value} (${token.type})`, token.line, token.column);
  }

  private parseTypeName(): string {
    if (this.check(TokenType.NUMBER_TYPE)) { this.advance(); return 'number'; }
    if (this.check(TokenType.TEXT)) { this.advance(); return 'text'; }
    if (this.check(TokenType.LIST)) { this.advance(); return 'list'; }
    if (this.check(TokenType.MAP)) { this.advance(); return 'map'; }
    if (this.check(TokenType.NOTHING)) { this.advance(); return 'nothing'; }
    if (this.check(TokenType.BOOLEAN_TYPE)) { this.advance(); return 'boolean'; }
    // Kind name
    const name = this.expectIdentifierName();
    return name;
  }

  private isKeywordUsableAsIdentifier(): boolean {
    const t = this.current().type;
    // Allow many keywords as identifiers when used in property/variable position
    return [
      TokenType.KEY, TokenType.TIMER, TokenType.EVERY,
      TokenType.SECOND, TokenType.SECONDS, TokenType.CLICKED,
      TokenType.PRESSED, TokenType.CHANGED, TokenType.SORT,
      TokenType.REVERSE, TokenType.SHUFFLE, TokenType.EXPLAIN,
      TokenType.A, TokenType.AT, TokenType.FROM, TokenType.TO,
      TokenType.ADD, TokenType.REMOVE, TokenType.SHOW, TokenType.HIDE,
      TokenType.OPEN, TokenType.CLEAR, TokenType.DRAW, TokenType.PLAY,
      TokenType.WAIT, TokenType.STOP, TokenType.GO, TokenType.SEND,
      TokenType.CHECK, TokenType.USE, TokenType.NEW,
      TokenType.TEXT, TokenType.NUMBER_TYPE, TokenType.MAP,
      TokenType.READ, TokenType.WRITE, TokenType.APPEND, TokenType.AS,
      TokenType.PICK, TokenType.ROUNDED, TokenType.SET,
      TokenType.THINK, TokenType.FETCH, TokenType.SERVE, TokenType.RESPOND,
      TokenType.REMEMBER, TokenType.RECALL, TokenType.FORGET, TokenType.GRAB,
      TokenType.SHARE, TokenType.TOGETHER, TokenType.DO, TokenType.LISTEN,
      TokenType.ALOUD, TokenType.NOTE, TokenType.SOUND, TokenType.BOOLEAN_TYPE,
      TokenType.CANVAS, TokenType.COLOR, TokenType.SIZE, TokenType.LINE,
      TokenType.CIRCLE, TokenType.RECTANGLE, TokenType.FILL, TokenType.STROKE,
      TokenType.WIDTH, TokenType.HEIGHT, TokenType.DEBUG, TokenType.STEP,
      TokenType.BREAKPOINT, TokenType.CLASSROOM, TokenType.SUBMIT,
      TokenType.COLLECT, TokenType.ROUTE, TokenType.REQUEST, TokenType.STATUS,
      // New feature keywords usable as identifiers
      TokenType.PAIR, TokenType.ENUM, TokenType.EXISTS, TokenType.UNIQUE,
      TokenType.MATCHES, TokenType.FORMAT, TokenType.PLACES, TokenType.TEMPLATE,
      TokenType.BY, TokenType.AWAIT,
      TokenType.CONTRACT, TokenType.IMPLEMENTS, TokenType.SECRET, TokenType.STATIC,
      TokenType.USES, TokenType.GETTER, TokenType.OVERLOAD,
      TokenType.APPLY, TokenType.CURRY, TokenType.COMPOSE,
      TokenType.CSV, TokenType.JSON_TYPE, TokenType.ENV, TokenType.ARGUMENTS,
      TokenType.CURRENT, TokenType.TIME, TokenType.TODAY, TokenType.DATE,
      TokenType.FILES, TokenType.FOLDER, TokenType.EXECUTE, TokenType.SHELL,
      TokenType.ANIMATE, TokenType.MOVING, TokenType.OVER, TokenType.SPRITE,
      TokenType.LOAD, TokenType.TOUCHES, TokenType.SCENE, TokenType.SWITCH,
      TokenType.FORWARD, TokenType.BACKWARD, TokenType.TURN,
      TokenType.LEFT, TokenType.RIGHT, TokenType.PEN, TokenType.UP, TokenType.DOWN,
      TokenType.LAYER,
      TokenType.CONNECT, TokenType.SOCKET, TokenType.EMIT,
      TokenType.COOKIE, TokenType.SESSION, TokenType.ALLOW, TokenType.STREAM,
      TokenType.CLIENT,
      TokenType.MOCK, TokenType.BEFORE, TokenType.AFTER, TokenType.SNAPSHOT,
      TokenType.BENCHMARK, TokenType.PROPERTY, TokenType.ANY,
      TokenType.WATCH, TokenType.PROFILE, TokenType.LINT, TokenType.SAVE,
      TokenType.HISTORY,
      TokenType.VISUALIZE, TokenType.CHALLENGE, TokenType.GRADE, TokenType.RUBRIC,
    ].includes(t);
  }

  private expect(type: TokenType): Token {
    if (this.check(type)) {
      const token = this.current();
      this.advance();
      return token;
    }
    const token = this.current();
    throw new ParseError(`Expected ${type}, got ${token.value} (${token.type})`, token.line, token.column);
  }

  private check(type: TokenType): boolean {
    if (this.isAtEnd()) return false;
    return this.current().type === type;
  }

  private checkPrev(type: TokenType): boolean {
    if (this.pos <= 0) return false;
    return this.tokens[this.pos - 1].type === type;
  }

  private checkListBody(): boolean {
    // Look ahead past newlines to see if there's content before 'end'
    let i = this.pos;
    while (i < this.tokens.length && this.tokens[i].type === TokenType.NEWLINE) i++;
    return i < this.tokens.length && this.tokens[i].type !== TokenType.END;
  }

  private current(): Token {
    if (this.pos >= this.tokens.length) {
      return { type: TokenType.EOF, value: '', line: 0, column: 0 };
    }
    return this.tokens[this.pos];
  }

  private advance(): Token {
    const token = this.current();
    this.pos++;
    return token;
  }

  private isAtEnd(): boolean {
    return this.pos >= this.tokens.length || this.current().type === TokenType.EOF;
  }

  private skipNewlines(): void {
    while (this.check(TokenType.NEWLINE)) {
      this.advance();
    }
  }

  private isOperator(): boolean {
    const t = this.current().type;
    return [
      TokenType.PLUS, TokenType.MINUS, TokenType.STAR, TokenType.SLASH,
      TokenType.PERCENT, TokenType.CARET, TokenType.EQ, TokenType.NEQ,
      TokenType.GT, TokenType.LT, TokenType.GTE, TokenType.LTE,
    ].includes(t);
  }

  private isEndToken(): boolean {
    const t = this.current().type;
    return [TokenType.END, TokenType.ELSE, TokenType.ELSE_IF, TokenType.OR, TokenType.CATCH, TokenType.RBRACE].includes(t);
  }

  private parseInterpolatedString(raw: string): AST.InterpolatedStringExpression {
    const parts: (string | AST.Expression)[] = [];
    let current = '';
    let i = 0;
    while (i < raw.length) {
      if (raw[i] === '{') {
        if (current) { parts.push(current); current = ''; }
        i++; // skip {
        let expr = '';
        let depth = 1;
        while (i < raw.length && depth > 0) {
          if (raw[i] === '{') depth++;
          if (raw[i] === '}') depth--;
          if (depth > 0) expr += raw[i];
          i++;
        }
        if (expr) {
          const lexer = new Lexer(expr);
          const tokens = lexer.tokenize();
          const parser = new Parser();
          const program = parser.parse(tokens);
          if (program.body.length > 0) {
            const node = program.body[0];
            if (node.type === 'ExpressionStatement') {
              parts.push(node.expression);
            } else if (node.type === 'ShowStatement') {
              // fallback - just use as identifier
              parts.push({ type: 'Identifier', name: expr.trim() } as AST.Expression);
            } else {
              parts.push({ type: 'Identifier', name: expr.trim() } as AST.Expression);
            }
          } else {
            parts.push({ type: 'Identifier', name: expr.trim() } as AST.Expression);
          }
        }
      } else {
        current += raw[i];
        i++;
      }
    }
    if (current) parts.push(current);
    return { type: 'InterpolatedStringExpression', parts };
  }

  private parseLambda(): AST.LambdaExpression {
    const line = this.current().line;
    this.advance(); // skip '{'
    const params: string[] = [];

    // Check for params -> body pattern
    const savedPos = this.pos;
    let hasArrow = false;

    // Try to parse params before ->
    while (!this.check(TokenType.ARROW) && !this.check(TokenType.RBRACE) && !this.isAtEnd()) {
      if (this.check(TokenType.IDENTIFIER)) {
        params.push(this.current().value);
        this.advance();
        if (this.check(TokenType.COMMA)) this.advance();
      } else {
        break;
      }
    }

    if (this.check(TokenType.ARROW)) {
      this.advance(); // skip ->
      hasArrow = true;
    } else {
      // No arrow found, restore and treat as parameterless lambda
      this.pos = savedPos;
      params.length = 0;
    }

    // Parse body until }
    this.skipNewlines();
    if (hasArrow || params.length === 0) {
      // Try to parse as single expression first
      const bodyStart = this.pos;
      try {
        const expr = this.parseExpression();
        if (this.check(TokenType.RBRACE)) {
          this.advance();
          return { type: 'LambdaExpression', params, body: expr, line };
        }
      } catch {
        // fall through to block parsing
      }
      this.pos = bodyStart;
    }

    // Parse as block
    const body = this.parseBlock(['RBRACE']);
    if (this.check(TokenType.RBRACE)) this.advance();
    return { type: 'LambdaExpression', params, body, line };
  }

  private checkAhead(type: TokenType, offset: number): boolean {
    const idx = this.pos + offset;
    if (idx >= this.tokens.length) return false;
    return this.tokens[idx].type === type;
  }

  // --- New feature parsers ---

  private parseContract(): AST.ContractDeclaration {
    const line = this.current().line;
    this.advance(); // skip 'contract'
    const name = this.expectIdentifierName();
    this.skipNewlines();
    const methods: string[] = [];
    while (!this.check(TokenType.END) && !this.isAtEnd()) {
      this.skipNewlines();
      if (this.check(TokenType.END)) break;
      if (this.check(TokenType.ON)) {
        this.advance();
        methods.push(this.expectIdentifierName());
        // skip params and body indicator
        while (!this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.isAtEnd()) {
          this.advance();
        }
      } else {
        this.advance();
      }
    }
    this.expect(TokenType.END);
    return { type: 'ContractDeclaration', name, methods, line };
  }

  private parseEnum(): AST.EnumDeclaration {
    const line = this.current().line;
    this.advance(); // skip 'enum'
    const name = this.expectIdentifierName();
    const values: string[] = [];
    if (this.check(TokenType.IS)) this.advance();
    values.push(this.expectIdentifierName());
    while (this.check(TokenType.COMMA)) {
      this.advance();
      values.push(this.expectIdentifierName());
    }
    return { type: 'EnumDeclaration', name, values, line };
  }

  private parseMock(): AST.MockStatement {
    const line = this.current().line;
    this.advance(); // skip 'mock'
    const target = this.expectIdentifierName();
    if (this.check(TokenType.TO)) this.advance();
    if (this.check(TokenType.RETURN)) this.advance();
    // Also skip "returns" as an identifier
    if (this.check(TokenType.IDENTIFIER) && this.current().value.toLowerCase() === 'returns') this.advance();
    const returnValue = this.parseExpression();
    return { type: 'MockStatement', target, returnValue, line };
  }

  private parseBefore(): AST.BeforeBlock {
    const line = this.current().line;
    this.advance(); // skip 'before'
    if (this.check(TokenType.EACH)) this.advance();
    this.skipNewlines();
    const body = this.parseBlock(['END']);
    this.expect(TokenType.END);
    return { type: 'BeforeBlock', body, line };
  }

  private parseAfter(): AST.AfterBlock {
    const line = this.current().line;
    this.advance(); // skip 'after'
    if (this.check(TokenType.EACH)) this.advance();
    this.skipNewlines();
    const body = this.parseBlock(['END']);
    this.expect(TokenType.END);
    return { type: 'AfterBlock', body, line };
  }

  private parseBenchmark(): AST.BenchmarkBlock {
    const line = this.current().line;
    this.advance(); // skip 'benchmark'
    let name = 'benchmark';
    if (this.check(TokenType.STRING)) {
      name = this.current().value;
      this.advance();
    } else if (this.check(TokenType.IDENTIFIER)) {
      name = this.current().value;
      this.advance();
    }
    this.skipNewlines();
    const body = this.parseBlock(['END']);
    this.expect(TokenType.END);
    return { type: 'BenchmarkBlock', name, body, line };
  }

  private parseAnimate(): AST.AnimateStatement {
    const line = this.current().line;
    this.advance(); // skip 'animate'
    const target = this.expectIdentifierName();
    let property = 'position';
    if (this.check(TokenType.DOT_IDENTIFIER)) {
      property = this.current().value.slice(1); // remove leading dot
      this.advance();
    } else if (this.check(TokenType.DOT)) {
      this.advance();
      property = this.expectIdentifierName();
    } else if (this.check(TokenType.IDENTIFIER)) {
      property = this.expectIdentifierName();
    }
    let from: AST.Expression = { type: 'NumberLiteral', value: 0 };
    let to: AST.Expression = { type: 'NumberLiteral', value: 100 };
    let duration: AST.Expression = { type: 'NumberLiteral', value: 1 };
    if (this.check(TokenType.FROM)) {
      this.advance();
      from = this.parseExpression();
    }
    if (this.check(TokenType.TO)) {
      this.advance();
      to = this.parseExpression();
    }
    if (this.check(TokenType.OVER)) {
      this.advance();
      duration = this.parseExpression();
      // skip optional 'seconds'
      if (this.check(TokenType.SECONDS) || this.check(TokenType.SECOND)) this.advance();
    }
    return { type: 'AnimateStatement', target, property, from, to, duration, line };
  }

  private parseTurtle(action: 'forward' | 'backward'): AST.TurtleStatement {
    const line = this.current().line;
    this.advance();
    let value: AST.Expression | undefined;
    if (!this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.isAtEnd()) {
      value = this.parseExpression();
    }
    return { type: 'TurtleStatement', action, value, line };
  }

  private parseTurnStatement(): AST.TurtleStatement {
    const line = this.current().line;
    this.advance(); // skip 'turn'
    let action: 'left' | 'right' = 'right';
    if (this.check(TokenType.LEFT)) {
      action = 'left';
      this.advance();
    } else if (this.check(TokenType.RIGHT)) {
      action = 'right';
      this.advance();
    }
    let value: AST.Expression | undefined;
    if (!this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.isAtEnd()) {
      value = this.parseExpression();
    }
    return { type: 'TurtleStatement', action, value, line };
  }

  private parsePen(): AST.TurtleStatement {
    const line = this.current().line;
    this.advance(); // skip 'pen'
    let action: 'penup' | 'pendown' = 'pendown';
    if (this.check(TokenType.UP)) {
      action = 'penup';
      this.advance();
    } else if (this.check(TokenType.DOWN)) {
      action = 'pendown';
      this.advance();
    }
    return { type: 'TurtleStatement', action, line };
  }

  private parseSwitchScene(): AST.SwitchSceneStatement {
    const line = this.current().line;
    this.advance(); // skip 'switch'
    if (this.check(TokenType.TO)) this.advance();
    if (this.check(TokenType.SCENE)) this.advance();
    const scene = this.parseExpression();
    return { type: 'SwitchSceneStatement', scene, line };
  }

  private parseConnect(): AST.ConnectStatement {
    const line = this.current().line;
    this.advance(); // skip 'connect'
    if (this.check(TokenType.TO)) this.advance();
    const url = this.parseExpression();
    let alias = 'socket';
    if (this.check(TokenType.AS)) {
      this.advance();
      alias = this.expectIdentifierName();
    }
    return { type: 'ConnectStatement', url, alias, line };
  }

  private parseEmit(): AST.EmitStatement {
    const line = this.current().line;
    this.advance(); // skip 'emit'
    const event = this.parseExpression();
    let data: AST.Expression | undefined;
    let target: string | undefined;
    if (this.check(TokenType.WITH)) {
      this.advance();
      data = this.parseExpression();
    }
    if (this.check(TokenType.TO)) {
      this.advance();
      target = this.expectIdentifierName();
    }
    return { type: 'EmitStatement', event, data, target, line };
  }

  private parseCookie(): AST.CookieStatement {
    const line = this.current().line;
    this.advance(); // skip 'cookie'
    let action: 'set' | 'get' | 'delete' = 'set';
    if (this.check(TokenType.SET)) {
      action = 'set';
      this.advance();
    } else if (this.check(TokenType.IDENTIFIER) && this.current().value === 'get') {
      action = 'get';
      this.advance();
    } else if (this.check(TokenType.IDENTIFIER) && this.current().value === 'delete') {
      action = 'delete';
      this.advance();
    }
    const name = this.parseExpression();
    let value: AST.Expression | undefined;
    if (action === 'set' && (this.check(TokenType.TO) || this.check(TokenType.AS))) {
      this.advance();
      value = this.parseExpression();
    }
    return { type: 'CookieStatement', action, name, value, line };
  }

  private parseAllow(): AST.AllowStatement {
    const line = this.current().line;
    this.advance(); // skip 'allow'
    // allow requests from "origin"
    while (!this.check(TokenType.STRING) && !this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF) && !this.isAtEnd()) {
      this.advance();
    }
    const origin = this.parseExpression();
    return { type: 'AllowStatement', origin, line };
  }

  private parseStream(): AST.StreamStatement {
    const line = this.current().line;
    this.advance(); // skip 'stream'
    const data = this.parseExpression();
    let interval: AST.Expression | undefined;
    if (this.check(TokenType.EVERY)) {
      this.advance();
      interval = this.parseExpression();
      if (this.check(TokenType.SECONDS) || this.check(TokenType.SECOND)) this.advance();
    }
    return { type: 'StreamStatement', data, interval, line };
  }

  private parseTemplate(): AST.TemplateDeclaration {
    const line = this.current().line;
    this.advance(); // skip 'template'
    const name = this.expectIdentifierName();
    const params: string[] = [];
    if (this.check(TokenType.FOR)) {
      this.advance();
      params.push(this.expectIdentifierName());
      while (this.check(TokenType.COMMA)) {
        this.advance();
        params.push(this.expectIdentifierName());
      }
    }
    this.skipNewlines();
    const body = this.parseBlock(['END']);
    this.expect(TokenType.END);
    return { type: 'TemplateDeclaration', name, params, body, line };
  }

  private parseFormat(): AST.FormatStatement {
    const line = this.current().line;
    this.advance(); // skip 'format'
    const value = this.parseExpression();
    let places: AST.Expression = { type: 'NumberLiteral', value: 2 };
    if (this.check(TokenType.TO)) {
      this.advance();
      places = this.parseExpression();
      if (this.check(TokenType.PLACES)) this.advance();
    }
    return { type: 'FormatStatement', value, places, line };
  }

  private parseApply(): AST.ExpressionStatement {
    const line = this.current().line;
    this.advance(); // skip 'apply'
    const func = this.parseExpression();
    let target: AST.Expression = { type: 'NothingLiteral' };
    if (this.check(TokenType.TO)) {
      this.advance();
      if (this.check(TokenType.EACH)) this.advance();
      target = this.parseExpression();
    }
    return {
      type: 'ExpressionStatement',
      expression: { type: 'CallExpression', name: '__apply', args: [func, target] },
      line,
    };
  }

  private parseDestructure(line: number): AST.DestructureStatement {
    // Already consumed 'put' — expecting: first, second from EXPR into a, b
    const variables: string[] = [];
    variables.push(this.expectIdentifierName());
    while (this.check(TokenType.COMMA)) {
      this.advance();
      variables.push(this.expectIdentifierName());
    }
    this.expect(TokenType.FROM);
    const source = this.parseExpression();
    return { type: 'DestructureStatement', variables, source, line };
  }

  private looksLikeMethodArg(): boolean {
    const t = this.current().type;
    return t === TokenType.NUMBER || t === TokenType.IDENTIFIER ||
           t === TokenType.TRUE || t === TokenType.FALSE ||
           t === TokenType.NOTHING || t === TokenType.LPAREN ||
           t === TokenType.DOT_IDENTIFIER || t === TokenType.STRING ||
           t === TokenType.MINUS;
  }
}

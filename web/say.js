"use strict";
var HyperCode = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    AST: () => ast_exports,
    Interpreter: () => Interpreter,
    Lexer: () => Lexer,
    Parser: () => Parser,
    SayInstance: () => SayInstance,
    SayKind: () => SayKind,
    SayList: () => SayList,
    SayUIElement: () => SayUIElement,
    TokenType: () => TokenType,
    isTruthy: () => isTruthy,
    run: () => run,
    runTests: () => runTests,
    toNumber: () => toNumber,
    toString: () => toString,
    valuesEqual: () => valuesEqual
  });

  // src/tokens.ts
  var TokenType = /* @__PURE__ */ ((TokenType2) => {
    TokenType2["NUMBER"] = "NUMBER";
    TokenType2["STRING"] = "STRING";
    TokenType2["BOOLEAN"] = "BOOLEAN";
    TokenType2["NOTHING"] = "NOTHING";
    TokenType2["IDENTIFIER"] = "IDENTIFIER";
    TokenType2["DOT_IDENTIFIER"] = "DOT_IDENTIFIER";
    TokenType2["PUT"] = "PUT";
    TokenType2["INTO"] = "INTO";
    TokenType2["SHOW"] = "SHOW";
    TokenType2["ASK"] = "ASK";
    TokenType2["MAKE"] = "MAKE";
    TokenType2["SEND"] = "SEND";
    TokenType2["ADD"] = "ADD";
    TokenType2["REMOVE"] = "REMOVE";
    TokenType2["GO"] = "GO";
    TokenType2["OPEN"] = "OPEN";
    TokenType2["HIDE"] = "HIDE";
    TokenType2["DRAW"] = "DRAW";
    TokenType2["WAIT"] = "WAIT";
    TokenType2["PLAY"] = "PLAY";
    TokenType2["CLEAR"] = "CLEAR";
    TokenType2["STOP"] = "STOP";
    TokenType2["KIND"] = "KIND";
    TokenType2["FROM"] = "FROM";
    TokenType2["ON"] = "ON";
    TokenType2["ME"] = "ME";
    TokenType2["END"] = "END";
    TokenType2["RETURN"] = "RETURN";
    TokenType2["COMMAND"] = "COMMAND";
    TokenType2["USE"] = "USE";
    TokenType2["TEST"] = "TEST";
    TokenType2["CHECK"] = "CHECK";
    TokenType2["NEW"] = "NEW";
    TokenType2["IF"] = "IF";
    TokenType2["ELSE"] = "ELSE";
    TokenType2["REPEAT"] = "REPEAT";
    TokenType2["TIMES"] = "TIMES";
    TokenType2["WHILE"] = "WHILE";
    TokenType2["UNTIL"] = "UNTIL";
    TokenType2["FOREVER"] = "FOREVER";
    TokenType2["FOR"] = "FOR";
    TokenType2["EACH"] = "EACH";
    TokenType2["IN"] = "IN";
    TokenType2["TO"] = "TO";
    TokenType2["AT"] = "AT";
    TokenType2["TRUE"] = "TRUE";
    TokenType2["FALSE"] = "FALSE";
    TokenType2["A"] = "A";
    TokenType2["CALLED"] = "CALLED";
    TokenType2["WITH"] = "WITH";
    TokenType2["IT"] = "IT";
    TokenType2["LIST"] = "LIST";
    TokenType2["SORT"] = "SORT";
    TokenType2["REVERSE"] = "REVERSE";
    TokenType2["SHUFFLE"] = "SHUFFLE";
    TokenType2["CONTAINS"] = "CONTAINS";
    TokenType2["WHERE"] = "WHERE";
    TokenType2["TRY"] = "TRY";
    TokenType2["OR"] = "OR";
    TokenType2["CATCH"] = "CATCH";
    TokenType2["IS"] = "IS";
    TokenType2["NOT"] = "NOT";
    TokenType2["AND"] = "AND";
    TokenType2["GREATER"] = "GREATER";
    TokenType2["LESS"] = "LESS";
    TokenType2["THAN"] = "THAN";
    TokenType2["EXPLAIN"] = "EXPLAIN";
    TokenType2["PLUS"] = "PLUS";
    TokenType2["MINUS"] = "MINUS";
    TokenType2["STAR"] = "STAR";
    TokenType2["SLASH"] = "SLASH";
    TokenType2["PERCENT"] = "PERCENT";
    TokenType2["CARET"] = "CARET";
    TokenType2["EQ"] = "EQ";
    TokenType2["NEQ"] = "NEQ";
    TokenType2["GT"] = "GT";
    TokenType2["LT"] = "LT";
    TokenType2["GTE"] = "GTE";
    TokenType2["LTE"] = "LTE";
    TokenType2["LPAREN"] = "LPAREN";
    TokenType2["RPAREN"] = "RPAREN";
    TokenType2["COMMA"] = "COMMA";
    TokenType2["DOT"] = "DOT";
    TokenType2["QUESTION"] = "QUESTION";
    TokenType2["NEWLINE"] = "NEWLINE";
    TokenType2["EOF"] = "EOF";
    TokenType2["COMMENT"] = "COMMENT";
    TokenType2["CLICKED"] = "CLICKED";
    TokenType2["PRESSED"] = "PRESSED";
    TokenType2["CHANGED"] = "CHANGED";
    TokenType2["KEY"] = "KEY";
    TokenType2["EVERY"] = "EVERY";
    TokenType2["SECOND"] = "SECOND";
    TokenType2["SECONDS"] = "SECONDS";
    TokenType2["MOUSE_DOWN"] = "MOUSE_DOWN";
    TokenType2["MOUSE_MOVE"] = "MOUSE_MOVE";
    TokenType2["ELSE_IF"] = "ELSE_IF";
    TokenType2["TIMER"] = "TIMER";
    return TokenType2;
  })(TokenType || {});
  var KEYWORDS = {
    "put": "PUT" /* PUT */,
    "into": "INTO" /* INTO */,
    "show": "SHOW" /* SHOW */,
    "ask": "ASK" /* ASK */,
    "make": "MAKE" /* MAKE */,
    "send": "SEND" /* SEND */,
    "add": "ADD" /* ADD */,
    "remove": "REMOVE" /* REMOVE */,
    "go": "GO" /* GO */,
    "open": "OPEN" /* OPEN */,
    "hide": "HIDE" /* HIDE */,
    "draw": "DRAW" /* DRAW */,
    "wait": "WAIT" /* WAIT */,
    "play": "PLAY" /* PLAY */,
    "clear": "CLEAR" /* CLEAR */,
    "stop": "STOP" /* STOP */,
    "kind": "KIND" /* KIND */,
    "from": "FROM" /* FROM */,
    "on": "ON" /* ON */,
    "me": "ME" /* ME */,
    "end": "END" /* END */,
    "return": "RETURN" /* RETURN */,
    "command": "COMMAND" /* COMMAND */,
    "use": "USE" /* USE */,
    "test": "TEST" /* TEST */,
    "check": "CHECK" /* CHECK */,
    "new": "NEW" /* NEW */,
    "if": "IF" /* IF */,
    "else": "ELSE" /* ELSE */,
    "repeat": "REPEAT" /* REPEAT */,
    "times": "TIMES" /* TIMES */,
    "while": "WHILE" /* WHILE */,
    "until": "UNTIL" /* UNTIL */,
    "forever": "FOREVER" /* FOREVER */,
    "for": "FOR" /* FOR */,
    "each": "EACH" /* EACH */,
    "in": "IN" /* IN */,
    "to": "TO" /* TO */,
    "at": "AT" /* AT */,
    "true": "TRUE" /* TRUE */,
    "false": "FALSE" /* FALSE */,
    "nothing": "NOTHING" /* NOTHING */,
    "a": "A" /* A */,
    "called": "CALLED" /* CALLED */,
    "with": "WITH" /* WITH */,
    "it": "IT" /* IT */,
    "list": "LIST" /* LIST */,
    "sort": "SORT" /* SORT */,
    "reverse": "REVERSE" /* REVERSE */,
    "shuffle": "SHUFFLE" /* SHUFFLE */,
    "contains": "CONTAINS" /* CONTAINS */,
    "where": "WHERE" /* WHERE */,
    "try": "TRY" /* TRY */,
    "or": "OR" /* OR */,
    "catch": "CATCH" /* CATCH */,
    "is": "IS" /* IS */,
    "not": "NOT" /* NOT */,
    "and": "AND" /* AND */,
    "greater": "GREATER" /* GREATER */,
    "less": "LESS" /* LESS */,
    "than": "THAN" /* THAN */,
    "explain": "EXPLAIN" /* EXPLAIN */,
    "clicked": "CLICKED" /* CLICKED */,
    "pressed": "PRESSED" /* PRESSED */,
    "changed": "CHANGED" /* CHANGED */,
    "key": "KEY" /* KEY */,
    "every": "EVERY" /* EVERY */,
    "second": "SECOND" /* SECOND */,
    "seconds": "SECONDS" /* SECONDS */,
    "timer": "TIMER" /* TIMER */
  };

  // src/lexer.ts
  var Lexer = class {
    constructor(source) {
      __publicField(this, "source");
      __publicField(this, "pos", 0);
      __publicField(this, "line", 1);
      __publicField(this, "column", 1);
      __publicField(this, "tokens", []);
      this.source = source;
    }
    tokenize() {
      this.tokens = [];
      this.pos = 0;
      this.line = 1;
      this.column = 1;
      while (this.pos < this.source.length) {
        this.skipSpaces();
        if (this.pos >= this.source.length) break;
        const ch = this.source[this.pos];
        if (ch === "-" && this.peek(1) === "-" && this.peek(2) === "-") {
          this.readMultiLineComment();
          continue;
        }
        if (ch === "-" && this.peek(1) === "-" && this.peek(2) !== "-") {
          this.readSingleLineComment();
          continue;
        }
        if (ch === "\n") {
          this.addToken("NEWLINE" /* NEWLINE */, "\n");
          this.pos++;
          this.line++;
          this.column = 1;
          continue;
        }
        if (ch === "\r") {
          this.pos++;
          if (this.pos < this.source.length && this.source[this.pos] === "\n") {
            this.pos++;
          }
          this.addToken("NEWLINE" /* NEWLINE */, "\n");
          this.line++;
          this.column = 1;
          continue;
        }
        if (this.isDigit(ch) || ch === "-" && this.pos + 1 < this.source.length && this.isDigit(this.source[this.pos + 1]) && this.shouldBeNegativeNumber()) {
          this.readNumber();
          continue;
        }
        if (ch === "." && this.pos + 1 < this.source.length && this.isAlpha(this.source[this.pos + 1])) {
          this.readDotIdentifier();
          continue;
        }
        switch (ch) {
          case "+":
            this.addToken("PLUS" /* PLUS */, "+");
            this.advance();
            continue;
          case "*":
            this.addToken("STAR" /* STAR */, "*");
            this.advance();
            continue;
          case "/":
            this.addToken("SLASH" /* SLASH */, "/");
            this.advance();
            continue;
          case "%":
            this.addToken("PERCENT" /* PERCENT */, "%");
            this.advance();
            continue;
          case "^":
            this.addToken("CARET" /* CARET */, "^");
            this.advance();
            continue;
          case "(":
            this.addToken("LPAREN" /* LPAREN */, "(");
            this.advance();
            continue;
          case ")":
            this.addToken("RPAREN" /* RPAREN */, ")");
            this.advance();
            continue;
          case ",":
            this.addToken("COMMA" /* COMMA */, ",");
            this.advance();
            continue;
          case ".":
            this.addToken("DOT" /* DOT */, ".");
            this.advance();
            continue;
          case "?":
            this.addToken("QUESTION" /* QUESTION */, "?");
            this.advance();
            continue;
          case "-":
            this.addToken("MINUS" /* MINUS */, "-");
            this.advance();
            continue;
          case "=":
            if (this.peek(1) === "=") {
              this.addToken("EQ" /* EQ */, "==");
              this.advance();
              this.advance();
            } else {
              this.addToken("IDENTIFIER" /* IDENTIFIER */, "=");
              this.advance();
            }
            continue;
          case "!":
            if (this.peek(1) === "=") {
              this.addToken("NEQ" /* NEQ */, "!=");
              this.advance();
              this.advance();
            } else {
              this.addToken("IDENTIFIER" /* IDENTIFIER */, "!");
              this.advance();
            }
            continue;
          case ">":
            if (this.peek(1) === "=") {
              this.addToken("GTE" /* GTE */, ">=");
              this.advance();
              this.advance();
            } else {
              this.addToken("GT" /* GT */, ">");
              this.advance();
            }
            continue;
          case "<":
            if (this.peek(1) === "=") {
              this.addToken("LTE" /* LTE */, "<=");
              this.advance();
              this.advance();
            } else {
              this.addToken("LT" /* LT */, "<");
              this.advance();
            }
            continue;
        }
        if (this.isAlpha(ch) || ch === "_") {
          this.readIdentifier();
          continue;
        }
        this.advance();
      }
      this.addToken("EOF" /* EOF */, "");
      return this.tokens;
    }
    skipSpaces() {
      while (this.pos < this.source.length) {
        const ch = this.source[this.pos];
        if (ch === " " || ch === "	") {
          this.pos++;
          this.column++;
        } else {
          break;
        }
      }
    }
    isDigit(ch) {
      return ch >= "0" && ch <= "9";
    }
    isAlpha(ch) {
      return ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z" || ch === "_";
    }
    isAlphaNumeric(ch) {
      return this.isAlpha(ch) || this.isDigit(ch);
    }
    peek(offset = 0) {
      return this.source[this.pos + offset];
    }
    advance() {
      this.pos++;
      this.column++;
    }
    addToken(type, value) {
      this.tokens.push({ type, value, line: this.line, column: this.column });
    }
    shouldBeNegativeNumber() {
      if (this.tokens.length === 0) return true;
      const prev = this.tokens[this.tokens.length - 1];
      return [
        "PLUS" /* PLUS */,
        "MINUS" /* MINUS */,
        "STAR" /* STAR */,
        "SLASH" /* SLASH */,
        "PERCENT" /* PERCENT */,
        "CARET" /* CARET */,
        "LPAREN" /* LPAREN */,
        "COMMA" /* COMMA */,
        "EQ" /* EQ */,
        "NEQ" /* NEQ */,
        "GT" /* GT */,
        "LT" /* LT */,
        "GTE" /* GTE */,
        "LTE" /* LTE */,
        "NEWLINE" /* NEWLINE */,
        "INTO" /* INTO */,
        "PUT" /* PUT */,
        "RETURN" /* RETURN */
      ].includes(prev.type);
    }
    readNumber() {
      const start = this.pos;
      if (this.source[this.pos] === "-") this.pos++;
      while (this.pos < this.source.length && this.isDigit(this.source[this.pos])) {
        this.pos++;
      }
      if (this.pos < this.source.length && this.source[this.pos] === "." && this.pos + 1 < this.source.length && this.isDigit(this.source[this.pos + 1])) {
        this.pos++;
        while (this.pos < this.source.length && this.isDigit(this.source[this.pos])) {
          this.pos++;
        }
      }
      const value = this.source.slice(start, this.pos);
      this.addToken("NUMBER" /* NUMBER */, value);
      this.column += value.length;
    }
    readDotIdentifier() {
      const start = this.pos;
      this.pos++;
      while (this.pos < this.source.length && (this.isAlphaNumeric(this.source[this.pos]) || this.source[this.pos] === ".")) {
        this.pos++;
      }
      const value = this.source.slice(start, this.pos);
      this.addToken("DOT_IDENTIFIER" /* DOT_IDENTIFIER */, value);
      this.column += value.length;
    }
    readIdentifier() {
      const start = this.pos;
      while (this.pos < this.source.length && (this.isAlphaNumeric(this.source[this.pos]) || this.source[this.pos] === "_")) {
        this.pos++;
      }
      const value = this.source.slice(start, this.pos);
      const lower = value.toLowerCase();
      if (lower === "else") {
        const savedPos = this.pos;
        const savedCol = this.column;
        this.skipSpaces();
        if (this.pos < this.source.length) {
          const nextStart = this.pos;
          while (this.pos < this.source.length && this.isAlphaNumeric(this.source[this.pos])) {
            this.pos++;
          }
          const nextWord = this.source.slice(nextStart, this.pos).toLowerCase();
          if (nextWord === "if") {
            this.addToken("ELSE_IF" /* ELSE_IF */, "else if");
            this.column = savedCol + (this.pos - start);
            return;
          }
        }
        this.pos = savedPos;
      }
      const type = KEYWORDS[lower];
      if (type !== void 0) {
        this.addToken(type, value);
      } else {
        this.addToken("IDENTIFIER" /* IDENTIFIER */, value);
      }
      this.column += value.length;
    }
    readSingleLineComment() {
      while (this.pos < this.source.length && this.source[this.pos] !== "\n") {
        this.pos++;
      }
    }
    readMultiLineComment() {
      this.pos += 3;
      this.column += 3;
      while (this.pos < this.source.length) {
        if (this.source[this.pos] === "-" && this.peek(1) === "-" && this.peek(2) === "-") {
          this.pos += 3;
          this.column += 3;
          while (this.pos < this.source.length && this.source[this.pos] !== "\n") {
            this.pos++;
            this.column++;
          }
          return;
        }
        if (this.source[this.pos] === "\n") {
          this.line++;
          this.column = 1;
        } else {
          this.column++;
        }
        this.pos++;
      }
    }
  };

  // src/parser.ts
  var ParseError = class extends Error {
    constructor(message, line, column) {
      super(`Parse error at line ${line}: ${message}`);
      this.line = line;
      this.column = column;
    }
  };
  var Parser = class {
    constructor() {
      __publicField(this, "tokens", []);
      __publicField(this, "pos", 0);
    }
    parse(tokens) {
      this.tokens = tokens;
      this.pos = 0;
      const body = [];
      while (!this.isAtEnd()) {
        this.skipNewlines();
        if (this.isAtEnd()) break;
        const node = this.parseStatement();
        if (node) body.push(node);
      }
      return { type: "Program", body };
    }
    parseStatement() {
      this.skipNewlines();
      if (this.isAtEnd()) return null;
      const token = this.current();
      switch (token.type) {
        case "PUT" /* PUT */:
          return this.parsePut();
        case "SHOW" /* SHOW */:
          return this.parseShow();
        case "ASK" /* ASK */:
          return this.parseAskStatement();
        case "IF" /* IF */:
          return this.parseIf();
        case "REPEAT" /* REPEAT */:
          return this.parseRepeat();
        case "FOR" /* FOR */:
          return this.parseForEach();
        case "KIND" /* KIND */:
          return this.parseKind();
        case "MAKE" /* MAKE */:
          return this.parseMake();
        case "SEND" /* SEND */:
          return this.parseSend();
        case "ON" /* ON */:
          return this.parseOn();
        case "COMMAND" /* COMMAND */:
          return this.parseCommand();
        case "RETURN" /* RETURN */:
          return this.parseReturn();
        case "ADD" /* ADD */:
          return this.parseAdd();
        case "REMOVE" /* REMOVE */:
          return this.parseRemove();
        case "SORT" /* SORT */:
          return this.parseSort();
        case "REVERSE" /* REVERSE */:
          return this.parseReverse();
        case "SHUFFLE" /* SHUFFLE */:
          return this.parseShuffle();
        case "TRY" /* TRY */:
          return this.parseTry();
        case "USE" /* USE */:
          return this.parseUse();
        case "TEST" /* TEST */:
          return this.parseTest();
        case "CHECK" /* CHECK */:
          return this.parseCheck();
        case "EXPLAIN" /* EXPLAIN */:
          return this.parseExplain();
        case "STOP" /* STOP */:
          return this.parseStop();
        case "WAIT" /* WAIT */:
          return this.parseWait();
        case "DRAW" /* DRAW */:
          return this.parseDraw();
        case "CLEAR" /* CLEAR */:
          return this.parseClear();
        case "GO" /* GO */:
          return this.parseGo();
        case "OPEN" /* OPEN */:
          return this.parseOpen();
        case "HIDE" /* HIDE */:
          return this.parseHide();
        case "PLAY" /* PLAY */:
          return this.parsePlay();
        default:
          return this.parseExpressionStatement();
      }
    }
    // ---- Statement parsers ----
    parsePut() {
      const line = this.current().line;
      this.advance();
      if (this.check("LIST" /* LIST */)) {
        this.advance();
        if (!this.check("INTO" /* INTO */) && !this.check("NEWLINE" /* NEWLINE */) && !this.isAtEnd()) {
          const items = this.parseListItems();
          this.expect("INTO" /* INTO */);
          const target2 = this.parseExpression();
          this.skipNewlines();
          return { type: "PutStatement", value: { type: "ListLiteral", items }, target: target2, line };
        }
        if (this.check("INTO" /* INTO */)) {
          this.advance();
          const targetName = this.expectIdentifierName();
          this.skipNewlines();
          if (this.check("NEWLINE" /* NEWLINE */) || this.checkListBody()) {
            this.skipNewlines();
            const items = [];
            while (!this.check("END" /* END */) && !this.isAtEnd()) {
              this.skipNewlines();
              if (this.check("END" /* END */)) break;
              items.push(this.parseExpression());
              this.skipNewlines();
            }
            this.expect("END" /* END */);
            return { type: "ListLiteralMultiline", target: targetName, items, line };
          }
          return {
            type: "PutStatement",
            value: { type: "ListLiteral", items: [] },
            target: { type: "Identifier", name: targetName },
            line
          };
        }
        this.skipNewlines();
        if (this.check("INTO" /* INTO */)) {
          this.advance();
          const targetName = this.expectIdentifierName();
          this.skipNewlines();
          const items = [];
          while (!this.check("END" /* END */) && !this.isAtEnd()) {
            this.skipNewlines();
            if (this.check("END" /* END */)) break;
            items.push(this.parseExpression());
            this.skipNewlines();
          }
          this.expect("END" /* END */);
          return { type: "ListLiteralMultiline", target: targetName, items, line };
        }
        return {
          type: "PutStatement",
          value: { type: "ListLiteral", items: [] },
          target: { type: "Identifier", name: "list" },
          line
        };
      }
      if (this.check("ASK" /* ASK */)) {
        const askExpr = this.parseAskExpr();
        this.expect("INTO" /* INTO */);
        const target2 = this.parseExpression();
        return { type: "PutStatement", value: askExpr, target: target2, line };
      }
      const value = this.parsePutValue();
      this.expect("INTO" /* INTO */);
      const target = this.parseExpression();
      return { type: "PutStatement", value, target, line };
    }
    parsePutValue() {
      const savedPos = this.pos;
      let hasOperator = false;
      let hasParens = false;
      let hasSend = false;
      let hasList = false;
      const tokenTypes = [];
      const tokenValues = [];
      while (!this.isAtEnd() && !this.check("INTO" /* INTO */) && !this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */)) {
        const t = this.current().type;
        tokenTypes.push(t);
        tokenValues.push(this.current().value);
        if ([
          "PLUS" /* PLUS */,
          "MINUS" /* MINUS */,
          "STAR" /* STAR */,
          "SLASH" /* SLASH */,
          "PERCENT" /* PERCENT */,
          "CARET" /* CARET */,
          "EQ" /* EQ */,
          "NEQ" /* NEQ */,
          "GT" /* GT */,
          "LT" /* LT */,
          "GTE" /* GTE */,
          "LTE" /* LTE */,
          "WHERE" /* WHERE */,
          "EACH" /* EACH */
        ].includes(t)) {
          hasOperator = true;
        }
        if (t === "LPAREN" /* LPAREN */) hasParens = true;
        if (t === "SEND" /* SEND */) hasSend = true;
        if (t === "LIST" /* LIST */) hasList = true;
        this.advance();
      }
      this.pos = savedPos;
      const tokenCount = tokenTypes.length;
      const firstType = this.current().type;
      if (hasOperator || hasParens || hasSend || hasList || firstType === "NUMBER" /* NUMBER */ || firstType === "TRUE" /* TRUE */ || firstType === "FALSE" /* FALSE */ || firstType === "NOTHING" /* NOTHING */ || firstType === "LPAREN" /* LPAREN */) {
        return this.parseExpression();
      }
      if (tokenCount === 1 && (firstType === "IDENTIFIER" /* IDENTIFIER */ || firstType === "IT" /* IT */ || firstType === "ME" /* ME */ || firstType === "DOT_IDENTIFIER" /* DOT_IDENTIFIER */)) {
        return this.parseExpression();
      }
      if (tokenCount === 3 && tokenTypes[0] === "IDENTIFIER" /* IDENTIFIER */ && tokenTypes[1] === "DOT" /* DOT */ && tokenTypes[2] === "IDENTIFIER" /* IDENTIFIER */) {
        const firstName = tokenValues[0];
        if (firstName[0] === firstName[0].toLowerCase()) {
          return this.parseExpression();
        }
      }
      if ((firstType === "IDENTIFIER" /* IDENTIFIER */ || this.isKeywordUsableAsIdentifier()) && tokenTypes.includes("AND" /* AND */)) {
        const name = this.current().value;
        this.advance();
        const args = [];
        while (!this.check("INTO" /* INTO */) && !this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd()) {
          if (this.check("AND" /* AND */)) {
            this.advance();
            continue;
          }
          args.push(this.parseAddition());
        }
        return { type: "CallExpression", name, args };
      }
      if (firstType === "SEND" /* SEND */) {
        return this.parseExpression();
      }
      const parts = [];
      while (!this.isAtEnd() && !this.check("INTO" /* INTO */) && !this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */)) {
        if (this.check("DOT" /* DOT */)) {
          if (parts.length > 0) {
            parts[parts.length - 1] += ".";
          }
        } else {
          parts.push(this.current().value);
        }
        this.advance();
      }
      return { type: "StringLiteral", value: parts.join(" ") };
    }
    parseShow() {
      const line = this.current().line;
      this.advance();
      const parts = [];
      while (!this.isAtEnd() && !this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */)) {
        if (this.check("DOT_IDENTIFIER" /* DOT_IDENTIFIER */)) {
          const path = this.current().value;
          this.advance();
          parts.push({ type: "interpolation", path: path.slice(1) });
        } else if (this.check("LPAREN" /* LPAREN */)) {
          this.advance();
          const expr = this.parseExpression();
          this.expect("RPAREN" /* RPAREN */);
          parts.push({ type: "expression", expr });
        } else {
          let text = this.current().value;
          this.advance();
          while (!this.isAtEnd() && !this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.check("DOT_IDENTIFIER" /* DOT_IDENTIFIER */) && !this.check("LPAREN" /* LPAREN */)) {
            const val = this.current().value;
            if (val === "!" || val === "?" || val === "." || val === "," || val === ":" || val === ";") {
              text += val;
            } else {
              text += " " + val;
            }
            this.advance();
          }
          parts.push({ type: "text", value: text });
        }
      }
      return { type: "ShowStatement", parts, line };
    }
    parseAskExpr() {
      const line = this.current().line;
      this.advance();
      let prompt = "";
      while (!this.isAtEnd() && !this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.check("INTO" /* INTO */)) {
        if (this.check("DOT_IDENTIFIER" /* DOT_IDENTIFIER */)) {
          prompt += this.current().value;
        } else {
          if (prompt) prompt += " ";
          prompt += this.current().value;
        }
        this.advance();
      }
      return { type: "AskExpression", prompt: prompt.trim(), line };
    }
    parseAskStatement() {
      return this.parseAskExpr();
    }
    parseIf() {
      const line = this.current().line;
      this.advance();
      const condition = this.parseExpression();
      this.skipNewlines();
      const body = this.parseBlock(["ELSE", "ELSE_IF", "END"]);
      const elseIfClauses = [];
      let elseBody = [];
      while (this.check("ELSE_IF" /* ELSE_IF */)) {
        this.advance();
        const eifCondition = this.parseExpression();
        this.skipNewlines();
        const eifBody = this.parseBlock(["ELSE", "ELSE_IF", "END"]);
        elseIfClauses.push({ condition: eifCondition, body: eifBody });
      }
      if (this.check("ELSE" /* ELSE */)) {
        this.advance();
        this.skipNewlines();
        elseBody = this.parseBlock(["END"]);
      }
      this.expect("END" /* END */);
      return { type: "IfStatement", condition, body, elseIfClauses, elseBody, line };
    }
    parseRepeat() {
      const line = this.current().line;
      this.advance();
      if (this.check("FOREVER" /* FOREVER */)) {
        this.advance();
        this.skipNewlines();
        const body2 = this.parseBlock(["END"]);
        this.expect("END" /* END */);
        return { type: "RepeatStatement", variant: "forever", body: body2, line };
      }
      if (this.check("WHILE" /* WHILE */)) {
        this.advance();
        const condition = this.parseExpression();
        this.skipNewlines();
        const body2 = this.parseBlock(["END"]);
        this.expect("END" /* END */);
        return { type: "RepeatStatement", variant: "while", condition, body: body2, line };
      }
      if (this.check("UNTIL" /* UNTIL */)) {
        this.advance();
        const condition = this.parseExpression();
        this.skipNewlines();
        const body2 = this.parseBlock(["END"]);
        this.expect("END" /* END */);
        return { type: "RepeatStatement", variant: "until", condition, body: body2, line };
      }
      const count = this.parseExpression();
      this.expect("TIMES" /* TIMES */);
      this.skipNewlines();
      const body = this.parseBlock(["END"]);
      this.expect("END" /* END */);
      return { type: "RepeatStatement", variant: "times", count, body, line };
    }
    parseForEach() {
      const line = this.current().line;
      this.advance();
      this.expect("EACH" /* EACH */);
      const variable = this.expectIdentifierName();
      let indexVariable;
      if (this.check("AT" /* AT */)) {
        this.advance();
        indexVariable = this.expectIdentifierName();
      }
      this.expect("IN" /* IN */);
      const startExpr = this.parseExpression();
      let iterable;
      if (this.check("TO" /* TO */)) {
        this.advance();
        const endExpr = this.parseExpression();
        iterable = { type: "RangeExpression", start: startExpr, end: endExpr };
      } else {
        iterable = startExpr;
      }
      this.skipNewlines();
      const body = this.parseBlock(["END"]);
      this.expect("END" /* END */);
      return { type: "ForEachStatement", variable, indexVariable, iterable, body, line };
    }
    parseKind() {
      const line = this.current().line;
      this.advance();
      const name = this.expectIdentifierName();
      let parent;
      if (this.check("FROM" /* FROM */)) {
        this.advance();
        parent = this.expectIdentifierName();
      }
      this.skipNewlines();
      const fields = [];
      const methods = [];
      while (!this.check("END" /* END */) && !this.isAtEnd()) {
        this.skipNewlines();
        if (this.check("END" /* END */)) break;
        if (this.check("ON" /* ON */)) {
          methods.push(this.parseOn());
        } else {
          const fieldName = this.expectIdentifierName();
          this.expect("IS" /* IS */);
          const defaultValue = this.parseSimpleValue();
          fields.push({ name: fieldName, defaultValue });
          this.skipNewlines();
        }
      }
      this.expect("END" /* END */);
      return { type: "KindDeclaration", name, parent, fields, methods, line };
    }
    parseMake() {
      const line = this.current().line;
      this.advance();
      if (this.check("A" /* A */)) this.advance();
      const kindName = this.expectIdentifierName();
      this.expect("CALLED" /* CALLED */);
      const instanceName = this.expectIdentifierName();
      let inlineProps;
      if (this.check("WITH" /* WITH */)) {
        this.advance();
        inlineProps = this.parseInlineProps();
      }
      return { type: "MakeStatement", kindName, instanceName, inlineProps, line };
    }
    parseSend() {
      const line = this.current().line;
      this.advance();
      const message = this.expectIdentifierName();
      const args = [];
      while (!this.check("TO" /* TO */) && !this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd()) {
        args.push(this.parseExpression());
      }
      this.expect("TO" /* TO */);
      const target = this.parseExpression();
      return { type: "SendStatement", message, args, target, line };
    }
    parseOn() {
      const line = this.current().line;
      this.advance();
      const name = this.expectIdentifierName();
      const params = [];
      while (!this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd()) {
        if (this.check("CLICKED" /* CLICKED */) || this.check("PRESSED" /* PRESSED */) || this.check("CHANGED" /* CHANGED */) || this.check("EVERY" /* EVERY */)) {
          this.advance();
          while (!this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd()) {
            this.advance();
          }
          break;
        }
        params.push(this.expectIdentifierName());
      }
      this.skipNewlines();
      const body = this.parseBlock(["END"]);
      this.expect("END" /* END */);
      return { type: "OnHandler", name, params, body, line };
    }
    parseCommand() {
      const line = this.current().line;
      this.advance();
      const name = this.expectIdentifierName();
      const params = [];
      while (!this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd()) {
        const paramName = this.current().value;
        if (this.check("AND" /* AND */)) {
          this.advance();
          continue;
        }
        params.push(paramName);
        this.advance();
      }
      this.skipNewlines();
      const body = this.parseBlock(["END"]);
      this.expect("END" /* END */);
      return { type: "CommandDeclaration", name, params, body, line };
    }
    parseReturn() {
      const line = this.current().line;
      this.advance();
      const value = this.parseExpression();
      return { type: "ReturnStatement", value, line };
    }
    parseAdd() {
      const line = this.current().line;
      this.advance();
      const value = this.parseExpression();
      this.expect("TO" /* TO */);
      const target = this.parseExpression();
      return { type: "AddStatement", value, target, line };
    }
    parseRemove() {
      const line = this.current().line;
      this.advance();
      const value = this.parseExpression();
      this.expect("FROM" /* FROM */);
      const target = this.parseExpression();
      return { type: "RemoveStatement", value, target, line };
    }
    parseSort() {
      const line = this.current().line;
      this.advance();
      const target = this.parseExpression();
      return { type: "SortStatement", target, line };
    }
    parseReverse() {
      const line = this.current().line;
      this.advance();
      const target = this.parseExpression();
      return { type: "ReverseStatement", target, line };
    }
    parseShuffle() {
      const line = this.current().line;
      this.advance();
      const target = this.parseExpression();
      return { type: "ShuffleStatement", target, line };
    }
    parseTry() {
      const line = this.current().line;
      this.advance();
      this.skipNewlines();
      const body = this.parseBlock(["OR", "CATCH", "END"]);
      let catchVar;
      let catchBody = [];
      if (this.check("OR" /* OR */)) {
        this.advance();
        this.skipNewlines();
        catchBody = this.parseBlock(["END"]);
      } else if (this.check("CATCH" /* CATCH */)) {
        this.advance();
        if (!this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */)) {
          catchVar = this.expectIdentifierName();
        }
        this.skipNewlines();
        catchBody = this.parseBlock(["END"]);
      }
      this.expect("END" /* END */);
      return { type: "TryStatement", body, catchVar, catchBody, line };
    }
    parseUse() {
      const line = this.current().line;
      this.advance();
      const module = this.expectIdentifierName();
      return { type: "UseStatement", module, line };
    }
    parseTest() {
      const line = this.current().line;
      this.advance();
      let name = "";
      while (!this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd()) {
        if (name) name += " ";
        name += this.current().value;
        this.advance();
      }
      this.skipNewlines();
      const body = this.parseBlock(["END"]);
      this.expect("END" /* END */);
      return { type: "TestBlock", name, body, line };
    }
    parseCheck() {
      const line = this.current().line;
      this.advance();
      if ((this.check("IDENTIFIER" /* IDENTIFIER */) || this.isKeywordUsableAsIdentifier()) && !this.check("NOT" /* NOT */)) {
        const savedPos = this.pos;
        let hasComparison = false;
        let hasAnd = false;
        while (!this.isAtEnd() && !this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */)) {
          if (this.check("EQ" /* EQ */) || this.check("NEQ" /* NEQ */) || this.check("GT" /* GT */) || this.check("LT" /* LT */) || this.check("GTE" /* GTE */) || this.check("LTE" /* LTE */)) {
            hasComparison = true;
            break;
          }
          if (this.check("AND" /* AND */)) hasAnd = true;
          this.advance();
        }
        this.pos = savedPos;
        if (hasComparison && hasAnd) {
          const name = this.current().value;
          this.advance();
          const args = [];
          while (!this.check("EQ" /* EQ */) && !this.check("NEQ" /* NEQ */) && !this.check("GT" /* GT */) && !this.check("LT" /* LT */) && !this.check("GTE" /* GTE */) && !this.check("LTE" /* LTE */) && !this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd()) {
            if (this.check("AND" /* AND */)) {
              this.advance();
              continue;
            }
            args.push(this.parseAddition());
          }
          const callExpr = { type: "CallExpression", name, args };
          if (this.check("EQ" /* EQ */) || this.check("NEQ" /* NEQ */) || this.check("GT" /* GT */) || this.check("LT" /* LT */) || this.check("GTE" /* GTE */) || this.check("LTE" /* LTE */)) {
            const op = this.current().value;
            this.advance();
            const right = this.parseExpression();
            return { type: "CheckStatement", expression: { type: "ComparisonExpression", op, left: callExpr, right }, line };
          }
          return { type: "CheckStatement", expression: callExpr, line };
        }
      }
      const expression = this.parseExpression();
      return { type: "CheckStatement", expression, line };
    }
    parseExplain() {
      const line = this.current().line;
      this.advance();
      const target = this.parseExpression();
      return { type: "ExplainStatement", target, line };
    }
    parseStop() {
      const line = this.current().line;
      this.advance();
      return { type: "StopStatement", line };
    }
    parseWait() {
      const line = this.current().line;
      this.advance();
      const duration = this.parseExpression();
      let unit = "seconds";
      if (this.check("SECOND" /* SECOND */) || this.check("SECONDS" /* SECONDS */)) {
        unit = this.current().value;
        this.advance();
      } else if (this.check("IDENTIFIER" /* IDENTIFIER */)) {
        unit = this.current().value;
        this.advance();
      }
      return { type: "WaitStatement", duration, unit, line };
    }
    parseDraw() {
      const line = this.current().line;
      this.advance();
      const shape = this.expectIdentifierName();
      const params = {};
      let canvas = "canvas";
      if (this.check("ON" /* ON */)) {
        this.advance();
        canvas = this.expectIdentifierName();
      }
      while (!this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd()) {
        const paramName = this.current().value;
        this.advance();
        if (paramName === "at" || paramName === "from" || paramName === "to" || paramName === "radius" || paramName === "size" || paramName === "saying") {
          params[paramName] = this.parseExpression();
        }
      }
      return { type: "DrawStatement", shape, canvas, params, line };
    }
    parseClear() {
      const line = this.current().line;
      this.advance();
      const target = this.check("IDENTIFIER" /* IDENTIFIER */) ? this.current().value : "canvas";
      if (this.check("IDENTIFIER" /* IDENTIFIER */)) this.advance();
      return { type: "ClearStatement", target, line };
    }
    parseGo() {
      const line = this.current().line;
      this.advance();
      if (this.check("TO" /* TO */)) this.advance();
      const target = this.parseExpression();
      return { type: "GoStatement", target, line };
    }
    parseOpen() {
      const line = this.current().line;
      this.advance();
      const target = this.parseExpression();
      return { type: "OpenStatement", target, line };
    }
    parseHide() {
      const line = this.current().line;
      this.advance();
      const target = this.parseExpression();
      return { type: "HideStatement", target, line };
    }
    parsePlay() {
      const line = this.current().line;
      this.advance();
      if (this.check("IDENTIFIER" /* IDENTIFIER */) && this.current().value === "sound") {
        this.advance();
      }
      const sound = this.expectIdentifierName();
      let waitFlag = false;
      if (this.check("AND" /* AND */)) {
        this.advance();
        if (this.check("WAIT" /* WAIT */)) {
          this.advance();
          waitFlag = true;
        }
      }
      return { type: "PlayStatement", sound, waitFlag, line };
    }
    parseExpressionStatement() {
      const line = this.current().line;
      if (this.check("IDENTIFIER" /* IDENTIFIER */)) {
        const name = this.current().value;
        const savedPos = this.pos;
        this.advance();
        if (this.check("QUESTION" /* QUESTION */)) {
          this.advance();
          return { type: "InspectExpression", target: { type: "Identifier", name }, line };
        }
        if (!this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd() && !this.isOperator() && !this.check("DOT" /* DOT */) && !this.check("DOT_IDENTIFIER" /* DOT_IDENTIFIER */)) {
          const args = [];
          while (!this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd()) {
            if (this.check("AND" /* AND */)) {
              this.advance();
              continue;
            }
            args.push(this.parseAddition());
          }
          if (args.length > 0) {
            return {
              type: "ExpressionStatement",
              expression: { type: "CallExpression", name, args },
              line
            };
          }
        }
        this.pos = savedPos;
      }
      const expr = this.parseExpression();
      if (this.check("QUESTION" /* QUESTION */)) {
        this.advance();
        return { type: "InspectExpression", target: expr, line };
      }
      return { type: "ExpressionStatement", expression: expr, line };
    }
    // ---- Expression parsing ----
    parseExpression() {
      return this.parseLogical();
    }
    parseLogical() {
      let left = this.parseComparison();
      while (this.check("AND" /* AND */) || this.check("OR" /* OR */)) {
        const op = this.current().value;
        this.advance();
        const right = this.parseComparison();
        left = { type: "LogicalExpression", op, left, right };
      }
      return left;
    }
    parseComparison() {
      let left = this.parseContainsOrWhere();
      if (this.check("IS" /* IS */)) {
        this.advance();
        if (this.check("NOT" /* NOT */)) {
          this.advance();
          const right2 = this.parseAddition();
          return { type: "ComparisonExpression", op: "!=", left, right: right2 };
        }
        if (this.check("GREATER" /* GREATER */)) {
          this.advance();
          this.expect("THAN" /* THAN */);
          const right2 = this.parseAddition();
          return { type: "ComparisonExpression", op: ">", left, right: right2 };
        }
        if (this.check("LESS" /* LESS */)) {
          this.advance();
          this.expect("THAN" /* THAN */);
          const right2 = this.parseAddition();
          return { type: "ComparisonExpression", op: "<", left, right: right2 };
        }
        const right = this.parseAddition();
        return { type: "ComparisonExpression", op: "==", left, right };
      }
      if (this.check("EQ" /* EQ */) || this.check("NEQ" /* NEQ */) || this.check("GT" /* GT */) || this.check("LT" /* LT */) || this.check("GTE" /* GTE */) || this.check("LTE" /* LTE */)) {
        const op = this.current().value;
        this.advance();
        const right = this.parseAddition();
        return { type: "ComparisonExpression", op, left, right };
      }
      return left;
    }
    parseContainsOrWhere() {
      let left = this.parseAddition();
      if (this.check("CONTAINS" /* CONTAINS */)) {
        this.advance();
        const value = this.parseAddition();
        return { type: "ContainsExpression", collection: left, value };
      }
      while (this.check("WHERE" /* WHERE */)) {
        this.advance();
        const predicate = this.parseComparison();
        left = { type: "WhereExpression", source: left, predicate };
      }
      while (this.check("EACH" /* EACH */) && !this.checkPrev("FOR" /* FOR */)) {
        this.advance();
        const transform = this.parseAddition();
        left = { type: "EachMapExpression", source: left, transform };
      }
      return left;
    }
    parseAddition() {
      let left = this.parseMultiplication();
      while (this.check("PLUS" /* PLUS */) || this.check("MINUS" /* MINUS */)) {
        const op = this.current().value;
        this.advance();
        const right = this.parseMultiplication();
        left = { type: "BinaryExpression", op, left, right };
      }
      return left;
    }
    parseMultiplication() {
      let left = this.parseExponent();
      while (this.check("STAR" /* STAR */) || this.check("SLASH" /* SLASH */) || this.check("PERCENT" /* PERCENT */)) {
        const op = this.current().value;
        this.advance();
        const right = this.parseExponent();
        left = { type: "BinaryExpression", op, left, right };
      }
      return left;
    }
    parseExponent() {
      let left = this.parseUnary();
      if (this.check("CARET" /* CARET */)) {
        this.advance();
        const right = this.parseExponent();
        left = { type: "BinaryExpression", op: "^", left, right };
      }
      return left;
    }
    parseUnary() {
      if (this.check("NOT" /* NOT */)) {
        this.advance();
        const operand = this.parseUnary();
        return { type: "LogicalExpression", op: "not", right: operand };
      }
      if (this.check("MINUS" /* MINUS */)) {
        this.advance();
        const operand = this.parsePrimary();
        return { type: "UnaryExpression", op: "-", operand };
      }
      return this.parsePostfix();
    }
    parsePostfix() {
      let expr = this.parsePrimary();
      while (true) {
        if (this.check("DOT" /* DOT */)) {
          this.advance();
          const property = this.expectIdentifierName();
          if (!this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd() && !this.check("DOT" /* DOT */) && !this.isOperator() && !this.isEndToken() && !this.check("RPAREN" /* RPAREN */) && !this.check("COMMA" /* COMMA */) && !this.check("AND" /* AND */) && !this.check("OR" /* OR */) && !this.check("INTO" /* INTO */) && !this.check("TO" /* TO */) && !this.check("FROM" /* FROM */) && !this.check("WHERE" /* WHERE */) && !this.check("EACH" /* EACH */) && !this.check("CONTAINS" /* CONTAINS */) && !this.check("QUESTION" /* QUESTION */) && !this.check("DOT_IDENTIFIER" /* DOT_IDENTIFIER */) && this.looksLikeMethodArg()) {
            const args = [];
            args.push(this.parseExpression());
            expr = { type: "DotCallExpression", object: expr, method: property, args };
          } else {
            expr = { type: "PropertyAccess", object: expr, property };
          }
          continue;
        }
        if (this.check("DOT_IDENTIFIER" /* DOT_IDENTIFIER */)) {
          const path = this.current().value.slice(1).split(".");
          this.advance();
          for (const prop of path) {
            expr = { type: "PropertyAccess", object: expr, property: prop };
          }
          continue;
        }
        break;
      }
      return expr;
    }
    parsePrimary() {
      const token = this.current();
      if (this.check("NUMBER" /* NUMBER */)) {
        this.advance();
        return { type: "NumberLiteral", value: parseFloat(token.value) };
      }
      if (this.check("TRUE" /* TRUE */)) {
        this.advance();
        return { type: "BooleanLiteral", value: true };
      }
      if (this.check("FALSE" /* FALSE */)) {
        this.advance();
        return { type: "BooleanLiteral", value: false };
      }
      if (this.check("NOTHING" /* NOTHING */)) {
        this.advance();
        return { type: "NothingLiteral" };
      }
      if (this.check("ME" /* ME */)) {
        this.advance();
        return { type: "MeExpression" };
      }
      if (this.check("IT" /* IT */)) {
        this.advance();
        return { type: "ItExpression" };
      }
      if (this.check("DOT_IDENTIFIER" /* DOT_IDENTIFIER */)) {
        const path = token.value.slice(1).split(".");
        this.advance();
        if (path.length === 1) {
          return { type: "Identifier", name: path[0] };
        }
        return { type: "DotExpression", path };
      }
      if (this.check("LPAREN" /* LPAREN */)) {
        this.advance();
        const expr = this.parseExpression();
        this.expect("RPAREN" /* RPAREN */);
        return { type: "ParenExpression", expr };
      }
      if (this.check("LIST" /* LIST */)) {
        this.advance();
        const items = this.parseListItems();
        return { type: "ListLiteral", items };
      }
      if (this.check("ASK" /* ASK */)) {
        return this.parseAskExpr();
      }
      if (this.check("MAKE" /* MAKE */)) {
        this.advance();
        if (this.check("A" /* A */)) this.advance();
        const kindName = this.expectIdentifierName();
        let inlineProps;
        if (this.check("WITH" /* WITH */)) {
          this.advance();
          inlineProps = this.parseInlineProps();
        }
        return { type: "MakeExpression", kindName, inlineProps };
      }
      if (this.check("NEW" /* NEW */)) {
        this.advance();
        const typeName = this.expectIdentifierName();
        return { type: "CallExpression", name: "__new", args: [{ type: "StringLiteral", value: typeName }] };
      }
      if (this.check("SEND" /* SEND */)) {
        this.advance();
        const message = this.expectIdentifierName();
        const args = [];
        while (!this.check("TO" /* TO */) && !this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd()) {
          args.push(this.parseExpression());
        }
        this.expect("TO" /* TO */);
        const target = this.parseExpression();
        return { type: "CallExpression", name: "__send", args: [{ type: "StringLiteral", value: message }, target, ...args] };
      }
      if (this.check("IDENTIFIER" /* IDENTIFIER */)) {
        const name = token.value;
        this.advance();
        return { type: "Identifier", name };
      }
      if (this.isKeywordUsableAsIdentifier()) {
        const name = token.value;
        this.advance();
        return { type: "Identifier", name };
      }
      throw new ParseError(`Unexpected token: ${token.value} (${token.type})`, token.line, token.column);
    }
    // ---- Helpers ----
    parseBlock(endTokens) {
      const body = [];
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
    parseListItems() {
      const items = [];
      if (this.check("NEWLINE" /* NEWLINE */) || this.check("EOF" /* EOF */) || this.isAtEnd()) {
        return items;
      }
      items.push(this.parseExpression());
      while (this.check("COMMA" /* COMMA */)) {
        this.advance();
        items.push(this.parseExpression());
      }
      return items;
    }
    parseInlineProps() {
      const props = [];
      while (!this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd()) {
        const name = this.expectIdentifierName();
        const value = this.parseSimpleValue();
        props.push({ name, value });
        if (this.check("COMMA" /* COMMA */)) {
          this.advance();
        } else {
          break;
        }
      }
      return props;
    }
    parseSimpleValue() {
      if (this.check("NUMBER" /* NUMBER */)) {
        const val = parseFloat(this.current().value);
        this.advance();
        return { type: "NumberLiteral", value: val };
      }
      if (this.check("TRUE" /* TRUE */)) {
        this.advance();
        return { type: "BooleanLiteral", value: true };
      }
      if (this.check("FALSE" /* FALSE */)) {
        this.advance();
        return { type: "BooleanLiteral", value: false };
      }
      if (this.check("NOTHING" /* NOTHING */)) {
        this.advance();
        return { type: "NothingLiteral" };
      }
      if (this.check("LIST" /* LIST */)) {
        this.advance();
        const items = this.parseListItems();
        return { type: "ListLiteral", items };
      }
      let text = "";
      while (!this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd() && !this.check("COMMA" /* COMMA */) && !this.check("END" /* END */)) {
        if (this.check("ON" /* ON */)) break;
        if (text) text += " ";
        text += this.current().value;
        this.advance();
      }
      if (text) {
        const num = parseFloat(text);
        if (!isNaN(num) && text === String(num)) {
          return { type: "NumberLiteral", value: num };
        }
        return { type: "StringLiteral", value: text };
      }
      return { type: "NothingLiteral" };
    }
    expectIdentifierName() {
      const token = this.current();
      if (token.type === "IDENTIFIER" /* IDENTIFIER */) {
        this.advance();
        return token.value;
      }
      if (this.isKeywordUsableAsIdentifier()) {
        this.advance();
        return token.value;
      }
      throw new ParseError(`Expected identifier, got ${token.value} (${token.type})`, token.line, token.column);
    }
    isKeywordUsableAsIdentifier() {
      const t = this.current().type;
      return [
        "KEY" /* KEY */,
        "TIMER" /* TIMER */,
        "EVERY" /* EVERY */,
        "SECOND" /* SECOND */,
        "SECONDS" /* SECONDS */,
        "CLICKED" /* CLICKED */,
        "PRESSED" /* PRESSED */,
        "CHANGED" /* CHANGED */,
        "SORT" /* SORT */,
        "REVERSE" /* REVERSE */,
        "SHUFFLE" /* SHUFFLE */,
        "EXPLAIN" /* EXPLAIN */,
        "A" /* A */,
        "AT" /* AT */,
        "FROM" /* FROM */,
        "TO" /* TO */,
        "ADD" /* ADD */,
        "REMOVE" /* REMOVE */,
        "SHOW" /* SHOW */,
        "HIDE" /* HIDE */,
        "OPEN" /* OPEN */,
        "CLEAR" /* CLEAR */,
        "DRAW" /* DRAW */,
        "PLAY" /* PLAY */,
        "WAIT" /* WAIT */,
        "STOP" /* STOP */,
        "GO" /* GO */,
        "SEND" /* SEND */,
        "CHECK" /* CHECK */,
        "USE" /* USE */,
        "NEW" /* NEW */
      ].includes(t);
    }
    expect(type) {
      if (this.check(type)) {
        const token2 = this.current();
        this.advance();
        return token2;
      }
      const token = this.current();
      throw new ParseError(`Expected ${type}, got ${token.value} (${token.type})`, token.line, token.column);
    }
    check(type) {
      if (this.isAtEnd()) return false;
      return this.current().type === type;
    }
    checkPrev(type) {
      if (this.pos <= 0) return false;
      return this.tokens[this.pos - 1].type === type;
    }
    checkListBody() {
      let i = this.pos;
      while (i < this.tokens.length && this.tokens[i].type === "NEWLINE" /* NEWLINE */) i++;
      return i < this.tokens.length && this.tokens[i].type !== "END" /* END */;
    }
    current() {
      if (this.pos >= this.tokens.length) {
        return { type: "EOF" /* EOF */, value: "", line: 0, column: 0 };
      }
      return this.tokens[this.pos];
    }
    advance() {
      const token = this.current();
      this.pos++;
      return token;
    }
    isAtEnd() {
      return this.pos >= this.tokens.length || this.current().type === "EOF" /* EOF */;
    }
    skipNewlines() {
      while (this.check("NEWLINE" /* NEWLINE */)) {
        this.advance();
      }
    }
    isOperator() {
      const t = this.current().type;
      return [
        "PLUS" /* PLUS */,
        "MINUS" /* MINUS */,
        "STAR" /* STAR */,
        "SLASH" /* SLASH */,
        "PERCENT" /* PERCENT */,
        "CARET" /* CARET */,
        "EQ" /* EQ */,
        "NEQ" /* NEQ */,
        "GT" /* GT */,
        "LT" /* LT */,
        "GTE" /* GTE */,
        "LTE" /* LTE */
      ].includes(t);
    }
    isEndToken() {
      const t = this.current().type;
      return ["END" /* END */, "ELSE" /* ELSE */, "ELSE_IF" /* ELSE_IF */, "OR" /* OR */, "CATCH" /* CATCH */].includes(t);
    }
    looksLikeMethodArg() {
      const t = this.current().type;
      return t === "NUMBER" /* NUMBER */ || t === "IDENTIFIER" /* IDENTIFIER */ || t === "TRUE" /* TRUE */ || t === "FALSE" /* FALSE */ || t === "NOTHING" /* NOTHING */ || t === "LPAREN" /* LPAREN */ || t === "DOT_IDENTIFIER" /* DOT_IDENTIFIER */;
    }
  };

  // src/interpreter.ts
  var ReturnSignal = class {
    constructor(value) {
      this.value = value;
    }
  };
  var StopSignal = class {
  };
  var CheckFailure = class extends Error {
    constructor(message, line) {
      super(message);
      this.line = line;
    }
  };
  var SayList = class {
    constructor(items = []) {
      __publicField(this, "items");
      this.items = [...items];
    }
    get first() {
      return this.items[0] ?? null;
    }
    get last() {
      return this.items[this.items.length - 1] ?? null;
    }
    get count() {
      return this.items.length;
    }
    get sum() {
      return this.items.reduce((a, b) => a + toNumber(b), 0);
    }
    get average() {
      return this.count > 0 ? this.sum / this.count : 0;
    }
    get max() {
      return Math.max(...this.items.map(toNumber));
    }
    get min() {
      return Math.min(...this.items.map(toNumber));
    }
    at(index) {
      return this.items[index - 1] ?? null;
    }
    add(value) {
      this.items.push(value);
    }
    remove(value) {
      const idx = this.items.findIndex((item) => valuesEqual(item, value));
      if (idx !== -1) this.items.splice(idx, 1);
    }
    contains(value) {
      return this.items.some((item) => valuesEqual(item, value));
    }
    sort() {
      this.items.sort((a, b) => {
        const sa = toString(a);
        const sb = toString(b);
        if (typeof a === "number" && typeof b === "number") return a - b;
        return sa.localeCompare(sb);
      });
    }
    reverse() {
      this.items.reverse();
    }
    shuffle() {
      for (let i = this.items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
      }
    }
    toString() {
      return this.items.map(toString).join(", ");
    }
  };
  var SayKind = class {
    constructor(name, parent) {
      __publicField(this, "name");
      __publicField(this, "parent");
      __publicField(this, "fields");
      __publicField(this, "methods");
      this.name = name;
      this.parent = parent;
      this.fields = /* @__PURE__ */ new Map();
      this.methods = /* @__PURE__ */ new Map();
      if (parent) {
        for (const [k, v] of parent.fields) this.fields.set(k, v);
        for (const [k, v] of parent.methods) this.methods.set(k, v);
      }
    }
  };
  var SayInstance = class {
    constructor(kind) {
      __publicField(this, "kind");
      __publicField(this, "properties");
      __publicField(this, "methods");
      this.kind = kind;
      this.properties = /* @__PURE__ */ new Map();
      this.methods = /* @__PURE__ */ new Map();
      for (const [k, v] of kind.fields) {
        this.properties.set(k, v);
      }
      for (const [k, v] of kind.methods) {
        this.methods.set(k, v);
      }
    }
    get(property) {
      return this.properties.get(property) ?? null;
    }
    set(property, value) {
      this.properties.set(property, value);
    }
    toString() {
      const props = [];
      for (const [k, v] of this.properties) {
        props.push(`${k}: ${toString(v)}`);
      }
      return `${this.kind.name} (${props.join(", ")})`;
    }
  };
  var SayUIElement = class {
    constructor(type) {
      __publicField(this, "elementType");
      __publicField(this, "properties");
      this.elementType = type;
      this.properties = /* @__PURE__ */ new Map();
    }
    get(property) {
      return this.properties.get(property) ?? null;
    }
    set(property, value) {
      this.properties.set(property, value);
    }
    toString() {
      return `[${this.elementType}]`;
    }
  };
  var Environment = class {
    constructor(parent = null) {
      __publicField(this, "values", /* @__PURE__ */ new Map());
      __publicField(this, "parent");
      this.parent = parent;
    }
    get(name) {
      if (this.values.has(name)) return this.values.get(name);
      if (this.parent) return this.parent.get(name);
      return void 0;
    }
    set(name, value) {
      if (this.values.has(name)) {
        this.values.set(name, value);
        return;
      }
      if (this.parent && this.parent.has(name)) {
        this.parent.set(name, value);
        return;
      }
      this.values.set(name, value);
    }
    has(name) {
      if (this.values.has(name)) return true;
      if (this.parent) return this.parent.has(name);
      return false;
    }
    define(name, value) {
      this.values.set(name, value);
    }
  };
  var Interpreter = class {
    constructor(options = {}) {
      __publicField(this, "env");
      __publicField(this, "globalEnv");
      __publicField(this, "kinds", /* @__PURE__ */ new Map());
      __publicField(this, "commands", /* @__PURE__ */ new Map());
      __publicField(this, "handlers", /* @__PURE__ */ new Map());
      __publicField(this, "testResults", []);
      __publicField(this, "output");
      __publicField(this, "input");
      __publicField(this, "maxIterations");
      __publicField(this, "itValue", null);
      this.globalEnv = new Environment();
      this.env = this.globalEnv;
      this.output = options.output || ((text) => console.log(text));
      this.input = options.input || (() => "");
      this.maxIterations = options.maxIterations || 1e5;
      this.registerBuiltins();
    }
    registerBuiltins() {
      const mathModule = new SayInstance(new SayKind("Module"));
      mathModule.set("pi", Math.PI);
      mathModule.set("e", Math.E);
      this.globalEnv.define("math", mathModule);
    }
    async run(program) {
      for (const node of program.body) {
        await this.execute(node);
      }
    }
    async runTests(program) {
      this.testResults = [];
      for (const node of program.body) {
        if (node.type !== "TestBlock") {
          await this.execute(node);
        }
      }
      for (const node of program.body) {
        if (node.type === "TestBlock") {
          await this.executeTest(node);
        }
      }
      return this.testResults;
    }
    async execute(node) {
      switch (node.type) {
        case "PutStatement":
          return this.executePut(node);
        case "ShowStatement":
          return this.executeShow(node);
        case "AskExpression":
          return this.executeAsk(node);
        case "IfStatement":
          return this.executeIf(node);
        case "RepeatStatement":
          return this.executeRepeat(node);
        case "ForEachStatement":
          return this.executeForEach(node);
        case "KindDeclaration":
          return this.executeKind(node);
        case "MakeStatement":
          return this.executeMakeStmt(node);
        case "SendStatement":
          return this.executeSend(node);
        case "OnHandler":
          return this.executeOnHandler(node);
        case "CommandDeclaration":
          return this.executeCommandDecl(node);
        case "ReturnStatement":
          throw new ReturnSignal(await this.evaluate(node.value));
        case "AddStatement":
          return this.executeAdd(node);
        case "RemoveStatement":
          return this.executeRemove(node);
        case "SortStatement":
          return this.executeSort(node);
        case "ReverseStatement":
          return this.executeReverseStmt(node);
        case "ShuffleStatement":
          return this.executeShuffleStmt(node);
        case "TryStatement":
          return this.executeTry(node);
        case "UseStatement":
          return this.executeUse(node);
        case "TestBlock":
          return this.executeTest(node);
        case "CheckStatement":
          return this.executeCheck(node);
        case "ExplainStatement":
          return this.executeExplain(node);
        case "InspectExpression":
          return this.executeInspect(node);
        case "StopStatement":
          throw new StopSignal();
        case "WaitStatement":
          return this.executeWait(node);
        case "DrawStatement":
          return null;
        // Visual stub
        case "ClearStatement":
          return null;
        // Visual stub
        case "GoStatement":
          return null;
        // Visual stub
        case "OpenStatement":
          return null;
        // Visual stub
        case "HideStatement":
          return null;
        // Visual stub
        case "PlayStatement":
          return null;
        // Visual stub
        case "ExpressionStatement":
          return this.evaluate(node.expression);
        case "ListLiteralMultiline":
          return this.executeListMultiline(node);
        default:
          return null;
      }
    }
    async executePut(node) {
      const value = await this.evaluate(node.value);
      await this.assignTarget(node.target, value);
      return value;
    }
    async executeShow(node) {
      const pieces = [];
      for (const part of node.parts) {
        switch (part.type) {
          case "text":
            pieces.push(part.value);
            break;
          case "interpolation": {
            const val = this.resolvePath(part.path);
            pieces.push(toString(val));
            break;
          }
          case "expression": {
            const val = await this.evaluate(part.expr);
            pieces.push(toString(val));
            break;
          }
        }
      }
      this.output(pieces.join(" "));
      return null;
    }
    async executeAsk(node) {
      const answer = await this.input(node.prompt);
      this.itValue = answer;
      this.env.set("it", answer);
      return answer;
    }
    async executeIf(node) {
      const condition = await this.evaluate(node.condition);
      if (isTruthy(condition)) {
        return this.executeBlock(node.body);
      }
      for (const clause of node.elseIfClauses) {
        const eifCond = await this.evaluate(clause.condition);
        if (isTruthy(eifCond)) {
          return this.executeBlock(clause.body);
        }
      }
      if (node.elseBody.length > 0) {
        return this.executeBlock(node.elseBody);
      }
      return null;
    }
    async executeRepeat(node) {
      let iterations = 0;
      switch (node.variant) {
        case "times": {
          const count = toNumber(await this.evaluate(node.count));
          for (let i = 0; i < count; i++) {
            if (++iterations > this.maxIterations) throw new Error("Maximum iterations exceeded");
            try {
              await this.executeBlock(node.body);
            } catch (e) {
              if (e instanceof StopSignal) break;
              throw e;
            }
          }
          break;
        }
        case "while": {
          while (isTruthy(await this.evaluate(node.condition))) {
            if (++iterations > this.maxIterations) throw new Error("Maximum iterations exceeded");
            try {
              await this.executeBlock(node.body);
            } catch (e) {
              if (e instanceof StopSignal) break;
              throw e;
            }
          }
          break;
        }
        case "until": {
          while (!isTruthy(await this.evaluate(node.condition))) {
            if (++iterations > this.maxIterations) throw new Error("Maximum iterations exceeded");
            try {
              await this.executeBlock(node.body);
            } catch (e) {
              if (e instanceof StopSignal) break;
              throw e;
            }
          }
          break;
        }
        case "forever": {
          while (true) {
            if (++iterations > this.maxIterations) throw new Error("Maximum iterations exceeded");
            try {
              await this.executeBlock(node.body);
            } catch (e) {
              if (e instanceof StopSignal) break;
              throw e;
            }
          }
          break;
        }
      }
      return null;
    }
    async executeForEach(node) {
      const iterable = await this.evaluate(node.iterable);
      let items;
      if (iterable instanceof SayList) {
        items = iterable.items;
      } else if (Array.isArray(iterable)) {
        items = iterable;
      } else {
        items = [iterable];
      }
      const childEnv = new Environment(this.env);
      const prevEnv = this.env;
      this.env = childEnv;
      try {
        for (let i = 0; i < items.length; i++) {
          childEnv.define(node.variable, items[i]);
          if (node.indexVariable) {
            childEnv.define(node.indexVariable, i + 1);
          }
          try {
            await this.executeBlock(node.body);
          } catch (e) {
            if (e instanceof StopSignal) break;
            throw e;
          }
        }
      } finally {
        this.env = prevEnv;
      }
      return null;
    }
    async executeKind(node) {
      let parentKind;
      if (node.parent) {
        parentKind = this.kinds.get(node.parent);
        if (!parentKind) throw new Error(`Unknown parent kind: ${node.parent}`);
      }
      const kind = new SayKind(node.name, parentKind);
      for (const field of node.fields) {
        const val = await this.evaluate(field.defaultValue);
        kind.fields.set(field.name, val);
      }
      for (const method of node.methods) {
        kind.methods.set(method.name, method);
      }
      this.kinds.set(node.name, kind);
      this.env.define(node.name, kind);
      return kind;
    }
    async executeMakeStmt(node) {
      const kind = this.kinds.get(node.kindName);
      if (!kind) throw new Error(`Unknown kind: ${node.kindName}`);
      const instance = new SayInstance(kind);
      if (node.inlineProps) {
        for (const prop of node.inlineProps) {
          const val = await this.evaluate(prop.value);
          instance.set(prop.name, val);
        }
      }
      this.env.set(node.instanceName, instance);
      return instance;
    }
    async executeSend(node) {
      const target = await this.evaluate(node.target);
      if (!(target instanceof SayInstance)) {
        throw new Error(`Cannot send message to non-instance: ${toString(target)}`);
      }
      const method = target.methods.get(node.message);
      if (!method) throw new Error(`Unknown method: ${node.message} on ${target.kind.name}`);
      const args = [];
      for (const arg of node.args) {
        args.push(await this.evaluate(arg));
      }
      return this.callMethod(target, method, args);
    }
    async callMethod(instance, method, args) {
      const methodEnv = new Environment(this.env);
      methodEnv.define("me", instance);
      for (let i = 0; i < method.params.length; i++) {
        methodEnv.define(method.params[i], args[i] ?? null);
      }
      const prevEnv = this.env;
      this.env = methodEnv;
      let result = null;
      try {
        await this.executeBlock(method.body);
      } catch (e) {
        if (e instanceof ReturnSignal) {
          result = e.value;
        } else {
          throw e;
        }
      } finally {
        this.env = prevEnv;
      }
      return result;
    }
    executeOnHandler(node) {
      this.handlers.set(node.name, node);
      return null;
    }
    executeCommandDecl(node) {
      this.commands.set(node.name, node);
      return null;
    }
    async executeAdd(node) {
      const value = await this.evaluate(node.value);
      const target = await this.evaluate(node.target);
      if (target instanceof SayList) {
        target.add(value);
      } else if (target instanceof SayUIElement) {
      }
      return null;
    }
    async executeRemove(node) {
      const value = await this.evaluate(node.value);
      const target = await this.evaluate(node.target);
      if (target instanceof SayList) {
        target.remove(value);
      }
      return null;
    }
    async executeSort(node) {
      const target = await this.evaluate(node.target);
      if (target instanceof SayList) target.sort();
      return null;
    }
    async executeReverseStmt(node) {
      const target = await this.evaluate(node.target);
      if (target instanceof SayList) target.reverse();
      return null;
    }
    async executeShuffleStmt(node) {
      const target = await this.evaluate(node.target);
      if (target instanceof SayList) target.shuffle();
      return null;
    }
    async executeTry(node) {
      try {
        await this.executeBlock(node.body);
      } catch (e) {
        if (e instanceof ReturnSignal || e instanceof StopSignal) throw e;
        if (node.catchVar) {
          const errorObj = new SayInstance(new SayKind("Error"));
          errorObj.set("message", e instanceof Error ? e.message : String(e));
          errorObj.set("line", node.line);
          const catchEnv = new Environment(this.env);
          catchEnv.define(node.catchVar, errorObj);
          const prevEnv = this.env;
          this.env = catchEnv;
          try {
            await this.executeBlock(node.catchBody);
          } finally {
            this.env = prevEnv;
          }
        } else {
          await this.executeBlock(node.catchBody);
        }
      }
      return null;
    }
    executeUse(_node) {
      return null;
    }
    async executeTest(node) {
      try {
        await this.executeBlock(node.body);
        this.testResults.push({ name: node.name, passed: true });
      } catch (e) {
        if (e instanceof CheckFailure) {
          this.testResults.push({ name: node.name, passed: false, error: e.message });
        } else if (e instanceof Error) {
          this.testResults.push({ name: node.name, passed: false, error: e.message });
        }
      }
      return null;
    }
    async executeCheck(node) {
      const result = await this.evaluate(node.expression);
      if (!isTruthy(result)) {
        throw new CheckFailure(`Check failed at line ${node.line}`, node.line);
      }
      return null;
    }
    async executeExplain(node) {
      const target = await this.evaluate(node.target);
      if (target instanceof SayInstance) {
        const props = [];
        for (const [k, v] of target.properties) {
          props.push(`${k}: ${toString(v)}`);
        }
        const methods = Array.from(target.methods.keys()).join(", ");
        this.output(`${target.kind.name} with ${props.join(", ")}`);
        if (methods) this.output(`Can: ${methods}`);
      } else if (target instanceof SayKind) {
        const fields = Array.from(target.fields.keys()).join(", ");
        const methods = Array.from(target.methods.keys()).join(", ");
        this.output(`Kind ${target.name} with: ${fields} | on: ${methods}`);
      } else {
        this.output(`${typeof target}: ${toString(target)}`);
      }
      return null;
    }
    async executeInspect(node) {
      const target = await this.evaluate(node.target);
      if (target instanceof SayInstance) {
        this.output(target.toString());
      } else if (target instanceof SayList) {
        this.output(`List (${target.toString()}) count: ${target.count}`);
      } else if (target instanceof SayKind) {
        const fields = Array.from(target.fields.keys()).join(", ");
        const methods = Array.from(target.methods.keys()).join(", ");
        this.output(`Kind with: ${fields} | on: ${methods}`);
      } else if (typeof target === "number") {
        this.output(`Number: ${target}`);
      } else if (typeof target === "string") {
        this.output(`Text: ${target}`);
      } else if (typeof target === "boolean") {
        this.output(`Boolean: ${target}`);
      } else {
        this.output(`${toString(target)}`);
      }
      return null;
    }
    async executeWait(node) {
      const duration = toNumber(await this.evaluate(node.duration));
      const ms = node.unit === "milliseconds" || node.unit === "ms" ? duration : duration * 1e3;
      await new Promise((resolve) => setTimeout(resolve, ms));
      return null;
    }
    async executeListMultiline(node) {
      const items = [];
      for (const item of node.items) {
        items.push(await this.evaluate(item));
      }
      const list = new SayList(items);
      this.env.set(node.target, list);
      return list;
    }
    async executeBlock(body) {
      let result = null;
      for (const node of body) {
        result = await this.execute(node);
      }
      return result;
    }
    // ---- Expression evaluation ----
    async evaluate(node) {
      switch (node.type) {
        case "NumberLiteral":
          return node.value;
        case "StringLiteral":
          return node.value;
        case "BooleanLiteral":
          return node.value;
        case "NothingLiteral":
          return null;
        case "MeExpression":
          return this.env.get("me");
        case "ItExpression":
          return this.env.get("it") ?? this.itValue;
        case "Identifier": {
          const cmd = this.commands.get(node.name);
          if (cmd) {
            return this.callCommand(cmd, []);
          }
          const val = this.env.get(node.name);
          if (val === void 0) return node.name;
          return val;
        }
        case "DotExpression":
          return this.resolveDotExpression(node.path);
        case "BinaryExpression": {
          const left = await this.evaluate(node.left);
          const right = await this.evaluate(node.right);
          return this.evalBinary(node.op, left, right);
        }
        case "UnaryExpression": {
          const operand = await this.evaluate(node.operand);
          if (node.op === "-") return -toNumber(operand);
          return operand;
        }
        case "ComparisonExpression": {
          const left = await this.evaluate(node.left);
          const right = await this.evaluate(node.right);
          return this.evalComparison(node.op, left, right);
        }
        case "LogicalExpression": {
          if (node.op === "not") {
            const right = await this.evaluate(node.right);
            return !isTruthy(right);
          }
          const left = await this.evaluate(node.left);
          if (node.op === "and") {
            if (!isTruthy(left)) return false;
            return isTruthy(await this.evaluate(node.right));
          }
          if (node.op === "or") {
            if (isTruthy(left)) return true;
            return isTruthy(await this.evaluate(node.right));
          }
          return false;
        }
        case "ListLiteral": {
          const items = [];
          for (const item of node.items) {
            items.push(await this.evaluate(item));
          }
          return new SayList(items);
        }
        case "CallExpression": {
          if (node.name === "__new") {
            const typeName = await this.evaluate(node.args[0]);
            return new SayUIElement(toString(typeName));
          }
          if (node.name === "__send") {
            const message = toString(await this.evaluate(node.args[0]));
            const target = await this.evaluate(node.args[1]);
            const args = [];
            for (let i = 2; i < node.args.length; i++) {
              args.push(await this.evaluate(node.args[i]));
            }
            if (target instanceof SayInstance) {
              const method = target.methods.get(message);
              if (!method) throw new Error(`Unknown method: ${message}`);
              return this.callMethod(target, method, args);
            }
            throw new Error(`Cannot send to non-instance`);
          }
          const cmd = this.commands.get(node.name);
          if (cmd) {
            const args = [];
            for (const arg of node.args) {
              args.push(await this.evaluate(arg));
            }
            return this.callCommand(cmd, args);
          }
          if (node.name === "math") {
            return this.env.get("math");
          }
          return null;
        }
        case "DotCallExpression": {
          const obj = await this.evaluate(node.object);
          const args = [];
          for (const arg of node.args) {
            args.push(await this.evaluate(arg));
          }
          if (obj instanceof SayInstance) {
            const method = obj.methods.get(node.method);
            if (method) return this.callMethod(obj, method, args);
            const propVal = obj.get(node.method);
            if (propVal !== null) return propVal;
          }
          if (obj instanceof SayList) {
            if (node.method === "at") return obj.at(toNumber(args[0]));
          }
          if (typeof obj === "string") {
            if (node.method === "upper") return obj.toUpperCase();
            if (node.method === "lower") return obj.toLowerCase();
            if (node.method === "length") return obj.length;
            if (node.method === "trim") return obj.trim();
            if (node.method === "split") return new SayList(obj.split(toString(args[0])));
          }
          return null;
        }
        case "PropertyAccess": {
          const obj = await this.evaluate(node.object);
          return this.getProperty(obj, node.property);
        }
        case "MakeExpression": {
          const kind = this.kinds.get(node.kindName);
          if (!kind) throw new Error(`Unknown kind: ${node.kindName}`);
          const instance = new SayInstance(kind);
          if (node.inlineProps) {
            for (const prop of node.inlineProps) {
              instance.set(prop.name, await this.evaluate(prop.value));
            }
          }
          return instance;
        }
        case "WhereExpression": {
          const source = await this.evaluate(node.source);
          if (!(source instanceof SayList)) throw new Error("where requires a list");
          const result = [];
          for (const item of source.items) {
            const prevIt = this.env.get("it");
            this.env.set("it", item);
            const pred = await this.evaluate(node.predicate);
            this.env.set("it", prevIt ?? null);
            if (isTruthy(pred)) result.push(item);
          }
          return new SayList(result);
        }
        case "EachMapExpression": {
          const source = await this.evaluate(node.source);
          if (!(source instanceof SayList)) throw new Error("each requires a list");
          const result = [];
          for (const item of source.items) {
            const prevIt = this.env.get("it");
            this.env.set("it", item);
            const mapped = await this.evaluate(node.transform);
            this.env.set("it", prevIt ?? null);
            result.push(mapped);
          }
          return new SayList(result);
        }
        case "ContainsExpression": {
          const collection = await this.evaluate(node.collection);
          const value = await this.evaluate(node.value);
          if (collection instanceof SayList) return collection.contains(value);
          return false;
        }
        case "RangeExpression": {
          const start = toNumber(await this.evaluate(node.start));
          const end = toNumber(await this.evaluate(node.end));
          const items = [];
          if (start <= end) {
            for (let i = start; i <= end; i++) items.push(i);
          } else {
            for (let i = start; i >= end; i--) items.push(i);
          }
          return new SayList(items);
        }
        case "ParenExpression":
          return this.evaluate(node.expr);
        case "AskExpression":
          return this.executeAsk(node);
        default:
          return null;
      }
    }
    getProperty(obj, property) {
      if (obj instanceof SayInstance) {
        return obj.get(property) ?? null;
      }
      if (obj instanceof SayList) {
        switch (property) {
          case "first":
            return obj.first;
          case "last":
            return obj.last;
          case "count":
            return obj.count;
          case "sum":
            return obj.sum;
          case "average":
            return obj.average;
          case "max":
            return obj.max;
          case "min":
            return obj.min;
        }
      }
      if (obj instanceof SayUIElement) {
        return obj.get(property) ?? null;
      }
      if (typeof obj === "string") {
        if (property === "length") return obj.length;
        if (property === "upper") return obj.toUpperCase();
        if (property === "lower") return obj.toLowerCase();
        if (property === "trim") return obj.trim();
      }
      return null;
    }
    resolvePath(path) {
      const parts = path.split(".");
      let current = this.env.get(parts[0]);
      if (current === void 0) return path;
      for (let i = 1; i < parts.length; i++) {
        current = this.getProperty(current, parts[i]);
      }
      return current;
    }
    resolveDotExpression(path) {
      let current = this.env.get(path[0]);
      if (current === void 0) return null;
      for (let i = 1; i < path.length; i++) {
        current = this.getProperty(current, path[i]);
      }
      return current;
    }
    async assignTarget(target, value) {
      if (target.type === "Identifier") {
        this.env.set(target.name, value);
        return;
      }
      if (target.type === "PropertyAccess") {
        let obj = await this.evaluate(target.object);
        if ((obj === void 0 || obj === null || typeof obj === "string") && target.object.type === "Identifier") {
          const autoObj = new SayInstance(new SayKind("Object"));
          this.env.set(target.object.name, autoObj);
          obj = autoObj;
        }
        if (obj instanceof SayInstance) {
          obj.set(target.property, value);
        } else if (obj instanceof SayUIElement) {
          obj.set(target.property, value);
        }
        return;
      }
      if (target.type === "DotExpression") {
        const path = target.path;
        if (path.length === 1) {
          this.env.set(path[0], value);
          return;
        }
        let current = this.env.get(path[0]);
        if (current === void 0 || current === null) {
          const autoObj = new SayInstance(new SayKind("Object"));
          this.env.set(path[0], autoObj);
          current = autoObj;
        }
        for (let i = 1; i < path.length - 1; i++) {
          if (current instanceof SayInstance) {
            let next = current.get(path[i]);
            if (next === null || next === void 0) {
              next = new SayInstance(new SayKind("Object"));
              current.set(path[i], next);
            }
            current = next;
          }
        }
        if (current instanceof SayInstance) {
          current.set(path[path.length - 1], value);
        }
        return;
      }
      throw new Error(`Cannot assign to ${target.type}`);
    }
    evalBinary(op, left, right) {
      const l = toNumber(left);
      const r = toNumber(right);
      switch (op) {
        case "+":
          if (typeof left === "string" && isNaN(Number(left)) || typeof right === "string" && isNaN(Number(right))) {
            return toString(left) + toString(right);
          }
          return l + r;
        case "-":
          return l - r;
        case "*":
          return l * r;
        case "/":
          return r !== 0 ? l / r : 0;
        case "%":
          return l % r;
        case "^":
          return Math.pow(l, r);
        default:
          return 0;
      }
    }
    evalComparison(op, left, right) {
      switch (op) {
        case "==":
          return valuesEqual(left, right);
        case "!=":
          return !valuesEqual(left, right);
        case ">":
          return toNumber(left) > toNumber(right);
        case "<":
          return toNumber(left) < toNumber(right);
        case ">=":
          return toNumber(left) >= toNumber(right);
        case "<=":
          return toNumber(left) <= toNumber(right);
        default:
          return false;
      }
    }
    async callCommand(cmd, args) {
      const cmdEnv = new Environment(this.env);
      for (let i = 0; i < cmd.params.length; i++) {
        cmdEnv.define(cmd.params[i], args[i] ?? null);
      }
      const prevEnv = this.env;
      this.env = cmdEnv;
      let result = null;
      try {
        await this.executeBlock(cmd.body);
      } catch (e) {
        if (e instanceof ReturnSignal) {
          result = e.value;
        } else {
          throw e;
        }
      } finally {
        this.env = prevEnv;
      }
      return result;
    }
    getTestResults() {
      return this.testResults;
    }
  };
  function toNumber(val) {
    if (typeof val === "number") return val;
    if (typeof val === "string") {
      const n = parseFloat(val);
      return isNaN(n) ? 0 : n;
    }
    if (typeof val === "boolean") return val ? 1 : 0;
    if (val === null || val === void 0) return 0;
    return 0;
  }
  function toString(val) {
    if (val === null || val === void 0) return "nothing";
    if (val instanceof SayList) return val.toString();
    if (val instanceof SayInstance) return val.toString();
    if (val instanceof SayKind) return `[Kind ${val.name}]`;
    if (val instanceof SayUIElement) return val.toString();
    return String(val);
  }
  function isTruthy(val) {
    if (val === null || val === void 0) return false;
    if (typeof val === "boolean") return val;
    if (typeof val === "number") return val !== 0;
    if (typeof val === "string") return val.length > 0;
    return true;
  }
  function valuesEqual(a, b) {
    if (a === b) return true;
    if (a === null || a === void 0) return b === null || b === void 0;
    if (typeof a === "number" && typeof b === "string") return a === parseFloat(b);
    if (typeof a === "string" && typeof b === "number") return parseFloat(a) === b;
    if (typeof a === "string" && typeof b === "string") {
      return a.toLowerCase() === b.toLowerCase();
    }
    return a === b;
  }

  // src/ast.ts
  var ast_exports = {};

  // src/index.ts
  async function run(source, options = {}) {
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser();
    const program = parser.parse(tokens);
    const interpreter = new Interpreter(options);
    await interpreter.run(program);
  }
  async function runTests(source, options = {}) {
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser();
    const program = parser.parse(tokens);
    const interpreter = new Interpreter(options);
    return interpreter.runTests(program);
  }
  return __toCommonJS(index_exports);
})();

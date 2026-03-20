"use strict";
var HyperCode = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
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

  // src/node-shim.ts
  var node_shim_exports = {};
  __export(node_shim_exports, {
    default: () => node_shim_default
  });
  var node_shim_default;
  var init_node_shim = __esm({
    "src/node-shim.ts"() {
      "use strict";
      node_shim_default = {};
    }
  });

  // src/web.ts
  var web_exports = {};
  __export(web_exports, {
    AST: () => ast_exports,
    Interpreter: () => Interpreter,
    Lexer: () => Lexer,
    Parser: () => Parser,
    SayEnum: () => SayEnum,
    SayInstance: () => SayInstance,
    SayKind: () => SayKind,
    SayLambda: () => SayLambda,
    SayList: () => SayList,
    SayMap: () => SayMap,
    SayPair: () => SayPair,
    SaySet: () => SaySet,
    SayUIElement: () => SayUIElement,
    TokenType: () => TokenType,
    canvasToSVG: () => canvasToSVG,
    canvasToText: () => canvasToText,
    createCanvas: () => createCanvas,
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
    TokenType2["SET"] = "SET";
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
    TokenType2["MAP"] = "MAP";
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
    TokenType2["RANDOM"] = "RANDOM";
    TokenType2["PICK"] = "PICK";
    TokenType2["TEXT"] = "TEXT";
    TokenType2["NUMBER_TYPE"] = "NUMBER_TYPE";
    TokenType2["WHEN"] = "WHEN";
    TokenType2["ROUNDED"] = "ROUNDED";
    TokenType2["READ"] = "READ";
    TokenType2["WRITE"] = "WRITE";
    TokenType2["APPEND"] = "APPEND";
    TokenType2["AS"] = "AS";
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
    TokenType2["THINK"] = "THINK";
    TokenType2["FETCH"] = "FETCH";
    TokenType2["SERVE"] = "SERVE";
    TokenType2["RESPOND"] = "RESPOND";
    TokenType2["REQUEST"] = "REQUEST";
    TokenType2["ROUTE"] = "ROUTE";
    TokenType2["STATUS"] = "STATUS";
    TokenType2["REMEMBER"] = "REMEMBER";
    TokenType2["RECALL"] = "RECALL";
    TokenType2["FORGET"] = "FORGET";
    TokenType2["GRAB"] = "GRAB";
    TokenType2["SHARE"] = "SHARE";
    TokenType2["TOGETHER"] = "TOGETHER";
    TokenType2["DO"] = "DO";
    TokenType2["ALOUD"] = "ALOUD";
    TokenType2["NOTE"] = "NOTE";
    TokenType2["SOUND"] = "SOUND";
    TokenType2["BOOLEAN_TYPE"] = "BOOLEAN_TYPE";
    TokenType2["NAMESPACE"] = "NAMESPACE";
    TokenType2["CANVAS"] = "CANVAS";
    TokenType2["COLOR"] = "COLOR";
    TokenType2["SIZE"] = "SIZE";
    TokenType2["LINE"] = "LINE";
    TokenType2["CIRCLE"] = "CIRCLE";
    TokenType2["RECTANGLE"] = "RECTANGLE";
    TokenType2["FILL"] = "FILL";
    TokenType2["STROKE"] = "STROKE";
    TokenType2["WIDTH"] = "WIDTH";
    TokenType2["HEIGHT"] = "HEIGHT";
    TokenType2["DEBUG"] = "DEBUG";
    TokenType2["STEP"] = "STEP";
    TokenType2["BREAKPOINT"] = "BREAKPOINT";
    TokenType2["CLASSROOM"] = "CLASSROOM";
    TokenType2["SUBMIT"] = "SUBMIT";
    TokenType2["COLLECT"] = "COLLECT";
    TokenType2["SAY_ALOUD"] = "SAY_ALOUD";
    TokenType2["LISTEN"] = "LISTEN";
    TokenType2["PAIR"] = "PAIR";
    TokenType2["ENUM"] = "ENUM";
    TokenType2["EXISTS"] = "EXISTS";
    TokenType2["UNIQUE"] = "UNIQUE";
    TokenType2["MATCHES"] = "MATCHES";
    TokenType2["FORMAT"] = "FORMAT";
    TokenType2["PLACES"] = "PLACES";
    TokenType2["TEMPLATE"] = "TEMPLATE";
    TokenType2["INTERPOLATED_STRING"] = "INTERPOLATED_STRING";
    TokenType2["BY"] = "BY";
    TokenType2["LABELED"] = "LABELED";
    TokenType2["PIPE"] = "PIPE";
    TokenType2["AWAIT"] = "AWAIT";
    TokenType2["CONTRACT"] = "CONTRACT";
    TokenType2["IMPLEMENTS"] = "IMPLEMENTS";
    TokenType2["SECRET"] = "SECRET";
    TokenType2["STATIC"] = "STATIC";
    TokenType2["USES"] = "USES";
    TokenType2["GETTER"] = "GETTER";
    TokenType2["OVERLOAD"] = "OVERLOAD";
    TokenType2["LAMBDA"] = "LAMBDA";
    TokenType2["ARROW"] = "ARROW";
    TokenType2["APPLY"] = "APPLY";
    TokenType2["CURRY"] = "CURRY";
    TokenType2["COMPOSE"] = "COMPOSE";
    TokenType2["CSV"] = "CSV";
    TokenType2["JSON_TYPE"] = "JSON_TYPE";
    TokenType2["ENV"] = "ENV";
    TokenType2["ARGUMENTS"] = "ARGUMENTS";
    TokenType2["CURRENT"] = "CURRENT";
    TokenType2["TIME"] = "TIME";
    TokenType2["TODAY"] = "TODAY";
    TokenType2["DATE"] = "DATE";
    TokenType2["FILES"] = "FILES";
    TokenType2["FOLDER"] = "FOLDER";
    TokenType2["DELETE_FILE"] = "DELETE_FILE";
    TokenType2["EXECUTE"] = "EXECUTE";
    TokenType2["SHELL"] = "SHELL";
    TokenType2["ANIMATE"] = "ANIMATE";
    TokenType2["MOVING"] = "MOVING";
    TokenType2["OVER"] = "OVER";
    TokenType2["SPRITE"] = "SPRITE";
    TokenType2["LOAD"] = "LOAD";
    TokenType2["TOUCHES"] = "TOUCHES";
    TokenType2["SCENE"] = "SCENE";
    TokenType2["SWITCH"] = "SWITCH";
    TokenType2["FORWARD"] = "FORWARD";
    TokenType2["BACKWARD"] = "BACKWARD";
    TokenType2["TURN"] = "TURN";
    TokenType2["LEFT"] = "LEFT";
    TokenType2["RIGHT"] = "RIGHT";
    TokenType2["PEN"] = "PEN";
    TokenType2["UP"] = "UP";
    TokenType2["DOWN"] = "DOWN";
    TokenType2["LAYER"] = "LAYER";
    TokenType2["CONNECT"] = "CONNECT";
    TokenType2["SOCKET"] = "SOCKET";
    TokenType2["EMIT"] = "EMIT";
    TokenType2["STATIC_FILES"] = "STATIC_FILES";
    TokenType2["COOKIE"] = "COOKIE";
    TokenType2["SESSION"] = "SESSION";
    TokenType2["ALLOW"] = "ALLOW";
    TokenType2["STREAM"] = "STREAM";
    TokenType2["CLIENT"] = "CLIENT";
    TokenType2["MOCK"] = "MOCK";
    TokenType2["BEFORE"] = "BEFORE";
    TokenType2["AFTER"] = "AFTER";
    TokenType2["SNAPSHOT"] = "SNAPSHOT";
    TokenType2["BENCHMARK"] = "BENCHMARK";
    TokenType2["PROPERTY"] = "PROPERTY";
    TokenType2["ANY"] = "ANY";
    TokenType2["WATCH"] = "WATCH";
    TokenType2["PROFILE"] = "PROFILE";
    TokenType2["LINT"] = "LINT";
    TokenType2["SAVE"] = "SAVE";
    TokenType2["HISTORY"] = "HISTORY";
    TokenType2["VISUALIZE"] = "VISUALIZE";
    TokenType2["CHALLENGE"] = "CHALLENGE";
    TokenType2["GRADE"] = "GRADE";
    TokenType2["RUBRIC"] = "RUBRIC";
    TokenType2["BLOCK_MODE"] = "BLOCK_MODE";
    TokenType2["LBRACE"] = "LBRACE";
    TokenType2["RBRACE"] = "RBRACE";
    TokenType2["COLON"] = "COLON";
    TokenType2["LBRACKET"] = "LBRACKET";
    TokenType2["RBRACKET"] = "RBRACKET";
    return TokenType2;
  })(TokenType || {});
  var KEYWORDS = {
    "put": "PUT" /* PUT */,
    "set": "SET" /* SET */,
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
    "map": "MAP" /* MAP */,
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
    "random": "RANDOM" /* RANDOM */,
    "pick": "PICK" /* PICK */,
    "text": "TEXT" /* TEXT */,
    "number": "NUMBER_TYPE" /* NUMBER_TYPE */,
    "when": "WHEN" /* WHEN */,
    "rounded": "ROUNDED" /* ROUNDED */,
    "read": "READ" /* READ */,
    "write": "WRITE" /* WRITE */,
    "append": "APPEND" /* APPEND */,
    "as": "AS" /* AS */,
    "clicked": "CLICKED" /* CLICKED */,
    "pressed": "PRESSED" /* PRESSED */,
    "changed": "CHANGED" /* CHANGED */,
    "key": "KEY" /* KEY */,
    "every": "EVERY" /* EVERY */,
    "second": "SECOND" /* SECOND */,
    "seconds": "SECONDS" /* SECONDS */,
    "timer": "TIMER" /* TIMER */,
    "think": "THINK" /* THINK */,
    "fetch": "FETCH" /* FETCH */,
    "serve": "SERVE" /* SERVE */,
    "respond": "RESPOND" /* RESPOND */,
    "request": "REQUEST" /* REQUEST */,
    "route": "ROUTE" /* ROUTE */,
    "status": "STATUS" /* STATUS */,
    "remember": "REMEMBER" /* REMEMBER */,
    "recall": "RECALL" /* RECALL */,
    "forget": "FORGET" /* FORGET */,
    "grab": "GRAB" /* GRAB */,
    "share": "SHARE" /* SHARE */,
    "together": "TOGETHER" /* TOGETHER */,
    "do": "DO" /* DO */,
    "aloud": "ALOUD" /* ALOUD */,
    "note": "NOTE" /* NOTE */,
    "sound": "SOUND" /* SOUND */,
    "boolean": "BOOLEAN_TYPE" /* BOOLEAN_TYPE */,
    "canvas": "CANVAS" /* CANVAS */,
    "color": "COLOR" /* COLOR */,
    "size": "SIZE" /* SIZE */,
    "line": "LINE" /* LINE */,
    "circle": "CIRCLE" /* CIRCLE */,
    "rectangle": "RECTANGLE" /* RECTANGLE */,
    "fill": "FILL" /* FILL */,
    "stroke": "STROKE" /* STROKE */,
    "width": "WIDTH" /* WIDTH */,
    "height": "HEIGHT" /* HEIGHT */,
    "debug": "DEBUG" /* DEBUG */,
    "step": "STEP" /* STEP */,
    "breakpoint": "BREAKPOINT" /* BREAKPOINT */,
    "classroom": "CLASSROOM" /* CLASSROOM */,
    "submit": "SUBMIT" /* SUBMIT */,
    "collect": "COLLECT" /* COLLECT */,
    "listen": "LISTEN" /* LISTEN */,
    // Data types
    "pair": "PAIR" /* PAIR */,
    "enum": "ENUM" /* ENUM */,
    "exists": "EXISTS" /* EXISTS */,
    "unique": "UNIQUE" /* UNIQUE */,
    // String/Text
    "matches": "MATCHES" /* MATCHES */,
    "format": "FORMAT" /* FORMAT */,
    "places": "PLACES" /* PLACES */,
    "template": "TEMPLATE" /* TEMPLATE */,
    // Control flow
    "by": "BY" /* BY */,
    "await": "AWAIT" /* AWAIT */,
    // OOP
    "contract": "CONTRACT" /* CONTRACT */,
    "implements": "IMPLEMENTS" /* IMPLEMENTS */,
    "secret": "SECRET" /* SECRET */,
    "static": "STATIC" /* STATIC */,
    "uses": "USES" /* USES */,
    "getter": "GETTER" /* GETTER */,
    "overload": "OVERLOAD" /* OVERLOAD */,
    // Functional
    "apply": "APPLY" /* APPLY */,
    "curry": "CURRY" /* CURRY */,
    "compose": "COMPOSE" /* COMPOSE */,
    // I/O & System
    "csv": "CSV" /* CSV */,
    "json": "JSON_TYPE" /* JSON_TYPE */,
    "env": "ENV" /* ENV */,
    "arguments": "ARGUMENTS" /* ARGUMENTS */,
    "current": "CURRENT" /* CURRENT */,
    "time": "TIME" /* TIME */,
    "today": "TODAY" /* TODAY */,
    "date": "DATE" /* DATE */,
    "files": "FILES" /* FILES */,
    "folder": "FOLDER" /* FOLDER */,
    "execute": "EXECUTE" /* EXECUTE */,
    "shell": "SHELL" /* SHELL */,
    // Graphics
    "animate": "ANIMATE" /* ANIMATE */,
    "moving": "MOVING" /* MOVING */,
    "over": "OVER" /* OVER */,
    "sprite": "SPRITE" /* SPRITE */,
    "load": "LOAD" /* LOAD */,
    "touches": "TOUCHES" /* TOUCHES */,
    "scene": "SCENE" /* SCENE */,
    "switch": "SWITCH" /* SWITCH */,
    "forward": "FORWARD" /* FORWARD */,
    "backward": "BACKWARD" /* BACKWARD */,
    "turn": "TURN" /* TURN */,
    "left": "LEFT" /* LEFT */,
    "right": "RIGHT" /* RIGHT */,
    "pen": "PEN" /* PEN */,
    "up": "UP" /* UP */,
    "down": "DOWN" /* DOWN */,
    "layer": "LAYER" /* LAYER */,
    // Web
    "connect": "CONNECT" /* CONNECT */,
    "socket": "SOCKET" /* SOCKET */,
    "emit": "EMIT" /* EMIT */,
    "cookie": "COOKIE" /* COOKIE */,
    "session": "SESSION" /* SESSION */,
    "allow": "ALLOW" /* ALLOW */,
    "stream": "STREAM" /* STREAM */,
    "client": "CLIENT" /* CLIENT */,
    // Testing
    "mock": "MOCK" /* MOCK */,
    "before": "BEFORE" /* BEFORE */,
    "after": "AFTER" /* AFTER */,
    "snapshot": "SNAPSHOT" /* SNAPSHOT */,
    "benchmark": "BENCHMARK" /* BENCHMARK */,
    "property": "PROPERTY" /* PROPERTY */,
    "any": "ANY" /* ANY */,
    // DevEx
    "watch": "WATCH" /* WATCH */,
    "profile": "PROFILE" /* PROFILE */,
    "lint": "LINT" /* LINT */,
    "save": "SAVE" /* SAVE */,
    "history": "HISTORY" /* HISTORY */,
    // Education
    "visualize": "VISUALIZE" /* VISUALIZE */,
    "challenge": "CHALLENGE" /* CHALLENGE */,
    "grade": "GRADE" /* GRADE */,
    "rubric": "RUBRIC" /* RUBRIC */
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
        if (ch === '"' && this.peek(1) === '"' && this.peek(2) === '"') {
          this.readTripleQuoteString();
          continue;
        }
        if (ch === '"') {
          this.readString();
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
          case "{":
            this.addToken("LBRACE" /* LBRACE */, "{");
            this.advance();
            continue;
          case "}":
            this.addToken("RBRACE" /* RBRACE */, "}");
            this.advance();
            continue;
          case "[":
            this.addToken("LBRACKET" /* LBRACKET */, "[");
            this.advance();
            continue;
          case "]":
            this.addToken("RBRACKET" /* RBRACKET */, "]");
            this.advance();
            continue;
          case ":":
            this.addToken("COLON" /* COLON */, ":");
            this.advance();
            continue;
          case "|":
            if (this.peek(1) === ">") {
              this.addToken("PIPE" /* PIPE */, "|>");
              this.advance();
              this.advance();
            } else {
              this.addToken("PIPE" /* PIPE */, "|");
              this.advance();
            }
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
            if (this.peek(1) === ">") {
              this.addToken("ARROW" /* ARROW */, "->");
              this.advance();
              this.advance();
            } else {
              this.addToken("MINUS" /* MINUS */, "-");
              this.advance();
            }
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
        "SET" /* SET */,
        "TO" /* TO */,
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
    readString() {
      const start = this.pos;
      this.pos++;
      let value = "";
      let hasInterpolation = false;
      while (this.pos < this.source.length && this.source[this.pos] !== '"') {
        if (this.source[this.pos] === "\\" && this.pos + 1 < this.source.length) {
          this.pos++;
          switch (this.source[this.pos]) {
            case "n":
              value += "\n";
              break;
            case "t":
              value += "	";
              break;
            case '"':
              value += '"';
              break;
            case "\\":
              value += "\\";
              break;
            case "{":
              value += "{";
              break;
            default:
              value += this.source[this.pos];
          }
        } else {
          if (this.source[this.pos] === "{") hasInterpolation = true;
          value += this.source[this.pos];
        }
        this.pos++;
      }
      if (this.pos < this.source.length) this.pos++;
      this.addToken(hasInterpolation ? "INTERPOLATED_STRING" /* INTERPOLATED_STRING */ : "STRING" /* STRING */, value);
      this.column += this.pos - start;
    }
    readTripleQuoteString() {
      const start = this.pos;
      this.pos += 3;
      let value = "";
      while (this.pos < this.source.length) {
        if (this.source[this.pos] === '"' && this.peek(1) === '"' && this.peek(2) === '"') {
          this.pos += 3;
          break;
        }
        if (this.source[this.pos] === "\n") {
          this.line++;
          this.column = 1;
          value += "\n";
        } else {
          value += this.source[this.pos];
        }
        this.pos++;
      }
      this.addToken("STRING" /* STRING */, value);
      this.column += this.pos - start;
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
  var Parser = class _Parser {
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
        case "SET" /* SET */:
          return this.parseSet();
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
        case "WHEN" /* WHEN */:
          return this.parseWhen();
        case "WRITE" /* WRITE */:
          return this.parseWrite();
        case "APPEND" /* APPEND */:
          return this.parseAppend();
        case "REMEMBER" /* REMEMBER */:
          return this.parseRemember();
        case "FORGET" /* FORGET */:
          return this.parseForget();
        case "SERVE" /* SERVE */:
          return this.parseServe();
        case "RESPOND" /* RESPOND */:
          return this.parseRespond();
        case "ROUTE" /* ROUTE */:
          return this.parseRoute();
        case "GRAB" /* GRAB */:
          return this.parseGrab();
        case "SHARE" /* SHARE */:
          return this.parseShare();
        case "DO" /* DO */:
          return this.parseDoTogether();
        case "LISTEN" /* LISTEN */:
          return this.parseListen();
        case "EVERY" /* EVERY */:
          return this.parseEvery();
        case "CONTRACT" /* CONTRACT */:
          return this.parseContract();
        case "ENUM" /* ENUM */:
          return this.parseEnum();
        case "MOCK" /* MOCK */:
          return this.parseMock();
        case "BEFORE" /* BEFORE */:
          return this.parseBefore();
        case "AFTER" /* AFTER */:
          return this.parseAfter();
        case "BENCHMARK" /* BENCHMARK */:
          return this.parseBenchmark();
        case "ANIMATE" /* ANIMATE */:
          return this.parseAnimate();
        case "FORWARD" /* FORWARD */:
          return this.parseTurtle("forward");
        case "BACKWARD" /* BACKWARD */:
          return this.parseTurtle("backward");
        case "TURN" /* TURN */:
          return this.parseTurnStatement();
        case "PEN" /* PEN */:
          return this.parsePen();
        case "SWITCH" /* SWITCH */:
          return this.parseSwitchScene();
        case "CONNECT" /* CONNECT */:
          return this.parseConnect();
        case "EMIT" /* EMIT */:
          return this.parseEmit();
        case "COOKIE" /* COOKIE */:
          return this.parseCookie();
        case "ALLOW" /* ALLOW */:
          return this.parseAllow();
        case "STREAM" /* STREAM */:
          return this.parseStream();
        case "TEMPLATE" /* TEMPLATE */:
          return this.parseTemplate();
        case "FORMAT" /* FORMAT */:
          return this.parseFormat();
        case "APPLY" /* APPLY */:
          return this.parseApply();
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
      if (this.check("MAP" /* MAP */)) {
        this.advance();
        if (this.check("INTO" /* INTO */)) {
          this.expect("INTO" /* INTO */);
          const target2 = this.parseExpression();
          return { type: "PutStatement", value: { type: "MapLiteral" }, target: target2, line };
        }
        this.pos--;
      }
      if (this.check("PAIR" /* PAIR */)) {
        const saved = this.pos;
        this.advance();
        if (!this.check("INTO" /* INTO */) && !this.check("NEWLINE" /* NEWLINE */) && !this.isAtEnd()) {
          const first = this.parseAddition();
          if (this.check("AND" /* AND */) || this.check("COMMA" /* COMMA */)) {
            this.advance();
            const second = this.parseAddition();
            this.expect("INTO" /* INTO */);
            const target2 = this.parseExpression();
            return { type: "PutStatement", value: { type: "PairLiteral", first, second }, target: target2, line };
          }
        }
        this.pos = saved;
      }
      if (this.check("UNIQUE" /* UNIQUE */)) {
        const saved = this.pos;
        this.advance();
        if (this.check("LIST" /* LIST */)) this.advance();
        if (this.check("INTO" /* INTO */)) {
          this.expect("INTO" /* INTO */);
          const target2 = this.parseExpression();
          return { type: "PutStatement", value: { type: "SetLiteral", items: [] }, target: target2, line };
        }
        if (!this.check("NEWLINE" /* NEWLINE */) && !this.isAtEnd()) {
          const items = this.parseListItems();
          this.expect("INTO" /* INTO */);
          const target2 = this.parseExpression();
          return { type: "PutStatement", value: { type: "SetLiteral", items }, target: target2, line };
        }
        this.pos = saved;
      }
      const parts = [];
      while (!this.isAtEnd() && !this.check("INTO" /* INTO */) && !this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */)) {
        const val = this.current().value;
        if (this.check("DOT" /* DOT */)) {
          if (parts.length > 0) {
            parts[parts.length - 1] += ".";
          }
        } else if (val === "!" || val === "?" || val === "," || val === ":" || val === ";") {
          if (parts.length > 0) {
            parts[parts.length - 1] += val;
          }
        } else {
          parts.push(val);
        }
        this.advance();
      }
      const value = { type: "StringLiteral", value: parts.join(" ") };
      this.expect("INTO" /* INTO */);
      const target = this.parseExpression();
      return { type: "PutStatement", value, target, line };
    }
    parseSet() {
      const line = this.current().line;
      this.advance();
      let target;
      let name;
      if (this.check("ME" /* ME */)) {
        name = "me";
        this.advance();
      } else {
        name = this.expectIdentifierName();
      }
      if (this.check("COMMA" /* COMMA */)) {
        const variables = [name];
        while (this.check("COMMA" /* COMMA */)) {
          this.advance();
          variables.push(this.expectIdentifierName());
        }
        this.expect("FROM" /* FROM */);
        const source = this.parseExpression();
        return { type: "DestructureStatement", variables, source, line };
      }
      if (this.check("DOT" /* DOT */)) {
        const path = [name];
        while (this.check("DOT" /* DOT */)) {
          this.advance();
          path.push(this.expectIdentifierName());
        }
        if (path.length === 2) {
          target = { type: "PropertyAccess", object: { type: "Identifier", name: path[0] }, property: path[1] };
        } else {
          target = { type: "DotExpression", path };
        }
      } else if (this.check("DOT_IDENTIFIER" /* DOT_IDENTIFIER */)) {
        const dotPath = this.current().value.slice(1).split(".");
        this.advance();
        const path = [name, ...dotPath];
        if (path.length === 2) {
          target = { type: "PropertyAccess", object: { type: "Identifier", name: path[0] }, property: path[1] };
        } else {
          target = { type: "DotExpression", path };
        }
      } else {
        target = { type: "Identifier", name };
      }
      this.expect("TO" /* TO */);
      const value = this.parseSetValue();
      return { type: "SetStatement", target, value, line };
    }
    parseSetValue() {
      if (this.check("PAIR" /* PAIR */) || this.check("UNIQUE" /* UNIQUE */) || this.check("CURRY" /* CURRY */) || this.check("COMPOSE" /* COMPOSE */) || this.check("JSON_TYPE" /* JSON_TYPE */) || this.check("CSV" /* CSV */) || this.check("ENV" /* ENV */) || this.check("LBRACE" /* LBRACE */)) {
        return this.parseExpression();
      }
      if (this.check("IDENTIFIER" /* IDENTIFIER */) || this.isKeywordUsableAsIdentifier()) {
        const savedPos = this.pos;
        const firstType = this.current().type;
        let hasAnd = false;
        let hasOperator = false;
        let tokenCount = 0;
        let scanPos = this.pos;
        while (scanPos < this.tokens.length) {
          const t = this.tokens[scanPos].type;
          if (t === "NEWLINE" /* NEWLINE */ || t === "EOF" /* EOF */) break;
          if (t === "AND" /* AND */) hasAnd = true;
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
            "IS" /* IS */,
            "CONTAINS" /* CONTAINS */,
            "WHERE" /* WHERE */,
            "EACH" /* EACH */,
            "LPAREN" /* LPAREN */,
            "DOT" /* DOT */,
            "DOT_IDENTIFIER" /* DOT_IDENTIFIER */,
            "ROUNDED" /* ROUNDED */,
            "FORMAT" /* FORMAT */,
            "MATCHES" /* MATCHES */,
            "PIPE" /* PIPE */,
            "EXISTS" /* EXISTS */
          ].includes(t)) {
            hasOperator = true;
          }
          tokenCount++;
          scanPos++;
        }
        if (hasAnd && !hasOperator) {
          const cmdName = this.current().value;
          this.advance();
          const args = [];
          while (!this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd()) {
            if (this.check("AND" /* AND */) || this.check("COMMA" /* COMMA */)) {
              this.advance();
              continue;
            }
            args.push(this.parseAddition());
          }
          if (args.length > 0) {
            return { type: "CallExpression", name: cmdName, args };
          }
          this.pos = savedPos;
        }
        if (!hasOperator && !hasAnd && tokenCount > 1 && firstType === "IDENTIFIER" /* IDENTIFIER */) {
          const cmdName = this.current().value;
          this.advance();
          const args = [];
          while (!this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd()) {
            if (this.check("COMMA" /* COMMA */)) {
              this.advance();
              continue;
            }
            args.push(this.parseAddition());
          }
          if (args.length > 0) {
            return { type: "CallExpression", name: cmdName, args };
          }
          this.pos = savedPos;
        }
      }
      if (this.check("SEND" /* SEND */)) {
        return this.parsePrimary();
      }
      return this.parseExpression();
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
          const savedPos = this.pos;
          if ((this.check("IDENTIFIER" /* IDENTIFIER */) || this.isKeywordUsableAsIdentifier()) && !this.check("RPAREN" /* RPAREN */)) {
            const name = this.current().value;
            this.advance();
            if (!this.check("RPAREN" /* RPAREN */) && !this.check("PLUS" /* PLUS */) && !this.check("MINUS" /* MINUS */) && !this.check("STAR" /* STAR */) && !this.check("SLASH" /* SLASH */) && !this.check("EQ" /* EQ */) && !this.check("NEQ" /* NEQ */) && !this.check("GT" /* GT */) && !this.check("LT" /* LT */) && !this.check("GTE" /* GTE */) && !this.check("LTE" /* LTE */) && !this.check("DOT" /* DOT */) && !this.check("DOT_IDENTIFIER" /* DOT_IDENTIFIER */) && !this.check("IS" /* IS */) && !this.check("AND" /* AND */) && !this.check("OR" /* OR */)) {
              const args = [];
              while (!this.check("RPAREN" /* RPAREN */) && !this.isAtEnd()) {
                args.push(this.parseAddition());
                if (this.check("COMMA" /* COMMA */)) this.advance();
              }
              this.expect("RPAREN" /* RPAREN */);
              parts.push({ type: "expression", expr: { type: "CallExpression", name, args } });
              continue;
            }
            this.pos = savedPos;
          }
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
      let label;
      if (this.check("AS" /* AS */)) {
        this.advance();
        label = this.expectIdentifierName();
      }
      if (this.check("FOREVER" /* FOREVER */)) {
        this.advance();
        this.skipNewlines();
        const body2 = this.parseBlock(["END"]);
        this.expect("END" /* END */);
        return { type: "RepeatStatement", variant: "forever", label, body: body2, line };
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
      let counterVariable;
      if (this.check("WITH" /* WITH */)) {
        this.advance();
        counterVariable = this.expectIdentifierName();
      }
      if (this.check("AS" /* AS */)) {
        this.advance();
        label = this.expectIdentifierName();
      }
      this.skipNewlines();
      const body = this.parseBlock(["END"]);
      this.expect("END" /* END */);
      return { type: "RepeatStatement", variant: "times", count, counterVariable, label, body, line };
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
      let step;
      if (this.check("BY" /* BY */)) {
        this.advance();
        step = this.parseExpression();
      }
      this.skipNewlines();
      const body = this.parseBlock(["END"]);
      this.expect("END" /* END */);
      return { type: "ForEachStatement", variable, indexVariable, iterable, step, body, line };
    }
    parseKind() {
      const line = this.current().line;
      this.advance();
      const name = this.expectIdentifierName();
      if (this.check("IS" /* IS */)) {
        const savedPos = this.pos;
        this.advance();
        if (!this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd()) {
          const firstName = this.expectIdentifierName();
          if (this.check("COMMA" /* COMMA */)) {
            const values = [firstName];
            while (this.check("COMMA" /* COMMA */)) {
              this.advance();
              values.push(this.expectIdentifierName());
            }
            this.skipNewlines();
            if (this.check("END" /* END */)) this.advance();
            return { type: "EnumDeclaration", name, values, line };
          }
          this.pos = savedPos;
        } else {
          this.pos = savedPos;
        }
      }
      let parent;
      let implementsList;
      let mixins;
      if (this.check("FROM" /* FROM */)) {
        this.advance();
        parent = this.expectIdentifierName();
      }
      if (this.check("IMPLEMENTS" /* IMPLEMENTS */)) {
        this.advance();
        implementsList = [this.expectIdentifierName()];
        while (this.check("COMMA" /* COMMA */)) {
          this.advance();
          implementsList.push(this.expectIdentifierName());
        }
      }
      if (this.check("USES" /* USES */)) {
        this.advance();
        mixins = [this.expectIdentifierName()];
        while (this.check("COMMA" /* COMMA */)) {
          this.advance();
          mixins.push(this.expectIdentifierName());
        }
      }
      this.skipNewlines();
      const fields = [];
      const methods = [];
      const staticMethods = [];
      const getters = [];
      const operators = [];
      while (!this.check("END" /* END */) && !this.isAtEnd()) {
        this.skipNewlines();
        if (this.check("END" /* END */)) break;
        if (this.check("ON" /* ON */)) {
          methods.push(this.parseOn());
        } else if (this.check("STATIC" /* STATIC */)) {
          this.advance();
          if (this.check("ON" /* ON */)) {
            staticMethods.push(this.parseOn());
          }
        } else if (this.check("GETTER" /* GETTER */)) {
          this.advance();
          getters.push(this.parseOn());
        } else if (this.check("OVERLOAD" /* OVERLOAD */)) {
          this.advance();
          const op = this.expectIdentifierName();
          const handler = this.parseOn();
          operators.push({ op, handler });
        } else if (this.check("SECRET" /* SECRET */)) {
          this.advance();
          const fieldName = this.expectIdentifierName();
          this.expect("IS" /* IS */);
          const defaultValue = this.parseSimpleValue();
          fields.push({ name: fieldName, defaultValue, isPrivate: true });
          this.skipNewlines();
        } else {
          const fieldName = this.expectIdentifierName();
          this.expect("IS" /* IS */);
          const defaultValue = this.parseSimpleValue();
          fields.push({ name: fieldName, defaultValue });
          this.skipNewlines();
        }
      }
      this.expect("END" /* END */);
      return {
        type: "KindDeclaration",
        name,
        parent,
        implements: implementsList,
        mixins,
        fields,
        methods,
        staticMethods,
        getters,
        operators,
        line
      };
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
      const paramTypes = [];
      if (this.check("LPAREN" /* LPAREN */)) {
        this.advance();
        while (!this.check("RPAREN" /* RPAREN */) && !this.isAtEnd()) {
          const paramName = this.expectIdentifierName();
          params.push(paramName);
          if (this.check("AS" /* AS */)) {
            this.advance();
            paramTypes.push(this.parseTypeName());
          } else {
            paramTypes.push(void 0);
          }
          if (this.check("COMMA" /* COMMA */)) this.advance();
        }
        if (this.check("RPAREN" /* RPAREN */)) this.advance();
      } else {
        while (!this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd()) {
          if (this.check("AND" /* AND */) || this.check("COMMA" /* COMMA */)) {
            this.advance();
            continue;
          }
          const paramName = this.current().value;
          params.push(paramName);
          this.advance();
        }
      }
      this.skipNewlines();
      const body = this.parseBlock(["END"]);
      this.expect("END" /* END */);
      return { type: "CommandDeclaration", name, params, paramTypes: paramTypes.length > 0 ? paramTypes : void 0, body, line };
    }
    parseReturn() {
      const line = this.current().line;
      this.advance();
      if (this.check("IF" /* IF */)) {
        this.advance();
        const condition2 = this.parseExpression();
        return { type: "ReturnStatement", value: { type: "NothingLiteral" }, condition: condition2, line };
      }
      const value = this.parseExpression();
      let condition;
      if (this.check("IF" /* IF */)) {
        this.advance();
        condition = this.parseExpression();
      }
      return { type: "ReturnStatement", value, condition, line };
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
      let module;
      if (this.check("STRING" /* STRING */)) {
        module = this.current().value;
        this.advance();
      } else {
        module = this.expectIdentifierName();
      }
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
      let label;
      if (this.check("IDENTIFIER" /* IDENTIFIER */) && !this.check("NEWLINE" /* NEWLINE */)) {
        label = this.current().value;
        this.advance();
      }
      return { type: "StopStatement", label, line };
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
        if (paramName === "at" || paramName === "from" || paramName === "to") {
          const first = this.parseAddition();
          if (this.check("COMMA" /* COMMA */)) {
            this.advance();
            const second = this.parseAddition();
            params[paramName] = { type: "ListLiteral", items: [first, second] };
          } else {
            params[paramName] = first;
          }
        } else if (paramName === "radius" || paramName === "size" || paramName === "saying" || paramName === "width" || paramName === "height") {
          params[paramName] = this.parseExpression();
        } else if (paramName === "with") {
          continue;
        } else if (paramName === "and") {
          continue;
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
    parseWhen() {
      const line = this.current().line;
      this.advance();
      const target = this.parseExpression();
      this.skipNewlines();
      const cases = [];
      let elseBody = [];
      while (!this.check("END" /* END */) && !this.isAtEnd()) {
        this.skipNewlines();
        if (this.check("END" /* END */)) break;
        if (this.check("IS" /* IS */)) {
          this.advance();
          if (this.check("A" /* A */)) {
            this.advance();
            const typeName = this.parseTypeName();
            this.skipNewlines();
            const body = this.parseBlock(["IS", "ELSE", "END"]);
            const value = { type: "TypeCheckExpression", value: { type: "StringLiteral", value: "__when_type_check__" }, targetType: typeName, negated: false };
            cases.push({ value, body });
          } else {
            const value = this.parseExpression();
            const orValues = [value];
            while (this.check("OR" /* OR */)) {
              this.advance();
              orValues.push(this.parseExpression());
            }
            this.skipNewlines();
            const body = this.parseBlock(["IS", "ELSE", "END"]);
            if (orValues.length === 1) {
              cases.push({ value, body });
            } else {
              for (const v of orValues) {
                cases.push({ value: v, body });
              }
            }
          }
        } else if (this.check("ELSE" /* ELSE */)) {
          this.advance();
          this.skipNewlines();
          elseBody = this.parseBlock(["END"]);
        } else {
          this.advance();
        }
      }
      this.expect("END" /* END */);
      return { type: "WhenStatement", target, cases, elseBody, line };
    }
    parseWrite() {
      const line = this.current().line;
      this.advance();
      const path = this.parsePrimary();
      this.expect("WITH" /* WITH */);
      const value = this.parseExpression();
      return { type: "WriteStatement", path, value, append: false, line };
    }
    parseAppend() {
      const line = this.current().line;
      this.advance();
      const path = this.parsePrimary();
      this.expect("WITH" /* WITH */);
      const value = this.parseExpression();
      return { type: "WriteStatement", path, value, append: true, line };
    }
    // --- Remember/Recall/Forget ---
    parseRemember() {
      const line = this.current().line;
      this.advance();
      const key = this.parseExpression();
      this.expect("AS" /* AS */);
      const value = this.parseExpression();
      return { type: "RememberStatement", key, value, line };
    }
    parseForget() {
      const line = this.current().line;
      this.advance();
      const key = this.parseExpression();
      return { type: "ForgetStatement", key, line };
    }
    // --- Web server ---
    parseServe() {
      const line = this.current().line;
      this.advance();
      if (this.check("ON" /* ON */)) this.advance();
      if (this.check("IDENTIFIER" /* IDENTIFIER */) && this.current().value === "port") this.advance();
      const port = this.parseExpression();
      return { type: "ServeStatement", port, line };
    }
    parseRespond() {
      const line = this.current().line;
      this.advance();
      if (this.check("WITH" /* WITH */)) this.advance();
      const value = this.parseExpression();
      let statusCode;
      if (this.check("STATUS" /* STATUS */)) {
        this.advance();
        statusCode = this.parseExpression();
      }
      return { type: "RespondStatement", value, statusCode, line };
    }
    parseRoute() {
      const line = this.current().line;
      this.advance();
      let method = "GET";
      if (this.check("IDENTIFIER" /* IDENTIFIER */)) {
        const upper = this.current().value.toUpperCase();
        if (["GET", "POST", "PUT", "DELETE", "PATCH"].includes(upper)) {
          method = upper;
          this.advance();
        }
      }
      const path = this.parseExpression();
      this.skipNewlines();
      const body = this.parseBlock(["END"]);
      this.expect("END" /* END */);
      return { type: "RouteStatement", method, path, body, line };
    }
    // --- Packages ---
    parseGrab() {
      const line = this.current().line;
      this.advance();
      let module;
      if (this.check("STRING" /* STRING */)) {
        module = this.current().value;
        this.advance();
      } else {
        module = this.expectIdentifierName();
      }
      return { type: "GrabStatement", module, line };
    }
    // --- Sharing ---
    parseShare() {
      const line = this.current().line;
      this.advance();
      const target = this.parseExpression();
      return { type: "ShareStatement", target, line };
    }
    // --- Do together ---
    parseDoTogether() {
      const line = this.current().line;
      this.advance();
      this.expect("TOGETHER" /* TOGETHER */);
      this.skipNewlines();
      const blocks = [];
      let currentBlock = [];
      while (!this.check("END" /* END */) && !this.isAtEnd()) {
        this.skipNewlines();
        if (this.check("END" /* END */)) break;
        if (this.check("AND" /* AND */)) {
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
      this.expect("END" /* END */);
      return { type: "DoTogetherStatement", blocks, line };
    }
    // --- Listen ---
    parseListen() {
      const line = this.current().line;
      this.advance();
      if (this.check("FOR" /* FOR */)) this.advance();
      const event = this.expectIdentifierName();
      let variable;
      if (this.check("AS" /* AS */)) {
        this.advance();
        variable = this.expectIdentifierName();
      }
      this.skipNewlines();
      const body = this.parseBlock(["END"]);
      this.expect("END" /* END */);
      return { type: "ListenStatement", event, variable, body, line };
    }
    // --- Every (timer) ---
    parseEvery() {
      const line = this.current().line;
      this.advance();
      const interval = this.parseExpression();
      let unit = "seconds";
      if (this.check("SECOND" /* SECOND */) || this.check("SECONDS" /* SECONDS */)) {
        unit = this.current().value;
        this.advance();
      } else if (this.check("IDENTIFIER" /* IDENTIFIER */)) {
        unit = this.current().value;
        this.advance();
      }
      this.skipNewlines();
      const body = this.parseBlock(["END"]);
      this.expect("END" /* END */);
      return { type: "EveryStatement", interval, unit, body, line };
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
      let expr = this.parseLogical();
      while (this.check("PIPE" /* PIPE */)) {
        this.advance();
        const stages = [expr];
        stages.push(this.parseLogical());
        while (this.check("PIPE" /* PIPE */)) {
          this.advance();
          stages.push(this.parseLogical());
        }
        expr = { type: "PipelineExpression", stages };
      }
      return expr;
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
          if (this.check("A" /* A */)) {
            this.advance();
            const typeName = this.parseTypeName();
            return { type: "TypeCheckExpression", value: left, targetType: typeName, negated: true };
          }
          const right2 = this.parseAddition();
          return { type: "ComparisonExpression", op: "!=", left, right: right2 };
        }
        if (this.check("A" /* A */)) {
          this.advance();
          const typeName = this.parseTypeName();
          return { type: "TypeCheckExpression", value: left, targetType: typeName, negated: false };
        }
        if (this.check("NOTHING" /* NOTHING */)) {
          this.advance();
          return { type: "TypeCheckExpression", value: left, targetType: "nothing", negated: false };
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
      if (this.check("MATCHES" /* MATCHES */)) {
        this.advance();
        const pattern = this.parseAddition();
        return { type: "RegexMatchExpression", value: left, pattern };
      }
      if (this.check("EXISTS" /* EXISTS */)) {
        this.advance();
        return { type: "ExistsExpression", target: left };
      }
      if (this.check("FORMAT" /* FORMAT */)) {
        this.advance();
        const places = this.parseAddition();
        if (this.check("PLACES" /* PLACES */)) this.advance();
        return { type: "FormatExpression", value: left, places };
      }
      if (this.check("TOUCHES" /* TOUCHES */)) {
        this.advance();
        const right = this.parseAddition();
        return { type: "TouchesExpression", left, right };
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
          if (property === "from") {
            if (!this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd() && this.looksLikeMethodArg()) {
              const args = [];
              args.push(this.parseAddition());
              this.expect("TO" /* TO */);
              args.push(this.parseAddition());
              expr = { type: "DotCallExpression", object: expr, method: "from", args };
              continue;
            }
          }
          if (!this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd() && !this.check("DOT" /* DOT */) && !this.isOperator() && !this.isEndToken() && !this.check("RPAREN" /* RPAREN */) && !this.check("COMMA" /* COMMA */) && !this.check("AND" /* AND */) && !this.check("OR" /* OR */) && !this.check("INTO" /* INTO */) && !this.check("TO" /* TO */) && !this.check("FROM" /* FROM */) && !this.check("WHERE" /* WHERE */) && !this.check("EACH" /* EACH */) && !this.check("CONTAINS" /* CONTAINS */) && !this.check("QUESTION" /* QUESTION */) && !this.check("DOT_IDENTIFIER" /* DOT_IDENTIFIER */) && !this.check("ROUNDED" /* ROUNDED */) && this.looksLikeMethodArg()) {
            const args = [];
            args.push(this.parseExpression());
            expr = { type: "DotCallExpression", object: expr, method: property, args };
          } else {
            expr = { type: "PropertyAccess", object: expr, property };
          }
          continue;
        }
        if (this.check("ROUNDED" /* ROUNDED */)) {
          this.advance();
          this.expect("TO" /* TO */);
          const decimals = this.parsePrimary();
          expr = { type: "RoundedExpression", value: expr, decimals };
          continue;
        }
        if (this.check("DOT_IDENTIFIER" /* DOT_IDENTIFIER */)) {
          const path = this.current().value.slice(1).split(".");
          this.advance();
          for (let pi = 0; pi < path.length - 1; pi++) {
            expr = { type: "PropertyAccess", object: expr, property: path[pi] };
          }
          const lastProp = path[path.length - 1];
          if (lastProp === "from") {
            if (!this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd() && this.looksLikeMethodArg()) {
              const args = [];
              args.push(this.parseAddition());
              this.expect("TO" /* TO */);
              args.push(this.parseAddition());
              expr = { type: "DotCallExpression", object: expr, method: "from", args };
              continue;
            }
          }
          if (!this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd() && !this.check("DOT" /* DOT */) && !this.isOperator() && !this.isEndToken() && !this.check("RPAREN" /* RPAREN */) && !this.check("COMMA" /* COMMA */) && !this.check("AND" /* AND */) && !this.check("OR" /* OR */) && !this.check("INTO" /* INTO */) && !this.check("TO" /* TO */) && !this.check("FROM" /* FROM */) && !this.check("WHERE" /* WHERE */) && !this.check("EACH" /* EACH */) && !this.check("CONTAINS" /* CONTAINS */) && !this.check("QUESTION" /* QUESTION */) && !this.check("DOT_IDENTIFIER" /* DOT_IDENTIFIER */) && !this.check("ROUNDED" /* ROUNDED */) && this.looksLikeMethodArg()) {
            const args = [];
            args.push(this.parseExpression());
            expr = { type: "DotCallExpression", object: expr, method: lastProp, args };
          } else {
            expr = { type: "PropertyAccess", object: expr, property: lastProp };
          }
          continue;
        }
        break;
      }
      return expr;
    }
    parsePrimary() {
      const token = this.current();
      if (this.check("STRING" /* STRING */)) {
        const val = this.current().value;
        this.advance();
        return { type: "StringLiteral", value: val };
      }
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
      if (this.check("MAP" /* MAP */)) {
        this.advance();
        if (!this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd() && !this.check("INTO" /* INTO */) && !this.check("RPAREN" /* RPAREN */)) {
          const savedPos = this.pos;
          try {
            const entries = [];
            const keyName = this.expectIdentifierName();
            if (this.check("COLON" /* COLON */)) {
              this.advance();
              const val = this.parseExpression();
              entries.push({ key: { type: "StringLiteral", value: keyName }, value: val });
              while (this.check("COMMA" /* COMMA */)) {
                this.advance();
                const k = this.expectIdentifierName();
                this.expect("COLON" /* COLON */);
                const v = this.parseExpression();
                entries.push({ key: { type: "StringLiteral", value: k }, value: v });
              }
              return { type: "MapLiteralWithEntries", entries };
            }
            this.pos = savedPos;
          } catch {
            this.pos = savedPos;
          }
        }
        return { type: "MapLiteral" };
      }
      if (this.check("RANDOM" /* RANDOM */)) {
        this.advance();
        if (this.check("PICK" /* PICK */)) {
          this.advance();
          this.expect("FROM" /* FROM */);
          const source = this.parseExpression();
          return { type: "RandomExpression", variant: "pick", source };
        }
        if (!this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd() && !this.check("RPAREN" /* RPAREN */) && !this.check("COMMA" /* COMMA */) && !this.isEndToken()) {
          const start = this.parseAddition();
          this.expect("TO" /* TO */);
          const end = this.parseAddition();
          return { type: "RandomExpression", variant: "range", start, end };
        }
        return { type: "RandomExpression", variant: "float" };
      }
      if (this.check("THINK" /* THINK */)) {
        const thinkLine = this.current().line;
        this.advance();
        const prompt = this.parseExpression();
        return { type: "ThinkExpression", prompt, line: thinkLine };
      }
      if (this.check("FETCH" /* FETCH */)) {
        const fetchLine = this.current().line;
        this.advance();
        const url = this.parsePrimary();
        return { type: "FetchExpression", url, line: fetchLine };
      }
      if (this.check("RECALL" /* RECALL */)) {
        const recallLine = this.current().line;
        this.advance();
        const key = this.parseExpression();
        return { type: "RecallExpression", key, line: recallLine };
      }
      if (this.check("INTERPOLATED_STRING" /* INTERPOLATED_STRING */)) {
        const raw = this.current().value;
        this.advance();
        return this.parseInterpolatedString(raw);
      }
      if (this.check("LBRACE" /* LBRACE */)) {
        return this.parseLambda();
      }
      if (this.check("PAIR" /* PAIR */)) {
        this.advance();
        const first = this.parseComparison();
        if (this.check("AND" /* AND */)) {
          this.advance();
        } else {
          this.expect("COMMA" /* COMMA */);
        }
        const second = this.parseComparison();
        return { type: "PairLiteral", first, second };
      }
      if (this.check("UNIQUE" /* UNIQUE */)) {
        this.advance();
        if (this.check("LIST" /* LIST */)) this.advance();
        const items = this.parseListItems();
        return { type: "SetLiteral", items };
      }
      if (this.check("CURRY" /* CURRY */)) {
        this.advance();
        const command = this.expectIdentifierName();
        const args = [];
        if (this.check("WITH" /* WITH */)) this.advance();
        while (!this.isAtEnd() && !this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.check("RPAREN" /* RPAREN */) && !this.check("RBRACE" /* RBRACE */)) {
          args.push(this.parseAddition());
          if (this.check("COMMA" /* COMMA */)) this.advance();
          else break;
        }
        return { type: "CurryExpression", command, args };
      }
      if (this.check("COMPOSE" /* COMPOSE */)) {
        this.advance();
        const functions = [];
        functions.push(this.parsePrimary());
        while (this.check("COMMA" /* COMMA */)) {
          this.advance();
          functions.push(this.parsePrimary());
        }
        return { type: "ComposeExpression", functions };
      }
      if (this.check("ENV" /* ENV */)) {
        this.advance();
        const key = this.parsePrimary();
        return { type: "EnvExpression", key };
      }
      if (this.check("CURRENT" /* CURRENT */)) {
        this.advance();
        if (this.check("TIME" /* TIME */)) {
          this.advance();
          return { type: "DateTimeExpression", variant: "now" };
        }
        if (this.check("DATE" /* DATE */)) {
          this.advance();
          return { type: "DateTimeExpression", variant: "today" };
        }
        return { type: "DateTimeExpression", variant: "now" };
      }
      if (this.check("TODAY" /* TODAY */)) {
        this.advance();
        return { type: "DateTimeExpression", variant: "today" };
      }
      if (this.check("CSV" /* CSV */)) {
        const csvLine = this.current().line;
        this.advance();
        const source = this.parsePrimary();
        return { type: "CsvParseExpression", source, line: csvLine };
      }
      if (this.check("JSON_TYPE" /* JSON_TYPE */)) {
        const jsonLine = this.current().line;
        this.advance();
        const source = this.parsePrimary();
        return { type: "JsonParseExpression", source, line: jsonLine };
      }
      if (this.check("FILES" /* FILES */)) {
        const filesLine = this.current().line;
        this.advance();
        if (this.check("IN" /* IN */)) this.advance();
        const path = this.parsePrimary();
        return { type: "FilesExpression", path, line: filesLine };
      }
      if (this.check("SHELL" /* SHELL */) || this.check("EXECUTE" /* EXECUTE */)) {
        const shellLine = this.current().line;
        this.advance();
        const command = this.parsePrimary();
        return { type: "ShellExpression", command, line: shellLine };
      }
      if (this.check("AWAIT" /* AWAIT */)) {
        const awaitLine = this.current().line;
        this.advance();
        const value = this.parseExpression();
        return { type: "AwaitExpression", value, line: awaitLine };
      }
      if (this.check("ARGUMENTS" /* ARGUMENTS */)) {
        this.advance();
        return { type: "Identifier", name: "__arguments" };
      }
      if (this.check("READ" /* READ */)) {
        const readLine = this.current().line;
        this.advance();
        const path = this.parsePrimary();
        let asType;
        if (this.check("AS" /* AS */)) {
          this.advance();
          this.expect("LIST" /* LIST */);
          asType = "list";
        }
        return { type: "ReadExpression", path, asType, line: readLine };
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
    parseTypeName() {
      if (this.check("NUMBER_TYPE" /* NUMBER_TYPE */)) {
        this.advance();
        return "number";
      }
      if (this.check("TEXT" /* TEXT */)) {
        this.advance();
        return "text";
      }
      if (this.check("LIST" /* LIST */)) {
        this.advance();
        return "list";
      }
      if (this.check("MAP" /* MAP */)) {
        this.advance();
        return "map";
      }
      if (this.check("NOTHING" /* NOTHING */)) {
        this.advance();
        return "nothing";
      }
      if (this.check("BOOLEAN_TYPE" /* BOOLEAN_TYPE */)) {
        this.advance();
        return "boolean";
      }
      const name = this.expectIdentifierName();
      return name;
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
        "NEW" /* NEW */,
        "TEXT" /* TEXT */,
        "NUMBER_TYPE" /* NUMBER_TYPE */,
        "MAP" /* MAP */,
        "READ" /* READ */,
        "WRITE" /* WRITE */,
        "APPEND" /* APPEND */,
        "AS" /* AS */,
        "PICK" /* PICK */,
        "ROUNDED" /* ROUNDED */,
        "SET" /* SET */,
        "THINK" /* THINK */,
        "FETCH" /* FETCH */,
        "SERVE" /* SERVE */,
        "RESPOND" /* RESPOND */,
        "REMEMBER" /* REMEMBER */,
        "RECALL" /* RECALL */,
        "FORGET" /* FORGET */,
        "GRAB" /* GRAB */,
        "SHARE" /* SHARE */,
        "TOGETHER" /* TOGETHER */,
        "DO" /* DO */,
        "LISTEN" /* LISTEN */,
        "ALOUD" /* ALOUD */,
        "NOTE" /* NOTE */,
        "SOUND" /* SOUND */,
        "BOOLEAN_TYPE" /* BOOLEAN_TYPE */,
        "CANVAS" /* CANVAS */,
        "COLOR" /* COLOR */,
        "SIZE" /* SIZE */,
        "LINE" /* LINE */,
        "CIRCLE" /* CIRCLE */,
        "RECTANGLE" /* RECTANGLE */,
        "FILL" /* FILL */,
        "STROKE" /* STROKE */,
        "WIDTH" /* WIDTH */,
        "HEIGHT" /* HEIGHT */,
        "DEBUG" /* DEBUG */,
        "STEP" /* STEP */,
        "BREAKPOINT" /* BREAKPOINT */,
        "CLASSROOM" /* CLASSROOM */,
        "SUBMIT" /* SUBMIT */,
        "COLLECT" /* COLLECT */,
        "ROUTE" /* ROUTE */,
        "REQUEST" /* REQUEST */,
        "STATUS" /* STATUS */,
        // New feature keywords usable as identifiers
        "PAIR" /* PAIR */,
        "ENUM" /* ENUM */,
        "EXISTS" /* EXISTS */,
        "UNIQUE" /* UNIQUE */,
        "MATCHES" /* MATCHES */,
        "FORMAT" /* FORMAT */,
        "PLACES" /* PLACES */,
        "TEMPLATE" /* TEMPLATE */,
        "BY" /* BY */,
        "AWAIT" /* AWAIT */,
        "CONTRACT" /* CONTRACT */,
        "IMPLEMENTS" /* IMPLEMENTS */,
        "SECRET" /* SECRET */,
        "STATIC" /* STATIC */,
        "USES" /* USES */,
        "GETTER" /* GETTER */,
        "OVERLOAD" /* OVERLOAD */,
        "APPLY" /* APPLY */,
        "CURRY" /* CURRY */,
        "COMPOSE" /* COMPOSE */,
        "CSV" /* CSV */,
        "JSON_TYPE" /* JSON_TYPE */,
        "ENV" /* ENV */,
        "ARGUMENTS" /* ARGUMENTS */,
        "CURRENT" /* CURRENT */,
        "TIME" /* TIME */,
        "TODAY" /* TODAY */,
        "DATE" /* DATE */,
        "FILES" /* FILES */,
        "FOLDER" /* FOLDER */,
        "EXECUTE" /* EXECUTE */,
        "SHELL" /* SHELL */,
        "ANIMATE" /* ANIMATE */,
        "MOVING" /* MOVING */,
        "OVER" /* OVER */,
        "SPRITE" /* SPRITE */,
        "LOAD" /* LOAD */,
        "TOUCHES" /* TOUCHES */,
        "SCENE" /* SCENE */,
        "SWITCH" /* SWITCH */,
        "FORWARD" /* FORWARD */,
        "BACKWARD" /* BACKWARD */,
        "TURN" /* TURN */,
        "LEFT" /* LEFT */,
        "RIGHT" /* RIGHT */,
        "PEN" /* PEN */,
        "UP" /* UP */,
        "DOWN" /* DOWN */,
        "LAYER" /* LAYER */,
        "CONNECT" /* CONNECT */,
        "SOCKET" /* SOCKET */,
        "EMIT" /* EMIT */,
        "COOKIE" /* COOKIE */,
        "SESSION" /* SESSION */,
        "ALLOW" /* ALLOW */,
        "STREAM" /* STREAM */,
        "CLIENT" /* CLIENT */,
        "MOCK" /* MOCK */,
        "BEFORE" /* BEFORE */,
        "AFTER" /* AFTER */,
        "SNAPSHOT" /* SNAPSHOT */,
        "BENCHMARK" /* BENCHMARK */,
        "PROPERTY" /* PROPERTY */,
        "ANY" /* ANY */,
        "WATCH" /* WATCH */,
        "PROFILE" /* PROFILE */,
        "LINT" /* LINT */,
        "SAVE" /* SAVE */,
        "HISTORY" /* HISTORY */,
        "VISUALIZE" /* VISUALIZE */,
        "CHALLENGE" /* CHALLENGE */,
        "GRADE" /* GRADE */,
        "RUBRIC" /* RUBRIC */
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
      return ["END" /* END */, "ELSE" /* ELSE */, "ELSE_IF" /* ELSE_IF */, "OR" /* OR */, "CATCH" /* CATCH */, "RBRACE" /* RBRACE */].includes(t);
    }
    parseInterpolatedString(raw) {
      const parts = [];
      let current = "";
      let i = 0;
      while (i < raw.length) {
        if (raw[i] === "{") {
          if (current) {
            parts.push(current);
            current = "";
          }
          i++;
          let expr = "";
          let depth = 1;
          while (i < raw.length && depth > 0) {
            if (raw[i] === "{") depth++;
            if (raw[i] === "}") depth--;
            if (depth > 0) expr += raw[i];
            i++;
          }
          if (expr) {
            const lexer = new Lexer(expr);
            const tokens = lexer.tokenize();
            const parser = new _Parser();
            const program = parser.parse(tokens);
            if (program.body.length > 0) {
              const node = program.body[0];
              if (node.type === "ExpressionStatement") {
                parts.push(node.expression);
              } else if (node.type === "ShowStatement") {
                parts.push({ type: "Identifier", name: expr.trim() });
              } else {
                parts.push({ type: "Identifier", name: expr.trim() });
              }
            } else {
              parts.push({ type: "Identifier", name: expr.trim() });
            }
          }
        } else {
          current += raw[i];
          i++;
        }
      }
      if (current) parts.push(current);
      return { type: "InterpolatedStringExpression", parts };
    }
    parseLambda() {
      const line = this.current().line;
      this.advance();
      const params = [];
      const savedPos = this.pos;
      let hasArrow = false;
      while (!this.check("ARROW" /* ARROW */) && !this.check("RBRACE" /* RBRACE */) && !this.isAtEnd()) {
        if (this.check("IDENTIFIER" /* IDENTIFIER */)) {
          params.push(this.current().value);
          this.advance();
          if (this.check("COMMA" /* COMMA */)) this.advance();
        } else {
          break;
        }
      }
      if (this.check("ARROW" /* ARROW */)) {
        this.advance();
        hasArrow = true;
      } else {
        this.pos = savedPos;
        params.length = 0;
      }
      this.skipNewlines();
      if (hasArrow || params.length === 0) {
        const bodyStart = this.pos;
        try {
          const expr = this.parseExpression();
          if (this.check("RBRACE" /* RBRACE */)) {
            this.advance();
            return { type: "LambdaExpression", params, body: expr, line };
          }
        } catch {
        }
        this.pos = bodyStart;
      }
      const body = this.parseBlock(["RBRACE"]);
      if (this.check("RBRACE" /* RBRACE */)) this.advance();
      return { type: "LambdaExpression", params, body, line };
    }
    checkAhead(type, offset) {
      const idx = this.pos + offset;
      if (idx >= this.tokens.length) return false;
      return this.tokens[idx].type === type;
    }
    // --- New feature parsers ---
    parseContract() {
      const line = this.current().line;
      this.advance();
      const name = this.expectIdentifierName();
      this.skipNewlines();
      const methods = [];
      while (!this.check("END" /* END */) && !this.isAtEnd()) {
        this.skipNewlines();
        if (this.check("END" /* END */)) break;
        if (this.check("ON" /* ON */)) {
          this.advance();
          methods.push(this.expectIdentifierName());
          while (!this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd()) {
            this.advance();
          }
        } else {
          this.advance();
        }
      }
      this.expect("END" /* END */);
      return { type: "ContractDeclaration", name, methods, line };
    }
    parseEnum() {
      const line = this.current().line;
      this.advance();
      const name = this.expectIdentifierName();
      const values = [];
      if (this.check("IS" /* IS */)) this.advance();
      values.push(this.expectIdentifierName());
      while (this.check("COMMA" /* COMMA */)) {
        this.advance();
        values.push(this.expectIdentifierName());
      }
      return { type: "EnumDeclaration", name, values, line };
    }
    parseMock() {
      const line = this.current().line;
      this.advance();
      const target = this.expectIdentifierName();
      if (this.check("TO" /* TO */)) this.advance();
      if (this.check("RETURN" /* RETURN */)) this.advance();
      if (this.check("IDENTIFIER" /* IDENTIFIER */) && this.current().value.toLowerCase() === "returns") this.advance();
      const returnValue = this.parseExpression();
      return { type: "MockStatement", target, returnValue, line };
    }
    parseBefore() {
      const line = this.current().line;
      this.advance();
      if (this.check("EACH" /* EACH */)) this.advance();
      this.skipNewlines();
      const body = this.parseBlock(["END"]);
      this.expect("END" /* END */);
      return { type: "BeforeBlock", body, line };
    }
    parseAfter() {
      const line = this.current().line;
      this.advance();
      if (this.check("EACH" /* EACH */)) this.advance();
      this.skipNewlines();
      const body = this.parseBlock(["END"]);
      this.expect("END" /* END */);
      return { type: "AfterBlock", body, line };
    }
    parseBenchmark() {
      const line = this.current().line;
      this.advance();
      let name = "benchmark";
      if (this.check("STRING" /* STRING */)) {
        name = this.current().value;
        this.advance();
      } else if (this.check("IDENTIFIER" /* IDENTIFIER */)) {
        name = this.current().value;
        this.advance();
      }
      this.skipNewlines();
      const body = this.parseBlock(["END"]);
      this.expect("END" /* END */);
      return { type: "BenchmarkBlock", name, body, line };
    }
    parseAnimate() {
      const line = this.current().line;
      this.advance();
      const target = this.expectIdentifierName();
      let property = "position";
      if (this.check("DOT_IDENTIFIER" /* DOT_IDENTIFIER */)) {
        property = this.current().value.slice(1);
        this.advance();
      } else if (this.check("DOT" /* DOT */)) {
        this.advance();
        property = this.expectIdentifierName();
      } else if (this.check("IDENTIFIER" /* IDENTIFIER */)) {
        property = this.expectIdentifierName();
      }
      let from = { type: "NumberLiteral", value: 0 };
      let to = { type: "NumberLiteral", value: 100 };
      let duration = { type: "NumberLiteral", value: 1 };
      if (this.check("FROM" /* FROM */)) {
        this.advance();
        from = this.parseExpression();
      }
      if (this.check("TO" /* TO */)) {
        this.advance();
        to = this.parseExpression();
      }
      if (this.check("OVER" /* OVER */)) {
        this.advance();
        duration = this.parseExpression();
        if (this.check("SECONDS" /* SECONDS */) || this.check("SECOND" /* SECOND */)) this.advance();
      }
      return { type: "AnimateStatement", target, property, from, to, duration, line };
    }
    parseTurtle(action) {
      const line = this.current().line;
      this.advance();
      let value;
      if (!this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd()) {
        value = this.parseExpression();
      }
      return { type: "TurtleStatement", action, value, line };
    }
    parseTurnStatement() {
      const line = this.current().line;
      this.advance();
      let action = "right";
      if (this.check("LEFT" /* LEFT */)) {
        action = "left";
        this.advance();
      } else if (this.check("RIGHT" /* RIGHT */)) {
        action = "right";
        this.advance();
      }
      let value;
      if (!this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd()) {
        value = this.parseExpression();
      }
      return { type: "TurtleStatement", action, value, line };
    }
    parsePen() {
      const line = this.current().line;
      this.advance();
      let action = "pendown";
      if (this.check("UP" /* UP */)) {
        action = "penup";
        this.advance();
      } else if (this.check("DOWN" /* DOWN */)) {
        action = "pendown";
        this.advance();
      }
      return { type: "TurtleStatement", action, line };
    }
    parseSwitchScene() {
      const line = this.current().line;
      this.advance();
      if (this.check("TO" /* TO */)) this.advance();
      if (this.check("SCENE" /* SCENE */)) this.advance();
      const scene = this.parseExpression();
      return { type: "SwitchSceneStatement", scene, line };
    }
    parseConnect() {
      const line = this.current().line;
      this.advance();
      if (this.check("TO" /* TO */)) this.advance();
      const url = this.parseExpression();
      let alias = "socket";
      if (this.check("AS" /* AS */)) {
        this.advance();
        alias = this.expectIdentifierName();
      }
      return { type: "ConnectStatement", url, alias, line };
    }
    parseEmit() {
      const line = this.current().line;
      this.advance();
      const event = this.parseExpression();
      let data;
      let target;
      if (this.check("WITH" /* WITH */)) {
        this.advance();
        data = this.parseExpression();
      }
      if (this.check("TO" /* TO */)) {
        this.advance();
        target = this.expectIdentifierName();
      }
      return { type: "EmitStatement", event, data, target, line };
    }
    parseCookie() {
      const line = this.current().line;
      this.advance();
      let action = "set";
      if (this.check("SET" /* SET */)) {
        action = "set";
        this.advance();
      } else if (this.check("IDENTIFIER" /* IDENTIFIER */) && this.current().value === "get") {
        action = "get";
        this.advance();
      } else if (this.check("IDENTIFIER" /* IDENTIFIER */) && this.current().value === "delete") {
        action = "delete";
        this.advance();
      }
      const name = this.parseExpression();
      let value;
      if (action === "set" && (this.check("TO" /* TO */) || this.check("AS" /* AS */))) {
        this.advance();
        value = this.parseExpression();
      }
      return { type: "CookieStatement", action, name, value, line };
    }
    parseAllow() {
      const line = this.current().line;
      this.advance();
      while (!this.check("STRING" /* STRING */) && !this.check("NEWLINE" /* NEWLINE */) && !this.check("EOF" /* EOF */) && !this.isAtEnd()) {
        this.advance();
      }
      const origin = this.parseExpression();
      return { type: "AllowStatement", origin, line };
    }
    parseStream() {
      const line = this.current().line;
      this.advance();
      const data = this.parseExpression();
      let interval;
      if (this.check("EVERY" /* EVERY */)) {
        this.advance();
        interval = this.parseExpression();
        if (this.check("SECONDS" /* SECONDS */) || this.check("SECOND" /* SECOND */)) this.advance();
      }
      return { type: "StreamStatement", data, interval, line };
    }
    parseTemplate() {
      const line = this.current().line;
      this.advance();
      const name = this.expectIdentifierName();
      const params = [];
      if (this.check("FOR" /* FOR */)) {
        this.advance();
        params.push(this.expectIdentifierName());
        while (this.check("COMMA" /* COMMA */)) {
          this.advance();
          params.push(this.expectIdentifierName());
        }
      }
      this.skipNewlines();
      const body = this.parseBlock(["END"]);
      this.expect("END" /* END */);
      return { type: "TemplateDeclaration", name, params, body, line };
    }
    parseFormat() {
      const line = this.current().line;
      this.advance();
      const value = this.parseExpression();
      let places = { type: "NumberLiteral", value: 2 };
      if (this.check("TO" /* TO */)) {
        this.advance();
        places = this.parseExpression();
        if (this.check("PLACES" /* PLACES */)) this.advance();
      }
      return { type: "FormatStatement", value, places, line };
    }
    parseApply() {
      const line = this.current().line;
      this.advance();
      const func = this.parseExpression();
      let target = { type: "NothingLiteral" };
      if (this.check("TO" /* TO */)) {
        this.advance();
        if (this.check("EACH" /* EACH */)) this.advance();
        target = this.parseExpression();
      }
      return {
        type: "ExpressionStatement",
        expression: { type: "CallExpression", name: "__apply", args: [func, target] },
        line
      };
    }
    parseDestructure(line) {
      const variables = [];
      variables.push(this.expectIdentifierName());
      while (this.check("COMMA" /* COMMA */)) {
        this.advance();
        variables.push(this.expectIdentifierName());
      }
      this.expect("FROM" /* FROM */);
      const source = this.parseExpression();
      return { type: "DestructureStatement", variables, source, line };
    }
    looksLikeMethodArg() {
      const t = this.current().type;
      return t === "NUMBER" /* NUMBER */ || t === "IDENTIFIER" /* IDENTIFIER */ || t === "TRUE" /* TRUE */ || t === "FALSE" /* FALSE */ || t === "NOTHING" /* NOTHING */ || t === "LPAREN" /* LPAREN */ || t === "DOT_IDENTIFIER" /* DOT_IDENTIFIER */ || t === "STRING" /* STRING */ || t === "MINUS" /* MINUS */;
    }
  };

  // src/graphics.ts
  function createCanvas(width = 400, height = 400) {
    return {
      width,
      height,
      color: "#000000",
      fillColor: "#000000",
      strokeColor: "#000000",
      strokeWidth: 1,
      commands: []
    };
  }
  function addDrawCommand(canvas, shape, params) {
    canvas.commands.push({ shape, params: { ...params, fill: canvas.fillColor, stroke: canvas.strokeColor, strokeWidth: canvas.strokeWidth } });
  }
  function clearCanvas(canvas) {
    canvas.commands = [];
  }
  function canvasToSVG(canvas) {
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}">
`;
    svg += `  <rect width="100%" height="100%" fill="white"/>
`;
    for (const cmd of canvas.commands) {
      svg += renderCommand(cmd);
    }
    svg += `</svg>`;
    return svg;
  }
  function canvasToText(canvas) {
    const lines = [`Canvas ${canvas.width}x${canvas.height}:`];
    for (const cmd of canvas.commands) {
      lines.push(describeCommand(cmd));
    }
    return lines.join("\n");
  }
  function renderCommand(cmd) {
    const p = cmd.params;
    switch (cmd.shape) {
      case "circle":
        return `  <circle cx="${p.x ?? 0}" cy="${p.y ?? 0}" r="${p.size ?? p.radius ?? 50}" fill="${p.fill}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}"/>
`;
      case "rectangle":
      case "rect":
        return `  <rect x="${p.x ?? 0}" y="${p.y ?? 0}" width="${p.width ?? 100}" height="${p.height ?? 100}" fill="${p.fill}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}"/>
`;
      case "line":
        return `  <line x1="${p.x1 ?? 0}" y1="${p.y1 ?? 0}" x2="${p.x2 ?? 100}" y2="${p.y2 ?? 100}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}"/>
`;
      case "text":
        return `  <text x="${p.x ?? 0}" y="${p.y ?? 20}" fill="${p.fill}" font-size="${p.size ?? 16}">${p.text ?? ""}</text>
`;
      case "ellipse":
        return `  <ellipse cx="${p.x ?? 0}" cy="${p.y ?? 0}" rx="${p.rx ?? p.width ?? 50}" ry="${p.ry ?? p.height ?? 30}" fill="${p.fill}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}"/>
`;
      case "triangle": {
        const x = p.x ?? 0, y = p.y ?? 0, s = p.size ?? 50;
        return `  <polygon points="${x},${y - s} ${x - s},${y + s} ${x + s},${y + s}" fill="${p.fill}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}"/>
`;
      }
      case "star": {
        const cx = p.x ?? 0, cy = p.y ?? 0, r = p.size ?? 50;
        const points = [];
        for (let i = 0; i < 10; i++) {
          const angle = Math.PI / 5 * i - Math.PI / 2;
          const rad = i % 2 === 0 ? r : r * 0.4;
          points.push(`${cx + rad * Math.cos(angle)},${cy + rad * Math.sin(angle)}`);
        }
        return `  <polygon points="${points.join(" ")}" fill="${p.fill}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}"/>
`;
      }
      default:
        return `  <!-- Unknown shape: ${cmd.shape} -->
`;
    }
  }
  function describeCommand(cmd) {
    const p = cmd.params;
    switch (cmd.shape) {
      case "circle":
        return `  Circle at (${p.x ?? 0}, ${p.y ?? 0}) size ${p.size ?? p.radius ?? 50}, color ${p.fill}`;
      case "rectangle":
      case "rect":
        return `  Rectangle at (${p.x ?? 0}, ${p.y ?? 0}) ${p.width ?? 100}x${p.height ?? 100}, color ${p.fill}`;
      case "line":
        return `  Line from (${p.x1 ?? 0}, ${p.y1 ?? 0}) to (${p.x2 ?? 100}, ${p.y2 ?? 100}), color ${p.stroke}`;
      case "text":
        return `  Text "${p.text ?? ""}" at (${p.x ?? 0}, ${p.y ?? 20}), color ${p.fill}`;
      default:
        return `  ${cmd.shape} with params ${JSON.stringify(p)}`;
    }
  }

  // src/storage.ts
  init_node_shim();
  init_node_shim();
  var STORE_FILE = ".hypercode-store.json";
  var Storage = class {
    constructor(basePath = process.cwd()) {
      __publicField(this, "data");
      __publicField(this, "storePath");
      this.storePath = (void 0)(basePath, STORE_FILE);
      this.data = this.load();
    }
    load() {
      try {
        if ((void 0)(this.storePath)) {
          return JSON.parse((void 0)(this.storePath, "utf-8"));
        }
      } catch {
      }
      return {};
    }
    save() {
      (void 0)(this.storePath, JSON.stringify(this.data, null, 2), "utf-8");
    }
    remember(key, value) {
      this.data[key] = value;
      this.save();
    }
    recall(key) {
      return this.data[key] ?? null;
    }
    forget(key) {
      delete this.data[key];
      this.save();
    }
    clear() {
      this.data = {};
      this.save();
    }
    keys() {
      return Object.keys(this.data);
    }
  };

  // src/ai.ts
  var AIEngine = class {
    constructor(options = {}) {
      __publicField(this, "apiKey");
      __publicField(this, "model");
      __publicField(this, "maxTokens");
      __publicField(this, "available");
      this.apiKey = options.apiKey || typeof process !== "undefined" && process.env?.ANTHROPIC_API_KEY || "";
      this.model = options.model || "claude-sonnet-4-20250514";
      this.maxTokens = options.maxTokens || 1024;
      this.available = this.apiKey.length > 0;
    }
    isAvailable() {
      return this.available;
    }
    async think(prompt) {
      if (!this.available) {
        return `[AI not available \u2014 set ANTHROPIC_API_KEY environment variable]
Prompt was: ${prompt}`;
      }
      try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": this.apiKey,
            "anthropic-version": "2023-06-01"
          },
          body: JSON.stringify({
            model: this.model,
            max_tokens: this.maxTokens,
            messages: [{ role: "user", content: prompt }]
          })
        });
        if (!response.ok) {
          const error = await response.text();
          return `[AI error: ${response.status}] ${error}`;
        }
        const data = await response.json();
        if (data.content && data.content.length > 0) {
          return data.content[0].text;
        }
        return "[No response from AI]";
      } catch (e) {
        return `[AI error: ${e instanceof Error ? e.message : String(e)}]`;
      }
    }
    async tutor(code, error) {
      const prompt = error ? `You are a friendly coding tutor helping a student learn HyperCode (a simple English-like programming language). The student's code has an error. Explain the error in simple terms and suggest how to fix it.

Student's code:
\`\`\`
${code}
\`\`\`

Error: ${error}

Give a brief, encouraging explanation.` : `You are a friendly coding tutor. Review this HyperCode program and give brief, constructive feedback:

\`\`\`
${code}
\`\`\`

Give 2-3 short tips for improvement.`;
      return this.think(prompt);
    }
    async createProgram(description) {
      const prompt = `You are a HyperCode code generator. HyperCode is an English-like programming language. Generate a complete HyperCode program based on this description:

"${description}"

HyperCode syntax rules:
- Variables: "put VALUE into NAME" for text, "set NAME to EXPRESSION" for math
- Output: "show TEXT" with ".var" for interpolation and "(expr)" for math
- Input: "put ask QUESTION into NAME"
- If/else: "if CONDITION ... else ... end"
- Loops: "repeat N times ... end", "for each X in LIST ... end"
- Lists: "put list 1, 2, 3 into nums"
- Functions: "command NAME params ... end" with "return VALUE"
- Classes: "kind NAME ... end" with "on METHOD ... end"
- Objects: "make a KIND called NAME with prop VALUE"
- Methods: "send METHOD to OBJECT"
- Comments: "-- comment"

Output ONLY the HyperCode code, no explanation.`;
      return this.think(prompt);
    }
  };

  // src/server.ts
  init_node_shim();
  var SayServer = class {
    constructor(output = console.log) {
      __publicField(this, "server", null);
      __publicField(this, "routes", []);
      __publicField(this, "defaultHandler", null);
      __publicField(this, "output");
      this.output = output;
    }
    addRoute(method, path, handler) {
      this.routes.push({ method: method.toUpperCase(), path, handler });
    }
    setDefaultHandler(handler) {
      this.defaultHandler = handler;
    }
    async start(port) {
      return new Promise((resolve) => {
        this.server = (void 0)(async (req, res) => {
          const url = new URL(req.url || "/", `http://localhost:${port}`);
          const query = {};
          url.searchParams.forEach((v, k) => {
            query[k] = v;
          });
          let body = "";
          for await (const chunk of req) {
            body += chunk;
          }
          const reqInfo = {
            method: (req.method || "GET").toUpperCase(),
            path: url.pathname,
            query,
            body,
            headers: req.headers
          };
          const route = this.routes.find(
            (r) => r.method === reqInfo.method && r.path === reqInfo.path
          );
          try {
            let response;
            if (route) {
              response = await route.handler(reqInfo);
            } else if (this.defaultHandler) {
              response = await this.defaultHandler(reqInfo);
            } else {
              response = { body: "Not Found", status: 404, headers: {} };
            }
            res.writeHead(response.status, {
              "Content-Type": "text/html; charset=utf-8",
              ...response.headers
            });
            res.end(response.body);
          } catch (e) {
            res.writeHead(500);
            res.end("Server Error");
          }
        });
        this.server.listen(port, () => {
          this.output(`Server running on http://localhost:${port}`);
          resolve();
        });
      });
    }
    stop() {
      if (this.server) {
        this.server.close();
        this.server = null;
      }
    }
  };

  // src/interpreter.ts
  var ReturnSignal = class {
    constructor(value) {
      this.value = value;
    }
  };
  var StopSignal = class {
    constructor(label) {
      this.label = label;
    }
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
  var SayMap = class {
    constructor() {
      __publicField(this, "entries");
      this.entries = /* @__PURE__ */ new Map();
    }
    get(key) {
      return this.entries.get(key) ?? null;
    }
    set(key, value) {
      this.entries.set(key, value);
    }
    has(key) {
      return this.entries.has(key);
    }
    remove(key) {
      return this.entries.delete(key);
    }
    get count() {
      return this.entries.size;
    }
    get keys() {
      return new SayList(Array.from(this.entries.keys()));
    }
    get values() {
      return new SayList(Array.from(this.entries.values()));
    }
    toString() {
      const parts = [];
      for (const [k, v] of this.entries) {
        parts.push(`${k}: ${toString(v)}`);
      }
      return `{${parts.join(", ")}}`;
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
  var SaySet = class {
    constructor(items = []) {
      __publicField(this, "items");
      // stored as stringified for comparison
      __publicField(this, "rawItems");
      this.items = /* @__PURE__ */ new Set();
      this.rawItems = [];
      for (const item of items) {
        const key = toString(item);
        if (!this.items.has(key)) {
          this.items.add(key);
          this.rawItems.push(item);
        }
      }
    }
    add(value) {
      const key = toString(value);
      if (!this.items.has(key)) {
        this.items.add(key);
        this.rawItems.push(value);
      }
    }
    has(value) {
      return this.items.has(toString(value));
    }
    remove(value) {
      const key = toString(value);
      if (this.items.has(key)) {
        this.items.delete(key);
        this.rawItems = this.rawItems.filter((v) => toString(v) !== key);
      }
    }
    get count() {
      return this.rawItems.length;
    }
    toList() {
      return new SayList([...this.rawItems]);
    }
    toString() {
      return `{${this.rawItems.map(toString).join(", ")}}`;
    }
  };
  var SayPair = class {
    constructor(first, second) {
      __publicField(this, "first");
      __publicField(this, "second");
      this.first = first;
      this.second = second;
    }
    toString() {
      return `(${toString(this.first)}, ${toString(this.second)})`;
    }
  };
  var SayEnum = class {
    constructor(name, values) {
      __publicField(this, "name");
      __publicField(this, "values");
      this.name = name;
      this.values = values;
    }
    has(value) {
      return this.values.includes(value.toLowerCase());
    }
    toString() {
      return `[Enum ${this.name}: ${this.values.join(", ")}]`;
    }
  };
  var SayLambda = class {
    constructor(params, body, closure) {
      __publicField(this, "params");
      __publicField(this, "body");
      __publicField(this, "closure");
      this.params = params;
      this.body = body;
      this.closure = closure;
    }
    toString() {
      return `[Lambda (${this.params.join(", ")})]`;
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
      __publicField(this, "readFile");
      __publicField(this, "writeFile");
      __publicField(this, "appendFile");
      __publicField(this, "aiEngine");
      __publicField(this, "storage", null);
      __publicField(this, "storagePath");
      __publicField(this, "httpFetch");
      __publicField(this, "strict");
      __publicField(this, "canvases", /* @__PURE__ */ new Map());
      __publicField(this, "server", null);
      __publicField(this, "eventListeners", /* @__PURE__ */ new Map());
      __publicField(this, "timers", []);
      __publicField(this, "contracts", /* @__PURE__ */ new Map());
      __publicField(this, "enums", /* @__PURE__ */ new Map());
      __publicField(this, "mocks", /* @__PURE__ */ new Map());
      __publicField(this, "beforeBlocks", []);
      __publicField(this, "afterBlocks", []);
      __publicField(this, "turtleState", { x: 200, y: 200, angle: 0, penDown: true, color: "#000000" });
      __publicField(this, "scenes", /* @__PURE__ */ new Map());
      __publicField(this, "currentScene", "main");
      __publicField(this, "snapshots", /* @__PURE__ */ new Map());
      __publicField(this, "templates", /* @__PURE__ */ new Map());
      this.globalEnv = new Environment();
      this.env = this.globalEnv;
      this.output = options.output || ((text) => console.log(text));
      this.input = options.input || (() => "");
      this.maxIterations = options.maxIterations || 1e5;
      this.readFile = options.readFile || (() => {
        throw new Error("File reading not available");
      });
      this.writeFile = options.writeFile || (() => {
        throw new Error("File writing not available");
      });
      this.appendFile = options.appendFile || (() => {
        throw new Error("File appending not available");
      });
      this.aiEngine = new AIEngine(options.aiOptions);
      this.storagePath = options.storagePath;
      this.httpFetch = options.httpFetch || (typeof globalThis.fetch === "function" ? globalThis.fetch.bind(globalThis) : async () => {
        throw new Error("HTTP fetch not available");
      });
      this.strict = options.strict || false;
      this.registerBuiltins();
    }
    registerBuiltins() {
      const mathModule = new SayInstance(new SayKind("Module"));
      mathModule.set("pi", Math.PI);
      mathModule.set("e", Math.E);
      mathModule.set("infinity", Infinity);
      this.globalEnv.define("math", mathModule);
      this.canvases.set("canvas", createCanvas());
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
        case "SetStatement":
          return this.executeSet(node);
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
        case "ReturnStatement": {
          if (node.condition) {
            const cond = await this.evaluate(node.condition);
            if (isTruthy(cond)) {
              throw new ReturnSignal(await this.evaluate(node.value));
            }
            return null;
          }
          throw new ReturnSignal(await this.evaluate(node.value));
        }
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
          throw new StopSignal(node.label);
        case "WaitStatement":
          return this.executeWait(node);
        case "DrawStatement":
          return this.executeDraw(node);
        case "ClearStatement":
          return this.executeClear(node);
        case "GoStatement":
          return null;
        case "OpenStatement":
          return null;
        case "HideStatement":
          return null;
        case "PlayStatement":
          return this.executePlay(node);
        case "ExpressionStatement":
          return this.evaluate(node.expression);
        case "ListLiteralMultiline":
          return this.executeListMultiline(node);
        case "WhenStatement":
          return this.executeWhen(node);
        case "WriteStatement":
          return this.executeWrite(node);
        case "RememberStatement":
          return this.executeRemember(node);
        case "ForgetStatement":
          return this.executeForget(node);
        case "ServeStatement":
          return this.executeServe(node);
        case "RespondStatement":
          return this.executeRespond(node);
        case "RouteStatement":
          return this.executeRoute(node);
        case "GrabStatement":
          return this.executeGrab(node);
        case "ShareStatement":
          return this.executeShare(node);
        case "DoTogetherStatement":
          return this.executeDoTogether(node);
        case "ListenStatement":
          return this.executeListen(node);
        case "EveryStatement":
          return this.executeEvery(node);
        case "ContractDeclaration":
          return this.executeContract(node);
        case "EnumDeclaration":
          return this.executeEnum(node);
        case "DestructureStatement":
          return this.executeDestructure(node);
        case "MockStatement":
          return this.executeMock(node);
        case "BeforeBlock":
          this.beforeBlocks.push(node.body);
          return null;
        case "AfterBlock":
          this.afterBlocks.push(node.body);
          return null;
        case "SnapshotCheck":
          return this.executeSnapshot(node);
        case "BenchmarkBlock":
          return this.executeBenchmark(node);
        case "AnimateStatement":
          return this.executeAnimate(node);
        case "TurtleStatement":
          return this.executeTurtle(node);
        case "SwitchSceneStatement":
          return this.executeSwitchScene(node);
        case "ConnectStatement":
          return this.executeConnect(node);
        case "EmitStatement":
          return this.executeEmitStmt(node);
        case "CookieStatement":
          return this.executeCookieStmt(node);
        case "AllowStatement":
          return this.executeAllow(node);
        case "StreamStatement":
          return this.executeStreamStmt(node);
        case "TemplateDeclaration":
          return this.executeTemplateDecl(node);
        case "FormatStatement":
          return this.executeFormatStmt(node);
        default:
          return null;
      }
    }
    async executePut(node) {
      const value = await this.evaluate(node.value);
      await this.assignTarget(node.target, value);
      return value;
    }
    async executeSet(node) {
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
      const prompt = node.prompt.replace(/\.([a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*)/g, (_match, path) => {
        const parts = path.split(".");
        let val = this.env.get(parts[0]) ?? null;
        for (let i = 1; i < parts.length; i++) {
          if (val instanceof SayInstance) {
            val = val.get(parts[i]);
          } else {
            return _match;
          }
        }
        return toString(val);
      });
      const answer = await this.input(prompt);
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
      const shouldStop = (e) => {
        if (e instanceof StopSignal) {
          if (!e.label || e.label === node.label) return true;
          throw e;
        }
        throw e;
      };
      switch (node.variant) {
        case "times": {
          const count = toNumber(await this.evaluate(node.count));
          const childEnv = node.counterVariable ? new Environment(this.env) : null;
          const prevEnv = this.env;
          if (childEnv) this.env = childEnv;
          try {
            for (let i = 0; i < count; i++) {
              if (++iterations > this.maxIterations) throw new Error("Maximum iterations exceeded");
              if (node.counterVariable && childEnv) {
                childEnv.define(node.counterVariable, i + 1);
              }
              try {
                await this.executeBlock(node.body);
              } catch (e) {
                if (shouldStop(e)) break;
              }
            }
          } finally {
            if (childEnv) this.env = prevEnv;
          }
          break;
        }
        case "while": {
          while (isTruthy(await this.evaluate(node.condition))) {
            if (++iterations > this.maxIterations) throw new Error("Maximum iterations exceeded");
            try {
              await this.executeBlock(node.body);
            } catch (e) {
              if (shouldStop(e)) break;
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
              if (shouldStop(e)) break;
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
              if (shouldStop(e)) break;
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
      } else if (iterable instanceof SaySet) {
        items = iterable.rawItems;
      } else if (Array.isArray(iterable)) {
        items = iterable;
      } else {
        items = [iterable];
      }
      if (node.step) {
        const stepVal = toNumber(await this.evaluate(node.step));
        if (stepVal > 1) {
          const stepped = [];
          for (let i = 0; i < items.length; i += stepVal) {
            stepped.push(items[i]);
          }
          items = stepped;
        }
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
      } else if (target instanceof SaySet) {
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
      } else if (target instanceof SaySet) {
        target.remove(value);
      } else if (target instanceof SayMap) {
        target.remove(toString(value));
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
    async executeUse(node) {
      if (node.module === "math") return null;
      const tryImport = async (filePath) => {
        try {
          const source = await this.readFile(filePath);
          const lexer = new Lexer(source);
          const tokens = lexer.tokenize();
          const parser = new Parser();
          const program = parser.parse(tokens);
          for (const child of program.body) {
            await this.execute(child);
          }
          return true;
        } catch {
          return false;
        }
      };
      if (node.module.endsWith(".say") || node.module.endsWith(".hypercode")) {
        await tryImport(node.module);
        return null;
      }
      if (!await tryImport(node.module + ".say")) {
        await tryImport(node.module + ".hypercode");
      }
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
      } else if (target instanceof SayMap) {
        this.output(`Map (${target.toString()}) count: ${target.count}`);
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
    async executeWrite(node) {
      const filePath = toString(await this.evaluate(node.path));
      const value = toString(await this.evaluate(node.value));
      if (node.append) {
        await this.appendFile(filePath, value);
      } else {
        await this.writeFile(filePath, value);
      }
      return null;
    }
    // --- Graphics ---
    async executeDraw(node) {
      const canvasName = node.canvas || "canvas";
      if (!this.canvases.has(canvasName)) {
        this.canvases.set(canvasName, createCanvas());
      }
      const canvas = this.canvases.get(canvasName);
      const params = {};
      for (const [key, expr] of Object.entries(node.params)) {
        params[key] = await this.evaluate(expr);
      }
      if (params.at !== void 0) {
        const val = params.at;
        if (val instanceof SayList && val.items.length >= 2) {
          params.x = toNumber(val.items[0]);
          params.y = toNumber(val.items[1]);
        } else {
          params.x = toNumber(val);
        }
        delete params.at;
      }
      if (params.from !== void 0) {
        const val = params.from;
        if (val instanceof SayList && val.items.length >= 2) {
          params.x1 = toNumber(val.items[0]);
          params.y1 = toNumber(val.items[1]);
        }
        delete params.from;
      }
      if (params.to !== void 0) {
        const val = params.to;
        if (val instanceof SayList && val.items.length >= 2) {
          params.x2 = toNumber(val.items[0]);
          params.y2 = toNumber(val.items[1]);
        }
        delete params.to;
      }
      addDrawCommand(canvas, node.shape, params);
      this.output(canvasToText(canvas).split("\n").pop() || "");
      return null;
    }
    executeClear(node) {
      const canvasName = node.target || "canvas";
      if (this.canvases.has(canvasName)) {
        clearCanvas(this.canvases.get(canvasName));
      }
      return null;
    }
    executePlay(node) {
      this.output(`\u266A Playing sound: ${node.sound}`);
      return null;
    }
    // --- Storage ---
    getStorage() {
      if (!this.storage) {
        this.storage = new Storage(this.storagePath);
      }
      return this.storage;
    }
    async executeRemember(node) {
      const key = toString(await this.evaluate(node.key));
      const value = await this.evaluate(node.value);
      const storage = this.getStorage();
      storage.remember(key, this.sayValueToJson(value));
      return null;
    }
    async executeForget(node) {
      const key = toString(await this.evaluate(node.key));
      const storage = this.getStorage();
      storage.forget(key);
      return null;
    }
    // --- Web server ---
    async executeServe(node) {
      const port = toNumber(await this.evaluate(node.port));
      this.server = new SayServer(this.output);
      await this.server.start(port);
      return null;
    }
    async executeRespond(node) {
      const value = toString(await this.evaluate(node.value));
      const status = node.statusCode ? toNumber(await this.evaluate(node.statusCode)) : 200;
      this.env.set("__response_body", value);
      this.env.set("__response_status", status);
      return null;
    }
    async executeRoute(node) {
      if (!this.server) {
        throw new Error('No server running. Use "serve on port N" first.');
      }
      const routePath = toString(await this.evaluate(node.path));
      const body = node.body;
      const interpreter = this;
      this.server.addRoute(node.method, routePath, async (req) => {
        const routeEnv = new Environment(interpreter.env);
        routeEnv.define("path", req.path);
        routeEnv.define("method", req.method);
        routeEnv.define("body", req.body);
        routeEnv.define("__response_body", "OK");
        routeEnv.define("__response_status", 200);
        const queryMap = new SayMap();
        for (const [k, v] of Object.entries(req.query)) {
          queryMap.set(k, v);
        }
        routeEnv.define("query", queryMap);
        const prevEnv = interpreter.env;
        interpreter.env = routeEnv;
        try {
          await interpreter.executeBlock(body);
        } catch (e) {
        } finally {
          interpreter.env = prevEnv;
        }
        return {
          body: toString(routeEnv.get("__response_body")),
          status: toNumber(routeEnv.get("__response_status")),
          headers: {}
        };
      });
      return null;
    }
    // --- Packages ---
    async executeGrab(node) {
      const tryPaths = [
        `packages/${node.module}/index.say`,
        `packages/${node.module}.say`,
        `node_modules/${node.module}/index.say`
      ];
      for (const tryPath of tryPaths) {
        try {
          const source = await this.readFile(tryPath);
          const lexer = new Lexer(source);
          const tokens = lexer.tokenize();
          const parser = new Parser();
          const program = parser.parse(tokens);
          for (const child of program.body) {
            await this.execute(child);
          }
          return null;
        } catch {
          continue;
        }
      }
      this.output(`Package "${node.module}" not found. Create it at packages/${node.module}/index.say`);
      return null;
    }
    // --- Sharing ---
    async executeShare(node) {
      const target = toString(await this.evaluate(node.target));
      this.output(`Sharing: ${target}`);
      this.output("To share files, use the CLI: say share myfile.say");
      return null;
    }
    // --- Concurrency ---
    async executeDoTogether(node) {
      for (const block of node.blocks) {
        const childEnv = new Environment(this.env);
        const prevEnv = this.env;
        this.env = childEnv;
        try {
          await this.executeBlock(block);
        } finally {
          this.env = prevEnv;
        }
      }
      return null;
    }
    // --- Events ---
    async executeListen(node) {
      const listeners = this.eventListeners.get(node.event) || [];
      listeners.push({ variable: node.variable, body: node.body });
      this.eventListeners.set(node.event, listeners);
      this.output(`Listening for "${node.event}" events`);
      return null;
    }
    async executeEvery(node) {
      const interval = toNumber(await this.evaluate(node.interval));
      const ms = node.unit === "milliseconds" || node.unit === "ms" ? interval : interval * 1e3;
      const timer = setInterval(async () => {
        try {
          await this.executeBlock(node.body);
        } catch (e) {
          if (e instanceof StopSignal) {
            clearInterval(timer);
          }
        }
      }, ms);
      this.timers.push(timer);
      return null;
    }
    // --- Emit event ---
    async emitEvent(event, data) {
      const listeners = this.eventListeners.get(event) || [];
      for (const listener of listeners) {
        const eventEnv = new Environment(this.env);
        if (listener.variable && data !== void 0) {
          eventEnv.define(listener.variable, data);
        }
        const prevEnv = this.env;
        this.env = eventEnv;
        try {
          await this.executeBlock(listener.body);
        } finally {
          this.env = prevEnv;
        }
      }
    }
    // --- Canvas export ---
    getCanvasSVG(name = "canvas") {
      const canvas = this.canvases.get(name);
      if (!canvas || canvas.commands.length === 0) return null;
      return canvasToSVG(canvas);
    }
    // --- When with type matching ---
    async executeWhen(node) {
      const target = await this.evaluate(node.target);
      for (const c of node.cases) {
        if (c.value.type === "TypeCheckExpression" && c.value.value.type === "StringLiteral" && c.value.value.value === "__when_type_check__") {
          const typeCheck = c.value;
          let matches = false;
          switch (typeCheck.targetType) {
            case "number":
              matches = typeof target === "number";
              break;
            case "text":
              matches = typeof target === "string";
              break;
            case "list":
              matches = target instanceof SayList;
              break;
            case "map":
              matches = target instanceof SayMap;
              break;
            case "boolean":
              matches = typeof target === "boolean";
              break;
            case "nothing":
              matches = target === null || target === void 0;
              break;
            default: {
              if (target instanceof SayInstance) {
                matches = target.kind.name === typeCheck.targetType;
                if (!matches) {
                  let parent = target.kind.parent;
                  while (parent) {
                    if (parent.name === typeCheck.targetType) {
                      matches = true;
                      break;
                    }
                    parent = parent.parent;
                  }
                }
              }
              break;
            }
          }
          if (matches) {
            return this.executeBlock(c.body);
          }
        } else if (c.value.type === "LogicalExpression" && c.value.op === "or") {
          const values = this.flattenOr(c.value);
          let matched = false;
          for (const v of values) {
            const caseValue = await this.evaluate(v);
            if (valuesEqual(target, caseValue)) {
              matched = true;
              break;
            }
          }
          if (matched) {
            return this.executeBlock(c.body);
          }
        } else {
          const caseValue = await this.evaluate(c.value);
          if (valuesEqual(target, caseValue)) {
            return this.executeBlock(c.body);
          }
        }
      }
      if (node.elseBody.length > 0) {
        return this.executeBlock(node.elseBody);
      }
      return null;
    }
    // --- Cleanup ---
    cleanup() {
      for (const timer of this.timers) {
        clearInterval(timer);
      }
      this.timers = [];
      if (this.server) {
        this.server.stop();
        this.server = null;
      }
    }
    // --- Helpers for JSON <-> SayValue ---
    jsonToSayValue(val) {
      if (val === null || val === void 0) return null;
      if (typeof val === "number") return val;
      if (typeof val === "string") return val;
      if (typeof val === "boolean") return val;
      if (Array.isArray(val)) {
        return new SayList(val.map((item) => this.jsonToSayValue(item)));
      }
      if (typeof val === "object") {
        const map = new SayMap();
        for (const [k, v] of Object.entries(val)) {
          map.set(k, this.jsonToSayValue(v));
        }
        return map;
      }
      return toString(val);
    }
    sayValueToJson(val) {
      if (val === null || val === void 0) return null;
      if (typeof val === "number" || typeof val === "string" || typeof val === "boolean") return val;
      if (val instanceof SayList) return val.items.map((item) => this.sayValueToJson(item));
      if (val instanceof SayMap) {
        const obj = {};
        for (const [k, v] of val.entries) {
          obj[k] = this.sayValueToJson(v);
        }
        return obj;
      }
      if (val instanceof SayInstance) {
        const obj = { __kind: val.kind.name };
        for (const [k, v] of val.properties) {
          obj[k] = this.sayValueToJson(v);
        }
        return obj;
      }
      return String(val);
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
          const mockVal = this.mocks.get(node.name.toLowerCase());
          if (mockVal !== void 0) return mockVal;
          const cmd = this.commands.get(node.name);
          if (cmd) {
            return this.callCommand(cmd, []);
          }
          const val = this.env.get(node.name);
          if (val === void 0) {
            if (this.strict) {
              throw new Error(`Undefined variable "${node.name}" on line ${node.line || "?"}. Did you mean to use "put" to store text?`);
            }
            return node.name;
          }
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
          const mock = this.mocks.get(node.name.toLowerCase());
          if (mock !== void 0) return mock;
          const cmd = this.commands.get(node.name);
          if (cmd) {
            const args = [];
            for (const arg of node.args) {
              args.push(await this.evaluate(arg));
            }
            return this.callCommand(cmd, args);
          }
          const lambdaVal = this.env.get(node.name);
          if (lambdaVal instanceof SayLambda) {
            const args = [];
            for (const arg of node.args) {
              args.push(await this.evaluate(arg));
            }
            return this.callLambda(lambdaVal, args);
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
          if (obj instanceof SayInstance && obj.kind.name === "Module") {
            const mathModule = this.globalEnv.get("math");
            if (obj === mathModule) {
              switch (node.method) {
                case "round":
                  return Math.round(toNumber(args[0]));
                case "floor":
                  return Math.floor(toNumber(args[0]));
                case "ceil":
                  return Math.ceil(toNumber(args[0]));
                case "abs":
                  return Math.abs(toNumber(args[0]));
                case "sqrt":
                  return Math.sqrt(toNumber(args[0]));
                case "power":
                  return Math.pow(toNumber(args[0]), toNumber(args[1]));
                case "random": {
                  if (args.length === 0) return Math.random();
                  if (args.length >= 2) {
                    const min = toNumber(args[0]);
                    const max = toNumber(args[1]);
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                  }
                  return Math.random();
                }
              }
            }
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
            if (node.method === "at") {
              const idx = toNumber(args[0]);
              return idx >= 1 && idx <= obj.length ? obj[idx - 1] : null;
            }
            if (node.method === "from") {
              const start = toNumber(args[0]);
              const end = toNumber(args[1]);
              return obj.slice(Math.max(0, start - 1), end);
            }
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
          if (collection instanceof SayMap) return collection.has(toString(value));
          if (collection instanceof SaySet) return collection.has(value);
          if (typeof collection === "string") return collection.includes(toString(value));
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
        case "MapLiteral":
          return new SayMap();
        case "RandomExpression": {
          if (node.variant === "float") return Math.random();
          if (node.variant === "range") {
            const min = toNumber(await this.evaluate(node.start));
            const max = toNumber(await this.evaluate(node.end));
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }
          if (node.variant === "pick") {
            const source = await this.evaluate(node.source);
            if (source instanceof SayList && source.items.length > 0) {
              const idx = Math.floor(Math.random() * source.items.length);
              return source.items[idx];
            }
            return null;
          }
          return null;
        }
        case "TypeCheckExpression": {
          const val = await this.evaluate(node.value);
          let result = false;
          switch (node.targetType) {
            case "number":
              result = typeof val === "number";
              break;
            case "text":
              result = typeof val === "string";
              break;
            case "boolean":
              result = typeof val === "boolean";
              break;
            case "list":
              result = val instanceof SayList;
              break;
            case "map":
              result = val instanceof SayMap;
              break;
            case "nothing":
              result = val === null || val === void 0;
              break;
            case "set":
              result = val instanceof SaySet;
              break;
            case "pair":
              result = val instanceof SayPair;
              break;
            case "enum":
              result = val instanceof SayEnum;
              break;
            case "lambda":
              result = val instanceof SayLambda;
              break;
            default: {
              if (val instanceof SayInstance) {
                result = val.kind.name === node.targetType;
                if (!result) {
                  let parent = val.kind.parent;
                  while (parent) {
                    if (parent.name === node.targetType) {
                      result = true;
                      break;
                    }
                    parent = parent.parent;
                  }
                }
              }
              break;
            }
          }
          return node.negated ? !result : result;
        }
        case "RoundedExpression": {
          const val = toNumber(await this.evaluate(node.value));
          const dec = toNumber(await this.evaluate(node.decimals));
          const factor = Math.pow(10, dec);
          return Math.round(val * factor) / factor;
        }
        case "ReadExpression": {
          const path = toString(await this.evaluate(node.path));
          const content = await this.readFile(path);
          if (node.asType === "list") {
            return new SayList(content.split("\n"));
          }
          return content;
        }
        case "ThinkExpression": {
          const prompt = toString(await this.evaluate(node.prompt));
          return this.aiEngine.think(prompt);
        }
        case "FetchExpression": {
          const url = toString(await this.evaluate(node.url));
          try {
            const response = await this.httpFetch(url);
            if (typeof response.json === "function") {
              try {
                const data = await response.json();
                return this.jsonToSayValue(data);
              } catch {
                return await response.text();
              }
            }
            return toString(response);
          } catch (e) {
            throw new Error(`Fetch failed: ${e instanceof Error ? e.message : String(e)}`);
          }
        }
        case "RecallExpression": {
          const key = toString(await this.evaluate(node.key));
          const storage = this.getStorage();
          const val = storage.recall(key);
          return this.jsonToSayValue(val);
        }
        case "PairLiteral": {
          const first = await this.evaluate(node.first);
          const second = await this.evaluate(node.second);
          return new SayPair(first, second);
        }
        case "SetLiteral": {
          const items = [];
          for (const item of node.items) {
            items.push(await this.evaluate(item));
          }
          return new SaySet(items);
        }
        case "MapLiteralWithEntries": {
          const map = new SayMap();
          for (const entry of node.entries) {
            const key = toString(await this.evaluate(entry.key));
            const value = await this.evaluate(entry.value);
            map.set(key, value);
          }
          return map;
        }
        case "InterpolatedStringExpression": {
          let result = "";
          for (const part of node.parts) {
            if (typeof part === "string") {
              result += part;
            } else {
              const val = await this.evaluate(part);
              result += toString(val);
            }
          }
          return result;
        }
        case "RegexMatchExpression": {
          const val = toString(await this.evaluate(node.value));
          const pattern = toString(await this.evaluate(node.pattern));
          try {
            return new RegExp(pattern).test(val);
          } catch {
            return false;
          }
        }
        case "LambdaExpression": {
          return new SayLambda(node.params, node.body, this.env);
        }
        case "PipelineExpression": {
          let current = await this.evaluate(node.stages[0]);
          for (let i = 1; i < node.stages.length; i++) {
            const stage = node.stages[i];
            if (stage.type === "Identifier") {
              const fn = this.env.get(stage.name);
              if (fn instanceof SayLambda) {
                current = await this.callLambda(fn, [current]);
                continue;
              }
              const cmd = this.commands.get(stage.name);
              if (cmd) {
                current = await this.callCommand(cmd, [current]);
                continue;
              }
            }
            const prevIt = this.env.get("it");
            this.env.set("it", current);
            current = await this.evaluate(stage);
            this.env.set("it", prevIt ?? null);
          }
          return current;
        }
        case "AwaitExpression": {
          return await this.evaluate(node.value);
        }
        case "EnvExpression": {
          const key = toString(await this.evaluate(node.key));
          return process.env[key] ?? null;
        }
        case "DateTimeExpression": {
          const now = /* @__PURE__ */ new Date();
          switch (node.variant) {
            case "now":
              return now.toISOString();
            case "today":
              return now.toISOString().split("T")[0];
            case "date":
              return now.toLocaleDateString();
            case "time":
              return now.toLocaleTimeString();
            case "year":
              return now.getFullYear();
            case "month":
              return now.getMonth() + 1;
            case "day":
              return now.getDate();
            case "hour":
              return now.getHours();
            case "minute":
              return now.getMinutes();
            case "weekday":
              return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][now.getDay()];
            default:
              return now.toISOString();
          }
        }
        case "FormatExpression": {
          const val = toNumber(await this.evaluate(node.value));
          const places = toNumber(await this.evaluate(node.places));
          return Number(val.toFixed(places));
        }
        case "CurryExpression": {
          const cmd = this.commands.get(node.command);
          if (!cmd) return null;
          const partialArgs = [];
          for (const arg of node.args) {
            partialArgs.push(await this.evaluate(arg));
          }
          const remainingParams = cmd.params.slice(partialArgs.length);
          const allArgExprs = [
            ...partialArgs.map((v, i) => ({ type: "Identifier", name: `__curry_arg_${i}` })),
            ...remainingParams.map((p) => ({ type: "Identifier", name: p }))
          ];
          const callExpr = { type: "CallExpression", name: node.command, args: allArgExprs };
          const returnStmt = { type: "ReturnStatement", value: callExpr, line: 0 };
          const closureEnv = new Environment(this.env);
          for (let i = 0; i < partialArgs.length; i++) {
            closureEnv.define(`__curry_arg_${i}`, partialArgs[i]);
          }
          return new SayLambda(remainingParams, [returnStmt], closureEnv);
        }
        case "ComposeExpression": {
          const fns = [];
          for (const f of node.functions) {
            fns.push(await this.evaluate(f));
          }
          const closureEnv = new Environment(this.env);
          for (let i = 0; i < fns.length; i++) {
            closureEnv.define(`__fn_${i}`, fns[i]);
          }
          closureEnv.define("__fn_count", fns.length);
          const composedLambda = new SayLambda(["x"], fns, closureEnv);
          composedLambda.__composed = fns;
          return composedLambda;
        }
        case "ExistsExpression": {
          const val = await this.evaluate(node.target);
          return val !== null && val !== void 0;
        }
        case "CsvParseExpression": {
          const source = toString(await this.evaluate(node.source));
          const lines = source.split("\n").filter((l) => l.trim());
          if (lines.length === 0) return new SayList([]);
          const headers = lines[0].split(",").map((h) => h.trim());
          const rows = [];
          for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(",").map((c) => c.trim());
            const row = new SayMap();
            for (let j = 0; j < headers.length; j++) {
              row.set(headers[j], cols[j] ?? null);
            }
            rows.push(row);
          }
          return new SayList(rows);
        }
        case "JsonParseExpression": {
          const source = toString(await this.evaluate(node.source));
          try {
            const parsed = JSON.parse(source);
            return this.jsonToSayValue(parsed);
          } catch {
            return null;
          }
        }
        case "FilesExpression": {
          const dirPath = toString(await this.evaluate(node.path));
          try {
            const fs = (init_node_shim(), __toCommonJS(node_shim_exports));
            const entries = fs.readdirSync(dirPath);
            return new SayList(entries);
          } catch {
            return new SayList([]);
          }
        }
        case "ShellExpression": {
          const cmd = toString(await this.evaluate(node.command));
          try {
            const { execSync } = (init_node_shim(), __toCommonJS(node_shim_exports));
            const result = execSync(cmd, { encoding: "utf-8", timeout: 1e4 });
            return result.trim();
          } catch (e) {
            return `[Shell error: ${e instanceof Error ? e.message : String(e)}]`;
          }
        }
        case "TouchesExpression": {
          const a = await this.evaluate(node.left);
          const b = await this.evaluate(node.right);
          if (a instanceof SayInstance && b instanceof SayInstance) {
            const ax = toNumber(a.get("x")), ay = toNumber(a.get("y")), as = toNumber(a.get("size") ?? 10);
            const bx = toNumber(b.get("x")), by = toNumber(b.get("y")), bs = toNumber(b.get("size") ?? 10);
            return Math.abs(ax - bx) < (as + bs) / 2 && Math.abs(ay - by) < (as + bs) / 2;
          }
          return false;
        }
        default:
          return null;
      }
    }
    getProperty(obj, property) {
      if (obj instanceof SayInstance) {
        return obj.get(property) ?? null;
      }
      if (obj instanceof SayMap) {
        switch (property) {
          case "count":
            return obj.count;
          case "keys":
            return obj.keys;
          case "values":
            return obj.values;
          default:
            return obj.get(property);
        }
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
      if (obj instanceof SaySet) {
        switch (property) {
          case "count":
            return obj.count;
          case "list":
            return obj.toList();
          default:
            return null;
        }
      }
      if (obj instanceof SayPair) {
        switch (property) {
          case "first":
            return obj.first;
          case "second":
            return obj.second;
          default:
            return null;
        }
      }
      if (obj instanceof SayEnum) {
        switch (property) {
          case "values":
            return new SayList(obj.values);
          case "name":
            return obj.name;
          default:
            if (obj.has(property)) return property.toLowerCase();
            return null;
        }
      }
      if (typeof obj === "string") {
        if (property === "length") return obj.length;
        if (property === "upper") return obj.toUpperCase();
        if (property === "lower") return obj.toLowerCase();
        if (property === "trim") return obj.trim();
        if (property === "first") return obj.length > 0 ? obj[0] : null;
        if (property === "last") return obj.length > 0 ? obj[obj.length - 1] : null;
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
        if (obj instanceof SayMap) {
          obj.set(target.property, value);
        } else if (obj instanceof SayInstance) {
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
          } else if (current instanceof SayMap) {
            let next = current.get(path[i]);
            if (next === null || next === void 0) {
              next = new SayMap();
              current.set(path[i], next);
            }
            current = next;
          }
        }
        if (current instanceof SayInstance) {
          current.set(path[path.length - 1], value);
        } else if (current instanceof SayMap) {
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
          if (typeof left === "string" || typeof right === "string") {
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
    flattenOr(expr) {
      const results = [];
      if (expr.left) {
        if (expr.left.type === "LogicalExpression" && expr.left.op === "or") {
          results.push(...this.flattenOr(expr.left));
        } else {
          results.push(expr.left);
        }
      }
      if (expr.right.type === "LogicalExpression" && expr.right.op === "or") {
        results.push(...this.flattenOr(expr.right));
      } else {
        results.push(expr.right);
      }
      return results;
    }
    async callLambda(lambda, args) {
      const composed = lambda.__composed;
      if (composed && Array.isArray(composed)) {
        let current = args[0] ?? null;
        for (const fn of composed) {
          if (fn instanceof SayLambda) {
            current = await this.callLambda(fn, [current]) ?? null;
          }
        }
        return current;
      }
      const lambdaEnv = new Environment(lambda.closure);
      for (let i = 0; i < lambda.params.length; i++) {
        lambdaEnv.define(lambda.params[i], args[i] ?? null);
      }
      const prevEnv = this.env;
      this.env = lambdaEnv;
      let result = null;
      try {
        if (Array.isArray(lambda.body)) {
          await this.executeBlock(lambda.body);
        } else {
          result = await this.evaluate(lambda.body);
        }
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
    // --- New execute methods for Wave 4 features ---
    async executeContract(node) {
      this.contracts.set(node.name, node.methods);
      return null;
    }
    async executeEnum(node) {
      const sayEnum = new SayEnum(node.name, node.values.map((v) => v.toLowerCase()));
      this.enums.set(node.name.toLowerCase(), sayEnum);
      this.env.define(node.name.toLowerCase(), sayEnum);
      return null;
    }
    async executeDestructure(node) {
      const source = await this.evaluate(node.source);
      if (source instanceof SayList) {
        for (let i = 0; i < node.variables.length; i++) {
          this.env.define(node.variables[i], source.at(i + 1));
        }
      } else if (source instanceof SayPair) {
        if (node.variables.length >= 1) this.env.define(node.variables[0], source.first);
        if (node.variables.length >= 2) this.env.define(node.variables[1], source.second);
      } else if (source instanceof SayMap) {
        for (const varName of node.variables) {
          this.env.define(varName, source.get(varName));
        }
      }
      return null;
    }
    async executeMock(node) {
      const value = await this.evaluate(node.returnValue);
      this.mocks.set(node.target.toLowerCase(), value);
      return null;
    }
    async executeSnapshot(node) {
      const value = await this.evaluate(node.expression);
      const serialized = toString(value);
      const existing = this.snapshots.get(node.name);
      if (existing !== void 0) {
        if (existing !== serialized) {
          throw new Error(`Snapshot "${node.name}" changed: expected "${existing}" but got "${serialized}"`);
        }
      } else {
        this.snapshots.set(node.name, serialized);
      }
      return null;
    }
    async executeBenchmark(node) {
      const start = Date.now();
      await this.executeBlock(node.body);
      const elapsed = Date.now() - start;
      this.output(`Benchmark "${node.name}": ${elapsed}ms`);
      return elapsed;
    }
    async executeAnimate(node) {
      const from = toNumber(await this.evaluate(node.from));
      const to = toNumber(await this.evaluate(node.to));
      const duration = toNumber(await this.evaluate(node.duration));
      this.output(`Animate ${node.target}.${node.property} from ${from} to ${to} over ${duration}ms`);
      return null;
    }
    async executeTurtle(node) {
      const value = node.value ? toNumber(await this.evaluate(node.value)) : 0;
      switch (node.action) {
        case "forward": {
          const rad = this.turtleState.angle * Math.PI / 180;
          this.turtleState.x += Math.cos(rad) * value;
          this.turtleState.y += Math.sin(rad) * value;
          break;
        }
        case "backward": {
          const rad = this.turtleState.angle * Math.PI / 180;
          this.turtleState.x -= Math.cos(rad) * value;
          this.turtleState.y -= Math.sin(rad) * value;
          break;
        }
        case "left":
          this.turtleState.angle -= value;
          break;
        case "right":
          this.turtleState.angle += value;
          break;
        case "penup":
          this.turtleState.penDown = false;
          break;
        case "pendown":
          this.turtleState.penDown = true;
          break;
        case "home":
          this.turtleState.x = 200;
          this.turtleState.y = 200;
          this.turtleState.angle = 0;
          break;
        case "reset":
          this.turtleState = { x: 200, y: 200, angle: 0, penDown: true, color: "#000000" };
          break;
      }
      return null;
    }
    async executeSwitchScene(node) {
      const sceneName = toString(await this.evaluate(node.scene));
      this.currentScene = sceneName;
      this.output(`Switched to scene: ${sceneName}`);
      return null;
    }
    async executeConnect(node) {
      const url = toString(await this.evaluate(node.url));
      this.env.define(node.alias, `[WebSocket: ${url}]`);
      this.output(`Connected to ${url} as ${node.alias}`);
      return null;
    }
    async executeEmitStmt(node) {
      const event = toString(await this.evaluate(node.event));
      const data = node.data ? await this.evaluate(node.data) : null;
      this.output(`Emit "${event}"${data ? ": " + toString(data) : ""}`);
      return null;
    }
    async executeCookieStmt(node) {
      const name = toString(await this.evaluate(node.name));
      switch (node.action) {
        case "set": {
          const value = node.value ? toString(await this.evaluate(node.value)) : "";
          this.env.define(`cookie_${name}`, value);
          break;
        }
        case "get":
          return this.env.get(`cookie_${name}`) ?? null;
        case "delete":
          this.env.define(`cookie_${name}`, null);
          break;
      }
      return null;
    }
    async executeAllow(node) {
      const origin = toString(await this.evaluate(node.origin));
      this.output(`CORS allowed: ${origin}`);
      return null;
    }
    async executeStreamStmt(node) {
      const data = await this.evaluate(node.data);
      const interval = node.interval ? toNumber(await this.evaluate(node.interval)) : 1e3;
      this.output(`Stream: ${toString(data)} every ${interval}ms`);
      return null;
    }
    async executeTemplateDecl(node) {
      this.templates.set(node.name.toLowerCase(), { params: node.params, body: node.body });
      return null;
    }
    async executeFormatStmt(node) {
      const value = toNumber(await this.evaluate(node.value));
      const places = toNumber(await this.evaluate(node.places));
      return value.toFixed(places);
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
    if (val instanceof SayMap) return val.toString();
    if (val instanceof SayInstance) return val.toString();
    if (val instanceof SayKind) return `[Kind ${val.name}]`;
    if (val instanceof SayUIElement) return val.toString();
    if (val instanceof SaySet) return val.toString();
    if (val instanceof SayPair) return val.toString();
    if (val instanceof SayEnum) return val.toString();
    if (val instanceof SayLambda) return val.toString();
    return String(val);
  }
  function isTruthy(val) {
    if (val === null || val === void 0) return false;
    if (typeof val === "boolean") return val;
    if (typeof val === "number") return val !== 0;
    if (typeof val === "string") return val.length > 0;
    if (val instanceof SayMap) return true;
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

  // src/web.ts
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
  return __toCommonJS(web_exports);
})();

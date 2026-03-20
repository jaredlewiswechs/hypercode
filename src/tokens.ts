export enum TokenType {
  // Literals
  NUMBER = 'NUMBER',
  STRING = 'STRING',
  BOOLEAN = 'BOOLEAN',
  NOTHING = 'NOTHING',
  IDENTIFIER = 'IDENTIFIER',
  DOT_IDENTIFIER = 'DOT_IDENTIFIER', // .name style interpolation

  // Keywords - Core verbs
  PUT = 'PUT',
  SET = 'SET',
  INTO = 'INTO',
  SHOW = 'SHOW',
  ASK = 'ASK',
  MAKE = 'MAKE',
  SEND = 'SEND',
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  GO = 'GO',
  OPEN = 'OPEN',
  HIDE = 'HIDE',
  DRAW = 'DRAW',
  WAIT = 'WAIT',
  PLAY = 'PLAY',
  CLEAR = 'CLEAR',
  STOP = 'STOP',

  // Keywords - Structure
  KIND = 'KIND',
  FROM = 'FROM',
  ON = 'ON',
  ME = 'ME',
  END = 'END',
  RETURN = 'RETURN',
  COMMAND = 'COMMAND',
  USE = 'USE',
  TEST = 'TEST',
  CHECK = 'CHECK',
  NEW = 'NEW',

  // Keywords - Control flow
  IF = 'IF',
  ELSE = 'ELSE',
  REPEAT = 'REPEAT',
  TIMES = 'TIMES',
  WHILE = 'WHILE',
  UNTIL = 'UNTIL',
  FOREVER = 'FOREVER',
  FOR = 'FOR',
  EACH = 'EACH',
  IN = 'IN',
  TO = 'TO',
  AT = 'AT',

  // Keywords - Values
  TRUE = 'TRUE',
  FALSE = 'FALSE',

  // Keywords - Objects
  A = 'A',
  CALLED = 'CALLED',
  WITH = 'WITH',
  IT = 'IT',

  // Keywords - Lists
  LIST = 'LIST',
  MAP = 'MAP',
  SORT = 'SORT',
  REVERSE = 'REVERSE',
  SHUFFLE = 'SHUFFLE',
  CONTAINS = 'CONTAINS',
  WHERE = 'WHERE',

  // Keywords - Error handling
  TRY = 'TRY',
  OR = 'OR',
  CATCH = 'CATCH',

  // Keywords - English comparisons
  IS = 'IS',
  NOT = 'NOT',
  AND = 'AND',
  GREATER = 'GREATER',
  LESS = 'LESS',
  THAN = 'THAN',

  // Keywords - Misc
  EXPLAIN = 'EXPLAIN',
  RANDOM = 'RANDOM',
  PICK = 'PICK',
  TEXT = 'TEXT',
  NUMBER_TYPE = 'NUMBER_TYPE',
  WHEN = 'WHEN',
  ROUNDED = 'ROUNDED',
  READ = 'READ',
  WRITE = 'WRITE',
  APPEND = 'APPEND',
  AS = 'AS',

  // Operators
  PLUS = 'PLUS',
  MINUS = 'MINUS',
  STAR = 'STAR',
  SLASH = 'SLASH',
  PERCENT = 'PERCENT',
  CARET = 'CARET',
  EQ = 'EQ',
  NEQ = 'NEQ',
  GT = 'GT',
  LT = 'LT',
  GTE = 'GTE',
  LTE = 'LTE',

  // Delimiters
  LPAREN = 'LPAREN',
  RPAREN = 'RPAREN',
  COMMA = 'COMMA',
  DOT = 'DOT',
  QUESTION = 'QUESTION',

  // Special
  NEWLINE = 'NEWLINE',
  EOF = 'EOF',
  COMMENT = 'COMMENT',

  // Keywords for events
  CLICKED = 'CLICKED',
  PRESSED = 'PRESSED',
  CHANGED = 'CHANGED',
  KEY = 'KEY',
  EVERY = 'EVERY',
  SECOND = 'SECOND',
  SECONDS = 'SECONDS',
  MOUSE_DOWN = 'MOUSE_DOWN',
  MOUSE_MOVE = 'MOUSE_MOVE',

  // Else if
  ELSE_IF = 'ELSE_IF',

  // Timer
  TIMER = 'TIMER',

  // Keywords - AI
  THINK = 'THINK',

  // Keywords - HTTP
  FETCH = 'FETCH',

  // Keywords - Web server
  SERVE = 'SERVE',
  RESPOND = 'RESPOND',
  REQUEST = 'REQUEST',
  ROUTE = 'ROUTE',
  STATUS = 'STATUS',

  // Keywords - Storage
  REMEMBER = 'REMEMBER',
  RECALL = 'RECALL',
  FORGET = 'FORGET',

  // Keywords - Packages
  GRAB = 'GRAB',

  // Keywords - Sharing
  SHARE = 'SHARE',

  // Keywords - Concurrency
  TOGETHER = 'TOGETHER',
  DO = 'DO',

  // Keywords - Sound
  ALOUD = 'ALOUD',
  NOTE = 'NOTE',
  SOUND = 'SOUND',

  // Keywords - Types
  BOOLEAN_TYPE = 'BOOLEAN_TYPE',

  // Keywords - Modules
  NAMESPACE = 'NAMESPACE',

  // Keywords - Canvas
  CANVAS = 'CANVAS',
  COLOR = 'COLOR',
  SIZE = 'SIZE',
  LINE = 'LINE',
  CIRCLE = 'CIRCLE',
  RECTANGLE = 'RECTANGLE',
  FILL = 'FILL',
  STROKE = 'STROKE',
  WIDTH = 'WIDTH',
  HEIGHT = 'HEIGHT',

  // Keywords - Debugging
  DEBUG = 'DEBUG',
  STEP = 'STEP',
  BREAKPOINT = 'BREAKPOINT',

  // Keywords - Classroom
  CLASSROOM = 'CLASSROOM',
  SUBMIT = 'SUBMIT',
  COLLECT = 'COLLECT',

  // Keywords - Say aloud
  SAY_ALOUD = 'SAY_ALOUD',

  // Keywords - Listen
  LISTEN = 'LISTEN',
}

export interface Token {
  type: TokenType;
  value: string;
  line: number;
  column: number;
}

export const KEYWORDS: Record<string, TokenType> = {
  'put': TokenType.PUT,
  'set': TokenType.SET,
  'into': TokenType.INTO,
  'show': TokenType.SHOW,
  'ask': TokenType.ASK,
  'make': TokenType.MAKE,
  'send': TokenType.SEND,
  'add': TokenType.ADD,
  'remove': TokenType.REMOVE,
  'go': TokenType.GO,
  'open': TokenType.OPEN,
  'hide': TokenType.HIDE,
  'draw': TokenType.DRAW,
  'wait': TokenType.WAIT,
  'play': TokenType.PLAY,
  'clear': TokenType.CLEAR,
  'stop': TokenType.STOP,
  'kind': TokenType.KIND,
  'from': TokenType.FROM,
  'on': TokenType.ON,
  'me': TokenType.ME,
  'end': TokenType.END,
  'return': TokenType.RETURN,
  'command': TokenType.COMMAND,
  'use': TokenType.USE,
  'test': TokenType.TEST,
  'check': TokenType.CHECK,
  'new': TokenType.NEW,
  'if': TokenType.IF,
  'else': TokenType.ELSE,
  'repeat': TokenType.REPEAT,
  'times': TokenType.TIMES,
  'while': TokenType.WHILE,
  'until': TokenType.UNTIL,
  'forever': TokenType.FOREVER,
  'for': TokenType.FOR,
  'each': TokenType.EACH,
  'in': TokenType.IN,
  'to': TokenType.TO,
  'at': TokenType.AT,
  'true': TokenType.TRUE,
  'false': TokenType.FALSE,
  'nothing': TokenType.NOTHING,
  'a': TokenType.A,
  'called': TokenType.CALLED,
  'with': TokenType.WITH,
  'it': TokenType.IT,
  'list': TokenType.LIST,
  'map': TokenType.MAP,
  'sort': TokenType.SORT,
  'reverse': TokenType.REVERSE,
  'shuffle': TokenType.SHUFFLE,
  'contains': TokenType.CONTAINS,
  'where': TokenType.WHERE,
  'try': TokenType.TRY,
  'or': TokenType.OR,
  'catch': TokenType.CATCH,
  'is': TokenType.IS,
  'not': TokenType.NOT,
  'and': TokenType.AND,
  'greater': TokenType.GREATER,
  'less': TokenType.LESS,
  'than': TokenType.THAN,
  'explain': TokenType.EXPLAIN,
  'random': TokenType.RANDOM,
  'pick': TokenType.PICK,
  'text': TokenType.TEXT,
  'number': TokenType.NUMBER_TYPE,
  'when': TokenType.WHEN,
  'rounded': TokenType.ROUNDED,
  'read': TokenType.READ,
  'write': TokenType.WRITE,
  'append': TokenType.APPEND,
  'as': TokenType.AS,
  'clicked': TokenType.CLICKED,
  'pressed': TokenType.PRESSED,
  'changed': TokenType.CHANGED,
  'key': TokenType.KEY,
  'every': TokenType.EVERY,
  'second': TokenType.SECOND,
  'seconds': TokenType.SECONDS,
  'timer': TokenType.TIMER,
  'think': TokenType.THINK,
  'fetch': TokenType.FETCH,
  'serve': TokenType.SERVE,
  'respond': TokenType.RESPOND,
  'request': TokenType.REQUEST,
  'route': TokenType.ROUTE,
  'status': TokenType.STATUS,
  'remember': TokenType.REMEMBER,
  'recall': TokenType.RECALL,
  'forget': TokenType.FORGET,
  'grab': TokenType.GRAB,
  'share': TokenType.SHARE,
  'together': TokenType.TOGETHER,
  'do': TokenType.DO,
  'aloud': TokenType.ALOUD,
  'note': TokenType.NOTE,
  'sound': TokenType.SOUND,
  'boolean': TokenType.BOOLEAN_TYPE,
  'canvas': TokenType.CANVAS,
  'color': TokenType.COLOR,
  'size': TokenType.SIZE,
  'line': TokenType.LINE,
  'circle': TokenType.CIRCLE,
  'rectangle': TokenType.RECTANGLE,
  'fill': TokenType.FILL,
  'stroke': TokenType.STROKE,
  'width': TokenType.WIDTH,
  'height': TokenType.HEIGHT,
  'debug': TokenType.DEBUG,
  'step': TokenType.STEP,
  'breakpoint': TokenType.BREAKPOINT,
  'classroom': TokenType.CLASSROOM,
  'submit': TokenType.SUBMIT,
  'collect': TokenType.COLLECT,
  'listen': TokenType.LISTEN,
};

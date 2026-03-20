export type ASTNode =
  | PutStatement
  | ShowStatement
  | AskExpression
  | IfStatement
  | RepeatStatement
  | ForEachStatement
  | KindDeclaration
  | MakeStatement
  | SendStatement
  | OnHandler
  | CommandDeclaration
  | ReturnStatement
  | AddStatement
  | RemoveStatement
  | SortStatement
  | ReverseStatement
  | ShuffleStatement
  | TryStatement
  | UseStatement
  | TestBlock
  | CheckStatement
  | ExplainStatement
  | InspectExpression
  | StopStatement
  | WaitStatement
  | DrawStatement
  | ClearStatement
  | GoStatement
  | OpenStatement
  | HideStatement
  | PlayStatement
  | ExpressionStatement
  | ListLiteralMultiline
  | SetStatement
  | WhenStatement
  | WriteStatement
  | RememberStatement
  | ForgetStatement
  | ServeStatement
  | RespondStatement
  | RouteStatement
  | GrabStatement
  | ShareStatement
  | DoTogetherStatement
  | ListenStatement
  | EveryStatement
  | ContractDeclaration
  | EnumDeclaration
  | DestructureStatement
  | MockStatement
  | BeforeBlock
  | AfterBlock
  | SnapshotCheck
  | BenchmarkBlock
  | AnimateStatement
  | TurtleStatement
  | SwitchSceneStatement
  | ConnectStatement
  | EmitStatement
  | CookieStatement
  | AllowStatement
  | StreamStatement
  | TemplateDeclaration
  | FormatStatement;

export interface Program {
  type: 'Program';
  body: ASTNode[];
}

export interface PutStatement {
  type: 'PutStatement';
  value: Expression;
  target: Expression;
  line: number;
}

export interface ShowStatement {
  type: 'ShowStatement';
  parts: ShowPart[];
  line: number;
}

export type ShowPart =
  | { type: 'text'; value: string }
  | { type: 'interpolation'; path: string }
  | { type: 'expression'; expr: Expression };

export interface AskExpression {
  type: 'AskExpression';
  prompt: string;
  line: number;
}

export interface IfStatement {
  type: 'IfStatement';
  condition: Expression;
  body: ASTNode[];
  elseIfClauses: { condition: Expression; body: ASTNode[] }[];
  elseBody: ASTNode[];
  line: number;
}

export interface RepeatStatement {
  type: 'RepeatStatement';
  variant: 'times' | 'while' | 'until' | 'forever';
  count?: Expression;
  condition?: Expression;
  counterVariable?: string;
  label?: string;
  body: ASTNode[];
  line: number;
}

export interface ForEachStatement {
  type: 'ForEachStatement';
  variable: string;
  indexVariable?: string;
  iterable: Expression;
  step?: Expression;
  body: ASTNode[];
  line: number;
}

export interface KindDeclaration {
  type: 'KindDeclaration';
  name: string;
  parent?: string;
  implements?: string[];
  mixins?: string[];
  fields: { name: string; defaultValue: Expression; isPrivate?: boolean }[];
  methods: OnHandler[];
  staticMethods?: OnHandler[];
  getters?: OnHandler[];
  operators?: { op: string; handler: OnHandler }[];
  enumValues?: string[];
  line: number;
}

export interface MakeStatement {
  type: 'MakeStatement';
  kindName: string;
  instanceName: string;
  inlineProps?: { name: string; value: Expression }[];
  line: number;
}

export interface SendStatement {
  type: 'SendStatement';
  message: string;
  args: Expression[];
  target: Expression;
  line: number;
}

export interface OnHandler {
  type: 'OnHandler';
  name: string;
  params: string[];
  body: ASTNode[];
  line: number;
}

export interface CommandDeclaration {
  type: 'CommandDeclaration';
  name: string;
  params: string[];
  paramTypes?: (string | undefined)[];
  body: ASTNode[];
  line: number;
}

export interface ReturnStatement {
  type: 'ReturnStatement';
  value: Expression;
  condition?: Expression;
  line: number;
}

export interface AddStatement {
  type: 'AddStatement';
  value: Expression;
  target: Expression;
  line: number;
}

export interface RemoveStatement {
  type: 'RemoveStatement';
  value: Expression;
  target: Expression;
  line: number;
}

export interface SortStatement {
  type: 'SortStatement';
  target: Expression;
  line: number;
}

export interface ReverseStatement {
  type: 'ReverseStatement';
  target: Expression;
  line: number;
}

export interface ShuffleStatement {
  type: 'ShuffleStatement';
  target: Expression;
  line: number;
}

export interface TryStatement {
  type: 'TryStatement';
  body: ASTNode[];
  catchVar?: string;
  catchBody: ASTNode[];
  line: number;
}

export interface UseStatement {
  type: 'UseStatement';
  module: string;
  line: number;
}

export interface TestBlock {
  type: 'TestBlock';
  name: string;
  body: ASTNode[];
  line: number;
}

export interface CheckStatement {
  type: 'CheckStatement';
  expression: Expression;
  line: number;
}

export interface ExplainStatement {
  type: 'ExplainStatement';
  target: Expression;
  line: number;
}

export interface InspectExpression {
  type: 'InspectExpression';
  target: Expression;
  line: number;
}

export interface StopStatement {
  type: 'StopStatement';
  label?: string;
  line: number;
}

export interface WaitStatement {
  type: 'WaitStatement';
  duration: Expression;
  unit: string;
  line: number;
}

export interface DrawStatement {
  type: 'DrawStatement';
  shape: string;
  canvas: string;
  params: Record<string, Expression>;
  line: number;
}

export interface ClearStatement {
  type: 'ClearStatement';
  target: string;
  line: number;
}

export interface GoStatement {
  type: 'GoStatement';
  target: Expression;
  line: number;
}

export interface OpenStatement {
  type: 'OpenStatement';
  target: Expression;
  line: number;
}

export interface HideStatement {
  type: 'HideStatement';
  target: Expression;
  line: number;
}

export interface PlayStatement {
  type: 'PlayStatement';
  sound: string;
  waitFlag: boolean;
  line: number;
}

export interface ExpressionStatement {
  type: 'ExpressionStatement';
  expression: Expression;
  line: number;
}

export interface ListLiteralMultiline {
  type: 'ListLiteralMultiline';
  target: string;
  items: Expression[];
  line: number;
}

export interface SetStatement {
  type: 'SetStatement';
  target: Expression;
  value: Expression;
  line: number;
}

export interface WhenStatement {
  type: 'WhenStatement';
  target: Expression;
  cases: { value: Expression; body: ASTNode[] }[];
  elseBody: ASTNode[];
  line: number;
}

export interface WriteStatement {
  type: 'WriteStatement';
  path: Expression;
  value: Expression;
  append: boolean;
  line: number;
}

// Expressions
export type Expression =
  | NumberLiteral
  | StringLiteral
  | BooleanLiteral
  | NothingLiteral
  | IdentifierExpr
  | DotExpression
  | BinaryExpression
  | UnaryExpression
  | ComparisonExpression
  | LogicalExpression
  | ListLiteral
  | MeExpression
  | ItExpression
  | AskExpression
  | CallExpression
  | DotCallExpression
  | MakeExpression
  | PropertyAccess
  | WhereExpression
  | EachMapExpression
  | ContainsExpression
  | RangeExpression
  | ParenExpression
  | MapLiteral
  | RandomExpression
  | TypeCheckExpression
  | RoundedExpression
  | ReadExpression
  | ThinkExpression
  | FetchExpression
  | RecallExpression
  | PairLiteral
  | SetLiteral
  | MapLiteralWithEntries
  | InterpolatedStringExpression
  | RegexMatchExpression
  | LambdaExpression
  | PipelineExpression
  | AwaitExpression
  | EnvExpression
  | DateTimeExpression
  | FormatExpression
  | CurryExpression
  | ComposeExpression
  | ExistsExpression
  | CsvParseExpression
  | JsonParseExpression
  | FilesExpression
  | ShellExpression
  | TouchesExpression;

export interface NumberLiteral {
  type: 'NumberLiteral';
  value: number;
}

export interface StringLiteral {
  type: 'StringLiteral';
  value: string;
}

export interface BooleanLiteral {
  type: 'BooleanLiteral';
  value: boolean;
}

export interface NothingLiteral {
  type: 'NothingLiteral';
}

export interface IdentifierExpr {
  type: 'Identifier';
  name: string;
}

export interface DotExpression {
  type: 'DotExpression';
  path: string[];
}

export interface BinaryExpression {
  type: 'BinaryExpression';
  op: string;
  left: Expression;
  right: Expression;
}

export interface UnaryExpression {
  type: 'UnaryExpression';
  op: string;
  operand: Expression;
}

export interface ComparisonExpression {
  type: 'ComparisonExpression';
  op: string;
  left: Expression;
  right: Expression;
}

export interface LogicalExpression {
  type: 'LogicalExpression';
  op: 'and' | 'or' | 'not';
  left?: Expression;
  right: Expression;
}

export interface ListLiteral {
  type: 'ListLiteral';
  items: Expression[];
}

export interface MeExpression {
  type: 'MeExpression';
}

export interface ItExpression {
  type: 'ItExpression';
}

export interface CallExpression {
  type: 'CallExpression';
  name: string;
  args: Expression[];
}

export interface DotCallExpression {
  type: 'DotCallExpression';
  object: Expression;
  method: string;
  args: Expression[];
}

export interface MakeExpression {
  type: 'MakeExpression';
  kindName: string;
  inlineProps?: { name: string; value: Expression }[];
}

export interface PropertyAccess {
  type: 'PropertyAccess';
  object: Expression;
  property: string;
}

export interface WhereExpression {
  type: 'WhereExpression';
  source: Expression;
  predicate: Expression;
}

export interface EachMapExpression {
  type: 'EachMapExpression';
  source: Expression;
  transform: Expression;
}

export interface ContainsExpression {
  type: 'ContainsExpression';
  collection: Expression;
  value: Expression;
}

export interface RangeExpression {
  type: 'RangeExpression';
  start: Expression;
  end: Expression;
}

export interface ParenExpression {
  type: 'ParenExpression';
  expr: Expression;
}

export interface MapLiteral {
  type: 'MapLiteral';
}

export interface RandomExpression {
  type: 'RandomExpression';
  variant: 'range' | 'pick' | 'float';
  start?: Expression;
  end?: Expression;
  source?: Expression;
}

export interface TypeCheckExpression {
  type: 'TypeCheckExpression';
  value: Expression;
  targetType: string;
  negated: boolean;
}

export interface RoundedExpression {
  type: 'RoundedExpression';
  value: Expression;
  decimals: Expression;
}

export interface ReadExpression {
  type: 'ReadExpression';
  path: Expression;
  asType?: 'list';
  line: number;
}

// --- AI ---
export interface ThinkExpression {
  type: 'ThinkExpression';
  prompt: Expression;
  line: number;
}

// --- HTTP ---
export interface FetchExpression {
  type: 'FetchExpression';
  url: Expression;
  options?: { method?: string; body?: Expression; headers?: Expression };
  line: number;
}

// --- Storage ---
export interface RememberStatement {
  type: 'RememberStatement';
  key: Expression;
  value: Expression;
  line: number;
}

export interface RecallExpression {
  type: 'RecallExpression';
  key: Expression;
  line: number;
}

export interface ForgetStatement {
  type: 'ForgetStatement';
  key: Expression;
  line: number;
}

// --- Web server ---
export interface ServeStatement {
  type: 'ServeStatement';
  port: Expression;
  line: number;
}

export interface RespondStatement {
  type: 'RespondStatement';
  value: Expression;
  statusCode?: Expression;
  line: number;
}

export interface RouteStatement {
  type: 'RouteStatement';
  method: string;
  path: Expression;
  body: ASTNode[];
  line: number;
}

// --- Packages ---
export interface GrabStatement {
  type: 'GrabStatement';
  module: string;
  line: number;
}

// --- Sharing ---
export interface ShareStatement {
  type: 'ShareStatement';
  target: Expression;
  line: number;
}

// --- Concurrency ---
export interface DoTogetherStatement {
  type: 'DoTogetherStatement';
  blocks: ASTNode[][];
  line: number;
}

// --- Events ---
export interface ListenStatement {
  type: 'ListenStatement';
  event: string;
  variable?: string;
  body: ASTNode[];
  line: number;
}

export interface EveryStatement {
  type: 'EveryStatement';
  interval: Expression;
  unit: string;
  body: ASTNode[];
  line: number;
}

// --- Data types ---
export interface PairLiteral {
  type: 'PairLiteral';
  first: Expression;
  second: Expression;
}

export interface SetLiteral {
  type: 'SetLiteral';
  items: Expression[];
}

export interface MapLiteralWithEntries {
  type: 'MapLiteralWithEntries';
  entries: { key: Expression; value: Expression }[];
}

export interface EnumDeclaration {
  type: 'EnumDeclaration';
  name: string;
  values: string[];
  line: number;
}

export interface DestructureStatement {
  type: 'DestructureStatement';
  variables: string[];
  source: Expression;
  line: number;
}

export interface ExistsExpression {
  type: 'ExistsExpression';
  target: Expression;
}

// --- String/Text ---
export interface InterpolatedStringExpression {
  type: 'InterpolatedStringExpression';
  parts: (string | Expression)[];
}

export interface RegexMatchExpression {
  type: 'RegexMatchExpression';
  value: Expression;
  pattern: Expression;
}

export interface FormatExpression {
  type: 'FormatExpression';
  value: Expression;
  places: Expression;
}

export interface FormatStatement {
  type: 'FormatStatement';
  value: Expression;
  places: Expression;
  line: number;
}

export interface TemplateDeclaration {
  type: 'TemplateDeclaration';
  name: string;
  params: string[];
  body: ASTNode[];
  line: number;
}

// --- Control flow ---
export interface PipelineExpression {
  type: 'PipelineExpression';
  stages: Expression[];
}

export interface AwaitExpression {
  type: 'AwaitExpression';
  value: Expression;
  line: number;
}

// --- OOP ---
export interface ContractDeclaration {
  type: 'ContractDeclaration';
  name: string;
  methods: string[];
  line: number;
}

// --- Functional ---
export interface LambdaExpression {
  type: 'LambdaExpression';
  params: string[];
  body: ASTNode[] | Expression;
  line: number;
}

export interface CurryExpression {
  type: 'CurryExpression';
  command: string;
  args: Expression[];
}

export interface ComposeExpression {
  type: 'ComposeExpression';
  functions: Expression[];
}

// --- I/O & System ---
export interface EnvExpression {
  type: 'EnvExpression';
  key: Expression;
}

export interface DateTimeExpression {
  type: 'DateTimeExpression';
  variant: 'now' | 'today' | 'date' | 'time' | 'year' | 'month' | 'day' | 'hour' | 'minute' | 'weekday';
}

export interface CsvParseExpression {
  type: 'CsvParseExpression';
  source: Expression;
  line: number;
}

export interface JsonParseExpression {
  type: 'JsonParseExpression';
  source: Expression;
  line: number;
}

export interface FilesExpression {
  type: 'FilesExpression';
  path: Expression;
  line: number;
}

export interface ShellExpression {
  type: 'ShellExpression';
  command: Expression;
  line: number;
}

// --- Graphics enhancements ---
export interface AnimateStatement {
  type: 'AnimateStatement';
  target: string;
  property: string;
  from: Expression;
  to: Expression;
  duration: Expression;
  line: number;
}

export interface TurtleStatement {
  type: 'TurtleStatement';
  action: 'forward' | 'backward' | 'left' | 'right' | 'penup' | 'pendown' | 'home' | 'reset';
  value?: Expression;
  line: number;
}

export interface SwitchSceneStatement {
  type: 'SwitchSceneStatement';
  scene: Expression;
  line: number;
}

export interface TouchesExpression {
  type: 'TouchesExpression';
  left: Expression;
  right: Expression;
}

// --- Web enhancements ---
export interface ConnectStatement {
  type: 'ConnectStatement';
  url: Expression;
  alias: string;
  line: number;
}

export interface EmitStatement {
  type: 'EmitStatement';
  event: Expression;
  data?: Expression;
  target?: string;
  line: number;
}

export interface CookieStatement {
  type: 'CookieStatement';
  action: 'set' | 'get' | 'delete';
  name: Expression;
  value?: Expression;
  line: number;
}

export interface AllowStatement {
  type: 'AllowStatement';
  origin: Expression;
  line: number;
}

export interface StreamStatement {
  type: 'StreamStatement';
  data: Expression;
  interval?: Expression;
  line: number;
}

// --- Testing enhancements ---
export interface MockStatement {
  type: 'MockStatement';
  target: string;
  returnValue: Expression;
  line: number;
}

export interface BeforeBlock {
  type: 'BeforeBlock';
  body: ASTNode[];
  line: number;
}

export interface AfterBlock {
  type: 'AfterBlock';
  body: ASTNode[];
  line: number;
}

export interface SnapshotCheck {
  type: 'SnapshotCheck';
  expression: Expression;
  name: string;
  line: number;
}

export interface BenchmarkBlock {
  type: 'BenchmarkBlock';
  name: string;
  body: ASTNode[];
  line: number;
}

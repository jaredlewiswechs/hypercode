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
  | WriteStatement;

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
  body: ASTNode[];
  line: number;
}

export interface ForEachStatement {
  type: 'ForEachStatement';
  variable: string;
  indexVariable?: string;
  iterable: Expression;
  body: ASTNode[];
  line: number;
}

export interface KindDeclaration {
  type: 'KindDeclaration';
  name: string;
  parent?: string;
  fields: { name: string; defaultValue: Expression }[];
  methods: OnHandler[];
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
  body: ASTNode[];
  line: number;
}

export interface ReturnStatement {
  type: 'ReturnStatement';
  value: Expression;
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
  | ReadExpression;

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

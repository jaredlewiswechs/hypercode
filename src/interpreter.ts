import * as AST from './ast';
import { Lexer } from './lexer';
import { Parser } from './parser';
import { createCanvas, addDrawCommand, setCanvasColor, clearCanvas, canvasToSVG, canvasToText, CanvasState } from './graphics';
import { Storage } from './storage';
import { AIEngine, AIOptions } from './ai';
import { SayServer, RequestInfo, ResponseInfo } from './server';

export class ReturnSignal {
  constructor(public value: SayValue) {}
}

export class StopSignal {
  constructor(public label?: string) {}
}

export class CheckFailure extends Error {
  constructor(message: string, public line: number) {
    super(message);
  }
}

export type SayValue = number | string | boolean | null | SayList | SayMap | SayInstance | SayKind | SayUIElement | SaySet | SayPair | SayEnum | SayLambda | undefined;

export class SayList {
  items: SayValue[];

  constructor(items: SayValue[] = []) {
    this.items = [...items];
  }

  get first(): SayValue { return this.items[0] ?? null; }
  get last(): SayValue { return this.items[this.items.length - 1] ?? null; }
  get count(): number { return this.items.length; }
  get sum(): number { return this.items.reduce((a: number, b) => a + toNumber(b), 0); }
  get average(): number { return this.count > 0 ? this.sum / this.count : 0; }
  get max(): number { return Math.max(...this.items.map(toNumber)); }
  get min(): number { return Math.min(...this.items.map(toNumber)); }

  at(index: number): SayValue {
    return this.items[index - 1] ?? null; // 1-based indexing
  }

  add(value: SayValue): void {
    this.items.push(value);
  }

  remove(value: SayValue): void {
    const idx = this.items.findIndex(item => valuesEqual(item, value));
    if (idx !== -1) this.items.splice(idx, 1);
  }

  contains(value: SayValue): boolean {
    return this.items.some(item => valuesEqual(item, value));
  }

  sort(): void {
    this.items.sort((a, b) => {
      const sa = toString(a);
      const sb = toString(b);
      if (typeof a === 'number' && typeof b === 'number') return a - b;
      return sa.localeCompare(sb);
    });
  }

  reverse(): void {
    this.items.reverse();
  }

  shuffle(): void {
    for (let i = this.items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }
  }

  toString(): string {
    return this.items.map(toString).join(', ');
  }
}

export class SayMap {
  entries: Map<string, SayValue>;

  constructor() {
    this.entries = new Map();
  }

  get(key: string): SayValue {
    return this.entries.get(key) ?? null;
  }

  set(key: string, value: SayValue): void {
    this.entries.set(key, value);
  }

  has(key: string): boolean {
    return this.entries.has(key);
  }

  remove(key: string): boolean {
    return this.entries.delete(key);
  }

  get count(): number {
    return this.entries.size;
  }

  get keys(): SayList {
    return new SayList(Array.from(this.entries.keys()));
  }

  get values(): SayList {
    return new SayList(Array.from(this.entries.values()));
  }

  toString(): string {
    const parts: string[] = [];
    for (const [k, v] of this.entries) {
      parts.push(`${k}: ${toString(v)}`);
    }
    return `{${parts.join(', ')}}`;
  }
}

export class SayKind {
  name: string;
  parent?: SayKind;
  fields: Map<string, SayValue>;
  methods: Map<string, AST.OnHandler>;

  constructor(name: string, parent?: SayKind) {
    this.name = name;
    this.parent = parent;
    this.fields = new Map();
    this.methods = new Map();

    // Inherit from parent
    if (parent) {
      for (const [k, v] of parent.fields) this.fields.set(k, v);
      for (const [k, v] of parent.methods) this.methods.set(k, v);
    }
  }
}

export class SayInstance {
  kind: SayKind;
  properties: Map<string, SayValue>;
  methods: Map<string, AST.OnHandler>;

  constructor(kind: SayKind) {
    this.kind = kind;
    this.properties = new Map();
    this.methods = new Map();

    // Copy defaults from kind
    for (const [k, v] of kind.fields) {
      this.properties.set(k, v);
    }
    for (const [k, v] of kind.methods) {
      this.methods.set(k, v);
    }
  }

  get(property: string): SayValue {
    return this.properties.get(property) ?? null;
  }

  set(property: string, value: SayValue): void {
    this.properties.set(property, value);
  }

  toString(): string {
    const props: string[] = [];
    for (const [k, v] of this.properties) {
      props.push(`${k}: ${toString(v)}`);
    }
    return `${this.kind.name} (${props.join(', ')})`;
  }
}

export class SayUIElement {
  elementType: string;
  properties: Map<string, SayValue>;

  constructor(type: string) {
    this.elementType = type;
    this.properties = new Map();
  }

  get(property: string): SayValue {
    return this.properties.get(property) ?? null;
  }

  set(property: string, value: SayValue): void {
    this.properties.set(property, value);
  }

  toString(): string {
    return `[${this.elementType}]`;
  }
}

export class SaySet {
  items: Set<string>; // stored as stringified for comparison
  rawItems: SayValue[];

  constructor(items: SayValue[] = []) {
    this.items = new Set();
    this.rawItems = [];
    for (const item of items) {
      const key = toString(item);
      if (!this.items.has(key)) {
        this.items.add(key);
        this.rawItems.push(item);
      }
    }
  }

  add(value: SayValue): void {
    const key = toString(value);
    if (!this.items.has(key)) {
      this.items.add(key);
      this.rawItems.push(value);
    }
  }

  has(value: SayValue): boolean {
    return this.items.has(toString(value));
  }

  remove(value: SayValue): void {
    const key = toString(value);
    if (this.items.has(key)) {
      this.items.delete(key);
      this.rawItems = this.rawItems.filter(v => toString(v) !== key);
    }
  }

  get count(): number { return this.rawItems.length; }

  toList(): SayList { return new SayList([...this.rawItems]); }

  toString(): string {
    return `{${this.rawItems.map(toString).join(', ')}}`;
  }
}

export class SayPair {
  first: SayValue;
  second: SayValue;

  constructor(first: SayValue, second: SayValue) {
    this.first = first;
    this.second = second;
  }

  toString(): string {
    return `(${toString(this.first)}, ${toString(this.second)})`;
  }
}

export class SayEnum {
  name: string;
  values: string[];

  constructor(name: string, values: string[]) {
    this.name = name;
    this.values = values;
  }

  has(value: string): boolean {
    return this.values.includes(value.toLowerCase());
  }

  toString(): string {
    return `[Enum ${this.name}: ${this.values.join(', ')}]`;
  }
}

export class SayLambda {
  params: string[];
  body: AST.ASTNode[] | AST.Expression;
  closure: Environment;

  constructor(params: string[], body: AST.ASTNode[] | AST.Expression, closure: Environment) {
    this.params = params;
    this.body = body;
    this.closure = closure;
  }

  toString(): string {
    return `[Lambda (${this.params.join(', ')})]`;
  }
}

export class Environment {
  private values: Map<string, SayValue> = new Map();
  private parent: Environment | null;

  constructor(parent: Environment | null = null) {
    this.parent = parent;
  }

  get(name: string): SayValue {
    if (this.values.has(name)) return this.values.get(name)!;
    if (this.parent) return this.parent.get(name);
    return undefined;
  }

  set(name: string, value: SayValue): void {
    // Check if it exists in any parent scope
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

  has(name: string): boolean {
    if (this.values.has(name)) return true;
    if (this.parent) return this.parent.has(name);
    return false;
  }

  define(name: string, value: SayValue): void {
    this.values.set(name, value);
  }
}

export interface InterpreterOptions {
  output?: (text: string) => void;
  input?: (prompt: string) => string | Promise<string>;
  maxIterations?: number;
  readFile?: (path: string) => string | Promise<string>;
  writeFile?: (path: string, content: string) => void | Promise<void>;
  appendFile?: (path: string, content: string) => void | Promise<void>;
  aiOptions?: AIOptions;
  storagePath?: string;
  httpFetch?: (url: string, options?: any) => Promise<any>;
  strict?: boolean;
}

export class Interpreter {
  private env: Environment;
  private globalEnv: Environment;
  private kinds: Map<string, SayKind> = new Map();
  private commands: Map<string, AST.CommandDeclaration> = new Map();
  private handlers: Map<string, AST.OnHandler> = new Map();
  private testResults: { name: string; passed: boolean; error?: string }[] = [];
  private output: (text: string) => void;
  private input: (prompt: string) => string | Promise<string>;
  private maxIterations: number;
  private itValue: SayValue = null;
  private readFile: (path: string) => string | Promise<string>;
  private writeFile: (path: string, content: string) => void | Promise<void>;
  private appendFile: (path: string, content: string) => void | Promise<void>;
  private aiEngine: AIEngine;
  private storage: Storage | null = null;
  private storagePath: string | undefined;
  private httpFetch: (url: string, options?: any) => Promise<any>;
  private strict: boolean;
  private canvases: Map<string, CanvasState> = new Map();
  private server: SayServer | null = null;
  private eventListeners: Map<string, { variable?: string; body: AST.ASTNode[] }[]> = new Map();
  private timers: NodeJS.Timeout[] = [];
  private contracts: Map<string, string[]> = new Map();
  private enums: Map<string, SayEnum> = new Map();
  private mocks: Map<string, SayValue> = new Map();
  private beforeBlocks: AST.ASTNode[][] = [];
  private afterBlocks: AST.ASTNode[][] = [];
  private turtleState = { x: 200, y: 200, angle: 0, penDown: true, color: '#000000' };
  private scenes: Map<string, AST.ASTNode[]> = new Map();
  private currentScene: string = 'main';
  private snapshots: Map<string, string> = new Map();
  private templates: Map<string, { params: string[]; body: AST.ASTNode[] }> = new Map();

  constructor(options: InterpreterOptions = {}) {
    this.globalEnv = new Environment();
    this.env = this.globalEnv;
    this.output = options.output || ((text: string) => console.log(text));
    this.input = options.input || (() => '');
    this.maxIterations = options.maxIterations || 100000;
    this.readFile = options.readFile || (() => { throw new Error('File reading not available'); });
    this.writeFile = options.writeFile || (() => { throw new Error('File writing not available'); });
    this.appendFile = options.appendFile || (() => { throw new Error('File appending not available'); });
    this.aiEngine = new AIEngine(options.aiOptions);
    this.storagePath = options.storagePath;
    this.httpFetch = options.httpFetch || (typeof globalThis.fetch === 'function' ? globalThis.fetch.bind(globalThis) : async () => { throw new Error('HTTP fetch not available'); });
    this.strict = options.strict || false;
    this.registerBuiltins();
  }

  private registerBuiltins(): void {
    // Math module
    const mathModule = new SayInstance(new SayKind('Module'));
    mathModule.set('pi', Math.PI);
    mathModule.set('e', Math.E);
    mathModule.set('infinity', Infinity);
    this.globalEnv.define('math', mathModule);

    // Default canvas
    this.canvases.set('canvas', createCanvas());
  }

  async run(program: AST.Program): Promise<void> {
    for (const node of program.body) {
      await this.execute(node);
    }
  }

  async runTests(program: AST.Program): Promise<{ name: string; passed: boolean; error?: string }[]> {
    this.testResults = [];

    // First pass: register kinds, commands, etc.
    for (const node of program.body) {
      if (node.type !== 'TestBlock') {
        await this.execute(node);
      }
    }

    // Second pass: run tests
    for (const node of program.body) {
      if (node.type === 'TestBlock') {
        await this.executeTest(node);
      }
    }

    return this.testResults;
  }

  private async execute(node: AST.ASTNode): Promise<SayValue> {
    switch (node.type) {
      case 'PutStatement': return this.executePut(node);
      case 'SetStatement': return this.executeSet(node);
      case 'ShowStatement': return this.executeShow(node);
      case 'AskExpression': return this.executeAsk(node);
      case 'IfStatement': return this.executeIf(node);
      case 'RepeatStatement': return this.executeRepeat(node);
      case 'ForEachStatement': return this.executeForEach(node);
      case 'KindDeclaration': return this.executeKind(node);
      case 'MakeStatement': return this.executeMakeStmt(node);
      case 'SendStatement': return this.executeSend(node);
      case 'OnHandler': return this.executeOnHandler(node);
      case 'CommandDeclaration': return this.executeCommandDecl(node);
      case 'ReturnStatement': {
        if (node.condition) {
          const cond = await this.evaluate(node.condition);
          if (isTruthy(cond)) {
            throw new ReturnSignal(await this.evaluate(node.value));
          }
          return null;
        }
        throw new ReturnSignal(await this.evaluate(node.value));
      }
      case 'AddStatement': return this.executeAdd(node);
      case 'RemoveStatement': return this.executeRemove(node);
      case 'SortStatement': return this.executeSort(node);
      case 'ReverseStatement': return this.executeReverseStmt(node);
      case 'ShuffleStatement': return this.executeShuffleStmt(node);
      case 'TryStatement': return this.executeTry(node);
      case 'UseStatement': return this.executeUse(node);
      case 'TestBlock': return this.executeTest(node);
      case 'CheckStatement': return this.executeCheck(node);
      case 'ExplainStatement': return this.executeExplain(node);
      case 'InspectExpression': return this.executeInspect(node);
      case 'StopStatement': throw new StopSignal(node.label);
      case 'WaitStatement': return this.executeWait(node);
      case 'DrawStatement': return this.executeDraw(node);
      case 'ClearStatement': return this.executeClear(node);
      case 'GoStatement': return null;
      case 'OpenStatement': return null;
      case 'HideStatement': return null;
      case 'PlayStatement': return this.executePlay(node);
      case 'ExpressionStatement': return this.evaluate(node.expression);
      case 'ListLiteralMultiline': return this.executeListMultiline(node);
      case 'WhenStatement': return this.executeWhen(node);
      case 'WriteStatement': return this.executeWrite(node);
      case 'RememberStatement': return this.executeRemember(node);
      case 'ForgetStatement': return this.executeForget(node);
      case 'ServeStatement': return this.executeServe(node);
      case 'RespondStatement': return this.executeRespond(node);
      case 'RouteStatement': return this.executeRoute(node);
      case 'GrabStatement': return this.executeGrab(node);
      case 'ShareStatement': return this.executeShare(node);
      case 'DoTogetherStatement': return this.executeDoTogether(node);
      case 'ListenStatement': return this.executeListen(node);
      case 'EveryStatement': return this.executeEvery(node);
      case 'ContractDeclaration': return this.executeContract(node);
      case 'EnumDeclaration': return this.executeEnum(node);
      case 'DestructureStatement': return this.executeDestructure(node);
      case 'MockStatement': return this.executeMock(node);
      case 'BeforeBlock': this.beforeBlocks.push(node.body); return null;
      case 'AfterBlock': this.afterBlocks.push(node.body); return null;
      case 'SnapshotCheck': return this.executeSnapshot(node);
      case 'BenchmarkBlock': return this.executeBenchmark(node);
      case 'AnimateStatement': return this.executeAnimate(node);
      case 'TurtleStatement': return this.executeTurtle(node);
      case 'SwitchSceneStatement': return this.executeSwitchScene(node);
      case 'ConnectStatement': return this.executeConnect(node);
      case 'EmitStatement': return this.executeEmitStmt(node);
      case 'CookieStatement': return this.executeCookieStmt(node);
      case 'AllowStatement': return this.executeAllow(node);
      case 'StreamStatement': return this.executeStreamStmt(node);
      case 'TemplateDeclaration': return this.executeTemplateDecl(node);
      case 'FormatStatement': return this.executeFormatStmt(node);
      default:
        return null;
    }
  }

  private async executePut(node: AST.PutStatement): Promise<SayValue> {
    const value = await this.evaluate(node.value);
    await this.assignTarget(node.target, value);
    return value;
  }

  private async executeSet(node: AST.SetStatement): Promise<SayValue> {
    const value = await this.evaluate(node.value);
    await this.assignTarget(node.target, value);
    return value;
  }

  private async executeShow(node: AST.ShowStatement): Promise<SayValue> {
    const pieces: string[] = [];
    for (const part of node.parts) {
      switch (part.type) {
        case 'text':
          pieces.push(part.value);
          break;
        case 'interpolation': {
          const val = this.resolvePath(part.path);
          pieces.push(toString(val));
          break;
        }
        case 'expression': {
          const val = await this.evaluate(part.expr);
          pieces.push(toString(val));
          break;
        }
      }
    }
    // Join pieces, but don't add space before punctuation
    let showResult = '';
    for (let i = 0; i < pieces.length; i++) {
      if (i > 0 && !/^[!?,.:;]/.test(pieces[i])) {
        showResult += ' ';
      }
      showResult += pieces[i];
    }
    this.output(showResult);
    return null;
  }

  private async executeAsk(node: AST.AskExpression): Promise<SayValue> {
    // Interpolate .dotIdentifier references in the prompt
    const prompt = node.prompt.replace(/\.([a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*)/g, (_match, path: string) => {
      const parts = path.split('.');
      let val: SayValue = this.env.get(parts[0]) ?? null;
      for (let i = 1; i < parts.length; i++) {
        if (val instanceof SayInstance) {
          val = val.get(parts[i]);
        } else {
          return _match; // can't resolve, keep original
        }
      }
      return toString(val);
    });
    const answer = await this.input(prompt);
    this.itValue = answer;
    this.env.set('it', answer);
    return answer;
  }

  private async executeIf(node: AST.IfStatement): Promise<SayValue> {
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

  private async executeRepeat(node: AST.RepeatStatement): Promise<SayValue> {
    let iterations = 0;

    const shouldStop = (e: unknown) => {
      if (e instanceof StopSignal) {
        if (!e.label || e.label === node.label) return true;
        throw e; // propagate labeled stop to outer loop
      }
      throw e;
    };

    switch (node.variant) {
      case 'times': {
        const count = toNumber(await this.evaluate(node.count!));
        const childEnv = node.counterVariable ? new Environment(this.env) : null;
        const prevEnv = this.env;
        if (childEnv) this.env = childEnv;
        try {
          for (let i = 0; i < count; i++) {
            if (++iterations > this.maxIterations) throw new Error('Maximum iterations exceeded');
            if (node.counterVariable && childEnv) {
              childEnv.define(node.counterVariable, i + 1); // 1-based
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
      case 'while': {
        while (isTruthy(await this.evaluate(node.condition!))) {
          if (++iterations > this.maxIterations) throw new Error('Maximum iterations exceeded');
          try {
            await this.executeBlock(node.body);
          } catch (e) {
            if (shouldStop(e)) break;
          }
        }
        break;
      }
      case 'until': {
        while (!isTruthy(await this.evaluate(node.condition!))) {
          if (++iterations > this.maxIterations) throw new Error('Maximum iterations exceeded');
          try {
            await this.executeBlock(node.body);
          } catch (e) {
            if (shouldStop(e)) break;
          }
        }
        break;
      }
      case 'forever': {
        while (true) {
          if (++iterations > this.maxIterations) throw new Error('Maximum iterations exceeded');
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

  private async executeForEach(node: AST.ForEachStatement): Promise<SayValue> {
    const iterable = await this.evaluate(node.iterable);
    let items: SayValue[];

    if (iterable instanceof SayList) {
      items = iterable.items;
    } else if (iterable instanceof SaySet) {
      items = iterable.rawItems;
    } else if (Array.isArray(iterable)) {
      items = iterable;
    } else {
      items = [iterable];
    }

    // Apply step if specified (for range iterations)
    if (node.step) {
      const stepVal = toNumber(await this.evaluate(node.step));
      if (stepVal > 1) {
        const stepped: SayValue[] = [];
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
          childEnv.define(node.indexVariable, i + 1); // 1-based
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

  private async executeKind(node: AST.KindDeclaration): Promise<SayValue> {
    let parentKind: SayKind | undefined;
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

  private async executeMakeStmt(node: AST.MakeStatement): Promise<SayValue> {
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

  private async executeSend(node: AST.SendStatement): Promise<SayValue> {
    const target = await this.evaluate(node.target);
    if (!(target instanceof SayInstance)) {
      throw new Error(`Cannot send message to non-instance: ${toString(target)}`);
    }

    const method = target.methods.get(node.message);
    if (!method) throw new Error(`Unknown method: ${node.message} on ${target.kind.name}`);

    const args: SayValue[] = [];
    for (const arg of node.args) {
      args.push(await this.evaluate(arg));
    }

    return this.callMethod(target, method, args);
  }

  private async callMethod(instance: SayInstance, method: AST.OnHandler, args: SayValue[]): Promise<SayValue> {
    const methodEnv = new Environment(this.env);
    methodEnv.define('me', instance);

    for (let i = 0; i < method.params.length; i++) {
      methodEnv.define(method.params[i], args[i] ?? null);
    }

    const prevEnv = this.env;
    this.env = methodEnv;
    let result: SayValue = null;

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

  private executeOnHandler(node: AST.OnHandler): SayValue {
    this.handlers.set(node.name, node);
    return null;
  }

  private executeCommandDecl(node: AST.CommandDeclaration): SayValue {
    this.commands.set(node.name, node);
    return null;
  }

  private async executeAdd(node: AST.AddStatement): Promise<SayValue> {
    const value = await this.evaluate(node.value);
    const target = await this.evaluate(node.target);

    if (target instanceof SayList) {
      target.add(value);
    } else if (target instanceof SaySet) {
      target.add(value);
    } else if (target instanceof SayUIElement) {
      // UI stub - add child
    }

    return null;
  }

  private async executeRemove(node: AST.RemoveStatement): Promise<SayValue> {
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

  private async executeSort(node: AST.SortStatement): Promise<SayValue> {
    const target = await this.evaluate(node.target);
    if (target instanceof SayList) target.sort();
    return null;
  }

  private async executeReverseStmt(node: AST.ReverseStatement): Promise<SayValue> {
    const target = await this.evaluate(node.target);
    if (target instanceof SayList) target.reverse();
    return null;
  }

  private async executeShuffleStmt(node: AST.ShuffleStatement): Promise<SayValue> {
    const target = await this.evaluate(node.target);
    if (target instanceof SayList) target.shuffle();
    return null;
  }

  private async executeTry(node: AST.TryStatement): Promise<SayValue> {
    try {
      await this.executeBlock(node.body);
    } catch (e) {
      if (e instanceof ReturnSignal || e instanceof StopSignal) throw e;

      if (node.catchVar) {
        const errorObj = new SayInstance(new SayKind('Error'));
        errorObj.set('message', e instanceof Error ? e.message : String(e));
        errorObj.set('line', node.line);

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

  private async executeUse(node: AST.UseStatement): Promise<SayValue> {
    // Built-in modules
    if (node.module === 'math') return null; // already loaded

    // File imports
    const tryImport = async (filePath: string): Promise<boolean> => {
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

    if (node.module.endsWith('.say') || node.module.endsWith('.hypercode')) {
      await tryImport(node.module);
      return null;
    }

    // Try adding .say extension
    if (!(await tryImport(node.module + '.say'))) {
      await tryImport(node.module + '.hypercode');
    }

    return null;
  }

  private async executeTest(node: AST.TestBlock): Promise<SayValue> {
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

  private async executeCheck(node: AST.CheckStatement): Promise<SayValue> {
    const result = await this.evaluate(node.expression);
    if (!isTruthy(result)) {
      throw new CheckFailure(`Check failed at line ${node.line}`, node.line);
    }
    return null;
  }

  private async executeExplain(node: AST.ExplainStatement): Promise<SayValue> {
    const target = await this.evaluate(node.target);
    if (target instanceof SayInstance) {
      const props: string[] = [];
      for (const [k, v] of target.properties) {
        props.push(`${k}: ${toString(v)}`);
      }
      const methods = Array.from(target.methods.keys()).join(', ');
      this.output(`${target.kind.name} with ${props.join(', ')}`);
      if (methods) this.output(`Can: ${methods}`);
    } else if (target instanceof SayKind) {
      const fields = Array.from(target.fields.keys()).join(', ');
      const methods = Array.from(target.methods.keys()).join(', ');
      this.output(`Kind ${target.name} with: ${fields} | on: ${methods}`);
    } else {
      this.output(`${typeof target}: ${toString(target)}`);
    }
    return null;
  }

  private async executeInspect(node: AST.InspectExpression): Promise<SayValue> {
    const target = await this.evaluate(node.target);
    if (target instanceof SayInstance) {
      this.output(target.toString());
    } else if (target instanceof SayMap) {
      this.output(`Map (${target.toString()}) count: ${target.count}`);
    } else if (target instanceof SayList) {
      this.output(`List (${target.toString()}) count: ${target.count}`);
    } else if (target instanceof SayKind) {
      const fields = Array.from(target.fields.keys()).join(', ');
      const methods = Array.from(target.methods.keys()).join(', ');
      this.output(`Kind with: ${fields} | on: ${methods}`);
    } else if (typeof target === 'number') {
      this.output(`Number: ${target}`);
    } else if (typeof target === 'string') {
      this.output(`Text: ${target}`);
    } else if (typeof target === 'boolean') {
      this.output(`Boolean: ${target}`);
    } else {
      this.output(`${toString(target)}`);
    }
    return null;
  }

  private async executeWait(node: AST.WaitStatement): Promise<SayValue> {
    const duration = toNumber(await this.evaluate(node.duration));
    const ms = node.unit === 'milliseconds' || node.unit === 'ms' ? duration : duration * 1000;
    await new Promise(resolve => setTimeout(resolve, ms));
    return null;
  }

  private async executeListMultiline(node: AST.ListLiteralMultiline): Promise<SayValue> {
    const items: SayValue[] = [];
    for (const item of node.items) {
      items.push(await this.evaluate(item));
    }
    const list = new SayList(items);
    this.env.set(node.target, list);
    return list;
  }

  private async executeWrite(node: AST.WriteStatement): Promise<SayValue> {
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
  private async executeDraw(node: AST.DrawStatement): Promise<SayValue> {
    const canvasName = node.canvas || 'canvas';
    if (!this.canvases.has(canvasName)) {
      this.canvases.set(canvasName, createCanvas());
    }
    const canvas = this.canvases.get(canvasName)!;

    // Resolve params
    const params: Record<string, any> = {};
    for (const [key, expr] of Object.entries(node.params)) {
      params[key] = await this.evaluate(expr);
    }

    // Handle 'at x, y' param as coordinates
    if (params.at !== undefined) {
      const val = params.at;
      if (val instanceof SayList && val.items.length >= 2) {
        params.x = toNumber(val.items[0]);
        params.y = toNumber(val.items[1]);
      } else {
        params.x = toNumber(val);
        // Check if next param exists for y
      }
      delete params.at;
    }

    // Handle 'from' and 'to' for lines
    if (params.from !== undefined) {
      const val = params.from;
      if (val instanceof SayList && val.items.length >= 2) {
        params.x1 = toNumber(val.items[0]);
        params.y1 = toNumber(val.items[1]);
      }
      delete params.from;
    }
    if (params.to !== undefined) {
      const val = params.to;
      if (val instanceof SayList && val.items.length >= 2) {
        params.x2 = toNumber(val.items[0]);
        params.y2 = toNumber(val.items[1]);
      }
      delete params.to;
    }

    addDrawCommand(canvas, node.shape, params);
    this.output(canvasToText(canvas).split('\n').pop() || '');
    return null;
  }

  private executeClear(node: AST.ClearStatement): SayValue {
    const canvasName = node.target || 'canvas';
    if (this.canvases.has(canvasName)) {
      clearCanvas(this.canvases.get(canvasName)!);
    }
    return null;
  }

  private executePlay(node: AST.PlayStatement): SayValue {
    this.output(`♪ Playing sound: ${node.sound}`);
    return null;
  }

  // --- Storage ---
  private getStorage(): Storage {
    if (!this.storage) {
      this.storage = new Storage(this.storagePath);
    }
    return this.storage;
  }

  private async executeRemember(node: AST.RememberStatement): Promise<SayValue> {
    const key = toString(await this.evaluate(node.key));
    const value = await this.evaluate(node.value);
    const storage = this.getStorage();
    storage.remember(key, this.sayValueToJson(value));
    return null;
  }

  private async executeForget(node: AST.ForgetStatement): Promise<SayValue> {
    const key = toString(await this.evaluate(node.key));
    const storage = this.getStorage();
    storage.forget(key);
    return null;
  }

  // --- Web server ---
  private async executeServe(node: AST.ServeStatement): Promise<SayValue> {
    const port = toNumber(await this.evaluate(node.port));
    this.server = new SayServer(this.output);
    await this.server.start(port);
    return null;
  }

  private async executeRespond(node: AST.RespondStatement): Promise<SayValue> {
    // This sets a response value in the current environment for the route handler
    const value = toString(await this.evaluate(node.value));
    const status = node.statusCode ? toNumber(await this.evaluate(node.statusCode)) : 200;
    this.env.set('__response_body', value);
    this.env.set('__response_status', status);
    return null;
  }

  private async executeRoute(node: AST.RouteStatement): Promise<SayValue> {
    if (!this.server) {
      throw new Error('No server running. Use "serve on port N" first.');
    }
    const routePath = toString(await this.evaluate(node.path));
    const body = node.body;
    const interpreter = this;

    this.server.addRoute(node.method, routePath, async (req: RequestInfo): Promise<ResponseInfo> => {
      const routeEnv = new Environment(interpreter.env);
      routeEnv.define('path', req.path);
      routeEnv.define('method', req.method);
      routeEnv.define('body', req.body);
      routeEnv.define('__response_body', 'OK');
      routeEnv.define('__response_status', 200);

      // Set query params
      const queryMap = new SayMap();
      for (const [k, v] of Object.entries(req.query)) {
        queryMap.set(k, v);
      }
      routeEnv.define('query', queryMap);

      const prevEnv = interpreter.env;
      interpreter.env = routeEnv;
      try {
        await interpreter.executeBlock(body);
      } catch (e) {
        // Ignore return signals in route handlers
      } finally {
        interpreter.env = prevEnv;
      }

      return {
        body: toString(routeEnv.get('__response_body')),
        status: toNumber(routeEnv.get('__response_status')),
        headers: {},
      };
    });

    return null;
  }

  // --- Packages ---
  private async executeGrab(node: AST.GrabStatement): Promise<SayValue> {
    // Try to load from a packages/ directory
    const tryPaths = [
      `packages/${node.module}/index.say`,
      `packages/${node.module}.say`,
      `node_modules/${node.module}/index.say`,
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
  private async executeShare(node: AST.ShareStatement): Promise<SayValue> {
    const target = toString(await this.evaluate(node.target));
    this.output(`Sharing: ${target}`);
    this.output('To share files, use the CLI: say share myfile.say');
    return null;
  }

  // --- Concurrency ---
  private async executeDoTogether(node: AST.DoTogetherStatement): Promise<SayValue> {
    // Run each block in its own child environment sequentially.
    // True parallel execution is not possible in single-threaded JS
    // without a separate interpreter instance per block, and Promise.all
    // causes env trampling when blocks interleave at await points.
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
  private async executeListen(node: AST.ListenStatement): Promise<SayValue> {
    const listeners = this.eventListeners.get(node.event) || [];
    listeners.push({ variable: node.variable, body: node.body });
    this.eventListeners.set(node.event, listeners);
    this.output(`Listening for "${node.event}" events`);
    return null;
  }

  private async executeEvery(node: AST.EveryStatement): Promise<SayValue> {
    const interval = toNumber(await this.evaluate(node.interval));
    const ms = node.unit === 'milliseconds' || node.unit === 'ms' ? interval : interval * 1000;

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
  async emitEvent(event: string, data?: SayValue): Promise<void> {
    const listeners = this.eventListeners.get(event) || [];
    for (const listener of listeners) {
      const eventEnv = new Environment(this.env);
      if (listener.variable && data !== undefined) {
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
  getCanvasSVG(name: string = 'canvas'): string | null {
    const canvas = this.canvases.get(name);
    if (!canvas || canvas.commands.length === 0) return null;
    return canvasToSVG(canvas);
  }

  // --- When with type matching ---
  private async executeWhen(node: AST.WhenStatement): Promise<SayValue> {
    const target = await this.evaluate(node.target);
    for (const c of node.cases) {
      // Check for type matching (is a KindName)
      if (c.value.type === 'TypeCheckExpression' && (c.value as AST.TypeCheckExpression).value.type === 'StringLiteral' && ((c.value as AST.TypeCheckExpression).value as AST.StringLiteral).value === '__when_type_check__') {
        const typeCheck = c.value as AST.TypeCheckExpression;
        let matches = false;
        switch (typeCheck.targetType) {
          case 'number': matches = typeof target === 'number'; break;
          case 'text': matches = typeof target === 'string'; break;
          case 'list': matches = target instanceof SayList; break;
          case 'map': matches = target instanceof SayMap; break;
          case 'boolean': matches = typeof target === 'boolean'; break;
          case 'nothing': matches = target === null || target === undefined; break;
          default: {
            if (target instanceof SayInstance) {
              matches = target.kind.name === typeCheck.targetType;
              if (!matches) {
                let parent = target.kind.parent;
                while (parent) {
                  if (parent.name === typeCheck.targetType) { matches = true; break; }
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
      } else if (c.value.type === 'LogicalExpression' && (c.value as AST.LogicalExpression).op === 'or') {
        // When "is X or Y" — check if target matches any of the or-values
        const values = this.flattenOr(c.value as AST.LogicalExpression);
        let matched = false;
        for (const v of values) {
          const caseValue = await this.evaluate(v);
          if (valuesEqual(target, caseValue)) { matched = true; break; }
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
  cleanup(): void {
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
  private jsonToSayValue(val: any): SayValue {
    if (val === null || val === undefined) return null;
    if (typeof val === 'number') return val;
    if (typeof val === 'string') return val;
    if (typeof val === 'boolean') return val;
    if (Array.isArray(val)) {
      return new SayList(val.map(item => this.jsonToSayValue(item)));
    }
    if (typeof val === 'object') {
      const map = new SayMap();
      for (const [k, v] of Object.entries(val)) {
        map.set(k, this.jsonToSayValue(v));
      }
      return map;
    }
    return toString(val);
  }

  private sayValueToJson(val: SayValue): any {
    if (val === null || val === undefined) return null;
    if (typeof val === 'number' || typeof val === 'string' || typeof val === 'boolean') return val;
    if (val instanceof SayList) return val.items.map(item => this.sayValueToJson(item));
    if (val instanceof SayMap) {
      const obj: Record<string, any> = {};
      for (const [k, v] of val.entries) {
        obj[k] = this.sayValueToJson(v);
      }
      return obj;
    }
    if (val instanceof SayInstance) {
      const obj: Record<string, any> = { __kind: val.kind.name };
      for (const [k, v] of val.properties) {
        obj[k] = this.sayValueToJson(v);
      }
      return obj;
    }
    return String(val);
  }

  private async executeBlock(body: AST.ASTNode[]): Promise<SayValue> {
    let result: SayValue = null;
    for (const node of body) {
      result = await this.execute(node);
    }
    return result;
  }

  // ---- Expression evaluation ----

  async evaluate(node: AST.Expression): Promise<SayValue> {
    switch (node.type) {
      case 'NumberLiteral': return node.value;
      case 'StringLiteral': return node.value;
      case 'BooleanLiteral': return node.value;
      case 'NothingLiteral': return null;
      case 'MeExpression': return this.env.get('me');
      case 'ItExpression': return this.env.get('it') ?? this.itValue;

      case 'Identifier': {
        // Check mocks first
        const mockVal = this.mocks.get(node.name.toLowerCase());
        if (mockVal !== undefined) return mockVal;
        // Check for command calls
        const cmd = this.commands.get(node.name);
        if (cmd) {
          return this.callCommand(cmd, []);
        }
        const val = this.env.get(node.name);
        if (val === undefined) {
          if (this.strict) {
            throw new Error(`Undefined variable "${node.name}" on line ${(node as any).line || '?'}. Did you mean to use "put" to store text?`);
          }
          return node.name; // Treat unknown identifiers as string values
        }
        return val;
      }

      case 'DotExpression': return this.resolveDotExpression(node.path);

      case 'BinaryExpression': {
        const left = await this.evaluate(node.left);
        const right = await this.evaluate(node.right);
        return this.evalBinary(node.op, left, right);
      }

      case 'UnaryExpression': {
        const operand = await this.evaluate(node.operand);
        if (node.op === '-') return -toNumber(operand);
        return operand;
      }

      case 'ComparisonExpression': {
        const left = await this.evaluate(node.left);
        const right = await this.evaluate(node.right);
        return this.evalComparison(node.op, left, right);
      }

      case 'LogicalExpression': {
        if (node.op === 'not') {
          const right = await this.evaluate(node.right);
          return !isTruthy(right);
        }
        const left = await this.evaluate(node.left!);
        if (node.op === 'and') {
          if (!isTruthy(left)) return false;
          return isTruthy(await this.evaluate(node.right));
        }
        if (node.op === 'or') {
          if (isTruthy(left)) return true;
          return isTruthy(await this.evaluate(node.right));
        }
        return false;
      }

      case 'ListLiteral': {
        const items: SayValue[] = [];
        for (const item of node.items) {
          items.push(await this.evaluate(item));
        }
        return new SayList(items);
      }

      case 'CallExpression': {
        if (node.name === '__new') {
          const typeName = await this.evaluate(node.args[0]);
          return new SayUIElement(toString(typeName));
        }
        if (node.name === '__send') {
          const message = toString(await this.evaluate(node.args[0]));
          const target = await this.evaluate(node.args[1]);
          const args: SayValue[] = [];
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

        // Check for mocks first
        const mock = this.mocks.get(node.name.toLowerCase());
        if (mock !== undefined) return mock;

        // Built-in functions
        const cmd = this.commands.get(node.name);
        if (cmd) {
          const args: SayValue[] = [];
          for (const arg of node.args) {
            args.push(await this.evaluate(arg));
          }
          return this.callCommand(cmd, args);
        }

        // Lambda/function variable calling
        const lambdaVal = this.env.get(node.name);
        if (lambdaVal instanceof SayLambda) {
          const args: SayValue[] = [];
          for (const arg of node.args) {
            args.push(await this.evaluate(arg));
          }
          return this.callLambda(lambdaVal, args);
        }

        // Math module functions
        if (node.name === 'math') {
          return this.env.get('math');
        }

        return null;
      }

      case 'DotCallExpression': {
        const obj = await this.evaluate(node.object);
        const args: SayValue[] = [];
        for (const arg of node.args) {
          args.push(await this.evaluate(arg));
        }

        // Math module methods
        if (obj instanceof SayInstance && obj.kind.name === 'Module') {
          const mathModule = this.globalEnv.get('math');
          if (obj === mathModule) {
            switch (node.method) {
              case 'round': return Math.round(toNumber(args[0]));
              case 'floor': return Math.floor(toNumber(args[0]));
              case 'ceil': return Math.ceil(toNumber(args[0]));
              case 'abs': return Math.abs(toNumber(args[0]));
              case 'sqrt': return Math.sqrt(toNumber(args[0]));
              case 'power': return Math.pow(toNumber(args[0]), toNumber(args[1]));
              case 'random': {
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

          // Built-in property access
          const propVal = obj.get(node.method);
          if (propVal !== null) return propVal;
        }

        if (obj instanceof SayList) {
          if (node.method === 'at') return obj.at(toNumber(args[0]));
        }

        // String methods
        if (typeof obj === 'string') {
          if (node.method === 'upper') return obj.toUpperCase();
          if (node.method === 'lower') return obj.toLowerCase();
          if (node.method === 'length') return obj.length;
          if (node.method === 'trim') return obj.trim();
          if (node.method === 'split') return new SayList(obj.split(toString(args[0])));
          if (node.method === 'at') {
            const idx = toNumber(args[0]);
            return (idx >= 1 && idx <= obj.length) ? obj[idx - 1] : null;
          }
          if (node.method === 'from') {
            const start = toNumber(args[0]);
            const end = toNumber(args[1]);
            return obj.slice(Math.max(0, start - 1), end);
          }
        }

        return null;
      }

      case 'PropertyAccess': {
        const obj = await this.evaluate(node.object);
        return this.getProperty(obj, node.property);
      }

      case 'MakeExpression': {
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

      case 'WhereExpression': {
        const source = await this.evaluate(node.source);
        if (!(source instanceof SayList)) throw new Error('where requires a list');
        const result: SayValue[] = [];
        for (const item of source.items) {
          const prevIt = this.env.get('it');
          this.env.set('it', item);
          const pred = await this.evaluate(node.predicate);
          this.env.set('it', prevIt ?? null);
          if (isTruthy(pred)) result.push(item);
        }
        return new SayList(result);
      }

      case 'EachMapExpression': {
        const source = await this.evaluate(node.source);
        if (!(source instanceof SayList)) throw new Error('each requires a list');
        const result: SayValue[] = [];
        for (const item of source.items) {
          const prevIt = this.env.get('it');
          this.env.set('it', item);
          const mapped = await this.evaluate(node.transform);
          this.env.set('it', prevIt ?? null);
          result.push(mapped);
        }
        return new SayList(result);
      }

      case 'ContainsExpression': {
        const collection = await this.evaluate(node.collection);
        const value = await this.evaluate(node.value);
        if (collection instanceof SayList) return collection.contains(value);
        if (collection instanceof SayMap) return collection.has(toString(value));
        if (collection instanceof SaySet) return collection.has(value);
        if (typeof collection === 'string') return collection.includes(toString(value));
        return false;
      }

      case 'RangeExpression': {
        const start = toNumber(await this.evaluate(node.start));
        const end = toNumber(await this.evaluate(node.end));
        const items: SayValue[] = [];
        if (start <= end) {
          for (let i = start; i <= end; i++) items.push(i);
        } else {
          for (let i = start; i >= end; i--) items.push(i);
        }
        return new SayList(items);
      }

      case 'ParenExpression':
        return this.evaluate(node.expr);

      case 'AskExpression':
        return this.executeAsk(node);

      case 'MapLiteral':
        return new SayMap();

      case 'RandomExpression': {
        if (node.variant === 'float') return Math.random();
        if (node.variant === 'range') {
          const min = toNumber(await this.evaluate(node.start!));
          const max = toNumber(await this.evaluate(node.end!));
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        if (node.variant === 'pick') {
          const source = await this.evaluate(node.source!);
          if (source instanceof SayList && source.items.length > 0) {
            const idx = Math.floor(Math.random() * source.items.length);
            return source.items[idx];
          }
          return null;
        }
        return null;
      }

      case 'TypeCheckExpression': {
        const val = await this.evaluate(node.value);
        let result = false;
        switch (node.targetType) {
          case 'number': result = typeof val === 'number'; break;
          case 'text': result = typeof val === 'string'; break;
          case 'boolean': result = typeof val === 'boolean'; break;
          case 'list': result = val instanceof SayList; break;
          case 'map': result = val instanceof SayMap; break;
          case 'nothing': result = val === null || val === undefined; break;
          case 'set': result = val instanceof SaySet; break;
          case 'pair': result = val instanceof SayPair; break;
          case 'enum': result = val instanceof SayEnum; break;
          case 'lambda': result = val instanceof SayLambda; break;
          default: {
            if (val instanceof SayInstance) {
              result = val.kind.name === node.targetType;
              if (!result) {
                let parent = val.kind.parent;
                while (parent) {
                  if (parent.name === node.targetType) { result = true; break; }
                  parent = parent.parent;
                }
              }
            }
            break;
          }
        }
        return node.negated ? !result : result;
      }

      case 'RoundedExpression': {
        const val = toNumber(await this.evaluate(node.value));
        const dec = toNumber(await this.evaluate(node.decimals));
        const factor = Math.pow(10, dec);
        return Math.round(val * factor) / factor;
      }

      case 'ReadExpression': {
        const path = toString(await this.evaluate(node.path));
        const content = await this.readFile(path);
        if (node.asType === 'list') {
          return new SayList(content.split('\n'));
        }
        return content;
      }

      case 'ThinkExpression': {
        const prompt = toString(await this.evaluate(node.prompt));
        return this.aiEngine.think(prompt);
      }

      case 'FetchExpression': {
        const url = toString(await this.evaluate(node.url));
        try {
          const response = await this.httpFetch(url);
          if (typeof response.json === 'function') {
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

      case 'RecallExpression': {
        const key = toString(await this.evaluate(node.key));
        const storage = this.getStorage();
        const val = storage.recall(key);
        return this.jsonToSayValue(val);
      }

      case 'PairLiteral': {
        const first = await this.evaluate(node.first);
        const second = await this.evaluate(node.second);
        return new SayPair(first, second);
      }

      case 'SetLiteral': {
        const items: SayValue[] = [];
        for (const item of node.items) {
          items.push(await this.evaluate(item));
        }
        return new SaySet(items);
      }

      case 'MapLiteralWithEntries': {
        const map = new SayMap();
        for (const entry of node.entries) {
          const key = toString(await this.evaluate(entry.key));
          const value = await this.evaluate(entry.value);
          map.set(key, value);
        }
        return map;
      }

      case 'InterpolatedStringExpression': {
        let result = '';
        for (const part of node.parts) {
          if (typeof part === 'string') {
            result += part;
          } else {
            const val = await this.evaluate(part);
            result += toString(val);
          }
        }
        return result;
      }

      case 'RegexMatchExpression': {
        const val = toString(await this.evaluate(node.value));
        const pattern = toString(await this.evaluate(node.pattern));
        try {
          return new RegExp(pattern).test(val);
        } catch {
          return false;
        }
      }

      case 'LambdaExpression': {
        return new SayLambda(node.params, node.body, this.env);
      }

      case 'PipelineExpression': {
        let current: SayValue = await this.evaluate(node.stages[0]);
        for (let i = 1; i < node.stages.length; i++) {
          const stage = node.stages[i];
          // If stage is an identifier, treat it as a function call with current as arg
          if (stage.type === 'Identifier') {
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
          // Fallback: set 'it' and evaluate
          const prevIt = this.env.get('it');
          this.env.set('it', current);
          current = await this.evaluate(stage);
          this.env.set('it', prevIt ?? null);
        }
        return current;
      }

      case 'AwaitExpression': {
        return await this.evaluate(node.value);
      }

      case 'EnvExpression': {
        const key = toString(await this.evaluate(node.key));
        return process.env[key] ?? null;
      }

      case 'DateTimeExpression': {
        const now = new Date();
        switch (node.variant) {
          case 'now': return now.toISOString();
          case 'today': return now.toISOString().split('T')[0];
          case 'date': return now.toLocaleDateString();
          case 'time': return now.toLocaleTimeString();
          case 'year': return now.getFullYear();
          case 'month': return now.getMonth() + 1;
          case 'day': return now.getDate();
          case 'hour': return now.getHours();
          case 'minute': return now.getMinutes();
          case 'weekday': return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];
          default: return now.toISOString();
        }
      }

      case 'FormatExpression': {
        const val = toNumber(await this.evaluate(node.value));
        const places = toNumber(await this.evaluate(node.places));
        return Number(val.toFixed(places));
      }

      case 'CurryExpression': {
        const cmd = this.commands.get(node.command);
        if (!cmd) return null;
        const partialArgs: SayValue[] = [];
        for (const arg of node.args) {
          partialArgs.push(await this.evaluate(arg));
        }
        // Create a lambda that calls the original command with partial + remaining args
        const remainingParams = cmd.params.slice(partialArgs.length);
        // Build a body that calls the command: return cmd(partialArgs..., remainingParams...)
        const allArgExprs: AST.Expression[] = [
          ...partialArgs.map((v, i) => ({ type: 'Identifier' as const, name: `__curry_arg_${i}` })),
          ...remainingParams.map(p => ({ type: 'Identifier' as const, name: p }))
        ];
        const callExpr: AST.CallExpression = { type: 'CallExpression', name: node.command, args: allArgExprs };
        const returnStmt: AST.ReturnStatement = { type: 'ReturnStatement', value: callExpr, line: 0 };
        const closureEnv = new Environment(this.env);
        for (let i = 0; i < partialArgs.length; i++) {
          closureEnv.define(`__curry_arg_${i}`, partialArgs[i]);
        }
        return new SayLambda(remainingParams, [returnStmt], closureEnv);
      }

      case 'ComposeExpression': {
        const fns: SayValue[] = [];
        for (const f of node.functions) {
          fns.push(await this.evaluate(f));
        }
        // Return a lambda that applies all functions in sequence
        const closureEnv = new Environment(this.env);
        for (let i = 0; i < fns.length; i++) {
          closureEnv.define(`__fn_${i}`, fns[i]);
        }
        closureEnv.define('__fn_count', fns.length);
        // Create a special composed lambda
        const composedLambda = new SayLambda(['x'], fns as any, closureEnv);
        (composedLambda as any).__composed = fns;
        return composedLambda;
      }

      case 'ExistsExpression': {
        const val = await this.evaluate(node.target);
        return val !== null && val !== undefined;
      }

      case 'CsvParseExpression': {
        const source = toString(await this.evaluate(node.source));
        const lines = source.split('\n').filter(l => l.trim());
        if (lines.length === 0) return new SayList([]);
        const headers = lines[0].split(',').map(h => h.trim());
        const rows: SayValue[] = [];
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',').map(c => c.trim());
          const row = new SayMap();
          for (let j = 0; j < headers.length; j++) {
            row.set(headers[j], cols[j] ?? null);
          }
          rows.push(row);
        }
        return new SayList(rows);
      }

      case 'JsonParseExpression': {
        const source = toString(await this.evaluate(node.source));
        try {
          const parsed = JSON.parse(source);
          return this.jsonToSayValue(parsed);
        } catch {
          return null;
        }
      }

      case 'FilesExpression': {
        const dirPath = toString(await this.evaluate(node.path));
        try {
          const fs = require('fs');
          const entries = fs.readdirSync(dirPath);
          return new SayList(entries);
        } catch {
          return new SayList([]);
        }
      }

      case 'ShellExpression': {
        const cmd = toString(await this.evaluate(node.command));
        try {
          const { execSync } = require('child_process');
          const result = execSync(cmd, { encoding: 'utf-8', timeout: 10000 });
          return result.trim();
        } catch (e) {
          return `[Shell error: ${e instanceof Error ? e.message : String(e)}]`;
        }
      }

      case 'TouchesExpression': {
        // Simple bounding box collision - both values should have x, y, size properties
        const a = await this.evaluate(node.left);
        const b = await this.evaluate(node.right);
        if (a instanceof SayInstance && b instanceof SayInstance) {
          const ax = toNumber(a.get('x')), ay = toNumber(a.get('y')), as = toNumber(a.get('size') ?? 10);
          const bx = toNumber(b.get('x')), by = toNumber(b.get('y')), bs = toNumber(b.get('size') ?? 10);
          return Math.abs(ax - bx) < (as + bs) / 2 && Math.abs(ay - by) < (as + bs) / 2;
        }
        return false;
      }

      default:
        return null;
    }
  }

  private getProperty(obj: SayValue, property: string): SayValue {
    if (obj instanceof SayInstance) {
      return obj.get(property) ?? null;
    }
    if (obj instanceof SayMap) {
      switch (property) {
        case 'count': return obj.count;
        case 'keys': return obj.keys;
        case 'values': return obj.values;
        default: return obj.get(property);
      }
    }
    if (obj instanceof SayList) {
      switch (property) {
        case 'first': return obj.first;
        case 'last': return obj.last;
        case 'count': return obj.count;
        case 'sum': return obj.sum;
        case 'average': return obj.average;
        case 'max': return obj.max;
        case 'min': return obj.min;
      }
    }
    if (obj instanceof SayUIElement) {
      return obj.get(property) ?? null;
    }
    if (obj instanceof SaySet) {
      switch (property) {
        case 'count': return obj.count;
        case 'list': return obj.toList();
        default: return null;
      }
    }
    if (obj instanceof SayPair) {
      switch (property) {
        case 'first': return obj.first;
        case 'second': return obj.second;
        default: return null;
      }
    }
    if (obj instanceof SayEnum) {
      switch (property) {
        case 'values': return new SayList(obj.values);
        case 'name': return obj.name;
        default:
          // Access enum value by name
          if (obj.has(property)) return property.toLowerCase();
          return null;
      }
    }
    if (typeof obj === 'string') {
      if (property === 'length') return obj.length;
      if (property === 'upper') return obj.toUpperCase();
      if (property === 'lower') return obj.toLowerCase();
      if (property === 'trim') return obj.trim();
      if (property === 'first') return obj.length > 0 ? obj[0] : null;
      if (property === 'last') return obj.length > 0 ? obj[obj.length - 1] : null;
    }
    return null;
  }

  private resolvePath(path: string): SayValue {
    const parts = path.split('.');
    let current: SayValue = this.env.get(parts[0]);
    if (current === undefined) return path;

    for (let i = 1; i < parts.length; i++) {
      current = this.getProperty(current, parts[i]);
    }
    return current;
  }

  private resolveDotExpression(path: string[]): SayValue {
    let current: SayValue = this.env.get(path[0]);
    if (current === undefined) return null;

    for (let i = 1; i < path.length; i++) {
      current = this.getProperty(current, path[i]);
    }
    return current;
  }

  private async assignTarget(target: AST.Expression, value: SayValue): Promise<void> {
    if (target.type === 'Identifier') {
      this.env.set(target.name, value);
      return;
    }

    if (target.type === 'PropertyAccess') {
      let obj = await this.evaluate(target.object);
      // Auto-create instance if object doesn't exist yet
      if ((obj === undefined || obj === null || typeof obj === 'string') && target.object.type === 'Identifier') {
        const autoObj = new SayInstance(new SayKind('Object'));
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

    if (target.type === 'DotExpression') {
      const path = target.path;
      if (path.length === 1) {
        this.env.set(path[0], value);
        return;
      }
      let current: SayValue = this.env.get(path[0]);
      // Auto-create intermediate objects
      if (current === undefined || current === null) {
        const autoObj = new SayInstance(new SayKind('Object'));
        this.env.set(path[0], autoObj);
        current = autoObj;
      }
      for (let i = 1; i < path.length - 1; i++) {
        if (current instanceof SayInstance) {
          let next = current.get(path[i]);
          if (next === null || next === undefined) {
            next = new SayInstance(new SayKind('Object'));
            current.set(path[i], next);
          }
          current = next;
        } else if (current instanceof SayMap) {
          let next = current.get(path[i]);
          if (next === null || next === undefined) {
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

  private evalBinary(op: string, left: SayValue, right: SayValue): SayValue {
    const l = toNumber(left);
    const r = toNumber(right);

    switch (op) {
      case '+':
        // String concatenation if either side is a string
        if (typeof left === 'string' || typeof right === 'string') {
          return toString(left) + toString(right);
        }
        return l + r;
      case '-': return l - r;
      case '*': return l * r;
      case '/': return r !== 0 ? l / r : 0;
      case '%': return l % r;
      case '^': return Math.pow(l, r);
      default: return 0;
    }
  }

  private evalComparison(op: string, left: SayValue, right: SayValue): boolean {
    switch (op) {
      case '==': return valuesEqual(left, right);
      case '!=': return !valuesEqual(left, right);
      case '>': return toNumber(left) > toNumber(right);
      case '<': return toNumber(left) < toNumber(right);
      case '>=': return toNumber(left) >= toNumber(right);
      case '<=': return toNumber(left) <= toNumber(right);
      default: return false;
    }
  }

  private flattenOr(expr: AST.LogicalExpression): AST.Expression[] {
    const results: AST.Expression[] = [];
    if (expr.left) {
      if (expr.left.type === 'LogicalExpression' && (expr.left as AST.LogicalExpression).op === 'or') {
        results.push(...this.flattenOr(expr.left as AST.LogicalExpression));
      } else {
        results.push(expr.left);
      }
    }
    if (expr.right.type === 'LogicalExpression' && (expr.right as AST.LogicalExpression).op === 'or') {
      results.push(...this.flattenOr(expr.right as AST.LogicalExpression));
    } else {
      results.push(expr.right);
    }
    return results;
  }

  private async callLambda(lambda: SayLambda, args: SayValue[]): Promise<SayValue> {
    // Handle composed lambdas
    const composed = (lambda as any).__composed;
    if (composed && Array.isArray(composed)) {
      let current: SayValue = args[0] ?? null;
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
    let result: SayValue = null;
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

  private async callCommand(cmd: AST.CommandDeclaration, args: SayValue[]): Promise<SayValue> {
    const cmdEnv = new Environment(this.env);

    for (let i = 0; i < cmd.params.length; i++) {
      cmdEnv.define(cmd.params[i], args[i] ?? null);
    }

    const prevEnv = this.env;
    this.env = cmdEnv;
    let result: SayValue = null;

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

  private async executeContract(node: AST.ContractDeclaration): Promise<SayValue> {
    this.contracts.set(node.name, node.methods);
    return null;
  }

  private async executeEnum(node: AST.EnumDeclaration): Promise<SayValue> {
    const sayEnum = new SayEnum(node.name, node.values.map(v => v.toLowerCase()));
    this.enums.set(node.name.toLowerCase(), sayEnum);
    this.env.define(node.name.toLowerCase(), sayEnum);
    return null;
  }

  private async executeDestructure(node: AST.DestructureStatement): Promise<SayValue> {
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

  private async executeMock(node: AST.MockStatement): Promise<SayValue> {
    const value = await this.evaluate(node.returnValue);
    this.mocks.set(node.target.toLowerCase(), value);
    return null;
  }

  private async executeSnapshot(node: AST.SnapshotCheck): Promise<SayValue> {
    const value = await this.evaluate(node.expression);
    const serialized = toString(value);
    const existing = this.snapshots.get(node.name);
    if (existing !== undefined) {
      if (existing !== serialized) {
        throw new Error(`Snapshot "${node.name}" changed: expected "${existing}" but got "${serialized}"`);
      }
    } else {
      this.snapshots.set(node.name, serialized);
    }
    return null;
  }

  private async executeBenchmark(node: AST.BenchmarkBlock): Promise<SayValue> {
    const start = Date.now();
    await this.executeBlock(node.body);
    const elapsed = Date.now() - start;
    this.output(`Benchmark "${node.name}": ${elapsed}ms`);
    return elapsed;
  }

  private async executeAnimate(node: AST.AnimateStatement): Promise<SayValue> {
    const from = toNumber(await this.evaluate(node.from));
    const to = toNumber(await this.evaluate(node.to));
    const duration = toNumber(await this.evaluate(node.duration));
    this.output(`Animate ${node.target}.${node.property} from ${from} to ${to} over ${duration}ms`);
    return null;
  }

  private async executeTurtle(node: AST.TurtleStatement): Promise<SayValue> {
    const value = node.value ? toNumber(await this.evaluate(node.value)) : 0;
    switch (node.action) {
      case 'forward': {
        const rad = (this.turtleState.angle * Math.PI) / 180;
        this.turtleState.x += Math.cos(rad) * value;
        this.turtleState.y += Math.sin(rad) * value;
        break;
      }
      case 'backward': {
        const rad = (this.turtleState.angle * Math.PI) / 180;
        this.turtleState.x -= Math.cos(rad) * value;
        this.turtleState.y -= Math.sin(rad) * value;
        break;
      }
      case 'left':
        this.turtleState.angle -= value;
        break;
      case 'right':
        this.turtleState.angle += value;
        break;
      case 'penup':
        this.turtleState.penDown = false;
        break;
      case 'pendown':
        this.turtleState.penDown = true;
        break;
      case 'home':
        this.turtleState.x = 200;
        this.turtleState.y = 200;
        this.turtleState.angle = 0;
        break;
      case 'reset':
        this.turtleState = { x: 200, y: 200, angle: 0, penDown: true, color: '#000000' };
        break;
    }
    return null;
  }

  private async executeSwitchScene(node: AST.SwitchSceneStatement): Promise<SayValue> {
    const sceneName = toString(await this.evaluate(node.scene));
    this.currentScene = sceneName;
    this.output(`Switched to scene: ${sceneName}`);
    return null;
  }

  private async executeConnect(node: AST.ConnectStatement): Promise<SayValue> {
    const url = toString(await this.evaluate(node.url));
    this.env.define(node.alias, `[WebSocket: ${url}]`);
    this.output(`Connected to ${url} as ${node.alias}`);
    return null;
  }

  private async executeEmitStmt(node: AST.EmitStatement): Promise<SayValue> {
    const event = toString(await this.evaluate(node.event));
    const data = node.data ? await this.evaluate(node.data) : null;
    this.output(`Emit "${event}"${data ? ': ' + toString(data) : ''}`);
    return null;
  }

  private async executeCookieStmt(node: AST.CookieStatement): Promise<SayValue> {
    const name = toString(await this.evaluate(node.name));
    switch (node.action) {
      case 'set': {
        const value = node.value ? toString(await this.evaluate(node.value)) : '';
        this.env.define(`cookie_${name}`, value);
        break;
      }
      case 'get':
        return this.env.get(`cookie_${name}`) ?? null;
      case 'delete':
        this.env.define(`cookie_${name}`, null);
        break;
    }
    return null;
  }

  private async executeAllow(node: AST.AllowStatement): Promise<SayValue> {
    const origin = toString(await this.evaluate(node.origin));
    this.output(`CORS allowed: ${origin}`);
    return null;
  }

  private async executeStreamStmt(node: AST.StreamStatement): Promise<SayValue> {
    const data = await this.evaluate(node.data);
    const interval = node.interval ? toNumber(await this.evaluate(node.interval)) : 1000;
    this.output(`Stream: ${toString(data)} every ${interval}ms`);
    return null;
  }

  private async executeTemplateDecl(node: AST.TemplateDeclaration): Promise<SayValue> {
    this.templates.set(node.name.toLowerCase(), { params: node.params, body: node.body });
    return null;
  }

  private async executeFormatStmt(node: AST.FormatStatement): Promise<SayValue> {
    const value = toNumber(await this.evaluate(node.value));
    const places = toNumber(await this.evaluate(node.places));
    return value.toFixed(places);
  }

  getTestResults(): { name: string; passed: boolean; error?: string }[] {
    return this.testResults;
  }
}

// ---- Utility functions ----

export function toNumber(val: SayValue): number {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    const n = parseFloat(val);
    return isNaN(n) ? 0 : n;
  }
  if (typeof val === 'boolean') return val ? 1 : 0;
  if (val === null || val === undefined) return 0;
  return 0;
}

export function toString(val: SayValue): string {
  if (val === null || val === undefined) return 'nothing';
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

export function isTruthy(val: SayValue): boolean {
  if (val === null || val === undefined) return false;
  if (typeof val === 'boolean') return val;
  if (typeof val === 'number') return val !== 0;
  if (typeof val === 'string') return val.length > 0;
  if (val instanceof SayMap) return true;
  return true;
}

export function valuesEqual(a: SayValue, b: SayValue): boolean {
  if (a === b) return true;
  if (a === null || a === undefined) return b === null || b === undefined;

  // Compare numbers to string numbers
  if (typeof a === 'number' && typeof b === 'string') return a === parseFloat(b);
  if (typeof a === 'string' && typeof b === 'number') return parseFloat(a) === b;

  // Compare strings case-insensitively
  if (typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase() === b.toLowerCase();
  }

  return a === b;
}

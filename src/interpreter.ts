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

export class StopSignal {}

export class CheckFailure extends Error {
  constructor(message: string, public line: number) {
    super(message);
  }
}

export type SayValue = number | string | boolean | null | SayList | SayMap | SayInstance | SayKind | SayUIElement | undefined;

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
  private canvases: Map<string, CanvasState> = new Map();
  private server: SayServer | null = null;
  private eventListeners: Map<string, { variable?: string; body: AST.ASTNode[] }[]> = new Map();
  private timers: NodeJS.Timeout[] = [];

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
      case 'ReturnStatement': throw new ReturnSignal(await this.evaluate(node.value));
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
      case 'StopStatement': throw new StopSignal();
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
    this.output(pieces.join(' '));
    return null;
  }

  private async executeAsk(node: AST.AskExpression): Promise<SayValue> {
    const answer = await this.input(node.prompt);
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
              if (e instanceof StopSignal) break;
              throw e;
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
            if (e instanceof StopSignal) break;
            throw e;
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
            if (e instanceof StopSignal) break;
            throw e;
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
            if (e instanceof StopSignal) break;
            throw e;
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
    const promises = node.blocks.map(block => this.executeBlock(block));
    await Promise.all(promises);
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
        // Check for command calls
        const cmd = this.commands.get(node.name);
        if (cmd) {
          return this.callCommand(cmd, []);
        }
        const val = this.env.get(node.name);
        if (val === undefined) return node.name; // Treat unknown identifiers as string values
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

        // Built-in functions
        const cmd = this.commands.get(node.name);
        if (cmd) {
          const args: SayValue[] = [];
          for (const arg of node.args) {
            args.push(await this.evaluate(arg));
          }
          return this.callCommand(cmd, args);
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

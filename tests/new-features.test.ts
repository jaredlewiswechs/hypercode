import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { run, Interpreter, Lexer, Parser, InterpreterOptions, SayList, SayMap, SayInstance, SayKind } from '../src/index';
import { createCanvas, addDrawCommand, canvasToSVG, canvasToText, clearCanvas } from '../src/graphics';
import { Storage } from '../src/storage';
import { AIEngine } from '../src/ai';
import { SayServer } from '../src/server';
import * as fs from 'fs';
import * as path from 'path';

function collect(source: string, options: InterpreterOptions = {}): Promise<string[]> {
  const output: string[] = [];
  return run(source, { output: (text) => output.push(text), ...options }).then(() => output);
}

function makeInterpreter(options: InterpreterOptions = {}): { interpreter: Interpreter; output: string[] } {
  const output: string[] = [];
  const interpreter = new Interpreter({ output: (text) => output.push(text), ...options });
  return { interpreter, output };
}

function parseAndRun(source: string, options: InterpreterOptions = {}): { interpreter: Interpreter; output: string[]; promise: Promise<void> } {
  const output: string[] = [];
  const interpreter = new Interpreter({ output: (text) => output.push(text), ...options });
  const lexer = new Lexer(source);
  const tokens = lexer.tokenize();
  const parser = new Parser();
  const program = parser.parse(tokens);
  const promise = interpreter.run(program);
  return { interpreter, output, promise };
}

// ============================================================
// 1. Graphics / Drawing
// ============================================================
describe('Feature 1: Graphics / Drawing', () => {
  it('draws a circle and produces text output', async () => {
    const output = await collect('draw circle at 100, 100 size 50');
    expect(output.length).toBeGreaterThan(0);
    expect(output[0]).toContain('Circle');
  });

  it('draws a rectangle', async () => {
    const output = await collect('draw rectangle at 10, 20 size 80');
    expect(output.length).toBeGreaterThan(0);
    expect(output[0]).toContain('Rectangle');
  });

  it('draws a line', async () => {
    const output = await collect('draw line from 0, 0 to 100, 100');
    expect(output.length).toBeGreaterThan(0);
    expect(output[0]).toContain('Line');
  });

  it('clears the canvas', async () => {
    const { interpreter, output, promise } = parseAndRun('draw circle at 50, 50 size 25\nclear canvas');
    await promise;
    const svg = interpreter.getCanvasSVG();
    expect(svg).toBeNull(); // cleared canvas has no commands
  });

  it('getCanvasSVG returns null for empty canvas', async () => {
    const { interpreter, promise } = parseAndRun('show hello');
    await promise;
    expect(interpreter.getCanvasSVG()).toBeNull();
  });

  it('getCanvasSVG returns SVG when shapes drawn', async () => {
    const { interpreter, promise } = parseAndRun('draw circle at 50, 50 size 25');
    await promise;
    const svg = interpreter.getCanvasSVG();
    expect(svg).not.toBeNull();
    expect(svg).toContain('<svg');
    expect(svg).toContain('<circle');
  });
});

// ============================================================
// 1b. Graphics subsystem unit tests
// ============================================================
describe('Graphics subsystem', () => {
  it('createCanvas returns default state', () => {
    const canvas = createCanvas();
    expect(canvas.width).toBe(400);
    expect(canvas.height).toBe(400);
    expect(canvas.commands).toHaveLength(0);
  });

  it('createCanvas accepts custom dimensions', () => {
    const canvas = createCanvas(800, 600);
    expect(canvas.width).toBe(800);
    expect(canvas.height).toBe(600);
  });

  it('addDrawCommand adds a command', () => {
    const canvas = createCanvas();
    addDrawCommand(canvas, 'circle', { x: 50, y: 50, size: 25 });
    expect(canvas.commands).toHaveLength(1);
    expect(canvas.commands[0].shape).toBe('circle');
  });

  it('canvasToSVG generates valid SVG for circle', () => {
    const canvas = createCanvas();
    addDrawCommand(canvas, 'circle', { x: 100, y: 100, size: 50 });
    const svg = canvasToSVG(canvas);
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    expect(svg).toContain('<circle');
    expect(svg).toContain('cx="100"');
    expect(svg).toContain('cy="100"');
  });

  it('canvasToSVG generates rect element', () => {
    const canvas = createCanvas();
    addDrawCommand(canvas, 'rectangle', { x: 10, y: 20, width: 100, height: 50 });
    const svg = canvasToSVG(canvas);
    expect(svg).toContain('<rect');
  });

  it('canvasToSVG generates line element', () => {
    const canvas = createCanvas();
    addDrawCommand(canvas, 'line', { x1: 0, y1: 0, x2: 100, y2: 100 });
    const svg = canvasToSVG(canvas);
    expect(svg).toContain('<line');
  });

  it('canvasToSVG generates text element', () => {
    const canvas = createCanvas();
    addDrawCommand(canvas, 'text', { text: 'Hello', x: 10, y: 20 });
    const svg = canvasToSVG(canvas);
    expect(svg).toContain('<text');
    expect(svg).toContain('Hello');
  });

  it('canvasToSVG generates ellipse', () => {
    const canvas = createCanvas();
    addDrawCommand(canvas, 'ellipse', { x: 50, y: 50, width: 100, height: 60 });
    const svg = canvasToSVG(canvas);
    expect(svg).toContain('<ellipse');
  });

  it('canvasToSVG generates triangle', () => {
    const canvas = createCanvas();
    addDrawCommand(canvas, 'triangle', { x: 50, y: 50, size: 40 });
    const svg = canvasToSVG(canvas);
    expect(svg).toContain('<polygon');
  });

  it('canvasToSVG generates star', () => {
    const canvas = createCanvas();
    addDrawCommand(canvas, 'star', { x: 100, y: 100, size: 50 });
    const svg = canvasToSVG(canvas);
    expect(svg).toContain('<polygon');
  });

  it('canvasToText describes commands', () => {
    const canvas = createCanvas();
    addDrawCommand(canvas, 'circle', { x: 50, y: 50, size: 25 });
    const text = canvasToText(canvas);
    expect(text).toContain('Canvas 400x400');
    expect(text).toContain('Circle');
  });

  it('clearCanvas removes all commands', () => {
    const canvas = createCanvas();
    addDrawCommand(canvas, 'circle', { x: 50, y: 50, size: 25 });
    addDrawCommand(canvas, 'rectangle', { x: 10, y: 20, width: 50, height: 50 });
    expect(canvas.commands).toHaveLength(2);
    clearCanvas(canvas);
    expect(canvas.commands).toHaveLength(0);
  });

  it('handles unknown shapes gracefully in SVG', () => {
    const canvas = createCanvas();
    addDrawCommand(canvas, 'hexagon', {});
    const svg = canvasToSVG(canvas);
    expect(svg).toContain('Unknown shape: hexagon');
  });
});

// ============================================================
// 2. Sound / Play
// ============================================================
describe('Feature 2: Sound / Play', () => {
  it('play outputs sound message', async () => {
    const output = await collect('play beep');
    expect(output[0]).toContain('Playing sound');
    expect(output[0]).toContain('beep');
  });
});

// ============================================================
// 3. Timers / Events (listen, every)
// ============================================================
describe('Feature 3: Timers / Events', () => {
  it('listen registers an event listener', async () => {
    const output = await collect('listen for click\n  show clicked\nend');
    expect(output[0]).toContain('Listening for "click" events');
  });

  it('emitEvent fires registered listeners', async () => {
    const { interpreter, output, promise } = parseAndRun(
      'listen for greeting as msg\n  show .msg\nend'
    );
    await promise;
    await interpreter.emitEvent('greeting', 'Hello there');
    expect(output).toContain('Hello there');
  });

  it('emitEvent fires multiple listeners', async () => {
    const { interpreter, output, promise } = parseAndRun(
      'listen for ping\n  show pong1\nend\nlisten for ping\n  show pong2\nend'
    );
    await promise;
    await interpreter.emitEvent('ping');
    expect(output).toContain('pong1');
    expect(output).toContain('pong2');
  });

  it('every sets up a timer', async () => {
    const { interpreter, output, promise } = parseAndRun(
      'every 100 milliseconds\n  show tick\nend'
    );
    await promise;
    // Wait briefly for timer to fire
    await new Promise(resolve => setTimeout(resolve, 250));
    interpreter.cleanup();
    expect(output.filter(o => o === 'tick').length).toBeGreaterThanOrEqual(1);
  });

  it('cleanup stops timers', async () => {
    const { interpreter, output, promise } = parseAndRun(
      'every 50 milliseconds\n  show tick\nend'
    );
    await promise;
    interpreter.cleanup();
    const countBefore = output.filter(o => o === 'tick').length;
    await new Promise(resolve => setTimeout(resolve, 150));
    const countAfter = output.filter(o => o === 'tick').length;
    expect(countAfter).toBe(countBefore); // no new ticks after cleanup
  });
});

// ============================================================
// 4. AI Integration (think)
// ============================================================
describe('Feature 4: AI Integration', () => {
  it('AIEngine reports unavailable without API key', () => {
    const engine = new AIEngine({ apiKey: '' });
    expect(engine.isAvailable()).toBe(false);
  });

  it('think returns fallback message when API key not set', async () => {
    const engine = new AIEngine({ apiKey: '' });
    const result = await engine.think('Hello');
    expect(result).toContain('AI not available');
    expect(result).toContain('Hello');
  });

  it('tutor returns fallback when API key not set', async () => {
    const engine = new AIEngine({ apiKey: '' });
    const result = await engine.tutor('show hello');
    expect(result).toContain('AI not available');
  });

  it('createProgram returns fallback when API key not set', async () => {
    const engine = new AIEngine({ apiKey: '' });
    const result = await engine.createProgram('make a game');
    expect(result).toContain('AI not available');
  });

  it('think expression in language returns fallback', async () => {
    const output = await collect('set answer to think "What is 2+2?"', { aiOptions: { apiKey: '' } });
    // No output from set, but no error either
    // Let's show it
    const output2 = await collect('set answer to think "What is 2+2?"\nshow .answer', { aiOptions: { apiKey: '' } });
    expect(output2[0]).toContain('AI not available');
  });
});

// ============================================================
// 5. HTTP Fetch
// ============================================================
describe('Feature 5: HTTP Fetch', () => {
  it('fetch expression calls httpFetch option', async () => {
    const mockFetch = async (url: string) => ({
      json: async () => ({ message: 'hello' }),
      text: async () => 'hello',
    });
    const output = await collect('set data to fetch "https://example.com/api"\nshow .data', {
      httpFetch: mockFetch,
    });
    // jsonToSayValue converts { message: 'hello' } to a SayMap, which shows as {message: hello}
    expect(output[0]).toContain('message');
    expect(output[0]).toContain('hello');
  });

  it('fetch handles text response when json fails', async () => {
    const mockFetch = async (url: string) => ({
      json: async () => { throw new Error('not json'); },
      text: async () => 'plain text response',
    });
    const output = await collect('set data to fetch "https://example.com"\nshow .data', {
      httpFetch: mockFetch,
    });
    expect(output[0]).toBe('plain text response');
  });

  it('fetch throws error on network failure', async () => {
    const mockFetch = async () => { throw new Error('Network error'); };
    await expect(collect('set data to fetch "https://fail.com"', {
      httpFetch: mockFetch,
    })).rejects.toThrow('Fetch failed');
  });
});

// ============================================================
// 6. Web Server (serve, route, respond)
// ============================================================
describe('Feature 6: Web Server', () => {
  it('SayServer can add routes', () => {
    const server = new SayServer();
    server.addRoute('GET', '/test', async (req) => ({
      body: 'OK',
      status: 200,
      headers: {},
    }));
    // No error means route was added successfully
  });

  it('route without serve throws error', async () => {
    await expect(collect(
      'route get "/hello"\n  respond with "Hello"\nend'
    )).rejects.toThrow('No server running');
  });

  it('respond sets response variables', async () => {
    // Respond is normally used inside route handlers,
    // but we can test it sets env vars
    const output = await collect('respond with "Hello World"');
    // No output, no error - just sets internal vars
  });

  it('respond with status code parses', async () => {
    const output = await collect('respond with "Not Found" status 404');
    // No error means parsing and execution succeeded
  });
});

// ============================================================
// 7. Persistent Storage (remember, recall, forget)
// ============================================================
describe('Feature 7: Persistent Storage', () => {
  const testStorePath = path.join(__dirname, '.test-storage');

  beforeEach(() => {
    // Ensure clean test directory
    if (!fs.existsSync(testStorePath)) {
      fs.mkdirSync(testStorePath, { recursive: true });
    }
    const storeFile = path.join(testStorePath, '.hypercode-store.json');
    if (fs.existsSync(storeFile)) {
      fs.unlinkSync(storeFile);
    }
  });

  afterEach(() => {
    const storeFile = path.join(testStorePath, '.hypercode-store.json');
    if (fs.existsSync(storeFile)) {
      fs.unlinkSync(storeFile);
    }
  });

  it('Storage class remember and recall', () => {
    const storage = new Storage(testStorePath);
    storage.remember('name', 'Alice');
    expect(storage.recall('name')).toBe('Alice');
  });

  it('Storage class forget', () => {
    const storage = new Storage(testStorePath);
    storage.remember('name', 'Alice');
    storage.forget('name');
    expect(storage.recall('name')).toBeNull();
  });

  it('Storage class persists to file', () => {
    const storage1 = new Storage(testStorePath);
    storage1.remember('score', 42);
    const storage2 = new Storage(testStorePath);
    expect(storage2.recall('score')).toBe(42);
  });

  it('Storage class clear removes all', () => {
    const storage = new Storage(testStorePath);
    storage.remember('a', 1);
    storage.remember('b', 2);
    storage.clear();
    expect(storage.keys()).toHaveLength(0);
  });

  it('Storage class keys returns all keys', () => {
    const storage = new Storage(testStorePath);
    storage.remember('x', 1);
    storage.remember('y', 2);
    expect(storage.keys()).toEqual(['x', 'y']);
  });

  it('remember/recall in language', async () => {
    const output = await collect(
      'remember "score" as 42\nset val to recall "score"\nshow .val',
      { storagePath: testStorePath }
    );
    expect(output[0]).toBe('42');
  });

  it('forget in language', async () => {
    const output = await collect(
      'remember "name" as "Alice"\nforget "name"\nset val to recall "name"\nshow .val',
      { storagePath: testStorePath }
    );
    expect(output[0]).toBe('nothing');
  });

  it('remember stores lists', async () => {
    const output = await collect(
      'put list 1, 2, 3 into nums\nremember "nums" as nums\nset result to recall "nums"\nshow .result',
      { storagePath: testStorePath }
    );
    expect(output[0]).toContain('1');
    expect(output[0]).toContain('2');
    expect(output[0]).toContain('3');
  });
});

// ============================================================
// 8. Package System (grab)
// ============================================================
describe('Feature 8: Package System (grab)', () => {
  it('grab shows not found for missing packages', async () => {
    const output = await collect('grab mypackage', {
      readFile: async () => { throw new Error('not found'); },
    });
    expect(output[0]).toContain('Package "mypackage" not found');
  });

  it('grab loads package when found', async () => {
    const packageSource = 'command greet\n  show Hello from package!\nend';
    const output = await collect('grab mypackage\ngreet', {
      readFile: async (filePath: string) => {
        if (filePath.includes('mypackage')) return packageSource;
        throw new Error('not found');
      },
    });
    expect(output).toContain('Hello from package!');
  });
});

// ============================================================
// 9. Live Sharing
// ============================================================
describe('Feature 9: Live Sharing', () => {
  it('share outputs sharing message', async () => {
    const output = await collect('share "my_program.say"');
    expect(output[0]).toContain('Sharing');
    expect(output[1]).toContain('CLI');
  });
});

// ============================================================
// 10. Concurrent Execution (do together)
// ============================================================
describe('Feature 10: Concurrent Execution (do together)', () => {
  it('parses do together with and separator', async () => {
    const source = 'do together\n  show Task A\nand\n  show Task B\nend';
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser();
    const program = parser.parse(tokens);
    expect(program.body).toHaveLength(1);
    expect(program.body[0].type).toBe('DoTogetherStatement');
    const dt = program.body[0] as any;
    expect(dt.blocks).toHaveLength(2);
  });

  it('executes both blocks', async () => {
    const output = await collect(
      'do together\n  show block1\nand\n  show block2\nend'
    );
    expect(output).toContain('block1');
    expect(output).toContain('block2');
  });

  it('executes three concurrent blocks', async () => {
    const output = await collect(
      'do together\n  show A\nand\n  show B\nand\n  show C\nend'
    );
    expect(output).toContain('A');
    expect(output).toContain('B');
    expect(output).toContain('C');
  });
});

// ============================================================
// 11. Pattern Matching on Kinds (when...is a)
// ============================================================
describe('Feature 11: Pattern Matching on Kinds', () => {
  it('matches kind types in when statement', async () => {
    const output = await collect(
      'kind Dog\n  legs is 4\nend\nmake a Dog called rex\nwhen rex\n  is a Dog\n    show It is a dog\nend'
    );
    expect(output).toContain('It is a dog');
  });

  it('matches with else fallback', async () => {
    const output = await collect(
      'kind Cat\nend\nkind Dog\nend\nmake a Cat called kitty\nwhen kitty\n  is a Dog\n    show wrong\n  else\n    show not a dog\nend'
    );
    expect(output).toContain('not a dog');
  });

  it('matches parent kinds through inheritance', async () => {
    const output = await collect(
      'kind Animal\nend\nkind Dog from Animal\nend\nmake a Dog called rex\nwhen rex\n  is a Animal\n    show is an animal\nend'
    );
    expect(output).toContain('is an animal');
  });

  it('matches built-in types: number', async () => {
    const output = await collect(
      'set x to 42\nwhen x\n  is a number\n    show it is a number\nend'
    );
    expect(output).toContain('it is a number');
  });

  it('matches built-in types: text', async () => {
    const output = await collect(
      'put hello into x\nwhen x\n  is a text\n    show it is text\nend'
    );
    expect(output).toContain('it is text');
  });

  it('matches built-in types: list', async () => {
    const output = await collect(
      'put list 1, 2, 3 into x\nwhen x\n  is a list\n    show it is a list\nend'
    );
    expect(output).toContain('it is a list');
  });

  it('matches built-in types: boolean', async () => {
    const output = await collect(
      'set x to true\nwhen x\n  is a boolean\n    show it is boolean\nend'
    );
    expect(output).toContain('it is boolean');
  });
});

// ============================================================
// 12. Boolean Type Check
// ============================================================
describe('Feature 12: Boolean Type Check', () => {
  it('TypeCheckExpression detects boolean', async () => {
    const output = await collect(
      'set x to true\nif x is a boolean\n  show yes\nend'
    );
    expect(output).toContain('yes');
  });

  it('TypeCheckExpression negated boolean', async () => {
    const output = await collect(
      'set x to 42\nif x is not a boolean\n  show not boolean\nend'
    );
    expect(output).toContain('not boolean');
  });
});

// ============================================================
// 13. Modules / Use
// ============================================================
describe('Feature 13: Modules / Use', () => {
  it('use math is a no-op (already loaded)', async () => {
    const output = await collect('use math\nshow (math.pi)');
    expect(parseFloat(output[0])).toBeCloseTo(3.14159, 4);
  });

  it('use loads a .say file', async () => {
    const moduleSource = 'command helper\n  return 99\nend';
    const output = await collect('use mymodule\nset val to helper\nshow .val', {
      readFile: async (p: string) => {
        if (p.includes('mymodule')) return moduleSource;
        throw new Error('not found');
      },
    });
    expect(output[0]).toBe('99');
  });
});

// ============================================================
// 14. When Statement (value matching)
// ============================================================
describe('Feature 14: When Statement (value matching)', () => {
  it('matches exact value', async () => {
    const output = await collect(
      'put red into color\nwhen color\n  is red\n    show Red!\n  is blue\n    show Blue!\nend'
    );
    expect(output).toEqual(['Red!']);
  });

  it('falls through to else', async () => {
    const output = await collect(
      'put green into color\nwhen color\n  is red\n    show Red!\n  else\n    show Other\nend'
    );
    expect(output).toEqual(['Other']);
  });

  it('matches numeric values', async () => {
    const output = await collect(
      'set x to 2\nwhen x\n  is 1\n    show one\n  is 2\n    show two\n  is 3\n    show three\nend'
    );
    expect(output).toEqual(['two']);
  });

  it('no match and no else produces no output', async () => {
    const output = await collect(
      'set x to 99\nwhen x\n  is 1\n    show one\nend'
    );
    expect(output).toHaveLength(0);
  });
});

// ============================================================
// 15. JSON / SayValue Conversion Helpers
// ============================================================
describe('Feature 15: JSON / SayValue Conversion', () => {
  it('converts JSON object to SayMap via fetch', async () => {
    const mockFetch = async () => ({
      json: async () => ({ name: 'Alice', age: 30 }),
    });
    const output = await collect(
      'set data to fetch "url"\nshow .data',
      { httpFetch: mockFetch }
    );
    expect(output[0]).toContain('name');
    expect(output[0]).toContain('Alice');
    expect(output[0]).toContain('age');
  });

  it('converts JSON array to SayList via fetch', async () => {
    const mockFetch = async () => ({
      json: async () => [1, 2, 3],
    });
    const output = await collect(
      'set data to fetch "url"\nshow .data',
      { httpFetch: mockFetch }
    );
    expect(output[0]).toContain('1');
    expect(output[0]).toContain('2');
    expect(output[0]).toContain('3');
  });

  it('converts nested JSON correctly', async () => {
    const mockFetch = async () => ({
      json: async () => ({ items: [{ id: 1 }, { id: 2 }] }),
    });
    const output = await collect(
      'set data to fetch "url"\nshow .data',
      { httpFetch: mockFetch }
    );
    expect(output[0]).toContain('items');
  });

  it('remember/recall preserves types through JSON', async () => {
    const testStorePath = path.join(__dirname, '.test-json-conv');
    if (!fs.existsSync(testStorePath)) fs.mkdirSync(testStorePath, { recursive: true });
    const storeFile = path.join(testStorePath, '.hypercode-store.json');
    if (fs.existsSync(storeFile)) fs.unlinkSync(storeFile);

    try {
      const output = await collect(
        'remember "flag" as true\nset val to recall "flag"\nshow .val',
        { storagePath: testStorePath }
      );
      expect(output[0]).toBe('true');
    } finally {
      if (fs.existsSync(storeFile)) fs.unlinkSync(storeFile);
    }
  });
});

// ============================================================
// 16. Debugger Module
// ============================================================
describe('Feature 16: Debugger Module', () => {
  it('Debugger class exists and can be imported', async () => {
    const { Debugger } = await import('../src/debugger');
    const dbg = new Debugger();
    expect(dbg).toBeDefined();
  });
});

// ============================================================
// 17. Canvas SVG Export
// ============================================================
describe('Feature 17: Canvas SVG Export', () => {
  it('SVG has proper xmlns attribute', () => {
    const canvas = createCanvas(200, 200);
    addDrawCommand(canvas, 'circle', { x: 50, y: 50, size: 25 });
    const svg = canvasToSVG(canvas);
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
  });

  it('SVG has white background rect', () => {
    const canvas = createCanvas();
    addDrawCommand(canvas, 'circle', { x: 50, y: 50, size: 25 });
    const svg = canvasToSVG(canvas);
    expect(svg).toContain('fill="white"');
  });

  it('SVG viewBox matches canvas dimensions', () => {
    const canvas = createCanvas(300, 200);
    addDrawCommand(canvas, 'circle', { x: 50, y: 50, size: 25 });
    const svg = canvasToSVG(canvas);
    expect(svg).toContain('viewBox="0 0 300 200"');
    expect(svg).toContain('width="300"');
    expect(svg).toContain('height="200"');
  });

  it('multiple shapes in one SVG', () => {
    const canvas = createCanvas();
    addDrawCommand(canvas, 'circle', { x: 50, y: 50, size: 25 });
    addDrawCommand(canvas, 'rectangle', { x: 100, y: 100, width: 50, height: 50 });
    addDrawCommand(canvas, 'line', { x1: 0, y1: 0, x2: 200, y2: 200 });
    const svg = canvasToSVG(canvas);
    expect(svg).toContain('<circle');
    expect(svg).toContain('<rect');
    expect(svg).toContain('<line');
  });
});

// ============================================================
// Additional integration tests
// ============================================================
describe('Integration: Example programs parse and run', () => {
  it('drawing.say parses without errors', async () => {
    const source = fs.readFileSync(path.join(__dirname, '..', 'examples', 'drawing.say'), 'utf-8');
    const output = await collect(source);
    expect(output.length).toBeGreaterThan(0);
  });

  it('concurrent.say parses without errors', async () => {
    const source = fs.readFileSync(path.join(__dirname, '..', 'examples', 'concurrent.say'), 'utf-8');
    const output = await collect(source);
    expect(output.length).toBeGreaterThan(0);
  });

  it('pattern_matching.say parses without errors', async () => {
    const source = fs.readFileSync(path.join(__dirname, '..', 'examples', 'pattern_matching.say'), 'utf-8');
    const output = await collect(source);
    expect(output.length).toBeGreaterThan(0);
  });

  it('string_fun.say runs correctly', async () => {
    const source = fs.readFileSync(path.join(__dirname, '..', 'examples', 'string_fun.say'), 'utf-8');
    const output = await collect(source);
    expect(output).toContain('Sum of 1 to 10 = 55');
    expect(output).toContain('Grade B');
  });

  it('fibonacci.say produces correct output', async () => {
    const source = fs.readFileSync(path.join(__dirname, '..', 'examples', 'fibonacci.say'), 'utf-8');
    const output = await collect(source);
    // Should contain fibonacci numbers
    expect(output.some(o => o.includes('1'))).toBe(true);
  });
});

// ============================================================
// Parser tests for new statement types
// ============================================================
describe('Parser: New statement types', () => {
  function parseSource(source: string) {
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser();
    return parser.parse(tokens);
  }

  it('parses remember statement', () => {
    const prog = parseSource('remember "key" as "value"');
    expect(prog.body[0].type).toBe('RememberStatement');
  });

  it('parses forget statement', () => {
    const prog = parseSource('forget "key"');
    expect(prog.body[0].type).toBe('ForgetStatement');
  });

  it('parses serve statement', () => {
    const prog = parseSource('serve on port 3000');
    expect(prog.body[0].type).toBe('ServeStatement');
  });

  it('parses respond statement', () => {
    const prog = parseSource('respond with "Hello"');
    expect(prog.body[0].type).toBe('RespondStatement');
  });

  it('parses respond with status', () => {
    const prog = parseSource('respond with "Not Found" status 404');
    const node = prog.body[0] as any;
    expect(node.type).toBe('RespondStatement');
    expect(node.statusCode).toBeDefined();
  });

  it('parses route statement', () => {
    const prog = parseSource('route get "/hello"\n  respond with "hi"\nend');
    const node = prog.body[0] as any;
    expect(node.type).toBe('RouteStatement');
    expect(node.method).toBe('GET');
  });

  it('parses route with POST method', () => {
    const prog = parseSource('route post "/submit"\n  respond with "ok"\nend');
    const node = prog.body[0] as any;
    expect(node.type).toBe('RouteStatement');
    expect(node.method).toBe('POST');
  });

  it('parses grab statement', () => {
    const prog = parseSource('grab mypackage');
    expect(prog.body[0].type).toBe('GrabStatement');
  });

  it('parses grab with string', () => {
    const prog = parseSource('grab "my-package"');
    const node = prog.body[0] as any;
    expect(node.type).toBe('GrabStatement');
    expect(node.module).toBe('my-package');
  });

  it('parses share statement', () => {
    const prog = parseSource('share "file.say"');
    expect(prog.body[0].type).toBe('ShareStatement');
  });

  it('parses do together statement', () => {
    const prog = parseSource('do together\n  show A\nand\n  show B\nend');
    const node = prog.body[0] as any;
    expect(node.type).toBe('DoTogetherStatement');
    expect(node.blocks).toHaveLength(2);
  });

  it('parses listen statement', () => {
    const prog = parseSource('listen for click\n  show clicked\nend');
    const node = prog.body[0] as any;
    expect(node.type).toBe('ListenStatement');
    expect(node.event).toBe('click');
  });

  it('parses listen with as variable', () => {
    const prog = parseSource('listen for message as msg\n  show .msg\nend');
    const node = prog.body[0] as any;
    expect(node.type).toBe('ListenStatement');
    expect(node.variable).toBe('msg');
  });

  it('parses every statement', () => {
    const prog = parseSource('every 5 seconds\n  show tick\nend');
    const node = prog.body[0] as any;
    expect(node.type).toBe('EveryStatement');
    expect(node.unit).toBe('seconds');
  });

  it('parses draw statement', () => {
    const prog = parseSource('draw circle at 50, 50 size 25');
    const node = prog.body[0] as any;
    expect(node.type).toBe('DrawStatement');
    expect(node.shape).toBe('circle');
  });

  it('parses clear statement', () => {
    const prog = parseSource('clear canvas');
    const node = prog.body[0] as any;
    expect(node.type).toBe('ClearStatement');
    expect(node.target).toBe('canvas');
  });

  it('parses play statement', () => {
    const prog = parseSource('play click');
    const node = prog.body[0] as any;
    expect(node.type).toBe('PlayStatement');
    expect(node.sound).toBe('click');
  });

  it('parses when statement with values', () => {
    const prog = parseSource('when x\n  is 1\n    show one\n  is 2\n    show two\nend');
    const node = prog.body[0] as any;
    expect(node.type).toBe('WhenStatement');
    expect(node.cases).toHaveLength(2);
  });

  it('parses when with type check (is a)', () => {
    const prog = parseSource('when x\n  is a number\n    show num\n  is a text\n    show txt\nend');
    const node = prog.body[0] as any;
    expect(node.type).toBe('WhenStatement');
    expect(node.cases).toHaveLength(2);
    expect(node.cases[0].value.type).toBe('TypeCheckExpression');
  });

  it('parses think expression', () => {
    const prog = parseSource('set answer to think "question"');
    const node = prog.body[0] as any;
    expect(node.type).toBe('SetStatement');
    expect(node.value.type).toBe('ThinkExpression');
  });

  it('parses fetch expression', () => {
    const prog = parseSource('set data to fetch "https://api.example.com"');
    const node = prog.body[0] as any;
    expect(node.type).toBe('SetStatement');
    expect(node.value.type).toBe('FetchExpression');
  });

  it('parses recall expression', () => {
    const prog = parseSource('set val to recall "key"');
    const node = prog.body[0] as any;
    expect(node.type).toBe('SetStatement');
    expect(node.value.type).toBe('RecallExpression');
  });
});

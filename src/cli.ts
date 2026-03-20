#!/usr/bin/env node

import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';
import { Lexer } from './lexer';
import { Parser } from './parser';
import { Interpreter } from './interpreter';
import { Debugger } from './debugger';
import { AIEngine } from './ai';
import { startPlayground } from './playground';
import { shareFile, startClassroom } from './share';

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    await startRepl();
    return;
  }

  const command = args[0];

  switch (command) {
    case 'repl':
      await startRepl();
      break;
    case 'run':
      if (args[1]) await runFile(args[1]);
      else showUsage();
      break;
    case 'test':
      if (args[1]) await runTestFile(args[1]);
      else showUsage();
      break;
    case 'debug':
      if (args[1]) await debugFile(args[1]);
      else showUsage();
      break;
    case 'playground':
      startPlayground(parseInt(args[1]) || 3000);
      break;
    case 'share':
      if (args[1]) shareFile(args[1], parseInt(args[2]) || 4000);
      else showUsage();
      break;
    case 'classroom':
      if (args[1] === 'start') startClassroom(parseInt(args[2]) || 5000);
      else showUsage();
      break;
    case 'submit':
      if (args[1]) await submitFile(args);
      else showUsage();
      break;
    case 'tutor':
      if (args[1]) await tutorFile(args[1]);
      else showUsage();
      break;
    case 'create':
      if (args[1]) await createProgram(args.slice(1).join(' '));
      else showUsage();
      break;
    default:
      if (command.endsWith('.say') || command.endsWith('.hypercode')) {
        await runFile(command);
      } else {
        showUsage();
      }
  }
}

function showUsage(): void {
  console.log('HyperCode (Say) — An English-like programming language\n');
  console.log('Usage:');
  console.log('  say <file.say>              Run a program');
  console.log('  say run <file.say>          Run a program');
  console.log('  say test <file.say>         Run tests in a file');
  console.log('  say repl                    Start interactive REPL');
  console.log('  say debug <file.say>        Debug a program step-by-step');
  console.log('  say playground [port]       Start browser playground (default: 3000)');
  console.log('  say share <file.say> [port] Share a file via local server');
  console.log('  say classroom start [port]  Start classroom dashboard');
  console.log('  say submit <file.say> ...   Submit code to classroom');
  console.log('  say tutor <file.say>        Get AI feedback on your code');
  console.log('  say create "<description>"  Generate a program from a description');
}

function createInterpreter(rl?: readline.Interface): Interpreter {
  return new Interpreter({
    output: (text: string) => console.log(text),
    input: (prompt: string) => {
      if (rl) {
        return new Promise<string>((resolve) => {
          rl.question(prompt + ' ', resolve);
        });
      }
      return '';
    },
    readFile: (p: string) => fs.readFileSync(p, 'utf-8'),
    writeFile: (p: string, content: string) => fs.writeFileSync(p, content, 'utf-8'),
    appendFile: (p: string, content: string) => fs.appendFileSync(p, content, 'utf-8'),
    storagePath: process.cwd(),
  });
}

async function runFile(filePath: string) {
  try {
    const source = fs.readFileSync(filePath, 'utf-8');
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser();
    const program = parser.parse(tokens);

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const interpreter = createInterpreter(rl);

    await interpreter.run(program);

    // Check if there's a canvas with actual draw commands and save SVG
    const svg = interpreter.getCanvasSVG();
    if (svg && (svg.includes('<circle') || svg.includes('<rect ') || svg.includes('<line') || svg.includes('<text') || svg.includes('<polygon') || svg.includes('<ellipse'))) {
      const svgPath = filePath.replace(/\.(say|hypercode)$/, '.svg');
      fs.writeFileSync(svgPath, svg, 'utf-8');
      console.log(`Canvas saved to ${svgPath}`);
    }

    interpreter.cleanup();
    rl.close();
  } catch (e) {
    if (e instanceof Error) {
      console.error(`Error: ${e.message}`);
    }
    process.exit(1);
  }
}

async function runTestFile(filePath: string) {
  try {
    const source = fs.readFileSync(filePath, 'utf-8');
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser();
    const program = parser.parse(tokens);

    const interpreter = new Interpreter({
      output: () => {}, // Suppress output during tests
      storagePath: process.cwd(),
    });

    const results = await interpreter.runTests(program);

    let passed = 0;
    let failed = 0;

    for (const result of results) {
      if (result.passed) {
        console.log(`  PASS  ${result.name}`);
        passed++;
      } else {
        console.log(`  FAIL  ${result.name}: ${result.error}`);
        failed++;
      }
    }

    console.log(`\n${passed} passed, ${failed} failed, ${passed + failed} total`);
    interpreter.cleanup();
    if (failed > 0) process.exit(1);
  } catch (e) {
    if (e instanceof Error) {
      console.error(`Error: ${e.message}`);
    }
    process.exit(1);
  }
}

async function debugFile(filePath: string) {
  try {
    const source = fs.readFileSync(filePath, 'utf-8');
    const debugger_ = new Debugger();
    await debugger_.debug(source);
  } catch (e) {
    if (e instanceof Error) {
      console.error(`Error: ${e.message}`);
    }
    process.exit(1);
  }
}

async function tutorFile(filePath: string) {
  try {
    const source = fs.readFileSync(filePath, 'utf-8');
    const ai = new AIEngine();

    if (!ai.isAvailable()) {
      console.log('AI Tutor requires the ANTHROPIC_API_KEY environment variable.');
      console.log('Set it with: export ANTHROPIC_API_KEY=your-key-here');
      console.log('\nHere is your code for review:\n');
      console.log(source);
      return;
    }

    console.log('Analyzing your code...\n');
    const feedback = await ai.tutor(source);
    console.log(feedback);
  } catch (e) {
    if (e instanceof Error) {
      console.error(`Error: ${e.message}`);
    }
  }
}

async function createProgram(description: string) {
  const ai = new AIEngine();

  if (!ai.isAvailable()) {
    console.log('Code generation requires the ANTHROPIC_API_KEY environment variable.');
    console.log('Set it with: export ANTHROPIC_API_KEY=your-key-here');
    return;
  }

  console.log(`Generating program: "${description}"...\n`);
  const code = await ai.createProgram(description);
  console.log(code);

  // Offer to save
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question('\nSave to file? (filename.say or press Enter to skip): ', (filename) => {
    if (filename && filename.trim()) {
      const name = filename.trim().endsWith('.say') ? filename.trim() : filename.trim() + '.say';
      fs.writeFileSync(name, code, 'utf-8');
      console.log(`Saved to ${name}`);
    }
    rl.close();
  });
}

async function submitFile(args: string[]) {
  const filePath = args[1];
  let name = 'Anonymous';
  let server = 'localhost:5000';

  for (let i = 2; i < args.length; i++) {
    if (args[i] === '--name' && args[i + 1]) {
      name = args[++i];
    } else if (args[i] === '--to' && args[i + 1]) {
      server = args[++i];
    }
  }

  try {
    const code = fs.readFileSync(filePath, 'utf-8');
    const url = server.startsWith('http') ? server : `http://${server}`;

    const response = await fetch(`${url}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, code }),
    });

    if (response.ok) {
      console.log(`Submitted "${path.basename(filePath)}" as ${name}`);
    } else {
      console.log(`Submission failed: ${response.statusText}`);
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(`Error: ${e.message}`);
    }
  }
}

async function startRepl() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'say> ',
  });

  console.log('HyperCode REPL v2.0 — Type "quit" to exit');
  console.log('Commands: playground, debug, tutor, create, help');

  const interpreter = createInterpreter(rl);

  let buffer = '';
  let blockDepth = 0;

  rl.prompt();

  rl.on('line', async (line: string) => {
    const trimmed = line.trim().toLowerCase();

    if (trimmed === 'quit' || trimmed === 'exit') {
      interpreter.cleanup();
      rl.close();
      return;
    }

    if (trimmed === 'help') {
      showUsage();
      rl.prompt();
      return;
    }

    buffer += (buffer ? '\n' : '') + line;

    // Track block depth
    const words = trimmed.split(/\s+/);
    for (const word of words) {
      if (['if', 'repeat', 'for', 'kind', 'on', 'command', 'test', 'try', 'when', 'route', 'listen', 'every', 'do'].includes(word)) {
        blockDepth++;
      }
      if (word === 'end') {
        blockDepth = Math.max(0, blockDepth - 1);
      }
    }

    if (blockDepth === 0) {
      try {
        const lexer = new Lexer(buffer);
        const tokens = lexer.tokenize();
        const parser = new Parser();
        const program = parser.parse(tokens);
        await interpreter.run(program);
      } catch (e) {
        if (e instanceof Error) {
          console.error(`Error: ${e.message}`);
        }
      }
      buffer = '';
    } else {
      process.stdout.write('...  ');
      return;
    }

    rl.prompt();
  });

  rl.on('close', () => {
    interpreter.cleanup();
    console.log('\nGoodbye!');
    process.exit(0);
  });
}

main().catch(console.error);

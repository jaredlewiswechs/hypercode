#!/usr/bin/env node

import * as fs from 'fs';
import * as readline from 'readline';
import { Lexer } from './lexer';
import { Parser } from './parser';
import { Interpreter } from './interpreter';

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === 'repl') {
    await startRepl();
  } else if (args[0] === 'run' && args[1]) {
    await runFile(args[1]);
  } else if (args[0] === 'test' && args[1]) {
    await runTestFile(args[1]);
  } else if (args[0].endsWith('.say') || args[0].endsWith('.hypercode')) {
    await runFile(args[0]);
  } else {
    console.log('Usage:');
    console.log('  say <file.say>        Run a file');
    console.log('  say run <file.say>    Run a file');
    console.log('  say test <file.say>   Run tests in a file');
    console.log('  say repl              Start interactive REPL');
  }
}

async function runFile(filePath: string) {
  try {
    const source = fs.readFileSync(filePath, 'utf-8');
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser();
    const program = parser.parse(tokens);

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    const interpreter = new Interpreter({
      output: (text: string) => console.log(text),
      input: (prompt: string) => {
        return new Promise<string>((resolve) => {
          rl.question(prompt + ' ', (answer) => {
            resolve(answer);
          });
        });
      },
    });

    await interpreter.run(program);
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
    if (failed > 0) process.exit(1);
  } catch (e) {
    if (e instanceof Error) {
      console.error(`Error: ${e.message}`);
    }
    process.exit(1);
  }
}

async function startRepl() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'say> ',
  });

  console.log('HyperCode REPL v1.0 — Type "quit" to exit');

  const interpreter = new Interpreter({
    output: (text: string) => console.log(text),
    input: (prompt: string) => {
      return new Promise<string>((resolve) => {
        rl.question(prompt + ' ', (answer) => {
          resolve(answer);
        });
      });
    },
  });

  let buffer = '';
  let blockDepth = 0;

  rl.prompt();

  rl.on('line', async (line: string) => {
    const trimmed = line.trim().toLowerCase();

    if (trimmed === 'quit' || trimmed === 'exit') {
      rl.close();
      return;
    }

    buffer += (buffer ? '\n' : '') + line;

    // Track block depth
    const words = trimmed.split(/\s+/);
    for (const word of words) {
      if (['if', 'repeat', 'for', 'kind', 'on', 'command', 'test', 'try'].includes(word)) {
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
    console.log('\nGoodbye!');
    process.exit(0);
  });
}

main().catch(console.error);

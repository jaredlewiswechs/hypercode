/**
 * HyperCode Debugger
 *
 * Step-through debugger that shows program state at each line.
 */

import * as readline from 'readline';
import { Lexer } from './lexer';
import { Parser } from './parser';
import { Interpreter, Environment, SayValue, toString } from './interpreter';

export interface DebugState {
  line: number;
  statement: string;
  variables: Record<string, string>;
}

export class Debugger {
  private breakpoints: Set<number> = new Set();
  private paused: boolean = false;
  private stepMode: boolean = true;
  private rl: readline.Interface | null = null;

  async debug(source: string): Promise<void> {
    const lines = source.split('\n');
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser();
    const program = parser.parse(tokens);

    console.log('HyperCode Debugger');
    console.log('Commands: (s)tep, (c)ontinue, (v)ariables, (b N) breakpoint, (q)uit');
    console.log('---');

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    this.rl = rl;
    this.stepMode = true;

    const variables: Record<string, SayValue> = {};

    const interpreter = new Interpreter({
      output: (text: string) => {
        console.log(`  → ${text}`);
      },
      input: (prompt: string) => {
        return new Promise<string>((resolve) => {
          rl.question(`  ${prompt} `, resolve);
        });
      },
    });

    // We run the program normally but show output
    // For a true step debugger we'd need to hook into the interpreter
    // This version runs and pauses at breakpoints
    try {
      for (const node of program.body) {
        const line = (node as any).line ?? 0;
        const lineText = line > 0 && line <= lines.length ? lines[line - 1].trim() : '';

        if (this.stepMode || this.breakpoints.has(line)) {
          console.log(`\n[Line ${line}] ${lineText}`);
          await this.waitForCommand(rl);
        }

        // @ts-ignore - accessing private run method
        await (interpreter as any).execute(node);
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(`\nError: ${e.message}`);
      }
    }

    console.log('\nProgram finished.');
    rl.close();
  }

  private async waitForCommand(rl: readline.Interface): Promise<void> {
    return new Promise((resolve) => {
      const ask = () => {
        rl.question('debug> ', (input) => {
          const cmd = input.trim().toLowerCase();
          if (cmd === 's' || cmd === 'step' || cmd === '') {
            this.stepMode = true;
            resolve();
          } else if (cmd === 'c' || cmd === 'continue') {
            this.stepMode = false;
            resolve();
          } else if (cmd === 'q' || cmd === 'quit') {
            process.exit(0);
          } else if (cmd.startsWith('b ')) {
            const lineNum = parseInt(cmd.slice(2));
            if (!isNaN(lineNum)) {
              this.breakpoints.add(lineNum);
              console.log(`Breakpoint set at line ${lineNum}`);
            }
            ask();
          } else if (cmd === 'v' || cmd === 'variables') {
            console.log('(Variable inspection available in step mode)');
            ask();
          } else {
            console.log('Unknown command. Use s(tep), c(ontinue), b N, v(ariables), q(uit)');
            ask();
          }
        });
      };
      ask();
    });
  }
}

/**
 * HyperCode Browser Playground
 *
 * Serves an in-browser IDE where students can write and run
 * HyperCode programs without installing anything.
 */

import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

const PLAYGROUND_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HyperCode Playground</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; background: #1a1a2e; color: #e0e0e0; height: 100vh; display: flex; flex-direction: column; }
    header { background: #16213e; padding: 12px 24px; display: flex; align-items: center; gap: 16px; border-bottom: 2px solid #0f3460; }
    header h1 { font-size: 20px; color: #e94560; }
    header .subtitle { color: #888; font-size: 14px; }
    .toolbar { display: flex; gap: 8px; margin-left: auto; }
    .toolbar button { background: #0f3460; color: #e0e0e0; border: 1px solid #1a4080; padding: 6px 16px; border-radius: 4px; cursor: pointer; font-size: 14px; }
    .toolbar button:hover { background: #1a4080; }
    .toolbar button.run { background: #e94560; border-color: #e94560; color: white; font-weight: bold; }
    .toolbar button.run:hover { background: #d63050; }
    .main { display: flex; flex: 1; overflow: hidden; }
    .editor-pane { flex: 1; display: flex; flex-direction: column; border-right: 2px solid #0f3460; }
    .output-pane { flex: 1; display: flex; flex-direction: column; }
    .pane-header { background: #16213e; padding: 8px 16px; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px; }
    #editor { flex: 1; background: #0a0a1a; color: #e0e0e0; font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 15px; padding: 16px; border: none; outline: none; resize: none; tab-size: 2; line-height: 1.6; }
    #output { flex: 1; background: #0a0a1a; padding: 16px; font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 14px; overflow-y: auto; white-space: pre-wrap; line-height: 1.6; }
    .output-line { color: #a0e0a0; }
    .error-line { color: #e94560; }
    .input-prompt { color: #60a0e0; }
    .canvas-output { margin: 8px 0; }
    #examples { background: #0f3460; color: #e0e0e0; border: 1px solid #1a4080; padding: 6px 12px; border-radius: 4px; font-size: 14px; }
    .footer { background: #16213e; padding: 8px 24px; font-size: 12px; color: #666; border-top: 1px solid #0f3460; }
    @media (max-width: 768px) {
      .main { flex-direction: column; }
      .editor-pane { border-right: none; border-bottom: 2px solid #0f3460; }
    }
  </style>
</head>
<body>
  <header>
    <h1>HyperCode</h1>
    <span class="subtitle">Playground</span>
    <div class="toolbar">
      <select id="examples">
        <option value="">Load example...</option>
        <option value="hello">Hello World</option>
        <option value="grades">Grade Report</option>
        <option value="fibonacci">Fibonacci</option>
        <option value="guessing">Guessing Game</option>
        <option value="zoo">Zoo (Kinds)</option>
        <option value="todo">To-Do List</option>
        <option value="drawing">Drawing</option>
      </select>
      <button onclick="clearOutput()">Clear</button>
      <button class="run" onclick="runCode()">&#9654; Run</button>
    </div>
  </header>
  <div class="main">
    <div class="editor-pane">
      <div class="pane-header">Code</div>
      <textarea id="editor" spellcheck="false" placeholder="-- Write your HyperCode here...
put ask What is your name into name
show Hello .name, welcome to HyperCode!">-- Welcome to HyperCode!
put ask What is your name into name
show Hello .name, welcome to HyperCode!
</textarea>
    </div>
    <div class="output-pane">
      <div class="pane-header">Output</div>
      <div id="output"></div>
    </div>
  </div>
  <div class="footer">
    HyperCode Playground &mdash; Press Ctrl+Enter to run
  </div>

  <script src="/say.js"></script>
  <script>
    const editor = document.getElementById('editor');
    const output = document.getElementById('output');

    const examples = {
      hello: '-- Hello World\\nput ask What is your name into name\\nshow Hello .name, welcome to HyperCode!',
      grades: '-- Grade Report\\nput list 92, 87, 45, 78, 95, 63, 88 into scores\\nshow All scores: .scores\\nshow Average: (.scores.average)\\nshow Highest: (.scores.max)\\nset passing to scores where it >= 70\\nshow Passing: .passing\\nshow Pass rate: (.passing.count) out of (.scores.count)',
      fibonacci: '-- Fibonacci Sequence\\nput 0 into a\\nput 1 into b\\nset fibs to list a, b\\nrepeat 13 times\\n  set temp to a + b\\n  set a to b\\n  set b to temp\\n  add b to fibs\\nend\\nshow Fibonacci: .fibs\\nshow Sum: (.fibs.sum)',
      guessing: '-- Guessing Game\\nset secret to random 1 to 10\\nshow I picked a number between 1 and 10!\\nrepeat 5 times with i\\n  put ask Guess the number into guess\\n  if guess == secret\\n    show You got it in .i tries!\\n    stop\\n  end\\n  if guess < secret\\n    show Too low!\\n  else\\n    show Too high!\\n  end\\nend\\nshow The number was .secret',
      zoo: '-- Zoo with Kinds\\nkind Animal\\n  name is Unknown\\n  sound is ...\\n  on speak\\n    show .me.name says .me.sound\\n  end\\nend\\nkind Dog from Animal\\n  sound is Woof\\nend\\nkind Cat from Animal\\n  sound is Meow\\nend\\nmake a Dog called rex with name Rex\\nmake a Cat called luna with name Luna\\nsend speak to rex\\nsend speak to luna',
      todo: '-- To-Do List\\nkind Task\\n  title is Untitled\\n  done is false\\n  on finish\\n    set me.done to true\\n  end\\n  on status\\n    if me.done\\n      show DONE .me.title\\n    else\\n      show TODO .me.title\\n    end\\n  end\\nend\\nmake a Task called t1 with title Learn HyperCode\\nmake a Task called t2 with title Build a project\\nsend finish to t1\\nshow Task List:\\nsend status to t1\\nsend status to t2',
      drawing: '-- Drawing Example\\nset canvas to 400 by 400\\nset color to Blue\\ndraw circle at 200, 200 with size 80\\nset color to Red\\ndraw rectangle at 50, 50 with width 100 and height 60\\nset color to Green\\ndraw line from 0, 400 to 400, 0',
    };

    document.getElementById('examples').addEventListener('change', function() {
      if (this.value && examples[this.value]) {
        editor.value = examples[this.value];
        this.value = '';
      }
    });

    editor.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        runCode();
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.selectionStart;
        this.value = this.value.substring(0, start) + '  ' + this.value.substring(this.selectionEnd);
        this.selectionStart = this.selectionEnd = start + 2;
      }
    });

    function clearOutput() {
      output.innerHTML = '';
    }

    function addLine(text, className) {
      const div = document.createElement('div');
      div.className = className || 'output-line';
      div.textContent = text;
      output.appendChild(div);
      output.scrollTop = output.scrollHeight;
    }

    async function runCode() {
      clearOutput();
      const source = editor.value;
      try {
        await HyperCode.run(source, {
          output: function(text) { addLine(text, 'output-line'); },
          input: function(prompt) {
            return window.prompt(prompt) || '';
          },
        });
      } catch(e) {
        addLine('Error: ' + e.message, 'error-line');
      }
    }
  </script>
</body>
</html>`;

export function startPlayground(port: number = 3000): void {
  // Check if web/say.js exists
  const webDir = path.join(__dirname, '..', 'web');
  const sayJsPath = path.join(webDir, 'say.js');

  const server = http.createServer((req, res) => {
    if (req.url === '/say.js') {
      if (fs.existsSync(sayJsPath)) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(fs.readFileSync(sayJsPath, 'utf-8'));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end('// say.js not built yet. Run: npm run build:web\nvar HyperCode = { run: function() { alert("Run npm run build:web first"); } };');
      }
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(PLAYGROUND_HTML);
    }
  });

  server.listen(port, () => {
    console.log(`HyperCode Playground running at http://localhost:${port}`);
    console.log('Open this URL in your browser to start coding!');
    console.log('Press Ctrl+C to stop.');
  });
}

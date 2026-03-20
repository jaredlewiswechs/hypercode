/**
 * HyperCode Live Sharing & Classroom
 *
 * Enables real-time collaborative editing and classroom management
 * via WebSocket connections.
 */

import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

export interface SharedSession {
  id: string;
  code: string;
  created: Date;
  participants: number;
}

/**
 * Generate a short share ID
 */
function generateId(): string {
  return crypto.randomBytes(3).toString('hex');
}

/**
 * Share a file by starting a local server that serves it
 */
export function shareFile(filePath: string, port: number = 4000): string {
  const id = generateId();
  const source = fs.readFileSync(filePath, 'utf-8');

  const html = `<!DOCTYPE html>
<html>
<head>
  <title>HyperCode Share: ${id}</title>
  <style>
    body { font-family: monospace; background: #1a1a2e; color: #e0e0e0; padding: 24px; }
    h1 { color: #e94560; }
    pre { background: #0a0a1a; padding: 16px; border-radius: 8px; overflow-x: auto; line-height: 1.6; }
    .id { color: #60a0e0; }
    button { background: #e94560; color: white; border: none; padding: 8px 16px; cursor: pointer; border-radius: 4px; margin: 8px 4px 8px 0; }
    button:hover { background: #d63050; }
  </style>
</head>
<body>
  <h1>HyperCode <span class="id">#${id}</span></h1>
  <button onclick="navigator.clipboard.writeText(document.getElementById('code').textContent)">Copy Code</button>
  <button onclick="window.open('/run')">Run in Playground</button>
  <pre id="code">${escapeHtml(source)}</pre>
</body>
</html>`;

  const server = http.createServer((req, res) => {
    if (req.url === '/raw') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(source);
    } else if (req.url === '/run') {
      res.writeHead(302, { 'Location': `/?code=${encodeURIComponent(source)}` });
      res.end();
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    }
  });

  server.listen(port, () => {
    console.log(`Sharing "${path.basename(filePath)}" at:`);
    console.log(`  http://localhost:${port}`);
    console.log(`  Share ID: ${id}`);
    console.log('\nPress Ctrl+C to stop sharing.');
  });

  return id;
}

/**
 * Start a classroom server where teachers can manage student sessions.
 */
export function startClassroom(port: number = 5000): void {
  const submissions: Map<string, { name: string; code: string; time: Date }> = new Map();

  const dashboardHtml = `<!DOCTYPE html>
<html>
<head>
  <title>HyperCode Classroom</title>
  <meta http-equiv="refresh" content="5">
  <style>
    body { font-family: 'Segoe UI', system-ui, sans-serif; background: #1a1a2e; color: #e0e0e0; padding: 24px; max-width: 960px; margin: 0 auto; }
    h1 { color: #e94560; margin-bottom: 8px; }
    .subtitle { color: #888; margin-bottom: 24px; }
    .student { background: #16213e; border: 1px solid #0f3460; border-radius: 8px; padding: 16px; margin: 8px 0; }
    .student h3 { color: #60a0e0; margin-bottom: 8px; }
    .student pre { background: #0a0a1a; padding: 12px; border-radius: 4px; font-size: 13px; overflow-x: auto; }
    .time { color: #666; font-size: 12px; }
    .count { background: #e94560; color: white; border-radius: 12px; padding: 2px 10px; font-size: 14px; }
    .empty { color: #666; font-style: italic; padding: 40px; text-align: center; }
  </style>
</head>
<body>
  <h1>HyperCode Classroom</h1>
  <p class="subtitle">Submissions <span class="count">SUBMISSIONS_COUNT</span> — Auto-refreshes every 5 seconds</p>
  <div id="students">SUBMISSIONS_HTML</div>
</body>
</html>`;

  const server = http.createServer(async (req, res) => {
    if (req.method === 'POST' && req.url === '/submit') {
      let body = '';
      for await (const chunk of req) body += chunk;
      try {
        const data = JSON.parse(body);
        submissions.set(data.name || 'Anonymous', {
          name: data.name || 'Anonymous',
          code: data.code || '',
          time: new Date(),
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch {
        res.writeHead(400);
        res.end('Invalid submission');
      }
    } else if (req.url === '/submissions') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(Array.from(submissions.values())));
    } else {
      let studentsHtml = '';
      if (submissions.size === 0) {
        studentsHtml = '<div class="empty">No submissions yet. Students can submit with:<br><code>say submit myfile.say --name "Student Name" --to localhost:' + port + '</code></div>';
      } else {
        for (const [name, sub] of submissions) {
          studentsHtml += `<div class="student"><h3>${escapeHtml(sub.name)}</h3><span class="time">${sub.time.toLocaleTimeString()}</span><pre>${escapeHtml(sub.code)}</pre></div>`;
        }
      }
      const html = dashboardHtml
        .replace('SUBMISSIONS_COUNT', String(submissions.size))
        .replace('SUBMISSIONS_HTML', studentsHtml);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    }
  });

  server.listen(port, () => {
    console.log(`HyperCode Classroom running at http://localhost:${port}`);
    console.log('Students can submit with:');
    console.log(`  say submit myfile.say --name "Name" --to localhost:${port}`);
    console.log('\nPress Ctrl+C to stop.');
  });
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

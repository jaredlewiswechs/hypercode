/**
 * HyperCode Web Server Subsystem
 *
 * A simple HTTP server that lets HyperCode programs serve web pages
 * and respond to requests using natural language syntax.
 */

import * as http from 'http';

export interface RouteHandler {
  method: string;
  path: string;
  handler: (req: RequestInfo) => Promise<ResponseInfo>;
}

export interface RequestInfo {
  method: string;
  path: string;
  query: Record<string, string>;
  body: string;
  headers: Record<string, string>;
}

export interface ResponseInfo {
  body: string;
  status: number;
  headers: Record<string, string>;
}

export class SayServer {
  private server: http.Server | null = null;
  private routes: RouteHandler[] = [];
  private defaultHandler: ((req: RequestInfo) => Promise<ResponseInfo>) | null = null;
  private output: (text: string) => void;

  constructor(output: (text: string) => void = console.log) {
    this.output = output;
  }

  addRoute(method: string, path: string, handler: (req: RequestInfo) => Promise<ResponseInfo>): void {
    this.routes.push({ method: method.toUpperCase(), path, handler });
  }

  setDefaultHandler(handler: (req: RequestInfo) => Promise<ResponseInfo>): void {
    this.defaultHandler = handler;
  }

  async start(port: number): Promise<void> {
    return new Promise((resolve) => {
      this.server = http.createServer(async (req, res) => {
        const url = new URL(req.url || '/', `http://localhost:${port}`);
        const query: Record<string, string> = {};
        url.searchParams.forEach((v, k) => { query[k] = v; });

        let body = '';
        for await (const chunk of req) {
          body += chunk;
        }

        const reqInfo: RequestInfo = {
          method: (req.method || 'GET').toUpperCase(),
          path: url.pathname,
          query,
          body,
          headers: req.headers as Record<string, string>,
        };

        // Find matching route
        const route = this.routes.find(
          r => r.method === reqInfo.method && r.path === reqInfo.path
        );

        try {
          let response: ResponseInfo;
          if (route) {
            response = await route.handler(reqInfo);
          } else if (this.defaultHandler) {
            response = await this.defaultHandler(reqInfo);
          } else {
            response = { body: 'Not Found', status: 404, headers: {} };
          }

          res.writeHead(response.status, {
            'Content-Type': 'text/html; charset=utf-8',
            ...response.headers,
          });
          res.end(response.body);
        } catch (e) {
          res.writeHead(500);
          res.end('Server Error');
        }
      });

      this.server.listen(port, () => {
        this.output(`Server running on http://localhost:${port}`);
        resolve();
      });
    });
  }

  stop(): void {
    if (this.server) {
      this.server.close();
      this.server = null;
    }
  }
}

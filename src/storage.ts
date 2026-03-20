/**
 * HyperCode Storage Subsystem
 *
 * Provides persistent key-value storage using a JSON file.
 * Programs can remember values that survive between runs.
 */

import * as fs from 'fs';
import * as path from 'path';

const STORE_FILE = '.hypercode-store.json';

export class Storage {
  private data: Record<string, any>;
  private storePath: string;

  constructor(basePath: string = process.cwd()) {
    this.storePath = path.join(basePath, STORE_FILE);
    this.data = this.load();
  }

  private load(): Record<string, any> {
    try {
      if (fs.existsSync(this.storePath)) {
        return JSON.parse(fs.readFileSync(this.storePath, 'utf-8'));
      }
    } catch {
      // Corrupted file, start fresh
    }
    return {};
  }

  private save(): void {
    fs.writeFileSync(this.storePath, JSON.stringify(this.data, null, 2), 'utf-8');
  }

  remember(key: string, value: any): void {
    this.data[key] = value;
    this.save();
  }

  recall(key: string): any {
    return this.data[key] ?? null;
  }

  forget(key: string): void {
    delete this.data[key];
    this.save();
  }

  clear(): void {
    this.data = {};
    this.save();
  }

  keys(): string[] {
    return Object.keys(this.data);
  }
}

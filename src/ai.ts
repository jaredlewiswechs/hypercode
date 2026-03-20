/**
 * HyperCode AI Subsystem
 *
 * Integrates with the Claude API for the `think` command and
 * AI-powered features like tutor mode and code generation.
 */

export interface AIOptions {
  apiKey?: string;
  model?: string;
  maxTokens?: number;
}

export class AIEngine {
  private apiKey: string;
  private model: string;
  private maxTokens: number;
  private available: boolean;

  constructor(options: AIOptions = {}) {
    this.apiKey = options.apiKey || process.env.ANTHROPIC_API_KEY || '';
    this.model = options.model || 'claude-sonnet-4-20250514';
    this.maxTokens = options.maxTokens || 1024;
    this.available = this.apiKey.length > 0;
  }

  isAvailable(): boolean {
    return this.available;
  }

  async think(prompt: string): Promise<string> {
    if (!this.available) {
      return `[AI not available — set ANTHROPIC_API_KEY environment variable]\nPrompt was: ${prompt}`;
    }

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: this.maxTokens,
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        return `[AI error: ${response.status}] ${error}`;
      }

      const data = await response.json() as any;
      if (data.content && data.content.length > 0) {
        return data.content[0].text;
      }
      return '[No response from AI]';
    } catch (e) {
      return `[AI error: ${e instanceof Error ? e.message : String(e)}]`;
    }
  }

  async tutor(code: string, error?: string): Promise<string> {
    const prompt = error
      ? `You are a friendly coding tutor helping a student learn HyperCode (a simple English-like programming language). The student's code has an error. Explain the error in simple terms and suggest how to fix it.\n\nStudent's code:\n\`\`\`\n${code}\n\`\`\`\n\nError: ${error}\n\nGive a brief, encouraging explanation.`
      : `You are a friendly coding tutor. Review this HyperCode program and give brief, constructive feedback:\n\n\`\`\`\n${code}\n\`\`\`\n\nGive 2-3 short tips for improvement.`;
    return this.think(prompt);
  }

  async createProgram(description: string): Promise<string> {
    const prompt = `You are a HyperCode code generator. HyperCode is an English-like programming language. Generate a complete HyperCode program based on this description:

"${description}"

HyperCode syntax rules:
- Variables: "put VALUE into NAME" for text, "set NAME to EXPRESSION" for math
- Output: "show TEXT" with ".var" for interpolation and "(expr)" for math
- Input: "put ask QUESTION into NAME"
- If/else: "if CONDITION ... else ... end"
- Loops: "repeat N times ... end", "for each X in LIST ... end"
- Lists: "put list 1, 2, 3 into nums"
- Functions: "command NAME params ... end" with "return VALUE"
- Classes: "kind NAME ... end" with "on METHOD ... end"
- Objects: "make a KIND called NAME with prop VALUE"
- Methods: "send METHOD to OBJECT"
- Comments: "-- comment"

Output ONLY the HyperCode code, no explanation.`;
    return this.think(prompt);
  }
}

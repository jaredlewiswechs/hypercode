/**
 * HyperCode Graphics Subsystem
 *
 * Generates SVG output from draw commands. When running in CLI mode,
 * writes SVG files. When running in the browser playground, renders to
 * an in-page canvas element.
 */

export interface DrawCommand {
  shape: string;
  params: Record<string, any>;
}

export interface CanvasState {
  width: number;
  height: number;
  color: string;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  commands: DrawCommand[];
}

export function createCanvas(width: number = 400, height: number = 400): CanvasState {
  return {
    width,
    height,
    color: '#000000',
    fillColor: '#000000',
    strokeColor: '#000000',
    strokeWidth: 1,
    commands: [],
  };
}

export function addDrawCommand(canvas: CanvasState, shape: string, params: Record<string, any>): void {
  canvas.commands.push({ shape, params: { ...params, fill: canvas.fillColor, stroke: canvas.strokeColor, strokeWidth: canvas.strokeWidth } });
}

export function setCanvasColor(canvas: CanvasState, color: string): void {
  canvas.fillColor = resolveColor(color);
  canvas.strokeColor = resolveColor(color);
  canvas.color = resolveColor(color);
}

export function clearCanvas(canvas: CanvasState): void {
  canvas.commands = [];
}

export function canvasToSVG(canvas: CanvasState): string {
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}">\n`;
  svg += `  <rect width="100%" height="100%" fill="white"/>\n`;

  for (const cmd of canvas.commands) {
    svg += renderCommand(cmd);
  }

  svg += `</svg>`;
  return svg;
}

export function canvasToText(canvas: CanvasState): string {
  const lines: string[] = [`Canvas ${canvas.width}x${canvas.height}:`];
  for (const cmd of canvas.commands) {
    lines.push(describeCommand(cmd));
  }
  return lines.join('\n');
}

function renderCommand(cmd: DrawCommand): string {
  const p = cmd.params;
  switch (cmd.shape) {
    case 'circle':
      return `  <circle cx="${p.x ?? 0}" cy="${p.y ?? 0}" r="${p.size ?? p.radius ?? 50}" fill="${p.fill}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}"/>\n`;
    case 'rectangle':
    case 'rect':
      return `  <rect x="${p.x ?? 0}" y="${p.y ?? 0}" width="${p.width ?? 100}" height="${p.height ?? 100}" fill="${p.fill}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}"/>\n`;
    case 'line':
      return `  <line x1="${p.x1 ?? 0}" y1="${p.y1 ?? 0}" x2="${p.x2 ?? 100}" y2="${p.y2 ?? 100}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}"/>\n`;
    case 'text':
      return `  <text x="${p.x ?? 0}" y="${p.y ?? 20}" fill="${p.fill}" font-size="${p.size ?? 16}">${p.text ?? ''}</text>\n`;
    case 'ellipse':
      return `  <ellipse cx="${p.x ?? 0}" cy="${p.y ?? 0}" rx="${p.rx ?? p.width ?? 50}" ry="${p.ry ?? p.height ?? 30}" fill="${p.fill}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}"/>\n`;
    case 'triangle': {
      const x = p.x ?? 0, y = p.y ?? 0, s = p.size ?? 50;
      return `  <polygon points="${x},${y - s} ${x - s},${y + s} ${x + s},${y + s}" fill="${p.fill}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}"/>\n`;
    }
    case 'star': {
      const cx = p.x ?? 0, cy = p.y ?? 0, r = p.size ?? 50;
      const points = [];
      for (let i = 0; i < 10; i++) {
        const angle = (Math.PI / 5) * i - Math.PI / 2;
        const rad = i % 2 === 0 ? r : r * 0.4;
        points.push(`${cx + rad * Math.cos(angle)},${cy + rad * Math.sin(angle)}`);
      }
      return `  <polygon points="${points.join(' ')}" fill="${p.fill}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}"/>\n`;
    }
    default:
      return `  <!-- Unknown shape: ${cmd.shape} -->\n`;
  }
}

function describeCommand(cmd: DrawCommand): string {
  const p = cmd.params;
  switch (cmd.shape) {
    case 'circle': return `  Circle at (${p.x ?? 0}, ${p.y ?? 0}) size ${p.size ?? p.radius ?? 50}, color ${p.fill}`;
    case 'rectangle': case 'rect': return `  Rectangle at (${p.x ?? 0}, ${p.y ?? 0}) ${p.width ?? 100}x${p.height ?? 100}, color ${p.fill}`;
    case 'line': return `  Line from (${p.x1 ?? 0}, ${p.y1 ?? 0}) to (${p.x2 ?? 100}, ${p.y2 ?? 100}), color ${p.stroke}`;
    case 'text': return `  Text "${p.text ?? ''}" at (${p.x ?? 0}, ${p.y ?? 20}), color ${p.fill}`;
    default: return `  ${cmd.shape} with params ${JSON.stringify(p)}`;
  }
}

function resolveColor(color: string): string {
  const colorMap: Record<string, string> = {
    red: '#FF0000', blue: '#0000FF', green: '#008000', yellow: '#FFFF00',
    orange: '#FFA500', purple: '#800080', pink: '#FFC0CB', black: '#000000',
    white: '#FFFFFF', gray: '#808080', grey: '#808080', brown: '#8B4513',
    cyan: '#00FFFF', magenta: '#FF00FF', lime: '#00FF00', navy: '#000080',
    teal: '#008080', maroon: '#800000', olive: '#808000', coral: '#FF7F50',
    salmon: '#FA8072', gold: '#FFD700', silver: '#C0C0C0', indigo: '#4B0082',
    violet: '#EE82EE', turquoise: '#40E0D0', crimson: '#DC143C',
    skyblue: '#87CEEB', tomato: '#FF6347', plum: '#DDA0DD',
  };
  return colorMap[color.toLowerCase()] ?? color;
}

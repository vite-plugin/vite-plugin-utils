import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'

export function cleanUrl(url: string) {
  const queryRE = /\?.*$/s
  const hashRE = /#.*$/s
  return url.replace(hashRE, '').replace(queryRE, '')
}

/**
 * @see https://github.com/rich-harris/magic-string
 */
export class MagicString {
  private overwrites!: { loc: [number, number], content: string }[]
  private starts = ''
  private ends = ''

  constructor(
    public str: string
  ) { }

  public append(content: string) {
    this.ends += content
    return this
  }

  public prepend(content: string) {
    this.starts = content + this.starts
    return this
  }

  public overwrite(start: number, end: number, content: string) {
    if (end < start) {
      throw new Error(`"end" con't be less than "start".`)
    }
    if (!this.overwrites) {
      this.overwrites = []
    }
    this.overwrites.push({ loc: [start, end], content })
    return this
  }

  public toString() {
    let str = this.str
    if (this.overwrites) {
      const arr = [...this.overwrites].sort((a, b) => b.loc[0] - a.loc[0])
      for (const { loc: [start, end], content } of arr) {
        // TODO: check start or end overlap
        str = str.slice(0, start) + content + str.slice(end)
      }
    }
    return this.starts + str + this.ends
  }
}

/**
 * - `'' -> '.'`
 * - `foo` -> `./foo`
 */
export function relativeify(relative: string) {
  if (relative === '') {
    return '.'
  }
  if (!relative.startsWith('.')) {
    return './' + relative
  }
  return relative
}

/**
 * Ast tree walk
 */
export async function walk<T = Record<string, any>>(
  ast: T,
  visitors: {
    [type: string]: (node: T, ancestors: T[]) => void | Promise<void>,
  },
  ancestors: T[] = [],
) {
  if (!ast) return

  if (Array.isArray(ast)) {
    for (const element of ast as T[]) {
      await walk(element, visitors, ancestors)
    }
  } else {
    ancestors = ancestors.concat(ast)
    for (const key of Object.keys(ast)) {
      // @ts-ignore
      await (typeof ast[key] === 'object' && walk(ast[key], visitors, ancestors))
    }
  }

  await visitors[(ast as any).type]?.(ast, ancestors)
}

walk.sync = function walkSync<T = Record<string, any>>(
  ast: T,
  visitors: {
    [type: string]: (node: T, ancestors: T[]) => void,
  },
  ancestors: T[] = [],
) {
  if (!ast) return

  if (Array.isArray(ast)) {
    for (const element of ast as T[]) {
      walkSync(element, visitors, ancestors)
    }
  } else {
    ancestors = ancestors.concat(ast)
    for (const key of Object.keys(ast)) {
      // @ts-ignore
      typeof ast[key] === 'object' && walkSync(ast[key], visitors, ancestors)
    }
  }
  visitors[(ast as any).type]?.(ast, ancestors)
}

const isWindows = os.platform() === 'win32'
function slash(p: string): string {
  return p.replace(/\\/g, '/')
}
export function normalizePath(id: string): string {
  return path.posix.normalize(isWindows ? slash(id) : id)
}

/**
* @see https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
* @see https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
*/
export const COLOURS = {
  $: (c: number) => (str: string) => `\x1b[${c}m` + str + '\x1b[0m',
  gary: (str: string) => COLOURS.$(90)(str),
  cyan: (str: string) => COLOURS.$(36)(str),
  yellow: (str: string) => COLOURS.$(33)(str),
  green: (str: string) => COLOURS.$(32)(str),
  red: (str: string) => COLOURS.$(31)(str),
}

const VOLUME_RE = /^[A-Z]:/i
export function node_modules(root: string, paths: string[] = []): string[] {
  if (!root) return paths
  if (!(root.startsWith('/') || VOLUME_RE.test(root))) return paths

  const p = path.posix.join(normalizePath(root), 'node_modules')
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) {
    paths = paths.concat(p)
  }
  root = path.posix.join(root, '..')

  return (root === '/' || /^[A-Z]:$/i.test(root))
    ? paths
    : node_modules(root, paths)
}

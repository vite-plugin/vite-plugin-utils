
// https://github.com/vitejs/vite/blob/c3f6731bafeadd310efa4325cb8dcc639636fe48/packages/vite/src/node/constants.ts#L25-L33
export const DEFAULT_EXTENSIONS = [
  '.mjs',
  '.js',
  '.mts',
  '.ts',
  '.jsx',
  '.tsx',
  '.json'
]
export const KNOWN_SFC_EXTENSIONS = [
  '.vue',
  '.svelte',
]

// https://github.com/vitejs/vite/blob/c3f6731bafeadd310efa4325cb8dcc639636fe48/packages/vite/src/node/constants.ts#L91-L123
export const KNOWN_ASSET_TYPES = [
  // images
  'png',
  'jpe?g',
  'jfif',
  'pjpeg',
  'pjp',
  'gif',
  'svg',
  'ico',
  'webp',
  'avif',

  // media
  'mp4',
  'webm',
  'ogg',
  'mp3',
  'wav',
  'flac',
  'aac',

  // fonts
  'woff2?',
  'eot',
  'ttf',
  'otf',

  // other
  'webmanifest',
  'pdf',
  'txt'
]

// https://github.com/vitejs/vite/blob/29292af23fd7bc498056a7c048cac9b3bca3303d/packages/vite/src/node/optimizer/esbuildDepPlugin.ts#L20-L29
export const KNOWN_CSS_TYPES = [
  'css',
  // supported pre-processor types
  'less',
  'sass',
  'scss',
  'styl',
  'stylus',
  'pcss',
  'postcss',
]

export const multilineCommentsRE = /\/\*(.|[\r\n])*?\*\//gm
export const singlelineCommentsRE = /\/\/.*/g

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
};

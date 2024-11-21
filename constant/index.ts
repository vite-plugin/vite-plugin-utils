
// https://github.com/vitejs/vite/blob/c3f6731bafeadd310efa4325cb8dcc639636fe48/packages/vite/src/node/constants.ts#L25-L33
export const DEFAULT_EXTENSIONS = [
  '.cjs',
  '.mjs',
  '.js',
  '.cts',
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
export const singlelineCommentsRE = /\/\/.*(?=[\n\r])/g

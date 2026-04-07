import { cpSync, mkdirSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const packageRoot = path.resolve(__dirname, '..')
const repoRoot = path.resolve(packageRoot, '..', '..')
const target = path.join(packageRoot, 'assets')

const EXCLUDED_NAMES = new Set([
  'node_modules',
  'dist',
  'package-lock.json',
  'tsconfig.tsbuildinfo',
])

function filteredCopy(source, destination) {
  cpSync(source, destination, {
    recursive: true,
    filter: sourcePath => !EXCLUDED_NAMES.has(path.basename(sourcePath)),
  })
}

rmSync(target, { recursive: true, force: true })
mkdirSync(target, { recursive: true })
filteredCopy(path.join(repoRoot, 'core'), path.join(target, 'core'))
filteredCopy(path.join(repoRoot, 'platforms'), path.join(target, 'platforms'))
filteredCopy(path.join(repoRoot, 'assets'), path.join(target, 'starters'))
filteredCopy(path.join(repoRoot, 'integrations'), path.join(target, 'core', 'bundle', 'integrations'))
cpSync(
  path.join(repoRoot, 'references', 'integration-gotchas.md'),
  path.join(target, 'core', 'bundle', 'references', 'integration-gotchas.md'),
)

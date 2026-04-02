import { cpSync, mkdirSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const packageRoot = path.resolve(__dirname, '..')
const repoRoot = path.resolve(packageRoot, '..', '..')
const target = path.join(packageRoot, 'assets')

rmSync(target, { recursive: true, force: true })
mkdirSync(target, { recursive: true })
cpSync(path.join(repoRoot, 'core'), path.join(target, 'core'), { recursive: true })
cpSync(path.join(repoRoot, 'platforms'), path.join(target, 'platforms'), { recursive: true })
cpSync(path.join(repoRoot, 'assets'), path.join(target, 'starters'), { recursive: true })

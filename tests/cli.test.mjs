import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const repoRoot = path.resolve(import.meta.dirname, '..')
const cli = path.join(repoRoot, 'packages', 'cli', 'dist', 'index.js')

function run(args, home) {
  return spawnSync(process.execPath, [cli, ...args], {
    cwd: repoRoot,
    env: {
      ...process.env,
      HOME: home,
    },
    encoding: 'utf8',
  })
}

test('init installs a platform bundle', () => {
  const home = mkdtempSync(path.join(os.tmpdir(), 'pretext-home-'))
  try {
    const result = run(['init', '--ai', 'codex', '--force', '--offline'], home)
    assert.equal(result.status, 0, result.stderr)
    const skillPath = path.join(home, '.codex', 'skills', 'pretext-frontend-motion', 'SKILL.md')
    const manifestPath = path.join(home, '.codex', 'skills', 'pretext-frontend-motion', '.pretext-install.json')
    assert.match(readFileSync(skillPath, 'utf8'), /Pretext Frontend Motion/)
    assert.match(readFileSync(manifestPath, 'utf8'), /"platform": "codex"/)
  } finally {
    rmSync(home, { recursive: true, force: true })
  }
})

test('init accepts assistant aliases like claude-code', () => {
  const home = mkdtempSync(path.join(os.tmpdir(), 'pretext-home-'))
  try {
    const result = run(['init', 'claude-code', '--force', '--offline'], home)
    assert.equal(result.status, 0, result.stderr)
    const skillPath = path.join(home, '.claude', 'skills', 'pretext-frontend-motion', 'SKILL.md')
    assert.match(readFileSync(skillPath, 'utf8'), /Pretext Frontend Motion/)
  } finally {
    rmSync(home, { recursive: true, force: true })
  }
})

test('init all installs multiple targets', () => {
  const home = mkdtempSync(path.join(os.tmpdir(), 'pretext-home-'))
  try {
    const result = run(['init', '--ai', 'all', '--force'], home)
    assert.equal(result.status, 0, result.stderr)
    const codexPath = path.join(home, '.codex', 'skills', 'pretext-frontend-motion', 'SKILL.md')
    const copilotPath = path.join(home, '.github', 'prompts', 'pretext-frontend-motion', 'PROMPT.md')
    assert.match(readFileSync(codexPath, 'utf8'), /official Pretext demo families/)
    assert.match(readFileSync(copilotPath, 'utf8'), /Required constraints:/)
  } finally {
    rmSync(home, { recursive: true, force: true })
  }
})

test('update refreshes installed platforms', () => {
  const home = mkdtempSync(path.join(os.tmpdir(), 'pretext-home-'))
  try {
    const initResult = run(['init', '--ai', 'cursor', '--force'], home)
    assert.equal(initResult.status, 0, initResult.stderr)
    const updateResult = run(['update', '--offline'], home)
    assert.equal(updateResult.status, 0, updateResult.stderr)
    assert.match(updateResult.stdout, /Updated 1 install/)
  } finally {
    rmSync(home, { recursive: true, force: true })
  }
})

test('doctor reports supported platforms', () => {
  const home = mkdtempSync(path.join(os.tmpdir(), 'pretext-home-'))
  try {
    const result = run(['doctor'], home)
    assert.equal(result.status, 0, result.stderr)
    assert.match(result.stdout, /supportedPlatforms/)
    assert.match(result.stdout, /codex \(Codex\):/)
    assert.match(result.stdout, /claude-code \(Claude Code\):/)
    assert.match(result.stdout, /windsurf \(Windsurf\):/)
  } finally {
    rmSync(home, { recursive: true, force: true })
  }
})

test('scaffold creates a runnable static starter', () => {
  const home = mkdtempSync(path.join(os.tmpdir(), 'pretext-home-'))
  const outDir = path.join(home, 'demo')
  try {
    const result = run(['scaffold', '--kind', 'predictive-ui', '--out', outDir, '--title', 'Signal Wall'], home)
    assert.equal(result.status, 0, result.stderr)
    const packageJsonPath = path.join(outDir, 'package.json')
    const indexHtmlPath = path.join(outDir, 'index.html')
    const mainJsPath = path.join(outDir, 'src', 'main.js')
    assert.equal(existsSync(packageJsonPath), true)
    assert.equal(existsSync(indexHtmlPath), true)
    assert.equal(existsSync(mainJsPath), true)
    assert.match(readFileSync(packageJsonPath, 'utf8'), /"start": "serve -l 4173 \."/)
    assert.match(readFileSync(indexHtmlPath, 'utf8'), /@chenglou\/pretext/)
    assert.match(readFileSync(mainJsPath, 'utf8'), /Signal Wall/)
  } finally {
    rmSync(home, { recursive: true, force: true })
  }
})

test('validate succeeds for the repo root', () => {
  const home = mkdtempSync(path.join(os.tmpdir(), 'pretext-home-'))
  try {
    const result = run(['validate', repoRoot], home)
    assert.equal(result.status, 0, result.stderr)
    assert.match(result.stdout, /Validation passed\./)
  } finally {
    rmSync(home, { recursive: true, force: true })
  }
})

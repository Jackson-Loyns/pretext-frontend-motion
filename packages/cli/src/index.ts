#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, realpathSync, rmSync, statSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { DEFAULT_PRESETS, listKinds, STARTER_DIRECTORIES, STARTER_PRESETS } from './starter-presets.js'
import type { CliOptions, CommandName, InstallRecord, PlatformConfig, StarterKind } from './types.js'

export type { CliOptions, CommandName, InstallRecord, PlatformConfig, StarterKind } from './types.js'
export { DEFAULT_PRESETS, listKinds, STARTER_DIRECTORIES, STARTER_PRESETS } from './starter-presets.js'

type ParsedOptions = CliOptions & {
  positionals: string[]
}

const SHARED_FRONTMATTER_DESCRIPTION =
  'Build bold text-driven frontend demos across Accordion, Bubbles, Dynamic Layout, Variable Typographic ASCII, Editorial Engine, Justification Comparison, Rich Text, and Masonry. Use when the request needs strong frontend style, intentional typography, routed text layout, width-tight multiline UI, or kinetic typography driven by real Pretext measurement instead of DOM text reads.'

const PLATFORM_ALIASES: Record<string, string> = {
  antigravity: 'antigravity',
  claude: 'claude',
  'claude-code': 'claude',
  claudecode: 'claude',
  codex: 'codex',
  continue: 'continue',
  copilot: 'copilot',
  'github-copilot': 'copilot',
  cursor: 'cursor',
  gemini: 'gemini',
  'gemini-cli': 'gemini',
  kiro: 'kiro',
  opencode: 'opencode',
  'open-code': 'opencode',
  qoder: 'qoder',
  roocode: 'roocode',
  'roo-code': 'roocode',
  trae: 'trae',
  windsurf: 'windsurf',
  all: 'all',
}

const PREFERRED_TARGETS: Record<string, string> = {
  antigravity: 'antigravity',
  claude: 'claude-code',
  codex: 'codex',
  continue: 'continue',
  copilot: 'github-copilot',
  cursor: 'cursor',
  gemini: 'gemini-cli',
  kiro: 'kiro',
  opencode: 'opencode',
  qoder: 'qoder',
  roocode: 'roo-code',
  trae: 'trae',
  windsurf: 'windsurf',
}

const REQUIRED_FILES = [
  'package.json',
  'SKILL.md',
  'README.md',
  'CONTRIBUTING.md',
  'agents/openai.yaml',
  'docs/quick-reference.md',
  'docs/cli.md',
  'docs/official-demos.md',
  'docs/platforms/README.md',
  'docs/install.md',
  'docs/update.md',
  'docs/guide.md',
  'docs/design-rules.md',
  'docs/examples.md',
  'docs/troubleshooting.md',
  'references/official-notes.md',
  'references/capabilities.md',
  'references/patterns.md',
  'references/design-rules.md',
  'references/react-migration.md',
  'core/metadata/demos.json',
  'core/metadata/example-recognition.json',
  'core/templates/skill.md',
  'core/templates/prompt.md',
  'core/bundle/references/official-notes.md',
  'core/bundle/references/demo-family-map.md',
  'core/bundle/references/prompt-recipes.md',
  'core/bundle/references/design-rules.md',
  'core/bundle/references/font-strategy.md',
  'core/bundle/agents/openai.yaml',
  'core/bundle/examples/README.md',
  'packages/cli/package.json',
  'packages/cli/tsconfig.json',
  'packages/cli/src/index.ts',
  'packages/cli/src/types.ts',
  'packages/cli/src/starter-presets.ts',
  'packages/cli/scripts/copy-assets.mjs',
  'evals/evals.json',
  'scripts/pretext_cli.py',
  'scripts/new_pretext_demo.py',
  'scripts/install_symlink.sh',
  'scripts/update_from_git.sh',
] as const

const STARTERS = [
  'core/bundle/examples/accordion',
  'core/bundle/examples/bubbles',
  'core/bundle/examples/dynamic-layout',
  'core/bundle/examples/editorial-engine',
  'core/bundle/examples/masonry',
  'core/bundle/examples/variable-typographic-ascii',
] as const

const EXECUTABLE_SCRIPTS = [
  'scripts/pretext_cli.py',
  'scripts/new_pretext_demo.py',
  'scripts/install_symlink.sh',
  'scripts/update_from_git.sh',
] as const

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function runCli(argv = process.argv.slice(2)): void {
  const [commandRaw, ...rest] = argv
  const command = (commandRaw ?? 'help') as CommandName
  const options = parseOptions(rest)

  switch (command) {
    case 'init':
      initInstall(options.ai ?? options.positionals[0], options)
      return
    case 'update':
      updateInstalled(options)
      return
    case 'versions':
      printVersions()
      return
    case 'doctor':
      printDoctor()
      return
    case 'scaffold':
      scaffoldStarter(options)
      return
    case 'list-kinds':
      printKinds()
      return
    case 'list-presets':
      printPresets(options.kind ?? options.positionals[0])
      return
    case 'validate':
      validateSkill(options.path ?? options.positionals[0] ?? '.')
      return
    default:
      printHelp()
  }
}

function parseOptions(args: string[]): ParsedOptions {
  const options: ParsedOptions = {
    offline: true,
    force: false,
    positionals: [],
  }

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]
    if (arg === undefined) continue
    if (arg === '--offline') {
      options.offline = true
      continue
    }
    if (arg === '--force') {
      options.force = true
      continue
    }
    if (arg === '--ai') {
      options.ai = args[index + 1]
      index += 1
      continue
    }
    if (arg === '--kind') {
      options.kind = args[index + 1] as StarterKind | undefined
      index += 1
      continue
    }
    if (arg === '--out') {
      options.out = args[index + 1]
      index += 1
      continue
    }
    if (arg === '--title') {
      options.title = args[index + 1]
      index += 1
      continue
    }
    if (arg === '--preset') {
      options.preset = args[index + 1]
      index += 1
      continue
    }
    if (arg === '--path') {
      options.path = args[index + 1]
      index += 1
      continue
    }
    if (arg.startsWith('-')) {
      throw new Error(`Unknown option: ${arg}`)
    }
    options.positionals.push(arg)
  }

  return options
}

function printHelp(): void {
  console.log(`pretext-skill

Usage:
  pretext-skill init <target> [--force]
  pretext-skill update [--offline] [--force]
  pretext-skill versions
  pretext-skill doctor
  pretext-skill scaffold --kind <kind> --out <dir> [--title <title>] [--preset <name>]
  pretext-skill list-kinds
  pretext-skill list-presets [--kind <kind>]
  pretext-skill validate [path]

Preferred targets:
  codex
  claude-code
  cursor
  windsurf
  gemini-cli
  opencode
  continue
  github-copilot
  roo-code
  qoder
  kiro
  trae
  antigravity
`)
}

function printVersions(): void {
  const version = getCliVersion()
  console.log(`pretext-skill ${version}`)
  console.log(`bundle ${version}`)
  console.log('distribution bundled-in-package')
}

function printDoctor(): void {
  const platforms = loadPlatforms()
  const home = os.homedir()
  console.log(`home ${home}`)
  console.log(`cliVersion ${getCliVersion()}`)
  console.log('supportedPlatforms')
  for (const platform of platforms) {
    const installPath = getInstallPath(platform)
    const manifestPath = path.join(installPath, '.pretext-install.json')
    const status = existsSync(installPath) ? 'installed' : 'missing'
    const preferredTarget = getPreferredTarget(platform.platform)
    console.log(`- ${preferredTarget} (${platform.displayName}): ${status} -> ${installPath}`)
    if (existsSync(manifestPath)) {
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as InstallRecord
      console.log(`  version=${manifest.version} installedAt=${manifest.installedAt}`)
    }
  }
}

function initInstall(target: string | undefined, options: CliOptions): void {
  requireOption(target, 'A target is required for init')
  if (target === undefined) throw new Error('A target is required for init')
  const resolvedTarget = target
  const platforms = loadPlatforms()
  if (options.offline) {
    console.log('Using bundled assets only.')
  }

  const normalizedTarget = normalizeTarget(resolvedTarget)
  const selected = normalizedTarget === 'all'
    ? platforms
    : platforms.filter(platform => platform.platform === normalizedTarget)

  if (selected.length === 0) {
    throw new Error(`Unsupported platform: ${target}`)
  }

  for (const platform of selected) {
    installPlatform(platform, options.force)
  }
}

function scaffoldStarter(options: CliOptions): void {
  const kind = options.kind
  const out = options.out
  const title = options.title ?? 'Pretext Demo'

  requireOption(kind, '--kind is required for scaffold')
  requireOption(out, '--out is required for scaffold')
  if (kind === undefined) throw new Error('--kind is required for scaffold')
  if (out === undefined) throw new Error('--out is required for scaffold')
  const starterKind = kind
  const outputDirectory = out

  const starterRoot = resolveStarterRoot()
  const starterDirectory = STARTER_DIRECTORIES[starterKind]
  const starterPath = path.join(starterRoot, starterDirectory)
  if (!existsSync(starterPath)) {
    throw new Error(`Starter not found: ${starterPath}`)
  }

  const preset = options.preset ?? DEFAULT_PRESETS[starterKind]
  const presetValues = STARTER_PRESETS[starterKind][preset]
  if (presetValues === undefined) {
    throw new Error(`Unknown preset for ${starterKind}: ${preset}`)
  }

  const outPath = path.resolve(process.cwd(), outputDirectory)
  if (existsSync(outPath)) {
    throw new Error(`Output already exists: ${outPath}`)
  }

  cpSync(starterPath, outPath, { recursive: true })
  replaceTokens(outPath, {
    '__DEMO_TITLE__': title,
    ...presetValues,
  })

  console.log(`Created ${starterKind} demo at ${outPath}`)
  console.log(`Preset: ${preset}`)
  console.log('Next steps:')
  console.log(`  cd ${outPath}`)
  console.log('  npm install')
  console.log('  npm start')
}

function printKinds(): void {
  console.log('Available kinds:')
  for (const kind of listKinds()) {
    console.log(`  - ${kind}`)
  }
}

function printPresets(kind?: string): void {
  if (kind !== undefined) {
    if (!isStarterKind(kind)) {
      throw new Error(`Unknown kind for presets: ${kind}`)
    }
    console.log(`Available presets for ${kind}:`)
    for (const preset of Object.keys(STARTER_PRESETS[kind]).sort()) {
      const marker = DEFAULT_PRESETS[kind] === preset ? ' (default)' : ''
      console.log(`  - ${preset}${marker}`)
    }
    return
  }

  console.log('Available presets:')
  for (const currentKind of listKinds()) {
    console.log(`- ${currentKind}:`)
    for (const preset of Object.keys(STARTER_PRESETS[currentKind]).sort()) {
      const marker = DEFAULT_PRESETS[currentKind] === preset ? ' (default)' : ''
      console.log(`    - ${preset}${marker}`)
    }
  }
}

function validateSkill(targetPath: string): void {
  const root = path.resolve(process.cwd(), targetPath)
  const errors: string[] = []

  for (const relativePath of REQUIRED_FILES) {
    const absolutePath = path.join(root, relativePath)
    if (!existsSync(absolutePath)) {
      errors.push(`Missing required file: ${relativePath}`)
    }
  }

  const skillPath = path.join(root, 'SKILL.md')
  if (existsSync(skillPath)) {
    const skillText = readFileSync(skillPath, 'utf8')
    if (!hasFrontmatterField(skillText, 'name')) {
      errors.push('SKILL.md is missing frontmatter field: name')
    }
    if (!hasFrontmatterField(skillText, 'description')) {
      errors.push('SKILL.md is missing frontmatter field: description')
    }
  }

  for (const relativePath of EXECUTABLE_SCRIPTS) {
    const absolutePath = path.join(root, relativePath)
    if (!existsSync(absolutePath)) continue
    const mode = statSync(absolutePath).mode
    if ((mode & 0o100) === 0) {
      errors.push(`${relativePath} is not executable`)
    }
  }

  for (const starter of STARTERS) {
    const starterRoot = path.join(root, starter)
    if (!existsSync(starterRoot)) {
      errors.push(`Missing starter directory: ${starter}`)
      continue
    }
    for (const relativePath of ['package.json', 'index.html', 'src/main.js', 'src/styles.css']) {
      if (!existsSync(path.join(starterRoot, relativePath))) {
        errors.push(`Starter missing ${relativePath}: ${starter}`)
      }
    }
  }

  if (errors.length > 0) {
    console.log('Validation failed:')
    for (const error of errors) {
      console.log(`- ${error}`)
    }
    throw new Error('Skill validation failed.')
  }

  console.log('Validation passed.')
  console.log(`Skill root: ${root}`)
  console.log(`Checked files: ${REQUIRED_FILES.length}`)
  console.log(`Checked starters: ${STARTERS.length}`)
}

function normalizeTarget(target: string): string {
  return PLATFORM_ALIASES[target.toLowerCase()] ?? target.toLowerCase()
}

function getPreferredTarget(platform: string): string {
  return PREFERRED_TARGETS[platform] ?? platform
}

function updateInstalled(options: CliOptions): void {
  const platforms = loadPlatforms()
  if (options.offline) {
    console.log('Using bundled assets only.')
  }
  let updated = 0
  for (const platform of platforms) {
    const installPath = getInstallPath(platform)
    if (!existsSync(installPath)) continue
    installPlatform(platform, true)
    updated += 1
  }
  if (updated === 0) {
    throw new Error('No installed platforms found to update.')
  }
  console.log(`Updated ${updated} install(s).`)
}

function installPlatform(platform: PlatformConfig, force: boolean): void {
  const installPath = getInstallPath(platform)
  if (existsSync(installPath)) {
    if (!force) {
      const hasContents = readdirSync(installPath).length > 0
      if (hasContents) {
        throw new Error(`Install path already exists and is not empty: ${installPath}. Re-run with --force.`)
      }
    } else {
      rmSync(installPath, { recursive: true, force: true })
    }
  }

  mkdirSync(installPath, { recursive: true })
  const assetRoot = resolveAssetRoot()
  const bundleRoot = path.join(assetRoot, 'core', 'bundle')
  cpSync(bundleRoot, installPath, { recursive: true })

  const entry = renderEntry(platform)
  writeFileSync(path.join(installPath, platform.folderStructure.filename), entry, 'utf8')
  writeFileSync(
    path.join(installPath, '.pretext-install.json'),
    JSON.stringify(
      {
        version: getCliVersion(),
        platform: platform.platform,
        displayName: platform.displayName,
        installedAt: new Date().toISOString(),
        installPath,
      } satisfies InstallRecord,
      null,
      2,
    ),
    'utf8',
  )

  console.log(`Installed ${platform.displayName} -> ${installPath}`)
  console.log(`Restart ${platform.displayName} if it is already open so it reloads the bundle.`)
}

function renderEntry(platform: PlatformConfig): string {
  const assetRoot = resolveAssetRoot()
  const templateFile = platform.entryType === 'prompt' ? 'prompt.md' : 'skill.md'
  let template = readFileSync(path.join(assetRoot, 'core', 'templates', templateFile), 'utf8')
  template = template.replaceAll('{{name}}', platform.frontmatter.name)
  template = template.replaceAll('{{frontmatterDescription}}', SHARED_FRONTMATTER_DESCRIPTION)
  template = template.replaceAll('{{title}}', platform.title)
  template = template.replaceAll(
    '{{quickReferenceSection}}',
    platform.sections?.quickReference
      ? '\n## Quick Reference\n\n- Start with `references/demo-family-map.md`.\n- Use `examples/` for the first six official demos.\n- Use `blueprints/` for Justification Comparison and Rich Text.\n'
      : '',
  )
  return template
}

function resolveAssetRoot(): string {
  const candidates = [
    path.resolve(__dirname, '..', 'assets'),
    path.resolve(__dirname, '..', '..', '..'),
  ]

  for (const candidate of candidates) {
    const hasCore = existsSync(path.join(candidate, 'core', 'metadata', 'demos.json'))
    const hasPlatforms = existsSync(path.join(candidate, 'platforms'))
    if (hasCore && hasPlatforms) return candidate
  }

  throw new Error('Unable to resolve bundled assets.')
}

function resolveStarterRoot(): string {
  const assetRoot = resolveAssetRoot()
  const packagedRoot = path.join(assetRoot, 'starters')
  if (existsSync(packagedRoot)) return packagedRoot

  const repoRoot = path.join(assetRoot, 'assets')
  if (existsSync(repoRoot)) return repoRoot

  throw new Error('Unable to resolve starter assets.')
}

function replaceTokens(root: string, replacements: Record<string, string>): void {
  const entries = readdirSync(root, { recursive: true })
  for (const entry of entries) {
    const currentPath = path.join(root, entry.toString())
    if (!statSync(currentPath).isFile()) continue
    const extension = path.extname(currentPath).toLowerCase()
    if (!['.js', '.json', '.html', '.css', '.md'].includes(extension)) continue
    let content = readFileSync(currentPath, 'utf8')
    for (const [token, value] of Object.entries(replacements)) {
      content = content.replaceAll(token, value)
    }
    writeFileSync(currentPath, content, 'utf8')
  }
}

function loadPlatforms(): PlatformConfig[] {
  const root = resolveAssetRoot()
  const directory = path.join(root, 'platforms')
  return readdirSync(directory)
    .filter(name => name.endsWith('.json'))
    .sort()
    .map(entry => JSON.parse(readFileSync(path.join(directory, entry), 'utf8')) as PlatformConfig)
}

function getInstallPath(platform: PlatformConfig): string {
  return path.join(os.homedir(), platform.folderStructure.root, platform.folderStructure.skillPath)
}

function getCliVersion(): string {
  const assetRoot = resolveAssetRoot()
  const packageJson = path.resolve(assetRoot, 'packages', 'cli', 'package.json')
  if (existsSync(packageJson)) {
    return JSON.parse(readFileSync(packageJson, 'utf8')).version as string
  }
  const siblingPackage = path.resolve(__dirname, '..', 'package.json')
  if (existsSync(siblingPackage)) {
    return JSON.parse(readFileSync(siblingPackage, 'utf8')).version as string
  }
  return '0.0.0'
}

function hasFrontmatterField(text: string, field: string): boolean {
  if (!text.startsWith('---\n')) return false
  try {
    const withoutOpening = text.slice(4)
    const closingIndex = withoutOpening.indexOf('\n---')
    if (closingIndex === -1) return false
    const frontmatter = withoutOpening.slice(0, closingIndex)
    return frontmatter.split('\n').some(line => line.startsWith(`${field}:`))
  } catch {
    return false
  }
}

function isStarterKind(value: string): value is StarterKind {
  return value in STARTER_DIRECTORIES
}

function requireOption(value: string | undefined, message: string): void {
  if (value === undefined || value.length === 0) {
    throw new Error(message)
  }
}

function isCliEntrypoint(): boolean {
  if (process.argv[1] === undefined) return false
  try {
    return realpathSync(process.argv[1]) === realpathSync(__filename)
  } catch {
    return path.resolve(process.argv[1]) === __filename
  }
}

if (isCliEntrypoint()) {
  try {
    runCli()
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(message)
    process.exitCode = 1
  }
}

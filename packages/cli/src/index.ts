#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

type CommandName = 'init' | 'update' | 'versions' | 'doctor' | 'help'

type CliOptions = {
  ai?: string
  offline: boolean
  force: boolean
}

type PlatformConfig = {
  platform: string
  displayName: string
  folderStructure: {
    root: string
    skillPath: string
    filename: string
  }
  frontmatter: {
    name: string
    description: string
  }
  title: string
  entryType: 'skill' | 'prompt'
  sections?: {
    quickReference?: boolean
  }
}

type InstallRecord = {
  version: string
  platform: string
  displayName: string
  installedAt: string
  installPath: string
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function main(): void {
  const [commandRaw, ...rest] = process.argv.slice(2)
  const command = (commandRaw ?? 'help') as CommandName
  const options = parseOptions(rest)

  switch (command) {
    case 'init':
      requireOption(options.ai, '--ai is required for init')
      initInstall(options.ai!, options)
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
    default:
      printHelp()
  }
}

function parseOptions(args: string[]): CliOptions {
  const options: CliOptions = {
    offline: false,
    force: false,
  }

  for (let index = 0; index < args.length; index++) {
    const arg = args[index]!
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
    throw new Error(`Unknown option: ${arg}`)
  }

  return options
}

function printHelp(): void {
  console.log(`pretext-skill

Usage:
  pretext-skill init --ai <target> [--offline] [--force]
  pretext-skill init --ai all [--offline] [--force]
  pretext-skill update [--offline] [--force]
  pretext-skill versions
  pretext-skill doctor
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
    console.log(`- ${platform.platform}: ${status} -> ${installPath}`)
    if (existsSync(manifestPath)) {
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as InstallRecord
      console.log(`  version=${manifest.version} installedAt=${manifest.installedAt}`)
    }
  }
}

function initInstall(target: string, options: CliOptions): void {
  const platforms = loadPlatforms()
  if (options.offline) {
    console.log('Using bundled assets only.')
  }

  const selected = target === 'all'
    ? platforms
    : platforms.filter(platform => platform.platform === target)

  if (selected.length === 0) {
    throw new Error(`Unsupported platform: ${target}`)
  }

  for (const platform of selected) {
    installPlatform(platform, options.force)
  }
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
  const bundleRoot = path.join(resolveAssetRoot(), 'core', 'bundle')
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
      },
      null,
      2,
    ),
    'utf8',
  )

  console.log(`Installed ${platform.displayName} -> ${installPath}`)
}

function renderEntry(platform: PlatformConfig): string {
  const assetRoot = resolveAssetRoot()
  const templateFile = platform.entryType === 'prompt' ? 'prompt.md' : 'skill.md'
  let template = readFileSync(path.join(assetRoot, 'core', 'templates', templateFile), 'utf8')
  template = template.replaceAll('{{name}}', platform.frontmatter.name)
  template = template.replaceAll('{{frontmatterDescription}}', platform.frontmatter.description)
  template = template.replaceAll('{{title}}', platform.title)
  template = template.replaceAll('{{quickReferenceSection}}', platform.sections?.quickReference
    ? '\n## Quick Reference\n\n- Start with `references/demo-family-map.md`.\n- Use `examples/` for the first six official demos.\n- Use `blueprints/` for Justification Comparison and Rich Text.\n'
    : '')
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

function loadPlatforms(): PlatformConfig[] {
  const root = resolveAssetRoot()
  const dir = path.join(root, 'platforms')
  const entries = readdirSync(dir)
    .filter(name => name.endsWith('.json'))
    .sort()
  return entries.map(entry => JSON.parse(readFileSync(path.join(dir, entry), 'utf8')) as PlatformConfig)
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

function requireOption(value: string | undefined, message: string): void {
  if (value === undefined || value.length === 0) {
    throw new Error(message)
  }
}

main()

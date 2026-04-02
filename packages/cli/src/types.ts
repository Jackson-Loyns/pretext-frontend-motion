export type CommandName =
  | 'init'
  | 'update'
  | 'versions'
  | 'doctor'
  | 'help'
  | 'scaffold'
  | 'list-kinds'
  | 'list-presets'
  | 'validate'

export type PlatformId =
  | 'antigravity'
  | 'claude'
  | 'codex'
  | 'continue'
  | 'copilot'
  | 'cursor'
  | 'gemini'
  | 'kiro'
  | 'opencode'
  | 'qoder'
  | 'roocode'
  | 'trae'
  | 'windsurf'

export type StarterKind =
  | 'predictive-ui'
  | 'editorial-routing'
  | 'kinetic-typography'

export type CliOptions = {
  ai?: string
  offline: boolean
  force: boolean
  kind?: StarterKind
  out?: string
  title?: string
  preset?: string
  path?: string
}

export type PlatformConfig = {
  platform: PlatformId
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

export type InstallRecord = {
  version: string
  platform: PlatformId
  displayName: string
  installedAt: string
  installPath: string
}

export type PresetValues = Record<string, string>

export type StarterPresetMap = Record<StarterKind, Record<string, PresetValues>>

export type StarterDirectoryMap = Record<StarterKind, string>

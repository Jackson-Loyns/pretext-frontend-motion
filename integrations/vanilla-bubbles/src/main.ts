import { layout, prepare, type PreparedText } from '@chenglou/pretext'

import './styles.css'

type Message = {
  id: string
  speaker: 'system' | 'user'
  text: string
}

type PreparedMessage = Message & {
  prepared: PreparedText
}

const messages: Message[] = [
  { id: 'm1', speaker: 'system', text: 'Prepared text is cached once, then reused during resize-driven relayout.' },
  { id: 'm2', speaker: 'user', text: 'Compact multilingual bubbles should stay stable. 你好，مرحبا，hello.' },
  { id: 'm3', speaker: 'system', text: 'The point is not the chat shell. The point is that height is known before the bubble commits.' },
]

const font = '16px "Avenir Next", "Helvetica Neue", Arial, sans-serif'
const lineHeight = 24

const app = document.querySelector<HTMLDivElement>('#app')
if (app === null) throw new Error('#app not found')

app.innerHTML = `
  <main class="page">
    <section class="hero">
      <p class="eyebrow">Vanilla + TypeScript</p>
      <h1>Pretext Bubbles</h1>
      <p class="intro">This integration prepares message text once, then relayouts from width changes without DOM text measurement.</p>
    </section>
    <section class="panel">
      <header class="panel-header">
        <div>
          <h2>Measured Conversation</h2>
          <p>Resize the container. Only layout changes should rerun.</p>
        </div>
        <div class="badge">prepare + layout</div>
      </header>
      <div id="frame" class="frame">
        <div id="list" class="list"></div>
      </div>
    </section>
  </main>
`

const frame = app.querySelector<HTMLDivElement>('#frame')
const list = app.querySelector<HTMLDivElement>('#list')
if (frame === null || list === null) throw new Error('layout nodes not found')
const frameEl = frame
const listEl = list

let preparedMessages: PreparedMessage[] = []

async function prepareMessages(): Promise<void> {
  if ('fonts' in document) {
    await document.fonts.ready
  }
  preparedMessages = messages.map(message => ({
    ...message,
    prepared: prepare(message.text, font),
  }))
}

function render(width: number): void {
  const bubbleWidth = Math.max(180, Math.min(360, width - 64))
  listEl.innerHTML = ''

  for (const message of preparedMessages) {
    const metrics = layout(message.prepared, bubbleWidth - 36, lineHeight)
    const row = document.createElement('article')
    row.className = `bubble bubble--${message.speaker}`
    row.style.width = `${bubbleWidth}px`
    row.style.minHeight = `${metrics.height + 28}px`
    row.innerHTML = `
      <p>${message.text}</p>
      <footer>${metrics.lineCount} lines · ${Math.round(metrics.height)}px</footer>
    `
    listEl.append(row)
  }
}

async function start(): Promise<void> {
  await prepareMessages()

  const observer = new ResizeObserver(entries => {
    const width = entries[0]?.contentRect.width ?? frameEl.clientWidth
    render(width)
  })
  observer.observe(frameEl)
  render(frameEl.clientWidth)
}

void start()

// @ts-check

import { layout, prepare } from '@chenglou/pretext'

const messages = [
  'Measured before paint, not guessed after paint.',
  'Multilingual bubbles stay compact without layout flash. 你好，مرحبا，hello.',
  'Pretext keeps the line count and text block height stable before the UI commits.',
]

const app = document.querySelector('#app')
if (!(app instanceof HTMLDivElement)) throw new Error('#app not found')

app.innerHTML = `
  <main class="page">
    <section class="hero">
      <p class="eyebrow">Bubbles</p>
      <h1>Tight Message Bubbles</h1>
      <p class="intro">Slide the chat width. Bubble height is recomputed from cached prepared text rather than DOM text measurement.</p>
    </section>
    <section class="panel">
      <div class="controls">
        <label>
          Chat width
          <input id="width" type="range" min="280" max="680" value="420" />
        </label>
        <output id="value">420px</output>
      </div>
      <div id="messages" class="messages"></div>
    </section>
  </main>
`

const font = '16px "Avenir Next", "Segoe UI", sans-serif'
const lineHeight = 24
const prepared = messages.map(text => ({ text, prepared: prepare(text, font) }))
const widthInput = document.querySelector('#width')
const widthValue = document.querySelector('#value')
const list = document.querySelector('#messages')
if (!(widthInput instanceof HTMLInputElement) || !(widthValue instanceof HTMLOutputElement) || !(list instanceof HTMLDivElement)) {
  throw new Error('bubble controls not found')
}

function render() {
  const chatWidth = Number(widthInput.value)
  widthValue.value = `${chatWidth}px`
  list.style.width = `${Math.min(chatWidth, window.innerWidth - 32)}px`
  list.innerHTML = ''

  for (const message of prepared) {
    const metrics = layout(message.prepared, chatWidth - 86, lineHeight)
    const bubble = document.createElement('article')
    bubble.className = 'bubble'
    bubble.style.height = `${metrics.height + 26}px`
    bubble.innerHTML = `<p>${message.text}</p><span>${metrics.lineCount} lines</span>`
    list.append(bubble)
  }
}

widthInput.addEventListener('input', render)
window.addEventListener('resize', render)
render()

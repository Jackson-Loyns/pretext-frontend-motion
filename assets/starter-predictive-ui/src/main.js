// @ts-check

import { layout, prepare } from '@chenglou/pretext'

const messages = [
  '__MESSAGE_1__',
  '__MESSAGE_2__',
  '__MESSAGE_3__',
]

const app = document.querySelector('#app')
if (!(app instanceof HTMLDivElement)) throw new Error('#app not found')

const shell = document.createElement('main')
shell.className = 'page'
shell.innerHTML = `
  <section class="hero">
    <p class="eyebrow">__MODE_LABEL__</p>
    <h1>__DEMO_TITLE__</h1>
    <p class="intro">__INTRO__</p>
  </section>
  <section class="wall">
    <div class="controls">
      <label>
        Bubble width
        <input id="width" type="range" min="220" max="520" value="340" />
      </label>
      <output id="width-value">340px</output>
    </div>
    <div id="messages" class="messages"></div>
  </section>
`
app.append(shell)

const list = shell.querySelector('#messages')
const widthInput = shell.querySelector('#width')
const widthValue = shell.querySelector('#width-value')
if (!(list instanceof HTMLDivElement) || !(widthInput instanceof HTMLInputElement) || !(widthValue instanceof HTMLOutputElement)) {
  throw new Error('controls not found')
}

const font = '16px "Avenir Next", "Segoe UI", sans-serif'
const lineHeight = 24
const prepared = messages.map(text => ({ text, prepared: prepare(text, font) }))

function render() {
  const bubbleWidth = Number(widthInput.value)
  widthValue.value = `${bubbleWidth}px`
  list.style.setProperty('--bubble-width', `${bubbleWidth}px`)
  list.innerHTML = ''

  for (const message of prepared) {
    const result = layout(message.prepared, bubbleWidth - 40, lineHeight)
    const article = document.createElement('article')
    article.className = 'bubble'
    article.style.height = `${result.height + 24}px`
    article.innerHTML = `
      <p>${message.text}</p>
      <span>${result.lineCount} lines • ${result.height}px text block</span>
    `
    list.append(article)
  }
}

widthInput.addEventListener('input', render)
render()

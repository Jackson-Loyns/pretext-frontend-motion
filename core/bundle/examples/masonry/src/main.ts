import { layout, prepare } from '@chenglou/pretext'
import './styles.css'

const cards = [
  'A short card can stay small without waiting for DOM reads.',
  'Longer bulletin text should still pack cleanly when height prediction comes from Pretext before the grid settles.',
  'Mixed-length notes are the real test for a masonry-like surface.',
  'Measure once, relayout cheaply, and keep the packing stable through resize.',
  'The composition should feel like an editorial board, not a dashboard.'
]

const app = document.querySelector<HTMLDivElement>('#app')
if (app === null) throw new Error('#app not found')

app.innerHTML = `
  <main class="page">
    <section class="hero">
      <p class="eyebrow">Masonry</p>
      <h1>Measured Bulletin Grid</h1>
      <p class="intro">Card height comes from Pretext, so the masonry-like surface can pack without post-render DOM measurement.</p>
    </section>
    <section class="panel">
      <div class="controls">
        <label>
          Column width
          <input id="width" type="range" min="220" max="360" value="260" />
        </label>
        <output id="value">260px</output>
      </div>
      <div id="grid" class="grid"></div>
    </section>
  </main>
`

const widthInput = document.querySelector<HTMLInputElement>('#width')
const widthValue = document.querySelector<HTMLOutputElement>('#value')
const grid = document.querySelector<HTMLDivElement>('#grid')
if (widthInput === null || widthValue === null || grid === null) throw new Error('masonry nodes not found')

const font = '16px "Avenir Next", "Segoe UI", sans-serif'
const lineHeight = 24
const prepared = cards.map(text => ({ text, prepared: prepare(text, font) }))

function render() {
  const cardWidth = Number(widthInput.value)
  widthValue.value = `${cardWidth}px`
  grid.style.gridTemplateColumns = `repeat(auto-fit, minmax(min(${cardWidth}px, 100%), 1fr))`
  grid.innerHTML = ''
  for (const card of prepared) {
    const metrics = layout(card.prepared, cardWidth - 34, lineHeight)
    const article = document.createElement('article')
    article.className = 'card'
    article.style.height = `${metrics.height + 36}px`
    article.innerHTML = `<p>${card.text}</p><span>${metrics.lineCount} lines</span>`
    grid.append(article)
  }
}

widthInput.addEventListener('input', render)
window.addEventListener('resize', render)
render()

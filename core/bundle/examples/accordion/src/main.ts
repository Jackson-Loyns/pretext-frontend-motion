import { layout, prepare } from '@chenglou/pretext'
import './styles.css'

const sections = [
  {
    id: 'release',
    title: 'Release Notes',
    text: 'Every panel in this accordion knows its text height before expansion. The goal is not only a smooth animation, but a stable layout model that does not guess after paint.',
  },
  {
    id: 'ops',
    title: 'Ops Checklist',
    text: 'Cache prepared text once, recompute layout from width changes, and never drop back to DOM text measurement inside the hot path. That is the architectural point of using Pretext here.',
  },
  {
    id: 'mixed',
    title: 'Mixed Script Copy',
    text: 'Hello, 你好, مرحبا, and a long URL like https://example.com/pretext/accordion all still need deterministic multiline height before the panel opens.',
  },
]

const app = document.querySelector<HTMLDivElement>('#app')
if (app === null) throw new Error('#app not found')

app.innerHTML = `
  <main class="page">
    <section class="hero">
      <p class="eyebrow">Accordion</p>
      <h1>Measured Panels</h1>
      <p class="intro">Expand a panel and the copy height has already been computed from Pretext. Resize the page and the panel height is recalculated from cached prepared text.</p>
    </section>
    <section id="accordion" class="accordion"></section>
  </main>
`

const accordion = document.querySelector<HTMLDivElement>('#accordion')
if (accordion === null) throw new Error('#accordion not found')

const font = '16px "Avenir Next", "Segoe UI", sans-serif'
const lineHeight = 24
const prepared = sections.map(section => ({
  ...section,
  prepared: prepare(section.text, font),
}))

let openId = sections[0]!.id

function buildMarkup() {
  accordion.innerHTML = prepared.map(section => `
    <article class="item" data-id="${section.id}">
      <button class="toggle" type="button">
        <span>${section.title}</span>
        <span class="meta">Pretext height prediction</span>
      </button>
      <div class="body">
        <div class="inner">
          <p>${section.text}</p>
        </div>
      </div>
    </article>
  `).join('')
}

function render() {
  const width = Math.max(220, accordion.clientWidth - 92)
  const items = Array.from(accordion.querySelectorAll<HTMLElement>('.item'))
  for (const item of items) {
    const id = item.dataset['id']
    if (id === undefined) continue
    const section = prepared.find(entry => entry.id === id)
    if (section === undefined) continue
    const body = item.querySelector<HTMLElement>('.body')
    const meta = item.querySelector<HTMLElement>('.meta')
    if (body === null || meta === null) continue
    const metrics = layout(section.prepared, width, lineHeight)
    const expanded = openId === section.id
    body.style.height = expanded ? `${metrics.height + 32}px` : '0px'
    item.dataset['expanded'] = expanded ? 'true' : 'false'
    meta.textContent = `${metrics.lineCount} lines · ${Math.round(metrics.height)}px`
  }
}

accordion.addEventListener('click', event => {
  const target = event.target
  if (!(target instanceof Element)) return
  const item = target.closest<HTMLElement>('.item')
  if (item === null) return
  const id = item.dataset['id']
  if (id === undefined) return
  openId = openId === id ? '' : id
  render()
})

buildMarkup()
render()
window.addEventListener('resize', render)

// @ts-check

import { layoutNextLine, prepareWithSegments, walkLineRanges } from '@chenglou/pretext'

/** @typedef {import('@chenglou/pretext').LayoutCursor} LayoutCursor */

const articlePrepared = prepareWithSegments(
  'Editorial Engine is where moving geometry, pull quotes, and multi-column text flow all meet. The text is not decorative. It is routed against changing available widths, which means the layout can respond live to the orb and still remain measurable, intentional, and editorial.',
  '17px "Iowan Old Style", Georgia, serif',
)

const quotePrepared = prepareWithSegments(
  'Live reflow matters only if the composition still feels designed.',
  '700 22px "Helvetica Neue", Arial, sans-serif',
)

const app = document.querySelector('#app')
if (!(app instanceof HTMLDivElement)) throw new Error('#app not found')

app.innerHTML = `
  <main class="page">
    <section class="hero">
      <p class="eyebrow">Editorial Engine</p>
      <h1>Live Reflow, Pull Quote, Two Columns</h1>
      <p class="intro">The orb cuts into the first column, the quote occupies a deliberate slot, and the article continues into a second column without falling back to DOM text measurement.</p>
    </section>
    <section class="spread">
      <div id="engine" class="engine">
        <div id="quote" class="quote"></div>
        <div id="column-a" class="column"></div>
        <div id="column-b" class="column"></div>
        <div id="orb" class="orb"></div>
      </div>
    </section>
  </main>
`

const engine = document.querySelector('#engine')
const quote = document.querySelector('#quote')
const columnA = document.querySelector('#column-a')
const columnB = document.querySelector('#column-b')
const orb = document.querySelector('#orb')
if (!(engine instanceof HTMLDivElement) || !(quote instanceof HTMLDivElement) || !(columnA instanceof HTMLDivElement) || !(columnB instanceof HTMLDivElement) || !(orb instanceof HTMLDivElement)) {
  throw new Error('editorial engine nodes not found')
}

let orbX = 210
let orbY = 164
let dragging = false

function getQuoteMetrics(maxWidth) {
  let lineCount = 0
  let maxLineWidth = 0
  walkLineRanges(quotePrepared, maxWidth, line => {
    lineCount += 1
    maxLineWidth = Math.max(maxLineWidth, line.width)
  })
  return {
    width: Math.ceil(maxLineWidth + 36),
    height: lineCount * 28 + 28,
  }
}

function slotWidth(y, lineHeight, width) {
  const radius = 78
  const minDy = orbY >= y && orbY <= y + lineHeight ? 0 : Math.min(Math.abs(orbY - y), Math.abs(orbY - (y + lineHeight)))
  if (minDy >= radius) return { x: 0, width }
  const blockedHalf = Math.sqrt(radius * radius - minDy * minDy)
  const left = Math.max(0, orbX - blockedHalf - 18)
  const right = Math.min(width, orbX + blockedHalf + 18)
  const leftSlot = left
  const rightSlot = width - right
  return leftSlot >= rightSlot ? { x: 0, width: leftSlot } : { x: right, width: rightSlot }
}

/**
 * @param {HTMLElement} target
 * @param {LayoutCursor} cursor
 * @param {number} width
 * @param {number} yStart
 * @param {number} yLimit
 * @param {boolean} avoidOrb
 * @returns {LayoutCursor}
 */
function flowColumn(target, cursor, width, yStart, yLimit, avoidOrb) {
  const lines = []
  let y = yStart
  let nextCursor = cursor
  while (y < yLimit) {
    const slot = avoidOrb ? slotWidth(y, 28, width) : { x: 0, width }
    const line = layoutNextLine(articlePrepared, nextCursor, Math.max(140, slot.width))
    if (line === null) break
    lines.push(`<span style="left:${slot.x}px; top:${y}px; width:${slot.width}px">${line.text}</span>`)
    nextCursor = line.end
    y += 28
  }
  target.innerHTML = lines.join('')
  return nextCursor
}

function render() {
  const quoteMetrics = getQuoteMetrics(220)
  quote.style.width = `${quoteMetrics.width}px`
  quote.style.height = `${quoteMetrics.height}px`
  quote.innerHTML = '<div class="quote-inner">Live reflow matters only if the composition still feels designed.</div>'

  /** @type {LayoutCursor} */
  let cursor = { segmentIndex: 0, graphemeIndex: 0 }
  cursor = flowColumn(columnA, cursor, columnA.clientWidth, 0, 300, true)
  flowColumn(columnB, cursor, columnB.clientWidth, 0, 300, false)
  orb.style.transform = `translate(${orbX - 78}px, ${orbY - 78}px)`
}

function moveOrb(clientX, clientY) {
  const rect = columnA.getBoundingClientRect()
  orbX = Math.max(78, Math.min(rect.width - 78, clientX - rect.left))
  orbY = Math.max(78, Math.min(300 - 78, clientY - rect.top))
  render()
}

orb.addEventListener('pointerdown', event => {
  dragging = true
  orb.setPointerCapture(event.pointerId)
})

window.addEventListener('pointermove', event => {
  if (!dragging) return
  moveOrb(event.clientX, event.clientY)
})

window.addEventListener('pointerup', () => {
  dragging = false
})

window.addEventListener('resize', render)
requestAnimationFrame(render)

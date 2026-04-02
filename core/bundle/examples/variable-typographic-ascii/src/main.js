// @ts-check

import { layoutWithLines, prepareWithSegments } from '@chenglou/pretext'

/**
 * @typedef {object} Anchor
 * @property {string} glyph
 * @property {number} x
 * @property {number} y
 * @property {number} baseX
 * @property {number} baseY
 */

const prepared = prepareWithSegments(
  'VARIABLE\nTYPOGRAPHIC\nASCII',
  '700 56px "Avenir Next", sans-serif',
  { whiteSpace: 'pre-wrap' },
)

const app = document.querySelector('#app')
if (!(app instanceof HTMLDivElement)) throw new Error('#app not found')

app.innerHTML = `
  <main class="page">
    <section class="copy">
      <p class="eyebrow">Variable Typographic ASCII</p>
      <h1>Measured ASCII Poster</h1>
      <p>Measured lines become anchor geometry for a proportional ASCII field. Move the pointer across the canvas and watch the glyph density bend before it settles back.</p>
    </section>
    <canvas id="canvas"></canvas>
  </main>
`

const canvas = document.querySelector('#canvas')
if (!(canvas instanceof HTMLCanvasElement)) throw new Error('#canvas not found')
const ctx = canvas.getContext('2d')
if (ctx === null) throw new Error('2d context not available')

let pointer = { x: -9999, y: -9999 }
let animationFrame = 0
const ascii = ' .:-=+*#%@'

/** @type {Anchor[]} */
let anchors = []

function layoutAscii(width) {
  const result = layoutWithLines(prepared, Math.min(width - 60, 760), 62)
  anchors = []
  let y = 90
  for (const line of result.lines) {
    const advance = Math.max(16, line.width / Math.max(1, line.text.length))
    let x = 28
    for (const char of line.text) {
      anchors.push({ glyph: char === ' ' ? '·' : char, x, y, baseX: x, baseY: y })
      x += advance
    }
    y += 62
  }
}

function resize() {
  const rect = canvas.getBoundingClientRect()
  const dpr = Math.max(1, window.devicePixelRatio || 1)
  canvas.width = Math.round(rect.width * dpr)
  canvas.height = Math.round(rect.height * dpr)
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  layoutAscii(rect.width)
}

function draw() {
  animationFrame = requestAnimationFrame(draw)
  const rect = canvas.getBoundingClientRect()
  ctx.clearRect(0, 0, rect.width, rect.height)
  ctx.fillStyle = '#041016'
  ctx.fillRect(0, 0, rect.width, rect.height)

  for (const anchor of anchors) {
    const dx = anchor.x - pointer.x
    const dy = anchor.y - pointer.y
    const distance = Math.max(1, Math.hypot(dx, dy))
    const force = Math.max(0, 150 - distance) / 150
    const angle = Math.atan2(dy, dx)
    const targetX = anchor.baseX + Math.cos(angle) * force * 28
    const targetY = anchor.baseY + Math.sin(angle) * force * 28
    anchor.x += (targetX - anchor.x) * 0.16
    anchor.y += (targetY - anchor.y) * 0.16
    const densityIndex = Math.max(0, Math.min(ascii.length - 1, Math.round(force * (ascii.length - 1))))
    const glyph = anchor.glyph === '·' ? ascii[densityIndex] : anchor.glyph
    ctx.fillStyle = `rgba(126, 241, 225, ${0.34 + force * 0.66})`
    ctx.font = '700 26px "SF Mono", ui-monospace, monospace'
    ctx.fillText(glyph, anchor.x, anchor.y)
  }
}

canvas.addEventListener('pointermove', event => {
  const rect = canvas.getBoundingClientRect()
  pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top }
})

canvas.addEventListener('pointerleave', () => {
  pointer = { x: -9999, y: -9999 }
})

window.addEventListener('resize', resize)
resize()
draw()
window.addEventListener('beforeunload', () => cancelAnimationFrame(animationFrame))

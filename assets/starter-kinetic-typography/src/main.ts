import { layoutWithLines, prepareWithSegments } from '@chenglou/pretext'
import './styles.css'

const phrase = '__DEMO_TITLE__\nTEXT WANTS MOTION'
const app = document.querySelector<HTMLDivElement>('#app')
if (app === null) throw new Error('#app not found')

app.innerHTML = `
  <main class="page">
    <section class="copy">
      <p class="eyebrow">Kinetic Typography</p>
      <h1>__DEMO_TITLE__</h1>
      <p>Move the pointer across the canvas. Glyphs drift away from the cursor and then settle back to measured anchors produced by Pretext.</p>
    </section>
    <canvas id="canvas"></canvas>
  </main>
`

const canvas = document.querySelector<HTMLCanvasElement>('#canvas')
if (canvas === null) throw new Error('#canvas not found')
const ctx = canvas.getContext('2d')
if (ctx === null) throw new Error('2d context not available')

const prepared = prepareWithSegments(phrase, '700 64px "Avenir Next", sans-serif', { whiteSpace: 'pre-wrap' })
let pointer = { x: -9999, y: -9999 }
let animationFrame = 0

type Glyph = { char: string; homeX: number; homeY: number; x: number; y: number }
let glyphs: Glyph[] = []

function resize() {
  const dpr = Math.max(1, window.devicePixelRatio || 1)
  const rect = canvas.getBoundingClientRect()
  canvas.width = Math.round(rect.width * dpr)
  canvas.height = Math.round(rect.height * dpr)
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  layoutGlyphs(rect.width)
}

function layoutGlyphs(width: number) {
  const result = layoutWithLines(prepared, Math.min(width - 40, 760), 72)
  glyphs = []
  const startX = 24
  const startY = 80
  for (const [lineIndex, line] of result.lines.entries()) {
    let x = startX
    for (const char of line.text) {
      glyphs.push({
        char,
        homeX: x,
        homeY: startY + lineIndex * 72,
        x,
        y: startY + lineIndex * 72,
      })
      x += char === ' ' ? 20 : 30
    }
  }
}

function draw() {
  animationFrame = requestAnimationFrame(draw)
  const rect = canvas.getBoundingClientRect()
  ctx.clearRect(0, 0, rect.width, rect.height)

  ctx.fillStyle = '#07111a'
  ctx.fillRect(0, 0, rect.width, rect.height)

  for (const glyph of glyphs) {
    const dx = glyph.x - pointer.x
    const dy = glyph.y - pointer.y
    const distance = Math.max(1, Math.hypot(dx, dy))
    const push = Math.max(0, 110 - distance) / 110
    const angle = Math.atan2(dy, dx)
    const targetX = glyph.homeX + Math.cos(angle) * push * 44
    const targetY = glyph.homeY + Math.sin(angle) * push * 44

    glyph.x += (targetX - glyph.x) * 0.12
    glyph.y += (targetY - glyph.y) * 0.12

    const glow = 0.35 + push * 0.65
    ctx.fillStyle = `rgba(128, 245, 224, ${glow})`
    ctx.font = '700 64px "Avenir Next", sans-serif'
    ctx.fillText(glyph.char, glyph.x, glyph.y)
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

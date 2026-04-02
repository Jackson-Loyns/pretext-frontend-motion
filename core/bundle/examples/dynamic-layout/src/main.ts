import { layoutNextLine, prepareWithSegments, type LayoutCursor } from '@chenglou/pretext'
import './styles.css'

const titlePrepared = prepareWithSegments(
  'Dynamic Layout should feel composed, fixed-height, and geometry-aware.',
  '700 44px "Iowan Old Style", Georgia, serif',
)

const bodyPrepared = prepareWithSegments(
  'This spread treats text as a stream that can reroute around a moving obstacle. Each line is recalculated against the width that is actually open in that horizontal band, so the composition can stay editorial instead of collapsing into a generic responsive stack.',
  '18px "Iowan Old Style", Georgia, serif',
)

const app = document.querySelector<HTMLDivElement>('#app')
if (app === null) throw new Error('#app not found')

app.innerHTML = `
  <main class="page">
    <section class="hero">
      <p class="eyebrow">Dynamic Layout</p>
      <h1>Obstacle-Aware Spread</h1>
      <p class="intro">Move the orb and the title plus body reroute line by line through a fixed-height composition.</p>
    </section>
    <section class="spread">
      <div id="canvas" class="canvas">
        <div id="title" class="title"></div>
        <div id="body" class="body"></div>
        <div id="orb" class="orb"></div>
      </div>
    </section>
  </main>
`

const canvas = document.querySelector<HTMLDivElement>('#canvas')
const title = document.querySelector<HTMLDivElement>('#title')
const body = document.querySelector<HTMLDivElement>('#body')
const orb = document.querySelector<HTMLDivElement>('#orb')
if (canvas === null || title === null || body === null || orb === null) throw new Error('dynamic layout nodes not found')

let orbX = 460
let orbY = 170
let dragging = false

function slotForBand(y: number, lineHeight: number, width: number) {
  const radius = 88
  const minDy = orbY >= y && orbY <= y + lineHeight ? 0 : Math.min(Math.abs(orbY - y), Math.abs(orbY - (y + lineHeight)))
  if (minDy >= radius) return { x: 0, width }
  const blockedHalf = Math.sqrt(radius * radius - minDy * minDy)
  const left = Math.max(0, orbX - blockedHalf - 18)
  const right = Math.min(width, orbX + blockedHalf + 18)
  const leftSlot = left
  const rightSlot = width - right
  return leftSlot >= rightSlot ? { x: 0, width: leftSlot } : { x: right, width: rightSlot }
}

function renderStream(target: HTMLElement, prepared: ReturnType<typeof prepareWithSegments>, startY: number, lineHeight: number, width: number) {
  let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 }
  let y = startY
  const fragments: string[] = []
  while (true) {
    const slot = slotForBand(y, lineHeight, width)
    const line = layoutNextLine(prepared, cursor, Math.max(120, slot.width))
    if (line === null) break
    fragments.push(`<span style="left:${slot.x}px; top:${y}px; width:${slot.width}px">${line.text}</span>`)
    cursor = line.end
    y += lineHeight
  }
  target.innerHTML = fragments.join('')
}

function render() {
  const width = canvas.clientWidth
  renderStream(title, titlePrepared, 0, 46, width)
  renderStream(body, bodyPrepared, 148, 29, width)
  orb.style.transform = `translate(${orbX - 88}px, ${orbY - 88}px)`
}

function moveOrb(clientX: number, clientY: number) {
  const rect = canvas.getBoundingClientRect()
  orbX = Math.max(88, Math.min(rect.width - 88, clientX - rect.left))
  orbY = Math.max(88, Math.min(rect.height - 88, clientY - rect.top))
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

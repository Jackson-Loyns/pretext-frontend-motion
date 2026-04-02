import { layoutNextLine, prepareWithSegments, type LayoutCursor } from '@chenglou/pretext'
import './styles.css'

const text = `__BODY_TEXT__`

const app = document.querySelector<HTMLDivElement>('#app')
if (app === null) throw new Error('#app not found')

const root = document.createElement('main')
root.className = 'page'
root.innerHTML = `
  <section class="hero">
    <p class="eyebrow">__MODE_LABEL__</p>
    <h1>__DEMO_TITLE__</h1>
    <p class="intro">__INTRO__</p>
  </section>
  <section class="spread">
    <div class="column">
      <div id="body" class="body"></div>
      <div id="orb" class="orb" aria-hidden="true"></div>
    </div>
  </section>
`
app.append(root)

const body = root.querySelector<HTMLDivElement>('#body')
const orb = root.querySelector<HTMLDivElement>('#orb')
if (body === null || orb === null) throw new Error('layout nodes not found')

const prepared = prepareWithSegments(text, '18px "Iowan Old Style", Georgia, serif')
const lineHeight = 29

let orbX = 320
let orbY = 150
let dragging = false

function slotWidthForBand(y: number, containerWidth: number): { x: number; width: number } {
  const radius = 86
  const bandTop = y
  const bandBottom = y + lineHeight
  const top = bandTop - orbY
  const bottom = bandBottom - orbY
  const minDy = orbY >= bandTop && orbY <= bandBottom ? 0 : orbY < bandTop ? bandTop - orbY : orbY - bandBottom

  if (minDy >= radius) return { x: 0, width: containerWidth }

  const blockedHalf = Math.sqrt(radius * radius - minDy * minDy)
  const left = Math.max(0, orbX - blockedHalf - 16)
  const right = Math.min(containerWidth, orbX + blockedHalf + 16)

  if (left >= containerWidth * 0.5) return { x: 0, width: left }
  if (right <= containerWidth * 0.5) return { x: right, width: containerWidth - right }

  const leftSlot = left
  const rightSlot = containerWidth - right
  return leftSlot >= rightSlot ? { x: 0, width: leftSlot } : { x: right, width: rightSlot }
}

function render() {
  const containerWidth = body.clientWidth
  let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 }
  let y = 0
  const lines: string[] = []

  while (true) {
    const slot = slotWidthForBand(y, containerWidth)
    const line = layoutNextLine(prepared, cursor, Math.max(120, slot.width))
    if (line === null) break
    lines.push(`<span style="left:${slot.x}px; top:${y}px; width:${slot.width}px">${line.text}</span>`)
    cursor = line.end
    y += lineHeight
  }

  body.style.height = `${y}px`
  body.innerHTML = lines.join('')
  orb.style.transform = `translate(${orbX - 86}px, ${orbY - 86}px)`
}

function moveOrb(clientX: number, clientY: number) {
  const rect = body.getBoundingClientRect()
  orbX = Math.max(86, Math.min(rect.width - 86, clientX - rect.left))
  orbY = Math.max(86, Math.min(rect.height - 86, clientY - rect.top))
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

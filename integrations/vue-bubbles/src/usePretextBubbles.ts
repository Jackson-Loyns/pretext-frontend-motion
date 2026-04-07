import { layout, prepare, type PreparedText } from '@chenglou/pretext'
import { onMounted, onUnmounted, ref, shallowRef, type Ref } from 'vue'

export type BubbleMessage = {
  id: string
  speaker: 'system' | 'user'
  text: string
}

type PreparedMessage = BubbleMessage & {
  prepared: PreparedText
}

export type BubbleMetric = BubbleMessage & {
  height: number
  lineCount: number
}

const font = '16px "Avenir Next", "Helvetica Neue", Arial, sans-serif'
const lineHeight = 24

export function usePretextBubbles(messages: BubbleMessage[]) {
  const frameRef = ref<HTMLDivElement | null>(null)
  const metrics = ref<BubbleMetric[]>([])
  const prepared = shallowRef<PreparedMessage[]>([])
  let observer: ResizeObserver | null = null

  function relayout(width: number) {
    const bubbleWidth = Math.max(180, Math.min(360, width - 64))
    metrics.value = prepared.value.map(message => {
      const result = layout(message.prepared, bubbleWidth - 36, lineHeight)
      return {
        id: message.id,
        speaker: message.speaker,
        text: message.text,
        height: result.height + 28,
        lineCount: result.lineCount,
      }
    })
  }

  onMounted(async () => {
    if ('fonts' in document) {
      await document.fonts.ready
    }
    prepared.value = messages.map(message => ({
      ...message,
      prepared: prepare(message.text, font),
    }))
    if (frameRef.value === null) return
    observer = new ResizeObserver(entries => {
      const width = entries[0]?.contentRect.width ?? frameRef.value?.clientWidth ?? 0
      relayout(width)
    })
    observer.observe(frameRef.value)
    relayout(frameRef.value.clientWidth)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return {
    frameRef: frameRef as Ref<HTMLDivElement | null>,
    metrics,
  }
}

import { layout, prepare, type PreparedText } from '@chenglou/pretext'
import { useEffect, useEffectEvent, useRef, useState } from 'react'

export type BubbleMessage = {
  id: string
  speaker: 'system' | 'user'
  text: string
}

type PreparedMessage = BubbleMessage & {
  prepared: PreparedText
}

type BubbleMetrics = BubbleMessage & {
  height: number
  lineCount: number
}

const font = '16px "Avenir Next", "Helvetica Neue", Arial, sans-serif'
const lineHeight = 24

export function usePretextBubbles(messages: BubbleMessage[]) {
  const frameRef = useRef<HTMLDivElement | null>(null)
  const preparedRef = useRef<PreparedMessage[]>([])
  const [metrics, setMetrics] = useState<BubbleMetrics[]>([])

  useEffect(() => {
    let cancelled = false

    async function prepareMessages() {
      if ('fonts' in document) {
        await document.fonts.ready
      }
      if (cancelled) return
      preparedRef.current = messages.map(message => ({
        ...message,
        prepared: prepare(message.text, font),
      }))
      relayout()
    }

    void prepareMessages()

    return () => {
      cancelled = true
    }
  }, [messages])

  const relayout = useEffectEvent(() => {
    const frame = frameRef.current
    if (frame === null || preparedRef.current.length === 0) return
    const bubbleWidth = Math.max(180, Math.min(360, frame.clientWidth - 64))
    setMetrics(
      preparedRef.current.map(message => {
        const result = layout(message.prepared, bubbleWidth - 36, lineHeight)
        return {
          id: message.id,
          speaker: message.speaker,
          text: message.text,
          height: result.height + 28,
          lineCount: result.lineCount,
        }
      }),
    )
  })

  useEffect(() => {
    const frame = frameRef.current
    if (frame === null) return
    const observer = new ResizeObserver(() => {
      relayout()
    })
    observer.observe(frame)
    relayout()
    return () => observer.disconnect()
  }, [relayout])

  return { frameRef, metrics }
}

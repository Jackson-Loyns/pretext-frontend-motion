import { layout, prepare, type PreparedText } from '@chenglou/pretext'

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

export async function prepareMessages(messages: BubbleMessage[]): Promise<PreparedMessage[]> {
  if ('fonts' in document) {
    await document.fonts.ready
  }
  return messages.map(message => ({
    ...message,
    prepared: prepare(message.text, font),
  }))
}

export function layoutMessages(preparedMessages: PreparedMessage[], width: number): BubbleMetric[] {
  const bubbleWidth = Math.max(180, Math.min(360, width - 64))
  return preparedMessages.map(message => {
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

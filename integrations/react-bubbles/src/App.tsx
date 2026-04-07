import { usePretextBubbles, type BubbleMessage } from './usePretextBubbles'

const messages: BubbleMessage[] = [
  { id: 'm1', speaker: 'system', text: 'React prepares each message once, then reuses the prepared handles during width changes.' },
  { id: 'm2', speaker: 'user', text: 'The hook owns the split between prepare and layout so components do not drift back to DOM measurement.' },
  { id: 'm3', speaker: 'system', text: 'This is the kind of integration boundary a real project needs: typed, framework-aware, and explicit about the hot path.' },
]

export default function App() {
  const { frameRef, metrics } = usePretextBubbles(messages)

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">React + TypeScript</p>
        <h1>Pretext Bubbles</h1>
        <p className="intro">
          A real React integration should isolate Pretext inside a hook, wait for fonts, and relayout from width changes
          without reparsing text on every render.
        </p>
      </section>
      <section className="panel">
        <header className="panel-header">
          <div>
            <h2>Hook-Based Integration</h2>
            <p>Resize the frame. The bubble metrics update from cached prepared text.</p>
          </div>
          <div className="badge">usePretextBubbles</div>
        </header>
        <div ref={frameRef} className="frame">
          <div className="list">
            {metrics.map(message => (
              <article
                key={message.id}
                className={`bubble bubble--${message.speaker}`}
                style={{ minHeight: `${message.height}px` }}
              >
                <p>{message.text}</p>
                <footer>{message.lineCount} lines</footer>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

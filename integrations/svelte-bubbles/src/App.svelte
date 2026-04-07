<script lang="ts">
  import { onMount } from 'svelte'

  import { layoutMessages, prepareMessages, type BubbleMessage, type BubbleMetric } from './lib/pretextBubbles'

  const messages: BubbleMessage[] = [
    { id: 'm1', speaker: 'system', text: 'Svelte should still respect the same rule: prepare once for text changes, layout for width changes.' },
    { id: 'm2', speaker: 'user', text: 'The integration is framework-specific, but the architectural split is the same across every app.' },
    { id: 'm3', speaker: 'system', text: 'This is where the skill stops being empty guidance and starts looking like a reusable project boundary.' },
  ]

  let frame: HTMLDivElement
  let metrics: BubbleMetric[] = []

  onMount(() => {
    let observer: ResizeObserver | null = null

    async function start() {
      const prepared = await prepareMessages(messages)
      observer = new ResizeObserver(entries => {
        const width = entries[0]?.contentRect.width ?? frame.clientWidth
        metrics = layoutMessages(prepared, width)
      })
      observer.observe(frame)
      metrics = layoutMessages(prepared, frame.clientWidth)
    }

    void start()

    return () => observer?.disconnect()
  })
</script>

<main class="page">
  <section class="hero">
    <p class="eyebrow">Svelte + TypeScript</p>
    <h1>Pretext Bubbles</h1>
    <p class="intro">This version keeps the integration small: one preload step, one resize observer, and typed layout output.</p>
  </section>
  <section class="panel">
    <header class="panel-header">
      <div>
        <h2>Svelte Integration</h2>
        <p>Resize the frame. The bubbles update from Pretext metrics rather than remeasuring text after paint.</p>
      </div>
      <div class="badge">prepare + layout</div>
    </header>
    <div bind:this={frame} class="frame">
      <div class="list">
        {#each metrics as message (message.id)}
          <article class={`bubble bubble--${message.speaker}`} style={`min-height:${message.height}px`}>
            <p>{message.text}</p>
            <footer>{message.lineCount} lines</footer>
          </article>
        {/each}
      </div>
    </div>
  </section>
</main>

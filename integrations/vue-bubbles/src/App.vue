<script setup lang="ts">
import { usePretextBubbles, type BubbleMessage } from './usePretextBubbles'

const messages: BubbleMessage[] = [
  { id: 'm1', speaker: 'system', text: 'Vue should keep the same split: prepare once for text, relayout on width changes.' },
  { id: 'm2', speaker: 'user', text: 'The composable owns ResizeObserver and metrics so the component only renders the result.' },
  { id: 'm3', speaker: 'system', text: 'This is the baseline for a real app, not a decorative demo wired straight to DOM measurement.' },
]

const { frameRef, metrics } = usePretextBubbles(messages)
</script>

<template>
  <main class="page">
    <section class="hero">
      <p class="eyebrow">Vue + TypeScript</p>
      <h1>Pretext Bubbles</h1>
      <p class="intro">
        The composable prepares message text after fonts load, then relayouts from frame width without recomputing prepared handles.
      </p>
    </section>
    <section class="panel">
      <header class="panel-header">
        <div>
          <h2>Composable Integration</h2>
          <p>Resize the frame. The bubbles follow layout metrics, not post-paint DOM reads.</p>
        </div>
        <div class="badge">usePretextBubbles</div>
      </header>
      <div ref="frameRef" class="frame">
        <div class="list">
          <article
            v-for="message in metrics"
            :key="message.id"
            class="bubble"
            :class="`bubble--${message.speaker}`"
            :style="{ minHeight: `${message.height}px` }"
          >
            <p>{{ message.text }}</p>
            <footer>{{ message.lineCount }} lines</footer>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

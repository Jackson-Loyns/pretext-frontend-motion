import type { StarterDirectoryMap, StarterKind, StarterPresetMap } from './types.js'

export const STARTER_DIRECTORIES: StarterDirectoryMap = {
  'predictive-ui': 'starter-predictive-ui',
  'editorial-routing': 'starter-editorial-routing',
  'kinetic-typography': 'starter-kinetic-typography',
}

export const STARTER_PRESETS: StarterPresetMap = {
  'predictive-ui': {
    'signal-bubbles': {
      '__MODE_LABEL__': 'Predictive UI',
      '__INTRO__': 'A width-tight message wall with bubble heights predicted from Pretext instead of DOM measurement.',
      '__MESSAGE_1__': 'Measured before paint, not guessed after paint.',
      '__MESSAGE_2__': 'Multilingual bubbles stay compact without layout flash. 你好，مرحبا，hello.',
      '__MESSAGE_3__': 'Pretext gives the shell a stable height before the message ever lands on screen.',
    },
    'tight-masonry': {
      '__MODE_LABEL__': 'Predictive UI',
      '__INTRO__': 'A masonry bulletin where card height is computed from measured copy before the layout commits.',
      '__MESSAGE_1__': 'Editorial cards can pack tightly when text height is known up front.',
      '__MESSAGE_2__': 'A narrow card, a long note, and a stable grid can coexist without jitter.',
      '__MESSAGE_3__': 'The point is not the grid. The point is the measured text geometry.',
    },
    'multilingual-feed': {
      '__MODE_LABEL__': 'Predictive UI',
      '__INTRO__': 'A live feed surface sized from cached text metrics across mixed scripts and emoji.',
      '__MESSAGE_1__': 'Arabic, Chinese, English, and emoji should not force the layout to guess.',
      '__MESSAGE_2__': 'Prepared text handles keep resize cheap even when the feed gets dense.',
      '__MESSAGE_3__': 'Stable heights make scroll anchoring and virtualization less fragile.',
    },
    'lab-signal-board': {
      '__MODE_LABEL__': 'Predictive UI',
      '__INTRO__': 'A near-white signal board with airy labels, measured notes, and compact text blocks that stay stable as the width changes.',
      '__MESSAGE_1__': 'Sparse technical labels should still align to measured text geometry, not guessed DOM height.',
      '__MESSAGE_2__': 'Keep the field light, crisp, and data-lab oriented rather than dashboard-generic.',
      '__MESSAGE_3__': 'Use typography density as the visual rhythm instead of dark cards and obvious chrome.',
    },
    'gallery-ribbon': {
      '__MODE_LABEL__': 'Predictive UI',
      '__INTRO__': 'A boutique content ribbon where compact text modules feel curated, warm, and measured rather than app-like.',
      '__MESSAGE_1__': 'Small copy modules can still feel editorial when line count is known before the shell settles.',
      '__MESSAGE_2__': 'The spacing should feel composed, not auto-generated.',
      '__MESSAGE_3__': 'Warm neutrals, measured copy, and restrained hierarchy create the tone.',
    },
  },
  'editorial-routing': {
    'orbital-essay': {
      '__MODE_LABEL__': 'Editorial Routing',
      '__INTRO__': 'Drag the orb. The paragraph reroutes line by line around the obstacle using Pretext geometry instead of DOM flow.',
      '__BODY_TEXT__': 'The page should feel like a living editorial spread, not a template. A routed headline, a carved body column, and a moving circular obstacle create the point of view. Pretext computes each line against the available width so the story bends around the shape instead of pretending the shape is not there. Resize the page or move the circle and the geometry can be recomputed cleanly.',
    },
    'pull-quote-spread': {
      '__MODE_LABEL__': 'Editorial Routing',
      '__INTRO__': 'Treat the floating shape like a pull quote anchor and reroute the article around it in real time.',
      '__BODY_TEXT__': 'A good editorial demo does not simply stack text blocks. It stages tension between columns, quotes, and empty space. Here the circular object acts like an inserted quote or mark. Each line is recomputed against the width that remains open in that band, so the article can bend around the interruption and still hold rhythm across the page.',
    },
    'routed-manifesto': {
      '__MODE_LABEL__': 'Editorial Routing',
      '__INTRO__': 'A manifesto style page where the body copy keeps its cadence while geometry cuts through the column.',
      '__BODY_TEXT__': 'Manifesto pages work when their structure is forceful but still legible. The obstacle here is not decoration. It is a compositional pressure point. Pretext lays out each next line against the available slot, which lets the block keep moving with intent as the circle shifts, the viewport changes, and the column width tightens on smaller screens.',
    },
    'paper-atlas': {
      '__MODE_LABEL__': 'Editorial Routing',
      '__INTRO__': 'A warm paper atlas spread where text curves around a circular annotation and keeps its cadence across the page.',
      '__BODY_TEXT__': 'The result should feel like a designed spread from an exhibition catalogue. The routed body text is the composition tool, not merely a technical trick. Use measured lines to keep a stable reading rhythm while the circle behaves like a printed annotation or map marker drifting through the column.',
    },
    'lab-schematic': {
      '__MODE_LABEL__': 'Editorial Routing',
      '__INTRO__': 'A near-white technical schematic where text routes around a moving node without turning into a template hero section.',
      '__BODY_TEXT__': 'The page should feel sparse, precise, and almost infrastructural. Small satellite labels, a measured headline, and routed explanatory text need to work together like a technical diagram rather than a marketing page. The moving node is a signal source, so each recomputed line should reinforce the feeling of a dynamic information field.',
    },
  },
  'kinetic-typography': {
    'pulse-type': {
      '__MODE_LABEL__': 'Kinetic Typography',
      '__INTRO__': 'Move the pointer across the canvas. Glyphs drift away from the cursor and then settle back to measured anchors produced by Pretext.',
      '__PHRASE_LINE_1__': '__DEMO_TITLE__',
      '__PHRASE_LINE_2__': 'TEXT WANTS MOTION',
    },
    'ribbon-ascii': {
      '__MODE_LABEL__': 'Kinetic Typography',
      '__INTRO__': 'A poster-like canvas where measured text anchors become the base state for a loose ASCII ribbon field.',
      '__PHRASE_LINE_1__': '__DEMO_TITLE__',
      '__PHRASE_LINE_2__': 'ASCII RIBBON FIELD',
    },
    'pointer-poster': {
      '__MODE_LABEL__': 'Kinetic Typography',
      '__INTRO__': 'A motion poster where the pointer bends the measured text cloud without destroying the underlying line layout.',
      '__PHRASE_LINE_1__': '__DEMO_TITLE__',
      '__PHRASE_LINE_2__': 'POINTER DRIVEN POSTER',
    },
    'algo-signal-field': {
      '__MODE_LABEL__': 'Kinetic Typography',
      '__INTRO__': 'A near-white technical field where a large measured word emerges from drifting micro-labels and signal noise.',
      '__PHRASE_LINE_1__': '__DEMO_TITLE__',
      '__PHRASE_LINE_2__': 'SIGNAL FIELD',
    },
    'ivory-data-cloud': {
      '__MODE_LABEL__': 'Kinetic Typography',
      '__INTRO__': 'An airy ivory surface where measured glyph anchors create a quiet cloud of small labels around a central phrase.',
      '__PHRASE_LINE_1__': '__DEMO_TITLE__',
      '__PHRASE_LINE_2__': 'DATA CLOUD',
    },
    'infrared-poster': {
      '__MODE_LABEL__': 'Kinetic Typography',
      '__INTRO__': 'A dark poster with higher contrast, stronger glow, and measured glyph motion that feels more cinematic than editorial.',
      '__PHRASE_LINE_1__': '__DEMO_TITLE__',
      '__PHRASE_LINE_2__': 'INFRARED POSTER',
    },
  },
}

export const DEFAULT_PRESETS: Record<StarterKind, string> = {
  'predictive-ui': 'signal-bubbles',
  'editorial-routing': 'orbital-essay',
  'kinetic-typography': 'pulse-type',
}

export function listKinds(): StarterKind[] {
  return Object.keys(STARTER_DIRECTORIES) as StarterKind[]
}

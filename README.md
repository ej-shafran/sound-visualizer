# sound-visualizer

## Description

A small, vanilla JavaScript and TypeScript library meant to easily visualize sound-waves in HTML.

Written in TypeScript and made to be easy for functional programming and general use.

## Getting Started

### Installation

```bash
npm install sound-visualizer
```

### Usage

This library offers two main forms of visualization: `continuous` and `current`.

The `continuous` version (technically referred to as an oscillogram) is similar to the kind of visualization done by apps like WhatsApp and Audacity, where the wave being displayed reflects what has been recorded so far.

The `current` version (a simple soundwave visualization) displays what is being currently recorded as a wave,
moving up and down according to frequency.

The easiest way to see the difference between the two is to visit [the codesandbox](https://codesandbox.io/p/sandbox/competent-curran-wpmxlu?selection=%5B%7B%22endColumn%22%3A10%2C%22endLineNumber%22%3A19%2C%22startColumn%22%3A10%2C%22startLineNumber%22%3A19%7D%5D).

To use one or the other, simply import them:

```typescript
import { currentVisualizer, continuousVisualizer } from 'sound-visualizer';
```

## Documentation

### Visualizers

#### Arguments

Each visualizer takes three arguments,
with the third one being different depending on the visualizer.

- `canvas` (`HTMLCanvasElement`): the canvas to display the visualization on.
- `audio` (`MediaStream`): the audio to visualize.
- `options`: an optional object containing additional options; see below.

#### Return type

Each visualizer function returns an object with the following properties:

```typescript
export type VisualizerFunctions = {
    start: () => void;
    stop: () => void;
    reset: () => void;
}
```

As their names suggest, `start` starts the visualization, `stop` stops the visualization, and `reset` calls `stop` and then clears the canvas.

#### Options

##### Continuous Visualizer

```typescript
export type DrawContinuousOptions = {
    lineWidth?: "thin" | "default" | "thick" | number;
    strokeColor?: string;
    slices?: number;
}
```

- `lineWidth` (`number` | `string`): the width of the lines that make up the wave; if a thickness string is provided, it will be translated into a percentage of the canvas's width, if a number is provided it will be used a `px` value. **Default:** `"default"`.
- `strokeColor` (`string`): the color of the wave; **Default:** `"#000"`.
- `slices` (`number`): the number of slices drawn onto the canvas to make up the wave; **Default:** `100`.

##### Current Visualizer

```typescript
export type DrawCurrentOptions = {
    lineWidth?: "thin" | "default" | "thick" | number;
    strokeColor?: string;
    heightNorm?: number;
}
```

- `lineWidth` (`number` | `string`): the width of the lines that make up the wave; if a thickness string is provided, it will be translated into a percentage of the canvas's width, if a number is provided it will be used a `px` value. **Default:** `"default"`.
- `strokeColor` (`string`): the color of the wave; **Default:** `"#000"`.
- `heightNorm` (`number`): a number used to normalize the height of the wave; the wave function is multiplied by this number, so a number larger than `1` will exaggerate the height of the wave, while a number between `0` and `1` will minimize it. **Default:** `1`.

#### Additional notes

The `ContinuousVisualizer` and `CurrentVisualizer` types are exported from this package, and an additional `Visualizer` type is exported for convenience, which is a union type for both.

In addition to importing from `sound-visualizer`, a few helper functions are available for import from `sound-visualizer/helpers/pure` and `sound-visualizer/helpers/impure`.

`helpers/pure` includes helper functions that do not mutate state and are deterministic; `helpers/impure` includes helper functions that change state, particularly of the `canvas`. These functions are used internally by `sound-visualizer`, and you likely do not need to use them directly, but they are available for convenience.

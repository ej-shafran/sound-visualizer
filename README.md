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
    barRadius?: number;
}
```

- `lineWidth` (`number` | `string`): the width of the lines that make up the wave; if a thickness string is provided, it will be translated into a percentage of the canvas's width, if a number is provided it will be used a `px` value. **Default:** `"default"`.
- `strokeColor` (`string`): the color of the wave; **Default:** `"#000"`.
- `slices` (`number`): the number of slices drawn onto the canvas to make up the wave; **Default:** `100`.
- `barRadius` (`number`): the border radius of each bar, setting `0` will draw a normal rectangle; **Default:** `0`.
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

### Helpers

This library also exposes a few of the useful functions used internally by the visualizers.They are seperated into `pure` and `impure`, depending on whether they are pure functions in the functional-programming sense (it was an easy way for me to think about the code :smile_cat:).

#### Pure

##### widthFromOption

```typescript
export function widthFromOption(
  lineWidth: number | "thin" | "thick" | "default",
  canvasWidth: number
): number;
```

Used to transform the `"thin" | "thick" | "default"` options for `lineWidth` into a useable `px` value, as a percentage of the canvas' width.

##### calculateLine

```typescript
export function calculateLine(canvasHeight: number, value: number): { start: number; end: number };
```

Used to calculate the coordinates on the canvas that should start and end the line visualized at a certain moment in time.

##### waveForm

```typescript
export function waveForm(array: number[]): number;
```

Used to calculate the wave-form value for a number array. Equivalent to $Max - Min$ where $Max$ is the maximum value in the array and $Min$ is the minimum value in the array. This helper isn't actually used internally by `sound-visualizer` - `waveFormUint` is used instead - but it's still exposed for convenience. It can also be acheived by doing:

```typescript
Math.max(...array) - Math.min(...array)
```

but `waveForm` is simply written to iterate over the array only once.

##### waveFormUint

```typescript
export function waveFormUint(array: Uint8Array): number;
```

Identical to `waveForm` but utilizes the maximum and minimum sizes of a Uint8.

##### frequencyValue

```typescript
export function frequencyValue(array: Uint8Array): number;
```

Takes the result of `waveFormUint` and flips it, so that a large `waveFormUint` result becomes a small number, and vice versa. This is the function that is actually used by the `continuousVisualizer`, because the `canvas` coordinates work in such a way that a small number is closer to the edge of the canvas.

#### Impure

##### clearCanvas

```typescript
export function clearCanvas(canvas: HTMLCanvasElement): void;
```

Clears a canvas with a 2d context.

##### drawContinuousWave

```typescript
export function drawContinuousWave(
  canvas: HTMLCanvasElement,
  audioHistory: number[],
  options: DrawContinuousOptions = defaultOptions
): void;
```

Function used to draw for every `tick` of the `continuousVisualizer`. `audioHistory` is an array of frequency values for the calculated history of the audio.

##### drawCurrentWave

```typescript
export function drawCurrentWave(
  canvas: HTMLCanvasElement,
  audioData: Uint8Array,
  options: DrawCurrentOptions = defaultOptions
): void;
```

Function used to draw for every `tick` of the `currentVisualizer`.

##### startAnalysis

```typescript
export function startAnalysis(audio: MediaStream): { analyse: () => Uint8Array, disconnect: () => void };
```

Function used to analyse the current audio's `byteTimeDomainData`. Abstracts away the pretty unreadable actions required to get the desired `Uint8Array` (which is later passed to `drawCurrentWave` or calculated with `frequencyValue` and added to the `audioHistory` array).

#### Additional notes

The `ContinuousVisualizer` and `CurrentVisualizer` types are exported from this package, and an additional `Visualizer` type is exported for convenience, which is a union type for both.

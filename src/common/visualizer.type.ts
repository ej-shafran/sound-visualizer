import { DrawContinuousOptions } from "../continuous/draw/options";
import { DrawCurrentOptions } from "../current/draw/options";

/**
 * The type returned by both `currentVisualizer` and `continuousVisualizer`.
 */
export type VisualizerFunctions = {
  start: () => void;
  stop: () => void;
  reset: () => void;
};

/**
 * The type of the `currentVisualizer` function.
 */
export type CurrentVisualizer = (
  audio: MediaStream,
  canvas: HTMLCanvasElement,
  drawOptions?: DrawCurrentOptions
) => VisualizerFunctions;

/**
 * The type of the `continuousVisualizer` function.
 */
export type ContinuousVisualizer = (
  audio: MediaStream,
  canvas: HTMLCanvasElement,
  drawOptions?: DrawContinuousOptions
) => VisualizerFunctions;

/**
 * A union type matching both visualizer functions.
 */
export type Visualizer = ContinuousVisualizer | CurrentVisualizer;

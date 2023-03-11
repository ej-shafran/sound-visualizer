import { DrawContinuousOptions } from "./draw/options";
import { frequencyValue } from "./wave/pure";

import { drawContinuousWave } from "./draw/impure";
import { clearCanvas } from "../common/draw/impure";
import { startAnalysis } from "../helpers/impure";

/**
 * Sets up a continuous sound visualizer.
 *
 * @impure this function returns impure functions.
 *
 * @param audio the audio to visualize.
 * @param canvas the canvas to draw to.
 * @param drawOptions additional options for the sound visualizer. See the `DrawContinuousOptions` type.
 *
 * @returns functions used to visualize the audio. See the `VisualizerFunctions` type.
 **/
export function continuousVisualizer(
  audio: MediaStream,
  canvas: HTMLCanvasElement,
  drawOptions?: DrawContinuousOptions
) {
  let animationFrameId: number | null = null;

  const audioHistory: number[] = new Array(drawOptions?.slices ?? 100);

  const { analyse, disconnect } = startAnalysis(audio);

  /**
   * Starts the continuous sound visualizer.
   *
   * @impure this function mutates the state of the canvas and has no return value.
   */
  function start() {
    if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    clearCanvas(canvas);

    function tick() {
      audioHistory.push(frequencyValue(analyse()));

      drawContinuousWave(canvas, audioHistory, drawOptions);

      animationFrameId = requestAnimationFrame(tick);
    }

    animationFrameId = requestAnimationFrame(tick);
  }

  /**
   * Stops the continuous sound visualizer. Does not clear the canvas.
   *
   * @impure this function mutates the state of the canvas and has no return value.
   */
  function stop() {
    if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    disconnect();
  }

  /**
   * Stops the continuous sound visualizer and clears the canvas.
   *
   * @impure this function mutates the state of the canvas and has no return value.
   */
  function reset() {
    stop();
    clearCanvas(canvas);
  }

  return { start, stop, reset };
}

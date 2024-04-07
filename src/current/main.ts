import { DrawCurrentOptions } from "./draw/options";

import { drawCurrentWave } from "./draw/impure";
import { clearCanvas } from "../common/draw/impure";
import { startAnalysis } from "../helpers/impure";

/**
 * Sets up a current sound visualizer.
 *
 * @impure this function returns impure functions.
 *
 * @param audio the audio to visualize.
 * @param canvas the canvas to draw to.
 * @param drawOptions additional options for the sound visualizer. See the `DrawCurrentOptions` type.
 *
 * @returns functions used to visualize the audio. See the `VisualizerFunctions` type.
 **/
export function currentVisualizer(
  audio: MediaStream,
  canvas: HTMLCanvasElement,
  drawOptions?: DrawCurrentOptions,
) {
  let animationFrameId: number | null = null;

  const { analyse, disconnect } = startAnalysis(audio);

  function start() {
    if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);

    function tick() {
      drawCurrentWave(canvas, analyse(), drawOptions);

      animationFrameId = requestAnimationFrame(tick);
    }

    animationFrameId = requestAnimationFrame(tick);
  }

  function stop() {
    if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    disconnect();
  }

  function reset() {
    stop();
    clearCanvas(canvas);
  }

  return { start, stop, reset };
}

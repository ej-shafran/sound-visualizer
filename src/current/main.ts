import { DrawCurrentOptions } from "./draw/options";

import { drawCurrentWave } from "./draw/impure";
import { clearCanvas } from "../common/draw/impure";

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
  drawOptions?: DrawCurrentOptions
) {
  let animationFrameId: number | null = null;

  const audioContext = new window.AudioContext();
  const analyser = audioContext.createAnalyser();
  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  const source = audioContext.createMediaStreamSource(audio);

  function start() {
    source.connect(analyser);

    function tick() {
      analyser.getByteTimeDomainData(dataArray);

      drawCurrentWave(canvas, dataArray, drawOptions);

      animationFrameId = requestAnimationFrame(tick);
    }

    animationFrameId = requestAnimationFrame(tick);
  }

  function stop() {
    if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    analyser.disconnect();
    source.disconnect();
  }

  function reset() {
    stop();
    clearCanvas(canvas);
  }

  return { start, stop, reset };
}

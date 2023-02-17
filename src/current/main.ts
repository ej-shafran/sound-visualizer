import { DrawCurrentOptions } from "./draw/options";

import { drawCurrentWaves } from "./draw/impure";
import { clearCanvas } from "common/draw/impure";

/**
 * @impure
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

      drawCurrentWaves(canvas, dataArray, drawOptions);

      animationFrameId = requestAnimationFrame(tick);
    }

    animationFrameId = requestAnimationFrame(tick);
  }

  function stop() {
    if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    analyser.disconnect();
    source.disconnect();
    audio.getTracks().forEach((track) => track.stop());
  }

  function reset() {
    stop();
    clearCanvas(canvas);
  }

  return { start, stop, reset };
}

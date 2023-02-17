import { DrawContinuousOptions } from "./draw/options";
import { frequencyValue } from "./wave/pure";

import { drawContinuousWave } from "./draw/impure";
import { clearCanvas } from "common/draw/impure";

/**
 * @impure
 **/
export function continuousVisualizer(
  audio: MediaStream,
  canvas: HTMLCanvasElement,
  drawOptions?: DrawContinuousOptions
) {
  let animationFrameId: number | null = null;

  const audioHistory: number[] = new Array(100);

  const audioContext = new window.AudioContext();
  const analyser = audioContext.createAnalyser();
  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  const source = audioContext.createMediaStreamSource(audio);

  function start() {
    source.connect(analyser);

    function tick() {
      analyser.getByteTimeDomainData(dataArray);
      audioHistory.push(frequencyValue(dataArray));

      drawContinuousWave(canvas, audioHistory, drawOptions);

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

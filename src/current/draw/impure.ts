import { defaultOptions, DrawCurrentOptions } from "./options";
import { widthFromOption } from "../../common/draw/pure";

/**
 * Draws audio data (a `Uint8Array` modified by `AnalyserNode.getByteTimeDomainData`) to the canvas as a wave.
 *
 * @impure this function mutates the state of the canvas, and has no return value.
 *
 * @param canvas the canvas to draw to.
 * @param audioData the audio data to draw.
 * @param options additional options for the draw operation. See the `DrawCurrentOptions` type.
 **/
export function drawCurrentWave(
  canvas: HTMLCanvasElement,
  audioData: Uint8Array,
  options: DrawCurrentOptions = defaultOptions
) {
  const context = canvas.getContext("2d");
  if (!context) return;

  const { strokeColor = "#000", rectWidth = "default", heightNorm = 1 } = options;
  const { height, width } = canvas;

  const sliceWidth = width / audioData.length;

  context.lineWidth = widthFromOption(rectWidth, width);
  context.strokeStyle = strokeColor;

  context.clearRect(0, 0, width, height);
  context.beginPath();
  context.moveTo(0, height / 2);

  for (let i = 0; i < audioData.length; i++) {
    const x = i * sliceWidth;

    const fraction = audioData[i] / 255;
    const sectionSize = height * heightNorm;
    const y = fraction * sectionSize + (height - sectionSize) * 0.5;
    context.lineTo(x, y);
  }

  context.lineTo(sliceWidth * audioData.length, height / 2);
  context.stroke();
}

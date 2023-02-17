import { defaultOptions, DrawCurrentOptions } from "./options";
import { widthFromOption } from "common/draw/pure";

/**
 * @impure
 **/
export function drawCurrentWaves(
  canvas: HTMLCanvasElement,
  audioData: Uint8Array,
  options: DrawCurrentOptions = defaultOptions
) {
  const context = canvas.getContext("2d");
  if (!context) return;

  const {
    strokeColor = "#000",
    lineWidth = "default",
    heightNorm = 1,
  } = options;
  const { height, width } = canvas;

  const sliceWidth = width / audioData.length;

  context.lineWidth = widthFromOption(lineWidth);
  context.strokeStyle = strokeColor;

  // reset and move to the middle of the left border
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

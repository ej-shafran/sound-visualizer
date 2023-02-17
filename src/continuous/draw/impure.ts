import { DrawContinuousOptions, defaultOptions } from "./options";
import { calculateLine } from "./pure";
import { widthFromOption } from "../../common/draw/pure";

/**
 * @impure
 **/
export function drawContinuousWave(
  canvas: HTMLCanvasElement,
  audioHistory: number[],
  options: DrawContinuousOptions = defaultOptions
) {
  const context = canvas.getContext("2d");
  if (!context) return;

  const { strokeColor = "#000000", lineWidth = "default", slices = 100 } = options;
  const { height, width } = canvas;

  context.lineWidth = widthFromOption(lineWidth, width);
  context.strokeStyle = strokeColor;

  context.clearRect(0, 0, width, height);
  context.beginPath();
  context.moveTo(0, height);

  const sliceWidth = width / slices;

  for (let i = 0; i < slices; i++) {
    if (i >= audioHistory.length) break;

    const value = audioHistory.slice(-slices)[i];
    const { start, end } = calculateLine(height, value);

    const x = i * sliceWidth;

    context.moveTo(x, start);
    context.lineTo(x, end);
  }

  context.stroke();
}

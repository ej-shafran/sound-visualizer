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

  const { strokeColor = "#000000", rectWidth = "default", slices = 100, barRadius = 0 } = options;
  const { height, width } = canvas;

  const w = widthFromOption(rectWidth, width);
  context.fillStyle = strokeColor;

  context.clearRect(0, 0, width, height);
  context.beginPath();

  const sliceWidth = width / slices;

  const historyToCheck = audioHistory.slice(-slices);

  for (let i = 0; i < slices; i++) {
    if (i >= audioHistory.length) break;

    const value = historyToCheck[i];
    const { start, end } = calculateLine(height, value);

    const x = i * sliceWidth;

    if (barRadius <= 0) {
      context.rect(x, start, w, end - start);
    } else {
      context.roundRect(x, start, w, end - start, barRadius);
    }
  }

  context.fill();
}

/**
 * Calculates the starting and ending point of each line displayed within the wave,
 * to be used on the canvas.
 *
 * @param canvasHeight The height of the canvas.
 * @param value the frequency value of the line to draw.
 *
 * @returns an object with `start` and `end` properties.
 *
 * @pure this function is determinstic and doesn not mutate state
 **/
export function calculateLine(canvasHeight: number, value: number) {
  const percent = value / 255;
  const start = (canvasHeight / 2) * percent;
  const end = canvasHeight - start;

  return { start, end };
}

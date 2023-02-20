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
  let fraction = value / 255;
  if (fraction < 0.05) fraction += 0.05;
  const start = (canvasHeight / 2) * fraction;
  const end = canvasHeight - start;

  return { start, end };
}

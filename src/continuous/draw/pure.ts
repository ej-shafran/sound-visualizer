/**
 * @pure
 **/
export function calculateLine(canvasHeight: number, value: number) {
  const percent = value / 255;
  const start = (canvasHeight / 2) * percent;
  const end = canvasHeight - start;

  return { start, end };
}

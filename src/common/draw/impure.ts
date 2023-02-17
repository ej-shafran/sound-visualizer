/**
 * Clears a given canvas with a 2d context.
 *
 * @param canvas the canvas to be cleared
 *
 * @impure this function mutates the state of the canvas and has no return value
 **/
export function clearCanvas(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  if (!context) return;

  const { width, height } = canvas;
  context.clearRect(0, 0, width, height);
}

/**
 * @impure
 **/
export function clearCanvas(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");
    if(!context) return;

    const { width, height } = canvas;
    context.clearRect(0, 0, width, height);
}

/**
 * The options that are common across both visualizer functions.
 */
export interface DrawOptions {
  /**
   * The color of the wave drawn on the canvas.
   *
   * @default "#000"
   */
  strokeColor?: string;
  /**
   * The thickness of the bar used to draw the wave.
   *
   * If a number is provided, it will be used as a `px` value.
   * If a thickness string is provided, it will be transformed into a percentage of the canvas width.
   *
   * @default "default"
   */
  rectWidth?: number | "thick" | "thin" | "default";
}

/**
 * The defaults for `DrawOptions`.
 */
export const defaultDrawOptions: DrawOptions = {
  strokeColor: "#000",
  rectWidth: 2,
};

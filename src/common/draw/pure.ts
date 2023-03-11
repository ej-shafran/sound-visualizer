const THICKNESS_MAP = {
  thin: 1,
  default: 2,
  thick: 2.75,
} as const;

/**
 * Transforms the `lineWidth` option passed into a visualizer function
 * into a useable numeric value.
 *
 * @pure this function is deterministic and does not mutate state.
 *
 * @param lineWidth the option to transfrom
 * @param canvasWidth the width of the canvas; used to determine a value relative to the canvas when a thickness string is passed.
 *
 * @returns a numeric value
 **/
export function widthFromOption(
  lineWidth: number | "thin" | "default" | "thick",
  canvasWidth: number,
) {
  if (typeof lineWidth === "number") return lineWidth;

  return (THICKNESS_MAP[lineWidth] / 300) * canvasWidth;
}

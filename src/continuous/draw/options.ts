import { DrawOptions, defaultDrawOptions } from "../../common/draw/options";

/**
 * The options for the `continuousVisualizer` function, specifically.
 */
export interface DrawContinuousOptions extends DrawOptions {
  /**
   * Amount of slices to draw for visualized wave.
   *
   * @default 100
   */
  slices?: number;

  /**
   * Border radius of the bar
   *
   * 0 will draw a normal rectangle
   *
   * @default 0
   */
  barRadius?: number;
}

export const defaultOptions: DrawContinuousOptions = {
  ...defaultDrawOptions,
  slices: 100,
  barRadius: 0,
};

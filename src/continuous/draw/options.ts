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
}

export const defaultOptions = {
  ...defaultDrawOptions,
  slices: 100,
};

import { DrawOptions, defaultDrawOptions } from "../../common/draw/options";

export interface DrawCurrentOptions extends DrawOptions {
  /**
   * A value used to normalize the height of the drawn wave.
   *
   * The wave function is multiplied by this value,
   * so a value greater than `1` will exaggerate the size of the wave,
   * while a value between `0` and `1` will minimize it.
   *
   * @default 1
   */
  heightNorm?: number;
}

export const defaultOptions = {
  ...defaultDrawOptions,
  heightNorm: 1,
};

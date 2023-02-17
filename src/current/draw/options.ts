import { DrawOptions, defaultDrawOptions } from "common/draw/options";

export interface DrawCurrentOptions extends DrawOptions {
  heightNorm?: number;
}

export const defaultOptions = {
  ...defaultDrawOptions,
  heightNorm: 1,
};

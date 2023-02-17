import { DrawOptions, defaultDrawOptions } from "common/draw/options";

export interface DrawContinuousOptions extends DrawOptions {
    slices?: number;
}

export const defaultOptions = {
    ...defaultDrawOptions,
    slices: 100,
}

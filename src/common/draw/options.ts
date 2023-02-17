export interface DrawOptions {
  strokeColor?: string;
  lineWidth?: number | "thick" | "thin" | "default";
}

export const defaultDrawOptions: DrawOptions = {
  strokeColor: "#000",
  lineWidth: 2,
};

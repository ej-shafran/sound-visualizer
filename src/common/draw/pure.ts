import { THICKNESS_MAP } from "./constants";

/**
 * @pure
 **/
export function widthFromOption(lineWidth: number | "thin" | "default" | "thick") {
    if (typeof lineWidth === "number") return lineWidth;
    
    return THICKNESS_MAP[lineWidth];
}

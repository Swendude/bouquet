import { Point } from "honeycomb-grid";

export const hexPath = (corners: Point[]) => {
  const [first, ...others] = corners;
  let pathStr = `M${first.x}, ${first.y} `;
  others.forEach(({ x, y }, i) => {
    pathStr += `L${x}, ${y} `;
  });
  return pathStr + " Z";
};

export const getHexDimensions = (
  size: number
): { width: number; height: number } => {
  return { width: size * 2, height: Math.sqrt(3) * size };
};

export const centeredViewBox = (
  {
    width,
    height,
  }: {
    width: number;
    height: number;
  },
  margin: number,
  rows: number,
  cols: number
): number[] => [
  (-width * rows) / 2 - margin,
  (-height * cols) / 2 - margin,
  width * rows + margin * 2,
  height * cols + margin * 2,
];

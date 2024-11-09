import { Point } from "honeycomb-grid";

export const hexPath = (
  corners: Point[],
  sides: number[] = [0, 1, 2, 3, 4, 5],
) => {
  if (corners.length === 0) return "";

  // Initialize the path starting at the first point
  let pathStr = `M${corners[0].x},${corners[0].y} `;

  // Loop through each corner and add only the specified sides
  corners.forEach((_, i) => {
    if (sides.includes(i)) {
      const nextPoint = corners[(i + 1) % corners.length];
      pathStr += `L${nextPoint.x},${nextPoint.y} `;
    } else {
      // Move to the next point without drawing a line (keeps the shape open on this side)
      const nextPoint = corners[(i + 1) % corners.length];
      pathStr += `M${nextPoint.x},${nextPoint.y} `;
    }
  });

  return pathStr.trim(); // Remove any trailing whitespace
};
export const getHexDimensions = (
  size: number,
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
  cols: number,
): [number, number, number, number] => {
  const totalWidth = ((cols + 3) * width) / 2;
  const totalHeigth = Math.floor(height * rows);
  return [
    -totalWidth / 2 - margin,
    -totalHeigth / 2 - margin,
    totalWidth + margin,
    totalHeigth + margin,
  ];
};

interface TriangleOptions {
  width: number;
  height: number;
  offsetX?: number; // horizontal offset from center
  offsetY?: number; // vertical offset from base
  rounded?: number; // corner radius (0 for sharp corners)
}

export function generateTrianglePath({
  width,
  height,
  offsetX = 0,
  offsetY = 0,
  rounded = 0,
}: TriangleOptions): string {
  const halfWidth = width / 2;

  if (rounded === 0) {
    return `M ${-halfWidth + offsetX},${offsetY} 
            L ${halfWidth + offsetX},${offsetY} 
            L ${offsetX},${-height + offsetY} Z`;
  }
  return `M ${-halfWidth + offsetX},${offsetY}
            L ${halfWidth + offsetX},${offsetY}
            Q ${halfWidth + offsetX - rounded},${offsetY - rounded} 
              ${halfWidth + offsetX - rounded},${offsetY - rounded}
            L ${offsetX + rounded},${-height + offsetY + rounded}
            Q ${offsetX},${-height + offsetY} 
              ${offsetX - rounded},${-height + offsetY + rounded}
            L ${-halfWidth + offsetX + rounded},${offsetY - rounded}
            Q ${-halfWidth + offsetX},${offsetY} 
              ${-halfWidth + offsetX},${offsetY} Z`;
}

// Example usage:
// const path = generateTrianglePath({ width: 100, height: 150, rounded: 5 });
// const path = generateTrianglePath({ width: 100, height: 150, offsetX: 10, offsetY: -10 });

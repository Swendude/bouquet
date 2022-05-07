import { Hex, Point } from "honeycomb-grid";
import chroma from "chroma-js";
import { useState } from "react";

interface HexLeafProps {
  hex: Hex<{}>;
  prop: any;
}

const hexPath = (corners: Point[]) => {
  const [first, ...others] = corners;
  let pathStr = `M${first.x}, ${first.y} `;
  others.forEach(({ x, y }, i) => {
    pathStr += `L${x}, ${y} `;
  });
  return pathStr + " Z";
};

const HexLeaf = (props: HexLeafProps) => {
  const [getColor, setColor] = useState(
    chroma.scale(["#3b8bbc", "#e0915a"]).mode("lch").colors(6)
  );
  return (
    <g>
      <path
        d={hexPath(props.hex.corners())}
        transform={`translate(${props.hex.toPoint().x},${
          props.hex.toPoint().y
        })`}
        stroke={"#ccc"}
        strokeWidth={2}
        fill={getColor[Math.floor(Math.random() * getColor.length)]}
      />
    </g>
  );
};

export default HexLeaf;

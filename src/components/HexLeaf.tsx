import { Hex, Point } from "honeycomb-grid";
import chroma from "chroma-js";
import { useState } from "react";
import { useAppSelector } from "../store/hooks";

interface HexLeafProps {
  hex: Hex<{}>;
}

const HexLeaf = (props: HexLeafProps) => {
  const hexPath = (corners: Point[]) => {
    const [first, ...others] = corners;
    let pathStr = `M${first.x}, ${first.y} `;
    others.forEach(({ x, y }, i) => {
      pathStr += `L${x}, ${y} `;
    });
    return pathStr + " Z";
  };

  const colorSchema = useAppSelector((state) =>
    state.flower.data ? state.flower.data.colorSchema : undefined
  );
  const myIndex = useAppSelector((state) =>
    state.flower.data ? state.flower.data.hexFlower.indexOf(props.hex) : 0
  );
  const myProps = useAppSelector((state) =>
    state.flower.data && myIndex >= 0
      ? state.flower.data.propMap[myIndex]
      : null
  );
  const [getColor] = useState(chroma.scale(colorSchema).mode("lch").colors(6));

  return (
    <g>
      <path
        d={hexPath(props.hex.corners())}
        transform={`translate(${props.hex.toPoint().x},${
          props.hex.toPoint().y
        })`}
        stroke={"#ccc"}
        strokeWidth={2}
        fill={myProps ? getColor[myProps.colorChoice] : "none"}
      />
    </g>
  );
};

export default HexLeaf;

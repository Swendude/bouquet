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

  const colorScale = useAppSelector((state) =>
    state.flower.data
      ? chroma.scale(state.flower.data.colorScale).mode("lab").colors(6)
      : undefined
  );
  const myIndex = useAppSelector((state) =>
    state.flower.data ? state.flower.data.hexFlower.indexOf(props.hex) : 0
  );
  const myProps = useAppSelector((state) =>
    state.flower.data && myIndex >= 0
      ? state.flower.data.propMap[myIndex]
      : null
  );

  const myColor = myProps ? colorScale[myProps.colorChoice] : null;
  return (
    <g
      transform={`translate(${props.hex.toPoint().x},${props.hex.toPoint().y})`}
    >
      <path
        d={hexPath(props.hex.corners())}
        stroke={"#eee"}
        strokeWidth={3}
        fill={myProps ? myColor : "none"}
      />
      <text
        textAnchor="middle"
        className="leaf-lable"
        fill={chroma(myColor).luminance() >= 0.5 ? "black" : "white"}
      >
        Label
      </text>
    </g>
  );
};

export default HexLeaf;

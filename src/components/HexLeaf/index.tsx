import chroma from "chroma-js";
import { Hex, hexToPoint } from "honeycomb-grid";
import { hexPath } from "../../utils";
import "./style.css";
import { FlowerHex, useHexflowerContext } from "../HexReducerContext";
import { useState } from "react";
import { DARKEN_FACTOR } from "../../config";

interface HexLeafProps {
  hex: FlowerHex;
}

const HexLeaf = ({ hex }: HexLeafProps) => {
  const { dispatch, state } = useHexflowerContext();
  const [hovered, setHovered] = useState(false);

  const colorScale: string[] = chroma
    .scale(state.colorScale)
    .mode("lab")
    .colors(7);

  const bgColor = colorScale[hex.props.colorChoice];
  const fgColor = chroma(bgColor).luminance() >= 0.5 ? "#222" : "#eee";

  const hCenter = hexToPoint(hex);

  const selected = state.selected?.equals(hex);

  const hColor =
    selected || hovered ? chroma(bgColor).darken(DARKEN_FACTOR) : bgColor;

  const tColor = fgColor;

  return (
    <>
      <g
        onMouseLeave={() => setHovered(false)}
        onMouseOver={() => setHovered(true)}
        onClick={() => dispatch({ name: "select", payload: hex })}
      >
        <path
          d={hexPath(hex.corners)}
          stroke={"#eee"}
          strokeWidth={3}
          fill={hColor}
          className={`hex-shape`}
        />
        <g
          className="text-group"
          transform={`translate(${hCenter.x},${hCenter.y})`}
        >
          <foreignObject
            width={hex.width * (2 / 3)}
            height={hex.height * (2 / 3)}
            className="text-el"
            transform={`translate(-${hex.width * (1 / 3)} -${hex.height * (1 / 3)})`}
          >
            <div className="label-box">
              <p
                className="leaf-label"
                style={{
                  color: tColor,
                  fontWeight: selected ? "700" : "500",
                  textDecoration: selected ? "underline" : "initial",
                }}
              >
                {/* {`${hex.q}, ${hex.r}`} */}
                {hex.props.label}
              </p>
            </div>
          </foreignObject>
        </g>
      </g>
    </>
  );
};

export default HexLeaf;

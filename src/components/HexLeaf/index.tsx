import chroma from "chroma-js";
import { Hex, hexToPoint } from "honeycomb-grid";
import { hexPath } from "../../utils";
import "./style.css";
import { FlowerHex, useHexflowerContext } from "../HexReducerContext";
import { useState } from "react";

interface HexLeafProps {
  hex: FlowerHex;
}

const HexLeaf = ({ hex }: HexLeafProps) => {
  const { dispatch, state } = useHexflowerContext();
  const [hovering, setHovering] = useState(false);

  const colorScale: string[] = chroma
    .scale(state.colorScale)
    .mode("lab")
    .colors(7);

  const hCenter = hexToPoint(hex);
  const hColor = hovering
    ? chroma(colorScale[hex.props.colorChoice]).darken(2)
    : colorScale[hex.props.colorChoice];
  return (
    <>
      <g
        onMouseLeave={() => setHovering(false)}
        onMouseOver={() => setHovering(true)}
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
                  color: chroma(hColor).luminance() >= 0.5 ? "#222" : "#fff",
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

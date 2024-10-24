import chroma from "chroma-js";
import { Hex, hexToPoint } from "honeycomb-grid";
import { hexPath } from "../../utils";
import "./style.css";
import { FlowerHex, useHexflowerContext } from "../HexReducerContext";

interface HexLeafProps {
  hex: FlowerHex;
}

const HexLeaf = ({ hex }: HexLeafProps) => {
  const { dispatch, state } = useHexflowerContext();

  const colorScale: string[] = chroma
    .scale(state.colorScale)
    .mode("lab")
    .colors(7);

  const hCenter = hexToPoint(hex);
  const hColor = colorScale[hex.props.colorChoice];
  return (
    <>
      <path
        d={hexPath(hex.corners)}
        stroke={"#eee"}
        strokeWidth={3}
        fill={hColor}
        // className={`hex-shape ${selected ? "selected" : ""}`}
        className={`hex-shape`}
      />
      <g transform={`translate(${hCenter.x},${hCenter.y})`}>
        <g
          className="text-group"
          // transform={`translate(-${hex.height * 0.25} -${hex.height * 0.25} )`}
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

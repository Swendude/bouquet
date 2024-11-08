import chroma from "chroma-js";
import { hexToPoint } from "honeycomb-grid";
import { hexPath } from "../../utils";
import {
  type FlowerHex,
  getSelected,
  useHexflowerContext,
} from "../HexReducerContext";
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
  const fgColor =
    chroma(bgColor).luminance() >= 0.5
      ? "text-neutral-900"
      : "text-neutral-100";

  const hCenter = hexToPoint(hex);

  const selected = getSelected(state);
  const isSelected = selected && hex.equals(selected);
  const hColor =
    isSelected || hovered ? chroma(bgColor).darken(DARKEN_FACTOR) : bgColor;

  const tColor = fgColor;

  return (
    <>
      <g
        onMouseLeave={() => setHovered(false)}
        onMouseOver={() => setHovered(true)}
        onFocus={() => setHovered(true)}
        onMouseDown={() => dispatch({ name: "select", payload: hex })}
        className={"cursor-pointer group"}
      >
        <path
          d={hexPath(hex.corners)}
          strokeWidth={1.5}
          fill={hColor}
          className="stroke-neutral-900"
        />
        <g
          className="text-group"
          transform={`translate(${hCenter.x},${hCenter.y})`}
        >
          <foreignObject
            width={hex.width * (2 / 3)}
            height={hex.height * (2 / 3)}
            className=""
            transform={`translate(-${hex.width * (1 / 3)} -${hex.height * (1 / 3)})`}
          >
            <div className="h-full w-full grid place-items-center overflow-scroll group-hover:animate-pop">
              <p
                className={`${tColor} transition-shadow uppercase text-xs text-center leading-none whitespace-pre  ${isSelected && "font-bold underline"}`}
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

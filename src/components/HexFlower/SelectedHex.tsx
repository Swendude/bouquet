import chroma from "chroma-js";
import { Hex, Point } from "honeycomb-grid";
import { FlowerHex, useHexflowerContext } from "../HexReducerContext";
import { hexPath } from "../../utils";
import { DARKEN_FACTOR } from "../../config";

interface SelectedHexProps {
  hex: FlowerHex;
}

const SelectedHex = ({ hex }: SelectedHexProps) => {
  const { state } = useHexflowerContext();

  const colorScale: string[] = chroma
    .scale(state.colorScale)
    .mode("lab")
    .colors(7);

  const hColor = chroma(colorScale[hex.props.colorChoice]).darken(
    DARKEN_FACTOR,
  );

  return (
    <g>
      <path
        d={hexPath(hex.corners)}
        stroke={hColor}
        strokeWidth={10}
        fill={"none"}
      />
    </g>
  );
};

export default SelectedHex;

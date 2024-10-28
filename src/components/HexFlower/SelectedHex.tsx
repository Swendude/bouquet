import chroma from "chroma-js";
import { Hex, Point } from "honeycomb-grid";
import { FlowerHex, useHexflowerContext } from "../HexReducerContext";
import { hexPath } from "../../utils";

interface SelectedHexProps {
  hex: FlowerHex;
}

const SelectedHex = ({ hex }: SelectedHexProps) => {
  const { state } = useHexflowerContext();

  const colorScale: string[] = chroma
    .scale(state.colorScale)
    .mode("lab")
    .colors(7);

  const hColor = chroma(colorScale[hex.props.colorChoice]).darken(2);

  return (
    <path
      d={hexPath(hex.corners)}
      stroke={chroma(hColor).darken(0.8).desaturate(2)}
      strokeWidth={4}
      fill={"none"}
    />
  );
};

export default SelectedHex;

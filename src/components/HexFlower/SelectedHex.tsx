import chroma from "chroma-js";
import { Hex, Point } from "honeycomb-grid";
import { useHexflowerContext } from "../HexReducerContext";

interface SelectedHexProps {
  hex: Hex<{}>;
}

const SelectedHex = (props: SelectedHexProps) => {
  const hexPath = (corners: Point[]) => {
    const [first, ...others] = corners;
    let pathStr = `M${first.x}, ${first.y} `;
    others.forEach(({ x, y }, i) => {
      pathStr += `L${x}, ${y} `;
    });
    return pathStr + " Z";
  };

  const { state } = useHexflowerContext();

  const colorScale: [string] = chroma
    .scale(state.colorScale)
    .mode("lab")
    .colors(7);

  const myIndex = state.hexFlower.indexOf(props.hex);

  const myProps = myIndex >= 0 ? state.propMap[myIndex] : undefined;

  const myColor = myProps ? colorScale[myProps.colorChoice] : undefined;
  return (
    <g
      transform={`translate(${props.hex.toPoint().x},${props.hex.toPoint().y})`}
    >
      <path
        d={hexPath(props.hex.corners())}
        stroke={myProps ? chroma(myColor).darken(0.8).desaturate(2) : "none"}
        strokeWidth={4}
        fill={"none"}
      />
    </g>
  );
};

export default SelectedHex;

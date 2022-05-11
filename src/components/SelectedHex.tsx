import chroma from "chroma-js";
import { Hex, Point } from "honeycomb-grid";
import { useAppSelector } from "../store/hooks";

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

  const colorScale: [string] = useAppSelector((state) =>
    chroma.scale(state.flower.colorScale).mode("lab").colors(7)
  );

  const myIndex = useAppSelector((state) =>
    state.flower.hexFlower.indexOf(props.hex)
  );

  const myProps = useAppSelector((state) =>
    myIndex >= 0 ? state.flower.propMap[myIndex] : undefined
  );

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

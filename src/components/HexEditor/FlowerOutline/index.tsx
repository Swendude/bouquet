import { ring } from "honeycomb-grid";
import { useHexflowerContext } from "../../HexReducerContext";
import { hexPath } from "../../../utils";

const FlowerOutline = () => {
  const { dispatch, state } = useHexflowerContext();
  const outlineHexes = state.hexGrid.traverse(
    ring({ center: [0, 0], radius: 2 }),
  );
  return (
    <g>
      {outlineHexes.toArray().map((hex) => (
        <path
          d={hexPath(hex.corners)}
          stroke="#eee"
          strokeWidth={8}
          strokeLinejoin="round"
        />
      ))}
    </g>
  );
};
export default FlowerOutline;

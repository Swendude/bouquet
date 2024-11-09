import { centeredViewBox, getHexDimensions } from "../../utils";

import HexLeaf from "../HexLeaf";
import { useHexflowerContext } from "../HexReducerContext";

const HexFlower = () => {
  const { dispatch, state } = useHexflowerContext();

  const grid = state.flowerGrid;
  const size = grid.getHex([0, 0])!.dimensions.xRadius;

  const vb = centeredViewBox(getHexDimensions(size), 1, 5, 5);
  return (
    <svg style={{ maxWidth: vb[2] - vb[0] }} viewBox={vb.join(" ")}>
      <rect
        x={vb[0]}
        y={vb[1]}
        width={vb[2]}
        height={vb[3]}
        opacity={0}
        onClick={() => dispatch({ name: "deselect" })}
      />
      <g>
        {grid.toArray().map((hex) => (
          <HexLeaf key={hex.toString()} hex={hex} />
        ))}
      </g>
      )
    </svg>
  );
};

export default HexFlower;

import { centeredViewBox, getHexDimensions } from "../../utils";

import HexLeaf from "../HexLeaf";
import { useHexflowerContext } from "../HexReducerContext";

const HexFlower = () => {
  const { dispatch, state } = useHexflowerContext();
  const grid = state.flowerGrid;
  const centerHex = grid.getHex([0, 0]);
  if (!centerHex) {
    throw new Error("Hexflower grid not initialized");
  }
  const size = centerHex.dimensions.xRadius;

  const vb = centeredViewBox(getHexDimensions(size), 1, 5, 5);
  return (
    <svg style={{ maxWidth: vb[2] - vb[0] }} viewBox={vb.join(" ")}>
      <rect
        x={vb[0]}
        y={vb[1]}
        width={vb[2]}
        height={vb[3]}
        opacity={0}
        onMouseDown={() => dispatch({ name: "deselect" })}
        aria-labelledby="flowerTitle"
      />
      <title id="flowerTitle">Hex Flower</title>
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

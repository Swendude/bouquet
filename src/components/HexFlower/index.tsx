import { centeredViewBox, getHexDimensions } from "../../utils";
import FlowerOutline from "../HexEditor/FlowerOutline";

import HexLeaf from "../HexLeaf";
import { useHexflowerContext } from "../HexReducerContext";
import SelectedHex from "./SelectedHex";

import "./style.css";

const HexFlower = () => {
  const { dispatch, state } = useHexflowerContext();
  const grid = state.hexGrid;

  const size = state.size;

  const vb = centeredViewBox(getHexDimensions(size), 10, 4, 5);
  return (
    <>
      <svg className="flower-view" viewBox={vb.join(" ")}>
        <rect
          x={vb[0]}
          y={vb[1]}
          width={vb[2]}
          height={vb[3]}
          opacity={0}
          onClick={() => dispatch({ name: "deselect" })}
        />
        <g>
          <FlowerOutline />
        </g>
        <g>
          {grid.toArray().map((hex) => (
            <HexLeaf key={hex.toString()} hex={hex} />
          ))}
        </g>
        )
      </svg>
    </>
  );
};

export default HexFlower;

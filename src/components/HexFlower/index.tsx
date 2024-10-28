import { centeredViewBox, getHexDimensions } from "../../utils";

import HexLeaf from "../HexLeaf";
import { useHexflowerContext } from "../HexReducerContext";
import SelectedHex from "./SelectedHex";

import "./style.css";

const HexFlower = () => {
  const { dispatch, state } = useHexflowerContext();
  const grid = state.hexGrid;
  const selected = state.selected;

  const size = state.size;

  const vb = centeredViewBox(getHexDimensions(size), 2, 4, 5);
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
          {grid.toArray().map((hex) => (
            <HexLeaf key={hex.toString()} hex={hex} />
          ))}
        </g>
        {state.selected && (
          <g>
            <SelectedHex hex={state.selected} />
          </g>
        )}
      </svg>
    </>
  );
};

export default HexFlower;

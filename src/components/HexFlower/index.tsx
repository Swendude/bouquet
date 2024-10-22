import { centeredViewBox, getHexDimensions } from "../../utils";

import HexLeaf from "../HexLeaf";
import { useHexflowerContext } from "../HexReducerContext";
import SelectedHex from "./SelectedHex";

import "./style.css";

const HexFlower = () => {
  const { dispatch, state } = useHexflowerContext();
  // const dispatch = useAppDispatch();
  const hexFlower = state.hexFlower;
  const selected = state.selected;

  const size = state.size;

  const vb = centeredViewBox(getHexDimensions(size), 2, 4, 5);
  return (
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
        {[...hexFlower].map((el, i) => (
          <HexLeaf key={i} hex={el} />
        ))}
      </g>

      {selected && (
        <g>
          <SelectedHex hex={hexFlower[selected]} />
        </g>
      )}
      {/* <g transform={`translate(${size * 3} ${Math.sqrt(3) * size * 2.5})`}>
        <NavigationHex />
      </g> */}
    </svg>
  );
};

export default HexFlower;

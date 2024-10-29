import { centeredViewBox, getHexDimensions, hexPath } from "../../utils";

import HexLeaf from "../HexLeaf";
import { useHexflowerContext } from "../HexReducerContext";

import "./style.css";

const HexFlower = () => {
  const { dispatch, state } = useHexflowerContext();
  const grid = state.hexGrid;

  const size = state.size;

  const vb = centeredViewBox(getHexDimensions(size), 10, 4, 7);
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
        {/* <g> */}
        {/*   <path */}
        {/*     d={hexPath(state.hexGrid.getHex([2, 2]).corners)} */}
        {/*     stroke="#eee" */}
        {/*   /> */}
        {/* </g> */}
        <g>
          {grid
            .toArray()
            .filter((hex) => !hex.props.isNavigation)
            .map((hex) => (
              <HexLeaf key={hex.toString()} hex={hex} />
            ))}
        </g>
        )
      </svg>
    </>
  );
};

export default HexFlower;

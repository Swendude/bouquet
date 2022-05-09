import { Grid } from "honeycomb-grid";
import HexLeaf from "./HexLeaf";
import SelectedHex from "./SelectedHex";

import { deselect } from "../store/flowerSlice";
import { useAppDispatch } from "../store/hooks";

interface HexFlowerProps {
  hexFlower: Grid;
  selected?: number;
  size: number;
}

const HexFlower = (props: HexFlowerProps) => {
  const dispatch = useAppDispatch();

  const outerBounds = [
    -props.size * 4.5,
    -props.size * 4.5,
    props.size * 9,
    props.size * 9,
  ];
  return (
    <svg className="flower-view" viewBox={outerBounds.join(" ")}>
      <rect
        x={outerBounds[0]}
        y={outerBounds[1]}
        width={outerBounds[2]}
        height={outerBounds[3]}
        fill="#00000000"
        onClick={() => dispatch(deselect())}
      />
      <g>
        {[...props.hexFlower].map((el, i) => (
          <HexLeaf key={i} hex={el} />
        ))}
      </g>
      {props.selected != undefined && (
        <g>
          <SelectedHex hex={props.hexFlower[props.selected]} />
        </g>
      )}
    </svg>
  );
};

export default HexFlower;

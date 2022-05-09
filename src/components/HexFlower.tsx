import { Grid } from "honeycomb-grid";
import { useAppSelector } from "../store/hooks";
import HexLeaf from "./HexLeaf";
import SelectedHex from "./SelectedHex";
interface HexFlowerProps {
  hexFlower: Grid;
  selected?: number;
  size: number;
}

const HexFlower = (props: HexFlowerProps) => {
  return (
    <svg
      className="flower-view"
      viewBox={`-${props.size * 4.5} -${props.size * 4.5} ${props.size * 9} ${
        props.size * 9
      }`}
    >
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

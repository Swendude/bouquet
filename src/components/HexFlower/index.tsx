import { deselect } from "../../store/flowerSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { centeredViewBox, getHexDimensions } from "../../utils";

import HexLeaf from "../HexLeaf";
import SelectedHex from "./SelectedHex";

import "./style.css";

const HexFlower = () => {
  const dispatch = useAppDispatch();
  const hexFlower = useAppSelector((state) => state.flower.hexFlower);
  const selected = useAppSelector((state) => state.flower.selected);

  const size = useAppSelector((state) => state.flower.size);

  const vb = centeredViewBox(getHexDimensions(size), 2, 4, 5);
  return (
    <svg className="flower-view" viewBox={vb.join(" ")}>
      <rect
        x={vb[0]}
        y={vb[1]}
        width={vb[2]}
        height={vb[3]}
        opacity={0}
        onClick={() => dispatch(deselect())}
      />

      <g>
        {[...hexFlower].map((el, i) => (
          <HexLeaf key={i} hex={el} />
        ))}
      </g>

      {selected !== undefined && (
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

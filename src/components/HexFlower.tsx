import { deselect } from "../store/flowerSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import HexLeaf from "./HexLeaf";
import SelectedHex from "./SelectedHex";

const HexFlower = () => {
  const dispatch = useAppDispatch();
  const hexFlower = useAppSelector((state) => state.flower.hexFlower);
  const selected = useAppSelector((state) => state.flower.selected);
  const size = useAppSelector((state) => state.flower.size);

  const outerBounds = [-size * 4.5, -size * 4.5, size * 9, size * 9];
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
        {[...hexFlower].map((el, i) => (
          <HexLeaf key={i} hex={el} />
        ))}
      </g>
      {selected != undefined && (
        <g>
          <SelectedHex hex={hexFlower[selected]} />
        </g>
      )}
    </svg>
  );
};

export default HexFlower;

import { deselect } from "../../store/flowerSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getHexDimensions } from "../../utils";
import HexLeaf from "../HexLeaf";
import SelectedHex from "./SelectedHex";
import "./style.css";
const HexFlower = () => {
  const dispatch = useAppDispatch();
  const hexFlower = useAppSelector((state) => state.flower.hexFlower);
  const selected = useAppSelector((state) => state.flower.selected);

  const { height, width } = useAppSelector((state) =>
    getHexDimensions(state.flower.size)
  );

  const hexMargin = 2;
  const outerBounds = [
    -width * 2 - hexMargin,
    -height * 2.5 - hexMargin,
    width * 4 + hexMargin * 2,
    height * 5 + hexMargin * 2,
  ];
  return (
    <svg className="flower-view" viewBox={outerBounds.join(" ")}>
      <rect
        x={outerBounds[0]}
        y={outerBounds[1]}
        width={outerBounds[2]}
        height={outerBounds[3]}
        opacity={0}
        onClick={() => dispatch(deselect())}
      />
      {/* <SvgDebug /> */}
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

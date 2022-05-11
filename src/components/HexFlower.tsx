import { deselect } from "../store/flowerSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import HexLeaf from "./HexLeaf";
import SelectedHex from "./SelectedHex";
import SvgDebug from "./SvgDebug";
import NavigationHex from "./NavigationHex";

const HexFlower = () => {
  const dispatch = useAppDispatch();
  const hexFlower = useAppSelector((state) => state.flower.hexFlower);
  const selected = useAppSelector((state) => state.flower.selected);
  const [hexW, hexH] = useAppSelector((state) => [
    state.flower.size * 2,
    Math.sqrt(3) * state.flower.size,
  ]);

  const hexMargin = 5;
  const outerBounds = [
    -hexW * 2 - hexMargin,
    -hexH * 2.5 - hexMargin,
    hexW * 4 + hexMargin * 2,
    hexH * 5 + hexMargin * 2,
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

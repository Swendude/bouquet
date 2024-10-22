import { Hex, Point } from "honeycomb-grid";
import { centeredViewBox, getHexDimensions, hexPath } from "../../utils";
import "./style.css";
import { ReactElement } from "react";

const NavigationHex = () => {
  const hex: Hex<{}> = useAppSelector(
    (reduxState) => reduxState.flower.hexFlower[9],
  );

  const size = useAppSelector((reduxState) => reduxState.flower.size);

  const navigationHex = useAppSelector(
    (reduxState) => reduxState.flower.navigationHex,
  );

  const selectedDirection = useAppSelector(
    (reduxState) => reduxState.flower.selectedDirection,
  );

  const degreesToRad = (deg: number) => deg * (Math.PI / 180);
  const angleToCircumference = (angle: number, size: number): Point =>
    ({
      x: Math.cos(angle) * size,
      y: Math.sin(angle) * size,
    }) as Point;

  const hexSides = (size: number): Point[] =>
    [270, 330, 30, 90, 150, 210].map((angle) =>
      angleToCircumference(degreesToRad(angle), size),
    );

  const vb = centeredViewBox(getHexDimensions(size), 20, 3, 1);

  const textAnchorChoice = (i: number): string => {
    switch (i) {
      case 5:
        return "end";
      case 6:
        return "end";
      case 2:
        return "begin";
      case 3:
        return "begin";
      default:
        return "middle";
    }
  };

  const renderDirection = (
    direction: string,
    rolls: number[],
  ): ReactElement[] => {
    return [
      <tspan className="direction-label">{`${direction}:`}</tspan>,
      ...rolls.map((roll, i) => (
        <tspan className="direction-roll" key={i}>{`${roll}`}</tspan>
      )),
    ];
  };

  const dispatch = useAppDispatch();
  return (
    <svg
      className="navigation-hex"
      height={150}
      viewBox={[vb[0] - 150, vb[1], vb[2] + 300, vb[3]].join(" ")}
    >
      <path
        d={hexPath(hex.corners())}
        stroke={"#eee"}
        opacity="0.3"
        fill={"none"}
      />
      {[hex.toPoint(), ...hexSides(size * 0.8)].map((mp, i) => (
        <g
          onClick={() => dispatch(selectDirection(i))}
          transform={`translate(${mp.x} ${mp.y})`}
        >
          <text
            className={
              "direction-text " + (selectedDirection === i ? "active" : "")
            }
            textAnchor={textAnchorChoice(i)}
            alignmentBaseline="middle"
            fontSize={"0.9rem"}
            fill={"#eee"}
          >
            {renderDirection(...Object.entries(navigationHex)[i])}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default NavigationHex;

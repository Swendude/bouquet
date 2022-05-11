import { Hex, Point } from "honeycomb-grid";
import { useAppSelector } from "../../store/hooks";
import { hexPath } from "../../utils";
import "./style.css";
const NavigationHex = () => {
  const hex: Hex<{}> = useAppSelector(
    (reduxState) => reduxState.flower.hexFlower[9]
  );

  console.log(hex.toPoint());

  const size = useAppSelector((reduxState) => reduxState.flower.size);

  const middlePoint = (first: Point, second: Point): Point => {
    return first.add(second).divide(2);
  };

  const navigationHex = useAppSelector(
    (reduxState) => reduxState.flower.navigationHex
  );

  //   const hexSides = (corners: Point[]) => [
  //     middlePoint(corners[4], corners[5]),
  //     middlePoint(corners[5], corners[0]),
  //     middlePoint(corners[0], corners[1]),
  //     middlePoint(corners[1], corners[2]),
  //     middlePoint(corners[2], corners[3]),
  //     middlePoint(corners[3], corners[4]),
  //   ];

  const degreesToRad = (deg: number) => deg * (Math.PI / 180);
  const angleToCircumference = (angle: number, size: number): Point =>
    ({
      x: Math.cos(angle) * size,
      y: Math.sin(angle) * size,
    } as Point);

  const hexSides = (size: number): Point[] =>
    [270, 330, 30, 90, 150, 210].map((angle) =>
      angleToCircumference(degreesToRad(angle), size)
    );
  return (
    <svg
      className="navigation-hex"
      viewBox={`-${size * 1.2} -${size * 1.2} ${size * 2.4} ${size * 2.4}`}
    >
      <path
        d={hexPath(hex.corners())}
        stroke={"#222"}
        strokeWidth={2}
        fill={"none"}
        transform="scale(0.5)"
      />
      {[hex.toPoint(), ...hexSides(size * 0.7)].map((mp, i) => (
        <g transform={`translate(${mp.x} ${mp.y})`}>
          <text
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={"0.8rem"}
          >
            {Object.keys(navigationHex)[i]}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default NavigationHex;

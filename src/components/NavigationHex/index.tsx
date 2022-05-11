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

  const navigationHex = useAppSelector(
    (reduxState) => reduxState.flower.navigationHex
  );

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
    <g>
      <path
        d={hexPath(hex.corners())}
        stroke={"#222"}
        strokeWidth={2}
        fill={"none"}
        transform="scale(0.5)"
      />
      {[hex.toPoint(), ...hexSides(size * 0.8)].map((mp, i) => (
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
    </g>
  );
};

export default NavigationHex;

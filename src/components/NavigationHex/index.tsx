import { hexToPoint } from "honeycomb-grid";
import {
  centeredViewBox,
  generateTrianglePath,
  getHexDimensions,
  hexPath,
} from "../../utils";

import { useHexflowerContext } from "../HexReducerContext";

const NavigationHex = () => {
  const { dispatch, state } = useHexflowerContext();
  const grid = state.navigationGrid;

  const centerHex = grid.getHex([0, 0]);
  if (!centerHex) {
    throw new Error("Oops, something went wrong.");
  }

  const size = centerHex.dimensions.xRadius;

  const vb = centeredViewBox(getHexDimensions(size), 1, 3, 3);
  return (
    <svg
      aria-labelledby="nhTitle"
      style={{ width: vb[2] }}
      viewBox={vb.join(" ")}
      className="stroke-neutral-700 stroke-1 fill-none text-neutral-100 font-extrabold"
    >
      <title id="nhTitle">Navigation Hex</title>
      <rect
        x={vb[0]}
        y={vb[1]}
        width={vb[2]}
        height={vb[3]}
        opacity={0}
        onMouseDown={() => dispatch({ name: "deselect" })}
      />
      <g>
        {grid
          .toArray()
          .filter((hex) => !hex.equals([0, 0]))
          .map((hex, hi) => (
            <g key={hex.toString()}>
              <path
                className="stroke-neutral-700"
                d={hexPath(
                  hex.corners,
                  [0, 1, 2, 3, 4, 5].filter((i) => (hi + 3) % 6 !== i),
                )}
              />
            </g>
          ))}
      </g>
      {[...new Array(6)].map((_, i) => (
        <path
          // biome-ignore lint/suspicious/noArrayIndexKey: This won't change
          key={i}
          className="fill-neutral-700 stroke-none"
          transform={`rotate(${i * 60})`}
          d={generateTrianglePath({ height: size * 1.2, width: size * 1.2 })}
        />
      ))}
      <g>
        <path
          d={hexPath(centerHex.corners)}
          className="fill-neutral-700 stroke-neutral-900"
        />
      </g>
      {grid.toArray().map((hex) => (
        <g
          transform={`translate(${hexToPoint(hex).x} ${hexToPoint(hex).y})`}
          key={`${hex.toString()}_rolls`}
        >
          <foreignObject
            width={hex.width * (2 / 3)}
            height={hex.height * (2 / 3)}
            transform={`translate(-${hex.width * (1 / 3)} -${hex.height * (1 / 3)})`}
          >
            <div className="h-full w-full text-[0.65rem] flex items-center justify-center">
              {/* {hex.props.rolls.map((roll, ix) => ( */}
              {/* <span key={`${hex.toString()}_roll_${ix}`} className=""> */}
              {/* {roll} */}
              <p className="break-words">{hex.props.rolls.join(",")}</p>
              {/* ))} */}
            </div>
          </foreignObject>
        </g>
      ))}
      )
    </svg>
  );
};

export default NavigationHex;

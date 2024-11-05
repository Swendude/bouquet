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

  const vb = centeredViewBox(getHexDimensions(size), 5, 3, 3);
  return (
    <svg
      aria-labelledby="nhTitle"
      style={{ maxWidth: vb[2] - vb[0] }}
      viewBox={vb.join(" ")}
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
                className="stroke-neutral-300 fill-none"
                strokeDasharray="1,5"
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
          className="stroke-neutral-300 fill-neutral-300"
          transform={`rotate(${i * 60})`}
          d={generateTrianglePath({ height: size * 1.2, width: 1.6 * size })}
        />
      ))}
      <g>
        <path
          className="stroke-neutral-300 fill-neutral-900"
          d={hexPath(centerHex.corners)}
        />
      </g>
      <g>
        {grid.toArray().map((hex) => (
          <foreignObject
            key={`${hex.toString()}_rolls`}
            width={hex.width * (2 / 3)}
            height={hex.height * (2 / 3)}
            transform={`translate(${hex.origin.x} ${hex.origin.y})`}
          >
            {hex.props.rolls.map((roll) => (
              <p key={`${hex.toString()}_roll_${roll}`}>{roll}</p>
            ))}
          </foreignObject>
        ))}
      </g>
      )
    </svg>
  );
};

export default NavigationHex;

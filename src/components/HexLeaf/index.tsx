import chroma from "chroma-js";
import { Hex, hexToPoint } from "honeycomb-grid";
import { hexPath } from "../../utils";
import "./style.css";
import { FlowerHex, useHexflowerContext } from "../HexReducerContext";

interface HexLeafProps {
  hex: FlowerHex;
}

const HexLeaf = (props: HexLeafProps) => {
  const { dispatch, state } = useHexflowerContext();

  const colorScale: string[] = chroma
    .scale(state.colorScale)
    .mode("lab")
    .colors(7);

  // const myIndex = state.hexGrid.indexOf(props.hex);

  // const selected = state.selected
  // ? state.hexGrid[state.selected] === props.hex
  // : false;

  // const myProps = state.propMap[myIndex];
  const hCenter = hexToPoint(props.hex);
  const myColor = colorScale[1];
  return (
    <>
      <path
        d={hexPath(props.hex.corners)}
        stroke={"#eee"}
        strokeWidth={3}
        fill={myColor}
        // className={`hex-shape ${selected ? "selected" : ""}`}
        className={`hex-shape`}
      />
      <g
        // onClick={() =>
        // myIndex !== undefined && dispatch({ name: "select", payload: myIndex })
        //}
        transform={`translate(${hCenter.x},${hCenter.y})`}
      >
        <g
          className="text-group"
          transform={`translate(-${props.hex.height * 0.35} -${
            props.hex.height * 0.35
          } )`}
        >
          <foreignObject
            width={props.hex.height * 0.7}
            height={props.hex.height * 0.7}
            className="text-el"
          >
            <div className="label-box">
              <p
                className="leaf-label"
                style={{
                  color: chroma(myColor).luminance() >= 0.5 ? "#222" : "#fff",
                }}
              >
                {`${props.hex.q}, ${props.hex.r}`}
              </p>
            </div>
          </foreignObject>
        </g>
      </g>
    </>
  );
};

export default HexLeaf;

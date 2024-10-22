import chroma from "chroma-js";
import { Hex } from "honeycomb-grid";
import { hexPath } from "../../utils";
import "./style.css";
import { useHexflowerContext } from "../HexReducerContext";
interface HexLeafProps {
  hex: Hex<{}>;
}

const HexLeaf = (props: HexLeafProps) => {
  const { dispatch, state } = useHexflowerContext();

  const colorScale: [string] = chroma
    .scale(state.colorScale)
    .mode("lab")
    .colors(7);

  const myIndex = state.hexFlower.indexOf(props.hex);

  const selected = state.selected
    ? state.hexFlower[state.selected] === props.hex
    : false;

  const myProps = state.propMap[myIndex];

  const myColor = colorScale[myProps.colorChoice];
  return (
    <g
      onClick={() =>
        myIndex !== undefined && dispatch({ name: "select", payload: myIndex })
      }
      transform={`translate(${props.hex.toPoint().x},${props.hex.toPoint().y})`}
    >
      <path
        d={hexPath(props.hex.corners())}
        stroke={"#eee"}
        strokeWidth={3}
        fill={myProps ? myColor : "none"}
        className={`hex-shape ${selected ? "selected" : ""}`}
      />
      <g
        className="text-group"
        transform={`translate(-${props.hex.height() * 0.35} -${
          props.hex.height() * 0.35
        } )`}
      >
        <foreignObject
          width={props.hex.height() * 0.7}
          height={props.hex.height() * 0.7}
          className="text-el"
        >
          <div className="label-box">
            <p
              className="leaf-label"
              style={{
                color: chroma(myColor).luminance() >= 0.5 ? "#222" : "#fff",
              }}
            >
              {myProps.label}
            </p>
          </div>
        </foreignObject>
      </g>
    </g>
  );
};

export default HexLeaf;

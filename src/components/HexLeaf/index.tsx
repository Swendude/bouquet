import chroma from "chroma-js";
import { Hex } from "honeycomb-grid";
import { select } from "../../store/flowerSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { hexPath } from "../../utils";
import "./style.css";
interface HexLeafProps {
  hex: Hex<{}>;
}

const HexLeaf = (props: HexLeafProps) => {
  const dispatch = useAppDispatch();

  const colorScale: [string] = useAppSelector((state) =>
    chroma.scale(state.flower.colorScale).mode("lab").colors(7)
  );

  const myIndex = useAppSelector((state) =>
    state.flower.hexFlower.indexOf(props.hex)
  );

  const myProps = useAppSelector((state) => state.flower.propMap[myIndex]);

  const myColor = colorScale[myProps.colorChoice];
  return (
    <g
      onClick={() => myIndex !== undefined && dispatch(select(myIndex))}
      transform={`translate(${props.hex.toPoint().x},${props.hex.toPoint().y})`}
    >
      <path
        d={hexPath(props.hex.corners())}
        stroke={"#eee"}
        strokeWidth={3}
        fill={myProps ? myColor : "none"}
        className="hexShape"
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

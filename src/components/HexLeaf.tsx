import { Hex, Point } from "honeycomb-grid";
import chroma from "chroma-js";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { select } from "../store/flowerSlice";
import { useEffect, useState } from "react";
interface HexLeafProps {
  hex: Hex<{}>;
}

const HexLeaf = (props: HexLeafProps) => {
  const dispatch = useAppDispatch();

  const [getFontSize, setFontSize] = useState<number>(14);

  const hexPath = (corners: Point[]) => {
    const [first, ...others] = corners;
    let pathStr = `M${first.x}, ${first.y} `;
    others.forEach(({ x, y }, i) => {
      pathStr += `L${x}, ${y} `;
    });
    return pathStr + " Z";
  };

  const colorScale: [string] = useAppSelector((state) =>
    chroma.scale(state.flower.colorScale).mode("lab").colors(6)
  );

  const myIndex = useAppSelector((state) =>
    state.flower.hexFlower.indexOf(props.hex)
  );

  const myProps = useAppSelector((state) => state.flower.propMap[myIndex]);

  useEffect(() => {
    let longest = 1;
    if (myProps) {
      [...myProps.label.split(" ")].forEach((part) => {
        if (part.length > longest) {
          longest = part.length;
        }
      });
    }
    setFontSize(Math.min(18, props.hex.width() / longest));
  }, [myProps]);

  const myColor = colorScale[myProps.colorChoice];
  return (
    <g
      transform={`translate(${props.hex.toPoint().x},${props.hex.toPoint().y})`}
      onClick={() => myIndex !== undefined && dispatch(select(myIndex))}
    >
      <path
        d={hexPath(props.hex.corners())}
        stroke={"#eee"}
        strokeWidth={3}
        fill={myProps ? myColor : "none"}
      />
      {myProps.label.split(" ").map((part, i) => (
        <text
          key={i}
          textAnchor="middle"
          className="leaf-lable"
          alignmentBaseline="auto"
          fill={chroma(myColor).luminance() >= 0.5 ? "#222" : "#fff"}
          transform={`translate( 0 ${getFontSize * i})`}
          style={{
            fontSize: getFontSize,
          }}
        >
          {part}
        </text>
      ))}
    </g>
  );
};

export default HexLeaf;

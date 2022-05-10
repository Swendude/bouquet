import chroma from "chroma-js";
import { setColor, setLabel } from "../store/flowerSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const HexEditor = ({ selected }: { selected?: number }) => {
  const dispatch = useAppDispatch();

  const myProps = useAppSelector((state) =>
    selected !== undefined ? state.flower.propMap[selected] : undefined
  );

  const colorScale: [string] = useAppSelector((state) =>
    chroma.scale(state.flower.colorScale).mode("lab").colors(6)
  );
  return (
    <div className="hex-editor">
      <div className="editor-title">
        {selected === undefined ? (
          <p>Select a hex to edit!</p>
        ) : (
          <p>Editing Hex {selected}</p>
        )}
      </div>

      <div className="editor-content">
        <div className="editor-content-row">
          <label>Content: </label>
          <input
            type="text"
            value={myProps?.label}
            onChange={(e) => {
              dispatch(setLabel(e.target.value));
            }}
            id="hexcontent"
          />
        </div>
        <div className="editor-content-row">
          <div>
            <label>Color: </label>
          </div>
          <div>
            {colorScale.map((col, i) => (
              <button
                key={i}
                className={
                  "color-selector" +
                  (i === myProps?.colorChoice ? " active" : "")
                }
                style={{ backgroundColor: col }}
                onClick={() => dispatch(setColor(i))}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HexEditor;

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setColor, setLabel } from "../store/flowerSlice";
import chroma from "chroma-js";

const HexEditor = ({ selected }: { selected?: number }) => {
  const dispatch = useAppDispatch();

  const myProps = useAppSelector((state) =>
    state.flower.data && selected !== undefined
      ? state.flower.data.propMap[selected]
      : undefined
  );

  const colorScale: [string] = useAppSelector((state) =>
    state.flower.data
      ? chroma.scale(state.flower.data.colorScale).mode("lab").colors(6)
      : undefined
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
      {myProps !== undefined && colorScale !== undefined && (
        <div className="editor-content">
          <div className="editor-content-row">
            <label htmlFor="hexcontent">Content: </label>
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
              <label htmlFor="hexcontent">Color: </label>
            </div>
            <div>
              {colorScale.map((col, i) => (
                <button
                  key={i}
                  className={
                    "color-selector" +
                    (i === myProps.colorChoice ? " active" : "")
                  }
                  style={{ backgroundColor: col }}
                  onClick={() => dispatch(setColor(i))}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HexEditor;

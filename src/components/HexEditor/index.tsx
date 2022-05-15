import chroma from "chroma-js";
import { useState } from "react";
import { setColor, setLabel } from "../../store/flowerSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import NavigationHex from "../NavigationHex";
import "./style.css";
import DirectionEditor from "../DirectionEditor";

const HexEditor = () => {
  const dispatch = useAppDispatch();

  const [getLabelFocus, setLabelFocus] = useState(false);

  const selected = useAppSelector((state) => state.flower.selected);

  const myProps = useAppSelector((state) =>
    selected !== undefined ? state.flower.propMap[selected] : undefined
  );

  const colorScale: [string] = useAppSelector((state) =>
    chroma.scale(state.flower.colorScale).mode("lab").colors(7)
  );
  const maxInputL = 28;
  return (
    <div className="editor">
      {selected !== undefined ? (
        <>
          <div className="hex-editor-content-row">
            <label>Content</label>
            <input
              className={`label-input ${
                getLabelFocus && myProps && myProps.label.length >= maxInputL
                  ? "disabled"
                  : ""
              }`}
              type="text"
              maxLength={maxInputL}
              value={myProps?.label}
              onChange={(e) => {
                dispatch(setLabel(e.target.value));
              }}
              onFocus={() => setLabelFocus(true)}
              onBlur={() => setLabelFocus(false)}
              id="hexcontent"
            />
          </div>
          <div className="hex-editor-content-row">
            <div>
              <label>Color</label>
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
        </>
      ) : (
        <div className="play-content">
          <div className="nh">
            <NavigationHex />
          </div>
          <div className="hex-editor-content-row">
            <h3>Select a direction to edit it</h3>
          </div>
          <div className="hex-editor-content-row">
            <DirectionEditor />
          </div>
        </div>
      )}
    </div>
  );
};

export default HexEditor;

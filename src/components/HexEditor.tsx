import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setLabel } from "../store/flowerSlice";
const HexEditor = ({ selected }: { selected?: number }) => {
  const dispatch = useAppDispatch();

  const myProps = useAppSelector((state) =>
    state.flower.data && selected !== undefined
      ? state.flower.data.propMap[selected]
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
      {selected !== undefined && (
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
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HexEditor;

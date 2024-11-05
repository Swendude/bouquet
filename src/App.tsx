import Header from "./components/Header";
import HexFlower from "./components/HexFlower";
import {
  getSelected,
  useHexflowerContext,
} from "./components/HexReducerContext";
import NavigationHex from "./components/NavigationHex";

function App() {
  const { dispatch, state } = useHexflowerContext();

  const selected = getSelected(state);

  return (
    <div className="p-5 bg-neutral-900  text-neutral-200 flex flex-col max-w-4xl mx-auto items-center space-y-8 min-h-screen mt-2">
      <Header />
      {/* <div className="flex justify-between w-full border-neutral-200 "> */}
      <HexFlower />
      <div className="flex border-neutral-200 w-full">
        <div className="border p-5 w-1/2">
          <ul className="flex gap-2">
            <li>Play</li>
            <li>Analyze</li>
            <li>Settings</li>
          </ul>

          <p>Click on a hex to edit. </p>
          {selected && (
            <textarea
              className="bg-neutral-700 border max-h-28 m-2 p-2"
              rows={4}
              wrap="hard"
              value={selected.props.label}
              onChange={(e) =>
                selected &&
                dispatch({
                  name: "setLabel",
                  payload: {
                    newLabel: e.currentTarget.value,
                    hex: selected,
                  },
                })
              }
            />
          )}
        </div>
        <div className="border p-5 w-1/2">
          <NavigationHex />
        </div>{" "}
        {/* </div> */}
      </div>
    </div>
  );
}

export default App;

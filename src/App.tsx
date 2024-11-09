import type { ReactNode } from "react";
import Footer from "./components/Header";
import HexFlower from "./components/HexFlower";
import {
  getSelected,
  useHexflowerContext,
} from "./components/HexReducerContext";
import NavigationHex from "./components/NavigationHex";
import { ChartNoAxesCombined, Cog, Dices } from "lucide-react";
function App() {
  const { dispatch, state } = useHexflowerContext();

  const selected = getSelected(state);

  return (
    <div className="bg-neutral-900 p-4 md:p-4 text-neutral-100 w-svw max-w-4xl mx-auto min-h-screen grid grid-cols-6  gap-y-4 grid-rows-1 ">
      <div className="justify-center content-center col-span-6 md:col-span-4 place-items-center">
        <h2 className="text-4xl mb-4 ">{state.title}</h2>
        <HexFlower />
      </div>

      <div className="justify-center content-end col-span-4 col-start-2 md:col-start-auto md:col-span-2 place-items-center">
        <h2 className="text-xs mb-4 ">Navigation Hex (2D6)</h2>
        <NavigationHex />
      </div>

      <div className="min-h-64 col-span-4 w-full">
        <div className="rounded-md h-full p-4 ">
          <menu className="flex gap-4 pb-4 ">
            <ModeSelector>
              <Dices />
              Play
            </ModeSelector>
            <ModeSelector>
              <ChartNoAxesCombined />
              Analyze
            </ModeSelector>
            <ModeSelector active>
              <Cog />
              Settings
            </ModeSelector>
          </menu>
          <section className="">
            <div className="flex gap-2 border-b py-2">
              <p>Pick theme colors</p>
              <label htmlFor="startColor">Start:</label>
              <input
                id="startColor"
                type="color"
                value={state.colorScale[0]}
                onChange={(e) =>
                  dispatch({
                    name: "setColor",
                    payload: {
                      start: e.target.value,
                      end: state.colorScale[1],
                    },
                  })
                }
              />
              <label htmlFor="endColor">End:</label>
              <input
                onChange={(e) =>
                  dispatch({
                    name: "setColor",
                    payload: {
                      end: e.target.value,
                      start: state.colorScale[0],
                    },
                  })
                }
                id="endColor"
                type="color"
                value={state.colorScale[1]}
              />
            </div>

            <p>Click on a hex to edit. </p>
            {selected && (
              <textarea
                className="bg-neutral-500 border max-h-28 p-2"
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
          </section>
        </div>
      </div>
      <div className="col-span-4">
        <Footer />
      </div>
    </div>
  );
}

const ModeSelector = ({
  children,
  active = false,
}: {
  children: ReactNode;
  active?: boolean;
}) => (
  <button
    type="button"
    className={`flex gap-2 py-4 border:text-bold min-w-16 border p-2 rounded ${active && "text-black bg-neutral-100"}`}
  >
    {children}
  </button>
);

export default App;

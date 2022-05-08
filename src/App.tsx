import React, { useEffect, useState } from "react";
import "./App.css";
import { extendHex, defineGrid, Grid } from "honeycomb-grid";
import HexLeaf from "./components/HexLeaf";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setup } from "./store/flowerSlice";
import SelectedHex from "./components/SelectedHex";
import HexEditor from "./components/HexEditor";
function App() {
  const size = 54;

  const dispatch = useAppDispatch();

  const hexFlower = useAppSelector((state) =>
    state.flower.data ? state.flower.data.hexFlower : undefined
  );
  const propMap = useAppSelector((state) =>
    state.flower.data ? state.flower.data.propMap : undefined
  );

  const selected = useAppSelector((state) =>
    state.flower.data ? state.flower.data.selected : null
  );

  useEffect(() => {
    const HexFactory = extendHex({
      size: size,
      origin: [2 * size * 0.5, Math.sqrt(3) * size * 0.5],
      orientation: "flat",
    });
    const GridFactory = defineGrid(HexFactory);
    const finalGrid = GridFactory.hexagon({
      radius: 2,
    });
    const propMap = [...finalGrid].reduce(
      (prev, cur) => ({
        ...prev,
        [finalGrid.indexOf(cur)]: {
          colorChoice: Math.floor(Math.random() * 6),
          label: "Fill me",
        },
      }),
      {}
    );
    dispatch(setup([finalGrid, propMap]));
  }, [dispatch]);
  if (hexFlower && propMap) {
    return (
      <div className="App">
        <h1>Bouquet 💐</h1>
        <svg className="flower-view"
          
          viewBox={`-${size * 4.5} -${size * 4.5} ${size * 9} ${size * 9}`}
        >
          <g>
            {[...hexFlower].map((el, i) => (
              <HexLeaf key={i} hex={el} />
            ))}
          </g>
          {selected != null && (
            <g>
              <SelectedHex hex={hexFlower[selected]} />
            </g>
          )}
        </svg>
        && <HexEditor selected={selected}/>}
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>Bouquet 💐</h1>
        <p>Generating...</p>
      </div>
    );
  }
}

export default App;

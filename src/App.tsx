import React, { useEffect, useState } from "react";
import { extendHex, defineGrid, Grid } from "honeycomb-grid";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setup } from "./store/flowerSlice";
import HexFlower from "./components/HexFlower";
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
    state.flower.data ? state.flower.data.selected : undefined
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

  return (
    <div className="App">
      <h1>Bouquet 💐</h1>
      {hexFlower ? (
        <HexFlower hexFlower={hexFlower} selected={selected} size={54} />
      ) : (
        <p>🌸Loading...</p>
      )}

      <HexEditor selected={selected} />
    </div>
  );
}

export default App;

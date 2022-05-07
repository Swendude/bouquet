import React, { useEffect, useState } from "react";
import "./App.css";
import { extendHex, defineGrid, Grid } from "honeycomb-grid";
import HexLeaf from "./components/Hex";

function App() {
  const [getGrid, setGrid] = useState<Grid | undefined>();
  const [getPropMap, setPropMap] = useState({} as Record<number, any>);
  const size = 54;
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
    setGrid(finalGrid);
    setPropMap(
      [...finalGrid].reduce(
        (prev, cur) => ({ ...prev, [finalGrid.indexOf(cur)]: {} }),
        {} as { number: any }
      )
    );
  }, []);

  return (
    <div className="App">
      <h1>Bouquet 💐</h1>
      {getGrid && getPropMap ? (
        <svg
          width={size * 9}
          height={size * 9}
          viewBox={`-${size * 4.5} -${size * 4.5} ${size * 9} ${size * 9}`}
        >
          <g>
            {[...getGrid].map((el, i) => (
              <HexLeaf
                key={i}
                hex={el}
                prop={getPropMap[getGrid.indexOf(el)]}
              />
            ))}
          </g>
        </svg>
      ) : (
        <p>Generating...</p>
      )}
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import './App.css';
import { extendHex, defineGrid, Grid } from 'honeycomb-grid';


function App() {
  const [getGrid, setGrid] = useState<null | Grid>(null);
  useEffect(() => {
    const HexFactory = extendHex({
      size: 40,
      orientation: 'flat'
    })
    const GridFactory = defineGrid(HexFactory);
    setGrid(GridFactory.hexagon({radius:3}))
  })
  return (
    <div className="App">
      <h1>Bouquet.</h1>
      {getGrid ? <svg></svg> : <p>Generating...</p>}


    </div>
  );
}

export default App;

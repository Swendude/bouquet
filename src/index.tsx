import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  HexflowerContextProvider,
  initialHexflower,
} from "./components/HexReducerContext";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <HexflowerContextProvider initial={initialHexflower()}>
      <App />
    </HexflowerContextProvider>
  </React.StrictMode>,
);

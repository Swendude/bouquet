import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
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
    <HexflowerContextProvider initial={initialHexflower(50)}>
      <App />
    </HexflowerContextProvider>
    ,
  </React.StrictMode>,
);

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { random } from "chroma-js";
import { defineGrid, extendHex, Grid } from "honeycomb-grid";
import { createReducerContext } from "../../lib/reducerContext";

interface hexProps {
  colorChoice: number;
  label: string;
}

type HexDirection = "C" | "N" | "NE" | "SE" | "S" | "SW" | "NW";

interface HexflowerState {
  size: number;
  hexFlower: Grid;
  propMap: Record<number, hexProps>;
  colorScale: [string, string];
  navigationHex: Record<HexDirection, number[]>;
  diceRange: [number, number];
  // UX stuff
  selected: number | null;
  selectedDirection: number;
}

const defaultPropMap: Record<number, hexProps> = {
  "0": {
    colorChoice: 5,
    label: "warm",
  },
  "1": {
    colorChoice: 2,
    label: "heat",
  },
  "2": {
    colorChoice: 1,
    label: "scorch-ing heat",
  },
  "3": {
    colorChoice: 5,
    label: "dry air",
  },
  "4": {
    colorChoice: 5,
    label: "sunny",
  },
  "5": {
    colorChoice: 2,
    label: "dry heat",
  },
  "6": {
    colorChoice: 1,
    label: "heat wave",
  },
  "7": {
    colorChoice: 6,
    label: "storm",
  },
  "8": {
    colorChoice: 5,
    label: "cloudy & humid",
  },
  "9": {
    colorChoice: 3,
    label: "clear sky",
  },
  "10": {
    colorChoice: 2,
    label: "hot wind",
  },
  "11": {
    colorChoice: 0,
    label: "heat surge",
  },
  "12": {
    colorChoice: 4,
    label: "drizzle",
  },
  "13": {
    colorChoice: 4,
    label: "light over-cast",
  },
  "14": {
    colorChoice: 2,
    label: "windy",
  },
  "15": {
    colorChoice: 2,
    label: "land spouts",
  },
  "16": {
    colorChoice: 4,
    label: "warm rain",
  },
  "17": {
    colorChoice: 2,
    label: "over-cast",
  },
  "18": {
    colorChoice: 0,
    label: "tornado",
  },
};

export const initialHexflower = (size: number): HexflowerState => {
  const HexFactory = extendHex({
    size: size,
    origin: [2 * size * 0.5, Math.sqrt(3) * size * 0.5],
    orientation: "flat",
  });
  const GridFactory = defineGrid(HexFactory);
  const hexFlower = GridFactory.hexagon({
    radius: 2,
  });
  return {
    size: size,
    hexFlower,
    propMap: defaultPropMap,
    colorScale: [random(), random()],
    selected: null,
    navigationHex: { C: [], N: [], NE: [], SE: [], S: [], SW: [], NW: [] },
    diceRange: [1, 12],
    selectedDirection: 0,
  };
};

const initialState = initialHexflower(50);

type hexflowerAction =
  | { name: "select"; payload: number }
  | { name: "deselect" }
  | { name: "setLabel"; payload: string }
  | { name: "setColor"; payload: number }
  | { name: "selectDirection"; payload: number }
  | { name: "switchSelection"; payload: number };

const hexflowerReducer = (
  state: HexflowerState,
  action: hexflowerAction,
): HexflowerState => {
  switch (action.name) {
    case "select":
      const hexCount = state.hexFlower.length;
      if (0 <= action.payload && action.payload < hexCount) {
        return { ...state, selected: action.payload };
      }
      return state;
    case "deselect":
      return { ...state, selected: null };
    case "setLabel":
      //if (state.selected) {
      //  return {...state, propMap: state.propMap.map(hexProps => hexProps)}
      //}
      return state;
    case "setColor":
      return state;
    case "selectDirection":
      return state;
    case "switchSelection":
      return state;
  }
};

const hexflowerReducerContext = createReducerContext(hexflowerReducer);

export const HexflowerContextProvider = hexflowerReducerContext.provider;
export const useHexflowerContext = hexflowerReducerContext.useContext;
//     select: (state, action: PayloadAction<number>) => {
//       state.selected = action.payload;
//     },
//     deselect: (state) => {
//       state.selected = undefined;
//     },
//     setLabel: (state, action: PayloadAction<string>) => {
//       state.selected !== undefined &&
//         (state.propMap[state.selected].label = action.payload);
//     },
//     setColor: (state, action: PayloadAction<number>) => {
//       state.selected !== undefined &&
//         (state.propMap[state.selected].colorChoice = action.payload);
//     },
//     selectDirection: (state, action: PayloadAction<number>) => {
//       state.selectedDirection = action.payload;
//     },
//     switchOption: (state, action: PayloadAction<number>) => {
//       const choice = Object.keys(state.navigationHex)[state.selectedDirection];
//       if (
//         state.navigationHex[choice as HexDirection].includes(action.payload)
//       ) {
//         state.navigationHex[choice as HexDirection] = state.navigationHex[
//           choice as HexDirection
//         ].filter((num) => num !== action.payload);
//       } else {
//         state.navigationHex[choice as HexDirection].push(action.payload);
//       }
//     },
//   },
// });
//

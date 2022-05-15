import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { random } from "chroma-js";
import { defineGrid, extendHex, Grid } from "honeycomb-grid";

interface hexProps {
  colorChoice: number;
  label: string;
}

type HexDirection = "C" | "N" | "NE" | "SE" | "S" | "SW" | "NW";

interface flowerSliceState {
  size: number;
  hexFlower: Grid;
  propMap: Record<number, hexProps>;
  colorScale: [string, string];
  navigationHex: Record<HexDirection, number[]>;
  navigationOptions: number[];
  // UX stuff
  selected: number | undefined;
  selectedDirection: number;
}

const defaultPropMap: Record<number, hexProps> = {
  "0": {
    colorChoice: 5,
    label: "warm",
  },
  "1": {
    colorChoice: 2,
    label: " heat",
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
    label: "Heat wave",
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
    label: "Clear sky",
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
    label: "Light over-cast",
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

const defaultFlower = (size: number): flowerSliceState => {
  const HexFactory = extendHex({
    size: size,
    origin: [2 * size * 0.5, Math.sqrt(3) * size * 0.5],
    orientation: "flat",
  });
  const GridFactory = defineGrid(HexFactory);
  const hexFlower = GridFactory.hexagon({
    radius: 2,
  });
  // const propMap = [...hexFlower].reduce(
  //   (prev, cur) => ({
  //     ...prev,
  //     [hexFlower.indexOf(cur)]: {
  //       colorChoice: Math.floor(Math.random() * 7),
  //       label: `${cur.coordinates().x}, ${cur.coordinates().y}`,
  //     },
  //   }),
  //   {}
  // );
  return {
    size: size,
    hexFlower,
    propMap: defaultPropMap,
    colorScale: [random(), random()],
    selected: undefined,
    navigationHex: { C: [], N: [], NE: [], SE: [], S: [], SW: [], NW: [] },
    navigationOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    selectedDirection: 0,
  };
};

const initialState = defaultFlower(54);

export const flowerSlice = createSlice({
  name: "flower",
  initialState: initialState as flowerSliceState,
  reducers: {
    select: (state, action: PayloadAction<number>) => {
      state.selected = action.payload;
    },
    deselect: (state) => {
      state.selected = undefined;
    },
    setLabel: (state, action: PayloadAction<string>) => {
      state.selected !== undefined &&
        (state.propMap[state.selected].label = action.payload);
    },
    setColor: (state, action: PayloadAction<number>) => {
      state.selected !== undefined &&
        (state.propMap[state.selected].colorChoice = action.payload);
    },
    selectDirection: (state, action: PayloadAction<number>) => {
      state.selectedDirection = action.payload;
    },
    switchOption: (state, action: PayloadAction<number>) => {
      const choice = Object.keys(state.navigationHex)[state.selectedDirection];
      if (
        state.navigationHex[choice as HexDirection].includes(action.payload)
      ) {
        state.navigationHex[choice as HexDirection] = state.navigationHex[
          choice as HexDirection
        ].filter((num) => num !== action.payload);
      } else {
        state.navigationHex[choice as HexDirection].push(action.payload);
      }
    },
  },
});

export const {
  switchOption,
  selectDirection,
  select,
  setLabel,
  setColor,
  deselect,
} = flowerSlice.actions;
export default flowerSlice.reducer;

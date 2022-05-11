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
  selected: number | undefined;
  navigationHex: Record<HexDirection, number[]>;
}

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
  const propMap = [...hexFlower].reduce(
    (prev, cur) => ({
      ...prev,
      [hexFlower.indexOf(cur)]: {
        colorChoice: Math.floor(Math.random() * 6),
        label: `${cur.coordinates().x}, ${cur.coordinates().y}`,
      },
    }),
    {}
  );
  return {
    size: size,
    hexFlower,
    propMap,
    colorScale: [random(), random()],
    selected: undefined,
    navigationHex: { C: [], N: [], NE: [], SE: [], S: [], SW: [], NW: [] },
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
  },
});

export const { select, setLabel, setColor, deselect } = flowerSlice.actions;
export default flowerSlice.reducer;

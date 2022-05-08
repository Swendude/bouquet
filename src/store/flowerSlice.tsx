import {
  ActionCreatorWithPayload,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { random } from "chroma-js";
import { Grid } from "honeycomb-grid";

interface hexProps {
  colorChoice: number;
  label: string;
}

interface flowerSliceState {
  hexFlower: Grid;
  propMap: Record<number, hexProps>;
  colorScale: [string, string];
  selected: number;
}

interface AppState {
  data: flowerSliceState | null;
}

const initialState: AppState = { data: null };

export const flowerSlice = createSlice({
  name: "flower",
  initialState,
  reducers: {
    setup: (state, action: PayloadAction<[Grid, Record<number, hexProps>]>) => {
      state.data = {
        hexFlower: action.payload[0],
        propMap: action.payload[1],
        colorScale: [random(), random()],
        selected: 0,
      };
    },
    select: (state, action: PayloadAction<number>) => {
      if (state.data) state.data.selected = action.payload;
    },
    setLabel: (state, action: PayloadAction<string>) => {
      if (state.data)
        state.data.propMap[state.data.selected].label = action.payload;
    },
    setColor: (state, action: PayloadAction<number>) => {
      if (state.data)
        state.data.propMap[state.data.selected].colorChoice = action.payload;
    },
  },
});

export const { setup, select, setLabel, setColor } = flowerSlice.actions;
export default flowerSlice.reducer;

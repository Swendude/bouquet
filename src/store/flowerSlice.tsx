import {
  ActionCreatorWithPayload,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { random } from "chroma-js";
import { Grid } from "honeycomb-grid";

interface hexProps {
  colorChoice: number;
}

interface flowerSliceState {
  hexFlower: Grid;
  propMap: Record<number, hexProps>;
  colorScale: [string, string];
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
      };
    },
  },
});

export const { setup } = flowerSlice.actions;
export default flowerSlice.reducer;

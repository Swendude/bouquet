import { random } from "chroma-js";
import {
  createHexDimensions,
  Grid,
  Hex,
  HexCoordinates,
  Orientation,
} from "honeycomb-grid";
import { createReducerContext } from "../../lib/reducerContext";
import { defaultFlower } from "./defaultFlower";
import HexFlower from "../HexFlower";
import { getHexDimensions } from "../../utils";

export interface flowerHexProps {
  colorChoice: number;
  label: string;
}

export class FlowerHex extends Hex {
  props!: flowerHexProps;

  get dimensions() {
    return createHexDimensions(50);
  }

  get orientation() {
    return Orientation.FLAT;
  }
  static create(coordinates: HexCoordinates, props: flowerHexProps) {
    const hex = new FlowerHex(coordinates);
    hex.props = props;
    return hex;
  }
}

type HexDirection = "C" | "N" | "NE" | "SE" | "S" | "SW" | "NW";

interface HexflowerState {
  size: number;
  hexGrid: Grid<FlowerHex>;
  colorScale: [string, string];
  navigationHex: Required<Record<HexDirection, number[]>>;
  diceRange: [number, number];
  selected: FlowerHex | null;
  selectedDirection: number;
}

export const parseStrCoord = (strCoord: string): [number, number] => {
  const parsed = strCoord.split(",").map(Number);
  return [parsed[0], parsed[1]];
};

export const initialHexflower = (size: number): HexflowerState => {
  const hexes = Object.entries(defaultFlower).map(([strCoords, props]) =>
    FlowerHex.create(parseStrCoord(strCoords), props),
  );

  return {
    size: size,
    hexGrid: new Grid(FlowerHex, hexes),
    colorScale: [random(), random()],
    selected: null,
    navigationHex: { C: [], N: [], NE: [], SE: [], S: [], SW: [], NW: [] },
    diceRange: [1, 12],
    selectedDirection: 0,
  };
};

type hexflowerAction =
  | { name: "select"; payload: FlowerHex }
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
      return { ...state, selected: action.payload };
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

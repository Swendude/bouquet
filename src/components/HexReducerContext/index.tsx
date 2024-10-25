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

export interface flowerHexProps {
  colorChoice: number;
  label: string;
}

export class FlowerHex extends Hex {
  props!: flowerHexProps;
  static size: number;

  get dimensions() {
    return createHexDimensions(FlowerHex.size);
  }
  get orientation() {
    return Orientation.FLAT;
  }
  static create(
    coordinates: HexCoordinates,
    props: flowerHexProps,
    size: number,
  ) {
    const hex = new FlowerHex(coordinates);
    hex.props = props;
    FlowerHex.setSize(size);
    return hex;
  }

  static setSize(newSize: number) {
    FlowerHex.size = newSize;
    return this;
  }
}

type HexDirection = "C" | "N" | "NE" | "SE" | "S" | "SW" | "NW";

interface HexflowerState {
  size: number;
  hexGrid: Grid<FlowerHex>;
  colorScale: [string, string];
  navigationHex: Required<Record<HexDirection, number[]>>;
  diceRange: [number, number];
  selected: number | null;
  selectedDirection: number;
}

export const parseStrCoord = (strCoord: string): [number, number] => {
  const parsed = strCoord.split(",").map(Number);
  return [parsed[0], parsed[1]];
};

export const initialHexflower = (size: number): HexflowerState => {
  const hexes = Object.entries(defaultFlower).map(([strCoords, props]) =>
    FlowerHex.create(parseStrCoord(strCoords), props, size),
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
  | { name: "select"; payload: number }
  | { name: "deselect" }
  | { name: "setLabel"; payload: string }
  | { name: "setColor"; payload: number }
  | { name: "selectDirection"; payload: number }
  | { name: "switchSelection"; payload: number }
  | { name: "changeSize"; payload: number };

const hexflowerReducer = (
  state: HexflowerState,
  action: hexflowerAction,
): HexflowerState => {
  switch (action.name) {
    case "select":
      const hexCount = state.hexGrid.size;
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
    case "changeSize":
      return {
        ...state,
        hexGrid: state.hexGrid.map((hex) =>
          hex.setSize(hex.size + action.payload),
        ),
      };
  }
};

const hexflowerReducerContext = createReducerContext(hexflowerReducer);

export const HexflowerContextProvider = hexflowerReducerContext.provider;
export const useHexflowerContext = hexflowerReducerContext.useContext;

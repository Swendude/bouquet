import { random } from "chroma-js";
import {
  createHexDimensions,
  fromCoordinates,
  Grid,
  Hex,
  HexCoordinates,
  Orientation,
  spiral,
  TupleCoordinates,
} from "honeycomb-grid";
import { createReducerContext } from "../../lib/reducerContext";
import { defaultFlower } from "./defaultFlower";

export interface flowerHexProps {
  colorChoice: number;
  label: string;
}

export class FlowerHex extends Hex {
  props!: flowerHexProps;
  size!: number;

  get dimensions() {
    return createHexDimensions(this.size);
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
    hex.size = size;
    return hex;
  }
}

type NavigationHexProps = {
  rolls: number[];
};

export class NavigationHex extends Hex {
  props!: NavigationHexProps;
  size!: number;

  get dimensions() {
    return createHexDimensions(this.size);
  }

  get orientation() {
    return Orientation.FLAT;
  }

  static create(
    coordinates: HexCoordinates,
    props: NavigationHexProps,
    size: number,
  ) {
    const hex = new NavigationHex(coordinates);
    hex.props = props;
    hex.size = size;
    return hex;
  }
}

type HexDirection = "C" | "N" | "NE" | "SE" | "S" | "SW" | "NW";

interface HexflowerState {
  size: number;
  flowerGrid: Grid<FlowerHex>;
  navigationGrid: Grid<NavigationHex>;
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
    FlowerHex.create(parseStrCoord(strCoords), props, size),
  );
  const navigationHexes = [
    [0, 0],
    [0, -1],
    [1, -1],
    [1, 0],
    [0, 1],
    [-1, 1],
    [-1, 0],
  ].map((strCoords) =>
    NavigationHex.create(
      strCoords as [number, number],
      { rolls: [2, 1, 3] },
      30,
    ),
  );

  return {
    size: size,
    flowerGrid: new Grid(FlowerHex, hexes),
    navigationGrid: new Grid(NavigationHex, navigationHexes),
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

import { random } from "chroma-js";
import {
  createHexDimensions,
  Grid,
  Hex,
  HexCoordinates,
  Orientation,
  spiral,
} from "honeycomb-grid";
import { createReducerContext } from "../../lib/reducerContext";

interface flowerHexProps {
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
  // UX stuff
  selected: number | null;
  selectedDirection: number;
}

const defaultFlower: { [key: string]: flowerHexProps } = {
  "-2,0": {
    colorChoice: 5,
    label: "warm",
  },
  "-2,1": {
    colorChoice: 2,
    label: "heat",
  },
  "-2,2": {
    colorChoice: 1,
    label: "scorch-ing heat",
  },
  "-1,-1": {
    colorChoice: 5,
    label: "dry air",
  },
  "-1,0": {
    colorChoice: 5,
    label: "sunny",
  },
  "-1,1": {
    colorChoice: 2,
    label: "dry heat",
  },
  "-1,2": {
    colorChoice: 1,
    label: "heat wave",
  },
  "0, -2": {
    colorChoice: 6,
    label: "storm",
  },
  "0,-1": {
    colorChoice: 5,
    label: "cloudy & humid",
  },
  "0,0": {
    colorChoice: 3,
    label: "clear sky",
  },
  "0,1": {
    colorChoice: 2,
    label: "hot wind",
  },
  "0,2": {
    colorChoice: 0,
    label: "heat surge",
  },
  "1,-2": {
    colorChoice: 4,
    label: "drizzle",
  },
  "1,-1": {
    colorChoice: 4,
    label: "light over-cast",
  },
  "1,0": {
    colorChoice: 2,
    label: "windy",
  },
  "1,1": {
    colorChoice: 2,
    label: "land spouts",
  },
  "2,-2": {
    colorChoice: 4,
    label: "warm rain",
  },
  "2,-1": {
    colorChoice: 2,
    label: "over-cast",
  },
  "2,0": {
    colorChoice: 0,
    label: "tornado",
  },
};

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
  }
};

const hexflowerReducerContext = createReducerContext(hexflowerReducer);

export const HexflowerContextProvider = hexflowerReducerContext.provider;
export const useHexflowerContext = hexflowerReducerContext.useContext;

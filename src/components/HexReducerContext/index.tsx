import { random } from "chroma-js";
import {
  createHexDimensions,
  Grid,
  Hex,
  type HexCoordinates,
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
  flowerGrid: Grid<FlowerHex>;
  navigationGrid: Grid<NavigationHex>;
  colorScale: [string, string];
  navigationHex: Required<Record<HexDirection, number[]>>;
  diceRange: [number, number];
  selected: HexCoordinates | undefined;
  selectedDirection: number;
}

export const parseStrCoord = (strCoord: string): [number, number] => {
  const parsed = strCoord.split(",").map(Number);
  return [parsed[0], parsed[1]];
};

export const initialHexflower = (): HexflowerState => {
  const hexes = Object.entries(defaultFlower).map(([strCoords, props]) =>
    FlowerHex.create(parseStrCoord(strCoords), props, 40),
  );
  const navigationHexes = [
    [[0, 0], [12]],
    [
      [0, -1],
      [1, 2],
    ],
    [
      [1, -1],
      [3, 4],
    ],
    [
      [1, 0],
      [5, 6],
    ],
    [
      [0, 1],
      [7, 8],
    ],
    [
      [-1, 1],
      [9, 10],
    ],
    [[-1, 0], [11]],
  ].map(([strCoords, rolls]) =>
    NavigationHex.create(strCoords as [number, number], { rolls }, 20),
  );

  return {
    flowerGrid: new Grid(FlowerHex, hexes),
    navigationGrid: new Grid(NavigationHex, navigationHexes),
    colorScale: [random(), random()],
    selected: undefined,
    navigationHex: { C: [], N: [], NE: [], SE: [], S: [], SW: [], NW: [] },
    diceRange: [1, 12],
    selectedDirection: 0,
  };
};

type hexflowerAction =
  | { name: "select"; payload: FlowerHex }
  | { name: "deselect" }
  | { name: "setLabel"; payload: { hex: FlowerHex; newLabel: string } }
  | { name: "setColor"; payload: { start: string; end: string } }
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
      return { ...state, selected: undefined };
    case "setLabel": {
      const modifiedFlowerGrid = state.flowerGrid.map((hex) =>
        hex.equals(action.payload.hex)
          ? FlowerHex.create(
              hex,
              {
                ...hex.props,
                label: action.payload.newLabel,
              },
              hex.size,
            )
          : hex,
      );

      return { ...state, flowerGrid: modifiedFlowerGrid };
    }
    //if (state.selected) }}{
    //  return {...state, propMap: state.propMap.map(hexProps => hexProps)}
    //}
    //
    // if (state.selected) {
    // return {...state, flowerGrid: state.flowerGrid.map(hex => hex.equals(state.selected) ? {...hex, props: {...hex.props, label: action.payload}} : hex} ;
    // }
    // return state;
    case "setColor":
      return {
        ...state,
        colorScale: [action.payload.start, action.payload.end],
      };
    case "selectDirection":
      return state;
    case "switchSelection":
      return state;
  }
};

const hexflowerReducerContext = createReducerContext(hexflowerReducer);

export const getSelected = (state: HexflowerState): FlowerHex | undefined => {
  return state.selected ? state.flowerGrid.getHex(state.selected) : undefined;
};

export const HexflowerContextProvider = hexflowerReducerContext.provider;
export const useHexflowerContext = hexflowerReducerContext.useContext;

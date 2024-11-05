import { flowerHexProps } from ".";

export const defaultFlower: { [key: string]: flowerHexProps } = {
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
    label: "scorch\nheat",
  },
  "-1,-1": {
    colorChoice: 5,
    label: "dry\nair",
  },
  "-1,0": {
    colorChoice: 5,
    label: "sunny",
  },
  "-1,1": {
    colorChoice: 2,
    label: "dry\nheat",
  },
  "-1,2": {
    colorChoice: 1,
    label: "heat\nwave",
  },
  "0, -2": {
    colorChoice: 6,
    label: "storm",
  },
  "0,-1": {
    colorChoice: 5,
    label: "cloudy\n&\nhumid",
  },
  "0,0": {
    colorChoice: 3,
    label: "clear\nsky",
  },
  "0,1": {
    colorChoice: 2,
    label: "hot\nwind",
  },
  "0,2": {
    colorChoice: 0,
    label: "heat\nsurge",
  },
  "1,-2": {
    colorChoice: 4,
    label: "drizzle",
  },
  "1,-1": {
    colorChoice: 4,
    label: "light\nover-\ncast",
  },
  "1,0": {
    colorChoice: 2,
    label: "windy",
  },
  "1,1": {
    colorChoice: 2,
    label: "land\nspouts",
  },
  "2,-2": {
    colorChoice: 4,
    label: "warm\nrain",
  },
  "2,-1": {
    colorChoice: 2,
    label: "over-\ncast",
  },
  "2,0": {
    colorChoice: 0,
    label: "tornado",
  },
};

import { atom } from "recoil";

// store before call ticker number
export const tickerCallBeforeState = atom<number>({
  key: "tickerCallBefore",
  default: 15,
});
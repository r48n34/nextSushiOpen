import { atom } from "recoil";

// store current users ticket
export const tickerNumberState = atom<number>({
  key: "tickerNumber",
  default: -1,
});
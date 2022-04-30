import { atom } from "recoil";

export const tickerCallBeforeState = atom({
  key: "tickerCallBefore",
  default: 15,
});
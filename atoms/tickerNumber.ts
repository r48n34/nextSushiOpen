import { atom } from "recoil";

export const tickerNumberState = atom({
  key: "tickerNumber",
  default: -1,
});
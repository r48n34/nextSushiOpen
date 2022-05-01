import { atom } from "recoil";
import { RecivedRootData } from "../interface/sushiInterface";

// store fetched data from api
export const allStoreInfoState = atom<RecivedRootData | null>({
  key: "allStoreInfo",
  default: ({} as RecivedRootData),
});
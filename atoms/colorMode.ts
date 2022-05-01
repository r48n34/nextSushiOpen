import { atom } from "recoil";

export function getRecordMode(){

    if(typeof window === "undefined"){
        return true;
    }

    let color = localStorage.getItem("userColorPreferences");

    if(!color || color === null){
        localStorage.setItem("userColorPreferences", "true");
    }

    return color === "true"
}

// true = light, false = dark
export const colorModeState = atom({
  key: "colorMode",
  default: getRecordMode(),
});
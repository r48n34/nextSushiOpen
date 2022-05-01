import Switch from '@mui/material/Switch';
import LightModeIcon from '@mui/icons-material/LightMode';

import { useEffect, useState } from 'react';

function ColorThemeBtn(){
    const [ colorMode, setColorMode ] = useState<boolean>(true);
    const [ initLoading, setInitLoading ] = useState<boolean>(true);

    useEffect(() =>{
        if(colorMode === null || typeof window === "undefined"){
            return;
        }

        if(initLoading){
            setInitLoading(false);

            let data = localStorage.getItem("userColorPreferences");
            if(!data || data === null){
                localStorage.setItem("userColorPreferences", "true");
            }
            setColorMode(data === "true")

            return;
        }

        toggleFunc();
        localStorage.setItem("userColorPreferences", colorMode+"")
    },[colorMode])
   
    function toggleFunc(){

        const bodyElt = document.querySelector("body");
        if(bodyElt){
          bodyElt.style.backgroundColor = colorMode ? "white" : "#151515";
          bodyElt.style.color = colorMode ? "black" : "white";
        }

    }
    
    return(
        <>
        <LightModeIcon/>
        <Switch
            checked={colorMode}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setColorMode(event.target.checked)}
        />
        </>
    )
}

export default ColorThemeBtn
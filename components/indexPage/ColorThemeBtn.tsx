import IconButton from '@mui/material/IconButton';
import { useRecoilState, useRecoilValue } from 'recoil';
import { colorModeState } from '../../atoms/colorMode';
import Brightness3Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useEffect } from 'react';

function ColorThemeBtn(){
    const [ colorMode, setColorMode ] = useRecoilState<boolean>(colorModeState);
   

    useEffect(() => {
    
        const bodyElt = document.querySelector("body");
        if(bodyElt){
          bodyElt.style.backgroundColor = colorMode ? "white" : "#151515";
          bodyElt.style.color = colorMode ? "black" : "white";
          localStorage.setItem("userColorPreferences", colorMode + "");
        }
        
    },[colorMode])
    
    return(
    <IconButton onClick={() => setColorMode(!colorMode) }>
        {colorMode ? <Brightness7Icon/> : <Brightness3Icon sx={{ color:"white" }}/>}
    </IconButton>
    )
}

export default ColorThemeBtn
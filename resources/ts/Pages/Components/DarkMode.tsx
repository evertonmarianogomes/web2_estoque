import React, { useEffect, useRef } from "react";
import { initTheme, setTheme } from "./DarkSwitch";


const DarkMode = () => {
    const darkSwitchRef = useRef<any>();

    useEffect(function () {
        const htmlDarkSwitch = darkSwitchRef.current as HTMLInputElement;
        initTheme(htmlDarkSwitch);
    }, []);


    return (
        <>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="darkModeSwitch" ref={darkSwitchRef} onChange={() => setTheme(darkSwitchRef.current)} />
                <label className="form-check-label" htmlFor="darkModeSwitch">Modo Escuro</label>
            </div>
        </>
    );
}


export default DarkMode;
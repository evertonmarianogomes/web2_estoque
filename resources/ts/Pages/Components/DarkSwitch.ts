import React from "react";

const initTheme = (darkSwitch: HTMLInputElement) => {
    let theme = localStorage.getItem('darkSwitch') === 'dark';
    let htmlEl = document.querySelector('html') as HTMLElement;

    if (theme) {
        htmlEl?.setAttribute('data-bs-theme', 'dark');
        darkSwitch.checked = true;
    } else {
        htmlEl.removeAttribute('data-bs-theme');
        darkSwitch.checked = false;
    }
}


const setTheme = (darkSwitch: HTMLInputElement) => {
    let htmlEl = document.querySelector('html') as HTMLElement;

    if (darkSwitch.checked) {
        htmlEl?.setAttribute('data-bs-theme', 'dark');
        localStorage.setItem('darkSwitch', 'dark')
    } else {
        htmlEl.removeAttribute('data-bs-theme');
        localStorage.removeItem('darkSwitch');
    }
}



export { initTheme, setTheme };
import 'bootstrap';
import $ from 'jquery';

const toggleMode = () => {
    let theme: boolean = window.localStorage.getItem('darkSwitch') === 'dark';
    let darkSwitch: HTMLInputElement = document.querySelector('#darkModeSwitch');

    darkSwitch.addEventListener('change', (e: Event) => {
        let checked: boolean = (<HTMLInputElement>e.target).checked;

        checked ? (() => {
            document.querySelector('html').setAttribute('data-bs-theme', 'dark')
            window.localStorage.setItem('darkSwitch', 'dark');
        })() : (() => {
            document.querySelector('html').removeAttribute('data-bs-theme');
            window.localStorage.removeItem('darkSwitch');
        })();

    })
}

const initTheme = () => {
    let theme: boolean = window.localStorage.getItem('darkSwitch') === 'dark';
    let darkSwitch: HTMLInputElement = document.querySelector('#darkModeSwitch');
    darkSwitch.checked = theme;

    (theme) ?
        document.querySelector('html').setAttribute('data-bs-theme', 'dark') :
        document.querySelector('html').removeAttribute('data-bs-theme');
}

window.addEventListener('load', () => {
    initTheme();
    toggleMode();
    setTimeout(() => {
        $('#loader_container').fadeOut();
    }, 1000);
});
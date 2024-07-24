import $ from 'jquery';
import { route } from 'ziggy-js';
import { router } from '@inertiajs/react';
import axios from 'axios';

// Definir o lodash como global
declare global {
    interface Window {
        $: typeof $,
        route: typeof route;
        router: typeof router;
        axios: typeof axios
    }
}

window.$ = $;
window.route = route;
window.router = router;


axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// Adiciona o token CSRF a todas as requisições, se necessário
let token: any = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

window.axios = axios;

console.log('bootstrap.ts loaded');
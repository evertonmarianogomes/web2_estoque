import $ from 'jquery';
import { route } from 'ziggy-js';
import { router } from '@inertiajs/react';

// Definir o lodash como global
declare global {
    interface Window {
        $: typeof $,
        route: typeof route;
        router: typeof router;
    }
}

window.$ = $;
window.route = route;
window.router = router;

console.log('bootstrap.ts loaded');
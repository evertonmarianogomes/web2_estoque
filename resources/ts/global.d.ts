// Declarar os módulos globais
import $ from 'jquery';
import { route } from 'ziggy-js';
import { router } from '@inertiajs/react';

declare global {
    interface Window {
        $: typeof $;
        route: typeof route;
        router: typeof router;
    }

}

export { };

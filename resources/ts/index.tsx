import { createInertiaApp } from '@inertiajs/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './Pages/Layout';
import "bootstrap";

import '../scss/__toast.scss';
import '../scss/__loader.scss';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";


createInertiaApp({
  title: title => `${title}`,
  resolve: name => {
    const pages = (import.meta as any).glob('./Pages/**/*.tsx', { eager: true })
    let page = pages[`./Pages/${name}.tsx`]
    page.default.layout = page.default.layout || (page => <Layout children={page} />)
    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})

import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import "bootstrap";
import '../scss/__toast.scss';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';
import MDLayout from './Pages/MDLayout';


createInertiaApp({
  title: title => `${title}`,
  resolve: name => {
    const pages = (import.meta as any).glob('./Pages/**/*.tsx', { eager: true })
    let page = pages[`./Pages/${name}.tsx`]
    page.default.layout = page.default.layout || (page => <MDLayout children={page} />)
    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})

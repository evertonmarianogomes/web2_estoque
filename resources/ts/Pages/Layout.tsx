import React, { useEffect } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import $ from 'jquery';

const Layout = ({ children }) => {
    const { app } = usePage().props as any;
    const { title } = usePage().props as any;

    useEffect(() => {
        setTimeout(() => {
            $("#loader_container").fadeOut();
        }, 1000);
    }, []);

    return (
        <>
            <Head title={title} />

            {children}

            <div className="container pt-5 text-center">
                <div className="col-12 d-flex justify-content-center">
                    {app?.appMode === 'production' ? <div className='alert alert-warning col-6'><b>Aviso:</b> Modo de produção ativado</div> : ""}
                </div>
                <code>
                    <p>&copy; {app.appName} {app.appRelease}</p>
                    <p>For testing purposes only. Version <span onClick={() => router.visit('/HelloWorld')}>{app.appVersion}</span></p>
                </code>
            </div>
        </>
    );
}

export default Layout;
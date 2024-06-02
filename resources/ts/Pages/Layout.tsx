import React, { useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './Components/Navbar/Index';

const Layout = ({ children, isLogin = false }) => {
    const { app, user } = usePage().props as any;
    const { title } = usePage().props as any;
    const { flash } = usePage().props as any;
    const { errors } = usePage().props;

    useEffect(() => {
        setTimeout(() => {
            $("#loader_container").fadeOut();
        }, 1000);
    }, []);


    useEffect(() => {
        if (flash?.message) {
            toast.info(flash?.message, {
                className: 'custom-toast',
            });
        } else if (flash?.success) {
            toast.success(flash?.success, {
                className: 'custom-toast'
            });
        }
    }, [flash]);


    useEffect(function () {
        if (errors) {
            Object.values(errors).map((error, index) => {
                toast.error(error, { className: 'custom-toast' });
            });

        }
    }, [errors]);




    return (
        <>
            <ToastContainer style={{ zIndex: 2 }} />
            <Head title={title} />

            {(user != null) ? <Navbar user={user} app={app} /> : <></>}

        {children}

            <div className="container pt-5 text-center">
                <div className="col-12 d-flex justify-content-center">
                    {app?.appMode === 'production' ? <div className='alert alert-warning col-6'><b>Aviso:</b> Modo de produção ativado</div> : ""}
                </div>
                <code>
                    <p>&copy; {app.appName} {app.appRelease}</p>
                    <p>For testing purposes only. Version <span>{app.appVersion} ({app?.appBranch})</span></p>
                </code>
            </div>
        </>
    );
}

export default Layout;
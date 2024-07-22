import React, { useState, useEffect } from "react";
import $ from 'jquery';
import { Head, usePage } from "@inertiajs/react";
import ResponsiveAppBar from "./Components/MDNavbar/Navbar";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer, toast } from 'react-toastify';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

const MDLayout = ({ children }) => {
    const { title, user, app, flash, errors } = usePage().props as any;
    const [mode, setMode] = useState<'light' | 'dark'>('light');

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                let html = document.querySelector('html') as HTMLElement;
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));

                if (localStorage.getItem('darkSwitch') != null) {
                    localStorage.removeItem('darkSwitch');
                    html.removeAttribute('data-bs-theme')
                } else {
                    localStorage.setItem('darkSwitch', 'dark');
                    html.setAttribute('data-bs-theme', 'dark')
                }
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );


    useEffect(() => {
        // Page Loaded
        let mode = localStorage.getItem('darkSwitch') == 'dark' ? 'dark' : 'light';
        let html = document.querySelector('html') as HTMLElement;

        setMode((prevMode) => (mode === 'dark' ? 'dark' : 'light'));

        if (mode == 'dark') {
            html.setAttribute('data-bs-theme', 'dark')
        } else {
            html.removeAttribute('data-bs-theme')
        }

        setTimeout(() => {
            $("#loader_container").fadeOut();
        }, 1000);


    }, []);

    useEffect(() => {
        if (flash?.message) {
            toast.info(flash?.message, { className: 'custom-toast' });
        } else if (flash?.success) {
            toast.success(flash?.success, { className: 'custom-toast' });
        }
    }, [flash]);


    useEffect(() => {
        if (errors) {
            Object.values(errors).map((error: any) => {
                toast.error(error, { className: 'custom-toast' });
            });
        }
    }, [errors]);

    return (<>

        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Head title={title} />
                <ToastContainer style={{ zIndex: 4 }} />

                {user && <ResponsiveAppBar context={ColorModeContext} user={user} app={app} />}

                {children}

                <section style={{ width: '100%', padding: '1rem', textAlign: 'center' }}>
                    <p> &copy; {app.appName} <small>{app.appRelease}</small></p>
                    <p>For testing purposes only. Version {app.appVersion}</p>
                </section>
            </ThemeProvider>
        </ColorModeContext.Provider>

    </>);
}



export default MDLayout;
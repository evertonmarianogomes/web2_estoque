import React, { useState, useEffect, createContext } from "react";
import { Head, usePage } from "@inertiajs/react";
import Navbar from "./Components/MDNavbar/Navbar";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer, toast } from 'react-toastify';


export const ColorModeContext = createContext({ toggleColorMode: () => { } });

const MDLayout = ({ children }) => {
    const { title, user, app, errors, flash } = usePage().props as any;
    const [mode, setMode] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash?.success, { className: 'custom-toast' });
        }

        if (flash?.message) {
            toast.info(flash?.message, { className: 'custom-toast' });
        }
    }, [flash]);


    useEffect(() => {
        if (errors && Array.isArray(errors)) {
            errors?.map((error) => {
                toast.error(error, { className: 'custom-toast' });
            });
        } else {
            toast.error(errors, { className: 'custom-toast' });
        }
    }, [errors]);

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
                <ToastContainer style={{ zIndex: 5 }} />

                {user && <Navbar user={user} app={app} />}

                {user && <div style={{ paddingTop: '4rem' }}></div>}

                {children}

                <code className="d-flex flex-wrap mt-5">
                    <p className='col-12 text-center'> &copy; {app.appName} <small>{app.appRelease}</small></p>
                    <p className='col-12 text-center'>For testing purposes only. Version {app.appVersion}</p>
                </code>
            </ThemeProvider>
        </ColorModeContext.Provider>

    </>);
}



export default MDLayout;
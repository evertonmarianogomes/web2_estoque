import React, { useState, useEffect } from "react";
import $ from 'jquery';
import { Head, usePage } from "@inertiajs/react";
import ResponsiveAppBar from "./Components/MDNavbar/Navbar";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

const MDLayout = ({ children }) => {
    const { title, user, app } = usePage().props as any;
    const [mode, setMode] = useState<'light' | 'dark'>('light');

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                let aux = mode === 'light' ? null : 'dark';
                console.log(aux);


                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));

                if (localStorage.getItem('darkSwitch') != null) {
                    localStorage.removeItem('darkSwitch');
                } else {
                    localStorage.setItem('darkSwitch', 'dark');
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
        setTimeout(() => {
            $("#loader_container").fadeOut();
        }, 1000);

        let mode = localStorage.getItem('darkSwitch') == 'dark' ? 'dark' : 'light';
        setMode((prevMode) => (mode === 'dark' ? 'dark' : 'light'));
    }, []);


    return (<>

        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Head title={title} />
                {/* <ResponsiveAppBar context={ColorModeContext} user={user} /> */}
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
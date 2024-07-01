import React, { useState } from "react";
import { Alert, Button } from "@mui/material";
import MDLayout from "./MDLayout";
import { useTheme } from '@mui/material/styles';

function hello(props: any) {
    const [count, setCount] = useState(0);
    const increment = () => setCount(count => count + 1);
    const theme = useTheme();

    return (<>
        <div className="container pt-3">
            <Alert severity="info">
                HelloWorld, está pagina está em construção
            </Alert>
            {/* <h3>HelloWorld</h3>
            Modo - {theme.palette.mode}
            <p>Contador - {count}</p>
            <Button variant="contained" color="secondary" onClick={increment}>Contar</Button> */}
        </div>

    </>)
}

hello.layout = (page: any) => <MDLayout children={page} />

export default hello;
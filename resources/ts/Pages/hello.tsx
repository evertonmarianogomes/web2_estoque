import React, { useState } from "react";
import { Alert, Button } from "@mui/material";

function hello(props: any) {
    const [count, setCount] = useState(0);
    const increment = () => setCount(count => count + 1);

    return (<>
        <div className="container pt-3">
            <Alert severity="info">
                HelloWorld, está pagina está em construção
            </Alert>
        </div>

    </>)
}


export default hello;
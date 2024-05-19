import React from "react";
import { router, usePage } from "@inertiajs/react";
import { route } from 'ziggy-js'


const Home = () => {
    const { user } = usePage().props as any;

    return (
        <div className="container pt-3">
            <h3>Bem vindo {user?.first_name}</h3>
            <hr />
        </div>
    );
}


export default Home;
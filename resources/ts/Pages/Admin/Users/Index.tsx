import React from "react";
import List from "./List";
import { Link } from "@inertiajs/react";
import { route } from 'ziggy-js';

export default function Index(props: any) {

    return (
        <div className="container pt-3">
            <div className="d-flex justify-content-between flex-wrap">
                <h1>Usuários</h1>
                <Link href={route('users.create')} className="btn btn-primary align-self-center"><i className="fas fa-add"></i> Novo usuário</Link>
            </div>
            <hr />

            <List users={props?.users} />

        </div>
    );
}
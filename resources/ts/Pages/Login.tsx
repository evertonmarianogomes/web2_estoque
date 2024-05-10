import React from "react";
import { usePage, Link, router } from "@inertiajs/react";
import DarkMode from "./Components/DarkMode";
import { route } from "ziggy-js";


const Login = () => {
    const { app } = usePage().props as any;

    const onSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();
        let data = new FormData(e.target as HTMLFormElement);

        router.post(route('app.validateLogin'), data);
    }


    return (
        <div className="container pt-3">
            <div className="row justify-content-center">
                <div className="card col-12 col-md-8 col-lg-6">
                    <div className="card-body">
                        <header className="d-flex justify-content-between">
                            <div className="flex-grow-1">
                                <small className="text-muted">{app.appName} {app.appRelease}</small>
                                <h3>Acesso</h3>
                            </div>

                            <DarkMode />
                        </header>

                        <hr />
                        <form onSubmit={onSubmitForm}>
                            <div className="mb-2">
                                <label htmlFor="login" className="form-label">Login</label>
                                <input type="text" className="form-control" id="login" name="login" required />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="password" className="form-label">Senha</label>
                                <input type="password" className="form-control" id="password" name="password" required />
                            </div>


                            <button type="submit" className="btn btn-primary mt-3">Entrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div >


    );
}

export default Login;
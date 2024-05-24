import React, { useState, useEffect } from "react";
import { router, Link } from '@inertiajs/react'
import { route } from 'ziggy-js';

type User = {
    id: number,
    user_type: number,
    first_name: string,
    last_name: string,
    email: string,
    login: string,
    password: string
}


export default function Create(props: any) {
    const [userForm, setUserForm] = useState<User>({ id: 0, user_type: 2, first_name: '', last_name: '', email: 'teste@email.com', login: '', password: '' });

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setUserForm((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const submitCreateUserForm = (event: React.FormEvent) => {
        event.preventDefault();

        router.post(route('users.store'), userForm);
    }

    return (<>
        <div className="container pt-3">
            <h3>Criar usuário</h3>
            <hr />

            <form onSubmit={submitCreateUserForm}>
                <div className="col-12 d-flex flex-wrap mb-3">
                    <div className="mb-2 pe-0 pe-lg-2 col-12 col-lg-6">
                        <label htmlFor="first_name" className="form-label">Nome</label>
                        <input type="text" name="first_name" id="first_name" className="form-control" defaultValue={userForm.first_name} required onChange={handleChange} />
                    </div>


                    <div className="mb-2 col-12 col-lg-6 ps-0 ps-lg-2">
                        <label htmlFor="last_name" className="form-label">Sobrenome</label>
                        <input type="text" name="last_name" id="last_name" className="form-control" onChange={handleChange} defaultValue={userForm.last_name} required />
                    </div>
                </div>

                <div className="col-12 d-flex flex-wrap mb-3">
                    <div className="col-12 col-lg-6 pe-0 pe-lg-2">
                        <label htmlFor="user_type" className="form-label">Tipo</label>
                        <select className="form-select" name="user_type" id="user_type" onChange={handleChange} defaultValue={2}>
                            {props?.roles.map((role: any, index: number) => (
                                <option value={role?.id} key={index} >{role?.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12 col-lg-6 ps-0 ps-lg-2">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name="email" id="email" className="form-control" onChange={handleChange} defaultValue={userForm.email} required />
                    </div>

                </div>

                <div className="col-12 d-flex flex-wrap mb-3">
                    <div className="mb-2 pe-0 pe-lg-2 col-12 col-lg-6">
                        <label htmlFor="login" className="form-label">Login</label>
                        <input type="text" name="login" id="login" className="form-control" onChange={handleChange} defaultValue={userForm.login} required />
                    </div>


                    <div className="mb-2 col-12 col-lg-6 ps-0 ps-lg-2">
                        <label htmlFor="password" className="form-label">Senha</label>
                        <input type="password" name="password" id="password" className="form-control" onChange={handleChange} defaultValue={userForm.last_name} required />
                    </div>
                </div>


                <button type="submit" className="btn btn-primary">Enviar</button>
            </form >


        </div >
    </>)
}

import React, { useState } from "react";
import moment from 'moment';
import { router, usePage } from '@inertiajs/react'
import { route } from 'ziggy-js';


export default function Edit(props: any) {
    const [userForm, setUserForm] = useState(props?.user_edit);
    const { user, roles } = usePage().props as any;

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setUserForm((prevFormData: any) => ({ ...prevFormData, [name]: value }));
    };

    const submitCreateUserForm = (event: React.FormEvent) => {
        event.preventDefault();
        router.put(route('users.update', userForm), userForm);
    }

    return (
        <div className="container pt-3">
            <div className="d-flex gap-3 flex-wrap justify-content-around">
                <h3 className="w-100">Editar usuário</h3>
                <p>Criado em: {moment(userForm.created_at).format('DD/MM/YYYY - HH:mm:ss')}</p>
                <p>Atualizado em: {moment(userForm.updated_at).format('DD/MM/YYYY - HH:mm:ss')}</p>
            </div>

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
                        {user?.id == userForm.id && <input className="form-control" readOnly={true} value={userForm.roles[0].name} disabled></input>}

                        {user?.id != userForm.id && <>
                            <select className="form-select mb-4 mb-lg-0" name="role" id="role" onChange={handleChange}
                                defaultValue={userForm.role}>
                                {roles.map((role: any, index: number) => (
                                    <option value={role?.id} key={index} >{role?.name}</option>
                                ))}
                            </select>
                        </>}

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
                        <input type="password" name="password" id="password" className="form-control" onChange={handleChange} />
                    </div>
                </div>


                <button type="submit" className="btn btn-primary">Enviar</button>
            </form >
        </div>
    );
}
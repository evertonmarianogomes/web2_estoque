import React, { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function EditUser(props: any) {
    const { user } = usePage().props as any;

    const [formData, setFormData] = useState({
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        login: '',
        password: '',
        isCurrentUser: true
    });


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(route('users.update', formData), formData)
    }

    useEffect(() => {
        setFormData({
            id: user?.id,
            first_name: user?.first_name,
            last_name: user?.last_name,
            email: user?.email,
            login: user?.login,
            password: '',
            isCurrentUser: true
        });

    }, []);



    return (<div className="container pt-3">
        <h3>Editar usuário</h3>
        <hr />
        <form onSubmit={submitForm}>
            <div className="d-flex flex-wrap mb-1 mb-lg-4">
                <div className="mb-2 col-12 col-md-6 col-lg-6 pe-0 pe-md-1 pe-lg-2">
                    <label htmlFor="first_name" className=" form-label">Nome</label>
                    <input type="text" className="form-control" id="first_name" name="first_name" required defaultValue={formData.first_name} onChange={handleChange} />
                </div>

                <div className="mb-2 col-12 col-md-6 col-lg-6 ps-0 ps-md-1 ps-lg-2">
                    <label htmlFor="last_name" className="form-label">Sobrenome</label>
                    <input type="text" className="form-control" id="last_name" name="last_name" required defaultValue={formData.last_name} onChange={handleChange} />
                </div>
            </div>

            <div className="d-flex flex-wrap">
                <div className="mb-2 col-12 col-md-6 col-lg-6 pe-0 pe-md-1 pe-lg-2">
                    <label htmlFor="login" className="form-label">Login</label>
                    <input type="text" name="login" id="login" className="form-control" required defaultValue={formData.login} onChange={handleChange} />
                </div>

                <div className="mb-2 col-12 col-md-6 col-lg-6 ps-0 ps-md-1 ps-lg-2">
                    <label htmlFor="password" className="form-label">Senha</label>
                    <input type="password" name="password" id="password" className="form-control" defaultValue={formData.password} onChange={handleChange} />
                </div>
            </div>


            <button type="submit" className="btn btn-primary mt-2 mt-lg-4">Enviar</button>
        </form>
    </div>);
}
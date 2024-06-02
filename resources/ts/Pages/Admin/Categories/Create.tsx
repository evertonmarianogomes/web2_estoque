import React, { useEffect, useState } from "react";
import { NavItem, NavLink, Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { useForm, router } from "@inertiajs/react";
import { route } from 'ziggy-js';


const Create = (props: any) => {
    const [modal, setModal] = useState(false);
    const [category, setCategory] = useState<any>();

    const { mode } = props as any;

    const toggle = () => setModal(!modal);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setCategory((prevFormData: any) => ({ ...prevFormData, [name]: value }));
    };

    const handleCreateForm = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('categories.store'), category, {
            onFinish: () => {
                setCategory({
                    id: 0,
                    name: '',
                    description: 'Descrição'
                });
                setModal(false);
                props?.reload();
            }
        });
    }

    const handleUpdateForm = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(route('categories.update', category), category, {
            onFinish: () => {
                setModal(false);
                props?.reload();
            }
        });
    }

    useEffect(() => {
        setCategory(props?.category);
    }, []);

    return (<>
        <Button color="primary" onClick={toggle}>{mode == 'create' ? 'Criar' : <><i className="fas fa-edit"></i></>}</Button>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>{mode == 'create' ? "Criar" : "Editar "} categoria</ModalHeader>
            <ModalBody >
                <form onSubmit={mode == 'create' ? handleCreateForm : handleUpdateForm}>
                    <div className="mb-4">
                        <label htmlFor="name" className="form-label">Nome da categoria</label>
                        <input type="text" name="name" id="name" className="form-control" onChange={handleChange} defaultValue={category?.name} required />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="description" className="form-label">Descrição</label>
                        <textarea name="description" id="description" defaultValue={category?.description} className="form-control" onChange={handleChange}></textarea>
                    </div>

                    <Button type="submit" color="primary">Enviar</Button>
                </form>
            </ModalBody>
        </Modal>
    </>)
}


export default Create;
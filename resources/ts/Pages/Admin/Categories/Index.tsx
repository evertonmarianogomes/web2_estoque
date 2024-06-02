import React, { useState, useEffect } from "react";
import { route } from 'ziggy-js';
import { router } from '@inertiajs/react';
import { Button, Table } from "reactstrap";
import moment from "moment";

import alertify from 'alertifyjs';
import Create from "./Create";

const Index = (props) => {
    const [categoryList, setCategoryList] = useState([]);

    const [loader, setLoader] = useState(true);


    const getCategoryList = async () => {
        let response = await fetch(route('categories.index'), {
            method: 'GET'
        });
        let data = await response.json();

        setCategoryList(data);
    }

    const deleteCategory = (id) => {
        alertify.confirm('Excluir', 'Certeza que deseja excluir a categoria?',
            () => {
                router.delete(route('categories.destroy', { id }), {
                    onFinish: async () => {
                        getCategoryList();
                    }
                });
            },
            function () { });
    }

    useEffect(() => {
        getCategoryList().then(() => setTimeout(() => setLoader(false), 250));
    }, []);

    return (<>
        <div className="ps-3 pt-2 pe-3">
            {loader && <p>Carregando dados, aguarde...</p>}

            {!loader && <>
                <Create category={{ id: 0 }} mode='create' reload={getCategoryList} />
                <Table hover responsive striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Atualizado em</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryList.length == 0 && <tr><td colSpan={5} className="text-center">Nenhum registro encontrado na base de dados</td></tr>}


                        {categoryList.length > 0 && categoryList.map((category: any, index: number) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{category?.name}</td>
                                <td style={{ width: '30em' }}>{category?.description}</td>
                                <td>{moment(category?.updated_at).format('DD/MM/YYYY - HH:mm:ss')}</td>
                                <td className="d-flex gap-1">
                                    <Create category={category} mode='edit' reload={getCategoryList} />
                                    <Button type="button" color="danger" onClick={() => deleteCategory(category?.id)}><i className="fas fa-trash"></i></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </>}
        </div>

    </>);
}


export { Index };
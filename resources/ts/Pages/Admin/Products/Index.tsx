import React, { useState } from "react";
import { usePage, router, Link } from "@inertiajs/react";
import { Table } from "reactstrap";
import moment from "moment";
import { route } from 'ziggy-js';
import alertify from 'alertifyjs';



const Index = () => {
    const { products, categories } = usePage().props as any;

    const [productsList, setProductList] = useState(products);
    const [categoryList, setCategoryList] = useState(categories);

    const updateList = () => {
        router.visit(route('stock.index'));
    }

    const submitSearchForm = (e: React.FormEvent) => {
        e.preventDefault();
        let data = new FormData(e.target as any);
        let category_id = data.get('category');
        let query = data.get('search_query') as string;

        if (query == "") {
            setProductList(searchByCategory(category_id));
        } else {
            let resp = searchByCategory(category_id);

            const filteredData = resp.filter((item) => {
                return Object.values(item.name).join('').toLowerCase().includes(query.toLowerCase())
            })

            setProductList(filteredData);
        }
    }


    const deleteProduct = (id: any) => {
        alertify.confirm('Excluir', 'Certeza que deseja excluir o produto?', function () {
            router.delete(route('products.destroy', { id: id }), {
                onFinish: () => {
                    router.visit(route('stock.index'));
                }
            });
        }, function () { return; });
    }

    const searchByCategory = (id: any) => {
        if (id == 0) return products;

        return products.filter(obj => obj.category_id == id);
    }



    return (<>
        <div className="container pt-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title mb-3">Pesquisa</h5>

                    <form onSubmit={submitSearchForm} className="d-flex gap-1 flex-wrap">
                        <div className="mb-2 col-12 col-md-6 col-lg-5">
                            <input type="text" className="form-control" name="search_query" id="search_query" placeholder="Insira os termos" />
                        </div>

                        <div className="mb-2 col-12 col-md-3 col-lg-4">
                            <select name="category" id="category" className="form-select" defaultValue={0}>
                                {categoryList.length > 0 && categoryList.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))}
                                <option value={0}>Tudo</option>
                            </select>
                        </div>

                        <div className="mb-1 d-flex gap-1">
                            <button type="submit" className="btn btn-success"><i className="fas fa-search"></i></button>
                            <button type="button" className="btn btn-secondary mx-1" onClick={updateList}>Reset</button>
                            <div className="col ps-1 align-item-strech d-flex jsutify-content-end" style={{
                                borderLeft: '1px solid #807e7e'
                            }}>
                                <Link href={route('products.create')} className="btn btn-primary align-items-center d-flex gap-1"> <i className="fas fa-plus"></i> Novo</Link>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
            <Table responsive hover striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th >Nome</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Categoria</th>
                        <th>Status</th>
                        <th>Atualizado em</th>
                        <th className="text-center">Opções</th>
                    </tr>
                </thead>

                <tbody>
                    {productsList?.length == 0 && <tr><td colSpan={8} className="text-center">Nenhum registro encontrado na base de dados</td></tr>}


                    {productsList?.length > 0 && productsList.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="w-sm-0 w-25">{item?.name}</td>
                            <td>{item?.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                            <td>{item?.quantity}</td>
                            <td>{item?.category?.name}</td>
                            <td>{(item?.is_available == '1') ? 'Disponível' : 'Desativado'}</td>
                            <td>{moment(item?.updated_at).format('DD/MM/YYYY - HH:mm:ss')}</td>
                            <th className="gap-1 d-flex flex-wrap justify-content-center">
                                <Link href={route('products.edit', item)} className="btn btn-primary"><i className="fas fa-edit"></i>
                                    <span className="d-none d-lg-inline"> Editar</span>
                                </Link>
                                <button className="btn btn-danger" onClick={(e) => deleteProduct(item.id)}><i className="fas fa-trash"></i>
                                    <span className="d-none d-lg-inline"> Excluir</span>
                                </button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    </>);
}



export { Index };
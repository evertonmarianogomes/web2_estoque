import React, { useState, useEffect, useLayoutEffect, cloneElement } from "react";
import { Link, usePage } from '@inertiajs/react';
import { Modal, ModalHeader, ModalBody, Button, Table, Form } from "reactstrap";
import { formatCurrency } from "../../Components/CurrencyInput";

import alertify from 'alertifyjs';

const ModalProducts = (props) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [list, setList] = useState(props.products);
    const [item, setItem] = useState(null);
    const [itemAmount, setItemAmount] = useState(0.00);


    const { cart, setCart, total, setTotal } = props.cart;

    const onSubmitSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        const query: string = data.get('search').toString();

        let filteredData = props.products;

        if (query != "") {
            filteredData = props.products.filter((item) => {
                return Object.values(item.name).join('').toLowerCase().includes(query.toLowerCase())
            })
        }

        setList(filteredData);
    }

    const onSubmitAddCart = (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        let qtd_pedido = Number(data.get('qtd_item'));
        const productList = [...props.products];
        const index = productList.findIndex(prod => prod.id == item.id);

        if (productList[index].quantity >= qtd_pedido) {
            productList[index].quantity -= qtd_pedido;
            props.setProductList(productList);

            let cartClone = cart.concat() as Array<any>;
            let cartIndex = cartClone.findIndex(prod => prod.id == item.id);


            if (cartIndex != -1) {
                cartClone[cartIndex].quantity += qtd_pedido;
                cartClone[cartIndex].totalPrice = cartClone[cartIndex].quantity * cartClone[cartIndex].price;
                setCart(cart => cartClone);

            } else {
                cartClone.unshift({
                    id: item.id,
                    name: item.name,
                    quantity: qtd_pedido,
                    price: item.price,
                    totalPrice: itemAmount
                })

                setCart(cart => cartClone)
            }
            setTotal(total => total += itemAmount)
            alertify.alert('Produto adicionado com sucesso');
        }
        setItem(null);
    }


    return (<>
        <Button color="success" className="ms-auto" onClick={toggle}><i className="fas fa-plus"></i> Adicionar produto</Button>
        <Modal isOpen={modal} scrollable toggle={toggle} className="modal-xl" onClosed={() => {
            setItem(null);
            setItemAmount(0.00);
        }}>
            <ModalHeader toggle={toggle} className="sale_product_header">Produtos</ModalHeader>

            <ModalBody className="product_body">
                {item && <>
                    <div className="collapse show" id="collapseExample">
                        <div className="mb-3">

                            <form onSubmit={onSubmitAddCart} className="d-flex flex-wrap">
                                <div className="col-12 d-flex gap-1 flex-wrap">
                                    <h3 >{item.name}</h3>
                                    <div className="ms-2 d-flex flex-wrap gap-4">
                                        <p>Preço Unitário: {formatCurrency((item.price * 100).toString())}</p>
                                        <p>Valor Total: {formatCurrency((itemAmount * 100).toString())}</p>
                                        <p>Qtd. Estoque: {item.quantity}</p>
                                    </div>
                                    <Button color="secondary" className="ms-auto" onClick={(e) => setItem(null)}>Voltar</Button>


                                    <div className="col-12 d-flex gap-2 align-items-center">
                                        <label htmlFor="qtd_item" className="form-label">Quantidade</label>

                                        <div className="col-1">
                                            <input type="number" className="form-control " name="qtd_item" id='qtd_item'
                                                max={item.quantity} defaultValue={1} min={1}
                                                onChange={(e) => {
                                                    let value = Number(e.target.value);
                                                    setItemAmount(value * item.price);
                                                }} />
                                        </div>

                                        <Button color="success" type="submit"><i className="fa-solid fa-cart-plus"></i></Button>

                                    </div>

                                </div>

                            </form>

                            <hr />
                        </div>
                    </div>
                </>}

                {!item &&
                    <>
                        <form className="d-flex flex-wrap gap-2 align-items-end" onSubmit={onSubmitSearch}>
                            <div className="col-12 col-md-9 col-lg-9">
                                <label htmlFor="search" className="form-label">Pesquisa</label>
                                <input type="text" name="search" id="search" className="form-control" />
                            </div>
                            <Button color="success" className="col-12 col-md col-lg">Pesquisar</Button>

                            <Button color="secondary" className="col-12 col-md col-lg" onClick={(e) => setList(props.products)}>Reset</Button>
                        </form>

                        <Table responsive hover striped className="mt-2">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Imagem</th>
                                    <th>Nome</th>
                                    <th>Preço Unitário</th>
                                    <th>Qtd. Estoque</th>
                                    <th>Opções</th>
                                </tr>
                            </thead>

                            <tbody>
                                {!item && props.products.length == 0 ? <tr><th>Nenhum produto cadastrado na base de dados</th></tr> :
                                    list.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td><img src={"/storage/images/" + item?.image_url} alt="Imagem" className="prod_td_image" /></td>
                                            <td>{item?.name}</td>
                                            <td>{formatCurrency((item?.price * 100).toString())}</td>
                                            <td>{item?.quantity}</td>
                                            <td>
                                                {item?.quantity > 0 ?
                                                    <button className="btn btn-success" onClick={(e) => {
                                                        setItem(item);
                                                        setItemAmount(item.price * 1)
                                                    }}>Add to Cart</button> : <>
                                                        <p>Sem estoque</p>
                                                    </>}

                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </>}
            </ModalBody>
        </Modal>
    </>);

}


export default ModalProducts;
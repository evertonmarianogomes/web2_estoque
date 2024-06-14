import React, { useState, useEffect } from "react";
import { usePage, Link, router } from "@inertiajs/react";
import { Button, Table } from "reactstrap";
import PageProducts from "./PageProducts";
import { formatCurrency } from "../../Components/CurrencyInput";
import { route } from 'ziggy-js'

import ReactDOMServer from "react-dom/server";
import alertify from 'alertifyjs';


const Create = ({ props }) => {
    const { products, app } = usePage().props as any;

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0.0);
    const [productList, setProductList] = useState(null);

    const [pixCode, setPixCode] = useState(null);

    const deleteProduct = (id) => {
        let prodSel = cart.find(item => item.id == id);

        setCart(prevItems => prevItems.filter(item => item.id !== id));

        setProductList(prevItems =>
            prevItems.map(item =>
                item.id === prodSel.id ? { ...item, quantity: item.quantity + prodSel.quantity } : item
            )
        );
    }

    const resetCart = () => {
        cart.map((item, index) => {
            let id = Number(item.id);
            let index_prod = products.findIndex(prod => prod.id == id);
            setProductList(prevItems => prevItems.map(item => item.id == id ? { ...item, quantity: products[index_prod].quantity } : item)); setCart([]);
        });
    }


    const finishSale = async () => {
        let data = JSON.stringify({ amount: total });


        let resp = await fetch(route('pix.getCode'), {
            method: 'post',
            body: data,
            headers: {
                'X-CSRF-TOKEN': app?.appToken,
                "Content-Type": "application/json",
            }
        })

        let item = await resp.json();

        let stringo = ReactDOMServer.renderToStaticMarkup(<>
            <p>Pague {formatCurrency((total * 100).toString())} e confirme o pagamento clicando em "OK"</p>
            <img src={item?.qrCode}></img>
        </>);


        alertify.alert(`${app.appName} - Pagamento`, stringo);


    }

    useEffect(function () {
        let aux = 0.0;
        cart.map((item) => { aux += item.total });
        setTotal(aux)
    }, [cart]);


    useEffect(function () {
        let aux = [];
        products.map(item => aux.push(item));
        setProductList(aux);
    }, []);


    return (<>
        <div className="container-fluid pt-1">
            <div className="col-12 d-flex flex-wrap gap-2">
                <div className="col-12 col-lg-6">
                    <div className="card card-body">
                        {productList && <PageProducts productList={productList} setCart={setCart} cart={cart} setProductList={setProductList} />}
                    </div>

                </div>

                <div className="col-12 col-lg">
                    <div className="card">
                        <div className="card-body">
                            <h5>Carrinho</h5>
                            <Table responsive hover striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Produto</th>
                                        <th>Qtd</th>
                                        <th>Preço unitário</th>
                                        <th>Total</th>
                                        <th>Opções</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {cart.length == 0 ? <tr><td colSpan={6} className="text-center">Adicione produtos no carrinho</td></tr>
                                        : cart.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item?.name}</td>
                                                <td>{item?.quantity}</td>
                                                <td>{formatCurrency((item?.price * 100).toString())}</td>
                                                <td>{formatCurrency((item?.total * 100).toString())}</td>
                                                <td>
                                                    <Button color="danger" onClick={(e) => deleteProduct(item.id)}><i className="fas fa-trash"></i></Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>

                                <tfoot>
                                    <tr>
                                        <td colSpan={7} className="text-center">
                                            <h3 className="py-3">Total: {formatCurrency((total * 100).toString())}</h3>
                                        </td>

                                    </tr>
                                </tfoot>
                            </Table>
                        </div>
                        <div className="card-footer gap-2">
                            <Button color="success" onClick={finishSale}>Finalizar Compra</Button>
                            <Button color="secondary" onClick={() => resetCart()}>Resetar</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Create;
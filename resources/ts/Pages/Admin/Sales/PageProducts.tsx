import React, { useState, useEffect, useRef } from "react";
import { Table } from 'reactstrap';
import { formatToBRL } from "../Currency";


const PageProducts = (props) => {

    const addToCart = (prod, value) => {
        const iProd = props.cart.find(item => item.id == prod.id);

        if (iProd) {
            props.setCart(prevItems =>
                prevItems.map(item =>
                    item.id === prod.id ? {
                        ...item,
                        quantity: iProd.quantity + value,
                        total: iProd?.price * (iProd.quantity + value)
                    } : item
                )
            );
        } else {
            props.setCart(prevItems => [...prevItems, {
                id: prod?.id,
                name: prod?.name,
                price: prod?.price,
                quantity: value,
                total: prod?.price * value
            }]);
        }
    }

    const addProductCart = (productId?: any) => {
        const prod = props.productList.find(prod => prod.id == productId);
        const el = document.querySelector(`#input${productId}`) as HTMLInputElement;
        const value = Number(el.value);


        if (prod && (prod.quantity - value >= 0) && value > 0) {
            props.setProductList(prevItems => prevItems.map(item => item.id === productId ? { ...item, quantity: prod.quantity - value } : item));
            addToCart(prod, value)
            el.value = '0';
        }
    }


    function keyDownE(e: React.KeyboardEvent) {
        if (e.key == 'Enter') {
            let el = e.target as HTMLInputElement;
            let str = el.id;

            const match = str.match(/\d+$/);

            if (match) {
                const number = match[0];  // O número encontrado
                let btn = document.querySelector(`#add${number}`) as HTMLButtonElement;
                btn.click();
                el.value = '0';
            } else {
                console.log('Nenhum número encontrado no final da string.');
            }
        }


    }

    return (<>
        <h5>Produtos</h5>

        <Table hover striped responsive >
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Preço Unitário</th>
                    <th>Estoque</th>
                    <th>Qtd Venda</th>
                    <th>Opções</th>
                </tr>
            </thead>

            <tbody>
                {props.productList ? props.productList.map((item, index) => (
                    <tr key={index}>
                        {item?.is_available ? <>
                            <td>{index + 1}</td>
                            <td>{item?.name}</td>
                            <td>{formatToBRL(item?.price)}</td>
                            <td>{item?.quantity}</td>
                            <td>
                                {item.quantity == 0 ? <>-</> : <>
                                    <input type="number" min={0} max={item?.quantity} defaultValue={0} className="form-control col-2" id={`input${item?.id}`} onKeyDown={keyDownE} />
                                </>}

                            </td>
                            <td>
                                {item.quantity == 0 ? <span>Sem Estoque</span> : <button className="btn btn-primary" id={`add${item?.id}`}
                                    onClick={(e) => addProductCart(item?.id)}><i className="fas fa-plus"></i></button>}

                            </td>
                        </> : ''}
                    </tr>
                )) : <tr><td colSpan={6} className="text-center">Nenhum registro encontrado na base de dados</td></tr>}
            </tbody>
        </Table >
    </>);
}


export default PageProducts;
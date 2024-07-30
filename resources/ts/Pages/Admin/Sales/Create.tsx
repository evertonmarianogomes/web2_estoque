import React, { useState, useEffect } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { Button, Tooltip, Paper } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { ProductsTable } from './Products/ProductsTable';
import { CartTable } from './Cart/CartTable';
import { formatToBRL } from '../Currency';
import { toast } from 'react-toastify';

import Finish from './Finish';


export type CreateProps = {
    products: Array<any>
}

const Create = () => {
    const { props } = usePage() as any;
    const { route, router, axios } = window;

    /** Cart/Products Props and States */
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState(props?.products);
    const [cartAmount, setCartAmount] = useState(0);

    const addProductToCart = (product: any) => {
        findInCart(product?.id) ? addToCartIfExists(product) : addToCart(product);

        axios.post(route('products.quantity', { id: product?.id }), {
            opearation: 'decrement',
            quantity: product?.quantity
        }).then(resp => resp.data).then((resp) => {
            setQuantity(product?.id, product?.quantity);
        });

    }

    const removeProductToCart = (product: any) => {
        setCart(cart => cart.filter(item => item.id != product?.id));

        axios.post(route('products.quantity', { id: product?.id }), {
            operation: 'increment',
            quantity: product?.quantity
        }).then(resp => resp.data).then((resp) => {
            setQuantity(product?.id, product?.quantity, 'increment');
            setCartAmount(cartAmount => cartAmount - product?.amount);
            toast.success('Produto removido do carrinho com sucesso', { className: 'custom-toast' });
        });
    }

    const findInCart = (id: number) => {
        return cart.find(item => item.id == id) != undefined;
    }

    const addToCart = (product: any) => {
        setCart(cart => [...cart, product]);
        setCartAmount(cartAmount => cartAmount + product?.amount);
    }

    const resetCart = () => {
        let filteredCart = cart.map(({ id, quantity }) => ({ id, quantity }));

        axios.post(route('products.quantityAll'), {
            data: filteredCart
        }).then(resp => resp.status).then(resp => {
            if (resp == 200) {
                router.reload({ only: ['products'] });
                setCart([]);
                setCartAmount(0);
                setProducts(props?.products);

                toast.info('Carrinho limpo com sucesso', { className: 'custom-toast' });
            }
        });
    }

    const addToCartIfExists = (product: any) => {
        setCart(prevState =>
            prevState.map(item =>
                item.id == product?.id ? {
                    ...item,
                    amount: (item.quantity + product?.quantity) * product.price,
                    quantity: item.quantity + product?.quantity
                } : item
            )
        );

        setCartAmount(cartAmount => cartAmount + product?.amount);
    }

    const setQuantity = (id: number, quantity: number, operation = 'decrease') => {
        setProducts(old => old.map(item =>
            item.id == id ? {
                ...item,
                quantity: operation == 'decrease' ? item.quantity - quantity : item.quantity + quantity
            } : item
        ));
    }


    return (<div className='container-fluid pt-2'>
        <div className="col-12 d-flex gap-3">
            {cart.length == 0 && <Tooltip title='Voltar para vendas'>
                <Link href={route('sales.index')}>
                    <Button variant='contained' color='secondary'><ArrowBack /></Button>
                </Link>
            </Tooltip>}
            <h4>Nova venda</h4>
        </div>
        <div className="d-flex flex-wrap gap-3">
            <div className="col-12 col-lg-6">
                <ProductsTable
                    products={products}
                    handleAddCart={addProductToCart}
                />
            </div>

            <Paper className="col-12 col-lg p-3">
                <div className="col-12 d-flex gap-2">
                    <h4 style={{ flexGrow: 1 }}>Carrinho</h4>

                    <Button variant='contained' color='secondary' onClick={resetCart} disabled={cart.length == 0}>Reset Cart</Button>
                    <Finish cart={cart} amount={cartAmount} />
                </div>

                <p>Total: <b>{formatToBRL(cartAmount)}</b> </p>
                <CartTable
                    cart={cart}
                    handleSetCart={setCart}
                    handleDeleteToCart={removeProductToCart}
                />
            </Paper>
        </div>

    </div>);
}

export default Create;
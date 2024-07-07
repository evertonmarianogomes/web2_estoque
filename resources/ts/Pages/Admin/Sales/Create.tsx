// MD Sales View
import React, { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import MDLayout from '../../MDLayout';
import { Card, CardContent, Box, CardActions, Button, TextField } from '@mui/material';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ProductsTable from './Products/ProdTable';
import CartTable from './Cart/CartTable';
import { formatToBRL } from '../Currency';
import Finish from './Finish';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Create = (props) => {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState<any>(props?.products);
    const [amount, setAmount] = useState<Number>(0.00);

    useEffect(() => {
        let sumValues = 0.0;

        cart.map((item) => {
            sumValues += item?.total;
        });

        setAmount(sumValues);
    }, [cart]);
    return (<>
        <div className="container-fluid pt-3">
            <div className="d-flex flex-wrap gap-3">
                <div className="col-12 col-lg-6">
                    <h4>
                        <Tooltip title='Voltar para vendas' placement="bottom-start">
                            <Button color='secondary' onClick={(e) => router.visit(route('sales.index'))} variant="contained">
                                <KeyboardArrowLeftIcon /></Button>
                        </Tooltip> Produtos</h4>
                    <ProductsTable products={{
                        products: products,
                        setProducts: setProducts
                    }} cart={{ cart: cart, setCart: setCart }} />
                </div>

                <Card className="col-12 col-lg">
                    <CardContent>
                        <div className="col-12 d-flex flex-wrap">
                            <h4 className="col"><ShoppingCartIcon />  Carrinho</h4>

                            <Finish cart={cart} amount={amount} />
                        </div>

                        <p>Total: <b>{formatToBRL(amount)}</b></p>
                        <CartTable cartState={{ cart, setCart }} productsState={{ products, setProducts }} />
                    </CardContent>
                </Card>
            </div>
        </div>


    </>);
}


Create.layout = (page: any) => <MDLayout children={page} />

export default Create;
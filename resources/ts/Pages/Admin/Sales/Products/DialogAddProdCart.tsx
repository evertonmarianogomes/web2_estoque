import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Alert } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import { formatToBRL } from '../../Currency';

const AddProductToCart = ({ prod, cart, product_id }) => {
    const [product, setProduct] = useState(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<number>(1);
    const min = 0;
    const max = product?.quantity;


    const handleClickOpen = () => {
        setOpen(true);
        let el = prod.products.filter(prod => prod.id == product_id);
        setProduct(el[0]);
    };

    const handleClose = () => {
        setOpen(false);
        setProduct(null);
        setValue(1);
    };

    const formatNumberInput = (e: any) => {
        let value = parseInt(e.currentTarget.value, 10);
        if (value > max) value = max;
        if (value < min) value = min;
        setValue(value);
    }

    const handleSubmitForm = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        console.log(`Produto ${product_id} -  Quantidade: ${value}`);

        prod.setProducts(prevState =>
            prevState.map(item =>
                item.id == product_id ? { ...item, quantity: Number(product.quantity - value) } : item
            )
        );

        addToCart();

        handleClose();
    }


    const addToCart = () => {
        let cartItem: number = (cart.cart as Array<any>).findIndex(item => item.product_id == product_id);

        if (cartItem == -1) {
            cart.setCart((old) => [...old, {
                id: (cart.cart as Array<any>).length == 0 ? 1 : (cart.cart as Array<any>).length + 1,
                product_id: product_id,
                name: product?.name,
                unitPrice: product?.price,
                total: Number(product?.price * value),
                quantity: value
            }]);
        } else {
            cart.setCart(prevState =>
                prevState.map(item =>
                    item.product_id === product_id ? { ...item, total: (item.quantity + value) * product.price, quantity: item.quantity + value } : item
                )
            );
        }
    }


    return (<>
        <Tooltip title="Adicionar produto">
            <Button variant="contained" color="secondary" sx={{ padding: '0.35rem' }} onClick={handleClickOpen}><AddIcon /> </Button>
        </Tooltip>


        <Dialog open={open} onClose={handleClose} sx={{ backdropFilter: 'blur (10px)' }} scroll={'paper'}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmitForm
            }}>

            <DialogTitle>Adicionar {product?.name}</DialogTitle>
            <DialogContent>
                {product?.quantity == 0 && <Alert variant='filled' color="error">Produto sem estoque</Alert>}

                {product?.quantity > 0 && <>
                    <p>Preço unitário: <b>{formatToBRL(product?.price)}</b></p>
                    <p>Quantidade em Estoque: <b>{product?.quantity}</b></p>

                    <p>Subtotal: <b>{formatToBRL(value * product?.price)}</b> </p>

                    <TextField required variant="standard" margin="dense" type="number" value={value} onChange={formatNumberInput} fullWidth autoFocus />
                </>}



            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit" disabled={product?.quantity == 0}>Adicionar</Button>
            </DialogActions>
        </Dialog>
    </>);
}


export default AddProductToCart;

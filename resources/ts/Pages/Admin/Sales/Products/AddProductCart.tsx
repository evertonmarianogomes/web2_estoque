import React, { useState } from "react";
import { Button, Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import { formatToBRL } from "../../Currency";
import { toast } from 'react-toastify';

export const AddProduct = (props: any) => {
    const { product, handleAddCart } = props;
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = useState<number>(1);
    const min = 0;
    const max = product?.quantity;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setValue(1);
    };

    const formatNumberInput = (e: any) => {
        let value = parseInt(e.currentTarget.value, 10);
        if (Number.isNaN(value)) value = min;
        if (value > max) value = max;
        if (value < min) value = min;
        setValue(value);
    }

    const handleSubmitForm = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        handleAddCart({
            id: product?.id,
            name: product?.name,
            quantity: value,
            price: Number(product?.price),
            amount: Number((value * product?.price).toFixed(2))
        });

        handleClose();
    }

    return (<>
        {product?.quantity > 0 ? <Tooltip title='Adicionar ao carrinho' placement="left"><Button variant='contained' color='primary' onClick={handleClickOpen}><Add /></Button></Tooltip> : <Button disabled variant='contained'><Add /></Button>}


        <Dialog open={open} scroll={'paper'} onClose={handleClose} sx={{ backdropFilter: 'blur(15px)' }}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmitForm
            }}

            maxWidth='sm'
            fullWidth
        >
            <DialogTitle>Adicionar ao carrinho</DialogTitle>
            <DialogContent>
                <p>Produto: <b>{product?.name}</b></p>
                <p>Preço unitário: <b>{formatToBRL(product?.price)}</b></p>
                <p>Quantidade em Estoque: <b>{product?.quantity}</b></p>

                <p>Subtotal: <b>{formatToBRL(value * product?.price)}</b> </p>

                <TextField required variant="standard" margin="dense" type="number" value={value} onChange={formatNumberInput} fullWidth autoFocus />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit" disabled={product?.quantity == 0 || value == 0}>Adicionar</Button>
            </DialogActions>
        </Dialog>
    </>);
}
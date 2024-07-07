import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { formatToBRL } from '../../Currency';

const CartTable = ({ cartState, productsState }) => {
    const { cart, setCart } = cartState;
    const { products, setProducts } = productsState;

    return (<>
        <TableContainer>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="left">Produto</TableCell>
                        <TableCell align="center">Preço Unit.</TableCell>
                        <TableCell align="center">Quantidade</TableCell>
                        <TableCell align="center">Preço Total</TableCell>
                        <TableCell align="center">Opções</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart && cart.length == 0 && <TableRow><TableCell colSpan={6} align='center'>Adicione produtos no carrinho</TableCell></TableRow>}

                    {cart && cart.length > 0 && cart.map((item, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell width={'1rem'}>{index + 1}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{formatToBRL(item?.unitPrice)}</TableCell>
                            <TableCell>{item?.quantity}</TableCell>
                            <TableCell>{formatToBRL(item?.total)}</TableCell>
                            <TableCell>-</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    </>);
}


export default CartTable;
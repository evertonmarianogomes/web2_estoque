import React, { useState } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { formatToBRL } from '../../Currency';

export const CartTable = (props: any) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const { cart, handleDeleteToCart } = props;

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedData = cart?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (<TableContainer >
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell width={'1rem'}>Qtd.</TableCell>
                    <TableCell>Preço Unit.</TableCell>
                    <TableCell>Subtotal</TableCell>
                    <TableCell>Opções</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {cart?.length == 0 ? <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell colSpan={6} sx={{ textAlign: 'center' }}>Adicione produtos no carrinho</TableCell>

                </TableRow>
                    : paginatedData.map((product: any, index: number) => (
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{product?.name}</TableCell>
                            <TableCell align='center'>{product?.quantity}</TableCell>
                            <TableCell>{formatToBRL(product?.price)}</TableCell>
                            <TableCell>{formatToBRL(product?.amount)}</TableCell>
                            <TableCell>
                                <Button variant='contained' color='error' onClick={() => {

                                    handleDeleteToCart(product);
                                }}>
                                    <Delete />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}

            </TableBody>

        </Table>

        <TablePagination
            component="div"
            count={cart?.length}
            page={page}
            rowsPerPageOptions={[5, 10, 15]}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </TableContainer>);
}
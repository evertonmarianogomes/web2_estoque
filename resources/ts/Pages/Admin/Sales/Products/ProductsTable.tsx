import React, { useState } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, Button } from '@mui/material';
import { formatToBRL } from '../../Currency';
import { AddProduct } from './AddProductCart';

export const ProductsTable = (props: any) => {
    const { products, handleAddCart }:
        { products: Array<any>, handleAddCart: any } = props;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedData = products?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (<TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Quantidade</TableCell>
                    <TableCell>Preço Unitário</TableCell>
                    <TableCell>Opções</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {products?.length == 0 ? <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell colSpan={6} sx={{ textAlign: 'center' }}>Nenhum produto cadastrado na base de dados</TableCell>

                </TableRow>
                    : paginatedData.map((product: any, index: number) => (
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{product?.name}</TableCell>
                            <TableCell>{product?.quantity}</TableCell>
                            <TableCell>{formatToBRL(product?.price)}</TableCell>
                            <TableCell>
                                <AddProduct handleAddCart={handleAddCart} product={product} />
                            </TableCell>
                        </TableRow>
                    ))}

            </TableBody>

        </Table>

        <TablePagination
            component="div"
            count={products.length}
            page={page}
            rowsPerPageOptions={[5, 10, 15]}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </TableContainer >);
}


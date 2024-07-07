import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { formatToBRL } from '../../Currency';
import TablePagination from '@mui/material/TablePagination';
import AddProductToCart from './DialogAddProdCart';


export default function ProductsTable({ products, cart }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);

    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Determinar os dados para a página atual
    const paginatedData = (products.products as Array<any>).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Nome</TableCell>
                            <TableCell align="center">Preço Unitário</TableCell>
                            <TableCell align="center">Qtd Estoque</TableCell>
                            <TableCell align="center">Opções</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row, index) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell width={'1rem'} >{index + 1}</TableCell>

                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>

                                <TableCell align='center'>
                                    {formatToBRL(row.price)}
                                </TableCell>

                                <TableCell align="center">{row.quantity}</TableCell>
                                <TableCell align="center">
                                    <AddProductToCart prod={{
                                        products: products.products,
                                        setProducts: products.setProducts
                                    }} cart={cart} product_id={row?.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <TablePagination
                    component="div"
                    count={(products.products as []).length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>



        </>
    );
}

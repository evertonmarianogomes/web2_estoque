import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from '@mui/material';
import { formatTimestamp, formatToBRL } from '../../Currency';
import Create from './Create';
import Edit from './Edit';
import Destroy from './Destroy';

const ProductList = ({ products, categories }): React.JSX.Element => {
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
    const paginatedData = (products as Array<any>).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (<>

        <Create />
        <TableContainer component={Paper}>
            <Table aria-label="Products Table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="left">Nome</TableCell>
                        <TableCell align="left">Categoria</TableCell>
                        <TableCell>Preço Unitário</TableCell>
                        <TableCell>Estoque</TableCell>
                        <TableCell align="left">Atualizado em</TableCell>
                        <TableCell align="left">Opções</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products && products.length == 0 && <TableRow><TableCell colSpan={7} align='center'>Nenhum registro encontrado na base de dados</TableCell></TableRow>}

                    {products && products.length > 0 && paginatedData.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item?.name}</TableCell>
                            <TableCell>{categories?.find(cat => cat.id == item?.category_id)?.name}</TableCell>
                            <TableCell>{formatToBRL(item?.price)}</TableCell>
                            <TableCell>{item?.quantity}</TableCell>
                            <TableCell>{formatTimestamp(item?.updated_at)}</TableCell>
                            <TableCell sx={{ width: '12rem' }}>
                                <div className="d-flex gap-2 flex-wrap">
                                    <Edit product={item} />
                                    <Destroy product={item} />
                                </div>

                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </TableContainer>

        <TablePagination
            component="div"
            count={(products as []).length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />


    </>);
}

export default ProductList;
import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Tooltip, TablePagination } from '@mui/material';
import { formatTimestamp } from '../Currency';
import { Delete } from '@mui/icons-material';
import Create from './Create';
import Update from './Update';
import Products from './Products';

export default function Index() {
    const { router, route } = window;
    const { categories } = usePage().props as any;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => { setPage(newPage) };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const deleteCategory = (id: number) => {
        let getResponse = confirm('Certeza que deseja excluir a categoria? ' + id);

        if (getResponse) router.delete(route('categories.destroy', { id: id }));

    }

    return (
        <div className="container pt-3">
            <Create />
            <h3>Categorias</h3>
            <TableContainer component={Paper} sx={{ mt: '1rem' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Criado em</TableCell>
                            <TableCell>Atualizado em</TableCell>
                            <TableCell>Opções</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {categories.length == 0 &&
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell sx={{ textAlign: 'center' }} colSpan={8}>Nenhum registro encontrado na base de dados</TableCell>
                            </TableRow>}

                        {categories.length > 0 &&
                            categories?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category: any, index: number) => (
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{category?.name}</TableCell>
                                    <TableCell>{category?.description}</TableCell>
                                    <TableCell>{formatTimestamp(category?.created_at)}</TableCell>
                                    <TableCell>{formatTimestamp(category?.updated_at)}</TableCell>
                                    <TableCell>
                                        <div className="d-flex gap-1">
                                            <Products category={category} />
                                            <Update category={category} />
                                            <Tooltip title='Excluir categoria'>
                                                <Button color='error' variant='contained' onClick={() => deleteCategory(category?.id)}><Delete /></Button>
                                            </Tooltip>
                                        </div>

                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>


                <TablePagination
                    component="div"
                    count={categories.length}
                    page={page}
                    rowsPerPageOptions={[5, 10, 15]}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    )
}

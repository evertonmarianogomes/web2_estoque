import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, Button, Tooltip } from "@mui/material";
import { formatToBRL, formatTimestamp } from "../Currency";
import Create from "./Create";
import Update from './Update';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Index() {
    const { products } = usePage().props as any;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const deleteProduct = (id: number) => {
        if (confirm('Certeza que deseja excluir o produto?')) {
            window.router.delete(window.route('products.destroy', { id: id }));
        }
    }

    const paginatedData = products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


    return (<div className='container pt-3'>
        <div className="d-flex flex-wrap">
            <h3 className='col-12 col-lg'>Produtos</h3>

            <Button variant="contained" color="info">Gerenciar Responsáveis</Button>
        </div>

        <Create />

        <TableContainer id='products_table' component={Paper} sx={{ marginTop: '1rem' }}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>

                        <TableCell width={'1rem'}>#</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Responsável</TableCell>
                        <TableCell>Categoria</TableCell>
                        <TableCell width={'2rem'}>Quantidade</TableCell>
                        <TableCell>Preço Unitário (R$)</TableCell>
                        <TableCell>Atualizado em</TableCell>
                        <TableCell>Opções</TableCell>
                    </TableRow>

                </TableHead>

                <TableBody>
                    {products?.length == 0 ?
                        <TableRow>
                            <TableCell colSpan={8} sx={{ '&:last-child td, &:last-child th': { border: 0 }, textAlign: 'center' }}>Nenhum registro encontrado na base de dados</TableCell>
                        </TableRow> :
                        paginatedData.map((product: any, index: number) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{product?.name}</TableCell>
                                <TableCell>{product?.responsible_name}</TableCell>
                                <TableCell>{product?.category_name}</TableCell>
                                <TableCell>{product?.quantity}</TableCell>
                                <TableCell>{formatToBRL(product?.price)}</TableCell>
                                <TableCell>{formatTimestamp(product?.updated_at)}</TableCell>
                                <TableCell>
                                    <div className="d-flex gap-2">
                                        <Update id={product?.id} />

                                        <Tooltip title='Excluir produto'>
                                            <Button color='error' variant='contained' onClick={() => deleteProduct(product?.id)}><DeleteIcon /> </Button>
                                        </Tooltip>
                                    </div>

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

        </TableContainer>


    </div>)
}
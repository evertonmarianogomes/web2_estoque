import React, { useState } from 'react';
import { Paper, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { TableContainer, Table, TableHead, TableBody, TableCell, TableRow, TablePagination } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import { formatToBRL, formatTimestamp } from '../Currency';

const Products = (props: any) => {
    const [open, setOpen] = React.useState(false);
    const [products, setProducts] = useState<Array<any>>(null);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { route, router, axios } = window;

    const handleClickOpen = () => {
        setOpen(true);
        findProducts();
    };

    const handleClose = () => {
        setOpen(false);
        setProducts(null);
    };

    const findProducts = async () => {
        const resp = await axios.get(route('categories.products', { id: props?.category?.id }));
        const data = await resp.data;
        setProducts(data);
    }

    const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return (<>
        <Tooltip title='Produtos da categoria'>
            <Button variant='contained' color='secondary' onClick={handleClickOpen} ><FormatListBulletedIcon /></Button>
        </Tooltip>


        <Dialog open={open} onClose={handleClose} PaperProps={{
            component: 'form',
            onSubmit: handleSubmitForm
        }} fullScreen={fullScreen} maxWidth={'md'} fullWidth={true} sx={{
            backdropFilter: 'blur(10px)',
            zIndex: 4
        }}
        >

            <DialogTitle>Produtos de "{props?.category?.name}"</DialogTitle>

            <DialogContent>
                {!products && <p>Carregando dados, aguarde...</p>}

                {products && <TableContainer component={Paper} sx={{ minWidth: 650 }} aria-label="Products By Category Table">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Preço Unitário</TableCell>
                                <TableCell>Quantidade</TableCell>
                                <TableCell>Atualizado em</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {products?.length == 0 && <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell colSpan={6} sx={{ textAlign: 'center' }} >Nenhum registro encontrado na base de dados</TableCell>
                            </TableRow>}


                            {products?.length > 0 &&
                                products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((product, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{product?.name}</TableCell>
                                        <TableCell>{product?.description}</TableCell>
                                        <TableCell>{formatToBRL(product?.price)}</TableCell>
                                        <TableCell>{product?.quantity}</TableCell>
                                        <TableCell>{formatTimestamp(product?.updated_at)}</TableCell>
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

                </TableContainer>}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>OK</Button>
            </DialogActions>

        </Dialog>
    </>);
}

export default Products;
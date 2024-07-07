import React, { useState } from 'react';
import { Fab, Paper, Tooltip, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, TextField, Button } from '@mui/material';
import { route } from 'ziggy-js';
import { router, usePage } from '@inertiajs/react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CurrencyInput from 'react-currency-masked-input';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';

const Edit = ({ product }) => {
    const { categories } = usePage().props as any;
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let objData = {
            name: formData.get('name') as string,
            price: Number(formData.get('price')),
            cost: Number(formData.get('cost_price')),
            category: Number(formData.get('category_id')),
            quantity: Number(formData.get('quantity')),
            description: formData.get('description') as string
        }

        router.put(route('products.update', { id: product?.id }), objData, {
            onBefore: () => {
                router.reload({ only: ['products', 'categories'] });
                handleClose();
            }
        });

    }

    return (<>
        <Tooltip title="Editar produto">
            <Button variant="contained" color="primary" onClick={handleClickOpen}><EditIcon /></Button>
        </Tooltip>

        <Dialog open={open} onClose={handleClose} scroll={'paper'}
            fullWidth
            fullScreen={fullScreen}
            sx={{
                backdropFilter: "blur(5px)",
            }}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmitForm
            }}>

            <DialogTitle>Editar Produto</DialogTitle>

            <DialogContent>
                <TextField variant='outlined' name='name' label='Nome' margin="dense" defaultValue={product?.name} required fullWidth sx={{ marginBottom: '2rem' }} />

                <FormControl fullWidth>
                    <InputLabel id="select_label">Categoria</InputLabel>
                    <Select
                        labelId="select_label"
                        id="category_id"
                        label="Categoria"
                        name='category_id'
                        defaultValue={product.category_id}
                    >

                        {categories.map((item, index) => (
                            <MenuItem key={index} value={item?.id}> {item?.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    sx={{ marginTop: '2rem' }}
                    fullWidth
                    label="Descrição"
                    multiline
                    maxRows={4}
                    variant='outlined'
                    name="description"
                    defaultValue={product?.description}
                />

                <div className="d-flex flex-wrap gap-2" style={{ marginTop: '2rem' }}>
                    <div className='col-12 col-lg'>
                        <label htmlFor="price" className='form-label'>Preço(R$)</label>
                        <CurrencyInput className="form-control" id='price' name='price' defaultValue={product?.price.toFixed(2)} required />
                    </div>

                    <div className='col-12 col-lg'>
                        <label htmlFor="cost_price" className='form-label'>Preço de custo (R$)</label>
                        <CurrencyInput className="form-control" id='cost_price' name='cost_price' defaultValue={product?.cost.toFixed(2)} required />
                    </div>
                </div>

                <div className="d-flex flex-wrap gap-2" style={{ marginTop: '2rem' }}>
                    <div className="col-12 col-lg">
                        <label htmlFor="quantity" className='form-label'>Quantidade</label>
                        <input className='form-control' type="number" min={0} defaultValue={product?.quantity} id="quantity" name="quantity" required />
                    </div>
                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit">Atualizar</Button>
            </DialogActions>
        </Dialog>

    </>);
}

export default Edit;
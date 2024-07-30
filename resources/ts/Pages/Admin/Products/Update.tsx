import React, { useState } from 'react';
import { Fab, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { Edit } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CurrencyInput from 'react-currency-masked-input'



export default function Update(props: any) {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState<any>(null);
    const [responsibles, setResponsibles] = useState(null);
    const [product, setProduct] = useState(null);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { route, router, axios } = window;

    const [value, setValue] = useState<number>(1);
    const min = 1;
    const max = 999;

    const formatNumberInput = (e: any) => {
        let value = parseInt(e.currentTarget.value, 10);
        if (value > max) value = max;
        if (value < min) value = min;
        setValue(value);
    }

    const handleClickOpen = () => {
        setOpen(true);
        findProduct();
    };

    const handleClose = () => {
        setOpen(false);
        setCategories(null);
        setResponsibles(null);
        setValue(1);
        setProduct(null);
    };


    const findProduct = async () => {
        let resp = await axios.get(route('products.edit', { id: props?.id }));
        let data = await resp?.data;

        setProduct(data?.product);
        setCategories(data?.categories);
        setResponsibles(data?.responsibles);

        setValue(Number(data?.product?.quantity));
    }

    const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let formData = new FormData(event.currentTarget);
        let data = {};
        formData.forEach((value, key) => data[key] = value);

        router.put(route('products.update', { id: product?.id }), data, {
            onSuccess: () => {
                handleClose();
            }
        });
    }

    return (<>
        <Tooltip title='Editar produto' placement="bottom">
            <Button variant='contained' color='primary' onClick={handleClickOpen}><Edit /></Button>
        </Tooltip>

        <Dialog open={open} onClose={handleClose} PaperProps={{
            component: 'form',
            onSubmit: handleSubmitForm
        }} fullScreen={fullScreen} maxWidth={'md'} fullWidth={true} sx={{
            backdropFilter: 'blur(10px)',
            zIndex: 4
        }}
        >
            <DialogTitle>Editar produto</DialogTitle>

            <DialogContent>
                {!product ? <p>Carregando dados, aguarde...</p> : <>
                    <TextField id="name" name='name' label="Nome do produto" variant="outlined" defaultValue={product?.name}
                        sx={{ my: '1rem', width: '100%' }} autoComplete='off' required />

                    <TextField id="description" name='description' label="Descrição" defaultValue={product?.description}
                        multiline maxRows={4} sx={{ my: '1rem', width: '100%' }} autoComplete='off' />

                    <section className='d-flex flex-wrap gap-2'>
                        <div className='mb-3 col-12 col-lg'>
                            <label htmlFor="price" className='form-label'>Preço (R$)</label>
                            <CurrencyInput name="price" id='price' className='form-control' placeholder="0.00" defaultValue={product?.price} min={0} required />
                        </div>

                        <div className='mb-3 col-12 col-lg' style={{ paddingTop: '0.3rem' }}>
                            <TextField name='quantity' required label='Quantidade' variant="outlined" margin="dense" type="number" value={value} onChange={formatNumberInput} fullWidth />
                        </div>
                    </section>


                    <section className='d-flex gap-2 flex-wrap'>
                        {categories && <FormControl fullWidth sx={{ marginTop: '1rem' }} className='col-12 col-lg'>
                            <InputLabel id="category_select_label">Categoria</InputLabel>
                            <Select
                                labelId="category_select_label"
                                id="category"
                                name="category"
                                label="Categoria"
                                defaultValue={product?.category_id}
                            >
                                {categories.map((category, index) => (
                                    <MenuItem key={index} value={category?.id}>{category?.name}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>}

                        {responsibles && <FormControl fullWidth sx={{ marginTop: '1rem' }} className='col-12 col-lg'>
                            <InputLabel id="responsible_select_label">Responsável</InputLabel>
                            <Select
                                labelId="responsible_select_label"
                                id="responsible"
                                name="responsible"
                                label="Responsável"
                                defaultValue={product?.responsible_id}
                            >
                                {responsibles.map((responsible, index) => (
                                    <MenuItem key={index} value={responsible?.id}>{responsible?.name}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>}

                    </section>


                </>}


            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit">Atualizar</Button>
            </DialogActions>

        </Dialog >
    </>);
}
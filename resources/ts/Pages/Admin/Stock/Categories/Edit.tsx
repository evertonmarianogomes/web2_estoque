import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Button, Tooltip, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Edit = ({ category }) => {
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

        router.put(route('categories.update', { id: category?.id }), { 'name': formData.get('category_name'), 'description': formData.get('description') }, {
            onBefore: () => {
                router.reload({ only: ['categories'] });
                handleClose();
            }
        });
    }


    return (<>
        <Tooltip title='Editar categoria'>
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

            <DialogTitle>Editar categoria</DialogTitle>
            <DialogContent>
                <TextField required variant="standard" margin="dense" type="text" fullWidth autoFocus label="Nome" name="category_name" value={category.name} />

                <TextField
                    sx={{ marginTop: '2rem' }}
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Descrição"
                    multiline
                    maxRows={4}
                    variant='standard'
                    name="description"
                    defaultValue={category?.description}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit">Atualizar</Button>
            </DialogActions>
        </Dialog>
    </>);
}

export default Edit;
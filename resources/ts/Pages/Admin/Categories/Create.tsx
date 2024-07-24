import React, { useState } from 'react';
import { Fab, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Create(props: any) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { route, router } = window;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget);

        router.post(route('categories.store'), data, {
            onSuccess: () => {
                handleClose();
            }
        });
    }


    return (<>
        <Tooltip title='Adicionar produto' placement="left">
            <Fab color="primary" aria-label="add" sx={{ position: 'absolute', zIndex: 1, bottom: 20, right: 20 }} onClick={handleClickOpen}>
                <Add />
            </Fab>

        </Tooltip>

        <Dialog open={open} onClose={handleClose} PaperProps={{
            component: 'form',
            onSubmit: handleSubmitForm
        }} fullScreen={fullScreen} maxWidth={'md'} fullWidth={true} sx={{
            backdropFilter: 'blur(10px)',
            zIndex: 4
        }}
        >

            <DialogTitle>Criar categoria</DialogTitle>

            <DialogContent>
                <TextField id="name" name='name' label="Nome da categoria" variant="outlined" sx={{ my: '1rem', width: '100%' }} autoComplete='off' required />

                <TextField id="description" name='description' label="Descrição" multiline maxRows={4} sx={{ my: '1rem', width: '100%' }} autoComplete='off' />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit">Cadastrar</Button>
            </DialogActions>

        </Dialog>
    </>);
}
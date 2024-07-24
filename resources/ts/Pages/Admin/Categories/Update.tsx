import React, { useState } from 'react';
import { Fab, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { Add, Edit } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles'

const Update = (props: any) => {
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


        router.put(route('categories.update', { id: props?.category?.id }), {
            name: data.get('name'),
            description: data.get('description')
        }, {
            onSuccess: () => {
                handleClose();
            }
        });

    }


    return (<>
        <Tooltip title='Editar categoria' placement="left">
            <Button color="primary" variant='contained' aria-label="add" onClick={handleClickOpen}>
                <Edit />
            </Button>

        </Tooltip>

        <Dialog open={open} onClose={handleClose} PaperProps={{
            component: 'form',
            onSubmit: handleSubmitForm
        }} fullScreen={fullScreen} maxWidth={'md'} fullWidth={true} sx={{
            backdropFilter: 'blur(10px)',
            zIndex: 4
        }}
        >

            <DialogTitle>Editar categoria</DialogTitle>

            <DialogContent>
                <TextField id="name" name='name' label="Nome da categoria" variant="outlined" sx={{ my: '1rem', width: '100%' }} autoComplete='off' defaultValue={props?.category?.name} required />

                <TextField id="description" name='description' label="Descrição" multiline maxRows={4} sx={{ my: '1rem', width: '100%' }} autoComplete='off' defaultValue={props?.category?.description} />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit">Atualizar</Button>
            </DialogActions>

        </Dialog>
    </>);
}

export default Update;
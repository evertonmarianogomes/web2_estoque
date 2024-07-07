import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Button, Tooltip, Dialog, DialogActions, DialogContent, Alert, DialogTitle } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DeleteIcon from '@mui/icons-material/Delete';

const Destroy = ({ category }) => {
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

        router.delete(route('categories.destroy', { id: category?.id }), {
            onBefore: () => {
                router.reload({ only: ['categories'] });
                handleClose();
            }
        });
    }


    return (<>
        <Tooltip title='Excluir categoria'>
            <Button variant="contained" color="error" onClick={handleClickOpen}><DeleteIcon /></Button>
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

            <DialogTitle>Aviso</DialogTitle>
            <DialogContent>
                <p>Certeza que deseja excluir a categoria <b>{category?.name}</b>?</p>

                <Alert severity='error'><b>Aviso:</b> Essa ação é irreversível</Alert>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit">Excluir</Button>
            </DialogActions>
        </Dialog>
    </>);
}

export default Destroy;
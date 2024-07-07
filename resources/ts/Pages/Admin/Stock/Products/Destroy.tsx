import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Button, Tooltip, Dialog, DialogActions, DialogContent, Alert, DialogTitle } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DeleteIcon from '@mui/icons-material/Delete';

const Destroy = ({ product }) => {
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

        router.delete(route('products.destroy', { id: product?.id }), {
            onBefore: () => {
                router.reload({ only: ['categories', 'products'] });
                handleClose();
            }
        });
    }


    return (<>
        <Tooltip title='Excluir produto'>
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
                <p>Certeza que deseja excluir a categoria <b>{product?.name}</b>?</p>

                <Alert severity='error'><b>Aviso:</b> Essa ação é irreversível</Alert>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit" color='error'>Excluir</Button>
            </DialogActions>
        </Dialog>
    </>);
}

export default Destroy;
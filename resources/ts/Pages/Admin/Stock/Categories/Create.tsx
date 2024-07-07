import React, { useState } from 'react';
import { Fab, Paper, Tooltip, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { route } from 'ziggy-js';
import { router } from '@inertiajs/react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Create = (props) => {
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



        router.post(route('categories.store'), { 'name': formData.get('category_name'), 'description': formData.get('description') }, {
            onBefore: () => {
                router.reload({ only: ['categories'] });
                handleClose();
            }
        });
    }

    return (<>
        <Tooltip title="Adicionar categoria">
            <Fab color="secondary" aria-label="add" sx={{
                zIndex: 2,
                position: 'absolute',
                bottom: 30,
                right: 20,
            }} onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
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

            <DialogTitle>Adicionar categoria</DialogTitle>
            <DialogContent>
                <TextField required variant="standard" margin="dense" type="text" fullWidth autoFocus label="Nome" name="category_name" />

                <TextField
                    sx={{ marginTop: '2rem' }}
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Descrição"
                    multiline
                    maxRows={4}
                    variant='standard'
                    name="description"
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit">Adicionar</Button>
            </DialogActions>
        </Dialog>

    </>);
}

export default Create;
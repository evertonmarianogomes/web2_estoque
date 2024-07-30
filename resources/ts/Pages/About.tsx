import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery, useTheme, MenuItem, Typography } from '@mui/material';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';


const About = (props: any) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { type, app } = props;


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (<>
        {type == 'lg' ? <Button sx={{ my: 2, color: 'inherit', display: 'block' }} onClick={handleClickOpen}>Sobre</Button> :
            <MenuItem onClick={() => {
                handleClickOpen();
                props?.handleCloseNavMenu();
            }}>
                <Typography textAlign="center">Sobre</Typography>
            </MenuItem>
        }



        <Dialog open={open} onClose={handleClose} fullScreen={fullScreen} maxWidth={'md'} fullWidth={true} sx={{
            backdropFilter: 'blur(10px)',
            zIndex: 4,
            "& .MuiDialog-container": {
                alignItems: "flex-start"
            }
        }}
        >

            <DialogTitle>Sobre</DialogTitle>

            <DialogContent>
                <h4 className='text-center'><LocalPizzaIcon /> {app?.appName} <small>{app?.appRelease}</small> </h4>


                <Typography variant='body1' sx={{ mt: '1rem' }}>Pizzaria Web 2 foi desenvolvido para auxiliar na gestão de uma promoções e eventos, proporcionando uma ferramenta eficaz para o tesoureiro apresentar os resultados para a comunidade.</Typography>
                <hr />

                <section className='mt-3'>
                    <p>Este projeto foi desenvolvido com a ajuda de várias ferramentas e recursos. Gostaríamos de agradecer especialmente:</p>
                    <ul>
                        <ul>
                            <li><a href="https://www.openai.com/" target="_blank">OpenAI</a> pelo desenvolvimento do <a href="https://chat.openai.com/" target="_blank">ChatGPT</a>, que forneceu assistência durante o desenvolvimento do projeto.</li>
                            <li><a href="https://getbootstrap.com/" target="_blank">Bootstrap</a> por fornecer uma estrutura de front-end poderosa e flexível.</li>
                            <li><a href="https://reactjs.org/" target="_blank">React</a> por proporcionar uma biblioteca de JavaScript eficiente para construir interfaces de usuário.</li>
                            <li><a href="https://laravel.com/" target="_blank">Laravel</a> por ser um framework PHP robusto para o desenvolvimento de aplicações web.</li>
                            <li><a href="https://mui.com/" target="_blank">React MUI</a> (Material-UI) por oferecer uma biblioteca de componentes de interface de usuário para React.</li>
                            <li><a href="https://inertiajs.com/" target="_blank">Inertia.js</a> por permitir a construção de aplicações web monolíticas modernas sem perder a familiaridade do desenvolvimento clássico.</li>
                        </ul>
                    </ul>
                </section>

                <Typography sx={{ textAlign: 'center', marginTop: '1em' }} className='text-muted'>v{app?.appVersion} - {app?.appBranch}</Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>OK</Button>
            </DialogActions>

        </Dialog >


    </>)
}


export default About;
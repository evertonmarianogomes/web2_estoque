// MD Sales View
import React from 'react';
import { Card, CardContent, Button, Alert } from '@mui/material';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import TextField from '@mui/material/TextField';
import ThemeSwitch from './Components/ThemeSwitch';


const Login = (props) => {
    const { app } = props;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        alert('O login está desabilitado');
        // let formData = new FormData(e.target as HTMLFormElement);
        // let data = {
        //     login: formData.get('login'),
        //     password: formData.get('password')
        // }

        // router.post(route('app.validateLogin'), data);

    }

    return (<>
        <div className="container pt-3">
            <div className="d-flex mt-3 gap-3 flex-wrap justify-content-center">
                {/* <Card className="col-12 col-lg-6" >
                    <CardContent>

                        <section>
                            <header className="d-flex justify-content-between">
                                <div className="flex-grow-1">
                                    <small><i className={app.appFaIcon}></i>  {app.appName} {app.appRelease}</small>
                                    <h3>Acesso</h3>
                                </div>

                                <ThemeSwitch />
                            </header>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-2 mt-4">
                                    <TextField id="login" label="Login" variant="standard" name='login' sx={{ width: '100%' }} />
                                </div>

                                <div className="mt-4 mb-2">
                                    <TextField type='password' id="password" label="Senha" variant="standard" name='password' sx={{ width: '100%' }} />

                                </div>

                                <div className="mt-4">
                                    <Button variant="contained" color="primary" type='submit'>Entrar</Button>
                                </div>
                            </form>
                        </section>
                    </CardContent>
                </Card> */}

                <Alert severity='error'><b>Aviso:</b> Essa é uma branch de reset. Ocorreu um erro e o código da versão <b>1.00.1042-pre-alpha2</b> foi perdido e não foi possivel a sua recuperação.
                    <br />Todos os recursos estão desabilitados. Pedimos desculpas pelo incoveniente. Em breve a nova versão Alpha 2 estará disponível
                </Alert>
            </div>
        </div >

    </>);
}




export default Login;
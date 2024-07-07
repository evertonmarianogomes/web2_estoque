// MD Sales View
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Box, CardActions, Button, Typography } from '@mui/material';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import TextField from '@mui/material/TextField';
import ThemeSwitch from './Components/ThemeSwitch';


const Login = (props) => {
    const { app } = props;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let formData = new FormData(e.target as HTMLFormElement);
        let data = {
            login: formData.get('login'),
            password: formData.get('password')
        }

        router.post(route('app.validateLogin'), data);

    }

    return (<>
        <div className="container pt-3">
            <div className="d-flex mt-3 gap-3 flex-wrap justify-content-center">
                <Card className="col-12 col-lg-6" >
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

                        <CardActions>

                            {/* <Button variant="contained" color="primary" onClick={() => router.visit(route('sales.create'))}>Entrar</Button> */}
                        </CardActions>
                    </CardContent>


                </Card>


            </div>
        </div >

    </>);
}




export default Login;
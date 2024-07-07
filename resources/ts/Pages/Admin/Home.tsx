import React from 'react';
import { Button, Typography } from '@mui/material';
import { Card, CardContent, Box, CardActions } from '@mui/material';

import MDLayout from '../MDLayout';

const Home = (props) => {
    const { user } = props;
    return (<>
        <div className="container pt-3">
            <Typography variant="h5" gutterBottom>
                Bem vindo {user.first_name}
            </Typography>
            <hr />

            <div className="d-flex mt-3 gap-3 flex-wrap">
                <h4 className='col-12'>Novidades</h4>
                <Card className="col-12 col-lg" >
                    <CardContent>
                        <h4>Material Design</h4>
                        <p>Novo visual usando o Material UI para React. Visual otimizado para dispositivos móveis</p>
                        <CardActions>
                            <Button variant="contained" color="primary">Iniciar</Button>
                        </CardActions>
                    </CardContent>


                </Card>

                <Card className="col-12 col-lg" >
                    <CardContent>
                        <h4>Funcionalidades</h4>
                        <ul>
                            <li>Vendas com várias formas de pagamento</li>
                            <li>Relatório (em construção)</li>
                        </ul>
                        <CardActions>
                            <Button variant="contained" color="primary">Iniciar</Button>
                        </CardActions>
                    </CardContent>

                </Card>

            </div>

        </div >

    </>);
}


Home.layout = (page: any) => <MDLayout children={page} />


export default Home;
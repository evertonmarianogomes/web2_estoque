// MD Sales View
import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import MDLayout from '../../MDLayout';
import { Card, CardContent, Box, CardActions, Button } from '@mui/material';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';


const Index = (props) => {
    return (<>
        <div className="container pt-3">
            <Alert severity="info">Vendas - Esta tela está em construção</Alert>

            <div className="d-flex mt-3 gap-3 flex-wrap">
                <h4 className='col-12'>Opções disponíveis</h4>
                <Card className="col-12 col-lg" >
                    <CardContent>
                        <section>
                            <h4>Vendas</h4>
                            <p>Confira as opções disponíveis</p>
                            <div className="d-flex gap-4 flex-column">
                                <Button variant="contained" color="primary" onClick={() => router.visit(route('sales.create'))}>Iniciar Venda</Button>
                                <Button variant="contained" color="primary" onClick={() => router.visit(route('sales.create'))}>Histórico de Vendas</Button>
                            </div>

                        </section>


                    </CardContent>
                </Card>



                <Card className="col-12 col-lg" >
                    <CardContent>
                        <section style={{ height: '8rem' }}>
                            <h4>Relatórios</h4>
                            <p>Gere seus relatórios de venda clicando no botão abaixo</p>
                        </section>


                        <CardActions>
                            <Button variant="contained" color="primary" onClick={() => router.visit(route('reports.index'))}>Iniciar</Button>
                        </CardActions>
                    </CardContent>

                </Card>

            </div>
        </div >

    </>);
}


Index.layout = (page: any) => <MDLayout children={page} />

export default Index;
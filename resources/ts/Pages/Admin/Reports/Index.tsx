// MD Sales View
import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import MDLayout from '../../MDLayout';
import { Card, CardContent, Box, CardActions, Button } from '@mui/material';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import DataTable from './Table';
import { formatToBRL } from '../Currency';

const Index = (props) => {
    return (<>
        <div className="container pt-3">
            {/* <Alert severity="info" sx={{ mb: '2rem' }}>Relatórios - Esta tela está em construção</Alert> */}

            <h4><Button color='secondary' onClick={(e) => router.visit(route('sales.index'))} variant="contained">
                <KeyboardArrowLeftIcon /></Button> Relatórios</h4>
            <hr />

            <Card className="col-12 col-lg mb-3" >
                <CardContent>
                    <section>
                        <h4>Caixa</h4>
                        <p>Saldo Total: {formatToBRL(150.57)} </p>
                        <p>Saldo em caixa: {formatToBRL(150.56)} </p>
                        <p>Saldo a receber: {formatToBRL(0.01)} </p>
                    </section>

                    <CardActions>
                        <Button variant="contained" color="primary">Detalhes</Button>
                    </CardActions>
                </CardContent>


            </Card>
            <DataTable />
        </div>

    </>);
}


Index.layout = (page: any) => <MDLayout children={page} />

export default Index;
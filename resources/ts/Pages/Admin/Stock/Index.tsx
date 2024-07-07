// MD Sales View
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Button } from '@mui/material';
import MDLayout from '../../MDLayout';
import { route } from 'ziggy-js';
import { router } from '@inertiajs/react';


const Index = (props) => {

    return (<>
        <div className="container pt-3">

            <div className="d-flex gap-2 justify-content-center mt-2 flex-wrap">
                <Card className='col-12 col-lg'>
                    <CardContent sx={{ height: 'max-content' }}>
                        <h4>Categorias</h4>
                        <hr />
                        <p>Gerencie as categorias de seus produtos</p>
                        <CardActions>
                            <Button variant='contained' color='primary' onClick={() => router.visit(route('categories.index'))}>Iniciar</Button>
                        </CardActions>

                    </CardContent>
                </Card>
                <Card className='col-12 col-lg'>
                    <CardContent >
                        <h4>Produtos</h4>
                        <hr />
                        <p>Gerencie os produtos disponíveis para venda</p>

                        <CardActions>
                            <Button variant='contained' color='primary' onClick={() => router.visit(route('products.index'))}>Iniciar</Button>
                        </CardActions>
                    </CardContent>
                </Card>
            </div>
        </div>

    </>);
}


Index.layout = (page: any) => <MDLayout children={page} />

export default Index;
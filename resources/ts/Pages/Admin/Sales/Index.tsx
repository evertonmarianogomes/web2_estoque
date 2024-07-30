import React from 'react';
import { Button, Card, CardContent, CardActions } from '@mui/material';
import { Link } from '@inertiajs/react';

function Index(props: any) {
    return (
        <div className='container pt-3'>
            <div className="d-flex flex-wrap gap-2">
                <Card className='col-12 col-lg'>
                    <CardContent>
                        <section style={{ height: '8rem' }}>
                            <h3>Vendas</h3>
                            <p>Pronto para iniciar a venda? Clique no botão abaixo para iniciar o processo</p>
                        </section>
                        <Link href={window.route('sales.create')}>
                            <Button color='primary' variant='contained'>Iniciar</Button>
                        </Link>
                    </CardContent>

                </Card>

                <Card className='col-12 col-lg'>
                    <CardContent>
                        <section style={{ height: '8rem' }}>
                            <h3>Formas de Pagamento</h3>

                        </section>

                        <Link href={window.route('payment_methods.index')}>
                            <Button color='primary' variant='contained'>Iniciar</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Index;
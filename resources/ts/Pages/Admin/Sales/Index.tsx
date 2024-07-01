import React, { useState } from 'react';
import { router, usePage, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { formatCurrency, MoneyInput } from '../../Components/CurrencyInput';


const Index = () => {
    const [amount, setAmount] = useState('');


    return (<>
        <div className="container pt-3">
            <h3>Vendas</h3>
            <hr />

            <div className="col-12 d-flex flex-wrap gap-2">
                <div className="col-12 col-md col-lg" style={{ height: '10rem' }}>
                    <Link href={route('sales.create')} className='d-flex flex-column gap-2 align-items-center h-100 justify-content-center btn btn-primary'>
                        <i className="fa-solid fa-cash-register" style={{ fontSize: '4rem' }}></i>
                        <h5>Iniciar Venda</h5>
                    </Link>
                </div>

                <div className="col-12 col-md col-lg">
                    <Link href='#' className='d-flex flex-column gap-2 align-items-center h-100 justify-content-center btn btn-secondary' style={{ height: '10rem' }}>
                        <i className="fa-regular fa-credit-card" style={{ fontSize: '4rem' }}></i>
                        <h5>Formas de Pagamento</h5>
                    </Link>

                </div>

                <div className="col-12 col-md col-lg box-title">
                    <Link href={route('reports.index')} className='d-flex flex-column gap-2 align-items-center h-100 justify-content-center btn btn-success' style={{ height: '10rem' }}>
                        <i className="fa-solid fa-print" style={{ fontSize: '4rem' }}></i>
                        <h5>Relatório</h5>
                    </Link>

                </div>
            </div>



        </div>
    </>);
}



export default Index;
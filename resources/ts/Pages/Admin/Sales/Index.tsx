import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { formatCurrency, MoneyInput } from '../../Components/CurrencyInput';


const Index = () => {
    const [amount, setAmount] = useState('');


    return (<>
        <div className="container pt-3">
            <h3>Vendas</h3>
            <hr />

            <div className='alert alert-warning'><i className="fa-solid fa-triangle-exclamation"></i> Em construção</div>

        </div>
    </>);
}



export default Index;
import React, { useRef, useState } from 'react'
import { formatToBRL } from '../Currency';
import CurrencyInput from 'react-currency-masked-input';
import { Button } from '@mui/material';

const PayLater = (props: any) => {
    const { amount, setAmount, handlePaymentForm } = props;
    const { paymentList, setPaymentList } = props.paymentList;

    const submitValue = (e: any) => {
        e.preventDefault();
        let data = new FormData(e.target);
        let value = Number(data.get('myInput'));
        if (value <= amount) {
            let aux = amount - value;
            setAmount(aux);
            setPaymentList(oldArray => [...oldArray, {
                id: 4,
                name: 'Pagar depois',
                value: value
            }]);

            handlePaymentForm(0);
        }
    }

    return (
        <>
            <p>Pagar depois - {formatToBRL(amount)}</p>
            <form onSubmit={submitValue}>
                <div className="form-floating mb-3">
                    <CurrencyInput name="myInput" required id="floatingInput" className="form-control" max={amount} min={0.01} />
                    <label htmlFor="floatingInput">Insira o valor</label>
                </div>
                <Button variant='contained' color='success' className='my-2' type="submit">Registrar</Button>
            </form>

        </>
    )
}


export default PayLater;
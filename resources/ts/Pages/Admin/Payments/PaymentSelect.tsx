import React, { useState } from 'react'
import Button from '@mui/material/Button';
import PayLater from './PayLater';

const PaymentSelect = (props) => {
    const { amount, setAmount, handlePaymentForm } = props;
    const { paymentList, setPaymentList } = props.paymentList;

    return (<>
        {props.paymentForm == 1 && <p>Pix</p>}
        {props.paymentForm == 2 && <p>Cartão de Crédito / Débito </p>}
        {props.paymentForm == 3 && <p>Dinheiro</p>}
        {props.paymentForm == 4 && <PayLater amount={amount} setAmount={setAmount} handlePaymentForm={handlePaymentForm} paymentList={props.paymentList} />}
        <Button variant="contained" color="error" onClick={() => props.handlePaymentForm(0)}>Cancelar pagamento</Button>
    </>);
}


export default PaymentSelect;
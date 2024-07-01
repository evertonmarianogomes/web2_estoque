import React, { useState } from "react";
import { Alert } from "reactstrap";
import { formatCurrency } from "../../Components/CurrencyInput";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import PaymentSelect from "./PaymentSelect";
import { Typography } from "@mui/material";
import { formatToBRL } from "../Currency";



function PagePayment(props) {
    const { handlePage, amount } = props as any;
    const [remaining, setRemaining] = useState(amount);
    const [paymentList, setPaymentList] = useState([]);
    const [paymentForm, setPaymentForm] = useState(0);


    return (<>
        <div className="container pt-3">
            <div className="col-12 d-flex gap-2 flex-wrap">
                <Button variant="contained" onClick={() => handlePage("cashier")} title="Voltar para dados da venda" className="col-12 col-md-auto col-lg-auto">
                    <i className="fa-solid fa-angle-left"></i></Button>
                <h3 className="col-12 col-md col-lg">Pagamento</h3>
            </div>

            <div className="col-12 mt-3 flex-wrap d-flex gap-5 flex-wrap">
                <div className="col-12 col-md-12 col-lg">
                    {remaining > 0 && paymentForm == 0 && <div>
                        <p>Selecione a forma de pagamento</p>
                        <div className="d-flex gap-3 flex-wrap">
                            <Button color="primary" variant="contained" className="col-12 col-lg d-flex gap-2 p-3" onClick={() => setPaymentForm(1)}><i className="fa-brands fa-pix"></i> Pix</Button>
                            <Button color="primary" variant="contained" className="col-12 col-lg d-flex gap-2 p-3" onClick={() => setPaymentForm(2)}><i className="fa-solid fa-credit-card"></i> Cartão</Button>
                            <Button color="primary" variant="contained" className="col-12 col-lg d-flex gap-2 p-3" onClick={() => setPaymentForm(3)}><i className="fa-solid fa-money-bill"></i> Dinheiro</Button>
                            <Button color="primary" variant="contained" className="col-12 col-lg d-flex gap-2 p-3" onClick={() => setPaymentForm(4)}><i className="fa-solid fa-hand-holding-dollar"></i> Pagar depois</Button>

                        </div>
                    </div>}

                    {paymentForm != 0 && <PaymentSelect
                        paymentForm={paymentForm}
                        handlePaymentForm={setPaymentForm}
                        amount={remaining}
                        setAmount={setRemaining}
                        paymentList={{ paymentList: paymentList, setPaymentList: setPaymentList }}
                    />}


                </div>
                <div className="col-12 col-lg-4">
                    <Card className="material-card">
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom id="card-title">Pagamento</Typography>

                            <p>Total: <b>{formatToBRL(amount)}</b> </p>
                            <p>Falta pagar: <b>{formatToBRL(remaining)}</b></p>

                            <div className="mt-3">
                                <small>Formas de Pagamento</small>
                                <ul>
                                    {paymentList.length > 0 && paymentList.map((item) => (
                                        <li>{item.name} ----- {formatToBRL(item?.value)}</li>
                                    ))}
                                </ul>
                            </div>

                            <Button variant="contained" color="success" disabled={remaining > 0.0}>Finalizar</Button>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    </>);
}

export default PagePayment;
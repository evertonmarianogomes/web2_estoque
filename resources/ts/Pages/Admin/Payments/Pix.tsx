import React, { useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { formatCurrency, MoneyInput } from "../../Components/CurrencyInput";
import { Button } from "reactstrap";
import alertify from 'alertifyjs';
import { route } from 'ziggy-js';


const Pix = (props) => {
    const [value, setValue] = useState(0);

    const getQRCode = (token: string, amount = 0.0) => {
        let data = JSON.stringify({ amount: amount });

        return fetch(route('pix.getCode'), {
            method: 'POST',
            body: data,
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token }
        });

    }


    const submitPixForm = (e: React.FormEvent) => {
        e.preventDefault();
        if ((value / 100) > props.remaining.remaining) {
            alertify.alert('Valor inserido maior que o valor da venda. Para receber troco, altere a forma de pagamento para Dinheiro')
        } else {
            let csrf_token = document.getElementsByTagName("meta").namedItem('csrf-token').content;

            getQRCode(csrf_token, value).then(resp => resp.json()).then(resp => {
                alertify.confirm(ReactDOMServer.renderToString(<>
                    <p>Pague  para Clemer Gomes</p>
                    <div className="alert alert-warning">Operador, confirme o pagamento no App do Mercado Pago e clique em OK</div>
                    <img src={resp.qrCode} alt="Imagem do QR Code" style={{
                        width: '300px',
                        height: '300px'
                    }} />
                </>), () => {
                    // ON OK
                }, () => {
                    // ON CANCEL
                    alertify.alert("Operação cancelada pelo operador")
                });
            })

        }

    }

    return (<div>
        <Button onClick={() => props.paymentForm.setPaymentForm(0)}>Voltar</Button>
        <p>Insira o valor do Pix e clique em <strong>Gerar QR Code</strong></p>
        <form onSubmit={submitPixForm}>
            <div className="mb-2 d-flex gap-2 flex-wrap">
                <div className="col-12 col-md-4 col-lg">
                    <MoneyInput value={value} onChange={setValue} />
                </div>
                <Button color="success" className="col-12 col-md-4 col-lg-4"><i className="fa-solid fa-qrcode"></i> Gerar QR Code</Button>
            </div>
        </form>
    </div>);
}


export default Pix;
import React, { useState, useRef } from 'react';
import { Paper, Dialog, DialogActions, DialogContent, DialogTitle, Button, useTheme, useMediaQuery, Alert } from '@mui/material';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { formatToBRL } from '../Currency';
import CurrencyInput from 'react-currency-masked-input';
import ReactDOMServer from 'react-dom/server';
import alertify from 'alertifyjs';

const Finish = ({ cart, amount }) => {
    const { axios, route } = window;

    const [open, setOpen] = useState(false);
    const [remaining, setRemaining] = useState<number>();
    const [total, setTotal] = useState(0);

    const [paymentMethods, setPaymentsMethods] = useState([]);
    const [paymentSelected, setPaymentSelected] = useState(1);
    const [paymentList, setPaymentList] = useState([]);

    const paymentValueRef = useRef<HTMLInputElement>();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
        setRemaining(amount);
        findAllPaymentMethods();
    };

    const handleClose = () => {
        setOpen(false);
        setPaymentsMethods([]);
        setPaymentList([]);
        setTotal(0);
        setRemaining(0);
    };

    const findAllPaymentMethods = async () => {
        const resp = await axios.post(route('paymentMethods.all'));
        const data = await resp.data;
        setPaymentsMethods(data);
    }

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // alert('Em construção');
        console.dir({
            clientName: new FormData(e.currentTarget).get('client_name'),
            saleTotalPaid: total,
            saleAmount: amount,
            products: cart,
            paymentList,
        });
    }

    const handleAddPaymentMethod = (e: React.MouseEvent<HTMLElement>): void => {
        e.preventDefault();
        let value = Number(paymentValueRef.current.value);
        let paymentMethod = getPaymentMethod(paymentSelected);

        if (paymentMethod?.id != 4 && (value > amount || value > remaining)) {
            alert('O valor inserido é maior do que a venda ou restante!');
        } else if (paymentMethod?.id == 4) {
            addMoneyToPaymentList(value, paymentMethod);
        } else if (paymentMethod.id == 2 || paymentMethod?.id == 3) {
            addCartToPaymentList(value, paymentMethod);
        } else {
            setPaymentList(paymentList => [...paymentList, {
                id: paymentMethod?.id,
                name: paymentMethod?.name,
                addRate: paymentMethod?.add_rate,
                value: value,
                fees: 0
            }]);

            setTotal(total => total + value);

            setRemaining(remaining => parseFloat((remaining - value).toFixed(2)));
        }
    }


    const addCartToPaymentList = (value: number, payment: any) => {
        const valorVenda = value; // Valor da venda em reais
        const taxa = Number(payment?.interest_rate) / 100; // Taxa em percentual (4,98%)
        // Calcula o valor a ser cobrado do cliente
        const valorCobrar = valorVenda / (1 - taxa);

        // Calcula o valor líquido recebido após a taxa
        const valorLiquido = valorCobrar * (1 - taxa);

        setPaymentList(paymentList => [...paymentList, {
            id: payment?.id,
            name: payment?.name,
            addRate: payment?.add_rate,
            value: value,
            fees: valorCobrar - valorLiquido
        }]);


        if (payment?.add_rate == 1) {
            alertify.alert('Aviso', ReactDOMServer.renderToStaticMarkup(<>
                <p>Forma de pagamento: <b>{payment?.name}</b></p>
                <p>Valor a cobrar: <b> {formatToBRL(valorCobrar)}</b></p>
            </>));

        }

        setRemaining(remaining => parseFloat((remaining - value).toFixed(2))); 7
        setTotal(total => total + value);
    }


    const addMoneyToPaymentList = (value: number, payment: any) => {
        setPaymentList(paymentList => [...paymentList, {
            id: payment?.id,
            name: payment?.name,
            addRate: 0,
            value: value,
            fees: 0
        }]);

        setRemaining(remaining => parseFloat((remaining - value).toFixed(2)));
        setTotal(total => total + value);

    }

    const getPaymentMethod = (id: number): any => {
        return paymentMethods.find(method => method?.id == id);
    }


    return (<>
        <Button variant="contained" color="success" disabled={amount == 0} onClick={handleClickOpen}>Finalizar Venda</Button>

        <Dialog open={open} onClose={handleClose} scroll={'paper'}
            fullWidth
            fullScreen={fullScreen}
            maxWidth='lg'
            sx={{
                backdropFilter: "blur(5px)",
            }}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmitForm
            }}>

            <DialogTitle>Finalizar Venda</DialogTitle>

            <DialogContent>
                {remaining <= 0 && <Alert sx={{ marginBottom: '1rem' }}>Pagamento finalizado com sucesso, pronto para registrar.</Alert>}
                <div className='d-flex flex-wrap gap-2'>

                    <Paper className={`p-3 col-12 col-lg ${remaining <= 0 && 'd-none'} `}>
                        {paymentMethods.length == 0 && <p style={{ marginTop: '1rem' }}>Carregando dados, aguarde...</p>}

                        {paymentMethods.length > 0 && remaining > 0 && <>
                            <FormControl>
                                <FormLabel id="payment_method_label">Forma de Pagamento</FormLabel>

                                <RadioGroup
                                    aria-labelledby="payment_method_label"
                                    defaultValue={1}
                                    onChange={(e) => setPaymentSelected(Number(e.currentTarget.value))}
                                >
                                    {paymentMethods.map((item, index) => (
                                        <FormControlLabel key={index} value={item?.id} control={<Radio />}
                                            label={item?.name} />
                                    ))}

                                </RadioGroup>
                            </FormControl>

                            <div className="d-flex gap-2 align-items-end mt-3">
                                <div className="col-6">
                                    <label className='form-label'>Valor (R$)</label>
                                    <CurrencyInput className='form-control' min={0.01} ref={paymentValueRef} defaultValue={'0.01'} />
                                </div>

                                <Button variant='contained' sx={{ height: '65%' }} onClick={handleAddPaymentMethod}>Adicionar</Button>
                            </div>
                        </>}

                    </Paper>

                    <Paper className={`p-3 col-12 col-lg-4`}>
                        <p>Total: <b>{formatToBRL(amount)}</b></p>
                        {/* <p>Falta Pagar: <b>{formatToBRL(remaining)}</b></p> */}
                        {remaining >= 0 ? <p>Falta Pagar: <b>{formatToBRL(remaining)}</b></p> :
                            <p>Troco: <b>{formatToBRL(remaining * -1)}</b></p>
                        }
                        <p>Total Pago: <b>{formatToBRL(total)}</b></p>
                        <hr />

                        <p>Metodos de Pagamento</p>
                        <ul>
                            {paymentList.map((payment, index) => (
                                <li key={index} className='mb-4'>
                                    {payment?.addRate == 1 ? <>
                                        <b>{payment?.name} ------------ {formatToBRL(payment?.value + payment?.fees)}</b><br />
                                    </> :
                                        <b>{payment?.name} ------------ {formatToBRL(payment?.value)} <br /></b>}

                                    <small>Valor: <b>{formatToBRL(payment?.value)}</b> </small><br />
                                    {payment?.addRate == 1 && <small>Taxas: <b>{formatToBRL(payment?.fees)}</b></small>}
                                </li>
                            ))}
                        </ul>
                    </Paper>

                    {remaining <= 0 &&
                        <div className='col-12 col-lg-5'>
                            <label htmlFor="client_name" className='form-label'>Nome do Cliente</label>
                            <input type="text" id='client_name' name='client_name' className='form-control' required
                                autoComplete='off'
                                aria-autocomplete='none'
                                placeholder='Digite o nome do cliente'
                                aria-description="field that receives the customer's name via keyboard" />
                        </div>}
                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit" disabled={remaining > 0}>Registrar</Button>
            </DialogActions>
        </Dialog >
    </>);
}

export default Finish;
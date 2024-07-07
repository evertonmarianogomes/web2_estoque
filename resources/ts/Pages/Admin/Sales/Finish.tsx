import React, { useState, useRef } from 'react';
import { Paper, Tooltip, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, TextField, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { formatToBRL } from '../Currency';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CurrencyInput from 'react-currency-masked-input';
import { PaymentMethods } from './PaymentMethods';
import alertify from 'alertifyjs';
import ReactDOMServer from 'react-dom/server';


const Finish = ({ cart, amount }) => {
    const [open, setOpen] = useState(false);
    const [remaining, setRemaining] = useState<number>();
    const [total, setTotal] = useState(0);

    const [paymentSelected, setPaymentSelected] = useState(1);
    const paymentValueRef = useRef();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
        setRemaining(amount);

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
    }

    const calcValue = () => {

    }


    const handleAddPaymentMethod = (e: React.MouseEvent<HTMLElement>): void => {
        e.preventDefault();
        let value = Number((paymentValueRef.current as any).value);


        if (paymentSelected != 4 && value > remaining) {
            alert('Valor inserido maior que o valor de venda/restante');
        } else if (paymentSelected == 2 || paymentSelected == 3) {
            alertify.confirm('Atenção', 'Confirm Message', function () { alertify.success('Forma de pagamento adicionada com sucesso') }
                , function () { alertify.error('Cancel') });
        }
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
                <div className='d-flex flex-wrap gap-2'>

                    <Paper className='p-3 col-12 col-lg'>
                        <FormControl>
                            <FormLabel id="payment_method_label">Forma de Pagamento</FormLabel>
                            <RadioGroup
                                aria-labelledby="payment_method_label"
                                defaultValue={1}
                                onChange={(e) => setPaymentSelected(Number(e.currentTarget.value))}
                            >
                                {PaymentMethods.map((item, index) => (
                                    <FormControlLabel key={index} value={item?.id} control={<Radio />}
                                        label={item?.name} />
                                ))}

                            </RadioGroup>
                        </FormControl>

                        <div className="d-flex gap-2 align-items-end mt-3">
                            <div className="col-6">
                                <label htmlFor="value_pay" className='form-label'>Valor (R$)</label>
                                <CurrencyInput className='form-control' min={0.01} ref={paymentValueRef} defaultValue={'0.01'} />
                            </div>

                            <Button variant='contained' sx={{ height: '65%' }} onClick={handleAddPaymentMethod}>Adicionar</Button>
                        </div>
                    </Paper>

                    <Paper className='p-3 col-12 col-lg-4'>
                        <p>Total: <b>{formatToBRL(amount)}</b></p>
                        <p>Falta Pagar: <b>{formatToBRL(remaining)}</b></p>
                        <p>Total Pago: <b>{formatToBRL(total)}</b></p>
                        <hr />

                        <p>Metodos de Pagamento</p>

                    </Paper>

                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit">Registrar</Button>
            </DialogActions>
        </Dialog >
    </>);
}

export default Finish;
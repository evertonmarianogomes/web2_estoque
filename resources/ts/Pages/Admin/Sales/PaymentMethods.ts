type PaymentMethods = {
    id: number,
    name: string,
    interest_rate: number
}


export const PaymentMethods: Array<PaymentMethods> = [
    { id: 1, name: 'Pix', interest_rate: 0.00 },
    { id: 2, name: 'Cartão de Crédito', interest_rate: 1.00 },
    { id: 3, name: 'Cartão de Débito', interest_rate: 0.50 },
    { id: 4, name: 'Dinheiro', interest_rate: 0.00 },
    { id: 5, name: 'Pagar Depois', interest_rate: 0.00 }
]



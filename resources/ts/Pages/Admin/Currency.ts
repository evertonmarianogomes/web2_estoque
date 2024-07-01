const formatToBRL = (value: any): string => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}


export {formatToBRL}
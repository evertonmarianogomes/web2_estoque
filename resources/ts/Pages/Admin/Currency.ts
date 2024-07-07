import moment from 'moment';

const formatToBRL = (value: any): string => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

const formatTimestamp = (value: any): string => {
    return moment(value).format('DD/MM/YYYY - HH:mm:ss');
}


export { formatToBRL, formatTimestamp }
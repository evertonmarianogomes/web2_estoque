const formatCurrency = (value) => {
    if (!value) return '';

    // Remove tudo que não for dígito
    value = value.replace(/\D/g, '');

    // Adiciona os centavos
    value = (value / 100).toFixed(2);

    // Formata o valor em BRL
    value = value
        .toString()
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `R$ ${value}`;
};

const MoneyInput = ({ value, onChange }) => {
    const handleChange = (e) => {
        let inputValue = e.target.value;

        // Remove tudo que não é dígito
        inputValue = inputValue.replace(/\D/g, '');

        // Atualiza o estado do valor bruto
        onChange(inputValue);
    };

    return (
        <input
            type="text"
            value={formatCurrency(value)}
            onChange={handleChange}
            placeholder="R$ 0,00"
            className='form-control'
        />
    );
};


export { MoneyInput, formatCurrency };
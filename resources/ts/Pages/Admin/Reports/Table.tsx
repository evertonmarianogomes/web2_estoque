import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { formatToBRL } from '../Currency';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'paymentForm', headerName: 'Forma de Pagamento', width: 160, valueGetter: (value, row) => {
            switch (value) {
                case 1:
                    return 'Pix';
                case 2:
                    return 'Cartão de Crédito'
                case 3:
                    return 'Cartão de Débito'
                case 4:
                    return 'Dinheiro'
                case 5:
                    return 'Pagar depois'
                default:
                    return 'Várias formas'
            }
        }
    },
    { field: 'value', headerName: 'Valor', width: 160, valueGetter: (value, row) => formatToBRL(value) },

    {
        field: 'fullName',
        headerName: 'Nome Completo',
        description: 'Esta coluna possui um getter de valor e não pode ser classificada.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, paymentForm: 1, firstName: 'Creme', lastName: 'Dias', value: 50.21 },
    { id: 2, paymentForm: 0, firstName: 'Creme', lastName: 'Dias', value: 10.00 },
    { id: 3, paymentForm: 3, firstName: 'Creme', lastName: 'Dias', value: 11.65 },
    {
        id: 4, paymentForm: 5, firstName: 'Creme', lastName: 'Dias', value: 0.01
    },
    { id: 5, paymentForm: 4, firstName: 'Creme', lastName: 'Dias', value: 100.1 },
];


export default function DataTable() {
    const [selectedRows, setSelectedRows] = useState([]);

    return (<>
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}

                pageSizeOptions={[3, 5, 10]}
                checkboxSelection

                onRowSelectionModelChange={(ids): void => {
                    const selectedIDs = new Set(ids);
                    const selectedRows = rows.filter((row) =>
                        selectedIDs.has(row.id),
                    );

                    setSelectedRows(selectedRows);
                }}
            />
        </div>

        <pre style={{ fontSize: 10, marginTop: '2rem' }}>
            {JSON.stringify(selectedRows, null, 4)}
        </pre>
    </>


    );
}

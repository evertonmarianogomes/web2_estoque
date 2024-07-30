import React, { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { Button, Tooltip, Paper, Menu, MenuItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { formatTimestamp } from '../Currency';
import { Edit, Delete, ConstructionOutlined } from '@mui/icons-material';
import { ptBRGrid } from '../../DataGridPTBR';


function formatToPercent(value: number) {
    return `${value.toFixed(2).toString().replace(/\./g, ',')}%`;
}

const handleEdit = (event, row) => {
    event.stopPropagation()
    // Implement your edit logic here
    console.log('Editing row:', row);
};

type Props = {
    payment_methods: Array<any>
}

const columns: GridColDef[] = [
    {
        field: 'index',
        headerName: '#',
        width: 50,
        renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
    },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 170 },
    { field: 'interest_rate', headerName: 'Taxa', width: 70, valueGetter: (value, row) => formatToPercent(Number(row?.interest_rate)) },
    {
        field: 'add_rate', headerName: 'Adicionar taxa?', width: 120,
        valueGetter: (value, row) => row.add_rate == 1 ? 'Adicionar' : 'Não Adicionar'
    },
    { field: 'status', headerName: 'Status', width: 150, valueGetter: (value, row) => row.status == 1 ? 'Ativado' : 'Desativado' },
    { field: 'updated_at', headerName: 'Atualizado em', width: 250, valueGetter: (value, row) => formatTimestamp(row?.updated_at) },
    {
        field: 'edit',
        headerName: 'Editar',
        width: 150,
        renderCell: (params) => (
            <Tooltip title='Editar produto' placement="right">
                <Button color="primary" variant='contained' onClick={(e) => handleEdit(e, params.row)}>
                    <Edit />
                </Button>
            </Tooltip>

        ),
    }
];


/** Main Component */
const Index = (props: any) => {
    const { payment_methods }: Props = usePage().props as any;
    const { router, route } = window;

    const [selectionModel, setSelectionModel] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelectionChange = (newSelection) => {
        setSelectionModel(newSelection);
        // const selectedData = newSelection.map(id => payment_methods.find(row => row.id === id));
        setSelectedRows(newSelection);
    };


    return (<div className='container pt-3'>
        <div className="d-flex flex-wrap gap-2">
            <Tooltip title='Voltar para vendas' children={<Link href={route('sales.index')}><Button color='secondary' variant='contained'><ArrowBackIcon /></Button></Link>} />
            <h3 className='flex-grow-1'>Formas de Pagamento </h3>

        </div>

        <Paper sx={{ width: '100%', marginTop: '1rem', height: '25rem' }}>

            <DataGrid
                rows={payment_methods}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    columns: {
                        columnVisibilityModel: {
                            id: false
                        }
                    }
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                localeText={ptBRGrid}
                onRowSelectionModelChange={(newSelectionModel) => {
                    handleSelectionChange(newSelectionModel);
                }}
                rowSelectionModel={selectionModel}
            />
        </Paper>


    </div>

    )
}

export default Index;
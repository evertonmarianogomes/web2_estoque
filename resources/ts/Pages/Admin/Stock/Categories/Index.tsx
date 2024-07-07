import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Tooltip, Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import CategoryTable from './CategoryTable';

const Index = (props) => {
    const { categories } = props;

    return (<>
        <div className="container pt-3">
            <h4><Tooltip title='Voltar para Estoque' placement="bottom-start">
                <Button color='secondary' onClick={(e) => router.visit(route('stock.index'))} variant="contained">
                    <KeyboardArrowLeftIcon /></Button>
            </Tooltip> Categorias</h4>

            <CategoryTable categories={categories} />
        </div>
    </>);
}

export default Index;

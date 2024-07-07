import React, { useEffect, useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { Tooltip, Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { route } from 'ziggy-js';
import ProductList from './List';


const Index = () => {
    const { products, categories } = usePage().props as any;

    return (<>
        <div className="container pt-3">

            <h4><Tooltip title='Voltar para Estoque' placement="bottom-start">
                <Button color='secondary' onClick={(e) => router.visit(route('stock.index'))} variant="contained">
                    <KeyboardArrowLeftIcon /></Button>
            </Tooltip> Produtos</h4>

            <ProductList products={products} categories={categories} />
        </div>
    </>);
}

export default Index;
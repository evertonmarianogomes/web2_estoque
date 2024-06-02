import { Link } from '@inertiajs/react';
import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import { route } from 'ziggy-js';
import About from '../About';


export default function NavItems(props: any) {
    let user_type: number = props?.user.roles[0].id;

    return (
        <Nav className="me-auto" navbar>
            {(user_type == 1) && <NavItem><Link href={route('users.index')} className={
                (route('users.index') == window.location.href || route('users.create') == window.location.href) ? 'nav-link active' : 'nav-link'
            }>Usuários</Link></NavItem>}

            <NavItem><Link href={route('stock.index')} className={route('stock.index') == window.location.href ? 'nav-link active' : 'nav-link'}>Estoque</Link></NavItem>
            <NavItem><Link href={route('sales.index')} className={(route('sales.index') == window.location.href || route('sales.create') == window.location.href) ? 'nav-link active' : 'nav-link'}>Vendas</Link></NavItem>
            <About app={props?.app} />
        </Nav>
    );
}



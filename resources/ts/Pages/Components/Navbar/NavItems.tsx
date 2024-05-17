import { Link } from '@inertiajs/react';
import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import { route } from 'ziggy-js';
import About from '../About';


export default function NavItems(props: any) {
    let user_type: number = props?.user.roles[0].id;

    return (
        <Nav className="me-auto" navbar>
            {(user_type == 1) && <NavItem><Link href='#' className='nav-link'>Usuários</Link></NavItem>}

            <NavItem><Link href='#' className='nav-link'>Estoque</Link></NavItem>
            <About app={props?.app} />
        </Nav>
    );
}



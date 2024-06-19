import { Link } from "@inertiajs/react";
import React from "react";
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Route, route } from "ziggy-js";

const Sidenav = (props) => {
    return (<>
        <Nav vertical pills>
            <NavItem >
                <Link href={route('admin.index')} style={{ color: '#fff' }}
                    className={(window.location.href == route('admin.index') ? 'nav-link active' : 'nav-link')}>
                    <i className="fa-solid fa-house"></i> <span>Home</span></Link>
            </NavItem>
            <NavItem>
                <Link href={route('users.index')}
                    className={(window.location.href == route('users.index') || window.location.href == route('users.create') ? 'nav-link active' : 'nav-link')}>
                    <i className="fas fa-user-circle"></i> <span>Usuários</span></Link>
            </NavItem>

            <NavItem>
                <Link href={route('stock.index')} className="nav-link"><i className="fas fa-user-circle"></i> <span>Estoque</span></Link>
            </NavItem>

            <NavItem>
                <Link href={route('sales.create')} className="nav-link"><i className="fas fa-user-circle"></i> <span>Venda</span></Link>
            </NavItem>
        </Nav>
    </>);
}

export default Sidenav;
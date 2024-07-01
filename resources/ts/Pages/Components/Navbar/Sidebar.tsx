import React, { useEffect, useState } from 'react';
import '../../../../scss/sidebar.scss';
import { Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import DarkMode from '../DarkMode';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import alertify from 'alertifyjs';
import About from '../About';
import { Button } from '@mui/material';

const Sidebar = ({ content, user, app }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        alertify.confirm('Certeza que deseja sair?', () => {
            router.visit(route('admin.logout'));
        }, () => {
            console.log('logout cancelado');

        });
    }

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className="d-flex" id="wrapper" >
            <div className={`border-right  ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`} id="sidebar-wrapper" >
                <div className="list-group list-group-flush main-nav">
                    <Button onClick={toggleSidebar} className="d-lg-none" variant='contained' color="secondary">Recolher menu</Button>
                    <Link href={route('admin.home')}
                        className={`list-group-item list-group-item-action ${location.href == route('admin.home') ? 'active' : ''}`}>Home</Link>
                    <Link href={route('users.index')} className={`list-group-item list-group-item-action 
                        ${location.href.includes('users') ? 'active' : ''}`}>Usuários</Link>

                    <Link href={route('stock.index')} className={`list-group-item list-group-item-action 
                        ${location.href.includes('stock') ? 'active' : ''}`}>Estoque</Link>

                    <Link href={route('sales.index')} className={`list-group-item list-group-item-action 
                        ${location.href.includes('sales') ? 'active' : ''}`}>Vendas</Link>

                    <About app={app} />


                </div>

                <div id="end-menu">
                    <UncontrolledDropdown className='mb-0'>
                        <DropdownToggle nav caret><i className="fa-solid fa-circle-user"></i> {user?.first_name} {user?.last_name}</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>Editar Dados</DropdownItem>
                            <DropdownItem>HelloWorld</DropdownItem>
                            <DropdownItem divider />
                            <Link href={route('admin.logout')} className='dropdown-item' onClick={handleLogout}>Logout</Link>
                        </DropdownMenu>
                    </UncontrolledDropdown>

                    <DarkMode />
                </div>
            </div>

            <div id="page-content-wrapper" className={`container-fluid ${isOpen ? 'content-open' : 'content-closed'}`}>

                <div className="container-fluid d-flex">
                    <Button variant="contained" color="primary" onClick={toggleSidebar} id="menu-toggle" title='Abrir menu' style={{ height: '3rem' }}><i className="fa-solid fa-bars"></i></Button>
                    {content}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

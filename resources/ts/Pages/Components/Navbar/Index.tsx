import { Link, router } from "@inertiajs/react";
import React, { useState, useRef } from "react";
import { route } from 'ziggy-js';
import { Collapse, Navbar as BootstrapNavbar, NavbarToggler } from 'reactstrap';

import DarkMode from "../DarkMode";
import NavEnd from "./NavEnd";
import NavItems from "./NavItems";


export default function Navbar(props: any) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    function logout(e: React.MouseEvent) {
        e.preventDefault();
        let isLogout = confirm('Certeza que deseja sair?');

        if (isLogout) window.location = route('admin.logout') as any;
    }

    return (
        <BootstrapNavbar expand='lg' container>
            <Link href={route('admin.index')} className="navbar-brand" children="Home" />

            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <NavItems app={props?.app} user={props?.user} />
                <NavEnd logout={logout} user={props?.user} darkMode={DarkMode} />
            </Collapse>

        </BootstrapNavbar >
    );
}
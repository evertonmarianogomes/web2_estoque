import React from "react";
import { Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link, router } from "@inertiajs/react";
import { route } from 'ziggy-js';


export default function NavEnd(props: any) {
    return (
        <Nav className="ms-auto" navbar >
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret> <i className="fas fa-user-circle"></i> {props?.user?.first_name} {props?.user?.last_name}
                </DropdownToggle>
                <DropdownMenu>
                    <Link href={route('users.edit', props?.user)} className="dropdown-item">Editar dados</Link>
                    {/* <Link href={route('admin.helloworld')} className="dropdown-item">HelloWorld</Link> */}

                    <DropdownItem divider />
                    <Link href={route('admin.logout')} className="dropdown-item" onClick={props?.logout}>Logout</Link>
                </DropdownMenu>
            </UncontrolledDropdown>

            <div className="nav-link"><props.darkMode /></div>
        </Nav>
    )
}
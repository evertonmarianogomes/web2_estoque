import React, { useState } from "react";
import { NavItem, NavLink, Modal, ModalHeader, ModalBody } from "reactstrap";


export default function About(props: any) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const { app } = props;


    return (<>
        <NavItem>
            <NavLink onClick={toggle} style={{ cursor: 'pointer' }}>Sobre</NavLink>
        </NavItem>

        <Modal isOpen={modal} toggle={toggle}   >
            <ModalHeader toggle={toggle}>Sobre</ModalHeader>

            <ModalBody >
                <h3 className="text-center mb-4 pb-1"><i className={app?.appFaIcon}></i>  {app?.appName} <small> {app?.appRelease}</small></h3>

                <p>"Web 2 Estoque" (nome provisório) é um projeto com as funções de controle de estoque, vendas e relatórios financeiros.</p>

                <hr />


                <div className="d-flex flex-wrap flex-column gap-3">
                    <h3>Créditos</h3>
                    <a href="https://www.flaticon.com/free-icons/pizza" title="pizza icons" target="__blank">Pizza icons created by Freepik - Flaticon</a>

                    <a href="https://www.freepik.com/free-vector/modern-desktop-background-geometric-blue-design-vector_18220884.htm" target="__blank">Image by rawpixel.com on Freepik</a>

                    <div className="mt-2 d-flex flex-row gap-2 flex-wrap">

                        <a href="https://github.com/evertonmarianogomes/web2_estoque" target="__blank" className="btn btn-primary col"><i className="fa-brands fa-git"></i> Repositório do Projeto no GitHub</a>

                        <a href="https://github.com/evertonmarianogomes/" target="__blank" className="btn btn-primary col"><i className="fa-brands fa-github"></i> Github do Autor - @evertonmarianogomes</a>

                        <small className="col-12 text-center text-muted mt-2">{app?.appBranch} - v.{app?.appVersion}</small>
                    </div>
                </div>
            </ModalBody>
        </Modal>

    </>);
}
import React from "react";
import { router, usePage } from "@inertiajs/react";
import { route } from 'ziggy-js'
import { Table } from 'reactstrap';


const Home = () => {
    const { user } = usePage().props as any;

    return (
        <div className="container pt-3">
            <h3>Bem vindo {user?.first_name}</h3>
            <hr />

            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title">Ultimas vendas</h5>
                    <Table striped responsive hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome do cliente</th>
                                <th>Valor Total</th>
                                <th>Forma de pagamento</th>
                                <th>Usuário</th>
                                <th>Data da venda</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Usuário Teste</td>
                                <td>R$100,00</td>
                                <td>Cartão de Crédito</td>
                                <td>Everton M. Gomes</td>
                                <td>25/05/2024 - 00:53</td>
                                <td><button className="btn btn-primary"><i className="fas fa-print"></i></button></td>
                            </tr>
                        </tbody>
                    </Table>

                </div>
            </div>
        </div>
    );
}


export default Home;

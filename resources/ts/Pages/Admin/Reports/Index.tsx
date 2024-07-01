import React from 'react';
import { Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js'

function Index(props: any) {
    return (<>
        <div className="btn-container">
            <Link className="floating-btn" title='Voltar' href={route('sales.index')}><i className="fa-solid fa-angles-left"></i></Link>


            <Link className="floating-btn" title='Adicionar' href={'#'} id="add_report">
                <i className="fa-solid fa-plus"></i></Link>
        </div>

        <div className="content">
            <h3>Relatórios</h3>
            <hr />
            <div className="table-container">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome do Cliente</th>
                            <th>Valor Total</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td colSpan={4} className='text-center'>Nenhum dado encontrado</td></tr>
                        {/* <tr>
                            <td>3</td>
                            <td>Dados 10</td>
                            <td>Dados 11</td>
                            <td>
                                <button className="md-button md-button-primary "><i className="fas fa-edit"></i></button>
                                <button className="md-button md-button-danger "><i className="fas fa-trash"></i></button>
                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </div>

        </div>



    </>);
}

export default Index;
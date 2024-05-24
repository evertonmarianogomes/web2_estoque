import React from "react";
import { Table } from "reactstrap";
import { Link, router, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import moment from "moment";

export default function List(props: any) {
    const users: Array<any> = props?.users;
    const userAuth = usePage().props?.user as any;

    const deleteUser = (id: number) => {
        if (confirm('Certeza que deseja excluir esse usuário? ')) {
            router.delete(route('users.destroy', { user: id }));
        }
    }

    return (<>

        <Table responsive hover striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Login</th>
                    <th>Atualizado em</th>
                    <th>Opções</th>
                </tr>
            </thead>
            <tbody>
                {users.length == 0 && <tr><td colSpan={6} className="text-center">Nenhum usuário cadastrado na base de dados</td></tr>}

                {users.length > 0 && users.map((user: any, index: number) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user?.first_name} {user?.last_name}</td>
                        <td>{user?.login}</td>
                        <td>{moment(user?.updated_at).format('DD/MM/YYYY - HH:mm:ss')}</td>
                        <td>
                            {user?.id == userAuth?.id && <Link href={route('users.edit', { user: user })} className="btn btn-primary"><i className="fas fa-edit"></i></Link>}

                            {user?.id != userAuth.id && <span className="d-flex gap-2 flex-wrap">
                                <Link href={route('users.edit', { user: user })} className="btn btn-primary"><i className="fas fa-edit"></i></Link>

                                <button className="btn btn-danger" onClick={(e) => deleteUser(user?.id)}><i className="fas fa-trash"></i></button>
                            </span>}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </>);
}
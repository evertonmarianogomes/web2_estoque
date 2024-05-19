import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "@inertiajs/react";


const hello = () => {
    const notify = () => toast.success("Mensagem de Sucesso - Teste", {
        className: 'custom-toast'
    });

    return (
        <div className="container pt-3">
            <ToastContainer />

            <div className="d-flex justify-content-between mt-2">
                <h2 className="flex-grow-1">HelloWorld</h2>
            </div>

            <p>Página de testes</p>
            <div className="card my-2">
                <div className="card-body">
                    <h3 className="card-title">Créditos</h3>
                    <a href="https://www.flaticon.com/free-icons/pizza" title="pizza icons" target="__blank">Pizza icons created by Freepik - Flaticon</a>
                </div>
            </div>


            <button onClick={notify} className="btn btn-primary">Notify!</button>
            <hr />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse fugit dolorum quam est dolorem illo eaque amet? At accusamus ea laudantium libero enim provident tempora fuga dolore, animi nisi recusandae quidem illo modi sequi! Eius minus vel, velit numquam quam perferendis maiores autem, nam animi impedit blanditiis voluptatum? Sit officia error ut earum. Quae reiciendis ducimus qui ex rerum eum aspernatur? Iure dolorem quisquam doloremque hic, earum, rerum odit vitae eligendi accusantium omnis voluptas vel fugit tempora veritatis natus? Facilis, cum quo accusantium consectetur molestiae rerum corporis doloribus magnam facere et, nihil quos ab, porro itaque necessitatibus id sapiente aliquam.</p>

            <div className="text-center mt-4">
                <Link href="/">Go to Home</Link>
            </div>
        </div>

    );
}

export default hello;
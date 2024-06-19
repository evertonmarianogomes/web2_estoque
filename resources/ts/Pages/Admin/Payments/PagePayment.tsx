import React from "react";
import { Alert, Button } from "reactstrap";

function PagePayment(props) {
    const { handlePage } = props as any;
    return (<>
        <div className="container pt-3">
            <div className="col-12 d-flex gap-2 flex-wrap">
                <Button color="primary" onClick={() => handlePage("cashier")} title="Voltar para dados da venda" className="col-12 col-md-auto col-lg-auto">
                    <i className="fa-solid fa-angle-left"></i></Button>
                <h3 className="col-12 col-md col-lg">Pagamento</h3>
            </div>

            <div className="col-12 mt-3">
                <Alert color="warning" fade={false}>Em construção</Alert>
            </div>
        </div>
    </>);
}

export default PagePayment;
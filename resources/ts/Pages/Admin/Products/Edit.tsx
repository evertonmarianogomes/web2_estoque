import React, { useState, useEffect } from "react";
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { route } from "ziggy-js";
import { MoneyInput } from "../../Components/CurrencyInput";
import moment from "moment";
import alertify from 'alertifyjs';


export default function Edit(props: any) {
    const [loader, setLoader] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const [value, setValue] = useState('');
    const [costValue, setCostValue] = useState('');

    const { product, categories } = usePage().props as any;

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        let data = new FormData(e.target as HTMLFormElement);
        data.append('_method', 'PUT');
        data.append('price', value);
        data.append('cost_price', costValue);
        data.set('is_available', (data.get('is_available') == 'on') ? '1' : '0')

        if (parseFloat(costValue) >= parseFloat(value)) {
            alertify.alert('Aviso', 'O preço de custo é igual ou maior ao preço de venda!');
        } else if (data.get('is_available') == '0') {
            alertify.confirm('Aviso', 'Deseja desativar a venda do produto?', function () {
                router.post(route('products.update', { id: product.id }), data);
            }, function () { return; });
        } else {
            router.post(route('products.update', { id: product.id }), data);
        }


    }



    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(function () {
        setPreview('/storage/images/' + product.image_url);
        setValue((product.price * 100).toString());
        setCostValue((product.cost_price * 100).toString());

        setTimeout(() => setLoader(false), 500)

    }, []);

    return (<>
        <div className="container pt-3">
            <div className="col-12 gap-2 flex-wrap d-flex">
                <Link href={route('stock.index')} className="btn btn-primary"><i className="fa-solid fa-chevron-left"></i></Link>
                <h3>Editar produto</h3>
            </div>
            <hr />
            {loader ? <div className="d-flex gap-3" id="loader_page">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Carregando dados, aguarde...</p>

            </div> : <>
                <form method="POST" encType="multipart/form-data" onSubmit={submitForm}>
                    <div className="d-flex flex-wrap gap-3 mt-3 flex-wrap">
                        <div className="col-12 col-lg-4 text-center card">
                            <div className="card-body">
                                <h4 className="card-title">Imagem</h4>
                                <hr />
                                <input type="file" accept="image/*" onChange={handleImageChange} className="form-control" name="product_image" id="product_image" />
                                {preview && <img src={preview} alt="Imagem" className="img-thumbnail mt-2" style={{
                                    width: '20em',
                                    height: '17em'
                                }} />}

                                <div className="mt-3" style={{ textAlign: 'start' }}>
                                    <p>Criado em: {moment(product?.created_at).format('DD/MM/YYYY - HH:mm:ss')} </p>
                                    <p>Atualizado em: {moment(product?.updated_at).format('DD/MM/YYYY - HH:mm:ss')} </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-lg card">
                            <div className="card-body">
                                <div className="col-12 d-flex flex-wrap gap-2">
                                    <div className="col-12 col-lg-7">
                                        <label htmlFor="product_name" className="form-label">Nome</label>
                                        <input type="text" name="product_name" id="product_name" className="form-control" defaultValue={product.name} required />
                                    </div>

                                    <div className="col-12 col-lg">
                                        <label htmlFor="product_category" className="form-label">Categoria</label>
                                        <select name="product_category" id="product_category" className="form-select" defaultValue={product.category_id}>{
                                            categories.map((category, index) => (
                                                <option value={category.id} key={index}>{category.name}</option>
                                            ))
                                        }
                                        </select>
                                    </div>
                                </div>


                                <div className="col-12 d-flex flex-wrap gap-2 my-3">
                                    <div className="col-12 col-md col-lg">
                                        <label className="form-label">Preço (R$)</label>
                                        <MoneyInput onChange={setValue} value={value} />

                                    </div>

                                    <div className="col-12 col-md col-lg">
                                        <label className="form-label">Preço de Custo (R$)</label>
                                        <MoneyInput onChange={setCostValue} value={costValue} />
                                    </div>

                                    <div className="col-12 col-md col-lg">
                                        <label htmlFor="product_quantity" className="form-label">Quantidade</label>
                                        <input type="number" name="product_quantity" id="product_quantity" className="form-control" required defaultValue={product.quantity} min={0} />
                                    </div>

                                    <div className="col-12 mt-2">
                                        <div className="col-12">
                                            <label htmlFor="product_description" className="form-label">Descrição</label>
                                            <textarea name="product_description" id="product_description" className="form-control" defaultValue={product.description} rows={6} />
                                        </div>

                                        <div className="col-12 pt-2">
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" role="switch" id="is_available" name="is_available" defaultChecked={(product.is_available == 1) ? true : false} />
                                                <label className="form-check-label" htmlFor="is_available" >Disponível para venda?</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <button type="submit" className="btn btn-primary mx-3 mb-3">Enviar</button>
                        </div>
                    </div>
                </form>
            </>}
        </div>
    </>);
}
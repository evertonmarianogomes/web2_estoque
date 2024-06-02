import React, { useState } from "react";
import { usePage, Link, router } from "@inertiajs/react";
import { route } from 'ziggy-js';

import { MoneyInput } from "../../Components/CurrencyInput";


const Create = () => {
    const { categories } = usePage().props as any;

    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [amount, setAmount] = useState('');

    const [product, setProduct] = useState({
        price: '1',
        cost_price: '1',
        name: '',
        category: 1,
        quantity: 0,
        description: '',
        image: ''
    });

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setProduct((prevFormData: any) => ({ ...prevFormData, [name]: value }));
    };


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            setProduct((prevFormData: any) => ({ ...prevFormData, ['image']: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log(product);

        router.post(route('products.store'), product);

    }

    return (<>
        <div className="container pt-3">
            <h3><Link href={route('stock.index')} className="btn btn-primary"><i className="fa-solid fa-chevron-left"></i></Link>  Criar Produto</h3>
            <hr />

            <form action="#" encType="multipart/form-data" onSubmit={handleSubmitForm}>
                <div className="d-flex flex-wrap gap-3 mt-3 flex-wrap">
                    <div className="col-12 col-lg-4 text-center card">
                        <div className="card-body">
                            <h4 className="card-title">Imagem</h4>
                            <hr />
                            <input type="file" accept="image/*" onChange={handleImageChange} className="form-control" required />
                            {preview && <img src={preview} alt="Imagem" className="img-thumbnail mt-2" style={{
                                width: '20em',
                                height: '17em'
                            }} />}
                        </div>
                    </div>

                    <div className="col-12 col-lg card">
                        <div className="card-body">
                            <h4 className="card-title">Dados</h4>
                            <hr />

                            <div className="col-12 d-flex gap-2 flex-wrap mb-2">
                                <div className="mb-2 col-12 col-lg-7">
                                    <label htmlFor="name" className="form-label">Nome</label>
                                    <input type="text" className="form-control" id="name" name="name" required
                                        onChange={handleChange} defaultValue={product.name} />
                                </div>

                                <div className="mb-2 col-12 col-lg">
                                    <label htmlFor="category" className="form-label">Categoria</label>
                                    <select name="category" id="category" className="form-select"
                                        onChange={handleChange} defaultValue={product.category}>
                                        {
                                            categories.map((category, index) => (
                                                <option value={category?.id} key={index}>{category?.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="col-12 d-flex gap-2 flex-wrap">
                                <div className="mb-2 col-12 col-lg">
                                    <label className="form-label">Preço</label>
                                    <MoneyInput onChange={(e) => setProduct((prevFormData: any) => ({ ...prevFormData, ['price']: e }))} value={product?.price} />
                                </div>

                                <div className="mb-2 col-12 col-lg">
                                    <label className="form-label">Preço de custo</label>
                                    <MoneyInput onChange={(e) => setProduct((prevFormData: any) => ({ ...prevFormData, ['cost_price']: e }))} value={product?.cost_price} />
                                </div>

                                <div className="mb-2 col-12 col-lg">
                                    <label htmlFor="quantity" className="form-label">Quantidade</label>
                                    <input min={0} type="number" name="quantity" id="quantity" className="form-control" required
                                        onChange={handleChange} defaultValue={product.quantity} />
                                </div>
                            </div>

                            <div className="col-12 gap-2 my-2">
                                <label htmlFor="description" className="form-label">Descrição</label>
                                <textarea name="description" id="description" className="form-control" onChange={handleChange} defaultValue={product.description}></textarea>
                            </div>


                        </div>
                        <button type="submit" className="my-2 mx-2 btn btn-primary">Enviar</button>
                    </div>
                </div>

            </form >
        </div >
    </>);
}

export default Create;
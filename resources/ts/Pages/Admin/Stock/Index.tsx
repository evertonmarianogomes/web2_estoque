import React, { useState } from "react";
import { route } from 'ziggy-js';
import { Index as Category } from "../Categories/Index";
import { Index as Products } from '../Products/Index';


const Index = ({ props }) => {
    const [activeTab, setActiveTab] = useState("tab2");

    const handleTab1 = () => setActiveTab("tab1");

    const handleTab2 = () => {
        setActiveTab("tab2");
    }

    return (<>
        <div className="container pt-2">

            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true" onClick={handleTab1}>Categorias</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false" onClick={handleTab2}>Produtos</button>
                </li>
            </ul>
            <div className="tab-content tab-list" id="myTabContent">
                {activeTab === "tab1" ? <Category /> : <Products />}

            </div>

        </div>
    </>);
}


export default Index;
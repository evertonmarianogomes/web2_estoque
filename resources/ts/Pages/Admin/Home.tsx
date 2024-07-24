import React from 'react';
const Home = (props) => {
    const { user } = props;
    return (<>
        <div className="container pt-3">
            <h5>Bem vindo {user?.first_name}</h5>
            <hr />

        </div >

    </>);
}

export default Home;